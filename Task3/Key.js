module.exports = class Key {
    createKey() {
        const secureRandom = require('secure-random')
        let elements = secureRandom.randomArray(256)
        return elements.map(element => {
            return element.toString(16)
        }).join('')
    }
}

//const test = new Key()
//console.log(test.createKey())
