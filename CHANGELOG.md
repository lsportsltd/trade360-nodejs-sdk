
# Changelog

All notable changes to this project will be documented in this file.

## Table of Contents

- [Version 3.2.1](#version-321)
- [Version 3.1.0](#version-310)
- [Version 3.0.0](#version-300)
- [Version 2.0.1](#version-201)

---

## Version 3.2.1

Bug fix release that removes unused code and dependencies.

### Bug Fixes

- **Removed Unused SubscriptionType Enum (TR-19889)**
  - Deleted `SubscriptionType` enum from `src/entities/core-entities/enums/subscription-type.ts`
  - Removed unused import from `Subscription` class
  - Removed export from `enums/index.ts`
  - Deleted associated test file `test/entities/core-entities/enums/subscription-type.spec.ts`
  - Updated `subscription.spec.ts` to use numeric values directly instead of enum references

### Impact

- **Code Cleanup:** Removes dead code that was imported but never actually used
- **Bundle Size:** Slightly reduces bundle size by removing unused enum
- **Maintenance:** Eliminates maintenance burden of unused code

### Backward Compatibility

All changes are backward compatible. The `Subscription.type` property was already typed as `number`, so no external code changes are required.

## Version 3.1.0

Enhances outright league support by adding settlement update handling and outright league events API functionality.

### New Features

- **Outright League Settlement Support**
  - `OutrightLeagueSettlementUpdate` - New message type for outright league settlement updates (EntityKey 43)
  - Enhanced feed to process outright league settlement events

- **Outright League Events API**
  - `getOutrightLeagueEvents()` - New endpoint to fetch events for outright leagues
  - `GetOutrightLeagueEventsRequestDto` - Request DTO for outright league events
  - `GetOutrightLeagueEventsResultElement` - Response structure for outright league events
  - `OutrightLeagueEventBodyStructure` - Body structure for outright league event data
  - `OutrightLeagueEventsCompetition` - Competition structure for outright league events

- **Enhanced Sample Projects**
  - **feed-sample (v2.1.0)**: Added `OutrightLeagueSettlementUpdateHandler` for prematch feed processing
  - **snapshot-api-sample (v1.1.0)**: Added menu option and example for outright league events API

### API Routes

- Added `/Prematch/GetOutrightLeagueEvents` endpoint to prematch snapshot API

### Backward Compatibility

All changes are backward compatible. Existing code will continue to work without modification.

## Version 3.0.0

Enhances message structure by introducing `TransportMessageHeaders` for improved transport-level visibility and debugging.

### Breaking Changes

- **`IMessageStructure<TEntity>` Interface Updated**
  - Added a new required property: `transportHeaders` of type `TransportMessageHeaders`.

#### Reason for Change

- **Enhanced Message Processing:** Provides access to RabbitMQ message properties and headers for better handling and debugging.  
- **Transport Layer Visibility:** Exposes metadata such as message GUID, type, sequence, fixture ID, and timestamp.

#### Action Required

- Update all implementations of `IMessageStructure<TEntity>` to handle the new `transportHeaders` property.  
- Ensure message consumers and handlers are updated to work with the enhanced interface.

### New Features

- **`TransportMessageHeaders` Class**
  - Provides a structured way to access RabbitMQ message properties and headers.
  - Features:
    - Static factory method `createFromProperties()` to build instances from RabbitMQ message properties.
    - Automatic byte array → string conversion for header values.
    - Validation for required headers with descriptive error messages.
    - Support for optional headers (`MessageSequence`, `FixtureId`).
    - Exposed properties: `messageType`, `messageSequence`, `messageGuid`, `fixtureId`, `timestampInMs`.

#### Example Usage

```ts
const headers = TransportMessageHeaders.createFromProperties(rabbitMqProperties);
```

## Version 2.0.1  

Introduced a breaking change to improve JSON serialization compatibility for entity identifiers.

### Breaking Changes

- **`BaseBet.id` Type Update**
  - The `id` field in the `BaseBet` entity (and all inheritors) has been changed from `number`/`bigInt` → `string`.

#### Reason for Change

- **JSON Compatibility:** Prevents misinterpretation and precision loss of large numeric IDs during JSON serialization.  
- **Frontend Interoperability:** Ensures consistent handling of IDs in web applications and other systems that rely on JSON.

#### Action Required

- Update any code that directly accesses `BaseBet.id` (or related entities) to treat the property as a `string`.  
- This may require:
  - Updating type definitions.  
  - Adjusting data processing logic.  
  - Refactoring any mathematical operations that assumed `number`/`bigInt`.  
 