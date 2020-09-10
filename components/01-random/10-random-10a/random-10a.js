(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("random-10a active");

    const container = document.querySelector('#random-10a');

    const svgAttrs = {
      width: 1000,
      height: 700
    }

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    container.appendChild(svgOutput);

    // helper functions

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    // vertical rects

    const numberOfRects = getRandomInt(10, 21);
    console.log(numberOfRects);

    let remainingWidth = svgAttrs.width;

    for (let i = 1; i <= numberOfRects; i++) {
      let currentWidth;

      if (i === numberOfRects) {
        currentWidth = remainingWidth;
      } else {
        currentWidth = Math.floor(remainingWidth * getRandomArbitrary(0.1, 0.5));
      }

      const rectOne = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rectOne.setAttributeNS(null, 'x', svgAttrs.width - remainingWidth);
      rectOne.setAttributeNS(null, 'y', 0);
      rectOne.setAttributeNS(null, 'width', currentWidth);
      rectOne.setAttributeNS(null, 'height', svgAttrs.height);
      rectOne.setAttributeNS(null, 'stroke-width', "0");

      const redScale = Math.floor(Math.random() * (256 - 10) + 10);
      const greenScale = Math.floor(Math.random() * (256 - 10) + 10);
      const blueScale = Math.floor(Math.random() * (256 - 10) + 10);
      rectOne.setAttributeNS(null, 'fill', `rgb(${redScale}, ${greenScale}, ${blueScale})`);
      rectOne.setAttributeNS(null, 'fill-opacity', getRandomArbitrary(0.25, 0.75));

      svgOutput.appendChild(rectOne);

      remainingWidth = remainingWidth - currentWidth;
    }

    // horizontal rects

    const numberOfHorizontalRects = getRandomInt(10, 21);
    console.log(numberOfHorizontalRects);

    let remainingHeight = svgAttrs.height;

    for (let i = 1; i <= numberOfHorizontalRects; i++) {
      let currentWidth;

      if (i === numberOfHorizontalRects) {
        currentHeight = remainingHeight;
      } else {
        currentHeight = Math.floor(remainingHeight * getRandomArbitrary(0.1, 0.5));
      }

      const rectOne = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rectOne.setAttributeNS(null, 'x', 0);
      rectOne.setAttributeNS(null, 'y', svgAttrs.height - remainingHeight);
      rectOne.setAttributeNS(null, 'width', svgAttrs.width);
      rectOne.setAttributeNS(null, 'height', currentHeight);
      rectOne.setAttributeNS(null, 'stroke-width', "0");

      const redScale = Math.floor(Math.random() * (256 - 10) + 10);
      const greenScale = Math.floor(Math.random() * (256 - 10) + 10);
      const blueScale = Math.floor(Math.random() * (256 - 10) + 10);
      rectOne.setAttributeNS(null, 'fill', `rgb(${redScale}, ${greenScale}, ${blueScale})`);
      rectOne.setAttributeNS(null, 'fill-opacity', getRandomArbitrary(0.25, 0.75));

      svgOutput.appendChild(rectOne);

      remainingHeight = remainingHeight - currentHeight;
    }
  });
})();
