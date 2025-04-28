import { ActiveParticipant } from '../../../../src/entities/core-entities/enums/active-participant';

describe('ActiveParticipant Enum', () => {
  it('should map names to values correctly', () => {
    expect(ActiveParticipant.InActive).toBe(0);
    expect(ActiveParticipant.Active).toBe(1);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(ActiveParticipant[0]).toBe('InActive');
    expect(ActiveParticipant[1]).toBe('Active');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(ActiveParticipant).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['InActive', 'Active']);
  });
});
