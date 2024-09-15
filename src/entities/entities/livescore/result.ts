import { Expose } from 'class-transformer';

export class Result {
  @Expose({ name: 'Position' })
  position?: string;

  @Expose({ name: 'Value' })
  value?: string;
}
