import { readFileSync } from "fs";

const input = readFileSync("src/9/input.txt")
  .toString()
  .split("\n")
  .slice(0, -1);

const parsed = input.map((line) =>
  line.match(/[-\d]+/g)!.map((s) => parseInt(s, 10))
);

function diffs(sequences: number[][]): number[][] {
  const thisSequence = sequences[sequences.length - 1];
  const thisDiffList = [];
  for (let i = 0; i < thisSequence.length - 1; i++) {
    thisDiffList.push(thisSequence[i + 1] - thisSequence[i]);
  }

  if (new Set(thisSequence).size === 1) {
    return sequences;
  }

  return diffs([...sequences, thisDiffList]);
}

function nextFromDiffs(sequences: number[][]) {
  for (let i = sequences.length - 1; i > 0; i--) {
    sequences[i - 1].push(
      sequences[i - 1][sequences[i - 1].length - 1] +
        sequences[i][sequences[i].length - 1]
    );
  }

  return sequences[0].pop()!;
}

const answer = parsed
  .map((sequence) => [sequence])
  .map(diffs)
  .map(nextFromDiffs)
  .reduce((a, b) => a + b);

console.log(answer);
