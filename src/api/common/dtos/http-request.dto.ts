import { Expose } from 'class-transformer';

/**
 * Base interface for all entities that can be mapped
 */
interface BaseEntity {
  [key: string]: unknown;
}

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
