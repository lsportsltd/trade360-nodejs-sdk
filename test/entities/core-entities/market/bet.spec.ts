import { plainToInstance } from 'class-transformer';
import { Bet } from '../../../../src/entities/core-entities/market/bet';
import { BaseBet } from '../../../../src/entities/core-entities/market/base-bet';

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
    expect(bet.id).toBe(1);
    expect(bet.name).toBe('Home');
    expect(bet.providerBetId).toBe('PB123');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const bet = plainToInstance(Bet, plain, { excludeExtraneousValues: true });
    expect(bet.id).toBeUndefined();
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
});
