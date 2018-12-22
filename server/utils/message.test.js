/* eslint-disable no-undef */
const {genMsg} = require ('./message')

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