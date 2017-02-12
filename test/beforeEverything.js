const fs = require('fs')
global.dumps = {} // for all tests

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
