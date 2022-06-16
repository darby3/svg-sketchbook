import {
  getRandomInt,
  getRandomIntInclusive,
} from "./utils-v1.js";

console.log("paths-4 active");

const draw = SVG('#paths-4-svg');

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

function smoothControlledClosedCurveTo(c1, c2, x, y) {
  let pathData = "S";

  pathData += `${c1},${c2} ${x},${y}`;

  return pathData;
}

function makeFourPoints(size) {
  let midX = size / 2;
  let midY = size / 2;

  let ul = [getRandomInt(0, midX), getRandomInt(0, midY)]
  let ur = [getRandomInt(midX, size), getRandomInt(0, midY)]
  let ll = [getRandomInt(0, midX), getRandomInt(midY, size)]
  let lr = [getRandomInt(midX, size), getRandomInt(midY, size)]

  return [ul, ur, ll, lr];
}

function makeCurvedPath() {
  // Get our points

  let [ul, ur, ll, lr] = makeFourPoints(sqSize);
  let [cul, cur, cll, clr] = makeFourPoints(sqSize);

  // Start point

  let [startX, startY] = ul;
  let stringData = startPoint(startX, startY);

  // Segments

  stringData += smoothControlledClosedCurveTo(cur[0], cur[1], ur[0], ur[1]);
  stringData += smoothControlledClosedCurveTo(clr[0], clr[1], lr[0], lr[1]);
  stringData += smoothControlledClosedCurveTo(cll[0], cll[1], ll[0], ll[1]);
  stringData += smoothControlledClosedCurveTo(cul[0], cul[1], ul[0], ul[1]);

  // Close it up

  stringData += 'z';

  return stringData;
}



let myPath = draw.path(makeCurvedPath());

myPath.fill('#009999');
myPath.opacity(0.5);

myPath.cx(width * 0.25);
myPath.cy(height / 2);
myPath.transform({
  rotate: 180
})

let myPath2 = draw.path(makeCurvedPath(2));

myPath2.fill('#009999');
myPath2.opacity(0.5);

myPath2.cx(width * 0.75);
myPath2.cy(height / 2);

let myPath3 = draw.path(makeCurvedPath(2));

myPath3.fill('#009999');
myPath3.opacity(0.5);

myPath3.cx(width * 0.5);
myPath3.cy(height / 2);
myPath3.transform({
  rotate: 90
})
