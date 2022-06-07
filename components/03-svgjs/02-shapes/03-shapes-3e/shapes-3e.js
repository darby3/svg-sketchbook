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
    // Create a group

    const group = draw.group();

    // Create a square inside the group, color it white

    let curSquare = group.rect(sqSize, sqSize);

    curSquare.attr({
      fill: "#fff",
    });

    // Create a shape inside the group, color it black

    let currentShape = group.use(getRandomArrayElement(shapes)).attr({
      fill: '#000',
    });

    let objscale = sqSize / currentShape.bbox().width * 0.85;

    currentShape.transform({
      position: [sqSize / 2, sqSize / 2],
      scale: objscale
    });

    // Move the black and white group into position, then rotate it for fun

    group.transform({
      position: [startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2],
      rotate: getRandomIntInclusive(0, 3) * 90,
    });

    // Create a new square and give it a random color

    let maskedSquare = draw.rect(sqSize, sqSize);
    let colorForThis = getColor(colors);
    maskedSquare.fill(colorForThis);

    // Mask the square with the grouo we created above

    maskedSquare.maskWith(group);

    // Move the masked square into position

    maskedSquare.cx(startX + c * sqSize + sqSize / 2);
    maskedSquare.cy(startY + r * sqSize + sqSize / 2);

    // Stroke it to make it prettier

    maskedSquare.stroke({
      color: colorForThis,
      width: 1,
    });
  }
}
