import { readFileSync } from "fs";

const input = readFileSync("src/5/input.txt").toString();

type Mapping = {
  destStart: number;
  sourceStart: number;
  length: number;
};

const parsedSeedLine = input
  .split("\n")[0]
  .match(/\d+/g)!
  .map((n) => parseInt(n, 10));

const parsed = input
  .slice(2, -1)
  .split("\n\n")
  .map((block) => block.split("\n").slice(1))
  .map((mappings) =>
    mappings.map((m) => {
      const matches = m.match(/\d+/g);
      return {
        destStart: parseInt(matches![0]!, 10),
        sourceStart: parseInt(matches![1], 10),
        length: parseInt(matches![2], 10),
      } as Mapping;
    })
  );

let lowestLocation = Infinity;
for (let i = 0; i < parsedSeedLine.length; i += 2) {
  for (let j = 0; j < parsedSeedLine[i + 1]; j++) {
    let currNum = parsedSeedLine[i] + j;
    for (let mappingSet of parsed) {
      for (let mapping of mappingSet) {
        if (
          currNum >= mapping.sourceStart &&
          currNum < mapping.sourceStart + mapping.length
        ) {
          currNum = mapping.destStart + (currNum - mapping.sourceStart);
          break;
        }
      }
    }
    if (currNum < lowestLocation) {
      lowestLocation = currNum;
    }
  }
}

console.log(lowestLocation);
