import { readFileSync } from "fs";

const input = readFileSync("src/6/input.txt").toString();

const nums = input.match(/\d+/g)!.map((s) => parseInt(s, 10));

type RaceDef = {
  time: number;
  distance: number;
};

const parsed: RaceDef[] = [];
for (let i = 0; i < nums.length / 2; i++) {
  parsed.push({ time: nums[i], distance: nums[i + nums.length / 2] });
}

let total = 1;
for (let race of parsed) {
  let waysToWin = 0;
  for (let heldTime = 1; heldTime < race.time; heldTime++) {
    if (heldTime * (race.time - heldTime) > race.distance) waysToWin++;
  }

  total *= waysToWin;
}

console.log(total);
