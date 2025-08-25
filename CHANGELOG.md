
# Changelog

All notable changes to this project will be documented in this file.

## [Version 3.0.0] - Message Structure and Transport Headers Enhancement

### **BREAKING CHANGES**

- **`IMessageStructure` Interface Updated**

  The `IMessageStructure<TEntity>` interface now includes a new required `transportHeaders` property of type `TransportMessageHeaders`.

  **Reason for change:**
  - **Enhanced Message Processing:** Provides access to RabbitMQ message properties and headers for better message handling and debugging.
  - **Transport Layer Visibility:** Exposes transport-level metadata including message GUID, type, sequence, fixture ID, and timestamp information.

  **Action Required:**
  - Update any code that implements or uses `IMessageStructure<TEntity>` to handle the new `transportHeaders` property.
  - Ensure message consumers and handlers are updated to work with the enhanced interface structure.

### **NEW FEATURES**

- **`TransportMessageHeaders` Class**

  Added new `TransportMessageHeaders` class to handle RabbitMQ message properties and headers.

  **Features:**
  - Static factory method `createFromProperties()` to create instances from RabbitMQ message properties
  - Automatic handling of byte array to string conversion for header values
  - Validation for required headers with descriptive error messages
  - Support for optional headers (MessageSequence, FixtureId)
  - Properties: `messageType`, `messageSequence`, `messageGuid`, `fixtureId`, `timestampInMs`

  **Usage:**
  ```typescript
  const headers = TransportMessageHeaders.createFromProperties(rabbitMqProperties);
  ```

## [Version 2.0.1] - 2025-08-24 - Introduced Breaking Changes

- **`BaseBet.id` Type Change: `number`/`bigInt` to `string`**

  To improve compatibility with JSON serialization and prevent precision loss with large numbers, the `id` field in the `BaseBet` entity has been changed from a `number` to a `string`.

  **Reason for change:**
  - **JSON Compatibility:** Ensures that large numeric IDs are not misinterpreted or lose precision when serialized to JSON.
  - **Frontend Interoperability:** Simplifies the handling of IDs in web applications and other systems that use JSON.

  **Action Required:**
  - If your application directly accesses the `id` field of the `BaseBet` entity (Or any of its inheritors), you must update your code to handle it as a `string`. This may include changes to type definitions, data processing logic, and any code that performs mathematical operations on the ID.
# Changelog

All notable changes to this project will be documented in this file.
