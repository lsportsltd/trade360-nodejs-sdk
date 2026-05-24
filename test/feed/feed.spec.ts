import { Feed } from '../../src/feed/feed';

const mockConsumerStart = jest.fn();
const mockConsumerStop = jest.fn();
const mockConsumerAddEntityHandler = jest.fn();

const mockGetDistributionStatus = jest.fn();
const mockStartDistribution = jest.fn();
const mockStopDistribution = jest.fn();

jest.mock('../../src/feed/mq-feed', () => ({
  MessageConsumerMQ: jest.fn().mockImplementation(() => ({
    start: mockConsumerStart,
    stop: mockConsumerStop,
    addEntityHandler: mockConsumerAddEntityHandler,
  })),
}));

jest.mock('@api/customers-api', () => ({
  CustomersApiFactory: jest.fn().mockImplementation(() => ({
    createPackageDistributionHttpClient: jest.fn().mockReturnValue({
      getDistributionStatus: mockGetDistributionStatus,
      startDistribution: mockStartDistribution,
      stopDistribution: mockStopDistribution,
    }),
  })),
}));

const baseMqSettings = {
  hostname: 'localhost',
  port: 5672,
  vhost: '/',
  username: 'user',
  password: 'pass',
  packageId: 1,
  maxRetryAttempts: 5,
  customersApiBaseUrl: 'https://stm-api.lsports.eu/',
  distributionPropagationDelayMs: 3000,
  initialConnectionRetryIntervalMs: 500,
  initialConnectionMaxAttempts: 3,
};

const mockLogger = {
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe('Feed (TR-23899)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockConsumerStart.mockResolvedValue(undefined);
    mockGetDistributionStatus.mockResolvedValue({ isDistributionOn: true });
    mockStartDistribution.mockResolvedValue({ message: 'started' });
    mockStopDistribution.mockResolvedValue({ message: 'stopped' });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('waits for distribution propagation when distribution is already on', async () => {
    const feed = new Feed(baseMqSettings, mockLogger);

    const startPromise = feed.start(true);

    await jest.advanceTimersByTimeAsync(3000);
    await startPromise;

    expect(mockGetDistributionStatus).toHaveBeenCalled();
    expect(mockStartDistribution).not.toHaveBeenCalled();
    expect(mockConsumerStart).toHaveBeenCalledTimes(1);
  });

  it('retries initial RabbitMQ connection using configured interval and attempts', async () => {
    mockConsumerStart
      .mockRejectedValueOnce(new Error('403 ACCESS_REFUSED'))
      .mockRejectedValueOnce(new Error('403 ACCESS_REFUSED'))
      .mockResolvedValueOnce(undefined);

    const feed = new Feed(baseMqSettings, mockLogger);

    const startPromise = feed.start(true);

    await jest.advanceTimersByTimeAsync(3000);
    await jest.advanceTimersByTimeAsync(500);
    await jest.advanceTimersByTimeAsync(500);
    await startPromise;

    expect(mockConsumerStart).toHaveBeenCalledTimes(3);
  });

  it('does not retry initial connection when preConnectionAtStart is false', async () => {
    mockConsumerStart.mockRejectedValueOnce(new Error('connection failed'));

    const feed = new Feed(baseMqSettings, mockLogger);

    await expect(feed.start(false)).rejects.toThrow('connection failed');
    expect(mockConsumerStart).toHaveBeenCalledTimes(1);
    expect(mockGetDistributionStatus).not.toHaveBeenCalled();
  });
});
