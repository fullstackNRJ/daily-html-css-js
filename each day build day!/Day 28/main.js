const keys = document.querySelectorAll('.keys');
const display = document.querySelector('.display');

let enteredValues = [];

function handleInput(e){
    this.classList.add('is-pressed')
    //console.log(e.target.dataset.key)
    setTimeout(()=>this.classList.remove('is-pressed'),100)
    const key = e.target.dataset.key;
    enteredValues.push(key);
    valueBefore = "";
    valueAfter = "";
    if(key === '+'){
        valueBefore
    }

    display.textContent += key;
    console.log(enteredValues)
}

function calculate(){

    valueB4="";
    valueFTR ="";
    result = 0;
    item = [...enteredValues];
    i = item.length;
    while(i > 0){
        poopedItem = item.shift();
        if(poopedItem === '+'){
            result = parseFloat(valueB4) + parseFloat(valueFTR) 
        }else if(poopedItem === '-'){

        }else if(poopedItem === '/'){

        }else if(poopedItem === '*'){

        }else if()
    }

}


keys.forEach(key => key.addEventListener('click',handleInput))