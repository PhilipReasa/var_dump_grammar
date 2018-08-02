const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[BOOLEANS]', () => {
    it('handles true', () => {
        const dump = dumps['boolean1']

        expect(parse(dump)).to.be.deep.equal([{
            type: 'array',
            count: 1,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'boolean',
                        value: true,
                        reference: false
                    }
                }
            ]
        }])
    })

    it('handles false', () => {
        const dump = dumps['boolean2']

        expect(parse(dump)).to.be.deep.equal([{
            type: 'array',
            count: 1,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'boolean',
                        value: false,
                        reference: false
                    }
                }
            ]
        }])
    })
})