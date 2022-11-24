function handleResponse(message) {
  console.log(`Message from the background script: ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  const sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script",
  });
  sending.then(handleResponse, handleError);
}

notifyBackgroundPage();

/*
console.log("RUNNING");
browser.storage.sync.get("css").then(function (data) {
console.log("LOADED");
    console.log(data);
    if (data.css) {
        var style = document.createElement('style');
        style.innerText = data.css;
        //document.body.appendChild(style);
        console.log(browser.tabs.insertCSS({ code: data.css }));
    }
});
*/
