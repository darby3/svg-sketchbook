import {
  getRandomInt,
  getRandomIntInclusive,
  shuffleArray
} from "./utils-v1.js";

const colors = [
  "#511259",
  "#553159",
  "#696273",
  "#F2EDA2",
  "#8C846C",
]

const shapes = [
  "triangle",
  "square",
  "pentagon",
]

function getColor(colors) {
  return colors[getRandomIntInclusive(0, colors.length - 1)];
}

function getRandomArrayElement(arr) {
  return arr[getRandomIntInclusive(0, arr.length - 1)];
}

console.log("shapes-3c active");

const draw = SVG('#shapes-3c-svg');

const width = draw.width();
const height = draw.height();

const sqSize = 30;

let cols = Math.floor(width / sqSize);
let rows = Math.floor(height / sqSize);

let startX = (width - (cols * sqSize)) / 2;
let startY = (height - (rows * sqSize)) / 2;

console.log({startX, startY});

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const group = draw.group();

    let curSquare = group.rect(sqSize, sqSize);

    // curSquare.cx(startX + c * sqSize + sqSize / 2);
    // curSquare.cy(startY + r * sqSize + sqSize / 2);

    curSquare.attr({
      fill: getColor(colors),
    });

    let currentShape = group.use(getRandomArrayElement(shapes)).attr({
      fill: '#fff',
    });

    curSquare.maskWith(currentShape);

    let objscale = sqSize / currentShape.bbox().width * 0.95;

    group.transform({
      position: [ startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2 ],
      scale: objscale,
      // rotate: getRandomIntInclusive(0, 3) * 90
    });

  }
}
