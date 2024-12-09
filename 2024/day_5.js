import { readFileSync } from "node:fs";

const input = readFileSync("./day_5_input.txt", "utf8").trimEnd();

const solve = (input) => {
  const data = input.split("\n\n");
  const rules = data[0].split("\n");
  const updates = data[1].split("\n");

  const map = {};

  // build order map
  for (let rule of rules) {
    const [left, right] = rule.split("|");

    if (map[Number(left)] == undefined) {
      map[Number(left)] = {};
    }

    map[Number(left)][Number(right)] = true;
  }

  let sum1 = 0;
  let sum2 = 0;

  for (let update of updates) {
    let pages = update.split(",").map(Number);
    let sortedPages = pages.toSorted((a, b) => (map[a]?.[b] ? -1 : 0));

    if (pages.every((e, i) => pages[i] === sortedPages[i])) {
      sum1 += pages[(pages.length - 1) / 2];
    } else {
      sum2 += sortedPages[(sortedPages.length - 1) / 2];
    }
  }

  return [sum1, sum2];
};

const sampleInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

// console.log(solve(sampleInput)); // 143
console.log(solve(input));
