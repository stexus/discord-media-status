const client = new Discord.Client()
const clientTime = function () { return new Date() / 1000 };
let token, currTabId, time, timeOut
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
    if(info === "audioCheck"){
        currTabId = sender.tab.id
        audioCheck(sender.tab.id)
    }
    else {
        delayPresence(info.title, info.gameType)
    }
});
chrome.tabs.onUpdated.addListener((tabId, info, tab) =>{
    
})
const audioCheck = (tabId) =>{
    chrome.tabs.get(tabId, (tab)=>{
        console.log(tab.audible)
        let currAudio = tab.audible
        console.log(currAudio)
        setInterval(function () {
            if(currTabId !== tabId) return
            console.log('checking')
            chrome.tabs.get(tabId,(tab) =>{
                if (tab.audible !== currAudio) {
                    currAudio = tab.audible
                    console.log(currAudio)
                    if (tab.audible) chrome.tabs.sendMessage(tabId, true);
                    else delayPresence(null, 0)
                }
            })
    
        }, 1e3)
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

setInterval(function () {
    console.log("Destroying client...");
    let tempGame;
    if (client.user.presence.game !== "")
        tempGame = client.user.presence.game;
    client.destroy();
    client = new Discord.Client();
    client.login(token);
    client.on('ready', () => {
        console.log("New client made");
        if (tempGame !== null) delayPresence(tempGame.name, tempGame.type);

    });
}, 18e5);

