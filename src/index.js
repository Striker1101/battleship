import _, { fromPairs } from "lodash";
import { gameBoard, players } from "./ship.js";

const board = gameBoard();
board.placement("66", 3, true);
board.placement("66", 3, false);
const move = players();
move.markMove("45");
