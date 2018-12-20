/* eslint-disable no-console */
const path     = require ('path')
const http     = require ('http')
const express  = require ('express')
const socketIO = require ('socket.io')

const port = process.env.PORT || 3001
const publicPath = path.join (__dirname, '../public/')

const app = express()
const server = http.createServer (app)
const io = socketIO (server)

io.on ('connect', socket => {

    socket.emit ('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat room',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit ('newMessage', {
        from: 'Admin',
        text: 'A new user has entered the chat room',
        createdAt: new Date().getTime()
    })

    socket.on ('createMessage', msg => {

        io.emit ('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        })
        
        // socket.broadcast.emit ('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // })
        
    })
})

app.use (express.static(publicPath))

server.listen (port, () => console.log (`Chat app is listening on port ${port}!`))