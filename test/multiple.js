const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[MULTIPLE]', () => {
    it('Handles single var_dumps', () => {
        const dump = dumps['multiple1']

        expect(parse(dump)).to.be.deep.equal([{
            type: 'array',
            count: 1,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 9,
                        value: "only dump",
                        reference: false
                    }
                }
            ]
        }])
    })

    it('Handles multiple var_dumps', () => {
        const dump = dumps['multiple2']

        expect(parse(dump)).to.be.deep.equal([{
            type: 'array',
            count: 1,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 10,
                        value: "first dump",
                        reference: false
                    }
                }
            ]
        }, {
            type: 'array',
            count: 1,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 9,
                        value: "last dump",
                        reference: false
                    }
                }
            ]
        }])
    })

    it('Handles multiple var_dumps of objects and arrays', () => {
        const dump = dumps['multiple3']

        expect(parse(dump)).to.be.deep.equal([{
            type: 'array',
            count: 1,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 10,
                        value: "first dump",
                        reference: false
                    }
                }
            ]
        }, {
            className: {
                class: "SimpleXMLElement",
                namespace: []
            },
            properties: 1,
            reference: false,
            referenceId: 1,
            type: "object",
            values: [
                {
                    key: 0,
                    value: {
                        length: 11,
                        reference: false,
                        type: "string",
                        value: "middle dump"
                    }
                }
            ]
        }, {
                className: {
                    class: "SimpleXMLElement",
                    namespace: []
                },
                properties: 1,
                reference: false,
                referenceId: 2,
                type: "object",
                values: [
                    {
                        key: 0,
                        value: {
                            length: 9,
                            reference: false,
                            type: "string",
                            value: "last dump"
                        }
                    }
                ]
        }])
    })
})