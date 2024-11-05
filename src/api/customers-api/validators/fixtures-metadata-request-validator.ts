import { isNil } from 'lodash';
import moment from 'moment';

import { GetFixturesMetadataRequestDto } from '@api/common';
import { FixturesMedataValidationError } from '@entities';

/**
 * GetFixturesMetadataRequestValidator class is responsible for validating
 * the request for getting fixtures metadata from the API.
 * It contains the logic for validating the request for getting fixtures metadata
 * from the API.
 * @param request The request for getting fixtures metadata from the API
 */
export class GetFixturesMetadataRequestValidator {
  private static readonly validDateRange = 1;

  static validate(request: GetFixturesMetadataRequestDto): void {
    const { fromDate, toDate } = request;

    if (isNil(fromDate)) {
      throw new FixturesMedataValidationError(
        'Incorrect request, Please enter a valid FromDate and resend your request',
      );
    }

    if (isNil(toDate)) {
      throw new FixturesMedataValidationError(
        'Incorrect request, Please enter a valid ToDate and resend your request',
      );
    }

    const differenceFromCurrentDateInDays = moment().diff(moment(request.fromDate), 'days');

    if (
      differenceFromCurrentDateInDays < 0 ||
      differenceFromCurrentDateInDays >= this.validDateRange
    ) {
      throw new FixturesMedataValidationError('FromDate must be in the present day');
    }

    if (toDate.isBefore(fromDate)) {
      throw new FixturesMedataValidationError('ToDate must be after FromDate');
    }
  }
}
