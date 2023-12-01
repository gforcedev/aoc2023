import { readFileSync } from "fs";

const input = readFileSync("src/1/input.txt").toString();

const mappings = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as { [k: string]: string };

const answer = input
  .split("\n")
  .slice(0, -1)
  .map(
    (line) => {
      const first = line.match(
        /(\d|one|two|three|four|five|six|seven|eight|nine)/
      )?.[0]!;
      const last = line
        .split("")
        .reverse()
        .join("")
        .match(/(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/)?.[0]!;
      return parseInt(
        [
          mappings[first],
          mappings[last.toString().split("").reverse().join("")],
        ].join(""),
        10
      );
    } // ?.map((s) => mappings[s ?? "huh"])
  )
  .reduce((a, b) => {
    console.log(b);
    return a + b;
  });

console.log(answer);
