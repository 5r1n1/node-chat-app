const {isRealStr} = require ('./validation')

describe ('Validation routines', () => {
    it ('Should fail for a number', () => 
        expect (isRealStr (123)).toBe (false))
    it ('Should fail for a string of spaces', () => 
        expect (isRealStr ('  ')).toBe (false))
    it ('Should pass for a string', () => 
        expect (isRealStr ('  123  ')).toBe (true))
})
