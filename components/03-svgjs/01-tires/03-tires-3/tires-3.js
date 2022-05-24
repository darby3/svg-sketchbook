(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("tires-3 active");

    const width = 400;
    const height = 300;

    const draw = SVG().addTo('#tires-3 .container')
      .size(width, height)
      .viewbox(0, 0, width, height);

    const rect = draw.rect(100, 100)
      .attr({
        fill: '#ff0000'
      });

    const rect2 = draw.rect(100, 100)
      .attr({
        fill: '#00ff00',
        x: 100,
        y: 200
      });

    const rect3 = draw.rect(100, 100)
      .attr({
        fill: '#0000ff',
        x: 200,
        y: 100
      });

    const rect4 = draw.rect(98, 298)
      .attr({
        fill: '#323232',
        x: 301,
        y: 1
      });

    const circle1 = draw.circle(100)
      .attr({
        cx: 50,
        cy: 150,
        fill: '#990000'
      });

    const circle2 = draw.circle(100)
      .attr({
        cx: 150,
        cy: 50,
        fill: '#009900'
      });

    const circle3 = draw.circle(100)
      .attr({
        cx: 250,
        cy: 250,
        fill: '#000099'
      });

    const sw = 2;

    const line1 = draw.line(0, 200, 99, 299)
      .stroke({
        width: sw,
        color: '#00ffff',
        linecap: 'round'
      })

    const line2 = draw.line(100, 199, 199, 100)
      .stroke({
        width: sw,
        color: '#ff00ff',
        linecap: 'round'
      })

    const line3 = draw.line(200, 0, 299, 99)
      .stroke({
        width: sw,
        color: '#ffff00',
        linecap: 'round'
      })

  });
})();
