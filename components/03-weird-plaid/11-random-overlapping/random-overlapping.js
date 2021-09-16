(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("random-overlapping active");

    const container = document.querySelector('#random-overlapping');

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

    // Rect objects

    function Rect(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.stroke = 0;
    }

    Rect.prototype.colorMeIn = function() {
      this.redScale = Math.floor(Math.random() * (256 - 10) + 10);
      this.greenScale = Math.floor(Math.random() * (256 - 10) + 10);
      this.blueScale = Math.floor(Math.random() * (256 - 10) + 10);

      return this;
    }

    Rect.prototype.draw = function() {
      const newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      newRect.setAttributeNS(null, 'x', this.x);
      newRect.setAttributeNS(null, 'y', this.y);
      newRect.setAttributeNS(null, 'width', this.width);
      newRect.setAttributeNS(null, 'height', this.height);
      newRect.setAttributeNS(null, 'stroke-width', "0");
      newRect.setAttributeNS(null, 'fill', `rgb(${this.redScale}, ${this.greenScale}, ${this.blueScale})`);
      newRect.setAttributeNS(null, 'fill-opacity', getRandomArbitrary(0.25, 0.75));

      svgOutput.appendChild(newRect);
    }

    // vertical rects

    const numberOfRects = getRandomInt(10, 21);
    console.log(numberOfRects);

    let remainingWidth = svgAttrs.width;

    let verticalRects = [];

    for (let i = 1; i <= numberOfRects; i++) {
      let currentWidth;

      if (i === numberOfRects) {
        currentWidth = remainingWidth;
      } else {
        currentWidth = Math.floor(remainingWidth * getRandomArbitrary(0.1, 0.5));
      }

      const newestRect = new Rect(svgAttrs.width - remainingWidth, 0, currentWidth, svgAttrs.height);
      verticalRects.push(newestRect);

      remainingWidth = remainingWidth - currentWidth;
    }

    verticalRects.forEach((rect) => rect.colorMeIn().draw());

    // horizontal rects

    const numberOfHorizontalRects = getRandomInt(10, 21);
    console.log(numberOfHorizontalRects);

    let remainingHeight = svgAttrs.height;

    let horizontalRects = [];

    for (let i = 1; i <= numberOfHorizontalRects; i++) {
      let currentWidth;

      if (i === numberOfHorizontalRects) {
        currentHeight = remainingHeight;
      } else {
        currentHeight = Math.floor(remainingHeight * getRandomArbitrary(0.1, 0.5));
      }

      const newestRect = new Rect(0, svgAttrs.height - remainingHeight, svgAttrs.width, currentHeight);
      horizontalRects.push(newestRect);

      remainingHeight = remainingHeight - currentHeight;
    }

    horizontalRects.forEach((rect) => rect.colorMeIn().draw());
  });
})();
