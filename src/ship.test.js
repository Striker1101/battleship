import { gameBoard } from "./ship.js";
import { Ships } from "./ship.js";
let shipCordinateArr = [];
let shipCordinate = [];
let missedHitCordinate = [];
let hitCordinate = [];
let shiplog = [];

let Log0 = new Ships(2, "chip", ["23", "24", "25"]);
let Log1 = new Ships(5, "chip", ["33", "34", "35"]);

it("shot enemy ships", () => {
  let enemy = [
    ["24", "25", "26", "14"],
    ["71", "72", "73"],
  ];

  let enemyLog = [Log0, Log1];
  expect(gameBoard().shot("14", enemy, enemyLog)).toBe(true);
});

it("winner of game", () => {
  let enemy = [
    ["24", "25", "26", "23"],
    ["71", "72", "73"],
  ];
  let hit = ["24", "25", "26", "23", "71", "72", "73"];
  expect(gameBoard().checkWinner(enemy, hit)).toBe(true);
});

it("lost ship", () => {
  let enemyLog = [Log0, Log1];
  expect(gameBoard().lost(enemyLog)).toBe(false);
});

it("lost ship", () => {
  let enemyLog = [Log0, Log1];
  Log0.hit();
  Log0.hit();
  Log0.hit();
  Log0.hit();
  expect(gameBoard().lost(enemyLog)).toStrictEqual({ name: "chip", index: 0 });
});
