import { readFileSync } from "fs";

const NUM_CYCLES = 1000000000;

let input = readFileSync("src/14/input.txt")
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

// I lost my bet about needing to score in different directions lol
function score(grid: string[][]) {
  let localGrid = grid.map((row) => [...row]);

  let total = 0;
  for (let y = localGrid.length - 1; y >= 0; y--) {
    total +=
      (localGrid.length - y) * localGrid[y].filter((c) => c === "O").length;
  }

  return total;
}

let grids: string[] = [];
grids.push(input.map((row) => row.join("")).join("\n"));

let loopStart = 0;

for (let i = 0; i < NUM_CYCLES; i++) {
  input = tilt(input, true, true);
  input = tilt(input, false, true);
  input = tilt(input, true, false);
  input = tilt(input, false, false);

  grids.push(input.map((row) => row.join("")).join("\n"));

  const firstIndex = grids.indexOf(grids[grids.length - 1]);
  if (firstIndex !== grids.length - 1) {
    loopStart = firstIndex;
    break;
  }
}

const gridLoop = grids.slice(loopStart + 1);

console.log(
  score(
    gridLoop[(NUM_CYCLES - loopStart - 1) % gridLoop.length]
      .split("\n")
      .map((line) => line.split(""))
  )
);
