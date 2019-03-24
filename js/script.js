$(function () {
    chrome.runtime.sendMessage('audioCheck') 
    getTitle(window.location.href) 
});
const info = {
    title:"",
    gameType: -1
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request === true){
        console.log('got message')
        getTitle(window.location.href)
    }

})
const getTitle = (url) =>{
    let title
    if (url.indexOf("9anime.to\/watch") > -1) {
        title = $('h1.title')[0].innerHTML;
        let episodes = document.querySelector('a.active').innerHTML;
        if (episodes.charAt(0) == 0) episodes = episodes.substring(1, episodes.length);
        title = title + episodes
        setInfo(title, 3);
    }
}
const setInfo = (title, gameType) => {
    info.title = title;
    info.gameType = gameType;
    chrome.runtime.sendMessage(info);
}
