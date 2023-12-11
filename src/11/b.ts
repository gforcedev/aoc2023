import { readFileSync } from "fs";

let grid = readFileSync("src/11/input.txt")
  .toString()
  .split("\n")
  .slice(0, -1)
  .map((s) => s.split(""));

for (let y = 0; y < grid.length; y++) {
  if (!new Set(grid[y]).has("#")) {
    grid.splice(y, 0, [...grid[y].map((_) => "x")]);
    y += 1;
  }
}

for (let x = 0; x < grid[0].length; x++) {
  const col = grid.map((row) => row[x]);
  const colSet = new Set(col);
  if (!colSet.has("#")) {
    for (let y = 0; y < grid.length; y++) {
      grid[y][x] = grid[y][x] + "x";
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

console.log(hashCoords.length);

let totalDistance = 0;
for (let i = 0; i < hashCoords.length; i++) {
  for (let j = i + 1; j < hashCoords.length; j++) {
    totalDistance += Math.abs(hashCoords[i].x - hashCoords[j].x);
    totalDistance += Math.abs(hashCoords[i].y - hashCoords[j].y);

    const sortedX = [hashCoords[i].x, hashCoords[j].x].sort((a, b) => a - b);
    const sortedY = [hashCoords[i].y, hashCoords[j].y].sort((a, b) => a - b);

    const rowSlice = grid[sortedY[0]].slice(sortedX[0], sortedX[1]);
    const colSlice = grid
      .map((row) => row[sortedX[0]])
      .slice(sortedY[0], sortedY[1]);

    totalDistance += rowSlice.filter((c) => c === "x").length * 999998;
    totalDistance += colSlice.filter((c) => c === "x").length * 999998;
  }
}

console.log(grid.map((row) => row.join("")).join("\n"));
console.log(totalDistance);
