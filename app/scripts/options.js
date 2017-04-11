const repoList = document.querySelector("#repoList");
const saveButton = document.querySelector("#save");
repoList.value = localStorage.repoList || "";

chrome.storage.sync.get("repoList", items => {
    repoList.value = items.repoList || "";
});

saveButton.addEventListener("click", e => {
    e.preventDefault();
    chrome.storage.sync.set({ repoList: repoList.value }, () => {
        window.alert("The options have been saved!");
    });
});
