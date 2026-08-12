function isEven(a) {
  if (a < 0) {
    // Make negative integers positive to fix algo
    a *= -1;
  }
  if (a === 0) {
    return true;
  } else if (a === 1) {
    return false;
  } else {
    return isEven(a - 2);
  }
}
console.log(isEven(-20));
console.log(isEven(15));
console.log(isEven(24));
