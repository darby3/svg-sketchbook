import {
  GridAttrs,
  getRandomIntInclusive,
  coinFlip,
  getRandomArrayElement,
  getRandom
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

console.log("grid-5 active");

const draw = SVG('#grid-5-svg');

const width = draw.width();
const height = draw.height();

const sqSize = 100;

// Grid code

const myGrid = new GridAttrs(width, height, sqSize).createXCoords().createYCoords().centerIt();

console.dir(myGrid);

for (let y = 0; y < myGrid.rows; y++) {
  for (let x = 0; x < myGrid.cols; x++) {
    // let scaleFactor = getRandom();
    let scaleFactor = 1

    let circle = draw.circle(sqSize * 2 * scaleFactor, sqSize * 2 * scaleFactor)
      .cx(myGrid.centeredXCoords[x] + sqSize / 2)
      .cy(myGrid.centeredYCoords[y] + sqSize / 2)
      .fill(getRandomArrayElement(colors))
      .stroke({
        color: '#fff',
        width: 20
      })
      .opacity(0.25)
      .addClass('back');
  }
}

for (let y = 0; y < myGrid.rows; y++) {
  for (let x = 0; x < myGrid.cols; x++) {
    let circle = draw.circle(sqSize, sqSize)
      .cx(myGrid.centeredXCoords[x] + sqSize / 2)
      .cy(myGrid.centeredYCoords[y] + sqSize / 2)
      .fill(getRandomArrayElement(colors))
      .opacity(0.5)
      .transform({
        scale: 0.9
      })
      .stroke({
        color: "#fff",
        width: 5,
        opacity: 0.5
      })
      .addClass('front');
  }
}

