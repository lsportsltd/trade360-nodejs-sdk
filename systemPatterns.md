# System Patterns & Architecture

## System Architecture

The SDK follows a layered architecture with clear separation of concerns:

```
Application Layer
    ↓
Feed / Snapshot / Customers Modules
    ↓
Transport Layer (RabbitMQ / HTTP)
    ↓
Transformation Layer (Mapper / Validator)
    ↓
Entity Layer (Domain Models)
    ↓
Error Handling Layer
```

## Key Design Patterns

### 1. Adapter Pattern

**Logger Adapters**
- Interface-based logging (`ILogger`)
- Multiple implementations: Console, Pino, Winston, Bunyan
- Allows swapping loggers without code changes

**HTTP Service Adapters**
- Abstract HTTP service interface
- Axios implementation
- Enables testing and alternative implementations

### 2. Factory Pattern

**API Factory**
- Creates pre-configured API client instances
- Handles dependency injection
- Simplifies client instantiation

### 3. Strategy Pattern

**Retry Strategies**
- Configurable retry logic with exponential backoff
- Different strategies for different error types
- Pluggable retry implementations

### 4. Decorator Pattern

**Class Transformer Decorators**
- `@Expose` for property mapping
- `@Type` for nested object transformation
- Enables automatic DTO ↔ Entity conversion

### 5. Observer Pattern

**Entity Handlers**
- Register handlers for entity types
- Event-driven message processing
- Loose coupling between feed and application logic

### 6. Builder Pattern

**Request DTOs**
- Fluent interface for building requests
- Optional parameters with sensible defaults
- Type-safe request construction

## Component Relationships

### Feed Module

```
Feed (Interface)
    ↓
RabbitMQFeed (Implementation)
    ↓
MessageConsumer
    ↓
Entity Handlers (Registered)
```

### API Modules

```
API Client (Interface)
    ↓
Implementation (Snapshot/Customers)
    ↓
BaseHttpClient
    ↓
AxiosService
```

### Transformation Flow

```
API Response / RabbitMQ Message
    ↓
Plain Object (JSON)
    ↓
class-transformer (plainToInstance)
    ↓
Typed Entity
```

## Key Technical Decisions

### 1. TypeScript-First Design

**Decision:** Use TypeScript as the primary language
**Rationale:** 
- Type safety prevents runtime errors
- Better IDE support and developer experience
- Self-documenting code through types

### 2. Decorator-Based Transformation

**Decision:** Use `class-transformer` for object mapping
**Rationale:**
- Declarative property mapping
- Handles nested objects and arrays
- Support for custom transformations

### 3. Interface-Based Design

**Decision:** Use interfaces for logger, HTTP service, etc.
**Rationale:**
- Enables testing with mocks
- Allows alternative implementations
- Reduces coupling

### 4. String IDs for JSON Compatibility

**Decision:** Use string IDs instead of numbers for entities
**Rationale:**
- JavaScript number precision limits
- JSON serialization compatibility
- Frontend interoperability

### 5. Modular Error Hierarchy

**Decision:** Custom error classes extending base errors
**Rationale:**
- Type-safe error handling
- Context preservation
- Better debugging experience

## Architecture Principles

### Separation of Concerns

- **Transport:** RabbitMQ/HTTP communication
- **Transformation:** Data mapping and validation
- **Domain:** Business entities and logic
- **Application:** High-level SDK APIs

### Single Responsibility

- Each module has one clear purpose
- Classes have focused responsibilities
- Functions do one thing well

### Dependency Injection

- Dependencies passed to constructors
- Enables testing and flexibility
- Reduces tight coupling

### Fail-Fast Validation

- Validate inputs early
- Clear error messages
- Prevent invalid state propagation

## Data Flow Patterns

### Feed Message Flow

1. **Receive:** RabbitMQ delivers raw message
2. **Parse:** JSON parsing with ID safety
3. **Validate:** Zod schema validation
4. **Transform:** Convert to typed entity
5. **Dispatch:** Call registered handler
6. **Handle Errors:** Wrap and log errors

### API Request Flow

1. **Create DTO:** Build request with typed DTO
2. **Validate:** Request validation
3. **Transform:** Map DTO to API format
4. **Send:** HTTP request via service
5. **Parse:** Parse JSON response
6. **Transform:** Convert to typed entity
7. **Handle Errors:** Wrap HTTP errors

## Testing Patterns

### Unit Testing
- Test individual components in isolation
- Mock dependencies
- Use Jest with ts-jest

### Integration Testing
- Test API client interactions
- Mock HTTP responses
- Test transformation logic


