function reverseArray(array) {
  out = [];
  for (let i = array.length - 1; i > -1; i--) {
    out.push(array[i]);
  }
  return out;
}

function reverseArrayInPlace(array) {
  swapsRemaining = Math.round(array.length / 2);
  for (let i = 0; i < swapsRemaining; i++) {
    let eltToSwap = array[i];
    let reverseIdx = array.length - 1 - i;
    array[i] = array[reverseIdx];
    array[reverseIdx] = eltToSwap;
  }
  return array;
}
console.log(reverseArray([1, 2, 3, 4, 5]));
console.log(reverseArrayInPlace([1, 2, 3, 4, 5]));
