import { readFileSync } from "node:fs";

const input = readFileSync("./day_3_input.txt", "utf8").trimEnd();

const solve = (input, part = 1) => {
  if (part == 2) {
    // /don't\(\)[\W\w]*?do\(\)/g
    let dontPattern = /don't\(\)[^]+?($|do\(\))/g;
    input = input.replace(dontPattern, "");
  }

  let pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let matches = input.matchAll(pattern);

  let tuples = Array.from(matches).map((match) => [match[1], match[2]]);
  // console.log(tuples);
  let sum = 0;

  for (let tuple of tuples) {
    sum += tuple[0] * tuple[1];
  }

  return sum;
};

console.log(solve(input));
console.log(solve(input, 2));
