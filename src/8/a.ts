import { readFileSync } from "fs";

const input = readFileSync("src/8/input.txt")
  .toString()
  .split("\n")
  .slice(0, -1);

type Node = {
  L: string;
  R: string;
};

const parsed = input.slice(2).reduce((totalMap, curr) => {
  console.log(curr);
  const matches = curr.match(/\w+/g)!;
  totalMap.set(matches[0], { L: matches[1], R: matches[2] });
  return totalMap;
}, new Map<string, Node>());

const route = input[0].split("") as Array<"L" | "R">;

let currNode = "AAA";
let totalSteps = 0;

while (currNode !== "ZZZ") {
  currNode = parsed.get(currNode)![route[totalSteps % route.length]];
  totalSteps++;
}

console.log(totalSteps);
