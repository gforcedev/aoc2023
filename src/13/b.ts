import { readFileSync } from "fs";

const opposites = { ".": "#", "#": "." } as { [k: string]: string };

const input = readFileSync("src/13/input.txt")
  .toString()
  .split("\n\n")
  .map((cell) => cell.split("\n").map((row) => row.split("")));

let total = 0;
for (const [idx, inputCell] of input.entries()) {
  const untouchedScore = findScore(inputCell);
  const localTotal = total;
  // for (
  // let smudgeIdx = inputCell.length * inputCell[0].length - 1;
  // smudgeIdx >= 0;
  // smudgeIdx--
  // ) {
  for (
    let smudgeIdx = 0;
    smudgeIdx < (inputCell.length - 1) * inputCell[0].length;
    smudgeIdx++
  ) {
    // console.log("SMUDGE", smudgeIdx);
    const smudgeY = Math.floor(smudgeIdx / inputCell[0].length);
    const smudgeX = smudgeIdx % inputCell[0].length;
    // console.log(`smudging (${smudgeX}, ${smudgeY})`);
    const cell = inputCell.map((r) => [...r]);
    cell[smudgeY][smudgeX] = opposites[cell[smudgeY][smudgeX]];

    // console.log();
    // console.log(cell.map((r) => r.join("")).join("\n"));
    // console.log();

    // First try rows
    // console.log("ROWS");

    const score = findScore(cell, untouchedScore);
    // if (score > 0) console.log(`${idx}: ${score}`);
    if (score > 0 && score !== untouchedScore) {
      total += score;
      break;
    }
  }
  // The lines must have had the same score but been different directions (ie probably 10)
  if (total === localTotal) {
    console.log("CHANGING TO", untouchedScore);
    total += untouchedScore;
  }
  console.log(`ACTUALLY ${idx}: ${total - localTotal}`);
}

function findScore(cell: string[][], avoid: number = 0) {
  let wasCorrect = true;

  for (let i = 0; i < cell.length - 1; i++) {
    wasCorrect = true;
    for (let j = 0; i - j >= 0 && i + 1 + j < cell.length; j++) {
      if (cell[i - j].join("") !== cell[i + 1 + j].join("")) {
        // console.log(
        // cell[i - j].join(""),
        // "ne",
        // cell[i + 1 + j].join(""),
        // ", breaking"
        // );
        wasCorrect = false;
        break;
      }
      // console.log(cell[i - j].join(""), "eq", cell[i + 1 + j].join(""));
    }
    if (wasCorrect && avoid !== 100 * (i + 1)) {
      return 100 * (i + 1);
    }
  }

  for (let i = 0; i < cell[0].length - 1; i++) {
    wasCorrect = true;
    for (let j = 0; i - j >= 0 && i + 1 + j < cell[0].length; j++) {
      if (
        cell.map((row) => row[i - j]).join("") !==
        cell.map((row) => row[i + 1 + j]).join("")
      ) {
        // console.log(
        // cell.map((row) => row[i - j]).join(""),
        // "ne",
        // cell.map((row) => row[i + 1 + j]).join(""),
        // "breaking"
        // );

        wasCorrect = false;
        break;
      }
      // console.log(
      // cell.map((row) => row[i - j]).join(""),
      // "eq",
      // cell.map((row) => row[i + 1 + j]).join("")
      // );
    }
    if (wasCorrect && avoid !== i + 1) {
      return i + 1;
    }
  }
  return 0;
}

console.log(total);
// console.log(input);
