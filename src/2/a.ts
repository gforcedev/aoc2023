import { readFileSync } from "fs";

const input = readFileSync("src/2/input.txt").toString();

const max = {
  red: 12,
  green: 13,
  blue: 14,
} as { [k: string]: number };

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

function checkGamePossible(game: string[][]) {
  for (let round of game) {
    for (let infoString of round) {
      const count = parseInt(infoString.match(/\d+/)?.[0] ?? "0");
      const colorString = infoString.match(/[a-z]+/)?.[0]!;
      console.log(
        "infoString:",
        infoString,
        ", count:",
        count,
        ", max",
        max[colorString]
      );
      if (count > max[colorString]) {
        console.log("returning 0");
        return 0;
      }
    }
  }
  return 1;
}

let idSum = 0;
parsed.forEach((game, i) => {
  idSum += checkGamePossible(game) * (i + 1);
});

console.log(idSum);
