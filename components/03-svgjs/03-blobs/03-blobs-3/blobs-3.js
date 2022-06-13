import {
  getRandomIntInclusive,
} from "./utils-v1.js";

const colors = [
  "#70948a",
  "#9F9FA5",
  "#B7C4C4",
  "#E4E8E8",
  "#D8A2AF",
]
const circleColors = [
  "#4A635C",
  "#728B8B",
  "#91A1A1",
  "#69696F",
  "#B24A63",
]

function getColor(colors) {
  return colors[getRandomIntInclusive(0, colors.length - 1)];
}

function getRandomArrayElement(arr) {
  return arr[getRandomIntInclusive(0, arr.length - 1)];
}

console.log("blobs-3 active");

const draw = SVG('#blobs-3-svg');

const width = draw.width();
const height = draw.height();

const sqSize = 25;

function makeCircle() {
  let curX = getRandomIntInclusive(2, sqSize - 3);
  let curY = getRandomIntInclusive(2, sqSize - 3);

  let d = Math.min(curX, curY, sqSize - curX, sqSize - curY) * 2;

  // draw a circle there

  let circle = draw.circle(d)
    .attr({
      cx: curX,
      cy: curY,
    });

  return circle;
}

// Blob code

const blobs = [];
const numBlobs = 50;
const defs = draw.defs();

for (let i = 0; i < numBlobs; i++) {
  // Create a group

  const group = defs.group();

  // Create a square inside the group

  let curSquare = group.rect(sqSize, sqSize);

  // get some circles

  group.add(makeCircle());
  group.add(makeCircle());
  group.add(makeCircle());

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
    let accentColor = getColor(circleColors);

    let objscale = sqSize / currentShape.bbox().width * 0.979;

    currentShape.transform({
      position: [startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2],
      scale: objscale,
      rotate: getRandomIntInclusive(0, 3) * 90
    });

    let squares = currentShape.find('rect');
    squares.fill(getColor(colors));
    squares.stroke({
      'color': accentColor,
      'width': 0.05
    })

    let circles = currentShape.find('circle');
    circles.fill(accentColor);
    // circles.stroke({
    //   'color': '#fff',
    //   'width': 0.1
    // })

    draw.add(currentShape);
  }
}
