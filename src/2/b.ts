import { readFileSync } from "fs";

const input = readFileSync("src/2/input.txt").toString();

const parsed = input
  .split("\n")
  .slice(0, -1)
  .map((line) =>
    line
      .split(/[:;]/)
      .splice(1)
      .map((game) => game.split(","))
  );
console.log(parsed);

const answer = parsed
  .map((game) => {
    let max: { [k: string]: number } = {};
    for (let round of game) {
      for (let infoString of round) {
        const count = parseInt(infoString.match(/\d+/)?.[0] ?? "0");
        const colorString = infoString.match(/[a-z]+/)?.[0]!;

        if (
          typeof max[colorString] === "undefined" ||
          max[colorString] < count
        ) {
          max[colorString] = count;
        }
      }
    }

    return Object.values(max).reduce((a, b) => a * b);
  })
  .reduce((a, b) => a + b);

console.log(answer);
