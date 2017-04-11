function removeMergeButtonIfNeeded() {
    // get merge button
    const buttonMerge = document.querySelector(".btn-group-merge");
    if (!(buttonMerge && buttonMerge.parentElement)) {
        console.warn("Could not find merge button");
        return;
    }

    // get commits Tab
    const commitTab = document.querySelector("#commits_tab_counter");
    if (!commitTab) {
        console.warn("Could not find commits tab counter");
        return;
    }

    // get url pathname
    const pathname = window.location.pathname.slice(1).toLowerCase();

    // get list of repos
    chrome.storage.sync.get("repoList", function(items) {
        // verify if repo is in our list
        const isMatching = (items.repoList || "")
            .split(",")
            .map(s => s.trim().toLowerCase())
            .find(repo => pathname.startsWith(repo));

        if (!isMatching) {
            console.debug(`Repo ${pathname} does not match saved list ${items.repoList}`);
        }

        const commitsCount = Number.parseInt(commitTab.innerText);
        if (Number.isNaN(commitsCount)) {
            console.warn(`Could not parse commits count ${commitTab.innerText}`);
            return;
        }

        console.debug(`Commits count is ${commitsCount}`);

        if (commitsCount > 1) {
            buttonMerge.parentElement.innerHTML = "<strong>Squash commits to enable merge button</strong>";
        }
    });
}

removeMergeButtonIfNeeded();
chrome.runtime.onMessage.addListener(removeMergeButtonIfNeeded);
