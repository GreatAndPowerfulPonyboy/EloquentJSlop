let evenChar;
let oddChar;
let size = 16;
for (let count = 0; count < size; count++) {
  if (count % 2 === 0) {
    evenChar = " ";
    oddChar = "#";
  } else {
    evenChar = "#";
    oddChar = " ";
  }
  let out = "";
  for (let inner = 0; inner < size; inner++) {
    if (inner % 2 === 0) {
      out += evenChar;
    } else {
      out += oddChar;
    }
  }
  console.log(out);
}
