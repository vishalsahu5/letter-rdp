module.exports = test => {
    // Numeric Literal
    test(`28;`, {
        "type": "Program",
        "body": [{
            type: 'ExpressionStatement',
            expression: {
                type: 'NumericLiteral',
                value: 28,
            }
        }],
    });

    // String Literal
    test(`"Hello, World!";`, {
        "type": "Program",
        "body": [{
            type: 'ExpressionStatement',
            expression: {
                type: 'StringLiteral',
                value: "Hello, World!",
            }
        }],
    });

    // String Literal
    test(`'Hello, World!';`, {
        "type": "Program",
        "body": [{
            type: 'ExpressionStatement',
            expression: {
                type: 'StringLiteral',
                value: 'Hello, World!',
            }
        }],
    });
}