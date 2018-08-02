const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[INTEGERS]', () => {
    it('handles positive integers', () => {
        const test = dumps['integer1']

        expect(parse(test)).to.be.deep.equal([{
            type: 'array',
            count: 4,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'integer',
                        value: 0,
                        reference: false
                    }
                }, {
                    key: 1,
                    value: {
                        type: 'integer',
                        value: 100,
                        reference: false
                    }
                }, {
                    key: 2,
                    value: {
                        type: 'integer',
                        value: 1000000000,
                        reference: false
                    }
                }, {
                    key: 3,
                    value: {
                        type: 'integer',
                        value: 10000000000123,
                        reference: false
                    }
                }
            ]
        }])
    })

    it('handles negative integers', () => {
        const test = dumps['integer2']

        expect(parse(test)).to.be.deep.equal([{
            type: 'array',
            count: 4,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'integer',
                        value: 0,
                        reference: false
                    }
                }, {
                    key: 1,
                    value: {
                        type: 'integer',
                        value: -100,
                        reference: false
                    }
                }, {
                    key: 2,
                    value: {
                        type: 'integer',
                        value: -1000000000,
                        reference: false
                    }
                }, {
                    key: 3,
                    value: {
                        type: 'integer',
                        value: -10000000000123,
                        reference: false
                    }
                }
            ]
        }])
    })
})