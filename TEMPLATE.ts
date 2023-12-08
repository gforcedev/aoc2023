import { readFileSync } from "fs";

const input = readFileSync("src/TODAY/input.txt")
  .toString()
  .split("\n")
  .slice(0, -1);

const answer = input;

console.log(answer);
