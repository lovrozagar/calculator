'use strict'

const INITIAL_VALUE = 0;

const total = document.querySelector('.display');
total.textContent = INITIAL_VALUE.toString();

let error = false;
let buttonContent = '';
let temporaryButton = '';
let temporaryTotal = 0;
let firstNumber = '0';
let operator = '';
let secondNumber = '0';
let eventKey = '';
let stringResult;

const operators = document.querySelectorAll('.operator');
const functions = document.querySelectorAll('.function');
const numbers = document.querySelectorAll('.number');

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    changeButtonColorOnPress();
    
    button.addEventListener('click', () => {
        buttonContent = button.textContent;
        if (buttonContent === 'AC') {
            clearAll();
        }
        else if (buttonContent === '=') {
            displayResult();
        }
        else if (buttonContent === 'C') {
            removeLastDigit();
        }
        else if (buttonContent === '+/-') {
            changeSign();
        }
        else if ((Number.isInteger(+buttonContent) || buttonContent === '.') && operator !== '') {
            temporaryButton = buttonContent;
            secondNumber = displayNumber(temporaryButton, secondNumber);
        }
        else if (buttonContent === '+' || buttonContent === '-' ||
            buttonContent === '*' || buttonContent === '/') {
            if (operator && secondNumber !== '0') {
                displayResult();
            }
            operator = buttonContent;
        }
        else if ((Number.isInteger(+buttonContent) || buttonContent === '.') && operator === '') {
            temporaryButton = buttonContent;
            firstNumber = displayNumber(temporaryButton, firstNumber);
        }
        if (total.textContent.length < 10) {
            total.classList.remove('display-large-number');
        }
    });
});

document.addEventListener('keydown', event => {
    eventKey = event.key;
    console.log(eventKey);
    changeButtonColorOnKeyboardPress();
    if (event.key === 'Backspace') {
        clearAll();
    }
    else if (event.key === 'Enter' || event.key === '=') {
        displayResult();
    }
    else if (event.key === 'Delete') {
        removeLastDigit();
    }
    else if (event.key === '_') {
        changeSign();
    }
    else if ((Number.isInteger(+event.key) || event.key === '.') && operator !== '') {
        temporaryButton = event.key;
        secondNumber = displayNumber(temporaryButton, secondNumber);
    }
    else if (event.key === '+' || event.key === '-' ||
        event.key === '*' || event.key === '/') {
        if (operator && secondNumber !== '0') {
            displayResult();
        }
        operator = event.key;
    }
    else if ((Number.isInteger(+event.key) || event.key === '.') && operator === '') {
        temporaryButton = event.key;
        firstNumber = displayNumber(temporaryButton, firstNumber);
    }
    if (total.textContent.length < 10) {
        total.classList.remove('display-large-number');
    }
});

function changeButtonColorOnPress() {

    operators.forEach(op => {
        op.addEventListener('click', () => {

            operators.forEach(op => {
                op.classList.remove('op-click');
            });

            if (op.textContent === '=') {
                op.classList.add('op-click');
                setTimeout(() => {
                    op.classList.remove('op-click');
                }, 200);
            }
            else {
                op.classList.add('op-click');
            }
        });
    });

    functions.forEach(func => {
        func.addEventListener('click', () => {
            func.classList.toggle('func-click');
            setTimeout(() => {
                func.classList.toggle('func-click');
                func.classList.add('func');
            }, 200);
        });
    });

    numbers.forEach(num => {
        num.addEventListener('click', () => {
            num.classList.toggle('num-click');
            setTimeout(() => {
                num.classList.toggle('num-click');
                num.classList.add('num');
            }, 200);
        });
    });
}

function changeButtonColorOnKeyboardPress() {

    operators.forEach(op => {
        op.classList.remove('op-click');
    });

    operators.forEach(op => {
        if (eventKey === op.textContent && eventKey === '=' || functionToString(op.textContent) && eventKey === 'Enter') {
            op.classList.add('op-click');
            setTimeout(() => {
                op.classList.remove('op-click');
            }, 200);
        }
        else if ((eventKey === op.textContent && eventKey === '+') ||
            (eventKey === op.textContent && eventKey === '-') ||
            (eventKey === op.textContent && eventKey === '*') || 
            (eventKey === op.textContent && eventKey === '/')) {
            console.log('a')
            op.classList.add('op-click');
        }
    });


    functions.forEach(func => {
        if (eventKey === functionToString(func.textContent)) {
            func.classList.add('func-click');
            setTimeout(() => {
                func.classList.remove('func-click');
            }, 200);
        }
    });

    numbers.forEach(num => {
        if (eventKey === num.textContent) {
            num.classList.add('num-click');
            setTimeout(() => {
                num.classList.remove('num-click');
            }, 200);
        }
    });
    return 0;
}

function displayNumber(button, number) {
    if(number.length > 8) return number;
    else if (Number.isInteger(+button)) {
        number += button;
        number = removeZeroInFront(number);
    }
    else if (!(number.includes(".") && button === '.')) {
        number += button;
    }
    total.textContent = number;
    return number;
}

function displayResult() {
    if (operator === '') {
        total.textContent = firstNumber;
        return;
    }
    stringResult = operate(+firstNumber, operator, +secondNumber);
    stringResult = stringResult.toString();
    if (stringResult.length > 8 && stringResult.charAt(1) !== '.') {
        total.classList.add('display-large-number');
        total.textContent = `${stringResult.slice(0, 8)}e${stringResult.length - 8}`;
        firstNumber = total.textContent;
        operator = '';
        secondNumber = '0';
        return;
    }
    else {
        total.textContent = operate(+firstNumber, operator, +secondNumber); 
    }
    
    temporaryTotal = +total.textContent;
    if (isNaN(temporaryTotal) || (!isFinite(temporaryTotal))) {
        total.textContent = 'Over 9000';
    }
    else {
        total.textContent = parseFloat(temporaryTotal.toFixed(5));
    }

    if (total.textContent == '0') {
        firstNumber = '0';
    }
    else {
        firstNumber = total.textContent;
    }
    operator = '';
    secondNumber = '0';
}

function clearAll() {
    total.textContent = 0;
    firstNumber = '0';
    operator = '';
    secondNumber = '0';
    operators.forEach(op => {
        op.classList.remove('op-click', 'equal-white');
    });
}

function removeLastDigit() {
    if (operator === '') {
        if (firstNumber.length === 1 || firstNumber === '-0') {
            firstNumber = '0';
        }
        else if (firstNumber.slice(0, 1) === '-' && firstNumber.length === 2) {
            firstNumber = '-0';
        }
        else {
            firstNumber = firstNumber.slice(0, firstNumber.length - 1);
        }
        total.textContent = firstNumber;
    }
    else {
        if (secondNumber.length === 1 || secondNumber === '-0') {
            secondNumber = '0';
        }
        else if (secondNumber.slice(0, 1) === '-' && secondNumber.length === 2) {
            secondNumber = '-0';
        }
        else {
            secondNumber = secondNumber.slice(0, secondNumber.length - 1);
        }
        total.textContent = secondNumber;
    }
}

function changeSign() {
    if (operator) {
        if (secondNumber.slice(0, 1) === '-') {
            secondNumber = secondNumber.slice(1, secondNumber.length);
        }
        else {
            secondNumber = '-' + secondNumber;
        }
        total.textContent = secondNumber;
    }
    else if (!operator) {
        if (firstNumber.slice(0, 1) === '-') {
            firstNumber = firstNumber.slice(1, firstNumber.length);
        }
        else {
            firstNumber = '-' + firstNumber;
        }
        total.textContent = firstNumber;
    };
}

function removeZeroInFront(string) {
    if (string === '-0') {
        return string;
    }
    string = +string;
    return string.toString()
}

function operate(number1, operator, number2) {
    let result = 0;
    switch (operator) {
        case '+': result = add(number1, number2);
            break;
        case '-': result = subtract(number1, number2);
            break;
        case '*': result = multiply(number1, number2);
            break;
        case '/': result = divide(number1, number2);
            break;
    }
    return result;
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function operatorToName(operator) {
    let name;
    switch (operator) {
        case '/': name = 'div';
            break;
        case '*': name = 'multi';
            break;
        case '-': name = 'minus';
            break;
        case '+': name = 'plus';
            break;
        case '=': name = 'equal';
            break;
    }
    return name;
}

function functionToString(textContent) {
    let string;
    switch (textContent) {
        case 'AC': string = 'Backspace';
            break;
        case 'C': string = 'Delete';
            break;
        case '+/-': string = '_';
            break;
        case '=': string = 'Enter';
    }
    return string;
}