export default class ships {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.sink = false;
  }
  hit() {}
  isSunk() {}
}
export const gameBoard = () => {
  let shipCordinate = [];
  let shipCordinateArr = [];
  let missedHitCordinate = [];
  let hitCordinate = [];

  function Array2D(x, y) {
    let arr = Array(x);
    for (let i = 0; i < y; i++) {
      arr[i] = Array(y);
    }
    return arr;
  }
  //console.log(Array2D(10, 100));
  let x = 0;
  let y = 0;
  let arr = Array2D(10, 100);

  for (let i = 0; i < 100; i++) {
    arr[i] = lip();
  }

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
  const placement = (cordinate, length, direction) => {
    // take cordinate to array
    const cordinateArr = Array.from(String(cordinate), Number);
    if (cordinateArr.length == 1) {
      cordinateArr[1] = cordinateArr[0];
      cordinateArr[0] = 0;
    }
    let shipObj = new ships(length);
    //logic for placing ship
    function mark(fig) {
      let fake = [];
      //increment based on length
      for (let i = 0; i < length; i++) {
        cordinateArr[fig]++;
        fake.push(cordinateArr.join("").toString());
      }

      // prevent double grid space
      let check = shipCordinate.filter((x) => fake.includes(x));
      if (check.length == 0) {
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
    return shipCordinateArr[shipCordinateArr.length - 1];
  };

  // function shot- determeine hit or miss
  /**
   *
   * @param {*} cor input cordinate for cor in string
   * @returns hitpoints
   */
  const shot = (cor) => {
    console.log(shipCordinateArr);
    let shipCordinate = shipCordinateArr.reduce((r, e) => (r.push(...e), r));
    if (shipCordinate.includes(cor)) {
      //hit ** push to hitcordinate
      hitCordinate.push(cor);
      return true;
    } else {
      //push to misdhitCordinate
      missedHitCordinate.push(cor);
      return false;
    }
  };

  const checkWinner = () => {
    const shipCordinate = shipCordinateArr.reduce((r, e) => (r.push(...e), r));
    const include = shipCordinate.every((value) =>
      hitCordinate.includes(value)
    );
    if (include === true) {
      return "winner";
    }
  };
  return { placement, shot, checkWinner };
};

export const players = () => {
  let turn = true;
  // players take turn atacking enermy board
  function markMove() {
    if (turn) {
      turn = false;
      return player();
    } else {
      turn = true;
      return computer();
    }
  }

  // player move
  const player = () => {
    console.log(gameBoard().shot("66"));
  };

  //computer move
  const computer = () => {
    // prevent from hitting same cordinate twice
  };
  return { markMove };
};
