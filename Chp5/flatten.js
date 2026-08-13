function flatten(array) {
  const initialVal = [];
  const flattenedArray = array.reduce(
    (current, nextSubArray) => current.concat(nextSubArray),
    initialVal,
  );
  return flattenedArray;
}

console.log(
  flatten([
    [1, 2, 3],
    [4, 5, 6],
  ]),
);
