import {
  getRandomInt,
  getRandomIntInclusive,
  shuffleArray
} from "./utils-v1.js";

const colors = [
  "#CC1177",
  "#FF33AA",
  "#CC3399",
  "#FF66CC",
  "#990044",
]

const shapes = [
  "blob1",
  "blob2",
  "blob3",
]

function getColor(colors) {
  return colors[getRandomIntInclusive(0, colors.length - 1)];
}

function getRandomArrayElement(arr) {
  return arr[getRandomIntInclusive(0, arr.length - 1)];
}

console.log("shapes-3b-2 active");

const draw = SVG('#shapes-3b-2-svg');

const width = draw.width();
const height = draw.height();

const bg = draw.rect(width, height).fill("#290318");

const sqSize = 30;

let cols = Math.floor(width / sqSize);
let rows = Math.floor(height / sqSize);

let startX = (width - (cols * sqSize)) / 2;
let startY = (height - (rows * sqSize)) / 2;

console.log({startX, startY});

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    let currentShape = draw.use(getRandomArrayElement(shapes));
    let objscale = sqSize / currentShape.bbox().width;

    currentShape.transform({
      position: [startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2],
      scale: objscale,
      rotate: getRandomIntInclusive(0, 3) * 90
    });

    currentShape.attr({
      fill: getColor(colors),
    });
  }
}
