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
  const matches = curr.match(/\w+/g)!;
  totalMap.set(matches[0], { L: matches[1], R: matches[2] });
  return totalMap;
}, new Map<string, Node>());

const route = input[0].split("") as Array<"L" | "R">;

let currNodes = [...parsed.keys()].filter(
  (s) => s.charAt(s.length - 1) === "A"
);

let totals: number[] = [];

for (let i = 0; i < currNodes.length; i++) {
  let totalSteps = 0;
  while (currNodes[i].charAt(currNodes[i].length - 1) !== "Z") {
    currNodes[i] = parsed.get(currNodes[i])![route[totalSteps % route.length]];
    totalSteps++;
  }

  totals.push(totalSteps);
}

// And then chuck these into an LCM calculator
console.log(totals);
