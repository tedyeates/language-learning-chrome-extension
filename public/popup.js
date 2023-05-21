document.addEventListener('DOMContentLoaded', function () {
    var clearDataButton = document.getElementById("clear-data-btn");
    clearDataButton.addEventListener('click', () => {
        chrome.storage.sync.set({'seenWords': {}})
    })
})