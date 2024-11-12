import { Expose } from 'class-transformer';

export class PackageCredentials {
  @Expose()
  packageId!: number;

  @Expose()
  username!: string;

  @Expose()
  password!: string;
}
