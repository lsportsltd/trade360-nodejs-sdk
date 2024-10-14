import { isNil } from 'lodash';

import { BaseHttpClient, IMetadataHttpClient } from '@api';
import { IHttpServiceConfig } from '@api/common';

import { ConsoleAdapter, ILogger } from '@logger';

export class MetadataHttpClient extends BaseHttpClient implements IMetadataHttpClient {
  protected logger: ILogger;

  constructor(
    { packageCredentials, customersApiBaseUrl, logger }: IHttpServiceConfig /*mapper: IMapper*/,
  ) {
    super({ customersApiBaseUrl, packageCredentials, logger });

    this.logger = !isNil(logger) ? logger : new ConsoleAdapter();
    //this.mapper = mapper;
  }
}
