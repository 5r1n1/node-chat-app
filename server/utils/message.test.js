const { genMsg, genLocMsg } = require ('./message')

describe ('Test genMsg', () => {
    it ('Should generate correct message object', () => {
        const from = 'sriniGopal'
        const text = 'I am OK - you\'re OK'
        const msg = genMsg (from, text)

        expect (msg.from).toBe(from)
        expect (msg.text).toBe(text)
        expect (typeof msg.createdAt).toBe('number')
    })
})

describe ('Test genLocMsg', () => {
    it ('Should generate correct location message', () => {
        const from = 'sriniGopal'
        const latitude = 13.0272
        const longitude = 80.2547
        const msg = genLocMsg (from, latitude, longitude)

        expect (msg.from).toBe(from)
        expect (msg.url).toBe(`https://www.google.com/maps?q=loc:13.0272,80.2547`)
        expect (typeof msg.createdAt).toBe('number')
    })
})