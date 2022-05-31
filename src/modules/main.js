//import {Calculator, Add, Subtract, Divide, Multiply, Exponent, Logarithm,} from './calculator.js';

// html 5 drag and drop

class Operation { // Abstract Command

    #value; // private

    constructor(operation, undo, value) {
        this.execute = operation;
        this.undo = undo;
        this.#value = value;
    }

    // getter
    getValue() {
        return this.#value;
    }
}

// Concrete Commands
class Add extends Operation {
    constructor(value) {
        super(add, sub, value);
    }
}

class Subtract extends Operation {
    constructor(value) {
        super(sub, add, value);
    }
}

class Multiply extends Operation {
    constructor(value) {
        super(mul, div, value);
    }
}

class Divide extends Operation {
    constructor(value) {
        super(div, mul, value);
    }
}

class Exponent extends Operation {
    constructor(value) {
        super(exp, log, value);
    }
}


class Logarithm extends Operation {
    constructor(value) {
        super(log, exp , value);
    }
}
// End Abstract Commands

// Concrete Operations
function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function mul(x, y) {
    return x * y;
}

function div(x, y) {
    return x / y;
}

// need to research bugs with undoing exponents and logs
// https://stackoverflow.com/questions/4016213/whats-the-opposite-of-javascripts-math-pow
function exp(x, y) {
    return Math.pow(x, y);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log
function log(x, y) {
    return Math.log(x) / Math.log(y);
}
// End Concrete Operations

//  Receiver (i.e. Calculator)

class Calculator {

    #value = 0;
    operations = [];

    getValue() {
        return this.#value;
    }

    setValue(value) {
        this.#value = value;
    }

    latest(operation) {
        // https://www.edureka.co/blog/javascript-substring/#:~:text=The%20substring()%20is%20an,given%20number%20of%20characters%20afterward.
        let name = operation.execute.toString().substring(9, 12); //.substring(start, end);
        /*
        title case in JS
        https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
         */
        // return name.charAt(0).toUpperCase() + name.slice(1);
        return name.toString();
    }

    execute(operation) {
        this.setValue(operation.execute(this.getValue(), operation.getValue()));
        this.operations.push(operation);
        console.log(this.latest(operation) + ": " + operation.getValue());
    }

    undo() {
        let operation = this.operations.pop(); // LIFO
        this.setValue(operation.undo(this.getValue(), operation.getValue()));
        console.log("Undo " + this.latest(operation) + ": " + operation.getValue());
    }

    display() {
        return this.getValue();
    }

}
// Client in Command Pattern
function testCalc() {
    let calculator = new Calculator();

    calculator.execute(new Add(10));
    calculator.execute(new Multiply(10));
    calculator.execute(new Logarithm(10));
    calculator.execute(new Add(34.56));

    console.log("\nCurrent Value: " + calculator.display());
}
testCalc();

// alert when page loads

window.addEventListener('load', () => {
    alert('Welcome to Calculator!\nWe\'re almost loaded up and ready to begin...');
    // prompt for name
    let name = window.prompt("But first, what's your name?")
    let welcome = document.getElementById("welcome-message");
    // let welcome = document.querySelector("welcome");
    welcome.innerHTML = "Happy calculating, " + name + "!";
    // display name on page
    document.body.appendChild(welcome);
    alert("Welcome, " + name + "!")
});


// calculator
let calc = new Calculator();

// input elements
const input = document.getElementById('input');

// display elements
const current = document.getElementById('current');
const operator = document.getElementById('operator');
const previous = document.getElementById('previous');

const operations = document.getElementsByClassName('operation');
const undoOps = document.getElementsByClassName('undo-op');
const nums = document.getElementsByClassName('num');

for (let i = 0; i < (operations.length - 1); i++) { // arbitrarily exhibiting a for loop
    console.log(operations[i])
}

let less = true;
let count = 0;
console.log("before loop count === " + count + " , and operations.length === " + operations.length);
while(less) { // arbitrarily exhibiting a while loop
    if (count < operations.length) {
        count++;
    }
    else {
        console.log("count: " + count + " and operations.length: " + operations.length + ", are equal: ")
        console.log(count === operations.length) // true
        less = false;
    }
}

current.innerHTML = calc.display(); // initialized at 0

let buttonsPressed = [] // remember latest button pressed like .push(event.target.id)

input.addEventListener("click", (event) => {
    previous.innerHTML += " " + event.target.value; // populate history of commands
    if (event.target.id !== "equals" && event.target.id in operations) {
       operator.innerHTML = event.target.value; // populate operation area
       if (calc.getValue() === 0) { // first operation, need to auto add operand to calculator value
           calc.execute(new Add(parseFloat(current.innerHTML)))
       }
    } else if (event.target.id in undoOps) { //undo's
        if (event.target.id === "undo") {
            calc.undo(); // undo previous operation
            current.innerHTML = calc.display();
        }
        else if (event.target.id === "all-clear") {
            calc.setValue(0);
            current.innerHTML = calc.display();
        }
    } else if (event.target.id in nums) {
        if (current.innerHTML === "0") {
            firstOp(event.target.value)
        } else {
            appendCurrentOperand(event.target.value)
        }

    } else { // get proper operator
        if (operator.innerHTML === "+") {
            calc.execute(new Add(parseFloat(current.innerHTML)))
            current.innerHTML = calc.display();
        } else if (operator.innerHTML === "/") {
            calc.execute(new Divide(parseFloat(current.innerHTML)))
            current.innerHTML = calc.display();
        }  else if (operator.innerHTML === "*") {
            calc.execute(new Multiply(parseFloat(current.innerHTML)))
            current.innerHTML = calc.display();
        } else if (operator.innerHTML === "-") {
            calc.execute(new Subtract(parseFloat(current.innerHTML)))
            current.innerHTML = calc.display();
        } else if (operator.innerHTML === "^") {
            calc.execute(new Exponent(parseFloat(current.innerHTML)))
            current.innerHTML = calc.display();
        } else if (operator.innerHTML === "LOG") {
            calc.execute(new Logarithm(parseFloat(current.innerHTML)))
            current.innerHTML = calc.display();
        }
        evaluateSize()
        previous.innerHTML += " " + calc.display();
        operator.innerHTML = "";
        promptContinue()
    }
    buttonsPressed.push(event.target.id)
})

function evaluateSize() { // as per requirements
    if (calc.display() > 10) {
        alert('that\'s a big number!');
    } else {
        alert('that\'s a small number...')
    }
}


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function promptContinue() { // as per requirements
    await sleep(2000)
    let response = window.prompt("would you like to continue, type: \"yes\" or \"no\"").toLowerCase();
    if(response.startsWith('n')) {
        alert('Thank you for using Calculator!')
        window.close();
    }
}

function firstOp(number) {
    current.innerHTML = number;
    //calc.execute(new Add(parseFloat(number)))
}

function appendCurrentOperand(number) {
    let latestIDPressed = buttonsPressed.pop();
    if (latestIDPressed in operations || latestIDPressed in undoOps) {
        current.innerHTML = number;
    } else {
        current.innerHTML += number;
    }
}
