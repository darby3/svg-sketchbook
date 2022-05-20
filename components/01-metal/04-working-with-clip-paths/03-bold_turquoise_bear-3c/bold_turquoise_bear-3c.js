(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("bold_turquoise_bear-3c active");

    window.setInterval(() => {
      document.querySelector("#bold_turquoise_bear-3c").classList.toggle('active');
    }, 2000)
  });
})();
