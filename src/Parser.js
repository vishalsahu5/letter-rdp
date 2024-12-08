/**
 * Letter parser: Recursive descent implementation.
 */

const Tokenizer = require('./Tokenizer');

class Parser {
    /**
     * Initializes the parser.
     */
    constructor() {
        this._tokenizer = new Tokenizer();
        this._string = '';
    }

    /**
     * Parsers a string into an AST.
     * 
     */
    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        // Prime the tokenizer to obtain the first token 
        // which is our lookahead. The lookahead is used for predictive parsing.
        this._lookahead = this._tokenizer.getNextToken();

        // Parse recursively starting from the main
        // entry point, the Program:
        return this.Program();
    }

    /**
     * Main Entry Point
     * Prograam 
     *  : NumericLiteral
     *  | ;
     */
    Program() {
        return {
            type: 'Program',
            body: this.NumericLiteral(),
        };
    }

    /**
     * NumericLiteral
     *  : Number
     *  ;
     */
    NumericLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumericLiteral',
            value: Number(token.value),
        };
    }

    /**
     * Expects a token of a given type.
     */
    _eat(type) {
        const token = this._lookahead;

        if (token == null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: ${type}`,
            );
        }

        if (token.type !== type) {
            throw new SyntaxError(
                `Unexpected token: ${token.type}, expected: ${type}`,
            );
        }

        //Advance to next token.
        this._lookahead = this._tokenizer.getNextToken();

        return token;
    }
}

module.exports = {
    Parser,
};