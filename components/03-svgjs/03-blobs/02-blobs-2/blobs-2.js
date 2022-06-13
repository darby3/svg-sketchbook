import {
  getRandomIntInclusive,
} from "./utils-v1.js";

const colors = [
  "#511259",
  "#553159",
  "#696273",
  "#F2EDA2",
  "#8C846C",
]

function getColor(colors) {
  return colors[getRandomIntInclusive(0, colors.length - 1)];
}

function getRandomArrayElement(arr) {
  return arr[getRandomIntInclusive(0, arr.length - 1)];
}

console.log("blobs-2 active");

const draw = SVG('#blobs-2-svg');

const width = draw.width();
const height = draw.height();

const sqSize = 30;

// Blob code

const blobs = [];
const numBlobs = 7;
const defs = draw.defs();

for (let i = 0; i < numBlobs; i++) {
  // Create a group

  const group = defs.group();

  // Create a square inside the group

  let curSquare = group.rect(sqSize, sqSize);

  // pick a point somewhere inside the circle

  let curX = getRandomIntInclusive(2, sqSize - 3);
  let curY = getRandomIntInclusive(2, sqSize - 3);

  let d = Math.min(curX, curY, sqSize - curX, sqSize - curY) * 2;

  // draw a circle there

  let circle = group.circle(d)
    .attr({
      cx: curX,
      cy: curY,
    });

  blobs.push(group);
}

// Grid code

let cols = Math.floor(width / sqSize);
let rows = Math.floor(height / sqSize);

let startX = (width - (cols * sqSize)) / 2;
let startY = (height - (rows * sqSize)) / 2;

console.log({startX, startY});

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    let currentShape = getRandomArrayElement(blobs).clone();

    let objscale = sqSize / currentShape.bbox().width * 0.979;

    currentShape.transform({
      position: [startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2],
      scale: objscale,
      rotate: getRandomIntInclusive(0, 3) * 90
    });

    let circles = currentShape.find('circle');
    console.dir(circles);
    circles.fill('#fff');

    let squares = currentShape.find('rect');
    console.dir(squares);
    squares.fill(getColor(colors));

    draw.add(currentShape);
  }
}
