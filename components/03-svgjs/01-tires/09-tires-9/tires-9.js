import {
  getRandomInt,
  getRandomIntInclusive,
  shuffleArray
} from "./utils-v1.js";

console.log("tires-9 active");

const width = 400;
const height = 300;

const draw = SVG().addTo('#tires-9 .container')
  .size(width, height)
  .viewbox(0, 0, width, height);

const gradient = draw.gradient('linear', function (add) {
  add.stop(0, '#808080')
  add.stop(1, '#404040')
}).from(0, 0).to(0, 1);

const bg = draw.rect(width, height).fill(gradient);

const barColors = [
  "#7595BF",
  "#8FB6D9",
  "#BAD9D9",
  "#A4BFA8",
]

const numRows = getRandomIntInclusive(5, 15);
const rowHeight = height / numRows;
let y = 0 - rowHeight * 0.5;
const alpha = 1;
let count = getRandomInt(20, 50);

for (let rows = 0; rows <= numRows; rows++) {
  const rects = [];

  const w = width / count;

  let x = 0;

  for (let i = 0; i < count; i++) {
    const h = getRandomIntInclusive(0, rowHeight * 1.5);

    const color = barColors[getRandomIntInclusive(0, barColors.length - 1)];

    rects[i] = new SVG.Rect({width: w + 10, height: h})
      .attr({
        fill: color,
        x: x,
        y: y + rowHeight - h,
      })
      .opacity(alpha)
      .stroke({
        color: '#f2f2f2',
        width: 0.25
      });

    x += w;
  }

  console.dir(rects);

  shuffleArray(rects);
  rects.forEach(el => el.addTo(draw));

  y = y + rowHeight;

  const sub = getRandomIntInclusive(1, count / 4);
  if (count - sub >= 1) {
    count = count - sub;
  }
  console.log({sub, count});
}
