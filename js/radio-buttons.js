/* REMOVE BODY CLASS FOR HIDING ANIMATIONS */

const elementsToHideBeforeLoad = document.querySelectorAll('.transition-background, .custom-radio');
const elementsToHideAfterLoad = document.querySelectorAll('.android-to-hide-after-load, .ios-to-hide-after-load');

//RESET ALL ANIMATION TO 0S ON LOAD
setTimeout(function(){
    document.body.className='';
}, 2000);

//HIDE ELEMENTS UNTIL LOADED
elementsToHideBeforeLoad.forEach((element) => {
    element.classList.add('hidden');
})

//SHOW AFTER LOADED
setTimeout(function(){
    elementsToHideBeforeLoad.forEach((element) => {
        element.classList.remove('hidden');
    })
}, 1000);

//REMOVE MOCKUP AFTER LOADED
setTimeout(function(){
    elementsToHideAfterLoad.forEach((element) => {
        element.classList.add('hidden');
    })
}, 1000);

/* ******** GET BOTH RADIO INPUTS ************ */

const clickEffectElement = document.querySelectorAll('.radio-group input');

/* ANIMATION ADDED ON CLICK AND REMOVED AFTER ANIMATION */

function animateClick(event) {
    const parentElement = event.target.parentElement;
    const isAndroid = parentElement.classList.contains('android');
    let animatedElement = document.querySelector('.ios .click-effect');;

    if (isAndroid) {
        animatedElement = document.querySelector('.android .click-effect');
    }

    animatedElement.classList.add('click-effect-animation');

    setTimeout(function() {
        animatedElement.classList.remove('click-effect-animation')
    }, 1000)
}

clickEffectElement.forEach(element => {
    element.addEventListener('click', animateClick, false)
})
