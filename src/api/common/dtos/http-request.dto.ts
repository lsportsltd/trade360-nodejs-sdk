import { Expose } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';

/**
 * HTTP request DTO. basic structure for sending
 * requests to the API.
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
