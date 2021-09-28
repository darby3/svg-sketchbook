(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("using-my-framework active");

    const _SB = SvgSB();

    const container = document.querySelector('#using-my-framework');

    const targetResolution = {
      width: 1500,
      height: 1500
    };

    const svgAttrs = {
      width: targetResolution.width / 2,
      height: targetResolution.height / 2
    }

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    container.appendChild(svgOutput);

    container.style.setProperty("--svgWidth", `${svgAttrs.width}px`);
    container.style.setProperty("--svgHeight", `${svgAttrs.height}px`);

    // basic dumb rect shape

    svgOutput.appendChild(_SB.drawRect(25, 25, 100));
    svgOutput.appendChild(_SB.drawRect(200, 50, 200));

    // fancy object rect shape

    const myRect = SvgSB.rect({
      x: 400,
      y: 400,
      svg: svgOutput
    });

    myRect.draw().announce();

    const myOtherRect = SvgSB.rect({
      wv: 25,
      svg: svgOutput
    });

    myOtherRect.draw().announce();

    // dumb animation to test my update function

    let start, previousTimeStamp;

    function step(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      if (elapsed > 2000) {
        start = timestamp;

        if (myRect.x === 300) {
          myRect.update(400, 400);
        } else {
          myRect.update(300, 300);
        }
      }

      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  });
})();
