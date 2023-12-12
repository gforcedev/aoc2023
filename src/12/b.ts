import { readFileSync } from "fs";

const input = readFileSync("src/12/test.txt")
  .toString()
  .split("\n")
  .slice(0, -1)
  .map((line) => {
    const almost = {
      numString: line.split(" ")[1],
      partString: line.split(" ")[0]!,
    };

    return {
      numString: (almost.numString + ",").repeat(5).slice(0, -1),
      partString: (almost.partString + "?").repeat(5).slice(0, -1),
    };
  });

// Realistically not writing this now with current energy + skill levels

console.log(input);
