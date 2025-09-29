import { IdNNameRecord } from '../../../../src/entities/core-entities/common/id-and-name-record';

describe('IdNNameRecord', () => {
  it('should instantiate with default values', (): void => {
    const record = new IdNNameRecord();
    expect(record).toBeInstanceOf(IdNNameRecord);
    expect(record.id).toBeUndefined();
    expect(record.name).toBeUndefined();
  });

  it('should allow setting id and name properties', (): void => {
    const record = new IdNNameRecord();
    record.id = 1;
    record.name = 'Test Name';

    expect(record.id).toBe(1);
    expect(record.name).toBe('Test Name');
  });
});
