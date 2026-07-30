out = "#";
for (let count = 0; count < 7; count += 1) {
  console.log(out);
  out += "#";
}
// Better way of doing this exercise
for (let line = "#"; line.length < 8; line += "#") {
  console.log(line);
}
