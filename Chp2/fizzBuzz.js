for (let num = 1; num < 101; num += 1) {
  if (num % 3 === 0 && num % 5 === 0) {
    console.log("FizzBuzz");
  } else if (num % 3 === 0) {
    console.log("Fizz");
  } else if (num % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(num);
  }
}

// Nicer way: Utilizes type coercion of booleans

for (let n = 1; n <= 100; n++) {
  let out = "";
  if (n % 3 == 0) out += "Fizz";
  if (n % 5 === 0) out += "Buzz";
  console.log(out || n);
}
