import { readFileSync } from "node:fs";

const input = readFileSync("./day_6_input.txt", "utf8").trimEnd();

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const moveGuard = (grid, start, part) => {
  let [y, x] = start;
  let dirsIdx = 0;

  let count = 0;

  const seen = new Set();

  while (grid[y]?.[x] !== "#") {
    // cycle
    let key = `${y}, ${x}`;
    if (seen.has(key) && part == 2) {
      return 1;
    }

    // went out of bounds
    if (grid[y]?.[x] === undefined) {
      grid.forEach((row) =>
        row.forEach((col) => {
          if (col == "X") {
            count++;
          }
        })
      );
      // console.log(Array.from(seen).length);
      return part == 1 ? count : 0;
    }

    grid[y][x] = "X";
    seen.add(key);

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
  // for part 2
  if (part == 2) {
    return 0;
  }
};

const solve = (input) => {
  let start;
  const grid1 = input.split("\n").map((row, r) => {
    return row.split("").map((char, c) => {
      if (char === "^") {
        start = [r, c];
      }

      return char === "#" ? "#" : ".";
    });
  });

  const grid2 = input.split("\n").map((row, r) => {
    return row.split("").map((char, c) => {
      if (char === "^") {
        start = [r, c];
      }

      return char === "#" ? "#" : ".";
    });
  });

  console.log(moveGuard(grid1, start, 1));

  let count = 0;
  for (let r = 0; r < grid2.length; r++) {
    for (let c = 0; c < grid2[0].length; c++) {
      grid2[r][c] = "#";
      count += moveGuard(grid2, start, 2);
      grid2[r][c] = ".";
    }
  }
  console.log(count);
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

solve(input);

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
