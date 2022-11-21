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

  //form inputs
  const form = document.querySelector("#form");
  let playerName;

  // creating new object of players
  let player = new players(playerName, gameBoard());
  let computer = new players("computer", gameBoard());
  let boxPlayer = [];
  let boxComputer = [];

  computer.fixship([0, 0], 5, true);
  computer.fixship([6, 6], 4, true);
  computer.fixship([3, 4], 3, true);
  computer.fixship([2, 7], 3, false);
  computer.fixship([9, 9], 1, false);

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
  function convertToArray(num) {
    console.log(typeof num);
    parseInt(num);
    if (num <= 9) {
      num.toString();
      let arr = num.charAt(1);
      return [0, parseInt(arr)];
    }
    return Array.from(String(num), Number);
  }
  function check(name) {
    if (name.checked) {
      console.log("checked");
      return false;
    }
    console.log("un");
    return true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    playerName = document.querySelector(".playerName").value;
    GameBoard.style.display = "flex";
    intro.style.display = "none";
    say.style.display = "block";

    const destroyer = document.querySelector("#destroyer").value;
    const first = document.querySelector("#first");
    const frigate = document.querySelector("#frigate").value;
    const second = document.querySelector("#second");
    const carrier = document.querySelector("#carrier").value;
    const third = document.querySelector("#third");
    const submarine = document.querySelector("#submarine").value;
    const four = document.querySelector("#four");
    const coastal = document.querySelector("#coastal").value;
    const five = document.querySelector("#five");

    // input player values from form input
    player.fixship(convertToArray(destroyer.toString()), 5, check(first));
    player.fixship(convertToArray(submarine.toString()), 4, check(four));
    player.fixship(convertToArray(frigate.toString()), 3, check(second));
    player.fixship(convertToArray(coastal.toString()), 3, check(five));
    player.fixship(convertToArray(carrier.toString()), 1, check(third));

    let shipLogPlayer = player.ships().flat();

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

  // ingame activity
  const inplay = () => {
    function addShips(box, shipLog) {
      for (let prop in shipLog) {
        box[parseInt(shipLog[prop])].style.cssText = "background-color: white;";
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
        player.shot(take, computer.ships());
        hitEnemy(player.hit(), boxComputer, "red");
        hitEnemy(player.miss(), boxComputer, "black");
        let comp = computer.ships();
        if (player.winner(comp) == true) {
          say.textContent = `${playerName} wins`;
          console.log(boxPlayer);
          off(boxComputer, boxPlayer);
        }
        computerMove();
      });
    }
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
      computer.shot(ran(), player.ships());
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
