const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect
const fs = require('fs')
const dumps = {}

beforeEach('load all test files into memory', (done) => {
    fs.readdir('./test/dumps', (err, files) => {
        if (err) {
            throw new Error(`Failed to load directory of dumps: ${err}`)
        }

        let count = 0
        files.forEach((file) => {
            fs.readFile(`./test/dumps/${file}`, { encoding: 'UTF-8' }, (err, data) => {
                if (err) {
                    throw new Error(`Failed to load file: ${file}`)
                }

                dumps[file] = data
                count ++
                if (count === files.length) {
                    done()
                }
            })
        })
    })
})

describe('[INTEGERS]', () => {
    it('handles positive integers', () => {
        const test = dumps['integer1']

        expect(parse(test)).to.be.an('object')
        expect(parse(test)).to.be.deep.equal({
            type: 'array',
            count: 4,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'integer',
                        value: 0
                    }
                }, {
                    key: 1,
                    value: {
                        type: 'integer',
                        value: 100
                    }
                }, {
                    key: 2,
                    value: {
                        type: 'integer',
                        value: 1000000000
                    }
                }, {
                    key: 3,
                    value: {
                        type: 'integer',
                        value: 10000000000123
                    }
                }
            ]
        })
    })
})