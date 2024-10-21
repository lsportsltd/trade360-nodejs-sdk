import { BaseHttpClient } from '@httpClient';

import { IMetadataHttpClient } from '@customers-api/interfaces';

import {
  IHttpServiceConfig,
  LocationsCollectionResponse,
  SportsCollectionResponse,
} from '@api/common';

import { Location, Sport } from '@entities';

import { MetadataRoutesPrefixUrl } from '.';

/**
 * MetadataHttpClient class is responsible for sending requests to the metadata API.
 * It extends the BaseHttpClient class and contains the logic for sending requests
 * to the metadata API.
 * @param packageCredentials The package credentials for the API
 * @param customersApiBaseUrl The base URL of the customers API
 * @param logger The logger instance
 * @returns MetadataHttpClient instance that is responsible for sending requests
 * to the metadata API.
 * @extends BaseHttpClient class for sending requests to the customers API.
 * @implements IMetadataHttpClient interface for sending requests to the metadata API.
 * @see BaseHttpClient class for sending requests to the customers API.
 * @see IMetadataHttpClient interface for sending requests to the metadata API.
 * @see IHttpServiceConfig interface for the configuration of the HTTP service.
 */
export class MetadataHttpClient extends BaseHttpClient implements IMetadataHttpClient {
  // private readonly mapper: IMapper;

  constructor(
    { packageCredentials, customersApiBaseUrl, logger }: IHttpServiceConfig /*, mapper: IMapper*/,
  ) {
    super({ customersApiBaseUrl, packageCredentials, logger });
    //this.mapper = mapper;
  }

  public async getLocations(): Promise<Location[]> {
    const locationsCollection = await this.postRequest<LocationsCollectionResponse>(
      MetadataRoutesPrefixUrl.GET_LOCATIONS_PREFIX_URL,
      LocationsCollectionResponse,
    );

    return locationsCollection?.body.locations || [];
  }

  public async getSports(): Promise<Sport[]> {
    const sportsCollection = await this.postRequest<SportsCollectionResponse>(
      MetadataRoutesPrefixUrl.GET_SPORTS_PREFIX_URL,
      SportsCollectionResponse,
    );
    return sportsCollection?.body.sports || [];
  }
}
