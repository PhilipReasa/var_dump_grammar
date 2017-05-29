const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[RECURSION]', () => {
    it('handles recursion', () => {
        const dump = dumps['recursion1']

        expect(parse(dump)).to.be.deep.equal({
            type: 'object',
            className: {
                class: 'stdClass',
                namespace: []
            },
            properties: 1,
            referenceId: 1,
            reference: false,
            values: [
                {
                    key: 'selfReference',
                    value: {
                        type: 'recursion',
                        value: 'RECURSION'
                    }
                }
            ]
        })
    })
})