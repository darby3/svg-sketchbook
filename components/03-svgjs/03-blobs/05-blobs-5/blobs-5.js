import {
  getRandom,
  coinFlip,
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

console.log("blobs-5 active");

const draw = SVG('#blobs-5-svg');

const width = draw.width();
const height = draw.height();

const sqSize = 25;

function makeCirclePoint() {
  let curX = getRandomIntInclusive(2, sqSize - 3);
  let curY = getRandomIntInclusive(2, sqSize - 3);

  return [curX, curY];
}

function makeCircle([x, y] = makeCirclePoint()) {
  let [curX, curY] = [x, y];

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
  let bgColor = getColor(colors);
  let accentColor = getColor(circleColors);

  // Create a group

  const group = defs.group();

  // Create a square inside the group

  let curSquare = group.rect(sqSize, sqSize);

  curSquare.fill(getColor(colors));
  curSquare.stroke({
    'color': bgColor,
    'width': 0.05
  })

  // get some circles

  const circlesGroup = defs.group();

  let [x, y] = makeCirclePoint();
  let circleA = makeCircle([x, y]);

  circlesGroup.add(circleA);

  // circle 2

  let d = Math.min(x, y, sqSize - x, sqSize - y) * 2;
  let r = d / 2;

  let dirX = (x > sqSize - x) ? -1 : 1;
  let dirY = (y > sqSize - y) ? -1 : 1;


  let x2 = x + (r / 2 * dirX);
  let y2 = y + (r / 2 * dirY);

  let circleB = makeCircle([x2, y2]);
  circlesGroup.add(circleB);


  // Mask it all up

  circlesGroup.fill('#fff');

  let myshape = group.rect(sqSize, sqSize);
  myshape.fill(accentColor);

  // const myClip = circlesGroup.clip().add(circleA).add(circleB);

  // myshape.clipWith(myClip);

  myshape.maskWith(circlesGroup);

  blobs.push(group);
}

// Grid code

let cols = Math.floor(width / sqSize);
let rows = Math.floor(height / sqSize);

let startX = (width - (cols * sqSize)) / 2;
let startY = (height - (rows * sqSize)) / 2;


for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    let currentShape = getRandomArrayElement(blobs).clone();

    let objscale = sqSize / currentShape.bbox().width * 0.979;

    currentShape.transform({
      position: [startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2],
      scale: objscale,
      rotate: getRandomIntInclusive(0, 3) * 90
    });

    // let squares = currentShape.find('rect');
    // squares.fill(getColor(colors));
    // squares.stroke({
    //   'color': accentColor,
    //   'width': 0.05
    // })

    let circles = currentShape.find('circle');
    // circles.stroke({
    //   'color': '#fff',
    //   'width': 0.1
    // })

    draw.add(currentShape);
  }
}
