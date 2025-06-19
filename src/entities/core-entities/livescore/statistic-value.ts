import { Expose } from 'class-transformer';

export class StatisticValue{
    @Expose({ name: 'Id' })
    id?: number;

    @Expose({ name: 'Name' })
    name?: string;

    @Expose({ name: 'Value' })
    value?: string;
}