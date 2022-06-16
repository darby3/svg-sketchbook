import {
  coinFlip,
  getRandomIntInclusive,
  getRandomArrayElement
} from "./utils-v1.js";

console.log("paths-7 active");

const colors = [
  "#ffffff",
  "#70948a",
  "#9F9FA5",
  "#B7C4C4",
  "#E4E8E8",
  "#D8A2AF",
]

const draw = SVG('#paths-7-svg');

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

let rect = draw.rect(width, height).fill('#00abab').opacity(0.1);

let numWaves = 10;
let waveHeight = height / numWaves;

for (let waves = 0; waves < numWaves; waves++) {
  let curY = waves * waveHeight;
  let yLine = getRandomIntInclusive(curY, curY + waveHeight);

  console.log({curY, yLine});

  let x1 = 0;
  let x2 = width;
  let xMid = getRandomIntInclusive(width * 0.25, width * 0.75);

  // Start
  let stringData = startPoint(x1, yLine);

  // Make a wave
  stringData += smoothClosedCurveTo(x1, yLine);
  stringData += smoothClosedCurveTo(xMid, yLine);
  stringData += smoothClosedCurveTo(x2, yLine);

  // Reverse the wave?
  stringData += lineTo(x2, yLine);
  stringData += smoothClosedCurveTo(x2, yLine);
  stringData += smoothClosedCurveTo(xMid, yLine);
  stringData += smoothClosedCurveTo(x1, yLine);

  let myPath = draw.path(stringData);

  myPath.fill(getRandomArrayElement(colors));
  myPath.opacity(0.75);

  myPath.stroke({
    color: '#FFF',
    width: 1,
    opacity: 0.5
  });

  myPath.addClass('wave');
}

draw.find('.wave').each(el => {
  if (coinFlip()) {
    el.backward();
  } else if (coinFlip()) {
    el.back();
  }
})
