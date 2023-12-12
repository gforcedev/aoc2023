import { readFileSync } from "fs";

const input = readFileSync("src/12/input.txt")
  .toString()
  .split("\n")
  .slice(0, -1)
  .map((line) => {
    return {
      numString: line.split(" ")[1],
      partString: line.split(" ")[0]!,
    };
  });

console.log(input);

let total = 0;
input.forEach((game) => {
  const unknownCount = game.partString.match(/\?/g)!.length;
  for (let i = 0; i < 2 ** unknownCount; i++) {
    let iString = i.toString(2);
    const toInterpolate = (
      "0".repeat(unknownCount - iString.length) + iString
    ).split("");

    let toCheck = "";
    for (const c of game.partString) {
      if (c === "?") {
        toCheck += toInterpolate.shift();
        continue;
      }
      toCheck += c;
    }
    toCheck = toCheck.replaceAll("1", "#").replaceAll("0", ".");
    // console.log(toCheck);

    if (
      (toCheck.match(/#+/g) ?? [""]).map((s) => s.length).join(",") ===
      game.numString
    ) {
      total++;
    }
  }
});

console.log(total);
