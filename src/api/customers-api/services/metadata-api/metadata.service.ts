import { IHttpServiceConfig, IMapper } from '@api/common';
import { MetadataRoutesPrefixUrl } from '@customers-api/enums';
import { IMetadataHttpClient } from '@customers-api/interfaces';
import { GetTranslationsRequestValidator } from '@customers-api/validators';
import { BaseHttpClient } from '@httpClient';
import {
  LeaguesBodyStructure,
  LocationsBodyStructure,
  MarketBodyStructure,
  SportsBodyStructure,
} from '@metadata-api/body-entities';
import {
  GetCompetitionsRequestDto,
  GetFixturesMetadataRequestDto,
  GetLeaguesRequestDto,
  GetMarketsRequestDto,
  GetTranslationsRequestDto,
} from '@metadata-api/dtos';
import {
  GetCompetitionsRequest,
  GetFixturesMetadataRequest,
  GetLeaguesRequest,
  GetMarketsRequest,
  GetTranslationsRequest,
} from '@metadata-api/requests';
import {
  CompetitionCollectionResponse,
  FixturesMetadataCollectionResponse,
  LeaguesCollectionResponse,
  LocationsCollectionResponse,
  MarketsCollectionResponse,
  SportsCollectionResponse,
  TranslationsCollectionResponse,
} from '@metadata-api/responses';

/**
 * MetadataHttpClient class is responsible for sending requests to the metadata API.
 * It extends the BaseHttpClient class and contains the logic for sending requests
 * to the metadata API.
 * @param packageCredentials The package credentials for the API
 * @param customersApiBaseUrl The base URL of the customers API
 * @param logger The logger instance
 * @param mapper The mapper instance
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
   * @throws Error if mapping configuration is not found or if the request is invalid
   * or incorrect.
   */
  public async getLocations(): Promise<LocationsBodyStructure[]> {
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
   * @throws Error if mapping configuration is not found or if the request is invalid
   * or incorrect.
   */
  public async getSports(): Promise<SportsBodyStructure[]> {
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
   * @throws Error if mapping configuration is not found or if the request is invalid
   * or incorrect.
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
   * @throws Error if mapping configuration is not found or if the request is invalid
   * or incorrect.
   */
  public async getMarkets(requestDto: GetLeaguesRequestDto): Promise<MarketBodyStructure[]> {
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

  /**
   * getTranslations method is responsible for sending a request to the metadata API
   * to get the translations. It sends a POST request to the metadata API with the
   * GET_TRANSACTIONS_PREFIX_URL and TransactionsCollectionResponse as the response type.
   * If the request does not have any optional field to translate- the response will
   * return an ErrorCode 400 and the message will include the error.
   * If the request is without Languages field- the response will return an error with
   * an informative message.
   */
  public async getTranslations(
    requestDto: GetTranslationsRequestDto,
  ): Promise<TranslationsCollectionResponse> {
    const request = this.mapper.map<GetTranslationsRequestDto, GetTranslationsRequest>(
      requestDto,
      GetTranslationsRequest,
    );

    await GetTranslationsRequestValidator.validate(request);

    const translationsCollection = await this.postRequest<TranslationsCollectionResponse>(
      MetadataRoutesPrefixUrl.GET_TRANSLATION_PREFIX_URL,
      TranslationsCollectionResponse,
      request,
    );

    return translationsCollection?.body || {};
  }

  /**
   * getCompetitions method is responsible for sending a request to the metadata API
   * to get the competitions. It sends a POST request to the metadata API with the
   * GET_COMPETITIONS_PREFIX_URL and CompetitionCollectionResponse as the response type.
   */
  public async getCompetitions(
    requestDto: GetCompetitionsRequestDto,
  ): Promise<CompetitionCollectionResponse> {
    const request = this.mapper.map<GetCompetitionsRequestDto, GetCompetitionsRequest>(
      requestDto,
      GetCompetitionsRequest,
    );

    const competitionsCollection = await this.postRequest<CompetitionCollectionResponse>(
      MetadataRoutesPrefixUrl.GET_COMPETITIONS_PREFIX_URL,
      CompetitionCollectionResponse,
      request,
    );

    return competitionsCollection?.body || {};
  }

  /**
   * getFixturesMetadata method is responsible for sending a request to the metadata API
   * to get the fixtures metadata. It sends a GET request to the metadata API with the
   * GET_SUBSCRIBED_FIXTURES_METADATA_PREFIX_URL and FixturesMetadataCollectionResponse
   * as the response type. The request contains the properties for the request to get
   * fixture metadata from the API. The response will automatically trim and provide
   * data only for the upcoming week if the date range is more than 7 days.
   */
  public async getFixturesMetadata(
    requestDto: GetFixturesMetadataRequestDto,
  ): Promise<FixturesMetadataCollectionResponse> {
    const request = this.mapper.map<GetFixturesMetadataRequestDto, GetFixturesMetadataRequest>(
      requestDto,
      GetFixturesMetadataRequest,
    );

    const fixturesMetadataCollection = await this.getRequest<FixturesMetadataCollectionResponse>(
      MetadataRoutesPrefixUrl.GET_SUBSCRIBED_FIXTURES_METADATA_PREFIX_URL,
      FixturesMetadataCollectionResponse,
      request,
    );

    return fixturesMetadataCollection?.body || {};
  }
}
