import { AxiosError, AxiosResponse } from 'axios';
import { BaseHttpClient } from '../../../src/api/base-http-client/base-http-client';
import { HttpResponsePayloadDto } from '../../../src/api/common/dtos/http-response.dto';
import { HttpResponseError } from '../../../src/entities/errors/http-response.error';
import { BaseEntity, Constructor } from '../../../src/entities/message-types';

// Mocks
jest.mock('../../../src/api/base-http-client/services/axios.service');
jest.mock('../../../src/utilities/transformer-util');

const MockAxiosService = jest.requireMock(
  '../../../src/api/base-http-client/services/axios.service',
).AxiosService;
const MockTransformerUtil = jest.requireMock(
  '../../../src/utilities/transformer-util',
).TransformerUtil;

class DummyEntity implements BaseEntity {
  [key: string]: unknown;

  id?: number;

  name?: string;
}

class DummyResponseDto extends HttpResponsePayloadDto<DummyEntity> {}

class TestHttpClient extends BaseHttpClient {
  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getLogger(): unknown {
    return this.logger;
  }

  public async testPost(args: unknown): Promise<unknown> {
    // Type assertion is for test helper only
    return this.postRequest(args as Parameters<BaseHttpClient['postRequest']>[0]);
  }

  public async testGet(args: unknown): Promise<unknown> {
    // Type assertion is for test helper only
    return this.getRequest(args as Parameters<BaseHttpClient['getRequest']>[0]);
  }

  public testBuildQueryString(params?: unknown): string {
    // Type assertion is for test helper only
    return (this as unknown as { buildQueryString: (params?: unknown) => string }).buildQueryString(
      params,
    );
  }

  public testValidateResponsePayloadStructure(payload: unknown): void {
    // Type assertion is for test helper only
    return (
      this as unknown as { validateResponsePayloadStructure: (payload: unknown) => void }
    ).validateResponsePayloadStructure(payload);
  }

  public testHandleErrorResponse(
    error: unknown,
    dto: Constructor<HttpResponsePayloadDto<DummyEntity>>,
  ): void {
    // Type assertion is for test helper only
    return (
      this as unknown as {
        handleErrorResponse: (
          error: unknown,
          dto: Constructor<HttpResponsePayloadDto<DummyEntity>>,
        ) => void;
      }
    ).handleErrorResponse(error, dto);
  }
}

describe('BaseHttpClient', () => {
  let client: TestHttpClient;
  let mockPost: jest.Mock;
  let mockGet: jest.Mock;
  let mockTransform: jest.Mock;

  beforeEach((): void => {
    mockPost = jest.fn();
    mockGet = jest.fn();
    MockAxiosService.mockImplementation(() => ({ post: mockPost, get: mockGet }));
    mockTransform = jest.fn((input) => input);
    MockTransformerUtil.transform = mockTransform;
    client = new TestHttpClient({
      restApiBaseUrl: 'http://api',
      packageCredentials: { packageId: 1, username: 'user', password: 'pass' },
      logger: undefined,
    });
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it('should initialize with correct baseUrl and logger', (): void => {
    expect(client.getBaseUrl()).toBe('http://api');
    expect(client.getLogger()).toBeDefined();
  });

  it('should send a POST request and return the response', async (): Promise<void> => {
    mockPost.mockResolvedValue({ data: { body: { id: 1 } } });
    const result = await client.testPost({
      route: '/test',
      responseBodyType: DummyResponseDto,
      requestBody: {},
    });
    expect(result).toEqual({ id: 1 });
    expect(mockPost).toHaveBeenCalled();
  });

  it('should send a GET request and return the response', async (): Promise<void> => {
    mockGet.mockResolvedValue({ data: { body: { id: 2 } } });
    const result = await client.testGet({
      route: '/test',
      responseBodyType: DummyResponseDto,
      requestBody: {},
    });
    expect(result).toEqual({ id: 2 });
    expect(mockGet).toHaveBeenCalled();
  });

  it('should build query string from params', (): void => {
    const params = { a: 1, b: 'test', c: undefined };
    const query = client.testBuildQueryString(params);
    expect(query).toContain('a=1');
    expect(query).toContain('b=test');
  });

  it('should throw if response payload is missing header or body', (): void => {
    expect(() =>
      client.testValidateResponsePayloadStructure({ header: undefined, body: {} }),
    ).toThrow(HttpResponseError);
    expect(() =>
      client.testValidateResponsePayloadStructure({ header: {}, body: undefined }),
    ).toThrow(HttpResponseError);
  });

  it('should handle error response: nil error', (): void => {
    expect(() => client.testHandleErrorResponse(undefined, DummyResponseDto)).toThrow(
      HttpResponseError,
    );
  });

  it('should handle error response: not AxiosError', (): void => {
    const err = new Error('fail');
    expect(() => client.testHandleErrorResponse(err, DummyResponseDto)).toThrow(err);
  });

  it('should handle error response: AxiosError with no response', (): void => {
    const err = new AxiosError('fail', undefined, undefined, undefined, undefined);
    expect(() => client.testHandleErrorResponse(err, DummyResponseDto)).toThrow(HttpResponseError);
  });

  it('should handle error response: AxiosError with response', (): void => {
    const err = new AxiosError('fail', undefined, undefined, undefined, {
      data: 'bad',
    } as AxiosResponse<unknown>);
    expect(() => client.testHandleErrorResponse(err, DummyResponseDto)).toThrow(HttpResponseError);
  });
});
