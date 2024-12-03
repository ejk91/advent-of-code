import { readFileSync } from "node:fs";

const input = readFileSync("./day_2_input.txt", "utf8").trimEnd();

let isSafe1 = (level) => {
  let posDir = level[0] < level[1];
  for (let i = 1; i < level.length; i++) {
    const curr = level[i];
    const prev = level[i - 1];
    if (
      posDir
        ? curr <= prev || curr - 3 > prev // diff is greater than three
        : curr >= prev || curr + 3 < prev
    ) {
      return false;
    }
  }
  return true;
};

let isSafe2 = (level, err) => {
  let posDir = level[0] < level[1];
  for (let i = 1; i < level.length; i++) {
    const curr = level[i];
    const prev = level[i - 1];
    if (
      posDir
        ? curr <= prev || curr - 3 > prev // diff is greater than three
        : curr >= prev || curr + 3 < prev
    ) {
      if (err) {
        return false;
      }
      // skip current level, previous level, or keep it the same (no removal)
      return (
        isSafe2(level.toSpliced(i, 1), true) ||
        isSafe2(level.toSpliced(i - 1, 1), true) ||
        isSafe2(level.toSpliced(0, 1), true)
      );
    }
  }
  return true;
};

const solve1 = (input) => {
  let rows = input.split("\n");
  let res = 0;
  for (let row of rows) {
    const level = row.split(" ").map(Number);
    if (isSafe1(level)) {
      res++;
    }
  }

  return res;
};

const solve2 = (input) => {
  let rows = input.split("\n");
  let res = 0;
  for (let row of rows) {
    const level = row.split(" ").map(Number);
    if (isSafe2(level)) {
      res++;
    }
  }

  return res;
};

console.log(solve1(input));
console.log(solve2(input));

const sampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

console.log(solve2(sampleInput));