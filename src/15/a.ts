import { readFileSync } from "fs";

const input = readFileSync("src/15/input.txt")
  .toString()
  .split("\n")
  .slice(0, -1)[0]!
  .split(",");

function hash(s: string): number {
  return s.split("").reduce((total, c) => {
    return ((total + c.charCodeAt(0)) * 17) % 256;
  }, 0);
}

const answer = input.map(hash).reduce((a, b) => a + b);

console.log(answer);
