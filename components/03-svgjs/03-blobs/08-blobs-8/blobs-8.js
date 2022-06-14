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

console.log("blobs-8 active");

const draw = SVG('#blobs-8-svg');

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

  // Create a group

  const group = defs.group();

  // Create a square inside the group

  let curSquare = group.rect(sqSize, sqSize);

  curSquare.stroke({
    'width': 0.05
  })
  curSquare.addClass('background');

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

  // alt

  let circlesGroupB = circlesGroup.clone().transform({
    scale: 0.95
  })

  // Mask it all up

  circlesGroup.fill('#fff');
  circlesGroupB.fill('#000');

  // and we need a fill shape

  let otherGroup = circlesGroup.clone();

  let myshape2 = group.rect(sqSize, sqSize);

  myshape2.maskWith(otherGroup);

  myshape2.addClass('fill');

  // and a strokey shape

  let finalGroup = defs.group();
  finalGroup.add(circlesGroup);
  finalGroup.add(circlesGroupB);

  let myshape = group.rect(sqSize, sqSize);
  myshape.fill("#fff");
  myshape.addClass('stroke')

  myshape.maskWith(finalGroup);

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
    let bgColor = getColor(colors);
    let accentColor = getColor(circleColors);

    let objscale = sqSize / currentShape.bbox().width * 0.979;

    currentShape.transform({
      position: [startX + c * sqSize + sqSize / 2, startY + r * sqSize + sqSize / 2],
      scale: objscale,
      rotate: getRandomIntInclusive(0, 3) * 90
    });

    currentShape.find('.background').fill(getColor(colors));
    currentShape.find('.fill').fill(getColor(circleColors));
    currentShape.find('.stroke').fill(getColor(colors)).opacity(1);

    draw.add(currentShape);
  }
}
