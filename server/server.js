const path     = require ('path')
const http     = require ('http')
const express  = require ('express')
const socketIO = require ('socket.io')

const {isRealStr} = require ('./utils/validation')
const {genMsg, genLocMsg} = require ('./utils/message')
const {Users} = require ('./utils/users')

const port = process.env.PORT || 3001
const publicPath = path.join (__dirname, '../public/')

const app = express()
const server = http.createServer (app)
const io = socketIO (server)
const users = new Users ()

io.on ('connect', socket => {
    socket.on ('join', (params, callback) => {
        if (!isRealStr(params.name) || !isRealStr(params.room))
            return callback ('Name and Room are required') 

        socket.join (params.room)
        users.addUser (socket.id, params.name, params.room)

        io.to (params.room).emit ('updateUserList', users.getUserList (params.room))
        socket.emit ('newMessage', genMsg ('Admin',`Welcome to the ${params.room} chat room`))
        socket.broadcast.to(params.room).emit ('newMessage', genMsg ('Admin', `${params.name} has joined`))
        })

    socket.on ('createMessage', msg => 
        io.emit ('newMessage', genMsg (msg.from, msg.text)))

    socket.on ('createLocMsg', (msg, callback) => {
        io.emit ('newLocMsg', genLocMsg (msg.from, msg.lat, msg.lon))
        callback ()
    })

    socket.on ('disconnect', () => {
        const user = users.removeUser (socket.id)
        if (user) {
            io.to (user.room).emit ('newMessage', genMsg ('Admin', `${user.name} has left`))
            io.to (user.room).emit ('updateUserList', users.getUserList (user.room))
        }

    })
})

app.use (express.static(publicPath))
server.listen (port, () => console.log (`Chat app is listening on port ${port}!`))