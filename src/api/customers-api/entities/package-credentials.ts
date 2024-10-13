import { Expose } from 'class-transformer';

/**
 * Package credentials entity.
 */
export class PackageCredentials {
  @Expose()
  packageId!: number;

  @Expose()
  username!: string;

  @Expose()
  password!: string;
}
