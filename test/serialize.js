const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[SERIALIZED DATA]', () => {
    it('Handles Serialized Data', () => {
        const test = dumps['serialize']

        expect(parse(test)).to.be.deep.equal([{
            type: 'array',
            count: 1,
            reference: false,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 186,
                        value: 'O:3:"foo":6:{s:12:"normalString";s:29:"normal string (no references)";s:9:"normalInt";i:1;s:11:"normalFloat";d:1.01;s:10:"normalBool";b:0;s:11:"normalArray";a:0:{}s:12:"normalObject";N;}',
                        reference: false
                    }
                }
            ]
        }])
    })
})