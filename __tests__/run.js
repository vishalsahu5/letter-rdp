/**
 * Main test runner
 */

const { Parser } = require('../src/Parser');

const parser = new Parser();

const program = `  
    /**
     * Documentation Comment
     */
    " 42 "  
`;

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));