import { readFileSync } from "fs";

const input = readFileSync("src/4/input.txt").toString();

const parsed = input
  .split("\n")
  .slice(0, -1)
  .map((s) => s.split("|"))
  .map((arr) => ({
    winningNums: arr[0]
      .match(/\d+/g)!
      .slice(1)
      .map((s) => parseInt(s, 10)),
    hasNums: arr[1].match(/\d+/g)!.map((s) => parseInt(s, 10)),
  }));

let total = 0;
for (const card of parsed) {
  let cardScore = 0;
  for (let winningNum of card.winningNums) {
    if (card.hasNums.indexOf(winningNum) !== -1) {
      if (cardScore === 0) {
        cardScore = 1;
        continue;
      }
      cardScore *= 2;
    }
  }

  total += cardScore;
}

console.log(total);
