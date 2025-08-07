# Changelog

All notable changes to this project will be documented in this file.

### [Version 2.0.0] - Introduced Breaking Changes

- **`BaseBet.id` Type Change: `number` to `string`**

  To improve compatibility with JSON serialization and prevent precision loss with large numbers, the `id` field in the `BaseBet` entity has been changed from a `number` to a `string`.

  **Reason for change:**
  - **JSON Compatibility:** Ensures that large numeric IDs are not misinterpreted or lose precision when serialized to JSON.
  - **Frontend Interoperability:** Simplifies the handling of IDs in web applications and other systems that use JSON.

  **Action Required:**
  - If your application directly accesses the `id` field of the `BaseBet` entity (Or any of its inheritors), you must update your code to handle it as a `string`. This may include changes to type definitions, data processing logic, and any code that performs mathematical operations on the ID.
