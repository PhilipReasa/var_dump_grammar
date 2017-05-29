const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[REFERENCE]', () => {
    it('handles reference values', () => {
        const dump = dumps['reference1']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 2,
            reference: false,
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

    it('handles all types of refernces', () => {
        const dump = dumps['reference2']

        expect(parse(dump)).to.be.deep.equal({
            type: 'object',
            properties: 20,
            className: {
                class: "foo",
                namespace: []
            },
            referenceId: 1,
            reference: false,
            values: [
                {
                    key: 'normalString',
                    value: {
                        length: 29,
                        type: 'string',
                        value: 'normal string (no references)',
                        reference: false
                    }
                }, {
                    key: 'normalInt',
                    value: {
                        type: 'integer',
                        value: 1,
                        reference: false
                    }
                }, {
                    key: 'normalFloat',
                    value: {
                        type: 'float',
                        value: 1.01,
                        reference: false
                    }
                }, {
                    key: 'normalBool',
                    value: {
                        type: 'boolean',
                        value: false,
                        reference: false
                    }
                }, {
                    key: 'normalArray',
                    value: {
                        count: 0,
                        type: 'array',
                        values: [],
                        reference: false
                    }
                }, {
                    key: 'normalObject',
                    value: {
                        properties: 0,
                        referenceId: 2,
                        className: {
                            class: 'stdClass',
                            namespace: []
                        },
                        type: 'object',
                        values: [],
                        reference: false
                    }
                }, {
                    key: 'string',
                    value: {
                        length: 11,
                        type: 'string',
                        value: 'test string',
                        reference: true
                    }
                }, {
                    key: 'stringReference',
                    value: {
                        length: 11,
                        type: 'string',
                        value: 'test string',
                        reference: true
                    }
                }, {
                    key: 'int',
                    value: {
                        type: 'integer',
                        value: 1,
                        reference: true
                    }
                }, {
                    key: 'intReference',
                    value: {
                        type: 'integer',
                        value: 1,
                        reference: true
                    }
                }, {
                    key: 'float',
                    value: {
                        type: 'float',
                        value: 1.01,
                        reference: true
                    }
                }, {
                    key: 'floatReference',
                    value: {
                        type: 'float',
                        value: 1.01,
                        reference: true
                    }
                }, {
                    key: 'bool',
                    value: {
                        type: 'boolean',
                        value: false,
                        reference: true
                    }
                }, {
                    key: 'boolReference',
                    value: {
                        type: 'boolean',
                        value: false,
                        reference: true
                    }
                }, {
                    key: 'null',
                    value: {
                        type: 'null',
                        value: 'NULL',
                        reference: true
                    }
                }, {
                    key: 'nullReference',
                    value: {
                        type: 'null',
                        value: 'NULL',
                        reference: true
                    }
                }, {
                    key: 'array',
                    value: {
                        count: 0,
                        type: 'array',
                        values: [],
                        reference: true
                    }
                }, {
                    key: 'arrayReference',
                    value: {
                        count: 0,
                        type: 'array',
                        values: [],
                        reference: true
                    }
                }, {
                    key: 'object',
                    value: {
                        properties: 0,
                        referenceId: 3,
                        className: {
                            class: 'stdClass',
                            namespace: []
                        },
                        type: 'object',
                        values: [],
                        reference: true
                    }
                }, {
                    key: 'objectReference',
                    value: {
                        properties: 0,
                        referenceId: 3,
                        className: {
                            class: 'stdClass',
                            namespace: []
                        },
                        type: 'object',
                        values: [],
                        reference: true
                    }
                }

            ]
        })
    })
})