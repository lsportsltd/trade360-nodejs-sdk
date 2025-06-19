# Data Validation and Error Handling

## ID Precision and Validation

This SDK uses BigInt for ID fields to prevent JavaScript precision loss with large numbers (>2^53-1). The validation system ensures data integrity by throwing specific errors for invalid data rather than silently accepting corrupted values.

## Overview

JavaScript's `Number` type can only safely represent integers up to `Number.MAX_SAFE_INTEGER` (2^53-1 = 9,007,199,254,740,991). Beyond this limit, precision is lost, which can cause serious issues with large ID values commonly used in sports betting systems.

### The Problem

```javascript
// JavaScript precision loss demonstration
const largeId = 11060329315062111;
console.log(largeId);           // 11060329315062112 (WRONG!)
console.log(largeId.toString()); // "11060329315062112" (precision lost)
```

### The Solution

We use `BigInt` for ID fields and implement strict validation:

```typescript
import { BaseBet, IdTransformationError } from 'trade360-nodejs-sdk';

// Successful transformation
const validData = { Id: "11060329315062111" };
const bet = plainToInstance(BaseBet, validData);
console.log(bet.id); // 11060329315062111n (correct!)

// Error handling for invalid data
try {
  const invalidData = { Id: 123.45 };
  const bet = plainToInstance(BaseBet, invalidData);
} catch (error) {
  if (error instanceof IdTransformationError) {
    console.error('Invalid ID:', {
      field: error.fieldName,        // "Id"
      originalValue: error.originalValue, // 123.45
      message: error.message         // Detailed error message
    });
  }
}
```

## Error Handling for Required Fields

Required ID fields (like `BaseBet.id`) use strict validation that throws `IdTransformationError` for invalid data. This prevents the creation of entities with corrupted IDs.

### IdTransformationError Properties

```typescript
class IdTransformationError extends BaseError {
  fieldName: string;        // Name of the field that failed
  originalValue: unknown;   // The original invalid value
  message: string;          // Detailed error description
}
```

### Error Handling Pattern

```typescript
import { plainToInstance } from 'class-transformer';
import { BaseBet, IdTransformationError } from 'trade360-nodejs-sdk';

function parseBaseBet(apiData: unknown): BaseBet | null {
  try {
    return plainToInstance(BaseBet, apiData, { excludeExtraneousValues: true });
  } catch (error) {
    if (error instanceof IdTransformationError) {
      // Log structured error information
      logger.error('Failed to parse BaseBet due to invalid ID', {
        fieldName: error.fieldName,
        originalValue: error.originalValue,
        errorMessage: error.message,
        apiData
      });
      
      // Handle the error appropriately for your use case
      return null; // or throw, or return default value, etc.
    }
    
    // Re-throw other errors
    throw error;
  }
}
```

## Supported ID Formats

The transformation function accepts the following valid formats:

### Valid Formats

| Input Type | Example | Result | Notes |
|------------|---------|--------|-------|
| Small Number | `123` | `123n` | Safe integers |
| Large Number String | `"11060329315062111"` | `11060329315062111n` | Preferred for large IDs |
| BigInt | `123n` | `123n` | From lossless-json parsing |
| Negative String | `"-123"` | `-123n` | Negative IDs supported |
| Whitespace String | `"  123  "` | `123n` | Trimmed automatically |

### Invalid Formats (Will Throw Error)

| Input Type | Example | Error Reason |
|------------|---------|--------------|
| Decimal Number | `123.45` | Not an integer |
| Non-numeric String | `"abc"`, `"123abc"` | Contains non-digit characters |
| Empty String | `""`, `"   "` | No value provided |
| Special Numbers | `NaN`, `Infinity` | Not finite integers |
| Wrong Types | `true`, `{}`, `[]` | Unexpected data types |
| Scientific Notation | `"1e10"` | Not in standard integer format |
| Null/Undefined | `null`, `undefined` | Required field missing |

## Integration with Logging

The transformation function supports structured logging for better debugging:

```typescript
import { transformToBigInt } from 'trade360-nodejs-sdk';
import { logger } from './your-logger';

// Using with logger for detailed error reporting
const result = transformToBigInt(
  value,           // The value to transform
  true,            // Required field
  'BetId',         // Field name for context
  logger           // Your logger instance
);
```

### Log Structure

When errors occur, structured log entries are created:

```typescript
// Error log example
{
  message: "ID transformation failed for required field",
  fieldName: "Id",
  originalValue: 123.45,
  valueType: "number",
  error: "decimal-number",
  level: "error"
}

// Warning log example (for optional fields)
{
  message: "ID transformation failed for optional field",
  fieldName: "OptionalId",
  originalValue: "abc",
  valueType: "string", 
  error: "non-numeric-string",
  level: "warn"
}
```

## Best Practices

### 1. Use Lossless JSON Parsing

For API responses containing large IDs, use lossless JSON parsing:

```typescript
import { parse } from 'lossless-json';

// Custom parser that preserves large integers as BigInt
function customNumberParser(value: string): number | bigint {
  if (isInteger(value) && value.length > 15) {
    return BigInt(value);
  }
  return parseFloat(value);
}

const apiResponse = '{"Id":11060329315062111,"Name":"Large ID Bet"}';
const data = parse(apiResponse, undefined, customNumberParser);
// data.Id is now BigInt, not a number with lost precision
```

### 2. Handle Errors Appropriately

```typescript
// ✅ Good: Specific error handling
try {
  const bet = plainToInstance(BaseBet, apiData);
  return bet;
} catch (error) {
  if (error instanceof IdTransformationError) {
    // Handle ID validation errors specifically
    this.handleInvalidIdError(error, apiData);
    return null;
  }
  // Handle other errors
  throw error;
}

// ❌ Bad: Generic error handling loses valuable information
try {
  const bet = plainToInstance(BaseBet, apiData);
  return bet;
} catch (error) {
  console.log('Something went wrong');
  return null;
}
```

### 3. Validate Data Early

Validate ID formats as early as possible in your data pipeline:

```typescript
// Validate before processing
function validateApiResponse(data: unknown): boolean {
  try {
    plainToInstance(BaseBet, data, { excludeExtraneousValues: true });
    return true;
  } catch (error) {
    if (error instanceof IdTransformationError) {
      logger.warn('Invalid API response received', {
        error: error.message,
        field: error.fieldName,
        value: error.originalValue
      });
    }
    return false;
  }
}
```

### 4. Testing with Edge Cases

Always test your error handling with various invalid inputs:

```typescript
describe('API Error Handling', () => {
  const invalidIds = [
    123.45,           // Decimal
    'not-a-number',   // Non-numeric
    '',               // Empty
    null,             // Null
    undefined,        // Undefined
    NaN,              // NaN
    Infinity,         // Infinity
    true,             // Boolean
    {},               // Object
  ];

  invalidIds.forEach((invalidId) => {
    it(`should handle invalid ID: ${invalidId}`, () => {
      expect(() => {
        plainToInstance(BaseBet, { Id: invalidId });
      }).toThrow(IdTransformationError);
    });
  });
});
```

## Migration Guide

If you're upgrading from a version that returned `undefined` for invalid IDs:

### Before (Unsafe)
```typescript
const bet = plainToInstance(BaseBet, apiData);
if (bet.id === undefined) {
  // Handle missing ID
}
// Could proceed with corrupted data
```

### After (Safe)
```typescript
try {
  const bet = plainToInstance(BaseBet, apiData);
  // Guaranteed to have valid ID
  processValidBet(bet);
} catch (error) {
  if (error instanceof IdTransformationError) {
    // Handle invalid ID explicitly
    handleInvalidId(error);
  }
}
```

## Troubleshooting

### Common Issues

1. **"Cannot find module 'IdTransformationError'"**
   - Ensure you're importing from the correct path: `import { IdTransformationError } from 'trade360-nodejs-sdk'`

2. **Tests failing after upgrade**
   - Update test expectations to handle `IdTransformationError` instead of `undefined` values
   - Add try-catch blocks around `plainToInstance` calls with invalid test data

3. **Large numbers still losing precision**
   - Verify you're using lossless JSON parsing for API responses
   - Check that the data is being passed as strings, not numbers, from the source

4. **Performance concerns with BigInt**
   - BigInt operations are slightly slower than Number operations
   - For high-performance scenarios, consider using string comparisons where possible
   - The precision benefit typically outweighs the small performance cost

### Debug Logging

Enable debug logging to trace ID transformation issues:

```typescript
import { transformToBigInt } from 'trade360-nodejs-sdk';
import { logger } from './logger';

// Enable detailed logging during development
const debugLogger = {
  error: (msg: string, data: any) => {
    console.error(`[ID_TRANSFORM_ERROR] ${msg}`, data);
    logger.error(msg, data);
  },
  warn: (msg: string, data: any) => {
    console.warn(`[ID_TRANSFORM_WARN] ${msg}`, data);
    logger.warn(msg, data);
  }
};

// Use with detailed logging
const id = transformToBigInt(value, true, 'BetId', debugLogger);
``` 