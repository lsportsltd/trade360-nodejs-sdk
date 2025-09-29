import {
  GetVenuesRequestDto,
  VenueFilterDto,
} from '../../../../../src/api/common/metadata/dtos/venues-request.dto';

describe('VenueFilterDto', () => {
  it('should instantiate with default values', () => {
    const filter = new VenueFilterDto();
    
    expect(filter).toBeInstanceOf(VenueFilterDto);
    expect(filter.venueIds).toBeUndefined();
    expect(filter.countryIds).toBeUndefined();
    expect(filter.stateIds).toBeUndefined();
    expect(filter.cityIds).toBeUndefined();
  });

  it('should instantiate with all properties', () => {
    const data = {
      venueIds: [1, 2, 3],
      countryIds: [100, 200],
      stateIds: [10, 20],
      cityIds: [1000, 2000],
    };
    const filter = new VenueFilterDto(data);
    
    expect(filter.venueIds).toEqual(data.venueIds);
    expect(filter.countryIds).toEqual(data.countryIds);
    expect(filter.stateIds).toEqual(data.stateIds);
    expect(filter.cityIds).toEqual(data.cityIds);
  });

  it('should instantiate with partial properties', () => {
    const data = {
      venueIds: [1, 2],
      countryIds: [100],
    };
    const filter = new VenueFilterDto(data);
    
    expect(filter.venueIds).toEqual(data.venueIds);
    expect(filter.countryIds).toEqual(data.countryIds);
    expect(filter.stateIds).toBeUndefined();
    expect(filter.cityIds).toBeUndefined();
  });

  it('should handle empty arrays', () => {
    const data = {
      venueIds: [],
      countryIds: [],
      stateIds: [],
      cityIds: [],
    };
    const filter = new VenueFilterDto(data);
    
    expect(filter.venueIds).toEqual([]);
    expect(filter.countryIds).toEqual([]);
    expect(filter.stateIds).toEqual([]);
    expect(filter.cityIds).toEqual([]);
  });

  describe('EntityId getter', () => {
    it('should return comma-separated venue IDs when venueIds exist', () => {
      const filter = new VenueFilterDto({ venueIds: [1, 2, 3] });
      
      expect(filter.EntityId).toBe('1,2,3');
    });

    it('should return empty string when venueIds is undefined', () => {
      const filter = new VenueFilterDto();
      
      expect(filter.EntityId).toBe('');
    });

    it('should return empty string when venueIds is empty array', () => {
      const filter = new VenueFilterDto({ venueIds: [] });
      
      expect(filter.EntityId).toBe('');
    });

    it('should return single ID as string when venueIds has one element', () => {
      const filter = new VenueFilterDto({ venueIds: [42] });
      
      expect(filter.EntityId).toBe('42');
    });
  });
});

describe('GetVenuesRequestDto', () => {
  it('should instantiate with default values', () => {
    const request = new GetVenuesRequestDto();
    
    expect(request).toBeInstanceOf(GetVenuesRequestDto);
    expect(request.filter).toBeUndefined();
  });

  it('should instantiate with VenueFilterDto instance', () => {
    const filter = new VenueFilterDto({ venueIds: [1, 2] });
    const request = new GetVenuesRequestDto({ filter });
    
    expect(request.filter).toBe(filter);
    expect(request.filter).toBeInstanceOf(VenueFilterDto);
  });

  it('should instantiate with plain filter object', () => {
    const filterData = new VenueFilterDto({ venueIds: [1, 2], countryIds: [100] });
    const request = new GetVenuesRequestDto({ filter: filterData });
    
    expect(request.filter).toBeInstanceOf(VenueFilterDto);
    expect(request.filter?.venueIds).toEqual(filterData.venueIds);
    expect(request.filter?.countryIds).toEqual(filterData.countryIds);
  });

  it('should handle empty filter object', () => {
    const request = new GetVenuesRequestDto({ filter: new VenueFilterDto({}) });
    
    expect(request.filter).toBeInstanceOf(VenueFilterDto);
    expect(request.filter?.venueIds).toBeUndefined();
    expect(request.filter?.countryIds).toBeUndefined();
  });

  describe('EntityId getter', () => {
    it('should return filter EntityId when filter exists', () => {
      const filter = new VenueFilterDto({ venueIds: [1, 2, 3] });
      const request = new GetVenuesRequestDto({ filter });
      
      expect(request.EntityId).toBe('1,2,3');
    });

    it('should return empty string when filter is undefined', () => {
      const request = new GetVenuesRequestDto();
      
      expect(request.EntityId).toBe('');
    });

    it('should return empty string when filter has no venueIds', () => {
      const filter = new VenueFilterDto({ countryIds: [100] });
      const request = new GetVenuesRequestDto({ filter });
      
      expect(request.EntityId).toBe('');
    });
  });
});
