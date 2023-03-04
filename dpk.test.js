const { deterministicPartitionKey, getPartitionKey, getSanitizedKey } = require("./dpk");

describe('deterministicPartitionKey', () => {
  test("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  test('should use the partition key from the event if it exists', () => {
    const event = { partitionKey: 'abc' };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toEqual('abc');
  });

  test('should generate partition key for the event if partition key is not present', () => {
    const event = { data: 'sample data' };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toEqual(expect.any(String));
  });

  test('should generate same partition key for the same event', () => {
    const event = { data: 'sample data' };
    const partitionKey1 = deterministicPartitionKey(event);
    const partitionKey2 = deterministicPartitionKey(event);
    expect(partitionKey1).toEqual(partitionKey2);
  });

  test('should generate different partition key for different events', () => {
    const event1 = { data: 'sample data 1' };
    const event2 = { data: 'sample data 2' };
    const partitionKey1 = deterministicPartitionKey(event1);
    const partitionKey2 = deterministicPartitionKey(event2);
    expect(partitionKey1).not.toEqual(partitionKey2);
  });

  test('should generate partition key of string type', () => {
    const event = { data: 'sample data' };
    const partitionKey = deterministicPartitionKey(event);
    expect(typeof partitionKey).toEqual('string');
  });

  test('should handle empty object event', () => {
    const event = {};
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toEqual(expect.any(String));
  });

  test('should handle empty string partition key', () => {
    const event = { partitionKey: '' };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toEqual(expect.any(String));
  });

  test('should handle non-string partition key', () => {
    const event = { partitionKey: { foo: 'bar' } };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toEqual(expect.any(String));
  });

  test('should handle very long partition key', () => {
    const event = { data: 'a'.repeat(500) };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toEqual(expect.any(String));
  });
});

describe("getPartitionKey", () => {
  it("should return null if the input key is null", () => {
    const key = null;
    const expectedHash = null;
    const actualHash = getPartitionKey(key);
    expect(actualHash).toEqual(expectedHash);
  });
});

describe('getSanitizedKey', () => {
  test('returns null for empty input', () => {
    expect(getSanitizedKey()).toBeNull();
  });

  test('returns the same string for string inputs within max length', () => {
    const input = 'hello world';
    expect(getSanitizedKey(input)).toBe(input);
  });

  test('returns the same JSON string for valid JSON inputs within max length', () => {
    const input = { a: 1, b: 2 };
    expect(getSanitizedKey(input)).toBe(JSON.stringify(input));
  });
});

