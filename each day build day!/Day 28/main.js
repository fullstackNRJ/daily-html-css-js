
const calculator ={
    displayValue:'0',
    firstOperand:null,
    waitingForSecond:false,
    operator:null
}


const performCalculations = {
    '+':(firstOperand, secondOperand) => firstOperand + secondOperand,
    '-':(firstOperand, secondOperand) => firstOperand - secondOperand,
    '*':(firstOperand, secondOperand) => firstOperand * secondOperand,
    '/':(firstOperand, secondOperand) => firstOperand / secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
}

//resetting the calculator
function resetCalculator(){
    calculator.displayValue = '0',
    calculator.firstOperand = null,
    calculator.waitingForSecond =false,
    calculator.operator = null
}



function inputDigits(digit){
    const {displayValue, waitingForSecond}  = calculator;

    //handling display of second value after operator
    if(waitingForSecond === true){
        calculator.displayValue = digit;
        calculator.waitingForSecond =  false;
    }else{
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    } 

    console.log(calculator)
}

function inputDecimal(dot){
    if(calculator.waitingForSecond === true) return;

    //else append a dot to the string
    if (!calculator.displayValue.includes(dot)) {
        // Append the decimal point
        calculator.displayValue += dot;
      }
}

//Handling operators

function inputOperators(nextOperator){
    // case 1: when user enters first operator and hits a operator
    const {firstOperand, operator, displayValue, waitingForSecond} = calculator;
    const inputValue = parseFloat(displayValue);

    //case 3: When a user enters two or more operators consecutively, i.e changes the operation
    if(operator && waitingForSecond === true){
        calculator.operator = nextOperator;
        return;
    }


    if(calculator.firstOperand === null){
        calculator.firstOperand = inputValue; 
    }else if(operator){ //at this point we already have a operator and firstOperand
        //case 2: when user finishes the second operand and hits a key
        const currentValue = firstOperand || 0;
        const result = performCalculations[operator](currentValue,inputValue)

        //now store this result to firstOperand for further calculations
        calculator.displayValue = String(result)
        calculator.firstOperand = result;
    }

    calculator.waitingForSecond = true;
    calculator.operator = nextOperator;
}

function handleInputs(e){
    const{target} = event; /*  is equivalent to const target = event.target;*/

    if(!target.matches('button')) return; // if clicked on div elsewhere

    if(target.classList.contains('operator')){
        inputOperators(target.value);
        updateDisplay();
        return;
    }


    if(target.classList.contains('decimal')){
        inputDecimal(target.value);
        updateDisplay();
        return;
    }


    if(target.classList.contains('all-clear')){
        resetCalculator();
        updateDisplay();
        return;
    }


    if(target.classList.contains('clear')){
        
    }

    inputDigits(target.value);
    updateDisplay();

}
//Handling key presses, we've four sets of keys (numeric, operator, decimal, AC )
const keys = document.querySelector('.calculator-keys')
keys.addEventListener('click',handleInputs)



function updateDisplay(){
    const display = document.querySelector('.calculator-screen')
    display.value = calculator.displayValue;
}
updateDisplay();

