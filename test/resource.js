const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[RESOURCE]', () => {
    it('handles resources', () => {
        const dump = dumps['resource1']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 6,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'resource',
                        reference: 4,
                        value: 'curl'
                    }
                }, {
                    key: 1,
                    value: {
                        type: 'resource',
                        reference: 5,
                        value: 'stream'
                    }
                }, {
                    key: 2,
                    value: {
                        type: 'resource',
                        reference: 6,
                        value: 'gd'
                    }
                }, {
                    key: 3,
                    value: {
                        type: 'resource',
                        reference: 8,
                        value: 'sockets i/o vector'
                    }
                }, {
                    key: 4,
                    value: {
                        type: 'resource',
                        reference: 10,
                        value: 'zlib.inflate'
                    }
                }, {
                    key: 5,
                    value: {
                        type: 'resource',
                        reference: 12,
                        value: 'mysql link persistent'
                    }
                }
            ]
        })
    })
})