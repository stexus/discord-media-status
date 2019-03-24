document.querySelector('.form').addEventListener('submit', (e) =>{
    e.preventDefault()
    console.log(e);
    if(e.target.elements[0].value.length < 0){
        e.target.elements[0].placeholder = "invalid"
        e.target.elements[0].value = ""
    }
    else{
        chrome.storage.local.set({'token':e.target.elements[0].value}, () =>{
            console.log("set local storage to", e.target.elements[0].value)
            e.target.elements[0].value = ""
            e.target.elements[0].placeholder = "set"
        })
        
    }
})