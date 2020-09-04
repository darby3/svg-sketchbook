(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("random-6 active");

    const container = document.querySelector('#random-6');

    const svgAttrs = {
      width: 1024,
      height: 768
    }

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    container.appendChild(svgOutput);

    const arrayOfLines = [];

    const lineSpacing = 10;
    const numberOfLines = svgAttrs.height / lineSpacing;

    let curY = lineSpacing / 2;

    for (let i = 1; i < numberOfLines; i++) {
      const y1 = curY;
      const y2 = curY;
      const x1 = Math.random() * svgAttrs.width;
      const x2 = Math.random() * svgAttrs.width;

      const lineOne = document.createElementNS("http://www.w3.org/2000/svg", "line");

      lineOne.setAttributeNS(null, 'x1', x1);
      lineOne.setAttributeNS(null, 'y1', y1);
      lineOne.setAttributeNS(null, 'x2', x2);
      lineOne.setAttributeNS(null, 'y2', y2);

      const strokeWidth = Math.floor(Math.random() * (lineSpacing - 1) + 1);
      lineOne.setAttributeNS(null, 'stroke-width', strokeWidth);

      const grayScale = Math.floor(Math.random() * (256 - 10) + 10);
      lineOne.setAttributeNS(null, 'stroke', `rgb(${grayScale}, ${grayScale}, ${grayScale})`);

      arrayOfLines.push(lineOne);

      curY = curY + lineSpacing;
    }

    arrayOfLines.forEach((line) => svgOutput.appendChild(line));
  });
})();
