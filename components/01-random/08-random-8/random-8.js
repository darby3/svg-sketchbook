(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("random-8 active");

    function coinFlip() {
      return Math.floor(Math.random() * 2);
    }

    const container = document.querySelector('#random-8');

    const svgAttrs = {
      width: 1024,
      height: 768
    }

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    container.appendChild(svgOutput);

    const arrayOfLines = [];

    // left-right lines
    const lineSpacing = 10;
    const numberOfLines = svgAttrs.height / lineSpacing;

    let curY = lineSpacing / 2;

    for (let i = 1; i < numberOfLines; i++) {
      // instead of keeping y the same we're going to add a random number to both the x and y start values

      let randomFactor = Math.floor(Math.random() * (1000 - 50) + 50);
      if (coinFlip()) {
        randomFactor = randomFactor * -1;
      }

      const y1 = curY;
      const y2 = y1 + randomFactor;
      const x1 = Math.random() * svgAttrs.width;
      const x2 = x1 + randomFactor;

      const lineOne = document.createElementNS("http://www.w3.org/2000/svg", "line");

      lineOne.setAttributeNS(null, 'x1', x1);
      lineOne.setAttributeNS(null, 'y1', y1);
      lineOne.setAttributeNS(null, 'x2', x2);
      lineOne.setAttributeNS(null, 'y2', y2);

      const opacity = Math.random();
      lineOne.setAttributeNS(null, 'stroke-opacity', opacity);

      const strokeWidth = Math.floor(Math.random() * (lineSpacing - 1) + 1);
      lineOne.setAttributeNS(null, 'stroke-width', strokeWidth);

      const grayScale = Math.floor(Math.random() * (256 - 10) + 10);
      lineOne.setAttributeNS(null, 'stroke', `rgb(${grayScale}, ${grayScale}, ${grayScale})`);

      arrayOfLines.push(lineOne);

      curY = curY + lineSpacing;
    }

    // up-down lines
    const numberOfUpDownLines = svgAttrs.width / lineSpacing;

    let curX = lineSpacing / 2;

    for (let i = 1; i < numberOfUpDownLines; i++) {
      // instead of keeping x the same we're going to add a random number to both the x and y start values

      let randomFactor = Math.floor(Math.random() * (1000 - 50) + 50);
      if (coinFlip()) {
        randomFactor = randomFactor * -1;
      }

      const x1 = curX;
      const x2 = x1 + randomFactor;
      const y1 = Math.random() * svgAttrs.height;
      const y2 = y1 - randomFactor;

      const lineOne = document.createElementNS("http://www.w3.org/2000/svg", "line");

      lineOne.setAttributeNS(null, 'x1', x1);
      lineOne.setAttributeNS(null, 'y1', y1);
      lineOne.setAttributeNS(null, 'x2', x2);
      lineOne.setAttributeNS(null, 'y2', y2);

      const opacity = Math.random();
      lineOne.setAttributeNS(null, 'stroke-opacity', opacity);

      const strokeWidth = Math.floor(Math.random() * (lineSpacing - 2) + 2);
      lineOne.setAttributeNS(null, 'stroke-width', strokeWidth);

      const redScale = Math.floor(Math.random() * (256 - 10) + 10);
      lineOne.setAttributeNS(null, 'stroke', `rgb(${redScale}, 0, 0`);

      arrayOfLines.push(lineOne);

      curX = curX + lineSpacing;
    }

    arrayOfLines.forEach((line) => svgOutput.appendChild(line));
  });
})();
