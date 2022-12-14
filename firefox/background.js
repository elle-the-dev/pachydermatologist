function handleMessage(request, sender, sendResponse) {
    //sendResponse({ response: "Response from background script" });
    browser.storage.sync.get("options").then(function (data) {
        let css = data.options.css;
        if (data.options.layout === 'custom') {
            let composeWidth = data.options.composeWidth + data.options.composeUnits;
            let homeWidth = data.options.homeWidth + data.options.homeUnits;
            let notificationsWidth = data.options.notificationsWidth + data.options.notificationsUnits;
            let endWidth = data.options.endWidth + data.options.endUnits;
            css = '.columns-area > .drawer { width: ' + composeWidth + ' !important; max-width: ' + composeWidth + ' !important; }'
            + '.columns-area .column[aria-label="Home"] { width: ' + homeWidth + ' !important; max-width: ' + homeWidth + ' !important; }'
            + '.columns-area .column[aria-label="Notifications"] { width: ' + notificationsWidth + ' !important; max-width: ' + notificationsWidth + ' !important; }'
            + '.columns-area .column:last-child { width: ' + endWidth + ' !important; max-width: ' + endWidth + ' !important; }';
        }

        if (data.options.centered) {
            css += ' .columns-area { margin: auto !important; }';
        }

        browser.tabs.insertCSS({ code: css });
    });
}

browser.runtime.onMessage.addListener(handleMessage);
