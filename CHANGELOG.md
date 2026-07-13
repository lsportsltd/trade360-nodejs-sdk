
# Changelog

All notable changes to this project will be documented in this file.

## Table of Contents

- [Version 3.10.1](#version-3101)
- [Version 3.10.0](#version-3100)
- [Version 3.9.8](#version-398)
- [Version 3.9.7](#version-397)
- [Version 3.9.6](#version-396)
- [Version 3.9.5](#version-395)
- [Version 3.9.4](#version-394)
- [Version 3.9.3](#version-393)
- [Version 3.9.2](#version-392)
- [Version 3.9.1](#version-391)
- [Version 3.8.3](#version-383)
- [Version 3.8.2](#version-382)
- [Version 3.8.1](#version-381)
- [Version 3.8.0](#version-380)
- [Version 3.7.3](#version-373)
- [Version 3.7.2](#version-372)
- [Version 3.7.1](#version-371)
- [Version 3.6.0](#version-360)
- [Version 3.4.2](#version-342)
- [Version 3.4.0](#version-340)
- [Version 3.3.0](#version-330)
- [Version 3.2.1](#version-321)
- [Version 3.1.0](#version-310)
- [Version 3.0.0](#version-300)
- [Version 2.0.1](#version-201)


---

## [Unreleased]

### Changed

- **`Market.status`**: RMQ JSON field is `Status` on calculated market payloads (PRD-1516). No property rename from 3.10.1.

---

## Version 3.10.1

Adds authoritative market-level status on Market and ProviderMarket messages (PRD-1516).

### Added

- **`MarketStatus`** enum (`NotSet`, `Open`, `Suspended`, `Settled`) for market-level status values.
- **`Market.status`**: maps JSON `Status` on RMQ market payloads (1=Open, 2=Suspended, 3=Settled).
- **`ProviderMarket.marketStatus`**: maps JSON `MarketStatus` on provider market payloads from the feed.

---

## Version 3.10.0

Adds optional RabbitMQ TLS and custom consume queue configuration (TRGN-181, TRGN-182), aligned with .NET and Java SDKs.

### Added

- **`MQSettings`**: optional **`customQueueName`** to consume a fixed queue instead of the default pattern `_{packageId}_`; **`sslEnabled`** toggles TLS (AMQPS) for the RabbitMQ transport.
- **`resolveConsumeQueueName`**: resolves the effective consume queue name from `packageId` and `customQueueName`.
- **`RabbitMQFeed`**: connects via AMQPS when **`sslEnabled`** is true (`servername` set from hostname); actionable connection error messages for TLS/port mismatches and authentication failures.

### Changed

- **`MQSettingsSchema`**: **`packageId`** must be positive (Node.js uses one settings object for both distribution and RabbitMQ; unlike .NET/Java split configuration, `packageId: 0` is not supported). Optional **`customQueueName`** overrides only the consume queue; effective queue name length is validated (max 255 characters).

---

## Version 3.9.8

Adds optional `MarketId` customer message header support (TRGN-3848).

### Added

- **`TransportMessageHeaders`**: optional `marketId` customer message header (`MarketId`, TRGN-3848).

---

## Version 3.9.7

Adds `NextFixtureStartTime` support on Outright League Market Update (type 40) messages (TR-22695).

### Added

- **`OutrightLeagueMarketCompetition`** — Competition type for type 40 messages with optional `nextFixtureStartTime` (`Competition.NextFixtureStartTime` in the feed payload).

---

## Version 3.9.6

Adds configurable distribution propagation delay and initial RabbitMQ connection retry settings (TR-23899).

### Added

- **`distributionPropagationDelayMs`** (default: 2000) — Configurable wait after distribution is enabled before the first RabbitMQ connection when using `feed.start(true)`.
- **`initialConnectionRetryIntervalMs`** (default: 1000, minimum: 500) — Configurable delay between initial connection retries after `feed.start(true)`.
- **`initialConnectionMaxAttempts`** (default: 5) — Configurable maximum attempts for the initial RabbitMQ connection when `feed.start(true)`.

### Fixed

- **403 ACCESS_REFUSED after Distribution/Start (TR-23899)** — Consumers can tune propagation wait and initial connect retries without code changes. When distribution was already on, the SDK now applies `distributionPropagationDelayMs` before connecting (previously no wait in that path).

### Backward Compatibility

No breaking changes. Default behavior matches v3.9.5 unless new settings are set explicitly.

---

## Version 3.9.5

Fixes unstable deserialization of nested outright league feed events (message types 38, 40, and 43).

### Fixed

- **Circular imports in outright league event transformation (TR-23836)**
  - Removed barrel (`@entities` / `@lsports/entities`) imports from `transformToEventInstance`, `OutrightLeagueCompetitions`, and `OutrightCompetition` in favor of direct module imports.
  - Event type resolution now builds the class map at call time so nested `Events` are always transformed into proper instances (`fixtureId`, `outrightLeague`, `markets`, `bets`) instead of intermittently remaining raw PascalCase plain objects.
  - Resolves `TypeError: transformToEventInstance is not a function` in some module load orders.

### Testing

- Added regression tests for message types 38, 40, and 43 nested event deserialization.
- Added unit tests for `transformToEventInstance`.

### Backward Compatibility

No breaking changes to public APIs. Consumers who added PascalCase fallbacks for nested outright league events can rely on camelCase class instances consistently after upgrading.

---

## Version 3.9.4

Aligns SDK models and compatibility behavior for recent outright, livescore, and market updates.

### Added

- **Outright League StartDate support**
  - Added `startDate` mapping (`StartDate`) to:
    - `OutrightLeagueFixtureSnapshot`
    - `OutrightLeagueFixture`
  - Added unit tests to verify deserialization and undefined defaults.

- **Livescore status description values 46-59**
  - Extended `StatusDescription` enum and updated enum tests (forward/reverse mappings and keys list).

### Added

- **Uniform color mapping for participants**
  - Added object-based `shirtColor` and `goalKeeperShirtColor` fields to fixture participants.
  - Added `UniformColor` model with `primary`, `number`, and `outline`.
  - Added deserialization tests for both color objects.

### Backward Compatibility

All changes are backward compatible. New fields are additive and integer-based parsing remains unchanged.

---

## Version 3.9.3

Improves HTTP error handling for non-standard API error bodies and updates the snapshot API sample for fixture markets and logging.

### Fixed

- **HTTP error responses without TRADE360 envelope**
  - When the server returns a plain JSON error (e.g. `{ "error": "..." }`) instead of a `Header`/`Body` structure, `HttpResponseError` now surfaces that message (and common `message` / `Message` fields) instead of reporting only that the header is missing.
  - Raw body remains available on the error `context` for debugging.

### Samples

- **snapshot-api-sample**
  - Demo logging uses a small helper so counts work when snapshot endpoints return an array at runtime while typings still describe a single element.
  - In-Play and Pre-Match **Get Fixture Markets** now call **Get Fixtures** first and pass **fixture IDs** (capped per request), which matches typical snapshot API usage and avoids generic server errors when only `sports` was sent.

### Backward Compatibility

No breaking changes to public method signatures or expected success-response shapes.

---

## Version 3.9.2

Adds ProviderMarkets support to outright league market responses.

### New Features

- **Enhanced Outright Market Body Structure**
  - Added `providerMarkets` property (optional `ProviderMarket[]`) to `OutrightMarketBodyStructure`
  - This enables access to provider market data in `GetOutrightLeagueMarkets` snapshot API responses
  - Each `ProviderMarket` includes `id`, `name`, `Bets` (ProviderBet[]), and `lastUpdate`

### Testing

- Added comprehensive unit tests for `providerMarkets` field in `OutrightMarketBodyStructure`
- Tests cover deserialization, empty arrays, and full structure scenarios

### Backward Compatibility

All changes are backward compatible. Existing code will continue to work without modification. The new field is optional and will be `undefined` if not present in the API response.

---

## Version 3.9.1

Adds FixtureName, Season, and enhanced participant fields to outright entities and snapshot responses for improved fixture metadata support.

### New Features

- **Enhanced Outright Fixture Entities**
  - Added `fixtureName` property (optional string) to `OutrightFixture` for fixture name information
  - Added `season` property (optional `IdNNameRecord`) to `OutrightFixture` for season information

- **Enhanced Outright League Fixture Entities**
  - Added `fixtureName` property (optional string) to `OutrightLeagueFixture` for fixture name information
  - Added `season` property (optional `IdNNameRecord`) to `OutrightLeagueFixture` for season information

- **Enhanced Outright Participant Entities**
  - Added `form` property (optional string) to `OutrightParticipant` for recent form (e.g., "WWDLW")
  - Added `formation` property (optional string) to `OutrightParticipant` for tactical formation (e.g., "4-3-3")
  - Added `fixturePlayers` property (optional `FixturePlayer[]`) to `OutrightParticipant` for player lineup information
  - Added `gender` property (optional number) to `OutrightParticipant`
  - Added `ageCategory` property (optional number) to `OutrightParticipant`
  - Added `type` property (optional number) to `OutrightParticipant`

- **Enhanced Outright Fixture Snapshot Response**
  - Added `fixtureName` property (optional string) to `OutrightFixtureBodyStructure`
  - Added `season` property (optional `IdNNameRecord`) to `OutrightFixtureBodyStructure`

- **Enhanced Outright League Fixture Snapshot Response**
  - Added `fixtureName` property (optional string) to `OutrightLeagueFixtureSnapshot`
  - Added `season` property (optional `IdNNameRecord`) to `OutrightLeagueFixtureSnapshot`

### Testing

- Added comprehensive unit tests for all new properties

### Backward Compatibility

All changes are backward compatible. Existing code will continue to work without modification. The new properties are optional additions to existing entities, ensuring consistency between feed and snapshot response entities.

---

## Version 3.8.3

### Bug Fixes

- **Fixed API Response Transformation Returning Wrong Property Names**
  - **Issue:** API response properties were returning `undefined` even when data was present (e.g., `sportsCollection.sports` returned `undefined`)
  - **Root Cause:** The `handleValidResponse` method was calling `serializeToApiFormat()` which converted the response body back to PascalCase format (e.g., `Sports` instead of `sports`), causing a mismatch with TypeScript type definitions
  - **Fix:** Removed the `serializeToApiFormat()` call and now returns `responsePayload.body` directly, preserving camelCase property names as defined by the `@Expose` decorators
  - **Files Changed:**
    - `src/api/base-http-client/base-http-client.ts`
  - **Impact:** All API responses now correctly return camelCase properties matching TypeScript types. Properties like `locations`, `sports`, `leagues`, `markets` and nested properties like `location.id`, `location.name` now work as expected.

### Technical Details

- The `@Expose({ name: 'Sports' })` decorator is designed to transform API responses from PascalCase (`Sports`) to camelCase (`sports`) for TypeScript usage
- The `serializeToApiFormat` function should only be used when sending data TO the API, not when returning data FROM the API

### Backward Compatibility

All changes are backward compatible. This fix restores the expected behavior where API responses use camelCase property names matching the TypeScript type definitions.

---

## Version 3.8.2

### Bug Fixes

- **Fixed missing Snapshot API DTOs export** - Added missing export of Snapshot DTOs (`GetFixtureRequestDto`, `GetLivescoreRequestDto`, `GetMarketRequestDto`, `GetInPlayEventRequestDto`, `GetEventRequestDto`, `GetOutrightEventRequestDto`, `GetOutrightFixtureRequestDto`, `GetOutrightLeaguesRequestDto`, `GetOutrightLeagueMarketRequestDto`, `GetOutrightLeagueEventsRequestDto`, `GetOutrightLivescoreRequestDto`, `GetOutrightMarketRequestDto`) from the SDK package. Previously, these DTOs were not accessible when installing the SDK via npm, preventing users from using the Snapshot API functionality.

### Technical Details

- Added `export * from '../common/snapshot/dtos'` to `src/api/snapshot-api/index.ts`

---

## Version 3.8.1

### Enhancements

- Enhanced league, fixture and participant fields with additional metadata support
- Added PlayerType enum with Player, Other, and Coach values
- Added FixturePlayer and FixturePlayerInfo entities for better player information handling
- Updated sample project configurations

### Backward Compatibility

All changes are backward compatible. Existing code will continue to work without modification.

---

## Version 3.8.0

Added Seasons and Tours metadata API endpoints for enhanced fixture metadata support.

### New Features

- **Seasons Metadata API**
    - `getSeasons()` - New endpoint to fetch season information
    - `GetSeasonsRequestDto` - Request DTO with optional `seasonId` filter
    - `SeasonsCollectionResponse` - Response wrapper containing seasons array
    - `SeasonBodyStructure` - Response structure with `seasonId` and `seasonName`

- **Tours Metadata API**
    - `getTours()` - New endpoint to fetch tour information
    - `GetToursRequestDto` - Request DTO with optional `tourId` and `sportId` filters
    - `ToursCollectionResponse` - Response wrapper containing tours array
    - `TourBodyStructure` - Response structure with `tourId`, `tourName`, `sportId`, and `sportName`

### API Routes

- Added `/Seasons/Get` endpoint to metadata API
- Added `/Tours/Get` endpoint to metadata API

### Sample Application

- Added interactive demo for `getSeasons()` and `getTours()` in customer-api-sample

### Backward Compatibility

All changes are backward compatible. Existing code will continue to work without modification.

---

## Version 3.7.3

Additional fixes and improvements to sample code and API structure.

### Bug Fixes

- **Feed Event Listeners**
  - Made `consumerMq` property public in Feed class
  - Added documentation clarifying that event listeners should be on `feed.consumerMq`, not `feed.on()`

- **Entity Handler Documentation**
  - Enhanced JSDoc in `IEntityHandler` interface to clarify entities are wrapped in metadata update classes with `events[]` arrays
  - Updated examples to show correct entity structure access patterns

- **Sample Code Fixes**
  - Fixed outright entity handlers to correctly access `competition.competitions[].events[]` structure for OutrightLeagueCompetition types
  - Fixed outright entity handlers to correctly access `competition.events[]` structure for OutrightCompetition types
  - Updated all sample handlers to demonstrate proper entity structure access

- **Customer API Sample**
  - Fixed undefined response handling in customer API sample
  - Added proper checks for `response?.data` before accessing length
  - Improved error handling and logging for undefined responses

### Documentation Improvements

- **Feed Constructor**
  - Added JSDoc documentation clarifying Feed constructor only accepts 2 parameters (mqSettings, logger)
  - Added remark that `preConnectionAtStart` is passed to `start()` method, not constructor

- **Entity Structure**
  - Enhanced documentation explaining that entities are wrapped in metadata update classes
  - Clarified difference between standard entities (with `events[]`) and outright entities (with `competition` property)

### Backward Compatibility

All changes are backward compatible. The `consumerMq` property was made public to allow proper event listener access, but existing code will continue to work.

---

## Version 3.7.2

Fixes documentation and API usage issues based on customer feedback.

### Bug Fixes

- **Logger Adapter Documentation**
  - Removed incorrect `setLogLevel()` method reference from README.md
  - Updated logging examples to clarify that log levels are configured through adapter constructors

- **Entity Handler Interface**
  - Fixed README.md example that incorrectly showed `handle()` method
  - Updated example to use correct `processAsync()` method with `IMessageStructure` interface

- **MQSettings Configuration**
  - Made `customersApiBaseUrl` required in MQSettings schema (was incorrectly marked as optional)
  - Added documentation in README.md explaining that `customersApiBaseUrl` is required

- **HeartbeatUpdate Warning**
  - Suppressed warning for HeartbeatUpdate (entityKey 32) since it's handled automatically by the SDK
  - Prevents unnecessary "entity handler for HeartbeatUpdate is not configured" warnings

### Documentation Improvements

- **Sample Code Updates**
  - Updated sample handlers to demonstrate accessing `events[]` arrays from metadata update classes
  - Improved examples in `sample/feed-sample/src/handler/inplay/` to show correct entity structure access
  - Updated handlers for FixtureMetadataUpdate, MarketUpdate, LivescoreUpdate, and SettlementUpdate

### Backward Compatibility

All changes are backward compatible. The `customersApiBaseUrl` field was already being used as required in practice, so making it required in the schema aligns the code with actual usage patterns.

---

## Version 3.7.1

Adds external fixture ID support to the Fixture entity.

### New Features

- **Fixture Entity Enhancement**
  - Added `externalFixtureId` field to `Fixture` class
  - Field type: `string | null` (nullable)
  - API field name: `ExternalFixtureId`
  - The external ID can be used to reference fixtures from external systems

### Testing

- Added comprehensive unit tests for `externalFixtureId` field
- Tests cover string value, null value, and undefined/missing value scenarios
- All existing tests continue to pass

### Backward Compatibility

All changes are backward compatible. Existing code will continue to work without modification. The new field is optional and will be `undefined` if not present in the API response.

---

## Version 3.6.0

Adds in-play outright league snapshot API support with three new endpoints for retrieving outright league data.

### New Features

- **In-Play Outright League Snapshot API**
  - `getOutrightLeagues()` - New endpoint to fetch in-play outright leagues
  - `getOutrightLeagueMarkets()` - New endpoint to fetch in-play outright league markets
  - `getOutrightLeagueEvents()` - New endpoint to fetch in-play outright league events
  - `GetOutrightLeaguesRequestDto` / `GetOutrightLeagueMarketRequestDto` / `GetOutrightLeagueEventsRequestDto` - Request DTOs for in-play outright league operations
  - `GetOutrightLeaguesResultElement` / `GetOutrightLeagueMarketsResultElement` / `GetOutrightLeagueEventsResultElement` - Response structures for in-play outright league data

- **Enhanced Sample Projects**
  - **snapshot-api-sample**: Added menu options (16-18) and examples for in-play outright league endpoints
  - **feed-sample**: Added handlers for in-play outright league updates:
    - `OutrightLeagueFixtureUpdateHandler`
    - `OutrightLeagueMarketUpdateHandler`
    - `OutrightLeagueSettlementUpdateHandler`

### API Routes

- Added `/Inplay/GetOutrightLeagues` endpoint to in-play snapshot API
- Added `/Inplay/GetOutrightLeagueMarkets` endpoint to in-play snapshot API
- Added `/Inplay/GetOutrightLeagueEvents` endpoint to in-play snapshot API

### Testing

- Comprehensive unit tests for all three new in-play outright league methods
- Tests cover successful requests, route verification, mapper transformation, error handling, and undefined response scenarios

### Backward Compatibility

All changes are backward compatible. Existing code will continue to work without modification.

---

## Version 3.4.2

Bug fix release that resolves response type contract violations and field mapping issues.

### Bug Fixes

- **Fixed Response Type Contract Violation**
  - **Issue:** `handleValidResponse` method was serializing responses to plain objects, breaking the type contract
  - **Root Cause:** Method was converting class instances to plain objects using `serializeToApiFormat`, then casting back to `TResponse`
  - **Fix:** Removed automatic serialization, now returns class instances as specified by the type contract
  - **Files Changed:**
    - `src/api/base-http-client/base-http-client.ts`
  - **Impact:** Maintains backward compatibility and proper type safety. Responses now correctly return class instances with camelCase properties.

- **Fixed Missing ID Fields in Response Classes**
  - **Issue:** Multiple response classes had lowercase `'id'` in `@Expose` decorator, but API returns `'Id'` (capital I)
  - **Root Cause:** Field mapping mismatch between API response format (PascalCase) and decorator configuration
  - **Fix:** Changed `@Expose({ name: 'id' })` to `@Expose({ name: 'Id' })` in 4 response classes
  - **Files Changed:**
    - `src/api/common/body-entities/responses/fixture-market-body-strcture.ts`
    - `src/api/common/body-entities/responses/outright-competitions-result-body-structure.ts`
    - `src/api/common/body-entities/responses/outright-league-events-competition.ts`
    - `src/api/common/body-entities/responses/outright-league-market-competition.ts`
  - **Impact:** Ensures proper deserialization of `id` fields from API responses

### New Features

- **Added Serialization Utility Method**
  - `TransformerUtil.serializeToApiFormat()` - Optional utility method for converting class instances back to PascalCase format
  - Available for users who need explicit serialization to API format
  - Does not affect default SDK behavior

### Backward Compatibility

All changes are backward compatible. Existing code will continue to work without modification. The SDK now correctly returns class instances as expected by the type system.

---

## Version 3.4.0

Adds comprehensive participant metadata support with filtering and pagination capabilities.

### New Features

- **Participants Metadata API**
  - `getParticipants()` - New endpoint to fetch participant information with advanced filtering and pagination
  - `GetParticipantsRequestDto` / `ParticipantFilterDto` - Request DTOs for participant filtering by:
    - Participant IDs (`ids`)
    - Sport IDs (`sportIds`)
    - Location IDs (`locationIds`)
    - Participant name (`name`) - partial match support
    - Gender (`gender`) - Men, Women, or Mix
    - Age category (`ageCategory`) - Regular, Youth, or Reserves
    - Participant type (`type`) - Club, National, Individual, Virtual, Esports, VirtuReal, or Doubles
  - Pagination support with `page` and `pageSize` parameters
  - `ParticipantBodyStructure` - Response structure for participant data including:
    - Basic information (id, sportId, locationId, name)
    - Classification properties (gender, ageCategory, type) - all nullable
  - `ParticipantsCollectionResponse` - Collection response wrapper with `data` array and `totalItems` count

- **New Participant Classification Enums**
  - `Gender` - Enum for gender classification:
    - `Men = 1`
    - `Women = 2`
    - `Mix = 3`
  - `AgeCategory` - Enum for age category classification:
    - `Regular = 0`
    - `Youth = 1`
    - `Reserves = 2`
  - `ParticipantType` - Enum for participant type classification:
    - `Club = 1`
    - `National = 2`
    - `Individual = 3`
    - `Virtual = 4`
    - `Esports = 5`
    - `VirtuReal = 6`
    - `Doubles = 7`

### API Enhancements

- Added `/Participants/Get` endpoint to metadata routes
- Comprehensive filtering capabilities for participant searches
- Pagination support for efficient data retrieval
- All filter properties are optional for flexible querying
- Support for nullable enum properties in response structure

### Sample Application

- Added interactive demo for `getParticipants()` in customer-api-sample
- Example usage with multiple filter options
- Demonstrates pagination parameters

### Testing

- Comprehensive unit tests for `ParticipantsCollectionResponse`
- Enum validation tests for Gender, AgeCategory, and ParticipantType
- ParticipantBodyStructure tests including nullable property handling

---

## Version 3.3.0

Extends messaging models and metadata API with comprehensive venue, city, and state support, plus enhanced fixture entities with venue, stage, and round information.

### New Features

- **Venue, City, and State Metadata APIs**
  - `getVenues()` - New endpoint to fetch venue information with filtering capabilities
  - `getCities()` - New endpoint to fetch city information with filtering capabilities  
  - `getStates()` - New endpoint to fetch state information with filtering capabilities
  - `GetVenuesRequestDto` / `VenueFilterDto` - Request DTOs for venue filtering by venue IDs, country IDs, state IDs, and city IDs
  - `GetCitiesRequestDto` / `CityFilterDto` - Request DTOs for city filtering by country IDs, state IDs, and city IDs
  - `GetStatesRequestDto` / `StateFilterDto` - Request DTOs for state filtering by country IDs and state IDs
  - `VenueBodyStructure` - Response structure for venue data including country, state, and city information
  - `CityBodyStructure` - Response structure for city data including country and state information
  - `StateBodyStructure` - Response structure for state data including country information
  - `VenuesCollectionResponse` / `CitiesCollectionResponse` / `StatesCollectionResponse` - Collection response wrappers

- **Enhanced Fixture Entities**
  - **`FixtureVenue`** - New comprehensive venue entity with:
    - Basic venue information (ID, name, capacity, attendance)
    - Court surface type, environment (indoor/outdoor), and assignment (home/away/neutral)
    - Geographic information (country, state, city)
  - **`Fixture`** - Enhanced with:
    - `venue` property of type `FixtureVenue`
    - `stage` property of type `IdNNameRecord` for tournament stage information
    - `round` property of type `IdNNameRecord` for tournament round information
  - **`OutrightFixture`** - Enhanced with:
    - `venue` property of type `FixtureVenue`
  - **`OutrightFixtureBodyStructure`** - Enhanced API response structure with:
    - `venue` property of type `FixtureVenue` for snapshot API responses

- **New Venue-Related Enums**
  - `CourtSurface` - Enum for court surface types (Grass, Hard, Clay, ArtificialGrass)
  - `VenueAssignment` - Enum for venue assignment (Home, Away, Neutral)
  - `VenueEnvironment` - Enum for venue environment (Indoors, Outdoors)

- **Enhanced Sample Projects**
  - **customer-api-sample (v1.1.0)**: Added menu options and examples for venues, cities, and states metadata APIs
  - **feed-sample**: Updated to demonstrate enhanced fixture entities with venue information

### API Routes

- Added `/Metadata/GetVenues` endpoint to metadata API
- Added `/Metadata/GetCities` endpoint to metadata API  
- Added `/Metadata/GetStates` endpoint to metadata API

### Backward Compatibility

All changes are backward compatible. Existing code will continue to work without modification. The new venue, stage, and round properties are optional additions to existing entities.

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
 