function promiseAllWithThreshold(arrayOfPromises, threshold) {
  let rejectedPromises = 0;

  if (threshold < 0) {
    return Promise.reject(new Error(`Threshold cannot be negative!`));
  }

  return Promise.all(arrayOfPromises.map(promise =>
    promise.catch(() => {
      rejectedPromises++;
      return Promise.resolve();
    })
  )).then(results => {
    if (rejectedPromises > threshold) {
      return Promise.reject(new Error(`Too many promises rejected: ${rejectedPromises}`));
    }
    return results;
  });
}

const promises = [
  Promise.resolve(1),
  Promise.reject("error 1"),
  Promise.resolve(2),
  Promise.reject("error 2"),
  Promise.resolve(3),
];

promiseAllWithThreshold(promises, 2)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error.message);
  });

module.exports = promiseAllWithThreshold