(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("bold_turquoise_bear-4 active");

    window.setInterval(() => {
      document.querySelector("#bold_turquoise_bear-4").classList.toggle('active');
    }, 2000)
  });
})();
