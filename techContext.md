# Technical Context

## Technology Stack

### Runtime & Language
- **Node.js:** Latest LTS version recommended
- **TypeScript:** Compiled to JavaScript (ES2020+)
- **Package Manager:** npm

### Core Dependencies

#### Communication
- **amqplib** (^0.10.4): RabbitMQ client for message queue integration
- **axios** (^1.8.2): HTTP client for REST API interactions

#### Transformation & Validation
- **class-transformer** (^0.5.1): Object transformation and property mapping
- **zod** (^3.23.8): Schema validation and runtime type checking
- **reflect-metadata** (^0.2.2): Metadata reflection for decorators

#### Utilities
- **lodash** (^4.17.21): Utility functions
- **moment** (^2.30.1): Date/time manipulation

#### Logging (Multiple Adapters)
- **winston** (^3.14.2): Structured logging
- **pino** (^9.4.0): Fast JSON logger
- **bunyan** (^1.8.15): JSON logging library

### Development Tools

#### Build & Compilation
- **TypeScript Compiler (tsc):** Compiles TypeScript to JavaScript
- **tsc-alias:** Resolves path aliases in compiled output
- **module-alias** (^2.2.3): Runtime module path aliasing

#### Code Quality
- **ESLint** (^8.57.0): Code linting with Airbnb TypeScript config
- **Prettier** (^3.3.3): Code formatting

#### Testing
- **Jest** (^29.7.0): Testing framework
- **ts-jest** (^29.3.2): TypeScript preprocessor for Jest
- **@types/jest** (^29.5.14): TypeScript types for Jest

## Development Setup

### Prerequisites
- Node.js (Latest LTS version)
- npm or compatible package manager
- TypeScript knowledge

### Build Process

```bash
# Install dependencies
npm install

# Build project
npm run build

# Watch mode (development)
npm run watch

# Run tests
npm test

# Run tests with coverage
npm run test:cov

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Build Output
- Compiled JavaScript: `dist/src/`
- Type definitions: `dist/src/*.d.ts`
- Path aliases resolved for runtime

## Technical Constraints

### JavaScript Limitations
- **Number Precision:** JavaScript's safe integer range (±2^53 - 1)
  - **Solution:** ID transformation utility converts large IDs to strings
  - **Impact:** All entity IDs are strings for JSON compatibility

### TypeScript Constraints
- **Decorators:** Require `reflect-metadata` for runtime metadata
- **Path Aliases:** Require `tsc-alias` for compiled output resolution
- **Module Resolution:** Uses TypeScript's path mapping

### Runtime Constraints
- **Node.js Version:** Requires Node.js that supports ES2020+
- **Memory:** Handles large message volumes efficiently
- **Network:** Requires stable connection for RabbitMQ feeds

## Dependencies

### External Services
- **RabbitMQ:** Message broker for real-time feeds
- **Trade360 Snapshot API:** RESTful API for data retrieval
- **Trade360 Customers API:** RESTful API for subscription management

### Infrastructure
- **Docker:** Containerized deployment support
- **CI/CD:** Azure DevOps pipelines
- **Package Registry:** npm public registry

## Module Aliases

The project uses path aliases for cleaner imports:

```
@feed → dist/src/feed
@entities → dist/src/entities/core-entities/index.js
@lsports/entities → dist/src/entities/core-entities/index.js
@lsports/enums → dist/src/entities/core-entities/enums
@api → dist/src/api
@customers-api → dist/src/api/customers-api
@utilities → dist/src/utilities
@logger → dist/src/logger
```

## File Structure

```
trade360-nodejs-sdk/
├── src/
│   ├── api/              # REST API clients
│   ├── feed/             # RabbitMQ feed implementation
│   ├── entities/          # Domain entities and types
│   ├── utilities/         # Helper utilities
│   └── logger/           # Logging adapters
├── test/                 # Unit and integration tests
├── sample/               # Example implementations
├── dist/                 # Compiled output (generated)
├── package.json          # Project configuration
└── tsconfig.json         # TypeScript configuration
```

## Configuration Files

- **package.json:** Project metadata, dependencies, scripts
- **tsconfig.json:** TypeScript compiler configuration
- **jest.config.js:** Jest testing configuration
- **jest.setup.js:** Jest setup and mocks
- **.eslintrc:** ESLint configuration (Airbnb TypeScript)
- **Dockerfile:** Docker container configuration

## Development Workflow

1. **Code:** Write TypeScript in `src/`
2. **Test:** Write tests in `test/`
3. **Lint:** Run `npm run lint` before commit
4. **Build:** `npm run build` compiles to `dist/`
5. **Test:** `npm test` runs test suite
6. **Publish:** `npm publish` (requires build)

## Production Considerations

- **Bundle Size:** Optimized for Node.js (not browser)
- **Performance:** Efficient message processing
- **Error Handling:** Comprehensive error recovery
- **Logging:** Multiple adapter support for observability
- **Type Safety:** Full TypeScript coverage for reliability

