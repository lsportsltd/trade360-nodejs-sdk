import { IdNNameRecord } from '../../../../src/entities/core-entities/common/id-and-name-record';

describe('IdNNameRecord', () => {
  it('should instantiate with id and name', (): void => {
    const record = new IdNNameRecord(1, 'Test Name');
    expect(record).toBeInstanceOf(IdNNameRecord);
    // Accessing protected properties via casting for test purposes
    expect((record as unknown as { id: number }).id).toBe(1);
    expect((record as unknown as { name: string }).name).toBe('Test Name');
  });
});
