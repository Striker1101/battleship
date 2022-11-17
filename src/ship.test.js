import { gameBoard } from "./ship.js";

it("shot enemy ships", () => {
  let shipCordinateArr = [["34"]];
  expect(gameBoard().shot("66")).toBe(true);
});
