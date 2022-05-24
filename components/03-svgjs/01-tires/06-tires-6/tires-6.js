import { coinFlip, getRandom, getRandomInt, getRandomIntInclusive, createColor } from "./utils-v1.js";

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("tires-6 active");

    const width = 400;
    const height = 300;

    const draw = SVG().addTo('#tires-6 .container')
      .size(width, height)
      .viewbox(0, 0, width, height);

    const bgOn = coinFlip();

    if (bgOn) {
      const bg = draw.rect(width, height).fill('#ffffef');
    } else {
      const bg = draw.rect(width, height).fill('#eeffff');
    }

    const count = getRandomInt(10, 20);
    const rects = [];

    const w = width / count;
    const y = getRandomInt(0, height / 2);

    let x = 0;

    for (let i = 0; i < count; i++) {
      const h = getRandomIntInclusive(0, height - y);

      const alpha = getRandom() / 2 + 0.2;
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
  });
})();
