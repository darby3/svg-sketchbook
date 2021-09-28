(function (global) {
  console.log("my-svg-framework active");

  // 'new' an object
  const SvgSB = function () {
    return new SvgSB.init();
  };

  // It is here, it is real
  SvgSB.prototype.announce = function () {
    console.log("~-~ SvgSB activated ~-~");
  };

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  SvgSB.init = function () {
    const self = this;
    self.announce();
  };

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

  // Shapes!

  SvgSB.rect = function ({ x = 300, y = 600, svg, wv = 255 })  {
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
