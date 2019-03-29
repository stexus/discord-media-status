$(function () {
    getTitle(window.location.href)
    console.log(info)
    chrome.runtime.sendMessage(message={status:'audioCheck', title: info.title}) 
});
const info = {
    title: null,
    gameType: null
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if(request === 'update'){
        getTitle(window.location.href)
        if(info.title !== null){
            sendResponse({status: true})
        }
        else sendResponse({status: false})
    }
    console.log('recived message')
    if(request.status === 'get'){
        console.log(info)
        if(info.title === null) getTitle(window.location.href)
        chrome.runtime.sendMessage(info);
    }
})
const getTitle = (url) =>{
    let title
    if (url.indexOf('9anime.to\/watch') > -1) {
        const iframeWait = setInterval(() =>{
            if($('a.active').length){
                title = $('h1.title')[0].textContent;
            let episodes = parseInt($('a.active')[0].textContent, 10);
            title = `${title} Ep.${episodes}`
            setInfo(title, 3)
            clearInterval(iframeWait)
            }
        }, 100)
        
    }
    else if(url.indexOf('animepahe.com/play/')){
        title = $('h1 a')[0].title
        episodes =  $('h1')[0].textContent
        episodes = episodes.substring(8 + title.length, episodes.length - 6)
        episodes = episodes.trim()
        title = `${title} Ep.${episodes}`
        setInfo(title, 3)
    }
}
const setInfo = (title, gameType) => {
    info.title = title;
    info.gameType = gameType;
}
