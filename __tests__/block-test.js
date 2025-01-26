module.exports = test => {
    test(`
        {
            42;

            "hello";
        }
    `, {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'NumericLiteral',
                            value: 42
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'StringLiteral',
                            value: 'hello'
                        }
                    }
                ]
            }
        ],
    });

    // Empty Block
    test(`
        {}
    `, {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
                body: []
            }
        ],
    });

    //nested block
    test(`
        42;
        {
            "hello";
        }
        `, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'NumericLiteral',
                    value: 42
                }
            },
            {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'StringLiteral',
                            value: 'hello'
                        }
                    }
                ]
            }
        ],
    })
};