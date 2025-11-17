# Active Context

## Current Work Focus

### Recent Changes (Version 3.4.2)

1. **Bug Fix: Response Type Contract Violation**
   - **Issue:** `handleValidResponse` was serializing responses to plain objects, breaking the type contract
   - **Root Cause:** Method was converting class instances to plain objects using `serializeToApiFormat`, then casting back to `TResponse`
   - **Fix:** Removed automatic serialization, now returns class instances as specified by the type contract
   - **Files Changed:**
     - `src/api/base-http-client/base-http-client.ts`
   - **Impact:** Maintains backward compatibility and proper type safety

2. **Bug Fix: Missing Market ID in Outright League Markets (TR-20395)**
   - **Issue:** The `id` field was missing from market objects in `getOutrightLeagueMarkets()` API response
   - **Root Cause:** Multiple response classes used lowercase `'id'` in `@Expose` decorator, but API returns `'Id'` (capital I)
   - **Fix:** Changed `@Expose({ name: 'id' })` to `@Expose({ name: 'Id' })` in 4 response classes
   - **Files Changed:**
     - `src/api/common/body-entities/responses/fixture-market-body-strcture.ts`
     - `src/api/common/body-entities/responses/outright-competitions-result-body-structure.ts`
     - `src/api/common/body-entities/responses/outright-league-events-competition.ts`
     - `src/api/common/body-entities/responses/outright-league-market-competition.ts`

3. **Version Update**
   - Updated version from 3.4.1 to 3.4.2
   - Updated `package.json` and all `package-lock.json` files

## Next Steps

### Immediate Tasks
- [x] Fix missing market ID field in Outright League Markets API
- [x] Fix response type contract violation in `handleValidResponse`
- [x] Create unit tests for `OutrightMarketBodyStructure`
- [x] Update version to 3.4.2
- [x] Update all version references across codebase
- [ ] Verify fix works in sample application
- [ ] Update CHANGELOG.md with bug fix details

### Short-term Improvements
- Consider adding integration tests for `getOutrightLeagueMarkets()` endpoint
- Review other response structures for similar casing issues
- Enhance test coverage for response body structures

### Future Considerations
- Monitor for similar API response format inconsistencies
- Consider automated tests for API response structure validation
- Review TODO comments (e.g., StatisticType enum → number conversion)

## Active Decisions

### Response Field Naming Convention
**Decision:** Use capital case for API response fields (e.g., `Id`, `Name`, `Type`)
**Rationale:** 
- Matches API response format consistently
- Aligns with other response structures in codebase
- Prevents deserialization issues

**Applied to:**
- `OutrightMarketBodyStructure.id` field mapping

### Testing Strategy
**Decision:** Add comprehensive unit tests for response body structures
**Rationale:**
- Catch deserialization issues early
- Verify field mapping correctness
- Ensure backward compatibility

## Recent Code Patterns

### Response Structure Pattern
All API response body structures follow this pattern:
```typescript
export class ResponseBodyStructure {
  @Expose({ name: 'Id' })  // Capital I for API field
  id!: number;               // Lowercase for TypeScript property
  
  @Expose({ name: 'Name' })
  name!: string;
}
```

### Test Pattern
Unit tests for response structures:
1. Test full deserialization with all fields
2. Test missing properties handling
3. Test extraneous property ignoring
4. Test specific field mapping (e.g., `Id` → `id`)

## Known Issues

### None Currently
- All reported issues resolved in v3.4.2

## Context Notes

### API Response Format
- Trade360 APIs use PascalCase for field names (e.g., `Id`, `Name`, `Type`)
- SDK maps these to camelCase TypeScript properties (e.g., `id`, `name`, `type`)
- The `@Expose` decorator handles this mapping

### Field Mapping Consistency
- Checked other similar structures for consistency
- All use capital case in `@Expose({ name: 'FieldName' })`
- Lowercase field in `OutrightMarketBodyStructure` was an exception (now fixed)


