

// In this example, we have an array of 5 promises, where 2 of them will reject.
//  We call promiseAllWithThreshold with a threshold of 2, which means that the function should reject if more than 2 promises are rejected.
// Since there are only 2 rejected promises, the function should resolve with an array of results.