import { readFileSync } from "fs";

const input = readFileSync("src/14/input.txt")
  .toString()
  .split("\n")
  .slice(0, -1)
  .map((s) => s.split(""));

// This tilts towards the east if false,false
function tilt(grid: string[][], transpose: boolean, reverse: boolean) {
  let localGrid = grid.map((row) => [...row]);
  if (transpose) {
    localGrid = localGrid[0].map((_, i) => localGrid.map((row) => row[i]));
  }

  if (reverse) {
    localGrid = localGrid.map((row) => row.reverse());
  }

  for (let y = 0; y < localGrid.length; y++) {
    let changed = true;
    while (changed) {
      changed = false;

      for (let x = 0; x < localGrid[y].length; x++) {
        if (localGrid[y][x] === "O" && localGrid[y][x + 1] === ".") {
          localGrid[y][x] = ".";
          localGrid[y][x + 1] = "O";
          changed = true;
        }
      }
    }
  }

  if (reverse) {
    localGrid = localGrid.map((row) => row.reverse());
  }

  if (transpose) {
    localGrid = localGrid[0].map((_, i) => localGrid.map((row) => row[i]));
  }

  return localGrid;
}

// This scores in relation to north if false,false
function score(grid: string[][], transpose: boolean, reverse: boolean) {
  let localGrid = grid.map((row) => [...row]);
  if (transpose) {
    localGrid = localGrid[0].map((_, i) => localGrid.map((row) => row[i]));
  }

  if (reverse) {
    localGrid = localGrid.map((row) => row.reverse());
  }

  let total = 0;
  for (let y = localGrid.length - 1; y >= 0; y--) {
    total +=
      (localGrid.length - y) * localGrid[y].filter((c) => c === "O").length;
  }

  return total;
}

const tilted = tilt(input, true, true);

// console.log(tilted.map((row) => row.join("")).join("\n"));
console.log(score(tilted, false, false));
