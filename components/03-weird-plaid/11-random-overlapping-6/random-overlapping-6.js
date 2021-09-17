(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("random-overlapping-6 active");

    const container = document.querySelector('#random-overlapping-6');

    const targetResolution = {
      width: 2560,
      height: 1440
    };

    const svgAttrs = {
      width: targetResolution.width / 2,
      height: targetResolution.height / 2
    }

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    container.appendChild(svgOutput);

    svgOutput.style.setProperty("--svgWidth", `${svgAttrs.width}px`);
    svgOutput.style.setProperty("--svgHeight", `${svgAttrs.height}px`);

    // helper functions

    // Shuffle array: https://stackoverflow.com/a/6274381/2900883
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function coinFlip() {
      return Math.floor(Math.random() * 2);
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function getSize(avail) {
      return Math.floor(avail * getRandomArbitrary(0.1, 0.15));
    }

    // Rect objects

    function Rect(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.stroke = 0;
    }

    Rect.prototype.colorMeIn = function () {
      this.redScale = getRandomArbitrary(15, 10);
      this.greenScale = getRandomArbitrary(100, 75);
      this.blueScale = getRandomArbitrary(255, 200);

      return this;
    }

    Rect.prototype.draw = function (opacity) {
      const newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      newRect.setAttributeNS(null, 'x', this.x);
      newRect.setAttributeNS(null, 'y', this.y);
      newRect.setAttributeNS(null, 'width', this.width);
      newRect.setAttributeNS(null, 'height', this.height);
      newRect.setAttributeNS(null, 'stroke-width', "0");
      newRect.setAttributeNS(null, 'fill', `rgb(${this.redScale}, ${this.greenScale}, ${this.blueScale})`);

      if (opacity) {
        newRect.setAttributeNS(null, 'fill-opacity', opacity);
      } else {
        newRect.setAttributeNS(null, 'fill-opacity', getRandomArbitrary(0.25, 0.75));
      }

      svgOutput.appendChild(newRect);
    }

    // Gimme a background rect

    const backgroundRect = new Rect(0, 0, svgAttrs.width, svgAttrs.height);
    backgroundRect.redScale = 0;
    backgroundRect.greenScale = 70;
    backgroundRect.blueScale = 0;
    backgroundRect.draw(1);

    // Let's set up a grid of x/y values to base rectangles on.

    const numberOfRects = getRandomInt(15, 45);

    const xCoords = [];
    const yCoords = [];

    const xDelta = svgAttrs.width / numberOfRects;
    const yDelta = svgAttrs.height / numberOfRects;

    for (let i = 0; i < numberOfRects; i++) {
      xCoords.push(i * xDelta);
      yCoords.push(i * yDelta);
    }

    // Now lets shake the grid up a bit

    for (let i = 1; i < xCoords.length; i++) {
      const diff = getRandomArbitrary(-0.5, 0.5);
      xCoords[i] = xCoords[i] + diff * xDelta;
    }

    for (let i = 1; i < yCoords.length; i++) {
      const diff = getRandomArbitrary(-0.5, 0.5);
      yCoords[i] = yCoords[i] + diff * yDelta;
    }

    // vertical rects

    let verticalRects = [];

    for (let i = 0; i < numberOfRects; i++) {
      let width;

      if (xCoords[i + 1]) {
        console.log("yes");
        width = xCoords[i + 1] - xCoords[i];
      } else {
        console.log("no");
        width = svgAttrs.width - xCoords[i];
      }

      const newestRect = new Rect(xCoords[i], 0, width, svgAttrs.height);
      verticalRects.push(newestRect);
    }

    // horizontal rects

    let horizontalRects = [];

    for (let i = 0; i < numberOfRects; i++) {
      let height;

      if (yCoords[i + 1]) {
        console.log("yes");
        height = yCoords[i + 1] - yCoords[i];
      } else {
        console.log("no");
        height = svgAttrs.height - yCoords[i];
      }

      const newestRect = new Rect(0, yCoords[i], svgAttrs.width, height);
      horizontalRects.push(newestRect);
    }

    // Shuffle our arrays
    shuffle(horizontalRects);
    shuffle(verticalRects);

    // Start drawing things

    for (let i = 0; i < numberOfRects; i++) {
      if (coinFlip()) {
        if (verticalRects[i]) {
          verticalRects[i].colorMeIn().draw();
        }
        if (horizontalRects[i]) {
          horizontalRects[i].colorMeIn().draw();
        }
      } else {
        if (horizontalRects[i]) {
          horizontalRects[i].colorMeIn().draw();
        }
        if (verticalRects[i]) {
          verticalRects[i].colorMeIn().draw();
        }
      }
    }
  });
})();
