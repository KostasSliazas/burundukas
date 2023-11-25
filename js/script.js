(function (window, document) {
  document.addEventListener("DOMContentLoaded", function (event) {
    // Change document language according to navigator language
    document.documentElement.lang = navigator.language === "lt" ? "lt" : "en-US";
    // Change document title after changing language
    document.title = document.documentElement.lang === "lt" ? "Burundukas" : "Chipmunk";

    const scriptElement = document.createElement("script");
    scriptElement.setAttribute("defer", "defer");
    scriptElement.setAttribute("src", "./js/gall7.min.js");
    document.head.appendChild(scriptElement);

    const headImage = document.querySelector("#headImage");
    headImage.classList.add("pause");

    let languageToggle = document.querySelector("#langue");

    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("arrowd") || event.target.id === "headImage") {
        // Pause or resume animation of header image
        headImage.classList.toggle("pause");
      }
    });

    languageToggle.addEventListener("click", function (event) {
      // Toggle language
      document.documentElement.lang = document.documentElement.lang === "lt" ? "en-US" : "lt";
      document.title = document.documentElement.lang === "lt" ? "Burundukas" : "Chipmunk";
    });

    // Remove loader because the DOM is loaded
    document.querySelector("#loader").classList.remove("loader");
  });
})(window, document);
