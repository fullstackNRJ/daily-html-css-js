const virus = document.querySelector('.virus');
const boxes = document.querySelectorAll('.box')
let display_score = document.querySelector('#user-score')
const time_left = document.querySelector('#time-left');
const start_btn = document.querySelector('.btn-start');
const restart_btn = document.querySelector('.btn-restart')
const body = document.querySelector('body');

let score = 0;
let currentTimeLeft = 60;
let virusPosition = 0;


start_btn.addEventListener('click',start);
restart_btn.addEventListener('click', reset);



 function reset(){
    setTimeout(window.location.reload(),10)
} 

function start(){



function getRandomPosition(){
    boxes.forEach( box =>{
        box.classList.remove('virus');
    })

    let randomPosition = boxes[Math.floor(Math.random()*9)]
            randomPosition.classList.add('virus')
            virusPosition = randomPosition.id;

           
}

boxes.forEach( box =>{
  
    box.addEventListener('mouseup', ()=>{
        console.log('virus location :', virusPosition); 
        if(virusPosition === box.id){
            score+=1;
            display_score.textContent = score;
        }
    })
    
})



function moveVirus(){
    let timer = null;
    timer = setInterval(getRandomPosition,800)
}

moveVirus();

function countDown(){
    currentTimeLeft--;

    time_left.textContent = currentTimeLeft;

    if(currentTimeLeft == 0){
        clearInterval(timerId);
        alert(`Time over! You killed ${score} viruses.`)
       reset();
    }
}

let timerId = setInterval(countDown,1000)

}
//start();
//reset function
// start pause 
//add animation on hit & miss