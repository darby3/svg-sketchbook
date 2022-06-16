import {
  getRandomIntInclusive,
} from "./utils-v1.js";

console.log("paths-1 active");

const draw = SVG('#paths-1-svg');

const width = draw.width();
const height = draw.height();

const sqSize = Math.min(width, height);

// draw.path('M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z')

function randomPoint(max) {
  let x1 = getRandomIntInclusive(0, max);
  let y1 = getRandomIntInclusive(0, max);

  return [x1, y1];
}

function startPoint() {
  let pathData = "M";

  let [x1, y1] = randomPoint(sqSize);

  pathData += `${x1} ${y1}`;

  return pathData;
}

function lineTo() {
  let pathData = "L";

  let [x1, y1] = randomPoint(sqSize);

  pathData += `${x1} ${y1}`;

  return pathData;
}


function makePath(segments) {
  let stringData = startPoint();

  for (let i = 0; i < segments; i++) {
    stringData += lineTo();
  }

  stringData += 'z';

  return stringData;
}

let myPath = draw.path(makePath(5));

myPath.fill('#00ff00');

myPath.cx(width * 0.25);
myPath.cy(height / 2);

let myPath2 = draw.path(makePath(5));

myPath2.fill('#0000ff');

myPath2.cx(width * 0.75);
myPath2.cy(height / 2);

let myPath3 = draw.path(makePath(5));

myPath3.fill('#009999');
myPath3.opacity(0.5);

myPath3.cx(width * 0.5);
myPath3.cy(height / 2);
