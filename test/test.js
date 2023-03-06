const assert = require('assert');
const promiseAllWithThreshold = require('../task')

describe('Promise All With Threshold', () => {
  it('should resolve with an array of results if less than or equal to threshold promises are rejected', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject('error 1'),
      Promise.resolve(2),
      Promise.reject('error 2'),
      Promise.resolve(3),
    ];
    const threshold = 2;

    const results = await promiseAllWithThreshold(promises, threshold);

    assert.deepStrictEqual(results, [1, undefined, 2, undefined, 3]);
  });

  it('should reject with an error if more than threshold promises are rejected', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject('error 1'),
      Promise.resolve(2),
      Promise.reject('error 2'),
      Promise.reject('error 3'),
    ];
    const threshold = 2;

    try {
      await promiseAllWithThreshold(promises, threshold);
      assert.fail('Expected function to reject, but it resolved');
    } catch (error) {
      assert.strictEqual(error.message, 'Too many promises rejected: 3');
    }
  });

  it('should resolve with an empty array if no promises are provided', async () => {
    const promises = [];
    const threshold = 0;

    const results = await promiseAllWithThreshold(promises, threshold);

    assert.deepStrictEqual(results, []);
  });

  it('should resolve with an empty array if all promises are resolved', async () => {
    const promises = [Promise.resolve(1), Promise.resolve(2)];
    const threshold = 1;

    const results = await promiseAllWithThreshold(promises, threshold);

    assert.deepStrictEqual(results, [1, 2]);
  });

  it('should reject with an error if threshold is negative', async () => {
    const promises = [Promise.resolve(1)];
    const threshold = -1;

    try {
      await promiseAllWithThreshold(promises, threshold);
      assert.fail('Expected function to reject, but it resolved');
    } catch (error) {
      assert.strictEqual(error.message, 'Threshold cannot be negative!');
    }
  });
});