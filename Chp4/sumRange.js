function range(start, end, range = 1) {
  let out = [];
  if (range <= -1) {
    for (let i = start; i >= end; i += range) {
      out.push(i);
    }
  } else {
    for (let i = start; i <= end; i += range) {
      out.push(i);
    }
  }
  return out;
}
console.log(range(0, 15));
console.log(range(-1, 15));
console.log(range(5, 2, -1));

function sum(array) {
  out = 0;
  for (const num of array) {
    out += num;
  }
  return out;
}

//console.log(sum([1, 2, 3]));
//console.log(sum([-8, 12, 15]));
console.log(sum(range(1, 10)));
