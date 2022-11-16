import { gameBoard } from "./ship.js";

it("shot enemy ships", () => {
  expect(gameBoard().shot("66")).toBe(true);
});
