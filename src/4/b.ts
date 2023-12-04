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

let totals: number[] = new Array(parsed.length).fill(1);
let counted: number[] = new Array(parsed.length).fill(1);

while (true) {
  const i = counted.findIndex((n) => n >= 1);
  if (i === -1) break;

  const card = parsed[i];

  let cardScore = 0;
  for (let winningNum of card.winningNums) {
    if (card.hasNums.indexOf(winningNum) !== -1) {
      cardScore++;
    }
  }

  if (cardScore > 0) {
    for (let j = 1; j <= cardScore && i + j < parsed.length; j++) {
      totals[i + j] += 1;
      counted[i + j] += 1;
    }
  }

  counted[i] -= 1;
}

console.log(totals.reduce((a, b) => a + b));
