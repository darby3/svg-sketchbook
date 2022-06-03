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

console.log("shapes-3 active");

const draw = SVG('#shapes-3-svg');

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
    let currentShape = draw.use(getRandomArrayElement(shapes));
    const objscale = 0.6;

    currentShape.transform({
      position: [ startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2 ],
      scale: objscale,
      rotate: getRandomIntInclusive(0, 3) * 90
    });

    currentShape.attr({
      fill: getColor(colors),
    });
  }
}
