import { readFileSync } from "fs";

type Instruction =
  | {
      label: string;
      instruction: "=";
      focalLength: number;
    }
  | {
      label: string;
      instruction: "-";
    };

const input = readFileSync("src/15/input.txt")
  .toString()
  .split("\n")
  .slice(0, -1)[0]!
  .split(",")
  .map((s) => {
    if (s.indexOf("=") !== -1) {
      return {
        label: s.match(/\w+/)![0],
        instruction: "=",
        focalLength: parseInt(s.match(/\d+/)![0]),
      };
    }
    return { label: s.match(/\w+/)![0], instruction: "-" };
  }) satisfies Instruction[] as Instruction[];

function hash(s: string): number {
  return s.split("").reduce((total, c) => {
    return ((total + c.charCodeAt(0)) * 17) % 256;
  }, 0);
}

// Lol my first submission was wrong because of:
// const boxes: Instruction[][] = new Array(256).fill([]);
const boxes: Instruction[][] = new Array(256).fill(0).map(_ => []);

for (let instruction of input) {
  const box = hash(instruction.label);

  if (instruction.instruction === '=') {
    const existingIndex = boxes[box].findIndex(l => l.label === instruction.label);
    if (existingIndex === -1) {
      boxes[box].push(instruction);
    } else {
      boxes[box].splice(existingIndex, 1, instruction)
    }
  } else {
    const existingIndex = boxes[box].findIndex(l => l.label === instruction.label);
    if (existingIndex !== -1) {
      boxes[box].splice(existingIndex, 1)
    }
  }
}

let total = 0;
for (let i = 0; i < boxes.length; i++) {
  boxes[i].forEach((v, k) => {
    total += (i + 1) * (k + 1) * ((v as {focalLength: number}).focalLength!);
  })
}

console.log(boxes);

console.log(total);
