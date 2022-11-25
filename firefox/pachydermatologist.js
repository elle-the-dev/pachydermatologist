function handleResponse(message) {
}

function handleError(error) {
}

function notifyBackgroundPage(e) {
    if (document.getElementById('mastodon')) {
        const sending = browser.runtime.sendMessage({});
        sending.then(handleResponse, handleError);
    }
}

notifyBackgroundPage();
