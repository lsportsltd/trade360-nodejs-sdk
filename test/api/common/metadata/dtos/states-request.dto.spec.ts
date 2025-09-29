import {
  GetStatesRequestDto,
  StateFilterDto,
} from '../../../../../src/api/common/metadata/dtos/states-request.dto';

describe('StateFilterDto', () => {
  it('should instantiate with default values', () => {
    const filter = new StateFilterDto();

    expect(filter).toBeInstanceOf(StateFilterDto);
    expect(filter.stateIds).toBeUndefined();
    expect(filter.countryIds).toBeUndefined();
  });

  it('should instantiate with all properties', () => {
    const data = {
      stateIds: [1, 2, 3],
      countryIds: [100, 200],
    };
    const filter = new StateFilterDto(data);

    expect(filter.stateIds).toEqual(data.stateIds);
    expect(filter.countryIds).toEqual(data.countryIds);
  });

  it('should instantiate with partial properties', () => {
    const data = {
      stateIds: [1, 2],
    };
    const filter = new StateFilterDto(data);

    expect(filter.stateIds).toEqual(data.stateIds);
    expect(filter.countryIds).toBeUndefined();
  });

  it('should handle empty arrays', () => {
    const data = {
      stateIds: [],
      countryIds: [],
    };
    const filter = new StateFilterDto(data);

    expect(filter.stateIds).toEqual([]);
    expect(filter.countryIds).toEqual([]);
  });

  describe('EntityId getter', () => {
    it('should return comma-separated state IDs when stateIds exist', () => {
      const filter = new StateFilterDto({ stateIds: [1, 2, 3] });

      expect(filter.EntityId).toBe('1,2,3');
    });

    it('should return empty string when stateIds is undefined', () => {
      const filter = new StateFilterDto();

      expect(filter.EntityId).toBe('');
    });

    it('should return empty string when stateIds is empty array', () => {
      const filter = new StateFilterDto({ stateIds: [] });

      expect(filter.EntityId).toBe('');
    });

    it('should return single ID as string when stateIds has one element', () => {
      const filter = new StateFilterDto({ stateIds: [42] });

      expect(filter.EntityId).toBe('42');
    });
  });
});

describe('GetStatesRequestDto', () => {
  it('should instantiate with default values', () => {
    const request = new GetStatesRequestDto();

    expect(request).toBeInstanceOf(GetStatesRequestDto);
    expect(request.filter).toBeUndefined();
  });

  it('should instantiate with StateFilterDto instance', () => {
    const filter = new StateFilterDto({ stateIds: [1, 2] });
    const request = new GetStatesRequestDto({ filter });

    expect(request.filter).toBe(filter);
    expect(request.filter).toBeInstanceOf(StateFilterDto);
  });

  it('should instantiate with plain filter object', () => {
    const filterData = new StateFilterDto({ stateIds: [1, 2], countryIds: [100] });
    const request = new GetStatesRequestDto({ filter: filterData });

    expect(request.filter).toBeInstanceOf(StateFilterDto);
    expect(request.filter?.stateIds).toEqual(filterData.stateIds);
    expect(request.filter?.countryIds).toEqual(filterData.countryIds);
  });

  it('should handle empty filter object', () => {
    const request = new GetStatesRequestDto({ filter: new StateFilterDto({}) });

    expect(request.filter).toBeInstanceOf(StateFilterDto);
    expect(request.filter?.stateIds).toBeUndefined();
    expect(request.filter?.countryIds).toBeUndefined();
  });

  describe('EntityId getter', () => {
    it('should return filter EntityId when filter exists', () => {
      const filter = new StateFilterDto({ stateIds: [1, 2, 3] });
      const request = new GetStatesRequestDto({ filter });

      expect(request.EntityId).toBe('1,2,3');
    });

    it('should return empty string when filter is undefined', () => {
      const request = new GetStatesRequestDto();

      expect(request.EntityId).toBe('');
    });

    it('should return empty string when filter has no stateIds', () => {
      const filter = new StateFilterDto({ countryIds: [100] });
      const request = new GetStatesRequestDto({ filter });

      expect(request.EntityId).toBe('');
    });
  });
});
