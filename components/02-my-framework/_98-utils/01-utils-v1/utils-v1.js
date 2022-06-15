const coinFlip = function () {
  return Math.floor(Math.random() * 2);
}

function getRandom() {
  return Math.random();
}

// The maximum is exclusive and the minimum is inclusive
const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// The maximum is inclusive and the minimum is inclusive
const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Make an RGB color
const createColor = function () {
  const r = getRandomInt(0, 256);
  const g = getRandomInt(0, 256);
  const b = getRandomInt(0, 256);

  return `rgb(${r}, ${g}, ${b})`;
}

// Shuffle array: https://stackoverflow.com/a/6274381/2900883
const shuffleArray = function (a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Grab something random from an array
function getRandomArrayElement(arr) {
  return arr[getRandomIntInclusive(0, arr.length - 1)];
}

// Let's set up a grid of x/y values to base rectangles on.

const GridAttrs = function (width, height, squareSize) {
  this.width = width;
  this.height = height;

  this.squareSize = squareSize;
  this.rowHeight = squareSize;
  this.colWidth = squareSize;

  this.rows = Math.floor(this.height / squareSize);
  this.cols = Math.floor(this.width / squareSize);

  this.xCoords = [];
  this.yCoords = [];

  this.xOffset = 0;
  this.yOffset = 0;
}

GridAttrs.prototype.createXCoords = function () {
  for (let i = 0; i < this.cols; i++) {
    this.xCoords.push(i * this.colWidth);
  }

  return this;
}

GridAttrs.prototype.createYCoords = function () {
  for (let i = 0; i < this.rows; i++) {
    this.yCoords.push(i * this.rowHeight);
  }

  return this;
}

GridAttrs.prototype.centerIt = function () {
  const extraX = this.width - this.colWidth * this.cols;
  const extraY = this.height - this.rowHeight * this.rows;

  this.xOffset = extraX / 2;
  this.yOffset = extraY / 2;

  this.centeredXCoords = this.xCoords.map(x => x + this.xOffset);
  this.centeredYCoords = this.yCoords.map(y => y + this.yOffset);

  return this;
}

export {
  coinFlip,
  getRandom,
  getRandomInt,
  createColor,
  getRandomIntInclusive,
  shuffleArray,
  GridAttrs,
  getRandomArrayElement
}
