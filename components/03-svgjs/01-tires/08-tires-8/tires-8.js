import {
  coinFlip,
  getRandom,
  getRandomInt,
  getRandomIntInclusive,
  createColor
} from "./utils-v1.js";

console.log("tires-8 active");

const width = 400;
const height = 300;

const draw = SVG().addTo('#tires-8 .container')
  .size(width, height)
  .viewbox(0, 0, width, height);

const bgOn = coinFlip();

if (bgOn) {
  const bg = draw.rect(width, height).fill('#ffffef');
} else {
  const bg = draw.rect(width, height).fill('#eeffff');
}

let y = 0;
const numRows = getRandomIntInclusive(5, 10);
const rowHeight = height / numRows;
const alpha = getRandom();
let count = getRandomInt(20, 50);

for (let rows = 0; rows < numRows; rows++) {
  const rects = [];

  const w = width / count;

  let x = 0;

  for (let i = 0; i < count; i++) {
    const h = getRandomIntInclusive(0, rowHeight);

    const color = createColor(1);

    rects[i] = draw.rect(w, h)
      .attr({
        fill: color,
        x: x,
        y: y,
      })
      .opacity(alpha);

    x += w;
  }

  y = y + rowHeight;

  const sub = getRandomIntInclusive(1, count / 4);
  if (count - sub >= 1) {
    count = count - sub;
  }
  console.log({sub, count});
}
