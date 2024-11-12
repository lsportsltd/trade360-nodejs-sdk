import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

/**
 * HTTP request DTO.
 */
export class HttpRequestDto implements BaseEntity {
  [key: string]: unknown;

  @Expose()
  packageId!: number;

  @Expose()
  username!: string;

  @Expose()
  password!: string;

  @Expose()
  languageId?: number;
}
