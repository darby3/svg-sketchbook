(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("tires-1 active");

    const draw = SVG().addTo('#tires-1 .container').size(400, 300);
    const rect = draw.rect(100, 100).attr({ fill: '#C873FF' });
    const rect2 = draw.rect(100, 100).move(100, 100).attr({ fill: '#FF5B99' });
    const rect3 = draw.rect(100, 100).move(200, 200).attr({ fill: '#609CFF' });
  });
})();
