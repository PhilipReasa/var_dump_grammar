const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[INTEGERS]', () => {
    it('handles positive integers', () => {
      const test = '' +
        'array(1) {\n' +
        '  ["testing"]=&gt;\n' +
        '  int(1)\n'+
        '}'

        console.log(parse(test))
        expect(parse(test)).to.be.an('object')
        expect(parse(test)).to.be.deep.equal({
            type: 'array',
            count: '1',
            values: [
                {
                    key: 'testing',
                    value: {
                        type: 'integer',
                        value: 1
                    }
                }
            ]
        })
    })
})