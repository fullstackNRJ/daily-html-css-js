const video = document.querySelector('.player')
const speedBar = document.querySelector('.speed-bar')
const speed = document.querySelector('.speed')


function handleTheBar(e){
    e.preventDefault();
    
    //find the offset height 
    const verticalOffsetHeight = e.pageY - this.offsetTop  //(this === speed)
    
     const ratio = verticalOffsetHeight/this.clientHeight
     
    const height = Math.round(ratio * 100) +'%';
    const min = 0.5
    const max = 4.5

    const playBackSpeedRange = ratio * (max - min) + min;
    console.log(playBackSpeedRange);
    //apply this to the speedbar
    speedBar.style.height = height;
    speedBar.textContent = playBackSpeedRange.toFixed(2) + 'x';
    //then finally apply the playback to the video
    video.playbackRate = playBackSpeedRange
}



speed.addEventListener('mousemove', handleTheBar)
speed.addEventListener('touchmove', handleTheBar)