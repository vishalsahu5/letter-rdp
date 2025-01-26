/**
 * Main test runner
 */

const { Parser } = require('../src/Parser');
const assert = require('assert');

const parser = new Parser();

//List of tests
const tests = [require('./literals-test.js')];

// For manual tests
function exec() {
    const program = `  
        /**
         * Documentation Comment
         */
        "hello";

        " 42 ";
    `;

    const ast = parser.parse(program);

    console.log(JSON.stringify(ast, null, 2));
}

exec();

// Test runner
function test(program, expected) {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expected);
}

// Run all tests
tests.forEach(testRun => testRun(test));

console.log('All assertions passed!');