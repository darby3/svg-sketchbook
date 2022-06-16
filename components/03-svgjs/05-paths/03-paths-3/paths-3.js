import {
  getRandomIntInclusive,
} from "./utils-v1.js";

console.log("paths-3 active");

const draw = SVG('#paths-3-svg');

const width = draw.width();
const height = draw.height();

const sqSize = Math.min(width, height);

// draw.path('M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z')

function randomPoint(max) {
  let x1 = getRandomIntInclusive(0, max);
  let y1 = getRandomIntInclusive(0, max);

  return [x1, y1];
}

function startPoint(x1, y1) {
  let pathData = "M";

  pathData += `${x1} ${y1}`;

  return pathData;
}

function lineTo() {
  let pathData = "L";

  let [x1, y1] = randomPoint(sqSize);

  pathData += `${x1} ${y1}`;

  return pathData;
}

function smoothCurveTo() {
  let pathData = "S";

  let [c1, c2] = randomPoint(sqSize);
  let [x1, y1] = randomPoint(sqSize);

  pathData += `${c1},${c2} ${x1},${y1}`;

  return pathData;
}

function smoothClosedCurveTo(x, y) {
  let pathData = "S";

  let [c1, c2] = randomPoint(sqSize);

  pathData += `${c1},${c2} ${x},${y}`;

  return pathData;
}

function makeCurvedPath(segments) {
  // Start point

  let [startX, startY] = randomPoint(sqSize);
  let stringData = startPoint(startX, startY);

  // Segments

  for (let i = 0; i < segments; i++) {
    stringData += smoothCurveTo();
  }

  // Close it up

  stringData += smoothClosedCurveTo(startX, startY);

  stringData += 'z';

  return stringData;
}



let myPath = draw.path(makeCurvedPath(2));

myPath.fill('#00ff00');

myPath.cx(width * 0.25);
myPath.cy(height / 2);

let myPath2 = draw.path(makeCurvedPath(2));

myPath2.fill('#0000ff');

myPath2.cx(width * 0.75);
myPath2.cy(height / 2);

let myPath3 = draw.path(makeCurvedPath(2));

myPath3.fill('#009999');
myPath3.opacity(0.5);

myPath3.cx(width * 0.5);
myPath3.cy(height / 2);
