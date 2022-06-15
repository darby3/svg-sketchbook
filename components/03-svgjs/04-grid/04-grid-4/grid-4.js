import {
  GridAttrs,
  getRandomIntInclusive,
  coinFlip,
  getRandomArrayElement
} from "./utils-v1.js";

const colors = [
  "#70948a",
  "#9F9FA5",
  "#B7C4C4",
  "#E4E8E8",
  "#D8A2AF",
]

const accentColors = [
  "#634a51",
  "#8b7272",
  "#a19191",
  "#6f6f69",
  "#4ab299",
]

console.log("grid-4 active");

const draw = SVG('#grid-4-svg');

const width = draw.width();
const height = draw.height();

const sqSize = 100;

// Grid code

const myGrid = new GridAttrs(width, height, sqSize).createXCoords().createYCoords().centerIt();

console.dir(myGrid);

for (let y = 0; y < myGrid.rows; y++) {
  for (let x = 0; x < myGrid.cols; x++) {
    let rect = draw.rect(sqSize * 2, sqSize * 2)
      .x(myGrid.centeredXCoords[x])
      .y(myGrid.centeredYCoords[y])
      .fill(getRandomArrayElement(colors))
      .stroke({
        color: '#fff',
        width: 20
      })
      .transform({
        scale: 0.7,
        rotate: 45,
      })
      .opacity(0.5)
      .addClass('back');
  }
}

for (let y = 0; y < myGrid.rows; y++) {
  for (let x = 0; x < myGrid.cols; x++) {
    let rect = draw.rect(sqSize, sqSize)
      .x(myGrid.centeredXCoords[x])
      .y(myGrid.centeredYCoords[y])
      .fill(getRandomArrayElement(colors))
      .opacity(0.5)
      .stroke({
        color: "#fff",
        width: 1
      })
      .transform({
        scale: 0.7,
        rotate: 45,
      })
      .addClass('front');
  }
}

draw.find('.back').each(el => {
  if (coinFlip()) {
    el.backward();
  } else if (coinFlip()) {
    el.back();
  }
})
