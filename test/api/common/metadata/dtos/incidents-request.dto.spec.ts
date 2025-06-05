import {
  GetIncidentsRequestDto,
  IncidentsFilterDto,
} from '@metadata-api/dtos/incidents-request.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import moment, { isMoment } from 'moment';

describe('IncidentsFilterDto', () => {
  // Test Case 2.1: Constructor Initialization
  it('should correctly initialize with provided data', () => {
    const data = {
      ids: [1, 2, 3],
      sports: [6046, 6047],
      searchText: ['Goal', 'Penalty'],
      from: moment('2023-10-01 10:00:00'),
    };

    const filter = new IncidentsFilterDto(data);
    expect(filter.ids).toEqual(data.ids);
    expect(filter.sports).toEqual(data.sports);
    expect(filter.searchText).toEqual(data.searchText);
    expect(filter.from).toBe(data.from);
  });

  // Test Case 2.2: Empty Constructor
  it('should initialize with undefined properties when no data provided', () => {
    const filter = new IncidentsFilterDto();
    expect(filter.ids).toBeUndefined();
    expect(filter.sports).toBeUndefined();
    expect(filter.searchText).toBeUndefined();
    expect(filter.from).toBeUndefined();
  });

  // Test Case 2.3: EntityId getter
  it('should return comma-separated searchText as EntityId', () => {
    const filter = new IncidentsFilterDto({
      searchText: ['Goal', 'Penalty'],
    });
    expect(filter.EntityId).toBe('Goal,Penalty');
  });

  // Test Case 2.4: EntityId getter with empty searchText
  it('should return empty string as EntityId when searchText is undefined', () => {
    const filter = new IncidentsFilterDto();
    expect(filter.EntityId).toBe('');
  });

  // Test Case 2.5: Serialization (CLASS_TO_PLAIN) with date
  it('should correctly serialize to JSON with date conversion', () => {
    const date = moment('2023-10-01T10:00:00Z');
    const filter = new IncidentsFilterDto({
      ids: [1, 2, 3],
      from: date,
    });
    const plain = instanceToPlain(filter);
    expect(plain.Ids).toEqual([1, 2, 3]);
    expect(plain.From).toBe(date.toISOString());
  });

  // Test Case 2.6: Deserialization (PLAIN_TO_CLASS) with date string
  it('should correctly deserialize from JSON with date conversion', () => {
    const dateString = '2023-10-01T10:00:00Z';
    const plain = {
      Ids: [1, 2, 3],
      From: dateString,
    };
    const filter = plainToInstance(IncidentsFilterDto, plain);
    expect(filter.ids).toEqual([1, 2, 3]);
    expect(isMoment(filter.from)).toBe(true);
    // Verify the parsed date is valid and the same day/hour/minute as the source
    expect(filter.from?.isValid()).toBe(true);
    expect(filter.from?.utc().year()).toBe(2023);
    expect(filter.from?.utc().month()).toBe(9); // October is 9 in 0-indexed months
    expect(filter.from?.utc().date()).toBe(1);
    expect(filter.from?.utc().hour()).toBe(10);
    expect(filter.from?.utc().minute()).toBe(0);
  });

  // Test Case 2.7: Deserialization with invalid date
  it('should handle invalid date during deserialization', () => {
    const plain = {
      Ids: [1, 2, 3],
      From: 'not-a-date',
    };
    const filter = plainToInstance(IncidentsFilterDto, plain);
    expect(filter.ids).toEqual([1, 2, 3]);
    expect(filter.from).toBeUndefined();
  });

  // Test Case 2.8: Extra properties
  it('should allow extra properties', () => {
    // Using type assertion for testing additional properties
    interface ExtendedFilter extends Partial<IncidentsFilterDto> {
      extraProp: string;
    }
    const filter = new IncidentsFilterDto({
      ids: [1, 2, 3],
      extraProp: 'extra',
    } as ExtendedFilter);
    expect(filter.ids).toEqual([1, 2, 3]);
    // Using bracket notation for accessing dynamic property
    expect(filter.extraProp).toBe('extra'); // eslint-disable-line dot-notation
  });
});

describe('GetIncidentsRequestDto', () => {
  // Test Case 3.1: Constructor with IncidentsFilterDto instance
  it('should initialize with IncidentsFilterDto instance', () => {
    const filterDto = new IncidentsFilterDto({
      ids: [1, 2, 3],
    });
    const request = new GetIncidentsRequestDto({
      filter: filterDto,
    });
    expect(request.filter).toBe(filterDto);
  });

  // Test Case 3.2: Constructor with filter object (not instance)
  it('should create new IncidentsFilterDto when filter is a plain object', () => {
    // Create a new filter DTO first and then set it in the request
    const filterDto = new IncidentsFilterDto({
      ids: [1, 2, 3],
      sports: [6046],
    });

    const request = new GetIncidentsRequestDto({
      filter: filterDto,
    });

    expect(request.filter).toBeInstanceOf(IncidentsFilterDto);
    expect(request.filter?.ids).toEqual([1, 2, 3]);
    expect(request.filter?.sports).toEqual([6046]);
  });

  // Test Case 3.3: Empty Constructor
  it('should initialize with undefined filter when no data provided', () => {
    const request = new GetIncidentsRequestDto();
    expect(request.filter).toBeUndefined();
  });

  // Test Case 3.4: EntityId getter
  it('should return filter.EntityId as EntityId', () => {
    const request = new GetIncidentsRequestDto({
      filter: new IncidentsFilterDto({
        searchText: ['Goal', 'Penalty'],
      }),
    });
    expect(request.EntityId).toBe('Goal,Penalty');
  });

  // Test Case 3.5: EntityId getter with undefined filter
  it('should return empty string as EntityId when filter is undefined', () => {
    const request = new GetIncidentsRequestDto();
    expect(request.EntityId).toBe('');
  });

  // Test Case 3.6: Serialization (CLASS_TO_PLAIN)
  it('should correctly serialize to JSON with filter', () => {
    const date = moment('2023-10-01T10:00:00Z');
    const request = new GetIncidentsRequestDto({
      filter: new IncidentsFilterDto({
        ids: [1, 2, 3],
        from: date,
      }),
    });
    const plain = instanceToPlain(request);
    expect(plain.Filter.Ids).toEqual([1, 2, 3]);
    expect(plain.Filter.From).toBe(date.toISOString());
  });

  // Test Case 3.7: Deserialization (PLAIN_TO_CLASS)
  it('should correctly deserialize from JSON with filter', () => {
    const dateString = '2023-10-01T10:00:00Z';
    const plain = {
      Filter: {
        Ids: [1, 2, 3],
        From: dateString,
      },
    };
    const request = plainToInstance(GetIncidentsRequestDto, plain);
    expect(request.filter).toBeInstanceOf(IncidentsFilterDto);
    expect(request.filter?.ids).toEqual([1, 2, 3]);
    expect(isMoment(request.filter?.from)).toBe(true);
    // Verify the parsed date is valid and the same day/hour/minute as the source
    expect(request.filter?.from?.isValid()).toBe(true);
    expect(request.filter?.from?.utc().year()).toBe(2023);
    expect(request.filter?.from?.utc().month()).toBe(9); // October is 9 in 0-indexed months
    expect(request.filter?.from?.utc().date()).toBe(1);
    expect(request.filter?.from?.utc().hour()).toBe(10);
    expect(request.filter?.from?.utc().minute()).toBe(0);
  });
});
