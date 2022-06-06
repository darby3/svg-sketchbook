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

const grays = [
  "#de8fe8",
  "#cfafd3",
  "#cdcad1",
  "#fbf9e0",
  "#d9d6ce",
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

console.log("shapes-3e active");

const draw = SVG('#shapes-3e-svg');

const width = draw.width();
const height = draw.height();

const bg = draw.rect(width, height).fill(getColor(grays));

const sqSize = 30;

let cols = Math.floor(width / sqSize);
let rows = Math.floor(height / sqSize);

let startX = (width - (cols * sqSize)) / 2;
let startY = (height - (rows * sqSize)) / 2;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const group = draw.group();

    let curSquare = group.rect(sqSize, sqSize);

    // curSquare.cx(startX + c * sqSize + sqSize / 2);
    // curSquare.cy(startY + r * sqSize + sqSize / 2);

    curSquare.attr({
      fill: "#fff",
    });

    let currentShape = group.use(getRandomArrayElement(shapes)).attr({
      fill: '#000',
    });

    let objscale = sqSize / currentShape.bbox().width * 0.85;

    currentShape.transform({
      position: [sqSize / 2, sqSize / 2],
      scale: objscale
    });

    // curSquare.maskWith(currentShape);

    group.transform({
      position: [startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2],
      // rotate: getRandomIntInclusive(0, 3) * 90
    });


    let maskedSquare = draw.rect(sqSize, sqSize);

    let colorForThis = getColor(colors);
    maskedSquare.fill(colorForThis);
    maskedSquare.maskWith(group);

    maskedSquare.cx(startX + c * sqSize + sqSize / 2);
    maskedSquare.cy(startY + r * sqSize + sqSize / 2);

    maskedSquare.stroke({
      color: colorForThis,
      width: 1,
    });


  }
}
