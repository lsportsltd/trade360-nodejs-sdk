import { plainToInstance } from 'class-transformer';
import { parse, isInteger } from 'lossless-json';
import { BaseBet } from '../../../../src/entities/core-entities/market/base-bet';
import { BetStatus } from '../../../../src/entities/core-entities/enums/bet-status';
import { SettlementType } from '../../../../src/entities/core-entities/enums/settlement-type';

/**
 * Custom number parser for lossless-json (same logic as in AxiosService)
 */
function customNumberParser(value: string): number | bigint {
  if (isInteger(value)) {
    // For positive integers only (since IDs are always positive)
    if (!value.startsWith('-')) {
      // For very long numbers (17+ digits), definitely use BigInt
      if (value.length > 16) {
        return BigInt(value);
      }
      
      // For 16-digit numbers, compare against MAX_SAFE_INTEGER as string
      if (value.length === 16) {
        const maxSafeIntegerStr = '9007199254740991';
        if (value > maxSafeIntegerStr) {
          return BigInt(value);
        }
      }
    }
    
    // Safe to convert to number (includes all negative numbers and safe positive numbers)
    return parseInt(value, 10);
  }
  return parseFloat(value);
}

describe('BaseBet Entity', () => {
  it('should deserialize a plain object into a BaseBet instance', (): void => {
    const plain = {
      Id: 1,
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
    expect(baseBet.id).toBe(1n);
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

  it('should handle large ID numbers without precision loss', (): void => {
    const plain = {
      Id: '11060329315062111', // The example from the user - using string to avoid precision loss
      Name: 'Large ID Bet',
    };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet).toBeInstanceOf(BaseBet);
    expect(baseBet.id).toBe(11060329315062111n);
    expect(baseBet.name).toBe('Large ID Bet');
  });

  it('should handle the complete end-to-end scenario with lossless-json parsing', (): void => {
    // Simulate the exact JSON response from the server
    const jsonResponse = '{"Id":11060329315062111,"Name":"End-to-End Test","Status":1}';

    // Parse using lossless-json (same as AxiosService does)
    const parsedData = parse(jsonResponse, undefined, customNumberParser) as {
      Id: bigint;
      Name: string;
      Status: number;
    };

    // Verify that the large number is preserved as BigInt
    expect(typeof parsedData.Id).toBe('bigint');
    expect(parsedData.Id).toBe(11060329315062111n);
    // Verify that small numbers remain as regular numbers
    expect(typeof parsedData.Status).toBe('number');
    expect(parsedData.Status).toBe(1);

    // Transform using class-transformer (as the application would)
    const baseBet = plainToInstance(BaseBet, parsedData, {
      excludeExtraneousValues: true,
    });

    // Verify the final result maintains precision
    expect(baseBet.id).toBe(11060329315062111n);
    expect(baseBet.name).toBe('End-to-End Test');
    expect(baseBet.status).toBe(1);
  });

  it('should demonstrate the precision bug fix', (): void => {
    const problematicNumber = '11060329315062111';
    
    // Show the BUG: Using parseInt before boundary check loses precision
    const buggyParseInt = parseInt(problematicNumber, 10);
    expect(buggyParseInt).toBe(11060329315062112); // Lost precision!
    expect(buggyParseInt.toString()).not.toBe(problematicNumber);
    
    // The old buggy logic would detect it needs BigInt but return wrong value
    const wouldBeCorrectlyClassified = buggyParseInt > Number.MAX_SAFE_INTEGER;
    expect(wouldBeCorrectlyClassified).toBe(true); // Would correctly identify as large
    
    // But the BUG is that if the old code returned BigInt(buggyParseInt), 
    // it would create BigInt from the wrong number!
    const buggyBigInt = BigInt(buggyParseInt);
    expect(buggyBigInt.toString()).toBe('11060329315062112'); // Wrong value!
    expect(buggyBigInt.toString()).not.toBe(problematicNumber);
    
    // Show our FIX: String-based boundary check + BigInt from original string
    const correctResult = customNumberParser(problematicNumber);
    expect(typeof correctResult).toBe('bigint');
    expect(correctResult).toBe(11060329315062111n);
    expect(correctResult.toString()).toBe(problematicNumber); // Correct value!
  });

  it('should handle boundary cases correctly with string comparison', (): void => {
    // Test exact MAX_SAFE_INTEGER boundary
    expect(customNumberParser('9007199254740991')).toBe(9007199254740991);
    expect(typeof customNumberParser('9007199254740991')).toBe('number');
    
    // Test MAX_SAFE_INTEGER + 1 (should be BigInt)
    expect(customNumberParser('9007199254740992')).toBe(9007199254740992n);
    expect(typeof customNumberParser('9007199254740992')).toBe('bigint');
    
    // Test large positive numbers
    expect(customNumberParser('99999999999999999')).toBe(99999999999999999n);
    expect(typeof customNumberParser('99999999999999999')).toBe('bigint');
    
    // Test all negative numbers remain as regular numbers
    expect(customNumberParser('-9999999999999999')).toBe(-9999999999999999);
    expect(typeof customNumberParser('-9999999999999999')).toBe('number');
  });

  it('should handle Transform decorator with both BigInt and number inputs', (): void => {
    // Test with BigInt input (from lossless-json)
    const plainWithBigInt = { Id: 11060329315062111n };
    const baseBetFromBigInt = plainToInstance(BaseBet, plainWithBigInt, {
      excludeExtraneousValues: true,
    });
    expect(baseBetFromBigInt.id).toBe(11060329315062111n);

    // Test with string input (fallback case)
    const plainWithString = { Id: '11060329315062111' };
    const baseBetFromString = plainToInstance(BaseBet, plainWithString, {
      excludeExtraneousValues: true,
    });
    expect(baseBetFromString.id).toBe(11060329315062111n);

    // Test with number input (small numbers)
    const plainWithNumber = { Id: 123 };
    const baseBetFromNumber = plainToInstance(BaseBet, plainWithNumber, {
      excludeExtraneousValues: true,
    });
    expect(baseBetFromNumber.id).toBe(123n);
  });
});
