import { Expose } from 'class-transformer';

import { ClockStatus } from '@lsports/enums';

export class Clock {
    @Expose({ name: 'Status' })
    status?: ClockStatus;

    @Expose({ name: 'Seconds' })
    seconds?: number;
}