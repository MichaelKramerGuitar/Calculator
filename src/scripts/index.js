import {Calculator, Add, Subtract, Divide, Multiply, Exponent, Logarithm,} from './calculator.js';

// Client
function run() {
    let calculator = new Calculator();

    calculator.execute(new Add(10));
    calculator.execute(new Multiply(10));
    calculator.execute(new Logarithm(10));

    //calculator.undo();

    console.log("\nCurrent Value: " + calculator.display());
}
run();
