# Project Brief

## Project Goals

The Trade360 Node.js SDK is a comprehensive TypeScript library designed to simplify integration with LSports Trade360 services. This SDK serves as the primary integration layer for Node.js/TypeScript applications in the Trade360 ecosystem.

## Core Requirements

### Primary Objectives

1. **Real-time Data Feed Integration**
   - Connect to RabbitMQ message queues
   - Consume real-time sports data feeds (in-play and pre-match)
   - Handle various message types: fixtures, livescores, markets, settlements, and outright events
   - Support automatic reconnection and distribution management

2. **Snapshot API Integration**
   - Provide HTTP-based data retrieval for recovery scenarios
   - Support querying fixtures, markets, livescores, and settlements
   - Enable filtering by sport, location, league, and fixture IDs
   - Support both in-play and pre-match contexts

3. **Customers API Integration**
   - Manage subscriptions (start/stop distribution, subscribe/unsubscribe)
   - Retrieve metadata (sports, leagues, locations, markets, translations, venues, cities, states, participants)
   - Handle manual suspensions programmatically

## Scope

### In Scope

- TypeScript SDK with full type coverage
- RabbitMQ integration for real-time feeds
- REST API clients for Snapshot and Customers APIs
- Comprehensive error handling and validation
- Flexible logging with multiple adapter support
- ID transformation for large number handling
- Retry and recovery mechanisms
- Sample implementations

### Out of Scope

- Direct database access
- UI/UX components
- Backend server implementation
- Authentication/authorization (handled by API credentials)

## Success Criteria

- Successful integration with Trade360 services
- Reliable real-time data feed consumption
- Complete API coverage for snapshot and customer management
- Type-safe API with comprehensive TypeScript definitions
- Production-ready error handling and logging
- Well-documented with sample code

## Target Users

- Node.js/TypeScript developers integrating with Trade360
- Applications requiring real-time sports data
- Services needing snapshot data for recovery
- Applications managing customer subscriptions programmatically


