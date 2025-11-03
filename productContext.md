# Product Context

## Why This Project Exists

The Trade360 Node.js SDK addresses the need for a unified, type-safe interface to integrate Node.js/TypeScript applications with LSports Trade360 services. Without this SDK, developers would need to:

- Manually implement RabbitMQ connections and message handling
- Build custom HTTP clients for multiple APIs
- Handle complex message transformations and validation
- Manage connection lifecycle, retries, and error scenarios
- Maintain type definitions and API contracts

## Problems It Solves

### 1. Complex Integration Challenges

**Problem:** Integrating with Trade360 services requires deep understanding of:
- RabbitMQ message queue protocols
- Multiple API endpoints with different authentication
- Complex message structures and transformations
- Connection lifecycle management

**Solution:** The SDK abstracts these complexities behind a simple, type-safe interface.

### 2. Type Safety and Validation

**Problem:** Working with dynamic JSON responses and messages leads to:
- Runtime errors from missing or incorrectly typed data
- Manual type checking and validation code
- Inconsistent error handling

**Solution:** Full TypeScript coverage with Zod schema validation ensures compile-time and runtime safety.

### 3. Connection Reliability

**Problem:** Network connections can fail, requiring:
- Manual reconnection logic
- Retry strategies with exponential backoff
- Connection state management

**Solution:** Built-in automatic reconnection and retry mechanisms handle failures gracefully.

### 4. Maintenance Burden

**Problem:** Without a centralized SDK:
- Each application must maintain its own integration code
- API changes require updates across multiple codebases
- Inconsistent error handling and logging

**Solution:** Centralized SDK ensures consistent behavior and easier maintenance.

## How It Should Work

### Real-time Feed Flow

1. Developer configures SDK with connection settings
2. SDK connects to RabbitMQ and subscribes to queues
3. Messages are consumed, validated, and transformed
4. Registered handlers process entity updates
5. Automatic reconnection handles network issues

### Snapshot API Flow

1. Developer creates request DTOs with filters
2. SDK validates request and transforms to API format
3. HTTP request sent to Snapshot API
4. Response transformed to typed entities
5. Errors are caught and wrapped in custom error classes

### Customer API Flow

1. Developer uses typed service methods
2. SDK handles authentication and request formatting
3. Responses are validated and transformed
4. Typed entities returned to application

## User Experience Goals

### Developer Experience

- **Simple API:** Minimal boilerplate code
- **Type Safety:** Full TypeScript IntelliSense support
- **Clear Errors:** Descriptive error messages with context
- **Flexible:** Support for multiple logging adapters
- **Well Documented:** Comprehensive docs and examples

### Runtime Experience

- **Reliable:** Automatic reconnection and retry mechanisms
- **Performant:** Efficient message processing
- **Observable:** Comprehensive logging support
- **Safe:** Input validation and error handling

## Key Value Propositions

1. **Reduced Development Time:** Pre-built integration logic
2. **Type Safety:** Compile-time and runtime validation
3. **Reliability:** Built-in error handling and retry logic
4. **Consistency:** Standardized integration patterns
5. **Maintainability:** Centralized codebase for easier updates

