import { Expose } from 'class-transformer';

/**
 * HTTP request DTO.
 */
export class HttpRequestDto {
  @Expose()
  packageId!: number;

  @Expose()
  username!: string;

  @Expose()
  password!: string;

  @Expose()
  languageId?: number;
}
