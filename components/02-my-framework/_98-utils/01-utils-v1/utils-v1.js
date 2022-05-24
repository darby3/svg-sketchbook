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

export {coinFlip, getRandom, getRandomInt, createColor, getRandomIntInclusive}
