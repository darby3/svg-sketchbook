(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("bold_turquoise_bear-6c active");

    window.setInterval(() => {
      document.querySelector("#bold_turquoise_bear-6c").classList.toggle('active');
    }, 2000)
  });
})();
