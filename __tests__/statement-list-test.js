module.exports = test => {
    test(
        `
        "hello";
        28;
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'StringLiteral',
                        value: 'hello'
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'NumericLiteral',
                        value: 28
                    }
                }
            ]
        }
    )
}