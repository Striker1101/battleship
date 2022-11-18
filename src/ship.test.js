import { gameBoard } from "./ship.js";

it("shot enemy ships", () => {
  let enemy = [
    ["24", "25", "26", "23"],
    ["71", "72", "73"],
  ];
  expect(gameBoard().shot("23", enemy)).toBe("done");
});

it("winner of game", () => {
  let enemy = [
    ["24", "25", "26", "23"],
    ["71", "72", "73"],
  ];
  let hit = ["24", "25", "26", "23", "71", "72", "73"];
  expect(gameBoard().checkWinner(enemy, hit)).toBe(true);
});
