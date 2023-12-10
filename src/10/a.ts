import { readFileSync } from "fs";

type Coord = { x: number; y: number };

const input = readFileSync("src/10/input.txt")
  .toString()
  .split("\n")
  .slice(0, -1)
  .map((s) => s.split(""));

const startingRow = input.findIndex((r) => r.some((s) => s === "S"));
const startingCol = input[startingRow].indexOf("S");

let currentPos = {
  x: startingCol,
  y: startingRow,
};

// I looked at my input and I need to go up or down
let currentDirection: Coord = { x: 0, y: 1 };

let totalSteps = 0;
do {
  // console.log("direction", currentDirection);
  console.log("pos", currentPos);
  currentPos = {
    x: currentPos.x + currentDirection.x,
    y: currentPos.y + currentDirection.y,
  };

  switch (input[currentPos.y][currentPos.x]) {
    case "F":
      if (currentDirection.x === 0) {
        currentDirection.x = 1;
        currentDirection.y = 0;
        break;
      }
      currentDirection.y = 1;
      currentDirection.x = 0;
      break;
    case "7":
      if (currentDirection.x === 0) {
        currentDirection.x = -1;
        currentDirection.y = 0;
        break;
      }
      currentDirection.y = 1;
      currentDirection.x = 0;
      break;
    case "L":
      if (currentDirection.x === 0) {
        currentDirection.x = 1;
        currentDirection.y = 0;
        break;
      }
      currentDirection.y = -1;
      currentDirection.x = 0;
      break;
    case "J":
      if (currentDirection.x === 0) {
        currentDirection.x = -1;
        currentDirection.y = 0;
        break;
      }
      currentDirection.y = -1;
      currentDirection.x = 0;
      break;
  }

  totalSteps++;
} while (currentPos.x !== startingCol || currentPos.y !== startingRow);

console.log(totalSteps / 2);
