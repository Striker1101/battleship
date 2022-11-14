export default class ships {
  constructor(length) {
    this.length = length;
    this.hitCount = hitCount;
    this.sink = sink;
  }
  hit() {}
  isSunk() {}
}
export const gameBoard = () => {
  let shipCordinate = [];
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
   * input length of the arrat
   * @param {*} direction
   * input direction of the ship
   * true for horizontal // false for left
   * @returns
   */
  const placement = (cordinate, length, direction) => {
    const cordinateArr = Array.from(String(cordinate), Number);
    if (cordinateArr.length == 1) {
      cordinateArr[1] = cordinateArr[0];
      cordinateArr[0] = 0;
    }

    //logic for placing ship
    function mark(fig) {
      let fake = [];
      //increment based on length
      for (let i = 0; i < length; i++) {
        cordinateArr[fig]++;
        fake.push(cordinateArr.join("").toString());
      }
      //remove any double ship grid
      let difference = shipCordinate.filter((x) => fake.includes(x));
      if (difference.length == 0)
        for (let i = 0; i < fake.length; i++) {
          shipCordinate.push(fake[i]);
        }
    }
    // if to choose direction and constain grid to length
    if (cordinateArr[0] + length <= 9 && direction === false) {
      mark(0);
    }

    if (cordinateArr[1] + length <= 9 && direction === true) {
      mark(1);
    }
    return cordinateArr;
  };

  // function shot- determeine hit or miss
  const shot = () => {
    /**if "event" cordinate equal shipcordinate
     * ship takes hit
     * else log in missed hit array
     *
     */
    return "hit ship";
  };

  const checkWinner = () => {
    /**
     * if hitCordinate equal shipCordinate for both players
     */
  };
  return { placement, shot, checkWinner };
};

export const players = () => {
  // players take turn atacking enermy board
  const computer = () => {
    // prevent from hitting same cordinate twice
  };
};
const board = gameBoard();
