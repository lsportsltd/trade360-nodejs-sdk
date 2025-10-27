import { ParticipantsCollectionResponse } from '../../../../../src/api/common/metadata/responses/participants-collection-response';

describe('ParticipantsCollectionResponse', () => {
  it('should instantiate with default values', () => {
    const response = new ParticipantsCollectionResponse();

    expect(response).toBeInstanceOf(ParticipantsCollectionResponse);
    expect(response.data).toBeUndefined();
  });

  it('should instantiate with data object', () => {
    const participantData = {
      id: 123,
      sportId: 1,
      locationId: 5,
      name: 'Manchester United',
      gender: 1,
      ageCategory: 0,
      type: 1,
    };
    const data = {
      data: [participantData],
      totalItems: 150,
    };
    const response = new ParticipantsCollectionResponse(data);

    expect(response.data).toEqual([participantData]);
    expect(response.totalItems).toBe(150);
  });

  it('should handle empty data array', () => {
    const data = {
      data: [],
      totalItems: 0,
    };
    const response = new ParticipantsCollectionResponse(data);

    expect(response.data).toEqual([]);
    expect(response.totalItems).toBe(0);
  });

  it('should handle multiple participants in data array', () => {
    const participantsData = [
      {
        id: 1,
        sportId: 6046,
        locationId: 142,
        name: 'Team A',
        gender: 1,
        ageCategory: 0,
        type: 1,
      },
      {
        id: 2,
        sportId: 6046,
        locationId: 142,
        name: 'Team B',
        gender: 2,
        ageCategory: 1,
        type: 2,
      },
    ];
    const data = {
      data: participantsData,
      totalItems: 2,
    };
    const response = new ParticipantsCollectionResponse(data);

    expect(response.data).toEqual(participantsData);
    expect(response.data).toHaveLength(2);
    expect(response.totalItems).toBe(2);
  });

  it('should handle null/undefined data', () => {
    const response1 = new ParticipantsCollectionResponse(null);
    const response2 = new ParticipantsCollectionResponse(undefined);

    expect(response1).toBeInstanceOf(ParticipantsCollectionResponse);
    expect(response2).toBeInstanceOf(ParticipantsCollectionResponse);
  });

  it('should handle additional properties from data object', () => {
    const data = {
      data: [],
      totalItems: 0,
      customProperty: 'test',
    };
    const response = new ParticipantsCollectionResponse(data);

    expect(response.data).toEqual([]);
    expect(response.totalItems).toBe(0);
    expect(response.customProperty).toBe('test');
  });

  it('should handle participants with nullable enum properties', () => {
    const participantData = {
      id: 100,
      sportId: 1,
      locationId: 5,
      name: 'Test Participant',
      gender: null,
      ageCategory: null,
      type: null,
    };
    const data = {
      data: [participantData],
      totalItems: 1,
    };
    const response = new ParticipantsCollectionResponse(data);

    expect(response.data).toHaveLength(1);
    expect(response.data![0].gender).toBeNull();
    expect(response.data![0].ageCategory).toBeNull();
    expect(response.data![0].type).toBeNull();
  });
});
