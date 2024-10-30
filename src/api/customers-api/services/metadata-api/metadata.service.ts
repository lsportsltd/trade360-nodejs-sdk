import { BaseHttpClient } from '@httpClient';
import { IMetadataHttpClient } from '@customers-api/interfaces';
import { MetadataRoutesPrefixUrl } from '@customers-api/enums';
import {
  GetLeaguesRequest,
  GetLeaguesRequestDto,
  GetMarketsRequest,
  GetMarketsRequestDto,
  IHttpServiceConfig,
  IMapper,
  LeaguesBodyStructure,
  LeaguesCollectionResponse,
  LocationsCollectionResponse,
  MarketBodyStructure,
  MarketsCollectionResponse,
  SportsCollectionResponse,
} from '@api/common';
import { Location, Sport } from '@entities';

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
  private readonly mapper: IMapper;

  constructor(
    { packageCredentials, customersApiBaseUrl, logger }: IHttpServiceConfig,
    mapper: IMapper,
  ) {
    super({ customersApiBaseUrl, packageCredentials, logger });
    this.mapper = mapper;
  }

  /**
   * getLocations method is responsible for sending a request to the metadata API
   * to get the locations. It sends a POST request to the metadata API with the
   * GET_LOCATIONS_PREFIX_URL and LocationsCollectionResponse as the response type.
   * If the request is without “languageId” - the response returns a list of “id”
   * and “name” in English.
   * If The request is with “languagesId” that invalid - ErrorCode 400 and error
   * message - "Incorrect request, please enter a valid Language and resend your
   * request."
   * If the request is with “languageId” and there are some sports that don't
   * have a translation in this language - it's not returned (without an error).
   * @returns A promise that contains the locations.
   */
  public async getLocations(): Promise<Location[]> {
    const locationsCollection = await this.postRequest<LocationsCollectionResponse>(
      MetadataRoutesPrefixUrl.GET_LOCATIONS_PREFIX_URL,
      LocationsCollectionResponse,
    );

    return locationsCollection?.body.locations || [];
  }

  /**
   * getSports method is responsible for sending a request to the metadata API
   * to get the sports. It sends a POST request to the metadata API with the
   * GET_SPORTS_PREFIX_URL and SportsCollectionResponse as the response type.
   * If the request is without “languageId” - the response returns a list of “id”
   * and “name” in English.
   * If The request is with “languagesId” that invalid - ErrorCode 400 and error
   * message - "Incorrect request, please enter a valid Language and resend your
   * request."
   * If the request is with “languageId” and there are some sports that don't
   * have a translation in this language - it's not returned (without an error).
   * @returns A promise that contains the sports.
   */
  public async getSports(): Promise<Sport[]> {
    const sportsCollection = await this.postRequest<SportsCollectionResponse>(
      MetadataRoutesPrefixUrl.GET_SPORTS_PREFIX_URL,
      SportsCollectionResponse,
    );
    return sportsCollection?.body.sports || [];
  }

  /**
   * getLeagues method is responsible for sending a request to the metadata API
   * to get the leagues.
   * It sends a POST request to the metadata API with the GET_LEAGUES_PREFIX_URL
   * and LeaguesCollectionResponse as the response type.
   * If the request is without “languageId” - the response returns a list of “id”
   * and “name” in English.
   * If The request is with “languagesId” that invalid - ErrorCode 400 and error
   * message - "Incorrect request, please enter a valid Language and resend your
   * request."
   * If the request is with “LanguageId” and there are some sports that don't
   * have a translation in this language - it's not returned (without an error).
   * @param requestDto The request DTO
   * @returns A promise that contains the leagues.
   * @throws Error if mapping configuration is not found
   */
  public async getLeagues(requestDto: GetLeaguesRequestDto): Promise<LeaguesBodyStructure[]> {
    const request = this.mapper.map<GetLeaguesRequestDto, GetLeaguesRequest>(
      requestDto,
      GetLeaguesRequest,
    );

    const leaguesCollection = await this.postRequest<LeaguesCollectionResponse>(
      MetadataRoutesPrefixUrl.GET_LEAGUES_PREFIX_URL,
      LeaguesCollectionResponse,
      request,
    );
    return leaguesCollection?.body.leagues || [];
  }

  /**
   * getMarkets method is responsible for sending a request to the metadata API
   * to get the markets. It sends a POST request to the metadata API with the
   * GET_MARKETS_PREFIX_URL and MarketsCollectionResponse as the response type.
   * If the request is without “languageId” - the response returns a list of “id”
   * and “name” in English.
   * If The request is with “languagesId” that invalid - ErrorCode 400 and error
   * message - "Incorrect request, please enter a valid Language and resend your
   * request."
   * If the request is with “LanguageId” and there are some sports that don't
   * have a translation in this language - it's not returned (without an error).
   * @param requestDto The request DTO for getting markets from the metadata API.
   * @returns A promise that contains the markets.
   * @throws Error if mapping configuration is not found
   */
  async getMarkets(requestDto: GetLeaguesRequestDto): Promise<MarketBodyStructure[]> {
    const request = this.mapper.map<GetMarketsRequestDto, GetMarketsRequest>(
      requestDto,
      GetMarketsRequest,
    );
    const marketsCollection = await this.postRequest<MarketsCollectionResponse>(
      MetadataRoutesPrefixUrl.GET_MARKETS_PREFIX_URL,
      MarketsCollectionResponse,
      request,
    );
    return marketsCollection?.body.markets || [];
  }
}
