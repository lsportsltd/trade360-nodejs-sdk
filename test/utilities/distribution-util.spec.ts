import { DistributionUtil } from '../../src/utilities/distribution-util';

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
