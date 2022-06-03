import {
  getRandomInt,
  getRandomIntInclusive,
  shuffleArray
} from "./utils-v1.js";

const colors = [
  "#511259",
  "#553159",
  "#696273",
  "#F2EDA2",
  "#8C846C",
]

function getColor(colors) {
  return colors[getRandomIntInclusive(0, colors.length - 1)];
}

console.log("shapes-2 active");

const width = 400;
const height = 300;

const draw = SVG('#shapes-2-svg');

const triangle1 = draw.use("triangle").attr({
  fill: getColor(colors)
}).x(0).y(0).width(50).height(50);

const square1 = draw.use("square").attr({
  fill: getColor(colors)
}).x(50).y(0).width(50).height(50);

const pentagon1 = draw.use("pentagon").attr({
  fill: getColor(colors)
}).x(100).y(0).width(50).height(50);

const triangle = draw.use("triangle").attr({
  fill: getColor(colors)
}).x(100).y(200).width(50).height(50).rotate(45);

const square = draw.use("square").attr({
  fill: getColor(colors)
}).x(200).y(100).width(50).height(50).rotate(45);

const pentagon = draw.use("pentagon").attr({
  fill: getColor(colors)
}).x(300).y(15).width(50).height(50).rotate(45);
