(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("random-5 active");

    const container = document.querySelector('#random-5');

    const svgAttrs = {
      width: 1024,
      height: 768
    }

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    container.appendChild(svgOutput);

    const arrayOfLines = [];

    let x1 = Math.random() * svgAttrs.width;
    let y1 = Math.random() * svgAttrs.width;

    let dir = "lr";
    let strokeWidth = 1;

    const numberOfLines = Math.random() * 100;

    for (let i = 0; i < numberOfLines; i++) {

      const lineOne = document.createElementNS("http://www.w3.org/2000/svg", "line");

      let x2, y2;

      if (dir === "lr") {
        x2 = Math.random() * svgAttrs.width;
        y2 = y1;

        dir = "ud";
      } else {
        x2 = x1;
        y2 = Math.random() * svgAttrs.height;

        dir = "lr";
      }

      lineOne.setAttributeNS(null, 'x1', x1);
      lineOne.setAttributeNS(null, 'y1', y1);
      lineOne.setAttributeNS(null, 'x2', x2);
      lineOne.setAttributeNS(null, 'y2', y2);

      lineOne.setAttributeNS(null, 'stroke-width', strokeWidth);
      strokeWidth += 0.25;

      lineOne.setAttributeNS(null, 'stroke-opacity', 0.25);

      const grayScale = Math.floor(Math.random() * (256 - 200) + 100);
      lineOne.setAttributeNS(null, 'stroke', `rgb(${grayScale}, ${grayScale}, ${grayScale})`);

      arrayOfLines.push(lineOne);

      x1 = x2;
      y1 = y2;
    }

    arrayOfLines.forEach((line) => svgOutput.appendChild(line));
  });
})();
