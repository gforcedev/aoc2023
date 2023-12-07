import { readFileSync } from "fs";

const TYPE_BUFFER = 13 ** 6;

const CARD_VALS = "J23456789TQKA".split("");

const TYPE_SCORES = [
  "1,1,1,1,1",
  "1,1,1,2",
  "1,2,2",
  "1,1,2,2",
  "1,1,3",
  "2,3",
  "1,4",
  "5",
];

type ParsedGame = {
  score: number;
  bet: number;
};

const input = readFileSync("src/7/input.txt");

const answer = input
  .toString()
  .split("\n")
  .slice(0, -1)
  .map((s): ParsedGame => {
    const cardCounts = new Map<string, number>();
    const hand = s.split(" ")[0].split("");
    for (let c of hand) {
      cardCounts.set(c, (cardCounts.get(c) ?? 0) + 1);
    }

    let jCount = cardCounts.get("J") ?? 0;
    if (jCount !== 5) {
      cardCounts.delete("J");
      const highestKey = [...cardCounts.entries()]
        .sort((a, b) => a[1] - b[1])
        .pop()![0];
      cardCounts.set(highestKey, cardCounts.get(highestKey)! + jCount);
    }

    const typeString = Array.from(cardCounts.values()).sort().toString();
    let score = TYPE_SCORES.indexOf(typeString) * TYPE_BUFFER;

    hand.forEach((v, i) => {
      score += CARD_VALS.indexOf(v) * 13 ** (4 - i);
    });

    return {
      score,
      bet: parseInt(s.split(" ")[1], 10),
    };
  })
  .sort((a, b) => a.score - b.score)
  .reduce((total, curr, i) => total + curr.bet * (i + 1), 0);

console.log(answer);
