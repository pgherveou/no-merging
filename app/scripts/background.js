chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        console.debug(`Send refresh to ${tabId}`);
        chrome.tabs.sendMessage(tabId, "refresh");
    }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    console.debug('Load contentscript', details);
    chrome.tabs.executeScript(null, { file: "scripts/contentscript.js" });
});
