const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[RESOURCE]', () => {
    it('handles resources', () => {
        const dump = dumps['resource1']

        expect(parse(dump)).to.be.deep.equal([{
            type: 'array',
            count: 6,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'resource',
                        referenceId: 4,
                        value: 'curl',
                        reference: false
                    }
                }, {
                    key: 1,
                    value: {
                        type: 'resource',
                        referenceId: 5,
                        value: 'stream',
                        reference: false
                    }
                }, {
                    key: 2,
                    value: {
                        type: 'resource',
                        referenceId: 6,
                        value: 'gd',
                        reference: false
                    }
                }, {
                    key: 3,
                    value: {
                        type: 'resource',
                        referenceId: 8,
                        value: 'sockets i/o vector',
                        reference: false
                    }
                }, {
                    key: 4,
                    value: {
                        type: 'resource',
                        referenceId: 10,
                        value: 'zlib.inflate',
                        reference: false
                    }
                }, {
                    key: 5,
                    value: {
                        type: 'resource',
                        referenceId: 12,
                        value: 'mysql link persistent',
                        reference: false
                    }
                }
            ]
        }])
    })
})