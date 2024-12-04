import { readFileSync } from "node:fs";

const input = readFileSync("./day_4_input.txt", "utf8").trimEnd();

const isValidMas = (str) => {
  return str == "MAS" || str == "SAM";
};

const solve = (input) => {
  let grid = input.split("\n");
  let target = "XMAS";
  let dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [-1, 1],
    [-1, -1],
    [1, 1],
    [1, -1],
  ];
  let count1 = 0;
  let count2 = 0;

  let dfs = (r, c, dr, dc, i) => {
    if (
      r < 0 ||
      r >= grid.length ||
      c < 0 ||
      c >= grid[0].length ||
      grid[r][c] != target[i]
    ) {
      return;
    }

    if (i == 3 && grid[r][c] == "S") {
      count1++;
      return;
    }

    dfs(r + dr, c + dc, dr, dc, i + 1);
  };

  // iterate through each coordindate to find x
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      let char = grid[r][c];

      if (char == "X") {
        for (let [dr, dc] of dirs) {
          dfs(r, c, dr, dc, 0);
        }
      }

      if (char == "A") {
        // [-1, -1] + current + [1, 1]
        // [1, -1] + current + [1 , -1]
        let cross1 = grid[r - 1]?.[c - 1] + char + grid[r + 1]?.[c + 1];
        let cross2 = grid[r - 1]?.[c + 1] + char + grid[r + 1]?.[c - 1];
        if (isValidMas(cross1) && isValidMas(cross2)) {
          count2++;
        }
      }
    }
  }

  return [count1, count2];
};

const sampleInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
console.log(solve(sampleInput)); // P1: 18 P2:9

console.log(solve(input));
