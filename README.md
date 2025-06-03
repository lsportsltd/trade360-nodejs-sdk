# LSports Trade360 SDK

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
    - [Pre-requisites](#pre_requisites)
    - [Installing](#installing)
- [Usage Guide](#usage_guide)
  - [Connecting to Trade360 Feed](#usage_guide_feed)
  - [Using the Snapshot API](#usage_snapshot_api)
  - [Using Customers API](#usage_customers_api)
- [Error Handling](#errorhandling)
- [License](#license)

## About <a name = "about"></a>

The Trade360 SDK is designed to simplify the integration with Trade360 services. This SDK provides a comprehensive set of tools and examples to streamline the following tasks:

- Connecting to the Trade360 feed
- Utilizing the Snapshot API
- Interacting with the Customers API

By using this SDK, developers can easily integrate and interact with Trade360's services, ensuring efficient and effective use of the available APIs.

### Key Features
- Efficiently connect and interact with the Trade360 feed, featuring automatic recovery through configuration and seamless start/stop distribution aligned with service operations.
- Utilize the Snapshot API for real-time recovery, with an easy-to-use HTTP client exposing all relevant endpoints, including comprehensive request and response handling.
- Manage customer data and subscriptions seamlessly via the Customers API, offering an intuitive HTTP client that covers all necessary endpoints for efficient data management.

## Getting Started <a name="getting_started"></a>
This section provides examples and guidance to help you start using the Trade360 SDK.

## Prerequisites  <a name = "pre_requisites"></a>

Before using the SDK, ensure you have the following installed:

- **Node.js** (Recommended: Latest LTS version)
- **TypeScript** (If using TypeScript-based projects)
- **Dependencies** (Automatically installed via npm, see `package.json`)

## Installation <a name = "installing"></a>
A step-by-step series of instructions to set up your development environment.

1. **Clone the repository:**

    ```bash
    git clone https://github.com/lsportsltd/trade360-nodejs-sdk.git
    cd trade360-nodejs-sdk/sample

2. **Install the SDK using npm:**

    ```sh
    npm install trade360-sdk
    ```

    If using TypeScript, install the necessary types:

    ```sh
    npm install --save-dev @types/node  
    ```
3. **Build the project:**

    ```sh
    npm run build 
    ```
## Usage Guide <a name = "usage_guide"></a>

### Connecting to Trade360 Feed <a name = "usage_guide_feed"></a>

This is an example usage of the feed SDK, which gives you the ability to create an instance and connect to your RabbitMQ feed. You can create a handler to deal with each type of message being produced (fixture, livescore, markets, settlement) for standard sports, outright sports, and outright league sports (tournaments). Please download the repo and run the examples for more information.

#### Example Configuration (`sample/feed-sample/src/config/app-config.json`)
```js
"trade360": {
  "inPlayMQSettings": {
    "hostname": "trade360-inplay-rabbitmq-host",
    "port":  "trade360-inplay-rabbitmq-port",
    "vhost": "trade360-inplay-rabbitmq-virtual-host",
    "username": "your-username",
    "password": "your-password",
    "packageId": "your-packageid",
    "prefetchCount": 1,
    "networkRecoveryIntervalInMs": 5000,
    "maxRetryAttempts":3000, 
    "automaticRecoveryEnabled": true,
    "autoAck": true,
    "consumptionLatencyThreshold": 5,
    "customersApiBaseUrl": "https://stm-api.lsports.eu/",
    "PACKAGE_FORMAT_TYPE": "2",
    "requestedHeartbeatSeconds": 30,
    "dispatchConsumersAsync": true
  }
},
```
same for configuration need to be define for pre match.
Then, initialize the SDK in your application:

```js
// Load configuration from appConfig file
const config = getConfig();
```
define new feed for each inPlay or preMatch or both-
```js
// Load configuration from appConfig file
const feedInPlay = new Feed(config.trade360.inPlayMQSettings!, logger);
```
Then, you need to define which messages the feed will consume, for example-
```js
feedInPlay.addEntityHandler(new FixtureMetadataUpdateHandler(), FixtureMetadataUpdate);
```
Now, you can start consuming messages via SDK-
```js
await feedInPlay.start(true);
```
### Using the Snapshot API <a name = "usage_snapshot_api"></a>
This is an example usage of the Snapshot API SDK, which provides an easy way to interact with the Snapshot API for recovery purposes. The SDK offers a simplified HTTP client with request and response handling.

#### Example Configuration (`sample/snapshot-api-sample/src/config/app-config.json`)
```js
{
  "trade360": {
    "restApiBaseUrl": "https://stm-snapshot.lsports.eu/",
    "inPlayMQSettings": {      
      "packageId": "your-packageid",
      "username": "your-username",
      "password": "your-password"
    },
    "preMatchMQSettings": {
      "packageId": "your-packageid",
      "username": "your-username",
      "password": "your-password"
    }
  }
}
```
Then, initialize the SDK in your application:
```js
// Load configuration from appConfig file
const config = getConfig();
```
Implementing The Snapshot API Client
```js
const snapshotApiFactory = new SnapshotApiFactory();
```
Create API client for each inplay and prematch-
```js
const inPlaySnapshotHttpClient = snapshotApiFactory.createSnapshotApiInPlayHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

const preMatchSnapshotHttpClient = snapshotApiFactory.createSnapshotApiPrematchHttpClient({
      packageCredentials: config.trade360.preMatchMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });
```
then you can use menu to select relvant api and update the request details in the specific method, for example-
```js
const getInPlayFixtures = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetFixtureRequestDto({
    sportIds: [/* List of sport IDs, e.g., 1234, 2345 */ ],
    locationIds: [/* List of fixture IDs, e.g., 12345678, 23456789 */],
    leagueIds: [/* List of league IDs, e.g., 1111, 2222 */],
    fixtureIds[/* List of location IDs, e.g., 3333, 4444 */]
  });

  const response = await inplaySnapshotHttpClient.getFixtures(request);

  logger.log(`${response?.length} Fixtures retrieved.`);
};
```
you can see the response object including all details for your request.


### Using Customers API <a name = "usage_customers_api"></a>

The Customers API SDK is made up of three parts: Package Distribution, Metadata, and Subscription. It provides a simplified HTTP client with request and response handling for various operations.

- **Package Distribution**: Start, stop, and get distribution status.
- **Metadata**: Exposes endpoints to get leagues, sports, locations, markets, and translations.
- **Subscription**: Allows subscribing and unsubscribing to a fixture or by league. It also includes manual suspension actions and quota retrieval.

#### Example Configuration (`sample/customer-api-sample/src/config/app-config.json`)
```js
{
  "trade360": {
    "restApiBaseUrl": "https://stm-api.lsports.eu/",
    "inPlayMQSettings": {    
      "packageId": "your-packageid",
      "username": "your-username",
      "password": "your-password"
    },
    "preMatchMQSettings": {
      "packageId": "your-packageid",
      "username": "your-username",
      "password": "your-password"
    }
  }
}
```
Then, initialize the SDK in your application:
```js
// Load configuration from appConfig file
const config = getConfig();
```
Implementing The Snapshot API Client
```js
const customersApiFactory = new CustomersApiFactory();
```
Create API client for each subscription, metadata and package distriubtion apis-
```js
const subscriptionInplayHttpClient = customersApiFactory.createSubscriptionHttpClient({
    packageCredentials: config.trade360.inPlayMQSettings,
    restApiBaseUrl: config.trade360.restApiBaseUrl,
    logger,
  });

const subscriptionPremtachHttpClient = customersApiFactory.createSubscriptionHttpClient({
      packageCredentials: config.trade360.preMatchMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

const metadataInplayHttpClient = customersApiFactory.createMetadataHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

const metadataPrematchHttpClient = customersApiFactory.createMetadataHttpClient({
      packageCredentials: config.trade360.preMatchMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

const packageDistributionHttpClient = customersApiFactory.createPackageDistributionHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });
```
then you can use menu to select relvant api and update the request details in the specific method, for example-
```js
const getMarkets = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  const request = new GetMarketsRequestDto({
    marketIds: [/* List of market IDs, e.g., 1234, 2345 */ ],
    sportIds: [/* List of sport IDs, e.g., 1234, 2345 */ ]
  });

  const response = await metadataHttpClient.getMarkets(request);

  logger.log('Markets entities received:');

  _.each(response, (market) => {
    logger.log(`MarketId: ${market.id}, MarketName: ${market.name}`);
  });
};
```
you can see the response object including all details for your request.

## Error Handling<a name = "errorhandling"></a>

The SDK provides structured error responses. Handle errors as follows:
1. feed
```js
 if (err instanceof ValidationError) {
    logger.error(`feed sample got err from ValidationError instance: ${err}`);
    if (!_.isNil(err.context) && typeof err.context == 'object') {
       _.each(err.context, (value, key) => {
        logger.error(`Error [${key}]: ${JSON.stringify(value)}`);
      });
    }
  }
  if (err instanceof ConversionError) {
    logger.error(`feed sample got err from ConversionError instance: ${err}`);
  }
  if (err instanceof ConsumptionMessageError) {
    logger.error(`feed sample got err from ConsumptionMessageError instance: ${err}`);
  }
  if (err instanceof RetryError) {
    logger.error(`feed sample got err from RetryError instance: ${err}`);
  }
}
```

2. customer & snapshot api
```js
if (err instanceof ValidationError) {
  logger.error(`API sample got err from ValidationError instance: ${err}`);
  if (!_.isNil(err.context) && typeof err.context == 'object') {
    _.each(err.context, (value, key) => {
      logger.error(`Error [${key}]: ${JSON.stringify(value)}`);
    });
  }
} else if (err instanceof TranslationsValidationError) {
  logger.error(`API sample got err from TranslationsValidationError instance: ${err}`);
} else if (err instanceof HttpResponseError) {
  logger.error(`API sample got err from HttpResponseError instance: ${err}`);
  let errors = [];
  if (!_.isNil(err.context) && typeof err.context == 'string') {
    errors = [logger.error(`Error [${err.name}]: ${JSON.stringify(err.context)}`)];
  } else if (_.isArray(err.context)) {
    errors = err.context;
  }
  if (typeof err.context == 'object') {
    _.each(err.context, (value, key) => {
      logger.error(`Error [${key}]: ${JSON.stringify(value)}`);
    });
  }
} else if (err instanceof InvalidDateInRequestError) {
  logger.error(`API sample got err from InvalidDateInRequestError instance: ${err}`);
} else {
  logger.error(`API sample got err: ${err}`);
}
```

## License <a name = "license"></a>

This SDK is licensed under MIT.

