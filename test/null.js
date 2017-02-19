const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[NULLS]', () => {
    it('handles null values', () => {
        const dump = dumps['null1']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'null',
                        value: 'NULL',
                        reference: false
                    }
                }
            ]
        })
    })
})