import _, { fromPairs } from "lodash";
import "./style.css";
import { players, gameBoard } from "./ship.js";

const game = (function () {
  //game elements
  const GameBoard = document.querySelector(".gameboard");
  const intro = document.querySelector(".intro");
  const shipBoard = document.querySelector(".ships");
  const shotBoard = document.querySelector(".shot");
  let say = document.querySelector(".say");

  let cases = ["destroyer", "frigate", "submarine", "coastal", "carrier"];
  let count = 0;
  let prevShipLog = 0;
  let shipLogPlayer = [];

  //form inputs
  const form = document.querySelector("#form");
  let playerName;

  // creating new object of players
  let player = new players(playerName, gameBoard());
  let computer = new players("computer", gameBoard());
  let boxPlayer = [];
  let boxComputer = [];

  //Player color
  let playerOneColor;

  computer.fixship("cship1", [0, 0], 5, true);
  computer.fixship("cship2", [5, 6], 4, false);
  computer.fixship("cship3", [3, 4], 3, true);
  computer.fixship("cship4", [2, 7], 3, false);
  computer.fixship("cship5", [8, 8], 1, false);

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

  function convertToArray(num) {
    if (num <= 9) {
      return [0, parseInt(num)];
    }
    return Array.from(String(num), Number);
  }

  function check(name) {
    if (name.checked) {
      return false;
    }
    return true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    playerName = document.querySelector(".playerName").value;
    playerOneColor = document.querySelector("#playerOneColor").value;
    GameBoard.style.display = "flex";
    intro.style.display = "none";

    renderBoard();
    const boxOne = [...document.querySelectorAll(".box")];
    boxPlayer = boxOne;
    const boxTwo = [...document.querySelectorAll(".boxTwo")];
    boxComputer = boxTwo;
    let x = 0;
    let y = 0;

    // fill in data-coord from 00 to 99
    function lip2() {
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

    for (let i = 0; i < boxOne.length; i++) {
      boxOne[i].textContent = lip2();
    }

    let form = document.querySelector(".formInput");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let length;
      if (cases[count] == cases[0]) {
        length = 5;
      } else if (cases[count] == cases[1]) {
        length = 4;
      } else if (cases[count] == cases[2]) {
        length = 3;
      } else if (cases[count] == cases[3]) {
        length = 3;
      } else if (cases[count] == cases[4]) {
        length = 1;
      }

      render(cases[count], length);
      form.reset();

      if (shipLogPlayer.length == 16) {
        let inputShip = document.querySelector(".inputShip");
        inputShip.innerHTML = "Let have Fun Guys";
        inputShip.style.cssText = "color:red; font-size: 20px;";
        for (let i = 0; i < boxOne.length; i++) {
          boxOne[i].innerHTML = "";
        }
        inplay().playerMove();
      }
    });
  });
  function render(shipName, length) {
    let inputTaker = document.querySelector(".number").value;
    let checkboxTaker = document.querySelector(".checkbox");
    let shiplabel = document.querySelector(".shiplabel");
    player.fixship(
      shipName,
      convertToArray(inputTaker.toString()),
      length,
      check(checkboxTaker)
    );
    let shipLog = player.ships().flat();
    shipLogPlayer = shipLog;

    inplay().addShips(boxPlayer, shipLog, playerOneColor);

    if (shipLog.length > prevShipLog) {
      count++;
      shiplabel.textContent = cases[count];
      prevShipLog = shipLogPlayer.length;
    }
  }

  // ingame activity
  const inplay = () => {
    function addShips(box, shipLog, color) {
      for (let prop in shipLog) {
        box[
          parseInt(shipLog[prop])
        ].style.cssText = `background-color:${color} ;`;
      }
    }
    function hitEnemy(hit, Board, color) {
      if (hit.length >= 1) {
        Board[
          parseInt(hit[hit.length - 1])
        ].style.cssText = `background-color:${color} ;`;

        Board[parseInt(hit[hit.length - 1])].setAttribute("disabled", "true");
        Board[parseInt(hit[hit.length - 1])].setAttribute(
          "data-check",
          "clicked"
        );
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
        player.shot(take, computer.ships(), computer.logs());
        hitEnemy(player.hit(), boxComputer, "red");
        hitEnemy(player.miss(), boxComputer, "black");
        let comp = computer.ships();
        if (player.winner(comp) == true) {
          say.textContent = `${playerName} wins`;
          off(boxComputer, boxPlayer);
        }
        computerMove();
      });
    }
    function playerTwoMove() {}
    function ran() {
      let random = Math.floor(Math.random() * 100);
      let choose = boxPlayer[random].getAttribute("data-check");
      if (choose == null) {
        if (random <= 9) {
          random = "0" + random;
        }
        return random.toString();
      }
      return ran();
    }

    //computer action on the game
    function computerMove() {
      computer.shot(ran(), player.ships(), player.logs());
      hitEnemy(computer.hit(), boxPlayer, "red");
      hitEnemy(computer.miss(), boxPlayer, "black");
      let take = player.ships();
      if (computer.winner(take) == true) {
        say.textContent = "computer wins";
        off(boxComputer, boxPlayer);
      }
    }

    return { addShips, playerMove };
  };
})();
