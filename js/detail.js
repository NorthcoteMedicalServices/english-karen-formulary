// Navigate to a drug's detail page and encode the drug in the URL
function navigateToDetailPage(item) {
    const url = `detail.html?item=${encodeURIComponent(item)}`;
    window.location.href = url;
}

// Get the selected item from the URL
function getItemFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('item');
}

// Fill drug details
function drugDetails() {
    const item = getItemFromUrl();

    let lang = localStorage.getItem("lang") == "eng" ? "EN" : "KA";
    

    // Fill out data
    populateDrugDetail(item, lang)
}

// Swap language and then call drug detail again
function swapLang() {
    localStorage.setItem("lang", (localStorage.getItem("lang") == "kar") ? "eng" : "kar");

    drugDetails()
}

// When content loads, populate drug data
document.addEventListener("DOMContentLoaded", () => {
    drugDetails()
});
