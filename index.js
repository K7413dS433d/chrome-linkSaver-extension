const getLink = document.getElementById('getLink');
const saveLink = document.getElementById('saveLink');
const saveTab = document.getElementById('saveTab');
const clearLinks = document.getElementById('Clear');
const list = document.querySelector('.history ul');

//lazy initialization for last key
if (localStorage.getItem('lastKey') == null) {
    localStorage.setItem('lastKey', 0);
}

// load the content from local storage when page load completes
window.addEventListener('load', () => {
    lastItem = localStorage.getItem('lastKey');
    for (let i = 0; i < lastItem; i++) {
        if (localStorage.getItem(i) == null)
            continue;
        const str = `<li><a target="_blank" href="${localStorage.getItem(i)}">${localStorage.getItem(i)}</a></li><br>`;
        list.innerHTML += str;
    }
})


// take link to save it in a saveIn which is unordered list
function saveInList(link, saveIn) {
    let lKey = localStorage.getItem('lastKey');
    localStorage.setItem(lKey++, link);
    localStorage.setItem('lastKey', lKey);
    const str = `<li><a target="_blank" href="${link}">${link}</a></li><br>`;
    saveIn.innerHTML += str;
}

//save link button
saveLink.addEventListener('click', function () {
    let msg = 'write link to save';
    if (getLink.value != "" && getLink.value != undefined && getLink.value != null && getLink.value != msg) {
        saveInList(getLink.value, list)
    }
    else {
        getLink.value = msg;
    }
});

//save tab button
saveTab.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        saveInList(tabs[0].url, list);
    });
});


//clear button tabs
clearLinks.addEventListener('click', () => {
    localStorage.clear();
    list.innerHTML = '';
    localStorage.setItem('lastKey', 0);
});



