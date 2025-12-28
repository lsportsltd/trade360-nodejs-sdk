import { PlayerType } from '../../../../src/entities/core-entities/enums/player-type';

describe('PlayerType Enum', () => {
  it('should have Player value equal to 1', (): void => {
    expect(PlayerType.Player).toBe(1);
  });

  it('should have Other value equal to 2', (): void => {
    expect(PlayerType.Other).toBe(2);
  });

  it('should have Coach value equal to 3', (): void => {
    expect(PlayerType.Coach).toBe(3);
  });

  it('should have exactly three values', (): void => {
    const values = Object.values(PlayerType).filter((v) => typeof v === 'number');
    expect(values.length).toBe(3);
  });

  it('should have correct name for each value', (): void => {
    expect(PlayerType[1]).toBe('Player');
    expect(PlayerType[2]).toBe('Other');
    expect(PlayerType[3]).toBe('Coach');
  });
});





