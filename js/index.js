(function clickLogger () {
    document.addEventListener('click', function (event) {
        if (canBeClickedWithResult(event.target) === true) {
            console.log('YOU CLICKED: ')
            if (event.target.className) {
                console.log(`Class Name: ${event.target.className}`);
            } else {console.log('No class name')}
    
            if (event.target.id) {
                console.log(`ID: ${event.target.id}`);
            } else {console.log('No ID')}
        } else {console.log('Nothing to click here, click somewhere else')}
        
    }, false);
})()

function canBeClickedWithResult(element) {
    if (element.getAttribute('disabled')!==null) {
        return false;
    } else if((element.getAttribute('onclick')!=null)||(element.getAttribute('href')!=null)){
        return true;
    } else { return false }
}