(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("using-my-framework active");

    // Create an SVG and append it to a selected container.

    const container = document.querySelector('#using-my-framework');

    const svgConfig = {
      container: container,
      targetResolution: {
        width: 1500,
        height: 1500
      },
      targetResolutionMultiplier: 0.5
    }

    const _SB = SvgSB(svgConfig);

    // Basic dumb rect shape, this should probably go away. Or maybe it has
    // utility as a quickdraw function, when we don't need a full object.

    _SB.svg.appendChild(_SB.drawRect(25, 25, 100));
    _SB.svg.appendChild(_SB.drawRect(200, 50, 200));

    // Create object-based rect shapes.

    const myRect = SvgSB.rect({
      x: 400,
      y: 400,
      svg: _SB.svg
    });

    const myOtherRect = SvgSB.rect({
      wv: 25,
      svg: _SB.svg
    });

    myRect.announce().draw();
    myOtherRect.draw().announce();

    // Make some rects and draw them all

    for (let i = 0; i < 5; i++) {
      const x = _SB.getRandomInt(0, _SB.svgAttrs.width);
      const y = _SB.getRandomInt(0, _SB.svgAttrs.height);

      _SB.makeRect(x, y, 255);
    }

    _SB.rects.forEach((rect) => {
      rect.draw().announce();
    })

    // Very dumb animation to test my update function.

    let start;

    function step(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      if (elapsed > 2000) {
        start = timestamp;
        (myRect.x === 300) ? myRect.update(400, 400) : myRect.update(300, 300);
      }

      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  });
})();
