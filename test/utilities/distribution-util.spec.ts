import { MqConnectionSettingsValidator } from '../../src/feed/validators';
import { DistributionUtil } from '../../src/utilities/distribution-util';

jest.mock('@api/customers-api', () => ({
  CustomersApiFactory: jest.fn().mockImplementation(() => ({
    createPackageDistributionHttpClient: jest.fn().mockReturnValue({
      getDistributionStatus: jest.fn(),
      startDistribution: jest.fn(),
      stopDistribution: jest.fn(),
    }),
  })),
}));

const baseMqSettings = MqConnectionSettingsValidator.validate({
  hostname: 'localhost',
  port: 5672,
  vhost: '/',
  username: 'user',
  password: 'pass',
  packageId: 1,
  maxRetryAttempts: 5,
  customersApiBaseUrl: 'https://stm-api.lsports.eu/',
  distributionPropagationDelayMs: 3500,
});

// Mocks for dependencies
const mockGetDistributionStatus = jest.fn();
const mockStartDistribution = jest.fn();
const mockStopDistribution = jest.fn();
const mockLogger = { debug: jest.fn(), warn: jest.fn() };

// Mock IPackageDistributionHttpClient
const mockPackageDistributionApi = {
  getDistributionStatus: mockGetDistributionStatus,
  startDistribution: mockStartDistribution,
  stopDistribution: mockStopDistribution,
};

describe('DistributionUtil', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-expect-error: Setting static property for test mock injection
    DistributionUtil.packageDistributionApi = mockPackageDistributionApi;
    // @ts-expect-error: Setting static property for test mock injection
    DistributionUtil.logger = mockLogger;
  });

  describe('checkStatus', () => {
    it('should call getDistributionStatus and return the result', async () => {
      const status = { status: 'ok' };
      mockGetDistributionStatus.mockResolvedValueOnce(status);
      const result = await DistributionUtil.checkStatus();
      expect(mockGetDistributionStatus).toHaveBeenCalled();
      expect(result).toBe(status);
    });

    it('should throw if not initialized', async () => {
      // @ts-expect-error: Simulate uninitialized static property for error test
      DistributionUtil.packageDistributionApi = undefined;
      await expect(DistributionUtil.checkStatus()).rejects.toThrow(
        'initialize distribution api first!',
      );
    });
  });

  describe('start', () => {
    it('should call startDistribution and log message', async () => {
      const startResponse = { message: 'started' };
      mockStartDistribution.mockResolvedValueOnce(startResponse);
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation((fn) => {
        fn();
        return 0 as unknown as NodeJS.Timeout;
      });
      await DistributionUtil.start();
      expect(mockStartDistribution).toHaveBeenCalled();
      expect(mockLogger.debug).toHaveBeenCalledWith('started');
      setTimeoutSpy.mockRestore();
    });

    it('should wait for distributionPropagationDelayMs from mq settings', async () => {
      jest.useFakeTimers();
      mockStartDistribution.mockResolvedValueOnce({ message: 'started' });

      new DistributionUtil(baseMqSettings, mockLogger as never);
      // @ts-expect-error: restore test mock after constructor initializes the API client
      DistributionUtil.packageDistributionApi = mockPackageDistributionApi;

      const startPromise = DistributionUtil.start();

      expect(mockStartDistribution).toHaveBeenCalled();

      await jest.advanceTimersByTimeAsync(3499);
      let settled = false;
      startPromise.then(() => {
        settled = true;
      });
      await Promise.resolve();
      expect(settled).toBe(false);

      await jest.advanceTimersByTimeAsync(1);
      await startPromise;

      jest.useRealTimers();
    });

    it('should throw if not initialized', async () => {
      // @ts-expect-error: Simulate uninitialized static property for error test
      DistributionUtil.packageDistributionApi = undefined;
      await expect(DistributionUtil.start()).rejects.toThrow('initialize distribution api first!');
    });
  });

  describe('stop', () => {
    it('should call stopDistribution and log message', async () => {
      const stopResponse = { message: 'stopped' };
      mockStopDistribution.mockResolvedValueOnce(stopResponse);
      await DistributionUtil.stop();
      expect(mockStopDistribution).toHaveBeenCalled();
      expect(mockLogger.debug).toHaveBeenCalledWith('stopped');
    });

    it('should throw if not initialized', async () => {
      // @ts-expect-error: Simulate uninitialized static property for error test
      DistributionUtil.packageDistributionApi = undefined;
      await expect(DistributionUtil.stop()).rejects.toThrow('initialize distribution api first!');
    });
  });
});
