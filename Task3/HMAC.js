module.exports = class HMAC {
    HMAC

    create(key, message) {
        const {createHmac} = require('crypto')
        const HMAC = createHmac('sha3-256', key)
        HMAC.update(message)
        this.HMAC = HMAC.digest('hex')
    }
}

