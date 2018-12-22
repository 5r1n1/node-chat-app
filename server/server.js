/* eslint-disable no-console */
const path     = require ('path')
const http     = require ('http')
const express  = require ('express')
const socketIO = require ('socket.io')

const genMsg   = require ('./utils/message')

const port = process.env.PORT || 3001
const publicPath = path.join (__dirname, '../public/')

const app = express()
const server = http.createServer (app)
const io = socketIO (server)

io.on ('connect', socket => {
    socket.emit ('newMessage', genMsg ('Admin','Welcome to the chat room'))
    socket.broadcast.emit ('newMessage', genMsg ('Admin', 'A new user has entered the chat room'))
    socket.on ('createMessage', msg => io.emit ('newMessage', genMsg (msg.from, msg.text)))        
})

app.use (express.static(publicPath))

server.listen (port, () => console.log (`Chat app is listening on port ${port}!`))