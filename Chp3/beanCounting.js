function countBs(a) {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "B") {
      count += 1;
    }
  }
  return count;
}

console.log(countBs("B"));
console.log(countBs("AAABBBB"));
console.log(countBs("AAAAAAAAAA"));
