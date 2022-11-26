function handleResponse(message) {
}

function handleError(error) {
}

function notifyBackgroundPage(e) {
    if (document.getElementById('mastodon')) {
        chrome.runtime.sendMessage({}, handleResponse);
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // receive message to send to console
    console.log(request.message)
});

notifyBackgroundPage();
