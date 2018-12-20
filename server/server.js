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
    // console.log ('New User Connected')

    socket.emit ('newMessage', {
        from: 'clarkKent',
        text: 'We have to fight together to save this world.',
        createdAt: 1545282990807
    })

    socket.on ('createMessage', function (msg) {console.log ('Msg Sent: ', msg)})

    // socket.on ('disconnect', () => console.log ('User Disconnected'))
})

app.use (express.static(publicPath))

server.listen (port, () => console.log (`Chat app is listening on port ${port}!`))