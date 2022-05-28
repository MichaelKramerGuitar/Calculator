// https://www.dofactory.com/javascript/design-patterns/command

//https://medium.com/@yuribett/javascript-abstract-method-with-es6-5dbea4b00027

// Command Pattern

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
export class Add extends Operation {
    constructor(value) {
        super(add, sub, value);
    }
}

export class Subtract extends Operation {
    constructor(value) {
        super(sub, add, value);
    }
}

export class Multiply extends Operation {
    constructor(value) {
        super(mul, div, value);
    }
}

export class Divide extends Operation {
    constructor(value) {
        super(div, mul, value);
    }
}

export class Exponent extends Operation {
    constructor(value) {
        super(exp, log, value);
    }
}


export class Logarithm extends Operation {
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

export class Calculator {

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

// Invoker: the user pushing the buttons on the calculator