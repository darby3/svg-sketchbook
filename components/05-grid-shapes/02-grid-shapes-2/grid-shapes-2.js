(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("plaid-with-other-things-2 active");

    const container = document.querySelector('#grid-shapes-2');

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

    // Let's set up a grid of x/y values to base rectangles on.

    const gridAttrs = function (rowHeight, colWidth) {
      this.height = svgAttrs.height;
      this.width = svgAttrs.width;

      this.rowHeight = rowHeight;
      this.colWidth = colWidth;

      this.rows = this.height / rowHeight;
      this.cols = this.width / colWidth;

      this.xCoords = [];
      this.yCoords = [];

      this.xOffset = 0;
      this.yOffset = 0;
    }

    gridAttrs.prototype.createXCoords = function() {
      for (let i = 0; i < this.cols; i++) {
        this.xCoords.push(i * this.colWidth);
      }

      return this;
    }

    gridAttrs.prototype.createYCoords = function() {
      for (let i = 0; i < this.rows; i++) {
        this.yCoords.push(i * this.rowHeight);
      }

      return this;
    }

    gridAttrs.prototype.centerIt = function() {
      const extraX = this.height % this.rowHeight;
      const extraY = this.width % this.colWidth;

      this.xOffset = extraX / 2;
      this.yOffset = extraY / 2;

      return this;
    }

    // basic dump rect shape

    function drawRect(grid, x, y, tx = 0, ty = 0, wv) {
      const newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      newRect.setAttribute('x', grid.xCoords[x] + grid.xOffset);
      newRect.setAttribute('y', grid.yCoords[y] + grid.yOffset);
      newRect.setAttribute('width', grid.colWidth / 2);
      newRect.setAttribute('height', grid.rowHeight / 2);
      newRect.setAttribute('style', `transform: translate(${tx}px, ${ty}px)`);
      newRect.setAttribute('stroke-width', "0");
      newRect.setAttribute('fill', `rgb(${wv}, ${wv}, ${wv})`);

      svgOutput.appendChild(newRect);
    }

    // draw some test shapes

    const coolerGrid = new gridAttrs(100, 100).createXCoords().createYCoords().centerIt();
    const coolestGrid = new gridAttrs(100, 100).createXCoords().createYCoords().centerIt();
    const coolGrid = new gridAttrs(100, 100).createXCoords().createYCoords().centerIt();

    for (let y = 0; y < coolestGrid.rows; y++) {
      for (let x = 0; x < coolestGrid.cols; x++) {
        drawRect(coolerGrid, x, y, 0, 0, 150);
        drawRect(coolestGrid, x, y, -50, -50, 75)
        drawRect(coolGrid, x, y, -25, -25, 225)
      }
    }
  });
})();
