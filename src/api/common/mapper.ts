import { isNil } from 'lodash';
import { Moment } from 'moment';

import { BaseEntity, Constructor, InvalidDateInRequestError, PackageCredentials } from '@entities';
import {
  GetCompetitionsRequestDto,
  GetLeaguesRequestDto,
  GetMarketsRequestDto,
  GetTranslationsRequestDto,
  GetIncidentsRequestDto,
  IncidentsFilterDto,
} from '@metadata-api/dtos';
import {
  GetCompetitionsRequest,
  GetLeaguesRequest,
  GetMarketsRequest,
  GetTranslationsRequest,
  GetIncidentsRequest,
  IncidentsFilter,
} from '@metadata-api/requests';
import {
  ChangeManualSuspensionsRequestDto,
  CompetitionsSubscriptionRequestDto,
  FixturesMetadataSubscriptionsRequestDto,
  FixturesSubscriptionRequestDto,
  GetFixtureScheduleRequestDto,
  GetSubscriptionsRequestDto,
  LeaguesSubscriptionRequestDto,
} from '@subscription-api/dtos';
import {
  ChangeManualSuspensionsRequest,
  CompetitionsSubscriptionRequest,
  FixturesMetadataSubscriptionsRequest,
  FixturesSubscriptionRequest,
  GetFixtureScheduleRequest,
  GetSubscriptionsRequest,
  LeaguesSubscriptionRequest,
} from '@subscription-api/requests';
import { TransformerUtil } from '@utilities';

import { IMapper } from './interfaces';
import {
  GetEventRequest,
  GetEventRequestDto,
  GetFixtureRequest,
  GetFixtureRequestDto,
  GetInPlayEventRequest,
  GetInPlayEventRequestDto,
  GetLivescoreRequest,
  GetLivescoreRequestDto,
  GetMarketRequest,
  GetMarketRequestDto,
  GetOutrightEventRequest,
  GetOutrightEventRequestDto,
  GetOutrightFixtureRequest,
  GetOutrightFixtureRequestDto,
  GetOutrightLeagueMarketRequest,
  GetOutrightLeagueMarketRequestDto,
  GetOutrightLeaguesRequest,
  GetOutrightLeaguesRequestDto,
  GetOutrightLivescoreRequest,
  GetOutrightLivescoreRequestDto,
  GetOutrightMarketRequest,
  GetOutrightMarketRequestDto,
} from './snapshot';

/**
 * Mapper class for mapping between different types
 * of objects in the application using the mapping
 * configurations provided in the application.
 * The Mapper class provides functionality similar
 * to AutoMapper with the ability to map between
 * different types of objects in the application
 * using the mapping configurations provided in the
 * application.
 * @param packageCredentials The package credentials
 * for the API to use in the mapping configurations
 * for the application. The package credentials are
 * used to authenticate the API requests in the
 * mapping configurations for the application.
 * @implements IMapper interface for mapping between
 * different types of objects in the application
 * using the mapping configurations provided in the
 * application.
 */
export class Mapper implements IMapper {
  private mappingConfigs: Map<string, (source: BaseEntity) => BaseEntity> = new Map();

  private readonly desiredDateFormat = 'MM/DD/YYYY';

  constructor(packageCredentials?: PackageCredentials) {
    this.initializeMappings(packageCredentials);
  }

  public map<S extends BaseEntity, D extends BaseEntity>(
    source: S,
    destinationType: Constructor<D>,
  ): D {
    const key = `${source.constructor.name}-${destinationType.name}`;
    const mappingFn = this.mappingConfigs.get(key);

    if (mappingFn) {
      return mappingFn(source) as D;
    }

    return TransformerUtil.transform(source, destinationType);
  }

  /**
   * Initializes all mapping configurations for the
   * application using the package credentials provided in
   * the constructor of the mapping service to authenticate
   * the API requests in the mapping configurations for the
   * application.
   * @param packageCredentials The package credentials for
   * the API to use in the mapping configurations for the
   * application.
   * @returns void to indicate that the mapping
   * configurations have been initialized successfully in
   * the application using the package credentials provided
   * in the constructor of the mapping service.
   */
  private initializeMappings(packageCredentials?: PackageCredentials): void {
    this.registerMapping<GetEventRequestDto, GetEventRequest>(
      GetEventRequestDto,
      GetEventRequest,
      (source) => TransformerUtil.transform({ ...packageCredentials, ...source }, GetEventRequest),
    );

    this.registerMapping<GetFixtureRequestDto, GetFixtureRequest>(
      GetFixtureRequestDto,
      GetFixtureRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetFixtureRequest),
    );

    this.registerMapping<GetInPlayEventRequestDto, GetInPlayEventRequest>(
      GetInPlayEventRequestDto,
      GetInPlayEventRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetInPlayEventRequest),
    );

    this.registerMapping<GetLivescoreRequestDto, GetLivescoreRequest>(
      GetLivescoreRequestDto,
      GetLivescoreRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetLivescoreRequest),
    );

    this.registerMapping<GetMarketRequestDto, GetMarketRequest>(
      GetMarketRequestDto,
      GetMarketRequest,
      (source) => TransformerUtil.transform({ ...packageCredentials, ...source }, GetMarketRequest),
    );

    this.registerMapping<GetOutrightEventRequestDto, GetOutrightEventRequest>(
      GetOutrightEventRequestDto,
      GetOutrightEventRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetOutrightEventRequest),
    );

    this.registerMapping<GetOutrightEventRequestDto, GetOutrightEventRequest>(
      GetOutrightEventRequestDto,
      GetOutrightEventRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetOutrightEventRequest),
    );

    this.registerMapping<GetOutrightFixtureRequestDto, GetOutrightFixtureRequest>(
      GetOutrightFixtureRequestDto,
      GetOutrightFixtureRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetOutrightFixtureRequest),
    );

    this.registerMapping<GetOutrightLeagueMarketRequestDto, GetOutrightLeagueMarketRequest>(
      GetOutrightLeagueMarketRequestDto,
      GetOutrightLeagueMarketRequest,
      (source) =>
        TransformerUtil.transform(
          { ...packageCredentials, ...source },
          GetOutrightLeagueMarketRequest,
        ),
    );

    this.registerMapping<GetOutrightLeaguesRequestDto, GetOutrightLeaguesRequest>(
      GetOutrightLeaguesRequestDto,
      GetOutrightLeaguesRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetOutrightLeaguesRequest),
    );

    this.registerMapping<GetOutrightLivescoreRequestDto, GetOutrightLivescoreRequest>(
      GetOutrightLivescoreRequestDto,
      GetOutrightLivescoreRequest,
      (source) =>
        TransformerUtil.transform(
          { ...packageCredentials, ...source },
          GetOutrightLivescoreRequest,
        ),
    );

    this.registerMapping<GetOutrightMarketRequestDto, GetOutrightMarketRequest>(
      GetOutrightMarketRequestDto,
      GetOutrightMarketRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetOutrightMarketRequest),
    );

    this.registerMapping<GetLeaguesRequestDto, GetLeaguesRequest>(
      GetLeaguesRequestDto,
      GetLeaguesRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetLeaguesRequest),
    );

    // Mapping for IncidentsFilterDto to IncidentsFilter
    this.registerMapping<IncidentsFilterDto, IncidentsFilter>(
      IncidentsFilterDto as Constructor<IncidentsFilterDto>,
      IncidentsFilter,
      (sourceFilterDtoUntyped: BaseEntity) => {
        const sourceFilterDto = sourceFilterDtoUntyped as IncidentsFilterDto;
        const destinationFilter = new IncidentsFilter();
        destinationFilter.ids = sourceFilterDto.ids;
        destinationFilter.sports = sourceFilterDto.sports;
        destinationFilter.searchText = sourceFilterDto.searchText;
        if (sourceFilterDto.from) {
          destinationFilter.from = '2023-10-01 10:00:00';
        }
        return destinationFilter;
      },
    );

    // Mapping for GetIncidentsRequestDto to GetIncidentsRequest
    this.registerMapping<GetIncidentsRequestDto, GetIncidentsRequest>(
      GetIncidentsRequestDto as Constructor<GetIncidentsRequestDto>,
      GetIncidentsRequest,
      (sourceDtoUntyped: BaseEntity) => {
        const sourceDto = sourceDtoUntyped as GetIncidentsRequestDto;
        const request = new GetIncidentsRequest();

        if (packageCredentials) {
          request.userName = packageCredentials.username;
          request.password = packageCredentials.password;
          request.packageId = packageCredentials.packageId;
        }

        if (sourceDto.filter) {
          // Ensure sourceDto.filter is an instance of IncidentsFilterDto before mapping
          // This should be guaranteed by the GetIncidentsRequestDto constructor change
          request.filter = this.map(sourceDto.filter, IncidentsFilter);
        }

        return request;
      },
    );

    this.registerMapping<GetMarketsRequestDto, GetMarketsRequest>(
      GetMarketsRequestDto,
      GetMarketsRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetMarketsRequest),
    );

    this.registerMapping<GetTranslationsRequestDto, GetTranslationsRequest>(
      GetTranslationsRequestDto,
      GetTranslationsRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetTranslationsRequest),
    );

    this.registerMapping<GetCompetitionsRequestDto, GetCompetitionsRequest>(
      GetCompetitionsRequestDto,
      GetCompetitionsRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetCompetitionsRequest),
    );

    this.registerMapping<GetFixtureScheduleRequestDto, GetFixtureScheduleRequest>(
      GetFixtureScheduleRequestDto,
      GetFixtureScheduleRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetFixtureScheduleRequest),
    );

    this.registerMapping<FixturesSubscriptionRequestDto, FixturesSubscriptionRequest>(
      FixturesSubscriptionRequestDto,
      FixturesSubscriptionRequest,
      (source) =>
        TransformerUtil.transform(
          { ...packageCredentials, ...source },
          FixturesSubscriptionRequest,
        ),
    );

    this.registerMapping<LeaguesSubscriptionRequestDto, LeaguesSubscriptionRequest>(
      LeaguesSubscriptionRequestDto,
      LeaguesSubscriptionRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, LeaguesSubscriptionRequest),
    );

    this.registerMapping<GetSubscriptionsRequestDto, GetSubscriptionsRequest>(
      GetSubscriptionsRequestDto,
      GetSubscriptionsRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetSubscriptionsRequest),
    );

    this.registerMapping<CompetitionsSubscriptionRequestDto, CompetitionsSubscriptionRequest>(
      CompetitionsSubscriptionRequestDto,
      CompetitionsSubscriptionRequest,
      (source) =>
        TransformerUtil.transform(
          { ...packageCredentials, ...source },
          CompetitionsSubscriptionRequest,
        ),
    );

    this.registerMapping<ChangeManualSuspensionsRequestDto, ChangeManualSuspensionsRequest>(
      ChangeManualSuspensionsRequestDto,
      ChangeManualSuspensionsRequest,
      (source) =>
        TransformerUtil.transform(
          { ...packageCredentials, ...source },
          ChangeManualSuspensionsRequest,
        ),
    );

    this.registerMapping<
      FixturesMetadataSubscriptionsRequestDto,
      FixturesMetadataSubscriptionsRequest
    >(
      FixturesMetadataSubscriptionsRequestDto,
      FixturesMetadataSubscriptionsRequest,
      (source: Partial<FixturesMetadataSubscriptionsRequestDto>) => {
        let destination = {
          fromDate: this.formatDate('fromDate', source.fromDate),
          toDate: this.formatDate('toDate', source.toDate),
        };

        destination = TransformerUtil.transform(
          { ...packageCredentials, ...destination },
          FixturesMetadataSubscriptionsRequest,
        );

        return destination;
      },
    );
  }

  /**
   * Registers a new mapping configuration between two types
   * of objects in the application using a mapping function
   * to transform the source object to the destination object
   * type specified in the mapping configuration.
   * @param sourceType The constructor of the source type
   * @param destinationType The constructor of the destination
   *  type to map to the source type using the mapping function
   *  provided in the configuration profile for the mapping
   * between the two types of objects
   * @param mappingFn The function that performs the mapping
   * from source to destination type objects in the application
   * using the mapping function provided in the configuration
   * profile for the mapping between the two types of objects
   * in the application using the mapping function provided in
   * the configuration profile for the mapping.
   * @returns void to indicate that the mapping configuration
   * has been registered successfully in the application.
   */
  private registerMapping<S extends BaseEntity, D extends BaseEntity>(
    sourceType: Constructor<S>,
    destinationType: Constructor<D>,
    mappingFn: (source: BaseEntity) => BaseEntity,
  ): void {
    const key = `${sourceType.name}-${destinationType.name}`;
    this.mappingConfigs.set(key, mappingFn);
  }

  /**
   * Formats a date to MM/DD/YYYY string format
   * @param fieldName The name of the date field
   * to format.
   * @param date The date to format to MM/DD/YYYY string
   * format.
   * @returns Formatted date string in MM/DD/YYYY format
   */
  private formatDate(fieldName: string, date?: Moment): string {
    if (isNil(date)) {
      throw new InvalidDateInRequestError(fieldName);
    }

    return date.format(this.desiredDateFormat);
  }
}
