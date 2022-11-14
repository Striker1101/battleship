import { gameboard } from "./ship.js";

it("shot enemy ships", () => {
  expect(gameboard().shot("23")).toBe("hit ship");
});
