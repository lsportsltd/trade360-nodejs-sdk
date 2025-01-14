import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightFixtureBodyStructure } from '@api/common/body-entities/responses/outright-fixture-body-structure';
/**
 * GetOutrightFixtureResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright fixture
 */
export class GetOutrightFixtureResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Fixtures' })
  @Type(() => OutrightFixtureBodyStructure)
  fixtures?: OutrightFixtureBodyStructure[];
}
