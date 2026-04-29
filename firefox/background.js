function handleMessage(request, sender, sendResponse) {
    //sendResponse({ response: "Response from background script" });
    browser.storage.sync.get("options").then(function (data) {
        if (!data.options) {
            return;
        }

        let css = data.options.css;
        if (data.options.layout === 'custom') {
            let composeWidth = data.options.composeWidth + data.options.composeUnits;
            let homeWidth = data.options.homeWidth + data.options.homeUnits;
            let notificationsWidth = data.options.notificationsWidth + data.options.notificationsUnits;
            let endWidth = data.options.endWidth + data.options.endUnits;
            css = '.columns-area >.drawer:has(.compose-form) { width: ' + composeWidth + ' !important; max-width: ' + composeWidth + ' !important; }'
            + '.columns-area .column:has(button .icon-home) { width: ' + homeWidth + ' !important; max-width: ' + homeWidth + ' !important; }'
            + '.columns-area .column:has(button .icon-bell) { width: ' + notificationsWidth + ' !important; max-width: ' + notificationsWidth + ' !important; }'
            + '.columns-area .column:has(button .icon-chevron-left) { width: ' + endWidth + ' !important; max-width: ' + endWidth + ' !important; }';
        }

        if (data.options.centered) {
            css += ' .columns-area { margin: auto !important; }';
        }

        browser.tabs.insertCSS({ code: css });
    });
}

browser.runtime.onMessage.addListener(handleMessage);
