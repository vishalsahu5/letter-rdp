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
     *  : StatementList
     *  | ;
     */
    Program() {
        return {
            type: 'Program',
            body: this.StatementList(),
        };
    }

    /**
     * StatementList
     *  : Statement
     *  | StatementList Statement
     *  ;
     */

    StatementList(stopLookahead = null) {
        const statementList = [this.Statement()];
        while (this._lookahead != null && this._lookahead.type !== stopLookahead) {
            statementList.push(this.Statement());
        }
        return statementList;
    }

    /**
     * Statement
     * : ExpressionStatement
     * | BlockStatement
     * | EmptyStatement
     * ;
     */

    Statement() {
        switch (this._lookahead.type) {
            case ';': {
                return this.EmptyStatement();
            }
            case '{': {
                return this.BlockStatement();
            }
            default: {
                return this.ExpressionStatement();
            }
        }
    }

    /**
     * EmptyStatement
     * : ';'
     * ;
     */
    EmptyStatement() {
        this._eat(';');
        return {
            type: 'EmptyStatement',
        };
    }

    /**
     * BlockStatement
     * : '{' OptStatementList '}'
     * ;
     */

    BlockStatement() {
        this._eat('{');
        const body = this._lookahead.type !== '}' ? this.StatementList('}') : [];
        this._eat('}');
        return {
            type: 'BlockStatement',
            body,
        };
    }

    /**
     * ExpressionStatement
     * : Expression ';'
     * ;
     */

    ExpressionStatement() {
        const expression = this.Expression();
        this._eat(';');
        return {
            type: 'ExpressionStatement',
            expression,
        }
    }

    /**
     * Expression
     * : Literal
     * ;
     */

    Expression() {
        return this.Literal();
    }

    /**
     * Literal
     * : NumericLiteral
     * | StringLiteral
     * ;
     */
    Literal() {
        switch (this._lookahead.type) {
            case 'NUMBER':
                return this.NumericLiteral();
            case 'STRING':
                return this.StringLiteral();
            default:
                throw new SyntaxError(
                    `Unexpected token: ${this._lookahead.type}`,
                );
        }
    }

    /**
     * StringLiteral
     * : String
     * ;
     */
    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1),
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