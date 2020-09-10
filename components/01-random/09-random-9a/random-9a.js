(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("random-9a active");

    function coinFlip() {
      return Math.floor(Math.random() * 2);
    }

    const container = document.querySelector('#random-9a');

    const svgAttrs = {
      width: 1024,
      height: 768
    }

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    // svgOutput.setAttributeNS(null, "width", `${svgAttrs.width}`);
    // svgOutput.setAttributeNS(null, "height", `${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");
    svgOutput.setAttributeNS(null, "overflow", "hidden");

    container.appendChild(svgOutput);

    const rectOne = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    rectOne.setAttributeNS(null, 'x', 5);
    rectOne.setAttributeNS(null, 'y', 5);
    rectOne.setAttributeNS(null, 'width', svgAttrs.width - 10);
    rectOne.setAttributeNS(null, 'height', svgAttrs.height - 10);
    rectOne.setAttributeNS(null, 'stroke', "#323232");
    rectOne.setAttributeNS(null, 'fill', "#efefef");

    svgOutput.appendChild(rectOne);

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

      const strokeWidth = Math.floor(Math.random() * (lineSpacing * 4 - 1) + 1);
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

      const strokeWidth = Math.floor(Math.random() * (lineSpacing * 4 - 2) + 2);
      lineOne.setAttributeNS(null, 'stroke-width', strokeWidth);

      const blueScale = Math.floor(Math.random() * (256 - 10) + 10);
      lineOne.setAttributeNS(null, 'stroke', `rgb(0, ${blueScale}, ${blueScale * 0.85}`);

      arrayOfLines.push(lineOne);

      curX = curX + lineSpacing;
    }

    // See https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    shuffle(arrayOfLines);

    arrayOfLines.forEach((line) => svgOutput.appendChild(line));
  });
})();
