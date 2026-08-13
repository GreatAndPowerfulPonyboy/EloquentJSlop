function loop(loopVal, testFn, updateFn, bodyFn) {
  for (let i = loopVal; testFn(i); i = updateFn(i)) {
    bodyFn(i);
  }
}
loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log,
);
