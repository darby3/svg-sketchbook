import {
  coinFlip,
  getRandom,
  getRandomInt,
  getRandomIntInclusive,
  createColor
} from "./utils-v1.js";

console.log("tires-7 active");

const width = 400;
const height = 300;

const draw = SVG().addTo('#tires-7 .container')
  .size(width, height)
  .viewbox(0, 0, width, height);

const bgOn = coinFlip();

if (bgOn) {
  const bg = draw.rect(width, height).fill('#ffffef');
} else {
  const bg = draw.rect(width, height).fill('#eeffff');
}

let y = 0;

for (let rows = 0; rows < 5; rows++) {
  const count = getRandomInt(10, 1000);
  const rects = [];

  const w = width / count;

  let x = 0;

  for (let i = 0; i < count; i++) {
    const h = getRandomIntInclusive(0, height - y);

    const alpha = getRandom() / 4;
    const color = createColor(1);

    rects[i] = draw.rect(w + 10, h)
      .attr({
        fill: color,
        x: x,
        y: y,
      })
      .opacity(alpha);

    x += w;
  }

  y = y + getRandomInt(0, height - y);
}
