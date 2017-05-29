const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

// objects are odd, and a lot of technically illegal property names are actually possible,
// so these test make sure that we handle all of them
describe('[OBJECTS]', () => {
    it('handles number object keys', () => {
        const dump = dumps['objects1']

        expect(parse(dump)).to.be.deep.equal({
            type: 'object',
            properties: 2,
            className: {
                class: "SimpleXMLElement",
                namespace: []
            },
            referenceId: 356,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        value: '0',
                        length: 1,
                        reference: false
                    }
                },
                {
                    key: '1',
                    value: {
                        type: 'string',
                        value: '1',
                        length: 1,
                        reference: false
                    }
                }
            ]
        })
    })

    it('handles objects with illegal key names', () => {
        const dump = dumps['objects2']

        expect(parse(dump)).to.be.deep.equal({
            type: 'object',
            properties: 2,
            className: {
                class: "foo",
                namespace: []
            },
            referenceId: 1,
            reference: false,
            values: [
                {
                    key: 'thumbnail-width',
                    value: {
                        type: 'integer',
                        value: 10,
                        reference: false
                    }
                },
                {
                    key: '@sign',
                    value: {
                        type: 'integer',
                        value: 1,
                        reference: false
                    }
                }
            ]
        })
    })
})