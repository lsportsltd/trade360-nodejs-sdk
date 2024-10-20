import { BaseHttpClient } from '@httpClient';

import { IMetadataHttpClient } from '@customers-api/interfaces';

import { IHttpServiceConfig } from '@api/common';

export class MetadataHttpClient extends BaseHttpClient implements IMetadataHttpClient {
  constructor(
    { packageCredentials, customersApiBaseUrl, logger }: IHttpServiceConfig /*mapper: IMapper*/,
  ) {
    super({ customersApiBaseUrl, packageCredentials, logger });
    //this.mapper = mapper;
  }
}
