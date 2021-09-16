(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("random-overlapping-2 active");

    const container = document.querySelector('#random-overlapping-2');

    const svgAttrs = {
      width: 500,
      height: 500
    }

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    container.appendChild(svgOutput);

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
      this.greenScale = getRandomArbitrary(255, 100);
      this.blueScale = getRandomArbitrary(255, 100);

      return this;
    }

    Rect.prototype.draw = function () {
      const newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      newRect.setAttributeNS(null, 'x', this.x);
      newRect.setAttributeNS(null, 'y', this.y);
      newRect.setAttributeNS(null, 'width', this.width);
      newRect.setAttributeNS(null, 'height', this.height);
      newRect.setAttributeNS(null, 'stroke-width', "0");
      newRect.setAttributeNS(null, 'fill', `rgb(${this.redScale}, ${this.greenScale}, ${this.blueScale})`);
      newRect.setAttributeNS(null, 'fill-opacity', getRandomArbitrary(0.1, 1));

      svgOutput.appendChild(newRect);
    }

    // vertical rects

    const numberOfRects = getRandomInt(15, 30);
    console.log(numberOfRects);

    let remainingWidth = svgAttrs.width;

    let verticalRects = [];

    for (let i = 1; i <= numberOfRects; i++) {
      let currentWidth;

      if (i === numberOfRects) {
        currentWidth = remainingWidth;
      } else {
        currentWidth = getSize(remainingWidth);
      }

      const newestRect = new Rect(svgAttrs.width - remainingWidth, 0, currentWidth, svgAttrs.height);
      verticalRects.push(newestRect);

      remainingWidth = remainingWidth - currentWidth;
    }

    // verticalRects.forEach((rect) => rect.colorMeIn().draw());

    // horizontal rects

    // const numberOfHorizontalRects = getRandomInt(10, 21);
    // console.log(numberOfHorizontalRects);

    let remainingHeight = svgAttrs.height;

    let horizontalRects = [];

    for (let i = 1; i <= numberOfRects; i++) {
      let currentHeight;

      if (i === numberOfRects) {
        currentHeight = remainingHeight;
      } else {
        currentHeight = getSize(remainingHeight);
      }

      const newestRect = new Rect(0, svgAttrs.height - remainingHeight, svgAttrs.width, currentHeight);
      horizontalRects.push(newestRect);

      remainingHeight = remainingHeight - currentHeight;
    }

    // horizontalRects.forEach((rect) => rect.colorMeIn().draw());

    // Shuffle our arrays
    shuffle(horizontalRects);
    shuffle(verticalRects);

    // Start drawing things

    for (let i = 0; i < numberOfRects; i++) {
      console.log(i);

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
