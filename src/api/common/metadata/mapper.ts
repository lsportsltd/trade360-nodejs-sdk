import { TransformerUtil } from '@utilities';
import { PackageCredentials } from '@entities';

import { IMapper } from '../interfaces';
import { GetLeaguesRequest, GetLeaguesRequestDto } from './requests';

/**
 * Base interface for all entities that can be mapped
 */
interface BaseEntity {
  [key: string]: unknown;
}

/**
 * Type for constructable classes that extend BaseEntity
 */
type Constructor<T extends BaseEntity = BaseEntity> = new (...args: unknown[]) => T;

/**
 * Implementation of the mapping service using class-transformer
 * Provides functionality similar to AutoMapper with configuration profiles
 * @implements IMapper interface for mapping between different types of objects
 */

/**
 * Mapper class for mapping between different types of objects in the
 * application using the mapping configurations provided in the application.
 * @param packageCredentials The package credentials for the API to use in the
 * mapping configurations for the application. The package credentials are
 * used to authenticate the API requests in the mapping configurations for the
 * application.
 */
export class Mapper implements IMapper {
  private mappingConfigs: Map<string, (source: BaseEntity) => BaseEntity> = new Map();

  constructor(packageCredentials?: PackageCredentials) {
    this.initializeMappings(packageCredentials);
  }

  /**
   * Maps a source object to a new instance of the destination type
   * using the mapping function provided in the configuration profile
   * for the mapping between the two types of objects in the application.
   * @param source The source object to map from
   * @param destinationType The constructor of the destination type to map
   * to the source object using the mapping function provided in the
   * configuration profile for the mapping between the two types of objects
   * in the application.
   * @returns A new instance of the destination type with mapped properties
   * using the mapping function provided in the configuration profile for
   * the mapping between the two types of objects in the application.
   * @throws Error if mapping configuration is not found in the application.
   */
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

    // this.registerMapping<GetMarketsRequestDto, GetMarketsRequest>(
    //   GetMarketsRequestDto,
    //   GetMarketsRequest,
    //   (source) => plainToClass(GetMarketsRequest, source),
    // );

    // this.registerMapping<GetTranslationsRequestDto, GetTranslationsRequest>(
    //   GetTranslationsRequestDto,
    //   GetTranslationsRequest,
    //   (source) => plainToClass(GetTranslationsRequest, source),
    // );

    // this.registerMapping<GetCompetitionsRequestDto, GetCompetitionsRequest>(
    //   GetCompetitionsRequestDto,
    //   GetCompetitionsRequest,
    //   (source) => plainToClass(GetCompetitionsRequest, source),
    // );

    // this.registerMapping<GetFixtureMetadataRequestDto, GetFixtureMetadataRequest>(
    //   GetFixtureMetadataRequestDto,
    //   GetFixtureMetadataRequest,
    //   (source) => {
    //     const destination = plainToClass(GetFixtureMetadataRequest, source);
    //     destination.fromDate = this.formatDate(source.fromDate);
    //     destination.toDate = this.formatDate(source.toDate);
    //     return destination;
    //   },
    // );
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
   * @param date The date to format
   * @returns Formatted date string
   * @private
   */
  //   private formatDate(date: Date): string {
  //     return date.toLocaleDateString('en-US', {
  //       month: '2-digit',
  //       day: '2-digit',
  //       year: 'numeric',
  //     });
  //   }
}
