(function (global) {
  console.log("my-svg-framework active");

  // 'new' an object
  const SvgSB = function (config) {
    return new SvgSB.init(config);
  };

  // It is here, it is real
  SvgSB.prototype.announce = function () {
    console.log("~-~ SvgSB activated ~-~");
    console.dir(this);
  };

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  SvgSB.init = function (config) {
    const self = this;

    // Create an SVG

    const svgAttrs = {
      width: config.targetResolution.width * config.targetResolutionMultiplier,
      height: config.targetResolution.height * config.targetResolutionMultiplier
    }

    self.svgAttrs = svgAttrs;

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    config.container.appendChild(svgOutput);

    self.svg = svgOutput;

    config.container.style.setProperty("--svgWidth", `${svgAttrs.width}px`);
    config.container.style.setProperty("--svgHeight", `${svgAttrs.height}px`);

    // Set up shape containers?

    self.rects = [];

    // Hi there
    
    self.announce();
  };

  // Fun helper functions!

  // Shuffle array: https://stackoverflow.com/a/6274381/2900883
  SvgSB.prototype.shuffle = function (a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  SvgSB.prototype.coinFlip = function () {
    return Math.floor(Math.random() * 2);
  }

  SvgSB.prototype.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  SvgSB.prototype.getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
  }

  SvgSB.prototype.getSize = function (avail) {
    return Math.floor(avail * getRandomArbitrary(0.1, 0.15));
  }

  // functionality!

  SvgSB.prototype.drawRect = function (x, y, wv) {
    const newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    newRect.setAttribute('x', x);
    newRect.setAttribute('y', y);
    newRect.setAttribute('width', `25px`);
    newRect.setAttribute('height', `25px`);
    newRect.setAttribute('fill', `rgb(${wv}, ${wv}, ${wv})`);

    return newRect;
  }

  // Add a rect to the object's stash

  SvgSB.prototype.makeRect = function (x, y, vw) {
    const self = this;
    const newRect = new SvgSB.rect.init(x, y, self.svg, vw);
    self.rects.push(newRect);
    return newRect;
  }

  // Shapes!

  SvgSB.rect = function ({x = 300, y = 600, svg, wv = 255}) {
    return new SvgSB.rect.init(x, y, svg, wv);
  };

  SvgSB.rect.init = function (x, y, svg, wv) {
    const self = this;

    self.x = x;
    self.y = y;
    self.svg = svg;
    self.wv = wv;

    self.announce();
  };

  SvgSB.rect.prototype = {
    announce: function () {
      console.log('~-~ SvgSB rect activated ~-~');
      console.dir(this);

      return this;
    },

    draw: function () {
      const newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      newRect.setAttribute('x', this.x);
      newRect.setAttribute('y', this.y);
      newRect.setAttribute('width', `25px`);
      newRect.setAttribute('height', `25px`);
      newRect.setAttribute('fill', `rgb(${this.wv}, ${this.wv}, ${this.wv})`);

      this.obj = newRect;
      this.svg.appendChild(newRect);

      return this;
    },

    update: function (x, y) {
      this.x = x;
      this.y = y;

      this.obj.setAttribute('x', this.x);
      this.obj.setAttribute('y', this.y);

      return this;
    }
  }

// set up our prototype and attach our SvgSB to the global object
  SvgSB.init.prototype = SvgSB.prototype;
  SvgSB.rect.init.prototype = SvgSB.rect.prototype;

  global.SvgSB = SvgSB;
})
(window);
