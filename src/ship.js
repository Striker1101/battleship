class ships {
  constructor(length) {
    this.length = length;
    this.slot = [];
  }
}

export const gameBoard = () => {
  let shipObj = new ships();
  let shipCordinate = [];
  let missedHitCordinate = [];
  let hitCordinate = [];
  // place ship at specifice co-ordinates  in grid
  /**
   *
   * @param {*} cordinate
   * input the grid array index in sting format
   * @param {*} length
   * input length of the array
   * @param {*} direction
   * input direction of the ship
   * true for horizontal // false for left
   * @returns
   */

  // function shot- determeine hit or miss
  /**
   *
   * @param {*} cor input cordinate for cor in string
   * @returns hitpoints
   */
  const placement = (cordinateArr, length, direction) => {
    //logic for placing ship

    function mark(fig) {
      let fake = [];
      let tog = false;
      //increment based on length
      let i = 0;
      do {
        fake.push(cordinateArr.join("").toString());
        cordinateArr[fig]++;
        i++;
      } while (i < length);

      //remove any double ship grid
      let check = shipCordinate.filter((x) => fake.includes(x));
      if (check.length == 0) {
        shipObj.length = length;
        shipObj.slot.push(fake);
        tog = true;
        for (let i = 0; i < fake.length; i++) {
          shipCordinate.push(fake[i]);
        }
      }
    }
    // if to choose direction and constain grid to length
    if (cordinateArr[0] + length <= 9 && direction === false) {
      mark(0);
    }

    if (cordinateArr[1] + length <= 9 && direction === true) {
      mark(1);
    }
  };

  function tip() {
    return shipObj.slot;
  }

  const shot = (cord, enemyship) => {
    let shipCordinate = enemyship.flat();
    if (shipCordinate.includes(cord)) {
      hitCordinate.push(cord);
    } else {
      missedHitCordinate.push(cord);
    }
  };

  const checkWinner = (enemyship) => {
    let shipCordinate = enemyship.flat();
    const include = shipCordinate.every((value) =>
      hitCordinate.includes(value)
    );
    if (include === true) return true;
  };

  return {
    placement,
    shot,
    tip,
    hitCordinate,
    checkWinner,
    missedHitCordinate,
  };
};

export class players {
  #enemyBoard;
  constructor(name, enemyBoard) {
    this.name = name;
    this.#enemyBoard = enemyBoard;
  }
  ships() {
    return this.#enemyBoard.tip();
  }
  hit() {
    return this.#enemyBoard.hitCordinate;
  }

  shot(coord, enemyBoard) {
    this.#enemyBoard.shot(coord, enemyBoard);
  }
  fixship(cord, len, dir) {
    this.#enemyBoard.placement(cord, len, dir);
  }
  winner(enemyship) {
    this.#enemyBoard.checkWinner(enemyship);
  }
  miss() {
    return this.#enemyBoard.missedHitCordinate;
  }
}
