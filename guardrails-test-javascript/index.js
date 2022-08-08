const regex = require('./src/GR0001');
const regexNew = require('./src/GR0002');
const mustache = require('./src/GR0003');
const handleBars = require('./src/GR0004');
const bufferAlloc = require('./src/GR0005');
const bufferNew = require('./src/GR0006');
const sqli = require('./src/GR0007');
const eval = require('./src/GR0008');
const exec = require('./src/GR0009');
const secrets = require('./src/secrets');

console.log("calling dangerousFunction() with static string");
var userInputa = req.body.danger;
lib.dangerousFunction("static input is fine"); // compliant
console.log("calling dangerousFunction() with user input");
lib.dangerousFunction(userInputa); // non-compliant
console.log("dangerousFunction() called successfully");

this.guardRails3(exec);