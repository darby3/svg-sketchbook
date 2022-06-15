import {
  GridAttrs,
  getRandomIntInclusive,
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

console.log("grid-2 active");

const draw = SVG('#grid-2-svg');

const width = draw.width();
const height = draw.height();

const sqSize = 100;

// Grid code

const myGrid = new GridAttrs(width, height, sqSize).createXCoords().createYCoords().centerIt();

console.dir(myGrid);

for (let y = 0; y < myGrid.rows; y++) {
  for (let x = 0; x < myGrid.cols; x++) {
    let rect = draw.rect(sqSize, sqSize)
      .x(myGrid.centeredXCoords[x])
      .y(myGrid.centeredYCoords[y])
      .fill(getRandomArrayElement(colors))
      .stroke(getRandomArrayElement(accentColors))
      .transform({
        scale: 0.7,
        rotate: 45
      });
  }
}

for (let biggies = 0; biggies < 15; biggies++) {
  let x = getRandomArrayElement(myGrid.centeredXCoords);
  let y = getRandomArrayElement(myGrid.centeredYCoords);

  let scaleFactor = getRandomIntInclusive(2, 4);

  let rect = draw.rect(sqSize * scaleFactor, sqSize * scaleFactor)
    .x(x)
    .y(y)
    .fill(getRandomArrayElement(accentColors))
    .opacity(0.25)
    .stroke({
      color: '#fff',
      width: 20
    })
    .transform({
      scale: 0.7,
      rotate: 45
    });
}
