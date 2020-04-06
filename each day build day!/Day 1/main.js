const clock = document.querySelector('.clock')

const tick = () => {
    const now = new Date()

    const hour = now.getHours()
    let min = now.getMinutes()
    const sec = now.getSeconds()

    
    if(min < 10){
        min = "0"+min;
    }

    const display = `
    <span>${hour}</span>:
    <span>${min}</span>:
    <span>${sec}</span>
 
    `
        //clock.innerHTML += display;haha
    clock.innerHTML = display;
}

setInterval(tick, 1000)