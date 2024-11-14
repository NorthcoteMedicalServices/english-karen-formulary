// detail.js
function getItemFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('item');
}

document.addEventListener("DOMContentLoaded", () => {
    const item = getItemFromUrl();
    const itemDisplay = document.getElementById("item-display");
    itemDisplay.textContent = item ? `You selected: ${item}` : "No item selected.";
});
