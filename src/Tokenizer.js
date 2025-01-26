
/**
 * Tokenizer Spec.
 */
const Spec = [
    //-----------------------------------------
    // Whitespaces:
    
    [/^\s+/, null],

    //-----------------------------------------
    // Comments:
    
    //Skip Single Line Comments
    [/^\/\/.*/, null],
    
    // Skip Multi Line Comments
    [/^\/\*([^*]|\*[^/])*\*\//, null],

    //-----------------------------------------
    // Symbols, delimiters:

    [/^;/, ';'],

    //-----------------------------------------
    // Numbers:
    
    [/^\d+/, 'NUMBER'],

    //-----------------------------------------
    // Strings:
    
    [/^"[^"]*"/, 'STRING'],
    [/^'[^']*'/, 'STRING'],
];

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
     * Whether the tokenizer has reached the end of the file.
     */
    isEOF() {
        return this._cursor === this._string.length;
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
        for (const [regexp, tokenType] of Spec) {
            const tokenValue = this._match(regexp, string);

            if (tokenValue == null) {
                continue;
            }

            // Skip whitespaces.
            if (tokenType == null) {
                return this.getNextToken();
            }
            
            return {
                type: tokenType,
                value: tokenValue,
            };
            
        }

        throw new SyntaxError(`Unexpected token: ${string[0]}`);
    }

    /**
     * Matches a token for a given regular expression.
     */
    _match(regexp, string) {
        const matched = regexp.exec(string);
        if (matched == null) {
            return null;
        }
        this._cursor += matched[0].length;
        return matched[0];
    }
}

module.exports = Tokenizer;