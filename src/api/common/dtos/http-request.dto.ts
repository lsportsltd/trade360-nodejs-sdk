import { Expose } from 'class-transformer';

export class HttpRequestDto {
  @Expose()
  packageId!: number;

  @Expose()
  username!: string;

  @Expose()
  password!: string;
}
