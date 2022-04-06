import statement from'./receipt.js';

const plays = require('./plays.json');
const invoices = require('./invoices.json');

const value = statement(invoices[0], plays);

console.log(value);