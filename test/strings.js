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
                        value: "",
                        reference: false
                    }
                }
            ]
        })
    })

    it('Handles the single letter string', () => {
        const dump = dumps['string2']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 1,
                        value: "a",
                        reference: false
                    }
                }
            ]
        })
    })

    it('Handles the string with just a double quote', () => {
        const dump = dumps['string3']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 1,
                        value: "\"",
                        reference: false
                    }
                }
            ]
        })
    })

    it('Handles the string with just a single quote', () => {
        const dump = dumps['string4']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 1,
                        value: "\'",
                        reference: false
                    }
                }
            ]
        })
    })

    it('Handles a string that contains a link', () => {
        const dump = dumps['string5']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 49,
                        value: "<a href='http://sampleLink.com/#/sample'>link</a>",
                        reference: false
                    }
                }
            ]
        })
    })

    it('Handles a string with a new line in the middle', () => {
        const dump = dumps['string6']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 24,
                        value: "first-word\n second-word",
                        reference: false
                    }
                }
            ]
        })
    })

    it('Handles a string with a new line at the end', () => {
        const dump = dumps['string7']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 12,
                        value: "first-word \n",
                        reference: false
                    }
                }
            ]
        })
    })

    it('Handles a single new line', () => {
        const dump = dumps['string8']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 1,
                        value: "\n",
                        reference: false
                    }
                }
            ]
        })
    })

    it('Handles a new line followed by a space', () => {
        const dump = dumps['string9']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 2,
                        value: "\n ",
                        reference: false
                    }
                }
            ]
        })
    })

    it('Handles really complicated jabbering', () => {
        const dump = dumps['string10']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 37,
                        value: "\"\n\n\"\"\"\nthere should be something here",
                        reference: false
                    }
                }
            ]
        })
    })

    it('Has the wrong length for the string (yes this is possible with non-standard chars)', () => {
        const dump = dumps['string11']

        expect(parse(dump)).to.be.deep.equal({
            type: 'array',
            count: 1,
            values: [
                {
                    key: 0,
                    value: {
                        type: 'string',
                        length: 36,
                        value: "мультфильм, комедия",
                        reference: false
                    }
                }
            ]
        })
    })
})