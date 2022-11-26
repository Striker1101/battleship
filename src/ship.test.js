import { gameBoard } from "./ship.js";

it("shot enemy ships", () => {
  let enemy = [
    ["24", "25", "26", "23"],
    ["71", "72", "73"],
  ];
  let hit = [];
  let miss = [];
  expect(gameBoard().shot("23", enemy, log)).toBe(["23"]);
});

it("winner of game", () => {
  let enemy = [
    ["24", "25", "26", "23"],
    ["71", "72", "73"],
  ];
  let hit = ["24", "25", "26", "23", "71", "72", "73"];
  expect(gameBoard().checkWinner(enemy, hit)).toBe(true);
});
