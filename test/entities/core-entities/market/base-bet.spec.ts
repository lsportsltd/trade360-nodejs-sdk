import { plainToInstance } from 'class-transformer';
import { BaseBet } from '../../../../src/entities/core-entities/market/base-bet';
import { BetStatus } from '../../../../src/entities/core-entities/enums/bet-status';
import { SettlementType } from '../../../../src/entities/core-entities/enums/settlement-type';

describe('BaseBet Entity', () => {
  it('should deserialize a plain object into a BaseBet instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Base Bet',
      Line: '2.5',
      Status: BetStatus.Open,
      StartPrice: '2.00',
      Price: '1.95',
      PriceVolume: '500.00',
      Settlement: SettlementType.Winner,
      LastUpdate: '2024-06-01T12:00:00Z',
      PriceIN: '1.95',
      PriceUS: '-105',
      PriceUK: '19/20',
      PriceMA: '0.95',
      PriceHK: '0.95',
    };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet).toBeInstanceOf(BaseBet);
    expect(baseBet.id).toBe(1);
    expect(baseBet.name).toBe('Base Bet');
    expect(baseBet.line).toBe('2.5');
    expect(baseBet.status).toBe(BetStatus.Open);
    expect(baseBet.startPrice).toBe('2.00');
    expect(baseBet.price).toBe('1.95');
    expect(baseBet.priceVolume).toBe('500.00');
    expect(baseBet.settlement).toBe(SettlementType.Winner);
    expect(baseBet.lastUpdate).toBeInstanceOf(Date);
    expect(baseBet.priceIN).toBe('1.95');
    expect(baseBet.priceUS).toBe('-105');
    expect(baseBet.priceUK).toBe('19/20');
    expect(baseBet.priceMA).toBe('0.95');
    expect(baseBet.priceHK).toBe('0.95');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet.id).toBeUndefined();
    expect(baseBet.name).toBeUndefined();
    expect(baseBet.line).toBeUndefined();
    expect(baseBet.baseLine).toBeUndefined();
    expect(baseBet.status).toBeUndefined();
    expect(baseBet.startPrice).toBeUndefined();
    expect(baseBet.price).toBeUndefined();
    expect(baseBet.priceVolume).toBeUndefined();
    expect(baseBet.settlement).toBeUndefined();
    expect(baseBet.lastUpdate).toBeUndefined();
    expect(baseBet.priceIN).toBeUndefined();
    expect(baseBet.priceUS).toBeUndefined();
    expect(baseBet.priceUK).toBeUndefined();
    expect(baseBet.priceMA).toBeUndefined();
    expect(baseBet.priceHK).toBeUndefined();
    expect(baseBet.probability).toBeUndefined();
    expect(baseBet.participantId).toBeUndefined();
    expect(baseBet.playerName).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 2,
      Name: 'Test BaseBet',
      Extra: 'ignore me',
    };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect((baseBet as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  describe('Date Field Transformation', () => {
    it('should transform valid date strings to Date objects', (): void => {
      const plain = {
        Id: 123,
        LastUpdate: '2024-06-01T12:00:00Z',
      };
      const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
      expect(baseBet.lastUpdate).toBeInstanceOf(Date);
      expect(baseBet.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
    });

    it('should handle Date objects as input', (): void => {
      const testDate = new Date('2024-06-01T12:00:00Z');
      const plain = {
        Id: 123,
        LastUpdate: testDate,
      };
      const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
      expect(baseBet.lastUpdate).toBeInstanceOf(Date);
      expect(baseBet.lastUpdate?.getTime()).toBe(testDate.getTime());
    });

    it('should handle invalid date strings gracefully', (): void => {
      const plain = {
        Id: 123,
        LastUpdate: 'invalid-date',
      };
      const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
      expect(baseBet.lastUpdate).toBeInstanceOf(Date);
      expect(baseBet.lastUpdate?.toString()).toBe('Invalid Date');
    });
  });
});
