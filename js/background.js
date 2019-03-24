const client = new Discord.Client()
const clientTime = function () { return new Date() / 1000 };
let token
let playing = []
chrome.storage.local.get(['token'], (items) => {token = items.token || null});
chrome.storage.onChanged.addListener((changes, namespace) =>{
    if(namespace === "local"){
        token = changes.token.newValue
    }
})
chrome.runtime.onMessage.addListener(function (info, sender, sendResponse) {
    if(info === "audioCheck"){
        audioCheck(sender.tab.id, 0).then(() => {
            sendResponse(true)
        }, () => {
            delayPresence(null, 0)
        })
    }
});
chrome.tabs.onUpdated.addListener((tabId, info, tab) =>{
    
})
const audioCheck = (id, type) => promise = new Promise((resolve, reject)=>{
    console.log('audioCheck initializing', type)
    if(type === 1){
        chrome.tabs.get(id, function (tab) {
                if(tab.audible) return resolve()
                else return reject()
            })
    }
    else if (type === 0){
        chrome.tabs.get(id, (tab) => {
            console.log(tab.audible)
            let currAudio = tab.audible
            console.log(currAudio)
            setInterval(function () {
                console.log('checking')
                chrome.tabs.get(id, (tab) =>{
                    if (tab.audible !== currAudio) {
                        console.log(tab.audible)
                        if (tab.audible) return resolve()
                        else return reject()
                    }
                })
    
        }, 1e3)
        })

}


})
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
    if (title.length === 0) {
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