import { PrecisionJsonParser } from '../../src/utilities/precision-json-parser';

describe('PrecisionJsonParser', () => {
  describe('parsePreservingLargeIds', () => {
    it('should preserve large ID numbers as strings', () => {
      const jsonString = '{"Id":169505664915267782,"Name":"Test","Status":1}';
      const result = PrecisionJsonParser.parsePreservingLargeIds(jsonString);
      
      expect(typeof (result as any).Id).toBe('string');
      expect((result as any).Id).toBe('169505664915267782');
      expect((result as any).Name).toBe('Test');
      expect((result as any).Status).toBe(1);
    });

    it('should handle multiple large IDs in nested objects', () => {
      const jsonString = `{
        "Header":{"Type":3,"MsgSeq":9},
        "Body":{
          "Events":[{
            "FixtureId":15267782,
            "Markets":[{
              "Id":101,
              "Bets":[
                {"Id":169505664915267782,"Name":"Under"},
                {"Id":93313480115267782,"Name":"Over"}
              ]
            }]
          }]
        }
      }`;
      
      const result = PrecisionJsonParser.parsePreservingLargeIds(jsonString) as any;
      
      // Check that large IDs are preserved as strings
      expect(typeof result.Body.Events[0].Markets[0].Bets[0].Id).toBe('string');
      expect(result.Body.Events[0].Markets[0].Bets[0].Id).toBe('169505664915267782');
      expect(typeof result.Body.Events[0].Markets[0].Bets[1].Id).toBe('string');
      expect(result.Body.Events[0].Markets[0].Bets[1].Id).toBe('93313480115267782');
      
      // Check that ID fields are converted to strings for consistency (preventing any precision loss)
      expect(typeof result.Body.Events[0].FixtureId).toBe('string');
      expect(result.Body.Events[0].FixtureId).toBe('15267782');
      expect(typeof result.Body.Events[0].Markets[0].Id).toBe('string'); // This should be converted as it's an ID field
      expect(result.Body.Events[0].Markets[0].Id).toBe('101');
    });

    it('should handle different ID field variations', () => {
      const jsonString = `{
        "id":169505664915267782,
        "userId":93313480115267782,
        "participantId":12345,
        "customId":555666777888999000,
        "other":123
      }`;
      
      const result = PrecisionJsonParser.parsePreservingLargeIds(jsonString) as any;
      
      // All ID fields should be strings (even small ones for consistency)
      expect(typeof result.id).toBe('string');
      expect(result.id).toBe('169505664915267782');
      expect(typeof result.userId).toBe('string');
      expect(result.userId).toBe('93313480115267782');
      expect(typeof result.participantId).toBe('string');
      expect(result.participantId).toBe('12345');
      expect(typeof result.customId).toBe('string');
      expect(result.customId).toBe('555666777888999000');
      
      // Non-ID fields should remain numbers
      expect(typeof result.other).toBe('number');
      expect(result.other).toBe(123);
    });

    it('should handle the exact sample message format', () => {
      const sampleMessage = `{
        "Header":{"Type":3,"MsgSeq":9,"MsgGuid":"d4ff197f-8fc1-4f2c-9148-47c5c0f55ed7","CreationDate":"2025-08-03T07:56:07.9824628Z","ServerTimestamp":1754207767982},
        "Body":{
          "Events":[{
            "FixtureId":15267782,
            "Livescore":null,
            "Markets":[{
              "Id":101,
              "Name":"Under/Over - Home Team",
              "MainLine":"1.5",
              "Bets":[
                {
                  "Probability":0.46462,
                  "CalculatedMargin":8.05,
                  "SerializedCalculatedMargin":"8.05",
                  "Id":169505664915267782,
                  "Name":"Under",
                  "Line":"1.5",
                  "BaseLine":"1.5",
                  "Status":1,
                  "StartPrice":"2.06",
                  "Price":"1.99",
                  "ProviderBetId":"74",
                  "LastUpdate":"2025-08-03T07:56:07.9012947Z",
                  "SerializedLastUpdate":"2025-08-03T07:56:07.901Z"
                },
                {
                  "Probability":0.53538,
                  "CalculatedMargin":8.05,
                  "SerializedCalculatedMargin":"8.05",
                  "Id":93313480115267782,
                  "Name":"Over",
                  "Line":"1.5",
                  "BaseLine":"1.5",
                  "Status":1,
                  "StartPrice":"1.68",
                  "Price":"1.73",
                  "ProviderBetId":"74",
                  "LastUpdate":"2025-08-03T07:56:07.9012954Z",
                  "SerializedLastUpdate":"2025-08-03T07:56:07.901Z"
                }
              ]
            }]
          }]
        }
      }`;

      const result = PrecisionJsonParser.parsePreservingLargeIds(sampleMessage) as any;
      
      // Verify that the large bet IDs are preserved exactly
      const bets = result.Body.Events[0].Markets[0].Bets;
      expect(typeof bets[0].Id).toBe('string');
      expect(bets[0].Id).toBe('169505664915267782');
      expect(typeof bets[1].Id).toBe('string');
      expect(bets[1].Id).toBe('93313480115267782');
      
      // Verify other data remains correct
      expect(typeof bets[0].Probability).toBe('number');
      expect(bets[0].Probability).toBe(0.46462);
      expect(bets[0].Name).toBe('Under');
    });

    it('should handle empty objects and arrays', () => {
      const jsonString = '{"Events":[],"Markets":{}}';
      const result = PrecisionJsonParser.parsePreservingLargeIds(jsonString);
      
      expect((result as any).Events).toEqual([]);
      expect((result as any).Markets).toEqual({});
    });

    it('should handle strings that look like IDs but are actually strings', () => {
      const jsonString = '{"Id":"string-id-123","Name":"Test"}';
      const result = PrecisionJsonParser.parsePreservingLargeIds(jsonString);
      
      expect(typeof (result as any).Id).toBe('string');
      expect((result as any).Id).toBe('string-id-123');
    });

    it('should throw error for invalid JSON', () => {
      const invalidJson = '{"Id":123,}'; // trailing comma
      
      expect(() => {
        PrecisionJsonParser.parsePreservingLargeIds(invalidJson);
      }).toThrow();
    });
  });
});