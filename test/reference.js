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
                    property:  {
                        propertyChain: [
                            "normalString"
                        ],
                        propertyScope: null
                    },
                    value: {
                        length: 29,
                        type: 'string',
                        value: 'normal string (no references)',
                        reference: false
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "normalInt"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'integer',
                        value: 1,
                        reference: false
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "normalFloat"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'float',
                        value: 1.01,
                        reference: false
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "normalBool"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'boolean',
                        value: false,
                        reference: false
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "normalArray"
                        ],
                        propertyScope: null
                    },
                    value: {
                        count: 0,
                        type: 'array',
                        values: [],
                        reference: false
                    }
                }, {
                    property: {
                        propertyChain: [
                            "normalObject"
                        ],
                        propertyScope: null
                    },
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
                    property: {
                        propertyChain: [
                            "string"
                        ],
                        propertyScope: null
                    },
                    value: {
                        length: 11,
                        type: 'string',
                        value: 'test string',
                        reference: true
                    }
                }, {
                    property: {
                        propertyChain: [
                            "stringReference"
                        ],
                        propertyScope: null
                    },
                    value: {
                        length: 11,
                        type: 'string',
                        value: 'test string',
                        reference: true
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "int"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'integer',
                        value: 1,
                        reference: true
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "intReference"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'integer',
                        value: 1,
                        reference: true
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "float"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'float',
                        value: 1.01,
                        reference: true
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "floatReference"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'float',
                        value: 1.01,
                        reference: true
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "bool"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'boolean',
                        value: false,
                        reference: true
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "boolReference"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'boolean',
                        value: false,
                        reference: true
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "null"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'null',
                        value: 'NULL',
                        reference: true
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "nullReference"
                        ],
                        propertyScope: null
                    },
                    value: {
                        type: 'null',
                        value: 'NULL',
                        reference: true
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "array"
                        ],
                        propertyScope: null
                    },
                    value: {
                        count: 0,
                        type: 'array',
                        values: [],
                        reference: true
                    }
                }, {
                    property:  {
                        propertyChain: [
                            "arrayReference"
                        ],
                        propertyScope: null
                    },
                    value: {
                        count: 0,
                        type: 'array',
                        values: [],
                        reference: true
                    }
                }, {
                    property: {
                        propertyChain: [
                            "object"
                        ],
                        propertyScope: null
                    },
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
                    property: {
                        propertyChain: [
                            "objectReference"
                        ],
                        propertyScope: null
                    },
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