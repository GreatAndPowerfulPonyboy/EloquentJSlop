function prepend(element, list) {
  return { value: element, rest: list };
}

function nth(list, idx) {
  if (idx === 0) {
    return list.value;
  } else if (list.rest !== null) {
    return nth(list.rest, idx - 1);
  } else {
    return undefined;
  }
}

function arrayToList(array) {
  const lastElt = array[array.length - 1];
  const firstElt = array[0];
  let prev = { value: lastElt, rest: null };
  for (let i = array.length - 2; i > 0; i--) {
    prev = prepend(array[i], prev);
  }
  return prepend(firstElt, prev);
}

function listToArray(list) {
  let out = [];
  let count = 0;
  while (true) {
    if (nth(list, count) !== undefined) {
      out.push(nth(list, count));
      count += 1;
    } else {
      return out;
    }
  }
}

function deepEqual(obj1, obj2) {
  if (typeof obj1 !== "object" && typeof obj2 !== "object") {
    return obj1 === obj2;
  } else {
    const obj1keys = Object.keys(obj1);
    const obj2keys = Object.keys(obj2);
    if (obj1keys.length !== obj2keys.length) return false;
    for (const propertyName of obj1keys) {
      if (!obj2keys.includes(propertyName)) return false;
      if (!deepEqual(obj1[propertyName], obj2[propertyName])) return false;
    }
  }
  return true;
}
console.log(arrayToList([1, 2, 3]));
console.log(listToArray(arrayToList([1, 2, 3])));
