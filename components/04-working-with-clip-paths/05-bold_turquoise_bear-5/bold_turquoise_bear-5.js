(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("bold_turquoise_bear-5 active");

    window.setInterval(() => {
      document.querySelector("#bold_turquoise_bear-5").classList.toggle('active');
    }, 2000)
  });
})();
