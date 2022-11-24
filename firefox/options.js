function saveOptions(e) {
    e.preventDefault();

    let layout = document.querySelector('input[name="layout"]:checked').value;
    let css = document.getElementById(layout).value;
    let composeWidth = document.getElementById('composeWidth').value;
    let homeWidth = document.getElementById('homeWidth').value;
    let notificationsWidth = document.getElementById('notificationsWidth').value;
    let endWidth = document.getElementById('endWidth').value;
    let composeUnits = document.getElementById('composeUnits').value;
    let homeUnits = document.getElementById('homeUnits').value;
    let notificationsUnits = document.getElementById('notificationsUnits').value;
    let endUnits = document.getElementById('endUnits').value;
    let centered = document.getElementById('centered').checked;

    browser.storage.sync.set({
        options: {
            css: css,
            layout: layout,
            composeWidth: composeWidth,
            homeWidth: homeWidth,
            notificationsWidth: notificationsWidth,
            endWidth: endWidth,
            composeUnits: composeUnits,
            homeUnits: homeUnits,
            notificationsUnits: notificationsUnits,
            endUnits: endUnits,
            centered: centered ? 1 : 0
        }
    });

    document.getElementById('success').style.display = "block";
    setTimeout(function () {
        document.getElementById('success').style.display = "none";
    }, 5000);
}

function restoreOptions() {
    function setCurrentChoice(data) {
        if (!data.options) {
            return;
        }

        let inputs = document.querySelectorAll('input[name="layout"]');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value == data.options.layout) {
                inputs[i].checked = true;
            }
        }

        let composeWidth = data.options.composeWidth;
        let homeWidth = data.options.homeWidth;
        let notificationsWidth = data.options.notificationsWidth;
        let endWidth = data.options.endWidth;
        let composeUnits = data.options.composeUnits;
        let homeUnits = data.options.homeUnits;
        let notificationsUnits = data.options.notificationsUnits;
        let endUnits = data.options.endUnits;

        setDefaultWidthUnits('composeWidth', 'composeUnits', composeWidth, composeUnits);
        setDefaultWidthUnits('homeWidth', 'homeUnits', homeWidth, homeUnits);
        setDefaultWidthUnits('notificationsWidth', 'notificationsUnits', notificationsWidth, notificationsUnits);
        setDefaultWidthUnits('endWidth', 'endUnits', endWidth, endUnits);
//document.querySelector("#css").value = result.css || "";

        if (data.options.centered) {
            document.getElementById('centered').checked = true;
        }

        layoutChange();
    }

    function setDefaultWidthUnits(widthId, unitsId, savedWidth, savedUnits) {
        let units = savedUnits ? savedUnits : 'px';
        let defaultWidth = 340;
        if (units === '%') {
            defaultWidth = 20;
        } else if (units === 'rem') {
            defaultWidth = 22;
        } else if (units === 'vw') {
            defaultWidth = 19;
        }

        let width = savedWidth ? savedWidth : defaultWidth;

        document.getElementById(widthId).value = width;
        document.getElementById(unitsId).value = units;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    function layoutChange() {
        let layout = document.querySelector('input[name="layout"]:checked').value;
        let showCustom = layout === 'custom';
        document.getElementById('customWidths').style.display = showCustom ? "table" : "none";
    }

    let getting = browser.storage.sync.get("options");
    getting.then(setCurrentChoice, onError);

    let inputs = document.querySelectorAll('input[name="layout"]');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', layoutChange);
    }
//var radios = document.querySelectorAll('input[type=radio][name="contact"]');
    //radios.forEach(radio => radio.addEventListener('change', () => alert(radio.value)));

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
