import {
  GetCitiesRequestDto,
  CityFilterDto,
} from '../../../../../src/api/common/metadata/dtos/cities-request.dto';

describe('CityFilterDto', () => {
  it('should instantiate with default values', () => {
    const filter = new CityFilterDto();

    expect(filter).toBeInstanceOf(CityFilterDto);
    expect(filter.cityIds).toBeUndefined();
    expect(filter.countryIds).toBeUndefined();
    expect(filter.stateIds).toBeUndefined();
  });

  it('should instantiate with all properties', () => {
    const data = {
      cityIds: [1, 2, 3],
      countryIds: [100, 200],
      stateIds: [10, 20],
    };
    const filter = new CityFilterDto(data);

    expect(filter.cityIds).toEqual(data.cityIds);
    expect(filter.countryIds).toEqual(data.countryIds);
    expect(filter.stateIds).toEqual(data.stateIds);
  });

  it('should instantiate with partial properties', () => {
    const data = {
      cityIds: [1, 2],
      countryIds: [100],
    };
    const filter = new CityFilterDto(data);

    expect(filter.cityIds).toEqual(data.cityIds);
    expect(filter.countryIds).toEqual(data.countryIds);
    expect(filter.stateIds).toBeUndefined();
  });

  it('should handle empty arrays', () => {
    const data = {
      cityIds: [],
      countryIds: [],
      stateIds: [],
    };
    const filter = new CityFilterDto(data);

    expect(filter.cityIds).toEqual([]);
    expect(filter.countryIds).toEqual([]);
    expect(filter.stateIds).toEqual([]);
  });

  describe('EntityId getter', () => {
    it('should return comma-separated city IDs when cityIds exist', () => {
      const filter = new CityFilterDto({ cityIds: [1, 2, 3] });

      expect(filter.EntityId).toBe('1,2,3');
    });

    it('should return empty string when cityIds is undefined', () => {
      const filter = new CityFilterDto();

      expect(filter.EntityId).toBe('');
    });

    it('should return empty string when cityIds is empty array', () => {
      const filter = new CityFilterDto({ cityIds: [] });

      expect(filter.EntityId).toBe('');
    });

    it('should return single ID as string when cityIds has one element', () => {
      const filter = new CityFilterDto({ cityIds: [42] });

      expect(filter.EntityId).toBe('42');
    });
  });
});

describe('GetCitiesRequestDto', () => {
  it('should instantiate with default values', () => {
    const request = new GetCitiesRequestDto();

    expect(request).toBeInstanceOf(GetCitiesRequestDto);
    expect(request.filter).toBeUndefined();
  });

  it('should instantiate with CityFilterDto instance', () => {
    const filter = new CityFilterDto({ cityIds: [1, 2] });
    const request = new GetCitiesRequestDto({ filter });

    expect(request.filter).toBe(filter);
    expect(request.filter).toBeInstanceOf(CityFilterDto);
  });

  it('should instantiate with plain filter object', () => {
    const filterData = new CityFilterDto({ cityIds: [1, 2], countryIds: [100] });
    const request = new GetCitiesRequestDto({ filter: filterData });

    expect(request.filter).toBeInstanceOf(CityFilterDto);
    expect(request.filter?.cityIds).toEqual(filterData.cityIds);
    expect(request.filter?.countryIds).toEqual(filterData.countryIds);
  });

  it('should handle empty filter object', () => {
    const request = new GetCitiesRequestDto({ filter: new CityFilterDto({}) });

    expect(request.filter).toBeInstanceOf(CityFilterDto);
    expect(request.filter?.cityIds).toBeUndefined();
    expect(request.filter?.countryIds).toBeUndefined();
  });

  describe('EntityId getter', () => {
    it('should return filter EntityId when filter exists', () => {
      const filter = new CityFilterDto({ cityIds: [1, 2, 3] });
      const request = new GetCitiesRequestDto({ filter });

      expect(request.EntityId).toBe('1,2,3');
    });

    it('should return empty string when filter is undefined', () => {
      const request = new GetCitiesRequestDto();

      expect(request.EntityId).toBe('');
    });

    it('should return empty string when filter has no cityIds', () => {
      const filter = new CityFilterDto({ countryIds: [100] });
      const request = new GetCitiesRequestDto({ filter });

      expect(request.EntityId).toBe('');
    });
  });
});
