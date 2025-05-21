function filterSearch() {
    // Get list
    let drug_list = document.getElementById("drug_list")

    // Get text content
    let text = document.getElementById("search_bar").value.toUpperCase()

    // List of items
    let items = drug_list.getElementsByTagName("li")

    // Now filter list
    let name
    for (let i = 0; i < items.length; i++) {
        name = items[i].textContent.toUpperCase()

        if (name.includes(text)) {
            items[i].style.display = ""
        } else {
            items[i].style.display = "none"
        }
    }
}