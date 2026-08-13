function every(testFn, array) {
  for (const element of array) {
    if (!testFn(element)) {
      return false;
    }
  }
  return true;
}

function everyFunctional(array, testFn) {
  return !array.some((element) => !testFn(element));
}
