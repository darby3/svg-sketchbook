import {
  coinFlip,
  getRandomIntInclusive,
  getRandomArrayElement
} from "./utils-v1.js";

console.log("paths-10 active");

const colors = [
  "#ffffff",
  "#70948a",
  "#9F9FA5",
  "#B7C4C4",
  "#E4E8E8",
  "#D8A2AF",
]

const draw = SVG('#paths-10-svg');

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

function lineTo(x, y) {
  let pathData = "L";

  pathData += `${x} ${y}`;

  return pathData;
}

function smoothClosedCurveTo(x, y) {
  let pathData = "S";

  let c1 = x + getRandomIntInclusive(-50, 50);
  let c2 = y + getRandomIntInclusive(0, height * 0.5);

  pathData += `${c1},${c2} ${x},${y}`;

  return pathData;
}

function smoothControlledClosedCurveTo(x, y, cx, cy) {
  let pathData = "S";

  pathData += `${cx},${cy} ${x},${y}`;

  return pathData;
}

function smoothFullControlledClosedCurveTo(x, y, cx1, cy1, cx2, cy2) {
  let pathData = "C";

  pathData += `${cx1},${cy1} ${cx2},${cy2} ${x},${y}`;

  return pathData;
}


function defineAllPoints(w, h) {
  // Left, right, and middle anchor points
  let xL = 0;
  let xR = w;
  let xMid = w * 0.5;

  // The vertical middle of our wave
  let yMid = h * 0.5;

  // The vertical position of the mid-wave anchor points,
  let yDiff = getRandomIntInclusive(h * 0.01, h * 0.2);
  let y1 = yMid - yDiff;
  let y2 = yMid + yDiff;

  // "Scootch" our wave anchor points in equally on all sides
  let xDiff = getRandomIntInclusive(w * 0.1, w * 0.2);
  let cx1 = xL + xDiff;
  let cx2 = xMid - xDiff;
  let cx3 = xMid + xDiff;
  let cx4 = xR - xDiff;

  // Vertical positioning of the control points
  let yControlDiff = getRandomIntInclusive(h * 0.1, h * 0.2);
  let cy1 = y1 - yControlDiff;
  let cy2 = y1 + yControlDiff;
  let cy3 = y2 + yControlDiff;
  let cy4 = y2 - yControlDiff;

  return {
    "xL": xL,
    "xR": xR,
    "xMid": xMid,
    "yMid": yMid,
    "yDiff": yDiff,
    "y1": y1,
    "y2": y2,
    "xDiff": xDiff,
    "cx1": cx1,
    "cx2": cx2,
    "cx3": cx3,
    "cx4": cx4,
    "yControlDiff": yControlDiff,
    "cy1": cy1,
    "cy2": cy2,
    "cy3": cy3,
    "cy4": cy4,
  }
}

let rect = draw.rect(width, height).fill(getRandomArrayElement(colors)).opacity(0.25);

let numWaves = 10;
let waveHeight = height / numWaves;

for (let waves = 0; waves < numWaves; waves++) {
  let p = defineAllPoints(width, height);
  
  console.dir(p);

  // Start
  let stringData = startPoint(p.xL, p.yMid);

  // Make a wave
  stringData += smoothFullControlledClosedCurveTo(p.xMid, p.y1, p.cx1, p.cy1, p.cx2, p.cy1);
  stringData += smoothControlledClosedCurveTo(p.xR, p.yMid, p.cx4, p.cy2);

  // Reverse the wave
  stringData += smoothFullControlledClosedCurveTo(p.xMid, p.y2, p.cx4, p.cy3, p.cx3, p.cy3);
  stringData += smoothControlledClosedCurveTo(p.xL, p.yMid, p.cx1, p.cy4);


  let myPath = draw.path(stringData);

  myPath.fill(getRandomArrayElement(colors));
  myPath.opacity(0.5);

  myPath.stroke({
    color: '#fff',
    width: 2
  });

  myPath.addClass('wave');
}

draw.find('.wave').each(el => {
  if (coinFlip()) {
    el.backward();
  } else if (coinFlip()) {
    el.back();
  }

  el.cy(getRandomIntInclusive(0, height));

  el.transform({
    rotate: getRandomIntInclusive(0, 180)
  })
})
