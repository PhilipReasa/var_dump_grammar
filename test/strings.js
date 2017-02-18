const parse = require('../dist/var_dump_grammar_commonjs').parse
const expect = require('chai').expect

describe('[STRING]', () => {
    it('Handles the empty string', () => {
        const dump = dumps['string1']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 0,
                        value: ""
                    }
                }
            ]
        })
    })

    it('Handles the single letter string', () => {

    })

    it('Handles the string with just a double quote', () => {

    })

    it('Handles the string with just a single quote', () => {

    })

    it('Handles a string that contains a link', () => {

    })

    it('Handles a string with a new line in the middle', () => {

    })

    it('Handles a string with a new line at the end', () => {

    })

    it('Handles a single new line', () => {

    })

    it('Handles a new line followed by a space', () => {

    })

    it('Handles really complicated jabbering', () => {

    })

    it('Handles a new line as the first character', () => {

    })

    it('Has the wrong length for the string (yes this is possible with non-standard chars)', () => {

    })
})