import { isEmpty, isNil } from 'lodash';

import { GetTranslationsRequest } from '@api/common';
import { TranslationsValidationError } from '@entities';

/**
 * GetTranslationsRequestValidator class
 * (used for validation) - validates the request body
 * of the translations collection endpoint.
 */
export class GetTranslationsRequestValidator {
  static validate(request: GetTranslationsRequest): void {
    // Ensure Languages is filled
    if (isNil(request.languages) || isEmpty(request.languages)) {
      throw new TranslationsValidationError('Languages must be filled.');
    }

    // Ensure at least one of the other fields is filled
    if (
      (isNil(request.sportIds) || isEmpty(request.sportIds)) &&
      (isNil(request.locationIds) || isEmpty(request.locationIds)) &&
      (isNil(request.leagueIds) || isEmpty(request.leagueIds)) &&
      (isNil(request.marketIds) || isEmpty(request.marketIds)) &&
      (isNil(request.participantIds) || isEmpty(request.participantIds))
    ) {
      throw new TranslationsValidationError(
        'At least one of SportIds, LocationIds, LeagueIds, MarketIds, or ParticipantIds must be filled.',
      );
    }
  }
}
