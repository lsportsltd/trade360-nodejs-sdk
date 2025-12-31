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
  GetIncidentsRequestDto,
  GetVenuesRequestDto,
  GetCitiesRequestDto,
  GetStatesRequestDto,
  GetParticipantsRequestDto,
  GetSeasonsRequestDto,
  GetToursRequestDto,
} from '@metadata-api/dtos';
import {
  GetCompetitionsRequest,
  GetLeaguesRequest,
  GetMarketsRequest,
  GetTranslationsRequest,
  GetIncidentsRequest,
  GetVenuesRequest,
  GetCitiesRequest,
  GetStatesRequest,
  GetParticipantsRequest,
  GetSeasonsRequest,
  GetToursRequest,
} from '@metadata-api/requests';
import {
  CompetitionCollectionResponse,
  LeaguesCollectionResponse,
  LocationsCollectionResponse,
  MarketsCollectionResponse,
  SportsCollectionResponse,
  TranslationsCollectionResponse,
  IncidentsCollectionResponse,
  VenuesCollectionResponse,
  CitiesCollectionResponse,
  StatesCollectionResponse,
  ParticipantsCollectionResponse,
  SeasonsCollectionResponse,
  ToursCollectionResponse,
} from '@metadata-api/responses';

const {
  GET_COMPETITIONS_PREFIX_URL,
  GET_LEAGUES_PREFIX_URL,
  GET_LOCATIONS_PREFIX_URL,
  GET_MARKETS_PREFIX_URL,
  GET_SPORTS_PREFIX_URL,
  GET_TRANSLATION_PREFIX_URL,
  GET_INCIDENT_PREFIX_URL,
  GET_VENUES_PREFIX_URL,
  GET_CITIES_PREFIX_URL,
  GET_STATES_PREFIX_URL,
  GET_PARTICIPANTS_PREFIX_URL,
  GET_SEASONS_PREFIX_URL,
  GET_TOURS_PREFIX_URL,
} = MetadataRoutesPrefixUrl;

/**
 * MetadataHttpClient class is responsible for sending requests
 * to the metadata API. It extends the BaseHttpClient class and
 * contains the logic for sending requests to the metadata API.
 * @param packageCredentials The package credentials for the API
 * @param restApiBaseUrl The base URL of the customers API
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

  constructor({ packageCredentials, restApiBaseUrl, logger }: IHttpServiceConfig, mapper: IMapper) {
    super({ restApiBaseUrl, packageCredentials, logger });
    this.mapper = mapper;
  }

  /**
   * getLocations method is responsible for sending a request
   * to the metadata API to get the locations. It sends a POST
   * request to the metadata API with the GET_LOCATIONS_PREFIX_URL
   *  and LocationsCollectionResponse as the response type.
   * If the request is without "languageId" - the response returns
   * a list of "id" and "name" in English.
   * If The request is with "languagesId" that invalid - ErrorCode
   * 400 and error message - "Incorrect request, please enter a
   * valid Language and resend your request."
   * If the request is with "languageId" and there are some sports
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
   * If the request is without "languageId" - the response
   * returns a list of "id" and "name" in English.
   * If The request is with "languagesId" that invalid -
   * ErrorCode 400 and error message - "Incorrect request,
   * please enter a valid Language and resend your request."
   * If the request is with "languageId" and there are some
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
   * If the request is without "languageId" - the response
   * returns a list of "id" and "name" in English.
   * If The request is with "languagesId" that invalid -
   * ErrorCode 400 and error message - "Incorrect request,
   * please enter a valid Language and resend your request."
   * If the request is with "LanguageId" and there are some
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
   * If the request is without "languageId" - the response
   * returns a list of "id" and "name" in English.
   * If The request is with "languagesId" that invalid -
   * ErrorCode 400 and error message - "Incorrect request,
   * please enter a valid Language and resend your request."
   * If the request is with "LanguageId" and there are some
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

  /**
   * getIncidents method is responsible for sending a request
   * to the metadata API to get the incidents.
   * It sends a POST request to the metadata API with the
   * GET_INCIDENT_PREFIX_URL and IncidentsCollectionResponse
   * as the response type.
   * @param requestDto The request DTO for getting incidents
   * from the metadata API.
   * @returns A promise that contains the incidents data and total count.
   * @throws Error if the request is invalid or incorrect.
   */
  public async getIncidents(
    requestDto: GetIncidentsRequestDto,
  ): Promise<IncidentsCollectionResponse | undefined> {
    const request = this.mapper.map<GetIncidentsRequestDto, GetIncidentsRequest>(
      requestDto,
      GetIncidentsRequest,
    );

    const response = await this.postRequest<IncidentsCollectionResponse>({
      route: GET_INCIDENT_PREFIX_URL,
      responseBodyType: IncidentsCollectionResponse,
      requestBody: request,
    });

    return response;
  }

  /**
   * getVenues method is responsible for sending a request
   * to the metadata API to get the venues.
   * It sends a POST request to the metadata API with the
   * GET_VENUES_PREFIX_URL and VenuesCollectionResponse
   * as the response type.
   * @param requestDto The request DTO for getting venues
   * from the metadata API.
   * @returns A promise that contains the venues data and total count.
   * @throws Error if the request is invalid or incorrect.
   */
  public async getVenues(
    requestDto: GetVenuesRequestDto,
  ): Promise<VenuesCollectionResponse | undefined> {
    const request = this.mapper.map<GetVenuesRequestDto, GetVenuesRequest>(
      requestDto,
      GetVenuesRequest,
    );

    const response = await this.postRequest<VenuesCollectionResponse>({
      route: GET_VENUES_PREFIX_URL,
      responseBodyType: VenuesCollectionResponse,
      requestBody: request,
    });

    return response;
  }

  /**
   * getCities method is responsible for sending a request
   * to the metadata API to get the cities.
   * It sends a POST request to the metadata API with the
   * GET_CITIES_PREFIX_URL and CitiesCollectionResponse
   * as the response type.
   * @param requestDto The request DTO for getting cities
   * from the metadata API.
   * @returns A promise that contains the cities data and total count.
   * @throws Error if the request is invalid or incorrect.
   */
  public async getCities(
    requestDto: GetCitiesRequestDto,
  ): Promise<CitiesCollectionResponse | undefined> {
    const request = this.mapper.map<GetCitiesRequestDto, GetCitiesRequest>(
      requestDto,
      GetCitiesRequest,
    );

    const response = await this.postRequest<CitiesCollectionResponse>({
      route: GET_CITIES_PREFIX_URL,
      responseBodyType: CitiesCollectionResponse,
      requestBody: request,
    });

    return response;
  }

  /**
   * getStates method is responsible for sending a request
   * to the metadata API to get the states.
   * It sends a POST request to the metadata API with the
   * GET_STATES_PREFIX_URL and StatesCollectionResponse
   * as the response type.
   * @param requestDto The request DTO for getting states
   * from the metadata API.
   * @returns A promise that contains the states data and total count.
   * @throws Error if the request is invalid or incorrect.
   */
  public async getStates(
    requestDto: GetStatesRequestDto,
  ): Promise<StatesCollectionResponse | undefined> {
    const request = this.mapper.map<GetStatesRequestDto, GetStatesRequest>(
      requestDto,
      GetStatesRequest,
    );

    const response = await this.postRequest<StatesCollectionResponse>({
      route: GET_STATES_PREFIX_URL,
      responseBodyType: StatesCollectionResponse,
      requestBody: request,
    });

    return response;
  }

  /**
   * getParticipants method is responsible for sending a request
   * to the metadata API to get the participants.
   * It sends a POST request to the metadata API with the
   * GET_PARTICIPANTS_PREFIX_URL and ParticipantsCollectionResponse
   * as the response type.
   * @param requestDto The request DTO for getting participants
   * from the metadata API.
   * @returns A promise that contains the participants data and total count.
   * @throws Error if the request is invalid or incorrect.
   */
  public async getParticipants(
    requestDto: GetParticipantsRequestDto,
  ): Promise<ParticipantsCollectionResponse | undefined> {
    const request = this.mapper.map<GetParticipantsRequestDto, GetParticipantsRequest>(
      requestDto,
      GetParticipantsRequest,
    );

    const response = await this.postRequest<ParticipantsCollectionResponse>({
      route: GET_PARTICIPANTS_PREFIX_URL,
      responseBodyType: ParticipantsCollectionResponse,
      requestBody: request,
    });

    return response;
  }

  /**
   * getSeasons method is responsible for sending a request
   * to the metadata API to get the seasons.
   * It sends a POST request to the metadata API with the
   * GET_SEASONS_PREFIX_URL and SeasonsCollectionResponse
   * as the response type.
   * @param requestDto The request DTO for getting seasons
   * from the metadata API.
   * @returns A promise that contains the seasons data.
   * @throws Error if the request is invalid or incorrect.
   */
  public async getSeasons(
    requestDto: GetSeasonsRequestDto,
  ): Promise<SeasonsCollectionResponse | undefined> {
    const request = this.mapper.map<GetSeasonsRequestDto, GetSeasonsRequest>(
      requestDto,
      GetSeasonsRequest,
    );

    const response = await this.postRequest<SeasonsCollectionResponse>({
      route: GET_SEASONS_PREFIX_URL,
      responseBodyType: SeasonsCollectionResponse,
      requestBody: request,
    });

    return response;
  }

  /**
   * getTours method is responsible for sending a request
   * to the metadata API to get the tours.
   * It sends a POST request to the metadata API with the
   * GET_TOURS_PREFIX_URL and ToursCollectionResponse
   * as the response type.
   * @param requestDto The request DTO for getting tours
   * from the metadata API.
   * @returns A promise that contains the tours data.
   * @throws Error if the request is invalid or incorrect.
   */
  public async getTours(
    requestDto: GetToursRequestDto,
  ): Promise<ToursCollectionResponse | undefined> {
    const request = this.mapper.map<GetToursRequestDto, GetToursRequest>(
      requestDto,
      GetToursRequest,
    );

    const response = await this.postRequest<ToursCollectionResponse>({
      route: GET_TOURS_PREFIX_URL,
      responseBodyType: ToursCollectionResponse,
      requestBody: request,
    });

    return response;
  }
}
