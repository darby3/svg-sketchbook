(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("random-2 active");

    const container = document.querySelector('#random-2');

    const svgAttrs = {
      width: 800,
      height: 400
    }

    const svgOutput = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOutput.setAttributeNS(null, "viewBox", `0 0 ${svgAttrs.width} ${svgAttrs.height}`);
    svgOutput.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    container.appendChild(svgOutput);

    const lineOne = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineOne.setAttributeNS(null, 'x1', 5);
    lineOne.setAttributeNS(null, 'y1', 5);
    lineOne.setAttributeNS(null, 'x2', svgAttrs.width - 5);
    lineOne.setAttributeNS(null, 'y2', svgAttrs.height - 5);
    lineOne.setAttributeNS(null, 'stroke', "#323232");

    svgOutput.appendChild(lineOne);
  });
})();
