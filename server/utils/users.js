class Users {
    constructor () {
        this.users = []
    }
 
    addUser (id, name, room) {
        var user = {id, name, room}
        this.users.push (user)
        return user
    }

    removeUser (id) {
        const idx = this.users.findIndex (i => i.id == id)
        if (idx + 1) return this.users.splice (idx, 1) [0]
    }

    getUser (id) {
        return this.users.filter (i => i.id == id) [0]
    }

    getUserList (room) {
        return this.users.filter (i => i.room == room).map (i => i.name)
    }
}

module.exports = { Users }