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

io.on ('connect', socket => 
    socket.on ('createMessage', msg => 
        io.emit ('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        })))

app.use (express.static(publicPath))

server.listen (port, () => console.log (`Chat app is listening on port ${port}!`))