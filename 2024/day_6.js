import { readFileSync } from "node:fs";

const input = readFileSync("./day_6_input.txt", "utf8").trimEnd();

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const moveGuard = (grid, start) => {
  let [y, x] = start;
  let dirsIdx = 0;

  let count = 0;

  while (grid[y]?.[x] !== "#") {
    // went out of bounds
    if (grid[y]?.[x] === undefined) {
      grid.forEach((row) =>
        row.forEach((col) => {
          if (col == "X") {
            count++;
          }
        })
      );
      return count;
    }

    grid[y][x] = "X";

    let nextY = y + dirs[dirsIdx][0];
    let nextX = x + dirs[dirsIdx][1];

    if (grid[nextY]?.[nextX] == "#") {
      // rotate
      dirsIdx = (dirsIdx + 1) % 4;
      y = y + dirs[dirsIdx][0];
      x = x + dirs[dirsIdx][1];
    } else {
      y = nextY;
      x = nextX;
    }
  }

  return count;
};

const solve = (input) => {
  let start;
  const grid = input.split("\n").map((row, r) => {
    return row.split("").map((char, c) => {
      if (char === "^") {
        start = [r, c];
      }

      return char === "#" ? "#" : ".";
    });
  });

  console.log(moveGuard(grid, start));

  console.log(grid);
};

const sampleInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

solve(sampleInput);

/* grid output from sample input
[
  "....#.....",
  "....XXXXX#",
  "....X...X.",
  "..#.X...X.",
  "..XXXXX#X.",
  "..X.X.X.X.",
  ".#XXXXXXX.",
  ".XXXXXXX#.",
  "#XXXXXXX..",
  "......#X..",
];
*/
