function navigateToDetailPage(item) {
    const url = `detail.html?item=${encodeURIComponent(item)}`;
    window.location.href = url;
}
