const client = new Discord.Client()
const clientTime = function () { return new Date() / 1000 };
let token, currTabId, time, timeOut, audioInterval

chrome.storage.local.get(['token'], (items) => {
    token = items.token || null
    if(token) client.login(token);
});
chrome.storage.onChanged.addListener((changes, namespace) =>{
    if(namespace === "local"){
        token = changes.token.newValue
        client.login(token);
    }
})
chrome.tabs.onActivated.addListener((info) => {
    currTabId = info.tabId
})
chrome.runtime.onMessage.addListener(function (info, sender, sendResponse) {
    if(info.status === "audioCheck"){
        console.log('received')
        if(client.user.presence.game !== null){
            audioCheck(sender.tab.id, info.title !== client.user.presence.game.name ? false : null)
        }
        else audioCheck(sender.tab.id)
        currTabId = sender.tab.id
    }
    else {
        delayPresence(info.title, info.gameType)
    }
});
/*chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
    if(changeInfo.status === 'complete'){
        chrome.tabs.sendMessage(tabId, 'update', (response)=>{
            if(response) audioCheck(tabId)
        })
    }       
})*/
const audioCheck = (tabId, manualAudio) =>{
    chrome.tabs.get(tabId, (tab)=>{
        let currAudio = manualAudio || tab.audible
        if(audioInterval) clearInterval(audioInterval)
        audioInterval = setInterval(function () {
            chrome.tabs.get(tabId,(tab) =>{
                //logging all info to debug
                console.log(`tab audio = ${tab.audible}, tabId = ${tabId}, currAudio = ${currAudio}, currTabId = ${currTabId}`)
                if (tab.audible !== currAudio) {
                    currAudio = tab.audible
                    if (tab.audible) {
                        chrome.tabs.sendMessage(tabId, tabInfo={status: 'get'});
                    }
                    else {
                        delayPresence(null, 0)
                    }
                }
            })
    
        }, 5e3)
    })
}

function delayPresence(title, gameType) {
    if (title === client.user.presence.game || (client.user.presence.game !== null && title === client.user.presence.game.name)) {
        if (timeOut) {
            clearTimeout(timeOut);
        }
        return;
    }
    console.log("Setting delayed presence: " + title);
    if (time !== NaN && clientTime() - time < 10) {
        if (timeOut) {
            clearTimeout(timeOut);
            console.log("Timeout cleared");
        }
        timeOut = setTimeout(setGame, 10000 - ((clientTime() - time) * 1000), title, gameType);
    }
    else {
        setGame(title, gameType);
    }
}

function setGame(title, gameType) {
    if (title === null) {
        console.log("Removing status");
        client.user.setActivity(null);
    }
    else {
        console.log("Setting " + title + " as status");
        client.user.setPresence({
            game: {
                name: title,
                type: gameType,
            },
            status: client.user.settings.status 

        });
    }
    time = new Date() / 1000;
    clearTimeout(timeOut);
}
/*
setInterval(function () {
    console.log("Destroying client...");
    let tempGame;
    if (client.user.presence.game !== "")
        tempGame = client.user.presence.game;
    client.destroy();
    client.login(token);
    client.on('ready', () => {
        console.log("New client made");
        if (tempGame !== null) delayPresence(tempGame.name, tempGame.type);

    });
}, 18e5);
*/
