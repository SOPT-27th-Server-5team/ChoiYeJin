const calculator = require('./calculator');

function calculate(a,b) {
    console.log(`${a} + ${b}= ${calculator.add(a, b)}`);
    console.log(`${a} - ${b} = ${calculator.subtract(a, b)}`);
    console.log(`${a} * ${b} = ${calculator.multiply(a, b)}`);
    console.log(`${a} / ${b} = ${calculator.divide(a, b)}`);
}

calculate(4,8);