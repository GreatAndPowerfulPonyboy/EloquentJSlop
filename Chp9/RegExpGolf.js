const cat_car = /ca(r|t)/;
const pop_propr = /pr?op/;
console.log(cat_car.test("cat"));
console.log(cat_car.test("car"));
console.log(cat_car.test("bob"));
console.log(pop_propr.test("pop"));
console.log(pop_propr.test("propr"));

function verify(regexp, yes, no) {
  if (regexp.source === "...") return;
  for (let str of yes)
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  for (let str of no)
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
}

verify(cat_car, ["my car", "bad cats"], ["camper", "high art"]);
verify(pop_propr, ["pop culture", "mad props"], ["plop", "prrrop"]);

const ferr_words = /fer{2}(et|y|ari)/;

verify(ferr_words, ["ferret", "ferry", "ferrari"], ["ferrum", "transfer A"]);

const iousWords = /\w*ious(?!\w)/;

verify(
  iousWords,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"],
);

const punctuation = /\s[.,;:]/;
verify(punctuation, ["bad punctuation ."], ["escape the period"]);

const longWord = /\w{7,}/;

verify(
  longWord,
  ["Siebentausenddreihundertzweiundzwanzig"],
  ["no", "three small words"],
);

const withouteE = /\p{L}(?![eE])(?=[eE])/u;

verify(
  withouteE,
  [("red platypus", "wobbling nest")],
  ["earth bed", "bedrøvet abe", "BEET"],
);
