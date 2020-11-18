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

    console.log(parentElement)
    console.log(isAndroid)
    console.log(animatedElement)

    animatedElement.classList.add('click-effect-animation');

    setTimeout(function() {
        animatedElement.classList.remove('click-effect-animation')
    }, 1000)
}

clickEffectElement.forEach(element => {
    element.addEventListener('click', animateClick, false)
})

