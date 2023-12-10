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

input[startingRow][startingCol] = "|";

// I looked at my input and I need to go up or down
let currentDirection: Coord = { x: 0, y: 1 };

let loop: Coord[] = [];

let totalSteps = 0;
do {
  currentPos = {
    x: currentPos.x + currentDirection.x,
    y: currentPos.y + currentDirection.y,
  };
  loop.push(currentPos);

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

let insideCount = 0;
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    let currentPos: Coord = { x, y };
    if (loop.some((c) => c.x === currentPos.x && c.y === currentPos.y))
      continue;

    let jumpCount = 0;
    while (currentPos.x !== -1) {
      currentPos.x -= 1;
      const currentTile = input[currentPos.y][currentPos.x];
      if (
        loop.some((c) => c.x === currentPos.x && c.y === currentPos.y) &&
        currentTile !== "-" &&
        currentTile !== "J" &&
        currentTile !== "L"
      ) {
        jumpCount++;
      }
    }

    if (jumpCount % 2 === 1) {
      insideCount++;
      input[y][x] = "I";
    } else {
      input[y][x] = "O";
    }
  }
}

console.log(insideCount);
console.log(input.map((arr) => arr.join("")).join("\n"));
