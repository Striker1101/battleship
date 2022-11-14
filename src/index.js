import _, { fromPairs } from "lodash";
import ship, { gameBoard, player, checkWinner } from "./ship.js";

const board = gameBoard();
console.log(board.shot());
