import _, { fromPairs } from "lodash";
import "./style.css";
import { players, gameBoard } from "./ship.js";

const game = (function () {
  let playerName;
  const form = document.querySelector("#form");
  const GameBoard = document.querySelector(".gameboard");
  const intro = document.querySelector(".intro");
  const shipBoard = document.querySelector(".ships");
  const shotBoard = document.querySelector(".shot");
  let say = document.querySelector(".say");

  let player = new players(playerName, gameBoard());
  let computer = new players("computer", gameBoard());
  let boxPlayer = [];
  let boxComputer = [];
  let winner = false;

  player.fixship([0, 0], 3, true);
  player.fixship([6, 6], 3, true);
  player.fixship([3, 4], 3, true);
  player.fixship([2, 7], 1, false);

  computer.fixship([0, 0], 3, true);
  computer.fixship([6, 6], 3, true);
  computer.fixship([3, 4], 3, true);
  computer.fixship([2, 7], 1, false);

  let shipLogPlayer = player.ships().flat();

  let x = 0;
  let y = 0;

  // fill in data-coord from 00 to 99
  function lip() {
    let output = "";

    if (y > 9) {
      x++;
      y = 0;
    }
    output = `${x}`;
    output += `${y}`;
    y++;
    return output;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    playerName = document.querySelector(".playerName").value;
    GameBoard.style.display = "flex";
    intro.style.display = "none";
    say.style.display = "block";
    renderBoard();
    const boxOne = [...document.querySelectorAll(".box")];
    boxPlayer = boxOne;
    const boxTwo = [...document.querySelectorAll(".boxTwo")];
    boxComputer = boxTwo;
    inplay().addShips(boxOne, shipLogPlayer);
    inplay().playerMove();
  });

  //fill in the grids for gameboard
  function renderBoard() {
    for (let i = 0; i < 100; i++) {
      const box = document.createElement("button");
      box.classList.add("box");
      box.style.cssText = "border:1px solid red; height: 40px; width: 40px; ";
      shipBoard.appendChild(box);
    }

    for (let i = 0; i < 100; i++) {
      const boxTwo = document.createElement("button");
      boxTwo.classList.add("boxTwo");
      boxTwo.style.cssText =
        "border:1px solid red; height: 40px; width: 40px; ";
      boxTwo.setAttribute("data-coord", `${lip()}`);
      shotBoard.appendChild(boxTwo);
    }
  }

  //   let turn = true;
  //   // players take turn atacking enermy board
  //     if (turn) {
  //       // players turn
  //       turn = false;
  //       return player();
  //     } else {
  //       //computer turn
  //       turn = true;
  //       return computer();
  //     }

  // ingame activity
  const inplay = () => {
    function addShips(box, shipLog) {
      for (let prop in shipLog) {
        box[parseInt(shipLog[prop])].style.cssText = "background-color: red;";
      }
    }
    function hitEnemy(hit, Board, color) {
      if (hit.length >= 1) {
        Board[
          parseInt(hit[hit.length - 1])
        ].style.cssText = `background-color:${color} ;`;

        Board[parseInt(hit[hit.length - 1])].setAttribute("disabled", "true");
      }
    }
    function reshoot(cord, input) {
      let hitCheck = input.hit().includes(cord);
      let misscheck = input.miss().includes(cord);
      if (hitCheck === true || misscheck == true) {
        console.log("play again");
        // if (input == "player") {
        //   playerMove();
        // } else {
        //   computerMove();
        // }
      } else {
        if (input == "computer") {
          input = "player";
        }
        if (input == "player") {
          input = "computer";
        }
        input.shot(cord, input.ships());
      }
    }
    function off(box, boxSecond) {
      for (let i = 0; i < box.length; i++) {
        box[i].setAttribute("disabled", "true");
        boxSecond[i].setAttribute("disabled", "true");
      }
    }

    //player action on the game
    function playerMove() {
      shotBoard.addEventListener("click", (e) => {
        let take = e.target.getAttribute("data-coord").toString();
        player.shot(take, computer.ships());
        hitEnemy(player.hit(), boxComputer, "blue");
        hitEnemy(player.miss(), boxComputer, "black");
        let comp = computer.ships();
        if (player.winner(comp) == true) {
          say.style.cssText = "font-size: x-large;";
          say.textContent = `${playerName} wins`;
          console.log(boxPlayer);
          off(boxComputer, boxPlayer);
        }
        computerMove();
      });
    }

    //computer action on the game
    function computerMove() {
      let random = Math.floor(Math.random() * 100).toString();
      computer.shot(random, player.ships());
      hitEnemy(computer.hit(), boxPlayer, "blue");
      hitEnemy(computer.miss(), boxPlayer, "black");
      let take = player.ships();
      if (computer.winner(take) == true) {
        say.textContent = "computer wins";
        say.style.cssText = "font-size: x-large;";
        off(boxComputer, boxPlayer);
      }
    }

    return { addShips, playerMove };
  };
})();
