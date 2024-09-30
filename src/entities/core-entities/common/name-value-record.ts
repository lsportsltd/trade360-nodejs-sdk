import { Expose } from 'class-transformer';

export class NameValueRecord {
  @Expose({ name: 'Name' })
  public name?: string;

  @Expose({ name: 'Value' })
  public value?: string;
}
