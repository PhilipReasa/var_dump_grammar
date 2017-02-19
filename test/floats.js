const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[FLOATS]', () => {
    it('handles positive floats', () => {
        const dump = dumps['float1']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 6,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'float',
                        value: 0,
                        reference: false
                    }
                }, {
                    key: 1,
                    value: {
                        type: 'float',
                        value: 1,
                        reference: false
                    }
                }, {
                    key: 2,
                    value: {
                        type: 'float',
                        value: 1.00001,
                        reference: false
                    }
                }, {
                    key: 3,
                    value: {
                        type: 'float',
                        value: "1.2E-15",
                        reference: false
                    }
                }, {
                    key: 4,
                    value: {
                        type: 'float',
                        value: '1.0000000000128E+26',
                        reference: false
                    }
                }, {
                    key: 5,
                    value: {
                        type: 'float',
                        value: 12318.1238,
                        reference: false
                    }
                }
            ]
        })
    })

    it('handles negative floats', () => {
        const dump = dumps['float2']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 6,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'float',
                        value: -0, // yes, JS has -0 (vs +0)
                        reference: false
                    }
                }, {
                    key: 1,
                    value: {
                        type: 'float',
                        value: -1,
                        reference: false
                    }
                }, {
                    key: 2,
                    value: {
                        type: 'float',
                        value: -1.00001,
                        reference: false
                    }
                }, {
                    key: 3,
                    value: {
                        type: 'float',
                        value: "-1.2E-15",
                        reference: false
                    }
                }, {
                    key: 4,
                    value: {
                        type: 'float',
                        value: '-1.0000000000128E+26',
                        reference: false
                    }
                }, {
                    key: 5,
                    value: {
                        type: 'float',
                        value: -12318.1238,
                        reference: false
                    }
                }
            ]
        })
    })
})
