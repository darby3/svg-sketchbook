(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("shapes-1 active");

    const width = 400;
    const height = 300;

    const draw = SVG('#shapes-1-svg');

    const triangle1 = draw.use("triangle").attr({
      fill: '#00ff00'
    }).x(0).y(0).width(50).height(50);

    const square1 = draw.use("square").attr({
      fill: '#ff0000'
    }).x(50).y(0).width(50).height(50);

    const pentagon1 = draw.use("pentagon").attr({
      fill: '#0000ff'
    }).x(100).y(0).width(50).height(50);

    const triangle = draw.use("triangle").attr({
      fill: '#00ff00'
    }).x(100).y(200).width(50).height(50).rotate(45);

    const square = draw.use("square").attr({
      fill: '#ff0000'
    }).x(200).y(100).width(50).height(50).rotate(45);

    const pentagon = draw.use("pentagon").attr({
      fill: '#0000ff'
    }).x(300).y(15).width(50).height(50).rotate(45);
  });
})();
