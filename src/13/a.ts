import { readFileSync } from "fs";

const input = readFileSync("src/13/input.txt")
  .toString()
  .split("\n\n")
  .map((cell) => cell.split("\n").map((row) => row.split("")));

let total = 0;
for (const [idx, cell] of input.entries()) {
  const localTotal = total;
  // console.log();
  // console.log(cell.map((r) => r.join("")).join("\n"));
  // console.log();

  // First try rows
  // console.log("ROWS");
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
    if (wasCorrect) {
      total += 100 * (i + 1);
      // console.log(`${idx}: ${total - localTotal}`);
      break;
    }
  }

  if (wasCorrect) {
    continue;
  }

  // console.log("COLS");
  // Then try cols
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
    if (wasCorrect) {
      total += i + 1;
      // console.log(`${idx}: ${total - localTotal}`);
      break;
    }
  }
}

console.log(total);
