import { plainToInstance } from 'class-transformer';
import { Bet } from '../../../../src/entities/core-entities/market/bet';
import { BaseBet } from '../../../../src/entities/core-entities/market/base-bet';
import { IdTransformationError } from '../../../../src/entities/errors/id-transformation.error';

describe('Bet Entity', () => {
  it('should deserialize a plain object into a Bet instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Home',
      ProviderBetId: 'PB123',
    };
    const bet = plainToInstance(Bet, plain, { excludeExtraneousValues: true });
    expect(bet).toBeInstanceOf(Bet);
    expect(bet).toBeInstanceOf(BaseBet);
    expect(bet.id).toBe(1n);
    expect(bet.name).toBe('Home');
    expect(bet.providerBetId).toBe('PB123');
  });

  it('should throw IdTransformationError when Id is missing', (): void => {
    const plain = {};
    expect(() => {
      plainToInstance(Bet, plain, { excludeExtraneousValues: true });
    }).toThrow(IdTransformationError);

    try {
      plainToInstance(Bet, plain, { excludeExtraneousValues: true });
    } catch (error) {
      expect((error as IdTransformationError).message).toContain(
        'Field is required but received null or undefined',
      );
      expect((error as IdTransformationError).fieldName).toBe('Id');
    }
  });

  it('should handle missing optional properties with valid Id', (): void => {
    const plain = { Id: 123 };
    const bet = plainToInstance(Bet, plain, { excludeExtraneousValues: true });
    expect(bet.id).toBe(123n);
    expect(bet.name).toBeUndefined();
    expect(bet.providerBetId).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 2,
      Name: 'Test Bet',
      ProviderBetId: 'PB999',
      Extra: 'ignore me',
    };
    const bet = plainToInstance(Bet, plain, { excludeExtraneousValues: true });
    expect((bet as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should inherit all BaseBet functionality', (): void => {
    const plain = {
      Id: '11060329315062111', // Large number as string
      Name: 'Large ID Bet',
      ProviderBetId: 'PB_LARGE',
      Line: '2.5',
      Status: 1,
      Price: '1.95',
    };
    const bet = plainToInstance(Bet, plain, { excludeExtraneousValues: true });

    // Test inherited BaseBet properties
    expect(bet.id).toBe(11060329315062111n);
    expect(bet.name).toBe('Large ID Bet');
    expect(bet.line).toBe('2.5');
    expect(bet.status).toBe(1);
    expect(bet.price).toBe('1.95');
    
    // Test Bet-specific property
    expect(bet.providerBetId).toBe('PB_LARGE');
  });

  it('should handle invalid Id values by throwing IdTransformationError', (): void => {
    const invalidValues = [null, undefined, '', 'invalid', 123.45, NaN, Infinity];

    invalidValues.forEach((invalidId) => {
      expect(() => {
        plainToInstance(Bet, { Id: invalidId }, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });
  });
});
