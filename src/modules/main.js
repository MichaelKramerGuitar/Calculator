import {Calculator, Add, Subtract, Divide, Multiply, Exponent, Logarithm,} from './calculator.js';

// Client in Command Pattern
function testCalc() {
    let calculator = new Calculator();

    calculator.execute(new Add(10));
    calculator.execute(new Multiply(10));
    calculator.execute(new Logarithm(10));
    calculator.execute(new Add(34.56));

    //calculator.undo();

    console.log("\nCurrent Value: " + calculator.display());
}
testCalc();

// alert when page loads
window.addEventListener('load', (event) => {
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

current.innerHTML = "0"; // initialize display

input.addEventListener("click", (event) => {
    console.log(event.target)
    if(event.target.id in operations) {
        operator.innerHTML = event.target.value;
    }
    else if (!(event.target.id in operations)) {
        current.innerHTML = event.target.value;
    }
    else { // get proper operator
        alert(operator.innerHTML)
        // if(current.innerHTML === "0"){
        //     calc.execute(new Add(parseFloat(current.innerHTML)));
        // }
        previous.innerHTML = calc.getValue();
        if (operator.innerHTML === "/") {
            calc.execute(new Divide(parseFloat(current.innerHTML)))
            current.innerHTML = calc.getValue();
        }
        else if(operator.innerHTML === "+") {
            calc.execute(new Add(parseFloat(current.innerHTML)))
            current.innerHTML = calc.getValue();
        }
    }

})
