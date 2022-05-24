import * as utils from './utils-v1.js';

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("tires-4 active");

    const width = 400;
    const height = 300;

    const draw = SVG().addTo('#tires-4 .container')
      .size(width, height)
      .viewbox(0, 0, width, height);

    const x = utils.getRandomInt(0, width);
    const y = utils.getRandomInt(0, height);

    const w = utils.getRandomInt(0, width - x);
    const h = utils.getRandomInt(0, height - y);

    const color = utils.makeColor();

    const rect = draw.rect(w, h)
      .attr({
        fill: color,
        x: x,
        y: y
      });
  });
})();
