import { readFileSync } from "fs";

const input = readFileSync("src/3/input.txt").toString();

const grid = input
  .split("\n")
  .slice(0, -1)
  .map((row) => row.split(""));

type coord = {
  x: number;
  y: number;
};
type numberEntry = {
  num: number;
  coords: coord[];
};

console.log(grid);

let entries: numberEntry[] = [];
let inProgress = false;
let currEntry: numberEntry = {
  num: 0,
  coords: [],
};

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (!inProgress) {
      if (grid[y][x].match(/\d/)) {
        inProgress = true;
        currEntry = {
          num: parseInt(grid[y][x], 10),
          coords: [{ x, y }],
        };
      }
    } else {
      if (grid[y][x].match(/\d/)) {
        currEntry.num *= 10;
        currEntry.num += parseInt(grid[y][x], 10);
        currEntry.coords.push({ x, y });
      }
      if (!grid[y][x].match(/\d/) || x === grid[y].length - 1) {
        inProgress = false;
        entries.push({ num: currEntry.num, coords: [...currEntry.coords] });
        currEntry = { num: 0, coords: [] };
      }
    }
  }
}

const adjacentCoords: coord[] = [
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
];

function checkAdjacents(c: coord, grid: string[][]) {
  for (let change of adjacentCoords) {
    const newX = c.x + change.x;
    const newY = c.y + change.y;
    if (
      newX >= 0 &&
      newX < grid[0].length &&
      newY >= 0 &&
      newY < grid.length &&
      !grid[newY][newX].match(/[\d.]/)
    ) {
      return true;
    }
  }
  return false;
}

let total = 0;
for (let entry of entries) {
  for (let c of entry.coords) {
    if (checkAdjacents(c, grid)) {
      total += entry.num;
      break;
    }
  }
}

console.log(total);
