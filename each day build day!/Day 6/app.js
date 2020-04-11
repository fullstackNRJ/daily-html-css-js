//const piano = document.querySelector('.piano');

const keys = Array.from(document.querySelectorAll('.key')) //nodelist to array of keys on dom
//add eventlistener on keys to remove transition after they have been pressed
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

window.addEventListener('keydown', playPianoSound);

function playPianoSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`)
    if (!audio) return;

    //apply animation
    key.classList.add('playing');
    //hack to reset the audio
    audio.currentTime = 0;
    audio.play()
}

function removeTransition(e){
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
    
}

