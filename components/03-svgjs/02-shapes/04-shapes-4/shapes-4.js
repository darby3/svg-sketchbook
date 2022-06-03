import {
  getRandomInt,
  getRandomIntInclusive,
  shuffleArray
} from "./utils-v1.js";

const colors = [
  "#031326",
  "#172C42",
  "#2F445C",
  "#495D75",
  "#7A93A7",
]

const warmColors = [
  "#E8C066",
  "#FFE171",
  "#FFCA7D",
  "#E8A066",
  "#FF9B71",
]

const grays = [
  "#6C6F73",
  "#BDBFBF",
  "#888C8C",
  "#3C3F40",
  "#F0F2F0",
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

console.log("shapes-4 active");

const draw = SVG('#shapes-4-svg');

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
    const thisShape = getRandomArrayElement(shapes);

    let currentShape = draw.use(thisShape);
    let objscale = 0.6;
    let objrotate = getRandomIntInclusive(0, 3) * 90;

    currentShape.transform({
      position: [startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2],
      scale: objscale,
      rotate: objrotate
    });

    currentShape.attr({
      fill: getColor(colors),
      "stroke-width": "1",
      "stroke": getColor(grays)
    });

    let currentShape2 = draw.use(thisShape);
    objscale /= 2;

    currentShape2.transform({
      position: [startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2],
      scale: objscale,
      rotate: objrotate
    });

    currentShape2.attr({
      "fill": getColor(warmColors),
      "stroke-width": "1",
      "stroke": getColor(grays)
    });
  }
}

// for (let r = 0; r < rows; r++) {
//   for (let c = 0; c < cols; c++) {
//     let currentShape = draw.use(getRandomArrayElement(shapes));
//     const objscale = 0.3;
//
//     currentShape.transform({
//       position: [startX + c * sqSize + sqSize / 2, startY + r * sqSize +
// sqSize / 2], scale: objscale, rotate: getRandomIntInclusive(0, 3) * 90 });
// currentShape.attr({ fill: getColor(warmColors), }); } }
