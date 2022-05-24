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

//The maximum is inclusive and the minimum is inclusive
const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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

export {coinFlip, getRandom, getRandomInt, createColor, getRandomIntInclusive, shuffleArray}
