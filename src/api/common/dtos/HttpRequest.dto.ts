import { Expose } from 'class-transformer';

export class HttpRequestDto {
  @Expose()
  packageId!: number;

  @Expose()
  userName!: string;

  @Expose()
  password!: string;
}
