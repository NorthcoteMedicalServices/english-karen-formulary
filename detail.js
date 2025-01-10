// detail.js
function getItemFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('item');
}

document.addEventListener("DOMContentLoaded", () => {
    const item = getItemFromUrl();

    // Fill out data
    populateDrugDetail(item, "EN")
});
