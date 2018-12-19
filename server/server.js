const path     = require ('path')
const http     = require ('http')
const express  = require ('express')
const socketIO = require ('socket.io')

const port = process.env.PORT || 3000
const publicPath = path.join (__dirname, '../public/')

const app = express()
const server = http.createServer (app)
const io = socketIO (server)

io.on ('connect', socket => {
    console.log ('New User Connected')
    socket.on ('disconnect', () => console.log ('User Disconnected'))
})

app.use (express.static(publicPath))

server.listen (port, () => console.log ('Chat app is listening on port 3000!'))