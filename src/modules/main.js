import {Calculator, Add, Subtract, Divide, Multiply, Exponent, Logarithm,} from './calculator.js';

// Client in Command Pattern
function testCalc() {
    let calculator = new Calculator();

    calculator.execute(new Add(10));
    calculator.execute(new Multiply(10));
    calculator.execute(new Logarithm(10));

    //calculator.undo();

    console.log("\nCurrent Value: " + calculator.display());
}
testCalc();

// alert when page loads
window.addEventListener('load', (event) => {
    alert('Welcome to Calculator!\nWe\'re all loaded up and ready to begin...');
    // prompt for name
    let name = window.prompt("But first, what's your name?")
    let welcome = document.getElementById("welcome-message")
    welcome.innerHTML = "Welcome, " + name + "!";
    // display name on page
    document.body.appendChild(welcome);
});

