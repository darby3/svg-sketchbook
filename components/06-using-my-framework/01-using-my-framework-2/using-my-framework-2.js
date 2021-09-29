(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("using-my-framework-2 active");

    // Create an SVG and append it to a selected container.

    const container = document.querySelector('#using-my-framework-2');

    const svgConfig = {
      container: container,
      debug: true
    }

    const _SB = SvgSB(svgConfig);

    // Make some rects and draw them all

    console.groupCollapsed();
    for (let i = 0; i < 25; i++) {
      const coords = _SB.getRandomXY();

      _SB.makeRect({
        x: coords.x,
        y: coords.y,
        wv: 255
      });
    }

    _SB.rects.forEach((rect) => {
      rect.draw();
    })
    console.groupEnd();

    console.groupCollapsed();
    for (let i = 0; i < 250; i++) {
      const coords1 = _SB.getRandomXY();
      const coords2 = _SB.getRandomXY();

      _SB.makeLine({
        x1: coords1.x,
        y1: coords1.y,
        x2: coords2.x,
        y2: coords2.y,
        wv: 100,
        sw: 0.25
      });
    }

    _SB.lines.forEach((line) => {
      line.draw();
    })
    console.groupEnd();

    // Very dumb animation to test my update function.

    let start;

    function step(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      if (elapsed > 100) {
        start = timestamp;

        const coords = _SB.getRandomXY();
        const i = _SB.getRandomInt(0, _SB.rects.length);

        _SB.rects[i].update(coords.x, coords.y);
      }

      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  });
})();
