//get hold of each element 
const player = document.querySelector('.player');
const viewer = player.querySelector('.viewer')
const toggle = player.querySelector('.toggle')
//anything with data-skip
const skipButtons = player.querySelectorAll('[data-skip]');
const mute = player.querySelector('#mute');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.zoom');


//functions
function togglePlay(){
    const status = viewer.paused ? 'play':'pause';
    viewer[status]();
}

function toggleButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;

}

function skip() {
    viewer.currentTime += parseFloat(this.dataset.skip);
   }

function handleVolumeAndPlayback(){
    //name will be either 'volume', 'playbackrate'
    viewer[this.name] = this.value;
}   

function toggleMute(){
    viewer.muted =!viewer.muted;
    if(mute.classList.contains('unmute')){
        mute.classList.remove('unmute')
        mute.classList.add('mute')
    }


    if(mute.classList.contains('mute')){
        mute.classList.remove('mute')
        mute.classList.add('unmute')
    }
}

function handleProgress(){
    //change the flex-basis based on the width or the played/duration
    const currentWidth = (viewer.currentTime / viewer.duration) * 100 || 0;
    progressBar.style.flexBasis = `${currentWidth}%` 
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * viewer.duration;
    viewer.currentTime = scrubTime;
}

function handleFullscreen(e){
    if (isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        setFullscreenData(false);
     }
     else {
        if (viewer.requestFullscreen) viewer.requestFullscreen();
        else if (viewer.mozRequestFullScreen) viewer.mozRequestFullScreen();
        else if (viewer.webkitRequestFullScreen) viewer.webkitRequestFullScreen();
        else if (viewer.msRequestFullscreen) viewer.msRequestFullscreen();
        setFullscreenData(true);
     }
}

const setFullscreenData = function(state) {
    viewer.setAttribute('data-fullscreen', !!state);
 }

//check if fullscreenApi is supported
const fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
if (!fullScreenEnabled) {
    fullscreen.style.display = 'none';
 }

 //check status if fullscreen
 const isFullScreen = function() {
    return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
 }


//event listeners
viewer.addEventListener('click', togglePlay);
viewer.addEventListener('play', toggleButton);
viewer.addEventListener('pause', toggleButton);
viewer.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)
mute.addEventListener('click',toggleMute)
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change',handleVolumeAndPlayback));
ranges.forEach(range => range.addEventListener('mousemove',handleVolumeAndPlayback));

progress.addEventListener('click', scrub)

let mousedownFlag = false;
progress.addEventListener('mousedown', ()=> mousedownFlag = true)
progress.addEventListener('mouseup', ()=> mousedownFlag = false)
//listen to mousemove only when user has clicked the left mouse button
progress.addEventListener('mousemove', (e)=> mousedownFlag && scrub(e))
fullscreen.addEventListener('click', handleFullscreen)

// fullscreen events 
document.addEventListener('fullscreenchange', function(e) {
    setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
 });
 document.addEventListener('webkitfullscreenchange', function() {
    setFullscreenData(!!document.webkitIsFullScreen);
 });
 document.addEventListener('mozfullscreenchange', function() {
    setFullscreenData(!!document.mozFullScreen);
 });
 document.addEventListener('msfullscreenchange', function() {
    setFullscreenData(!!document.msFullscreenElement);
 });