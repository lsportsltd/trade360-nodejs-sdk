
# Changelog

All notable changes to this project will be documented in this file.

## Table of Contents

- [Version 3.4.0](#version-340)
- [Version 3.3.0](#version-330)
- [Version 3.2.1](#version-321)
- [Version 3.1.0](#version-310)
- [Version 3.0.0](#version-300)
- [Version 2.0.1](#version-201)

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
 