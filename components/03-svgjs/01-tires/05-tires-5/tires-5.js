import { coinFlip, getRandom, getRandomInt, getRandomIntInclusive, createColor } from "./utils-v1.js";

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("tires-5 active");

    const width = 400;
    const height = 300;

    const draw = SVG().addTo('#tires-5 .container')
      .size(width, height)
      .viewbox(0, 0, width, height);

    const bgOn = coinFlip();

    if (bgOn) {
      const bg = draw.rect(width, height).fill('#ffffef');
    } else {
      const bg = draw.rect(width, height).fill('#eeffff');
    }

    const count = getRandomInt(10, 100);

    const rects = [];

    for (let i = 0; i < count; i++) {
      const x = getRandomInt(0, width);
      const y = getRandomInt(0, height);

      const w = getRandomIntInclusive(0, width - x) / 2;
      const h = getRandomIntInclusive(0, height - y) / 2;

      const alpha = getRandom() / 2;
      const color = createColor(1);

      rects[i] = draw.rect(w, h)
        .attr({
          fill: color,
          x: x,
          y: y,
        })
        .opacity(alpha);
    }
  });
})();
