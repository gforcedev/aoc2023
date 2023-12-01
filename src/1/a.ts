import { readFileSync } from "fs";

const input = readFileSync("src/1/input.txt").toString();

const answer = input
  .split("\n")
  .slice(0, -1)
  .map((line) => line.match(/\d/g))
  ?.map((arr) =>
    typeof arr !== null
      ? parseInt([arr?.[0], arr?.[arr?.length - 1]].join(""))
      : 0
  )
  .reduce((a, b) => a + b);

console.log(answer);
