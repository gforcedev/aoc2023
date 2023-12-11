import { readFileSync } from "fs";

let grid = readFileSync("src/11/input.txt")
  .toString()
  .split("\n")
  .slice(0, -1)
  .map((s) => s.split(""));

for (let y = 0; y < grid.length; y++) {
  if (new Set(grid[y]).size === 1) {
    grid.splice(y, 0, [...grid[y]]);
    y += 1;
  }
}

for (let x = 0; x < grid[0].length; x++) {
  if (new Set(grid.map((row) => row[x])).size === 1) {
    for (let y = 0; y < grid.length; y++) {
      grid[y][x] = "..";
    }
  }
}

grid = grid.map((row) => row.join("").split(""));

const hashCoords: { x: number; y: number }[] = [];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "#") {
      hashCoords.push({ x, y });
    }
  }
}

let totalDistance = 0;
for (let i = 0; i < hashCoords.length; i++) {
  for (let j = i + 1; j < hashCoords.length; j++) {
    totalDistance += Math.abs(hashCoords[i].x - hashCoords[j].x);
    totalDistance += Math.abs(hashCoords[i].y - hashCoords[j].y);
  }
}

console.log(totalDistance);
