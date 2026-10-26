document.addEventListener("DOMContentLoaded", function () {
    const acaMapBtn = document.getElementById("aca-map-btn");
    const acaListBtn = document.getElementById("aca-list-btn");
    const acaCards = document.getElementById("aca-cards-wrapper");
    const acaMap = document.getElementById("aca-map-wrapper");

    if (acaMapBtn && acaListBtn && acaCards && acaMap) {
        
        acaMapBtn.addEventListener("click", function () {
            acaMapBtn.classList.add("active");
            acaListBtn.classList.remove("active");
            acaMap.classList.remove("hidden-page");
            acaCards.classList.add("hidden-page");
        });

        acaListBtn.addEventListener("click", function () {
            acaListBtn.classList.add("active");
            acaMapBtn.classList.remove("active");
            acaCards.classList.remove("hidden-page");
            acaMap.classList.add("hidden-page");
        });
    }
});
