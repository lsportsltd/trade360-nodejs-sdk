import { IHttpServiceConfig, IMapper } from '@api/common';
import {
  LeaguesBodyStructure,
  LocationsBodyStructure,
  MarketBodyStructure,
  SportsBodyStructure,
} from '@api/common/body-entities/responses';
import { MetadataRoutesPrefixUrl } from '@customers-api/enums';
import { IMetadataHttpClient } from '@customers-api/interfaces';
import { GetTranslationsRequestValidator } from '@customers-api/validators';
import { BaseHttpClient } from '@httpClient';
import {
  GetCompetitionsRequestDto,
  GetLeaguesRequestDto,
  GetMarketsRequestDto,
  GetTranslationsRequestDto,
} from '@metadata-api/dtos';
import {
  GetCompetitionsRequest,
  GetLeaguesRequest,
  GetMarketsRequest,
  GetTranslationsRequest,
} from '@metadata-api/requests';
import {
  CompetitionCollectionResponse,
  LeaguesCollectionResponse,
  LocationsCollectionResponse,
  MarketsCollectionResponse,
  SportsCollectionResponse,
  TranslationsCollectionResponse,
} from '@metadata-api/responses';

const {
  GET_COMPETITIONS_PREFIX_URL,
  GET_LEAGUES_PREFIX_URL,
  GET_LOCATIONS_PREFIX_URL,
  GET_MARKETS_PREFIX_URL,
  GET_SPORTS_PREFIX_URL,
  GET_TRANSLATION_PREFIX_URL,
} = MetadataRoutesPrefixUrl;

/**
 * MetadataHttpClient class is responsible for sending requests
 * to the metadata API. It extends the BaseHttpClient class and
 * contains the logic for sending requests to the metadata API.
 * @param packageCredentials The package credentials for the API
 * @param customersApiBaseUrl The base URL of the customers API
 * @param logger The logger instance
 * @param mapper The mapper instance
 * @returns MetadataHttpClient instance that is responsible for
 * sending requests to the metadata API.
 * @extends BaseHttpClient class for sending requests to the
 * customers API.
 * @implements IMetadataHttpClient interface for sending
 * requests to the metadata API.
 * @see BaseHttpClient class for sending requests to the
 * customers API.
 * @see IMetadataHttpClient interface for sending requests to
 * the metadata API.
 * @see IHttpServiceConfig interface for the configuration of
 * the HTTP service.
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
   * getLocations method is responsible for sending a request
   * to the metadata API to get the locations. It sends a POST
   * request to the metadata API with the GET_LOCATIONS_PREFIX_URL
   *  and LocationsCollectionResponse as the response type.
   * If the request is without “languageId” - the response returns
   * a list of “id” and “name” in English.
   * If The request is with “languagesId” that invalid - ErrorCode
   * 400 and error message - "Incorrect request, please enter a
   * valid Language and resend your request."
   * If the request is with “languageId” and there are some sports
   * that don't have a translation in this language - it's not
   * returned (without an error).
   * @returns A promise that contains the locations.
   * @throws Error if mapping configuration is not found or if the
   * request is invalid or incorrect.
   */
  public async getLocations(): Promise<LocationsBodyStructure[] | undefined> {
    const locationsCollection = await this.postRequest<LocationsCollectionResponse>({
      route: GET_LOCATIONS_PREFIX_URL,
      responseBodyType: LocationsCollectionResponse,
    });

    return locationsCollection?.locations;
  }

  /**
   * getSports method is responsible for sending a request
   * to the metadata API to get the sports. It sends a POST
   * request to the metadata API with the GET_SPORTS_PREFIX_URL
   * and SportsCollectionResponse as the response type.
   * If the request is without “languageId” - the response
   * returns a list of “id” and “name” in English.
   * If The request is with “languagesId” that invalid -
   * ErrorCode 400 and error message - "Incorrect request,
   * please enter a valid Language and resend your request."
   * If the request is with “languageId” and there are some
   * sports that don't have a translation in this language -
   * it's not returned (without an error).
   * @returns A promise that contains the sports.
   * @throws Error if mapping configuration is not found or
   * if the request is invalid or incorrect.
   */
  public async getSports(): Promise<SportsBodyStructure[] | undefined> {
    const sportsCollection = await this.postRequest<SportsCollectionResponse>({
      route: GET_SPORTS_PREFIX_URL,
      responseBodyType: SportsCollectionResponse,
    });
    return sportsCollection?.sports;
  }

  /**
   * getLeagues method is responsible for sending a request
   * to the metadata API to get the leagues.
   * It sends a POST request to the metadata API with the
   * GET_LEAGUES_PREFIX_URL and LeaguesCollectionResponse as
   * the response type.
   * If the request is without “languageId” - the response
   * returns a list of “id” and “name” in English.
   * If The request is with “languagesId” that invalid -
   * ErrorCode 400 and error message - "Incorrect request,
   * please enter a valid Language and resend your request."
   * If the request is with “LanguageId” and there are some
   * sports that don't have a translation in this language -
   * it's not returned (without an error).
   * @param requestDto The request DTO
   * @returns A promise that contains the leagues.
   * @throws Error if mapping configuration is not found or
   * if the request is invalid or incorrect.
   */
  public async getLeagues(
    requestDto: GetLeaguesRequestDto,
  ): Promise<LeaguesBodyStructure[] | undefined> {
    const request = this.mapper.map<GetLeaguesRequestDto, GetLeaguesRequest>(
      requestDto,
      GetLeaguesRequest,
    );

    const leaguesCollection = await this.postRequest<LeaguesCollectionResponse>({
      route: GET_LEAGUES_PREFIX_URL,
      responseBodyType: LeaguesCollectionResponse,
      requestBody: request,
    });

    return leaguesCollection?.leagues;
  }

  /**
   * getMarkets method is responsible for sending a request
   * to the metadata API to get the markets. It sends a POST
   * request to the metadata API with the GET_MARKETS_PREFIX_URL
   *  and MarketsCollectionResponse as the response type.
   * If the request is without “languageId” - the response
   * returns a list of “id” and “name” in English.
   * If The request is with “languagesId” that invalid -
   * ErrorCode 400 and error message - "Incorrect request,
   * please enter a valid Language and resend your request."
   * If the request is with “LanguageId” and there are some
   * sports that don't have a translation in this language -
   * it's not returned (without an error).
   * @param requestDto The request DTO for getting markets
   * from the metadata API.
   * @returns A promise that contains the markets.
   * @throws Error if mapping configuration is not found or
   * if the request is invalid or incorrect.
   */
  public async getMarkets(
    requestDto: GetLeaguesRequestDto,
  ): Promise<MarketBodyStructure[] | undefined> {
    const request = this.mapper.map<GetMarketsRequestDto, GetMarketsRequest>(
      requestDto,
      GetMarketsRequest,
    );

    const marketsCollection = await this.postRequest<MarketsCollectionResponse>({
      route: GET_MARKETS_PREFIX_URL,
      responseBodyType: MarketsCollectionResponse,
      requestBody: request,
    });

    return marketsCollection?.markets;
  }

  /**
   * getTranslations method is responsible for sending a request
   * to the metadata API to get the translations. It sends a POST
   * request to the metadata API with the GET_TRANSACTIONS_PREFIX_URL
   * and TransactionsCollectionResponse as the response type. If the
   * request does not have any optional field to translate- the
   * response will return an ErrorCode 400 and the message will
   * include the error. If the request is without Languages field -
   * the response will return an error with an informative message.
   */
  public async getTranslations(
    requestDto: GetTranslationsRequestDto,
  ): Promise<TranslationsCollectionResponse | undefined> {
    const request = this.mapper.map<GetTranslationsRequestDto, GetTranslationsRequest>(
      requestDto,
      GetTranslationsRequest,
    );

    await GetTranslationsRequestValidator.validate(request);

    const translationsCollection = await this.postRequest<TranslationsCollectionResponse>({
      route: GET_TRANSLATION_PREFIX_URL,
      responseBodyType: TranslationsCollectionResponse,
      requestBody: request,
    });

    return translationsCollection;
  }

  /**
   * getCompetitions method is responsible for sending a request
   * to the metadata API to get the competitions. It sends a POST
   * request to the metadata API with the GET_COMPETITIONS_PREFIX_URL
   * and CompetitionCollectionResponse as the response type.
   */
  public async getCompetitions(
    requestDto: GetCompetitionsRequestDto,
  ): Promise<CompetitionCollectionResponse | undefined> {
    const request = this.mapper.map<GetCompetitionsRequestDto, GetCompetitionsRequest>(
      requestDto,
      GetCompetitionsRequest,
    );

    const competitionsCollection = await this.postRequest<CompetitionCollectionResponse>({
      route: GET_COMPETITIONS_PREFIX_URL,
      responseBodyType: CompetitionCollectionResponse,
      requestBody: request,
    });

    return competitionsCollection;
  }
}
