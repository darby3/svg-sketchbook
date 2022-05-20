(function (global) {
  console.log("my-svg-framework-2 active");

  // 'new' an object
  const SvgSB = function (config) {
    return new SvgSB.init(config);
  };

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  SvgSB.init = function (config) {
    const self = this;

    // Save all our config

    this.createConfig(config);

    // Create, append, and save our SVG

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${this.config.svgAttrs.width} ${this.config.svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    config.container.appendChild(svgOutput);

    self.svg = svgOutput;

    // Set required CSS properties

    config.container.style.setProperty("--svgWidth", `${this.config.svgAttrs.width}px`);
    config.container.style.setProperty("--svgHeight", `${this.config.svgAttrs.height}px`);

    // Set up shape containers?

    self.rects = [];
    self.lines = [];

    // Hi there

    self.announce();
  };


  SvgSB.prototype = {
    // It is here, it is real
    announce: function () {
      console.log("~-~ SvgSB activated ~-~");

      if (this.config.debug) {
        console.dir(this);
      }
    },

    createConfig: function (config) {
      this.config = {};

      // container is required, I'm sure there's a way to error check here
      this.config.container = config.container;

      // setting default properties when not supplied by config object
      this.config.targetResolution = config.targetResolution || {width: 1500, height: 1500};
      this.config.targetResolutionMultiplier = config.targetResolutionMultiplier || 0.5;
      this.config.debug = config.debug || false;

      // Establish some SVG attributes

      const svgAttrs = {
        width: this.config.targetResolution.width * this.config.targetResolutionMultiplier,
        height: this.config.targetResolution.height * this.config.targetResolutionMultiplier
      }

      this.config.svgAttrs = svgAttrs;
    },

    // functionality!

    makeRect: function (config) {
      config.parent = this;
      const newRect = new Rect(config);

      newRect.announce();
      this.rects.push(newRect);

      return newRect;
    },

    makeLine: function (config) {
      config.parent = this;
      const newLine = new Line(config);

      newLine.announce();
      this.lines.push(newLine);

      return newLine;
    }
  }


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


  // Get some random x/y coords that fit the svg

  SvgSB.prototype.getRandomXY = function () {
    const x = this.getRandomInt(0, this.config.svgAttrs.width);
    const y = this.getRandomInt(0, this.config.svgAttrs.height);

    return {
      x: x,
      y: y
    }
  }

  // Rect Shape

  const Rect = function ({x = 300, y = 600, wv = 255, parent}) {
    return new Rect.init(x, y, wv, parent);
  };

  Rect.init = function (x, y, wv, parent) {
    this.x = x;
    this.y = y;
    this.wv = wv;
    this.parent = parent;
  };

  Rect.prototype = {
    announce: function () {
      console.log('~-~ SvgSB rect activated ~-~');

      if (this.parent.config.debug) {
        console.dir(this);
      }

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
      this.parent.svg.appendChild(newRect);

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

  Rect.init.prototype = Rect.prototype;

  // Line

  const Line = function ({x1 = 0, y1 = 0, x2 = 0, y2 = 0, wv = 255, sw = 5, parent}) {
    return new Line.init(x1, y1, x2, y2, wv, sw, parent);
  }

  Line.init = function (x1, y1, x2, y2, wv, sw, parent) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.wv = wv;
    this.sw = sw;
    this.parent = parent;
  }

  Line.prototype = {
    announce: function () {
      console.log('~-~ SvgSB line activated ~-~');

      if (this.parent.config.debug) {
        console.dir(this);
      }

      return this;
    },

    draw: function () {
      const newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      newLine.setAttribute('x1', this.x1);
      newLine.setAttribute('y1', this.y1);
      newLine.setAttribute('x2', this.x2);
      newLine.setAttribute('y2', this.y2);
      newLine.setAttribute('stroke', `rgb(${this.wv}, ${this.wv}, ${this.wv})`);
      newLine.setAttribute('stroke-width', `${this.sw}px`);

      this.obj = newLine;
      this.parent.svg.appendChild(newLine);

      return this;
    },

    update: function (coords) {
      const {x1, y1, x2, y2} = coords;

      if (x1 !== undefined && y1 !== undefined) {
        this.x1 = x1;
        this.y1 = y1;

        this.obj.setAttribute('x1', this.x1);
        this.obj.setAttribute('y1', this.y1);
      }

      if (x2 !== undefined && y2 !== undefined) {
        this.x2 = x2;
        this.y2 = y2;
        this.obj.setAttribute('x2', this.x2);
        this.obj.setAttribute('y2', this.y2);
      }

      return this;
    }
  }

  Line.init.prototype = Line.prototype;

  // set up our prototype and attach our SvgSB to the global object
  SvgSB.init.prototype = SvgSB.prototype;
  global.SvgSB = SvgSB;
})(window);
