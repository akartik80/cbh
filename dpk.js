const crypto = require("crypto");

// Helper function to generate a hash key based on "hex" encoding and "sha3-512" algorithm
exports.getPartitionKey = key => {
  const HASH_ENCODING = "hex";
  const HASH_ALGORITHM = "sha3-512";

  if (!key) {
    return null;
  }

  return crypto.createHash(HASH_ALGORITHM).update(key).digest(HASH_ENCODING);
}

// Helper function to sanitize a key with max key length as 256
exports.getSanitizedKey = key => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!key) {
    return null;
  }

  const sanitizedKey = (typeof key === "string") ? key : JSON.stringify(key);
  return (sanitizedKey.length > MAX_PARTITION_KEY_LENGTH) ? this.getPartitionKey(sanitizedKey) : sanitizedKey;
};

// Main function to generate a deterministic partition key
exports.deterministicPartitionKey = (event) => {
  const DEFAULT_PARTITION_KEY = "0";

  // If event is not defined or null, return the default partition key
  if (!event) {
    return DEFAULT_PARTITION_KEY;
  }

  // If the event already has a partition key, use that key
  const candidateKey = event.partitionKey || this.getPartitionKey(JSON.stringify(event));
  return this.getSanitizedKey(candidateKey) || DEFAULT_PARTITION_KEY;
};


/*
Following are the reasons why my implementation is more readable than original implementation:
1. The use of constant variables makes the code more flexible and easier to customize.
2. The functions are simplified and made more concise using ES6 arrow functions
3. The code is organized into smaller, more focused functions that have a single responsibility, making it easier to understand and maintain.
4. The function names are more descriptive and provide better context for what they do.
5. The variable naming is more consistent and easier to understand.
6. The deterministicPartitionKey function is using the guard clause for event null check removing the cognitive overload of what happens when event is null in the code following that statement.
*/


/*
Original implementation:

exports.deterministicPartitionKey2 = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
*/
