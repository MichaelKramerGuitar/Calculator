// https://www.dofactory.com/javascript/design-patterns/command

// Command Pattern

// Abstract Command
let Operation = function (operation, undo, value) {
    this.execute = operation; // will be specific operation to execute
    this.undo = undo; // opposite operation of execute (i.e. subtraction is the opposite of addition)
    this.value = value; 
}

// Concrete commands
export let Add = function (value) {
    return new Operation(add, sub, value);
};

export let Subtract = function (value) {
    return new Operation(sub, add, value);
};

export let Multiply = function (value) {
    return new Operation(mul, div, value);
};

export let Divide = function (value) {
    return new Operation(div, mul, value);
};

export let Exponent = function (value) {
    return new Operation(exp, log, value);
}

export let Logarithm = function (value) {
    return new Operation(log, exp, value)
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

function exp(x, y) {
    return x ** y;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log
function log(x, y) {
    return Math.log(x) / Math.log(y);
}
// End Concrete Operations

//  Receiver (i.e. Calculator)
export let Calculator = function () {
    let value = 0; // initialized to 0
    let operations = [];

    function latest(operation) {

        // https://www.edureka.co/blog/javascript-substring/#:~:text=The%20substring()%20is%20an,given%20number%20of%20characters%20afterward.
        let name = operation.execute.toString().substring(9, 12); //.substring(start, end);
        /*
        title case in JS
        https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
         */
        // return name.charAt(0).toUpperCase() + name.slice(1);
        return name.toString();

    }

    return {
        execute: function (operation) {
            value = operation.execute(value, operation.value);
            operations.push(operation);
            console.log(latest(operation) + ": " + operation.value);
        },

        undo: function () {
            let operation = operations.pop(); // LIFO
            value = operation.undo(value, operation.value);
            console.log("Undo " + latest(operation) + ": " + operation.value);
        },

        display: function () {
            return value;
        }
    }
}

// TODO Invoker: the user pushing the buttons on the calculator