var socket = io ()

socket.on ('connect', function () {console.log ('Connected to Server')})
socket.on ('disconnect', function () {console.log ('Disconnected to Server')})
socket.on ('newMessage', function (msg) {
    $ ('#messages').append ($ ('<li>,/li>').text (`${msg.from}: ${msg.text}`))
})

$ ('#message-form').on ('submit', function (e) {
    e.preventDefault()
    socket.emit ('createMessage', {from: 'Srini', text: $ ('[name=message]').val()}
    )    
})
