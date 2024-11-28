import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * GetTranslationsRequest class for sending request
 * to get translations from the API. It contains the
 * properties for the request to get translations
 * from the API.
 * @param sportIds The sport IDs to filter the
 * translations by in the request to get translations
 * from the API. The sport IDs are used to
 * @param locationIds The location IDs to filter the
 * translations by in the request to get translations
 * from the API.
 * @param leagueIds The league IDs to filter the
 * translations by in the request to get translations
 * from the API.
 * @param marketIds The market IDs to filter the
 * translations by in the request to get translations
 * from the API.
 * @param participantIds The participant IDs to filter
 * the translations by in the request to get translations
 *  from the API.
 * @param languages The language IDs to filter the
 * translations by in the request to get translations
 * from the API.
 * @returns GetTranslationsRequest instance that contains
 * the properties for the request to get translations
 * from the API.
 */
export class GetTranslationsRequest extends HttpRequestDto {
  @Expose()
  @Type(() => Number)
  sportIds?: number[];

  @Expose()
  @Type(() => Number)
  locationIds?: number[];

  @Expose()
  @Type(() => Number)
  leagueIds?: number[];

  @Expose()
  @Type(() => Number)
  marketIds?: number[];

  @Expose()
  @Type(() => Number)
  participantIds?: number[];

  @Expose()
  @Type(() => Number)
  languages?: number[];
}
