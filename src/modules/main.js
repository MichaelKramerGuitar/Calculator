import {Calculator, Add, Subtract, Divide, Multiply, Exponent, Logarithm,} from './calculator.js';

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
    alert('Welcome to Calculator!\nWe\'re all loaded up and ready to begin...');
    // prompt for name
    let name = window.prompt("But first, what's your name?")
    let welcome = document.getElementById("welcome-message");
    // let welcome = document.querySelector("welcome");
    welcome.innerHTML = "Welcome, " + name + "!";
    // display name on page
    document.body.appendChild(welcome);
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

//const undoOps = document.getElementsByClassName('undo-op');

current.innerHTML = calc.display(); // initialized at 0

input.addEventListener("click", (event) => {
    previous.innerHTML += " " + event.target.value;
    if (event.target.id !== "equals" && event.target.id in operations) {
        operator.innerHTML = event.target.value;
    } else if (!(event.target.id in operations)) { // numbers or undo's
        // alert('number or undo op')
        current.innerHTML = event.target.value;
        if (calc.getValue() === 0) { // first operation and any subsequent when current value is zero
            calc.execute(new Add(parseFloat(event.target.value)))
        }
        else if (event.target.id === "undo") {
            calc.undo(); // undo previous operation
            current.innerHTML = calc.display();
        }
    } else if (event.target.id === "ac") {
        alert('ac!!')
        calc.setValue(0);
        current.innerHTML = calc.display();
    } else { // get proper operator
        if (operator.innerHTML === "/") {
            calc.execute(new Divide(parseFloat(current.innerHTML)))
            current.innerHTML = calc.display();
        } else if (operator.innerHTML === "+") {
            calc.execute(new Add(parseFloat(current.innerHTML)))
            current.innerHTML = calc.display();
        } else if (operator.innerHTML === "*") {
            calc.execute(new Multiply(parseFloat(current.innerHTML)))
            current.innerHTML = calc.display();
        } else if (operator.innerHTML === "-") {
            calc.execute(new Subtract(parseFloat(current.innerText)))
            current.innerHTML = calc.display();
        } else if (operator.innerHTML === "^") {
            calc.execute(new Exponent(parseFloat(current.innerText)))
            current.innerHTML = calc.display();
        } else if (operator.innerHTML === "LOG") {
            calc.execute(new Logarithm(parseFloat(current.innerText)))
            current.innerHTML = calc.display();
        }
        evaluateSize()
        previous.innerHTML += " " + calc.display();
        operator.innerHTML = "";
        promptContinue()
    }
})

function evaluateSize() { // as per requirements
    if (calc.display() > 10) {
        alert('that\'s a big number!');
    } else {
        alert('that\'s a small number...')
    }
}

function promptContinue() { // as per requirements
    let response = window.prompt("would you like to continue, type: \"yes\" or \"no\"").toLowerCase();
    if(response.startsWith('n')) {
        window.close();
    }

}