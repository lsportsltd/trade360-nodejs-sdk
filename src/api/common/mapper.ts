import { isNil } from 'lodash';
import { Moment } from 'moment';

import { BaseEntity, Constructor, InvalidDateInRequestError, PackageCredentials } from '@entities';
import { TransformerUtil } from '@utilities';
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
  FixturesSubscriptionRequestDto,
  GetFixtureScheduleRequestDto,
  LeaguesSubscriptionRequestDto,
} from '@subscription-api/dtos';
import {
  FixturesSubscriptionRequest,
  GetFixtureScheduleRequest,
  LeaguesSubscriptionRequest,
} from '@subscription-api/requests';

import { IMapper } from './interfaces';

/**
 * Mapper class for mapping between different types of objects in the
 * application using the mapping configurations provided in the application.
 * The Mapper class provides functionality similar to AutoMapper with
 * @param packageCredentials The package credentials for the API to use in the
 * mapping configurations for the application. The package credentials are
 * used to authenticate the API requests in the mapping configurations for the
 * application.
 * @implements IMapper interface for mapping between different types of objects
 * in the application using the mapping configurations provided in the application.
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
   * Initializes all mapping configurations for the application using the
   * package credentials provided in the constructor of the mapping service
   * @param packageCredentials The package credentials for the API to use
   * in the mapping configurations for the application.
   * @returns void to indicate that the mapping configurations have been
   * initialized successfully in the application using the package
   * credentials provided in the constructor of the mapping service.
   */
  private initializeMappings(packageCredentials?: PackageCredentials): void {
    this.registerMapping<GetLeaguesRequestDto, GetLeaguesRequest>(
      GetLeaguesRequestDto,
      GetLeaguesRequest,
      (source) =>
        TransformerUtil.transform({ ...packageCredentials, ...source }, GetLeaguesRequest),
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

    this.registerMapping<GetFixturesMetadataRequestDto, GetFixturesMetadataRequest>(
      GetFixturesMetadataRequestDto,
      GetFixturesMetadataRequest,
      (source: Partial<GetFixturesMetadataRequestDto>) => {
        let destination = {
          fromDate: this.formatDate('fromDate', source.fromDate),
          toDate: this.formatDate('toDate', source.toDate),
        };

        destination = TransformerUtil.transform(
          { ...packageCredentials, ...destination },
          GetFixturesMetadataRequest,
        );

        return destination;
      },
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
  }

  /**
   * Registers a new mapping configuration between two types of objects
   *  in the application using a mapping function to transform the
   * source object to the destination object type specified in the mapping
   * @param sourceType The constructor of the source type
   * @param destinationType The constructor of the destination type to map
   * to the source type using the mapping function provided in the
   * configuration profile for the mapping between the two types of objects
   * @param mappingFn The function that performs the mapping from source
   * to destination type objects in the application using the mapping
   * function provided in the configuration profile for the mapping between
   * the two types of objects in the application using the mapping function
   * provided in the configuration profile for the mapping.
   * @returns void to indicate that the mapping configuration has been
   *  registered successfully in the application.
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
      throw new InvalidDateInRequestError(
        `Date ${fieldName} is required and was not provided for as fields of the request`,
      );
    }

    return date.format(this.desiredDateFormat);
  }
}
