import { readFileSync } from "node:fs";

const input = readFileSync("./day_1_input.txt", "utf8").trimEnd();

let solve1 = (input) => {
  let rows = input.split("\n");
  let left = [];
  let right = [];

  for (let row of rows) {
    let [a, b] = row.split(/\s+/);
    left.push(Number(a));
    right.push(Number(b));
  }
  // sort the numbers
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  // calc sums
  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
};

console.log(solve1(input));

let solve2 = (input) => {
  let rows = input.split("\n");
  let left = [];
  let right = [];

  for (let row of rows) {
    let [a, b] = row.split(/\s+/);
    left.push(Number(a));
    if (right[Number(b)] === undefined) {
      right[Number(b)] = 0;
    }
    right[Number(b)]++;
  }

  // calc similarity score
  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += left[i] * (right[left[i]] || 0);
  }

  return sum;
};

console.log(solve2(input));
