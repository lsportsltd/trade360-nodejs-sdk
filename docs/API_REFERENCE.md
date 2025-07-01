### Trade360 Node.js SDK – API Reference

> **Version:** 1.1.0  |  **Last generated:** 2025-07-01

---

This document is an exhaustive, developer-focused reference to all *public* entry-points exported by the Trade-360 Node.js SDK.  If you are **just getting started**, read the project-level [README.md](../README.md) first – it explains installation & high-level concepts.  Use this file when you need exact method signatures, parameter descriptions, and copy--pasteable code-snippets.

> **Tip:** All code samples are written in TypeScript.  Replace type annotations with plain JavaScript when using the SDK in JavaScript projects.


## Table of contents

1. Feed service (`@feed`)
   1. [`Feed`](#class-feed)
   2. [`IFeed`](#interface-ifeed)
   3. [`IEntityHandler`](#interface-ientityhandler)
2. Snapshot API (`@api/snapshot-api`)
   1. [`SnapshotApiFactory`](#class-snapshotapifactory)
   2. [`InPlaySnapshotApiClient`](#interface-inplaysnapshotapiclient)
   3. [`PreMatchSnapshotApiClient`](#interface-prematchsnapshotapiclient)
3. Customers API (`@api/customers-api`)
   1. [`CustomersApiFactory`](#class-customersapifactory)
   2. [`IPackageDistributionHttpClient`](#interface-ipackagedistributionhttpclient)
   3. [`IMetadataHttpClient`](#interface-imetadatahttpclient)
   4. [`ISubscriptionHttpClient`](#interface-isubscriptionhttpclient)
4. Utilities (`@utilities`)
   1. [`DistributionUtil`](#class-distributionutil)
   2. [`Retry`](#function-withretry)
   3. [`TransformerUtil`](#class-transformerutil)
5. Logger (`@logger`)
   1. [`ILogger`](#interface-ilogger)
   2. [`ConsoleAdapter`](#class-consoleadapter)

---

## 1. Feed service (`@feed`)

### <a name="class-feed"></a> `Feed`
High–level façade used to **consume live / pre-match messages** from the Trade-360 RabbitMQ stream.

#### Constructor
```ts
new Feed(mqSettings: MQSettingsOptions, logger?: ILogger)
```
* **`mqSettings`** – connection & behaviour settings.  Use the same structure you would pass to the *Feed Sample* – see `sample/feed-sample/src/config/app-config.json`.
* **`logger`** *(optional)* – custom logger implementing `ILogger`.  Defaults to `ConsoleAdapter`.

#### Methods
| Signature | What it does |
|-----------|--------------|
| `setLogger(logger: ILogger): void` | Swap the logger instance after construction. |
| `start(preConnectionAtStart?: boolean): Promise<void>` | Opens the AMQP connection and begins message consumption.  When `preConnectionAtStart=true` the feed will also auto-start *distribution* if it is currently disabled. |
| `stop(): Promise<void>` | Gracefully closes the AMQP connection.  If distribution was auto-started by `start`, it will be stopped here. |
| `addEntityHandler<TEntity>(handler: IEntityHandler<TEntity>, ctor: Constructor<TEntity>): Promise<void>` | Register *one* handler for an entity type.  You usually call this once per entity you care about (e.g. `FixtureMetadataUpdate`, `Market`, …). |

#### Minimal example
```ts
import { Feed } from 'trade360-nodejs-sdk';
import { FixtureMetadataUpdate, FixtureMetadataUpdateHandler } from './handlers';
import { getConfig, logger } from './config';

const config = getConfig();
const feed = new Feed(config.trade360.inPlayMQSettings, logger);

await feed.addEntityHandler(new FixtureMetadataUpdateHandler(), FixtureMetadataUpdate);
await feed.start(true);
```

---

### <a name="interface-ifeed"></a> `IFeed`
Interface implemented by `Feed`.  Exposed for **dependency-injection / mocking**.

```ts
interface IFeed {
  start(preConnectionAtStart?: boolean): Promise<void>;
  stop(): Promise<void>;
  addEntityHandler<TEntity extends BaseEntity>(
    handler: IEntityHandler<TEntity>,
    ctor: Constructor<TEntity>,
  ): Promise<void>;
}
```

### <a name="interface-ientityhandler"></a> `IEntityHandler<TEntity>`
Single-responsibility callback that processes one **logical message** from the queue.

```ts
interface IEntityHandler<TEntity> {
  processAsync(args: { header: MessageHeader; entity: TEntity }): Promise<void>;
}
```

Create your own handler by implementing the interface or extending one of the sample handlers shipped under `sample/feed-sample`.

---

## 2. Snapshot API (`@api/snapshot-api`)
Provides **read-only REST endpoints** for state recovery.  All clients share common request headers (`packageId`, `username`, `password`).

### <a name="class-snapshotapifactory"></a> `SnapshotApiFactory`

```ts
import { SnapshotApiFactory } from 'trade360-nodejs-sdk';

const factory = new SnapshotApiFactory();
```

| Method | Returns | Used for |
|--------|---------|----------|
| `createSnapshotApiInPlayHttpClient(cfg)` | `InPlaySnapshotApiClient` | Retrieve live fixtures & markets. |
| `createSnapshotApiPrematchHttpClient(cfg)` | `PreMatchSnapshotApiClient` | Retrieve pre-match fixtures & markets. |

`cfg` is an object with:
```ts
interface IHttpServiceConfig {
  restApiBaseUrl: string;             // e.g. "https://stm-snapshot.lsports.eu/"
  packageCredentials: {
    packageId: string;
    username: string;
    password: string;
  };
  logger?: ILogger;
}
```

#### Example – get live fixtures
```ts
const snapshotApiFactory = new SnapshotApiFactory();
const client = snapshotApiFactory.createSnapshotApiInPlayHttpClient({
  restApiBaseUrl: config.trade360.restApiBaseUrl,
  packageCredentials: config.trade360.inPlayMQSettings,
  logger,
});

const fixtures = await client.getFixtures(new GetFixtureRequestDto({
  sportIds: [6046],    // Soccer
}));
```

> *All request / response DTOs live under `@api/snapshot-api/interfaces`.*

---

## 3. Customers API (`@api/customers-api`)
Write-oriented REST endpoints for **subscription management**, **metadata lookup** and **package distribution**.

### <a name="class-customersapifactory"></a> `CustomersApiFactory`
```ts
import { CustomersApiFactory } from 'trade360-nodejs-sdk';

const factory = new CustomersApiFactory();
```

| Method | Returns | Scope |
|--------|---------|-------|
| `createPackageDistributionHttpClient(cfg)` | `IPackageDistributionHttpClient` | Start / stop distribution, get status. |
| `createMetadataHttpClient(cfg)` | `IMetadataHttpClient` | Sports, leagues, markets, translations … |
| `createSubscriptionHttpClient(cfg)` | `ISubscriptionHttpClient` | Subscribe / unsubscribe to fixtures or leagues. |

All three clients share the same `IHttpServiceConfig` object (see previous section).

### Interfaces (shape only)
```ts
interface IPackageDistributionHttpClient {
  start(): Promise<void>;
  stop(): Promise<void>;
  status(): Promise<DistributionStatus>;
}

interface IMetadataHttpClient {
  getSports(req: GetSportsRequestDto): Promise<Sport[]>;
  // … similar helpers for leagues, markets, translations
}

interface ISubscriptionHttpClient {
  subscribe(req: SubscribeRequestDto): Promise<SubscriptionResponseDto>;
  unsubscribe(req: UnsubscribeRequestDto): Promise<SubscriptionResponseDto>;
}
```

#### Example – subscribe to a fixture
```ts
const subscriptionHttpClient = factory.createSubscriptionHttpClient({
  restApiBaseUrl: config.trade360.restApiBaseUrl,
  packageCredentials: config.trade360.inPlayMQSettings,
  logger,
});

await subscriptionHttpClient.subscribe(new SubscribeRequestDto({ fixtureIds: [1234567] }));
```

---

## 4. Utilities (`@utilities`)

### <a name="class-distributionutil"></a> `DistributionUtil`
Helper used internally by `Feed` but also available *publicly* for advanced scenarios.

```ts
const util = new DistributionUtil(mqSettings, logger);
await util.start();   // ensure distribution is running
```

Main methods
| Method | Purpose |
|--------|---------|
| `static start(): Promise<void>` | Start distribution flow |
| `static stop(): Promise<void>` | Stop distribution flow |
| `static checkStatus(): Promise<{ isDistributionOn: boolean }>` | Get current status |

### <a name="function-withretry"></a> `withRetry`
Smart wrapper that retries anything async with **exponential back-off**.
```ts
import { withRetry } from 'trade360-nodejs-sdk';

await withRetry(async () => doSomething(), { maxAttempts: 5, delayMs: 500 });
```

### <a name="class-transformerutil"></a> `TransformerUtil`
Thin wrapper around `class-transformer` used to **convert plain objects to class instances**.  Rarely needed directly, but exposed for convenience.

---

## 5. Logger (`@logger`)

### <a name="interface-ilogger"></a> `ILogger`
Abstraction over any logging library.
```ts
interface ILogger {
  trace(msg: string, meta?: unknown): void;
  debug(msg: string, meta?: unknown): void;
  info(msg: string, meta?: unknown): void;
  warn(msg: string, meta?: unknown): void;
  error(msg: string | Error, meta?: unknown): void;
}
```

### <a name="class-consoleadapter"></a> `ConsoleAdapter`
Default implementation that logs to **stdout / stderr** using Node's `console` API.
```ts
import { ConsoleAdapter } from 'trade360-nodejs-sdk';

const logger = new ConsoleAdapter();
logger.info('Hello world');
```

---

## Advanced topics

* **Error classes** – all custom errors are re-exported from `@lsports/errors`.  They follow the same interface: `name`, `message`, optional `context` for additional details.
* **Entity models** – fully-typed under `@lsports/entities` (e.g. `Fixture`, `Market`, `Score` …).  Use them to obtain *strict intellisense* when processing feed messages.
* **Enums** – `@lsports/enums` contains all enumerations used by the SDK (sport IDs, language codes, market types …).

---

### Contributing to the docs

Documentation is generated & maintained manually in Markdown **and** automatically via [TypeDoc](https://typedoc.org/).  To regenerate HTML docs run:

```bash
npm install --no-save typedoc
npm run docs
```

The script alias is defined in `package.json` and produces HTML files under `docs/typedoc`.

---

© LSports – MIT licence