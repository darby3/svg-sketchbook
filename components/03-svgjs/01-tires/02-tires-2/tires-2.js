(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("tires-2 active");

    const draw = SVG().addTo('#tires-2 .container')
      .size(400, 300);

    const rect = draw.rect(100, 100)
      .attr({
        fill: '#C873FF'
      });

    const rect2 = draw.rect(100, 100)
      .attr({
        fill: '#FF5B99',
        x: 200,
        y: 200
      });

    const rect3 = draw.rect(100, 100)
      .attr({
        fill: '#609CFF',
        x: 400,
        y: 400
      });
  });
})();
