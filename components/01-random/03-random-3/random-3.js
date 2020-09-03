(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("random-3 active");

    const container = document.querySelector('#random-3');

    const svgAttrs = {
      width: 1024,
      height: 768
    }

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    container.appendChild(svgOutput);

    const arrayOfLines = [];

    const numberOfLines = Math.random() * 100;

    for (let i = 0; i < numberOfLines; i++) {

      const lineOne = document.createElementNS("http://www.w3.org/2000/svg", "line");

      const x1 = Math.random() * svgAttrs.width;
      const x2 = Math.random() * svgAttrs.width;
      const y1 = Math.random() * svgAttrs.height;
      const y2 = Math.random() * svgAttrs.height;

      lineOne.setAttributeNS(null, 'x1', x1);
      lineOne.setAttributeNS(null, 'y1', y1);
      lineOne.setAttributeNS(null, 'x2', x2);
      lineOne.setAttributeNS(null, 'y2', y2);

      const strokeWidth = Math.random() * 50;
      lineOne.setAttributeNS(null, 'stroke-width', strokeWidth);

      const strokeOpacity = Math.random();
      lineOne.setAttributeNS(null, 'stroke-opacity', strokeOpacity);

      const grayScale = Math.random() * 255;
      lineOne.setAttributeNS(null, 'stroke', `rgb(${grayScale}, ${grayScale}, ${grayScale})`);

      arrayOfLines.push(lineOne);
    }

    arrayOfLines.forEach((line) => svgOutput.appendChild(line));
  });
})();
