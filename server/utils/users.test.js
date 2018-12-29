const {Users} = require ('./users')

var users

beforeEach (() => {
    users = new Users()
    users.users = [
        {id:'1', name:'Afroz',  room: 'NodeJS Course'},
        {id:'2', name:'Badri',  room: 'ReactJS Course'},
        {id:'3', name:'Chetan', room: 'ReactJS Course'},
        {id:'4', name:'Dhani',  room: 'ES6 Course'},
        {id:'5', name:'Easwar', room: 'ES6 Course'},
        {id:'6', name:'Fakir',  room: 'ES6 Course'},
    ]
})

describe ('User', () => {
    it ('Should add new user to a room', () => {
        const user = users.addUser ('7', 'Srini', 'NodeJS Course')
        expect (users.users.length).toBe (7)
        expect (user.id).toBe('7')
        expect (user.name).toBe('Srini')
        expect (user.room).toBe('NodeJS Course')
    })

    it ('Should remove user', () => {
        const user = users.removeUser ('3')
        expect (users.users.length).toBe (5)
        expect (user.id).toBe('3')
        expect (user.name).toBe('Chetan')
        expect (user.room).toBe('ReactJS Course')
    })

    it ('Should not remove user', () => {
        const user = users.removeUser ('8')
        expect (users.users.length).toBe (6)
        expect (user).toBeUndefined()
    })

    it ('Should fetch user', () => {
        const user = users.getUser ('2')
        expect (users.users.length).toBe (6)
        expect (user.id).toBe('2')
        expect (user.name).toBe('Badri')
        expect (user.room).toBe('ReactJS Course')
    })

    it ('Should not fetch user', () => {
        const user = users.getUser ('8')
        expect (users.users.length).toBe (6)
        expect (user).toBeUndefined()
    })

    it ('Should get NodeJS Course room user list', () => {
        const names = users.getUserList ('NodeJS Course')
        expect (users.users.length).toBe (6)
        expect (names.length).toBe (1)
        expect (names).toContain('Afroz')
    })

    it ('Should get ReactJS Course room user list', () => {
        const names = users.getUserList ('ReactJS Course')
        expect (users.users.length).toBe (6)
        expect (names.length).toBe (2)
        expect (names).toContain('Badri')
        expect (names).toContain('Chetan')
    })

    it ('Should get ES6 Course room user list', () => {
        const names = users.getUserList ('ES6 Course')
        expect (users.users.length).toBe (6)
        expect (names.length).toBe (3)
        expect (names).toContain('Dhani')
        expect (names).toContain('Easwar')
        expect (names).toContain('Fakir')
    })
})