/* REMOVE BODY CLASS FOR HIDING ANIMATIONS */

const elementToHideBeforeLoad = document.querySelector('.ios-button');
const elementToHideAfterLoad = document.querySelector('.ios-to-hide-after-load');

/* RESET ALL ANIMATION TO 0S ON LOAD -> REMOVE PRELOAD CLASS*/
setTimeout(function(){
    document.body.className='';
}, 2000);

/* HIDE ELEMENTS UNTIL LOADED */
elementToHideBeforeLoad.classList.add('hidden');

/* SHOW AFTER LOADED */
/* HIDE MOCKUP AFTER LOADED */
setTimeout(function() {
    elementToHideBeforeLoad.classList.remove('hidden');
    elementToHideAfterLoad.classList.add('hidden');
}, 1000);

/* GET BOTH RADIO INPUTS */

const clickEffectElement = document.querySelectorAll('.radio-group input');

/* ANIMATION ADDED ON CLICK AND REMOVED AFTER ANIMATION */

function animateClick(event) {
    const parentElement = event.target.parentElement;
    const isAndroid = parentElement.classList.contains('android');
    let animatedElement = document.querySelector('.ios .click-effect');;

    if (isAndroid) {
        animatedElement = document.querySelector('.android .click-effect');
    }
    //PLAY ANIMATIION
    animatedElement.classList.add('click-effect-animation');
    //REMOVE ANIMATION CLASS
    setTimeout(function() {
        animatedElement.classList.remove('click-effect-animation');
    }, 1000)
}

clickEffectElement.forEach(element => {
    element.addEventListener('click', animateClick, false);
})
