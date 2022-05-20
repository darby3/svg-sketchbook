(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("bold_turquoise_bear-6b active");

    window.setInterval(() => {
      document.querySelector("#bold_turquoise_bear-6b").classList.toggle('active');
    }, 4000)
  });
})();
