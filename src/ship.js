class Ships {
  constructor(length, namer, log) {
    this.namer = namer;
    this.length = length;
    this.hitpoint = 0;
    this.shipLog = log;
  }
  hit() {
    this.hitpoint++;
  }
  isSunk() {
    if (this.hitpoint >= this.length) {
      return true;
    }
    return false;
  }
}

export const gameBoard = () => {
  let shipCordinateArr = [];
  let shipCordinate = [];
  let missedHitCordinate = [];
  let hitCordinate = [];
  let shiplog = [];

  // place ship at specifice co-ordinates  in grid
  /**
   *
   * @param {*} cordinate
   * input the grid array index in sting format
   * @param {*} length
   * input length of the arrat
   * @param {*} direction
   * input direction of the ship
   * true for horizontal // false for left
   * @returns
   */

  const placement = (shipName, cordinateArr, length, direction) => {
    //logic for placing ship

    function mark(fig) {
      let fake = [];
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
        shipName = new Ships(length, shipName, fake);
        shiplog.push(shipName);
        shipCordinateArr.push(fake);
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
    return shipCordinateArr;
  }

  // function shot- determeine hit or miss
  const shot = (cord, enemyship, enemyLog) => {
    let shipCordinate = enemyship.flat();
    if (shipCordinate.includes(cord)) {
      for (let i = 0; i < enemyLog.length; i++) {
        if (enemyLog[i].shipLog.includes(cord)) {
          enemyLog[i].hit();
        }
      }
      return hitCordinate.push(cord);
    } else {
      return missedHitCordinate.push(cord);
    }
  };

  //return shiplog repre all ship obj
  const logs = () => {
    return shiplog;
  };

  function deleter(log, i) {
    log.splice(i, 1);
    console.log(log);
  }
  // return ship if it has sunk
  const lost = () => {
    for (let i = 0; i < shiplog.length; i++) {
      if (shiplog[i].isSunk() == true) {
        return { name: shiplog[i].namer, index: i };
      }
    }
    return false;
  };

  // check for winner
  const checkWinner = (enemyship, hitpiont = hitCordinate) => {
    let shipCordinate = enemyship.flat();
    const include = shipCordinate.every((value) => hitpiont.includes(value));
    if (include === true) return true;
  };

  return {
    placement,
    shot,
    tip,
    hitCordinate,
    checkWinner,
    missedHitCordinate,
    logs,
    lost,
    deleter,
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

  shot(coord, enemyBoard, enemylog) {
    this.#enemyBoard.shot(coord, enemyBoard, enemylog);
  }
  fixship(shipName, cord, len, dir) {
    this.#enemyBoard.placement(shipName, cord, len, dir);
  }
  winner(enemyship) {
    return this.#enemyBoard.checkWinner(enemyship);
  }
  miss() {
    return this.#enemyBoard.missedHitCordinate;
  }
  logs() {
    return this.#enemyBoard.logs();
  }
  lost() {
    return this.#enemyBoard.lost();
  }
  del(log, index) {
    this.#enemyBoard.deleter(log, index);
  }
}
