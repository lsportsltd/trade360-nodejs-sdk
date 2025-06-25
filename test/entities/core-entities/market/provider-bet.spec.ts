import { plainToInstance } from 'class-transformer';
import { ProviderBet } from '../../../../src/entities/core-entities/market/provider-bet';
import { BaseBet } from '../../../../src/entities/core-entities/market/base-bet';
import { IdTransformationError } from '../../../../src/entities/errors/id-transformation.error';

describe('ProviderBet Entity', () => {
  it('should deserialize a plain object into a ProviderBet instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Provider Bet',
    };
    const providerBet = plainToInstance(ProviderBet, plain, { excludeExtraneousValues: true });
    expect(providerBet).toBeInstanceOf(ProviderBet);
    expect(providerBet).toBeInstanceOf(BaseBet);
    expect(providerBet.id).toBe(1n);
    expect(providerBet.name).toBe('Provider Bet');
  });

  it('should throw IdTransformationError when Id is missing', (): void => {
    const plain = {};
    expect(() => {
      plainToInstance(ProviderBet, plain, { excludeExtraneousValues: true });
    }).toThrow(IdTransformationError);

    try {
      plainToInstance(ProviderBet, plain, { excludeExtraneousValues: true });
    } catch (error) {
      expect((error as IdTransformationError).message).toContain(
        'Field is required but received null or undefined',
      );
      expect((error as IdTransformationError).fieldName).toBe('Id');
    }
  });

  it('should handle missing optional properties with valid Id', (): void => {
    const plain = { Id: 123 };
    const providerBet = plainToInstance(ProviderBet, plain, { excludeExtraneousValues: true });
    expect(providerBet.id).toBe(123n);
    expect(providerBet.name).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 2,
      Name: 'Test ProviderBet',
      Extra: 'ignore me',
    };
    const providerBet = plainToInstance(ProviderBet, plain, { excludeExtraneousValues: true });
    expect((providerBet as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
