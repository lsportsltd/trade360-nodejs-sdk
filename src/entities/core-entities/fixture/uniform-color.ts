import { Expose } from 'class-transformer';

export class UniformColor {
  @Expose({ name: 'Primary' })
  public primary?: string;

  @Expose({ name: 'Number' })
  public number?: string;

  @Expose({ name: 'Outline' })
  public outline?: string;
}
