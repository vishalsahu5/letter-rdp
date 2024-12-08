/**
 * Tokenizer class.
 * Lazily pulls a token from a stream.
 */

class Tokenizer {
    /**
     * Initializes the tokenizer.
     */
    constructor() {
        this._string = '';
        this._cursor = 0;
    }
    
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    /**
     * Determines if there are more tokens.
    */
    hasMoreTokens() {  
        return this._cursor < this._string.length;
    }

    /**
     * Obtains the next token.
     */
    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string  = this._string.slice(this._cursor);

        //Numbers:
        if (!Number.isNaN(Number(string[0]))) {
            let number = '';

            while (!Number.isNaN(Number(string[this._cursor]))) {
                number += string[this._cursor++];
            }
            return {
                type: 'NUMBER',
                value: number,
            };
        }
    }
}

module.exports = Tokenizer;