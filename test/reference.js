const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[REFERENCE]', () => {
    it('handles reference values', () => {
        const dump = dumps['reference1']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 2,
            values: [
                {
                    key: 0,
                    value: {
                        length: 11,
                        type: 'string',
                        value: 'test string',
                        reference: false
                    }
                }, {
                    key: 1,
                    value: {
                        length: 11,
                        type: 'string',
                        reference: true,
                        value: 'test string'
                    }
                }
            ]
        })
    })
})