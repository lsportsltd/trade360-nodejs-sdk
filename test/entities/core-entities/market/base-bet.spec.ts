import { plainToInstance } from 'class-transformer';
import { BaseBet } from '../../../../src/entities/core-entities/market/base-bet';
import { BetStatus } from '../../../../src/entities/core-entities/enums/bet-status';
import { SettlementType } from '../../../../src/entities/core-entities/enums/settlement-type';

describe('BaseBet Entity', () => {
  it('should deserialize a plain object into a BaseBet instance', (): void => {
    const plain = {
      Id: '1',
      Name: 'Base Bet',
      Line: '2.5',
      Status: BetStatus.Open,
      Settlement: SettlementType.Winner,
      LastUpdate: '2024-06-01T12:00:00Z',
      IsChanged: 1,
      Probability: 0.75,
      ParticipantId: 42,
      PlayerName: 'Player X',
    };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet).toBeInstanceOf(BaseBet);
    expect(baseBet.id).toBe('1');
    expect(typeof baseBet.id).toBe('string');
    expect(baseBet.name).toBe('Base Bet');
    expect(baseBet.line).toBe('2.5');
    expect(baseBet.status).toBe(BetStatus.Open);
    expect(baseBet.settlement).toBe(SettlementType.Winner);
    expect(baseBet.lastUpdate).toBeInstanceOf(Date);
    expect(baseBet.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
    expect(baseBet.probability).toBe(0.75);
    expect(baseBet.participantId).toBe(42);
    expect(baseBet.playerName).toBe('Player X');
  });

  it('should handle missing properties with valid ID', (): void => {
    const plain = { Id: '123' };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet.id).toBe('123');
    expect(typeof baseBet.id).toBe('string');
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
      Id: '2',
      Name: 'Test BaseBet',
      Extra: 'ignore me',
    };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect((baseBet as unknown as { Extra?: unknown }).Extra).toBeUndefined();
    expect(baseBet.id).toBe('2');
    expect(typeof baseBet.id).toBe('string');
  });

  it('should handle large ID numbers as strings without precision issues', (): void => {
    const plain = {
      Id: '11060329315062111', // Large number as string - maintains precision
      Name: 'Large ID Bet',
    };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet).toBeInstanceOf(BaseBet);
    expect(baseBet.id).toBe('11060329315062111');
    expect(typeof baseBet.id).toBe('string');
    expect(baseBet.name).toBe('Large ID Bet');
  });

  it('should handle the complete end-to-end scenario with standard JSON parsing', (): void => {
    // Simulate the exact JSON response from the server (IDs as strings)
    const jsonResponse = '{"Id":"11060329315062111","Name":"End-to-End Test","Status":1}';

    // Parse using standard JSON (since IDs are now strings)
    const parsedData = JSON.parse(jsonResponse) as {
      Id: string;
      Name: string;
      Status: number;
    };

    // Verify that the large number is preserved as string
    expect(typeof parsedData.Id).toBe('string');
    expect(parsedData.Id).toBe('11060329315062111');
    // Verify that other numbers remain as regular numbers
    expect(typeof parsedData.Status).toBe('number');
    expect(parsedData.Status).toBe(1);

    // Transform using class-transformer (as the application would)
    const baseBet = plainToInstance(BaseBet, parsedData, {
      excludeExtraneousValues: true,
    });

    // Verify the final result maintains precision
    expect(baseBet.id).toBe('11060329315062111');
    expect(typeof baseBet.id).toBe('string');
    expect(baseBet.name).toBe('End-to-End Test');
    expect(baseBet.status).toBe(1);
  });

  it('should handle numeric inputs by converting to string automatically', (): void => {
    // class-transformer automatically converts numbers to strings when the target field is string
    const plain = { Id: 123 };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet.id).toBe('123');
    expect(typeof baseBet.id).toBe('string');
  });

  it('should handle BigInt inputs by converting to string automatically', (): void => {
    // class-transformer automatically converts BigInt to strings when the target field is string
    const plain = { Id: 11060329315062111n };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet.id).toBe('11060329315062111');
    expect(typeof baseBet.id).toBe('string');
  });

  it('should handle zero values correctly', (): void => {
    // Test zero as number
    const plainWithZeroNumber = { Id: 0 };
    const baseBetFromZeroNumber = plainToInstance(BaseBet, plainWithZeroNumber, {
      excludeExtraneousValues: true,
    });
    expect(baseBetFromZeroNumber.id).toBe('0');
    expect(typeof baseBetFromZeroNumber.id).toBe('string');

    // Test zero as string
    const plainWithZeroString = { Id: '0' };
    const baseBetFromZeroString = plainToInstance(BaseBet, plainWithZeroString, {
      excludeExtraneousValues: true,
    });
    expect(baseBetFromZeroString.id).toBe('0');
    expect(typeof baseBetFromZeroString.id).toBe('string');
  });

  it('should handle Date field transformation correctly', (): void => {
    const plain = {
      Id: '123',
      LastUpdate: '2024-06-01T12:00:00Z',
    };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet.lastUpdate).toBeInstanceOf(Date);
    expect(baseBet.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
  });

  it('should handle complete bet data with all fields', (): void => {
    const completeData = {
      Id: '999999999999999999',
      Name: 'Complete Bet',
      Line: '1.5',
      BaseLine: '1.0',
      Status: BetStatus.Open,
      StartPrice: '2.50',
      Price: '2.75',
      PriceVolume: '1000.00',
      Settlement: SettlementType.Winner,
      SuspensionReason: 5,
      LastUpdate: '2024-06-01T12:00:00Z',
      PriceIN: '2.75',
      PriceUS: '+175',
      PriceUK: '7/4',
      PriceMA: '1.75',
      PriceHK: '1.75',
      IsChanged: 1,
      Probability: 0.36,
      ParticipantId: 789,
      PlayerName: 'Test Player',
    };

    const baseBet = plainToInstance(BaseBet, completeData, { excludeExtraneousValues: true });

    expect(baseBet.id).toBe('999999999999999999');
    expect(typeof baseBet.id).toBe('string');
    expect(baseBet.name).toBe('Complete Bet');
    expect(baseBet.line).toBe('1.5');
    expect(baseBet.baseLine).toBe('1.0');
    expect(baseBet.status).toBe(BetStatus.Open);
    expect(baseBet.startPrice).toBe('2.50');
    expect(baseBet.price).toBe('2.75');
    expect(baseBet.priceVolume).toBe('1000.00');
    expect(baseBet.settlement).toBe(SettlementType.Winner);
    expect(baseBet.suspensionReason).toBe(5);
    expect(baseBet.lastUpdate).toBeInstanceOf(Date);
    expect(baseBet.priceIN).toBe('2.75');
    expect(baseBet.priceUS).toBe('+175');
    expect(baseBet.priceUK).toBe('7/4');
    expect(baseBet.priceMA).toBe('1.75');
    expect(baseBet.priceHK).toBe('1.75');
    expect(baseBet.isChanged).toBe(1);
    expect(baseBet.probability).toBe(0.36);
    expect(baseBet.participantId).toBe(789);
    expect(baseBet.playerName).toBe('Test Player');
  });

  it('should handle default values correctly', (): void => {
    const plain = { Id: '123' };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    
    expect(baseBet.id).toBe('123');
    expect(typeof baseBet.id).toBe('string');
    // isChanged has a default value in the class, but plainToInstance doesn't set it unless provided
    // This is expected behavior - default values are only applied when constructing new instances
    expect(baseBet.isChanged).toBeUndefined();
  });

  it('should maintain consistency across serialization/deserialization cycles', (): void => {
    const originalData = {
      Id: '11060329315062111',
      Name: 'Test Bet',
      Status: BetStatus.Open,
      Price: '1.95',
      LastUpdate: '2024-06-01T12:00:00Z',
    };

    // Deserialize
    const baseBet = plainToInstance(BaseBet, originalData, { excludeExtraneousValues: true });

    // Serialize back to JSON
    const serialized = JSON.stringify(baseBet);
    const reserialized = JSON.parse(serialized);

    // Verify round-trip consistency
    expect(reserialized.id).toBe('11060329315062111');
    expect(typeof reserialized.id).toBe('string');
    expect(reserialized.name).toBe('Test Bet');
    expect(reserialized.price).toBe('1.95');
  });

  it('should work correctly with arrays of BaseBet entities', (): void => {
    const arrayData = [
      { Id: '1', Name: 'Bet 1' },
      { Id: '11060329315062111', Name: 'Bet 2' },
      { Id: '123', Name: 'Bet 3' },
    ];

    const baseBets = arrayData.map((data) =>
      plainToInstance(BaseBet, data, { excludeExtraneousValues: true })
    );

    expect(baseBets).toHaveLength(3);
    expect(baseBets[0].id).toBe('1');
    expect(baseBets[1].id).toBe('11060329315062111');
    expect(baseBets[2].id).toBe('123');
    
    // Verify all IDs are strings
    baseBets.forEach(bet => {
      expect(typeof bet.id).toBe('string');
    });
  });

  it('should handle various input types for ID field', (): void => {
    const testCases = [
      { input: '1', expected: '1' },
      { input: 2, expected: '2' },
      { input: 9007199254740991, expected: '9007199254740991' },
      { input: '9007199254740992', expected: '9007199254740992' },
      { input: 123n, expected: '123' },
    ];

    testCases.forEach(({ input, expected }) => {
      const plain = { Id: input };
      const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
      expect(baseBet.id).toBe(expected);
      expect(typeof baseBet.id).toBe('string');
    });
  });
});