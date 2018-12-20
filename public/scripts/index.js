var socket = io()
socket.on ('connect', function () {console.log ('Connected to Server')})
socket.on ('disconnect', function () {console.log ('Disconnected to Server')})
socket.on ('newMessage', function (email) {console.log ('New Message: ', email)})
socket.emit ('createMessage', {
    from: 'sriniGopal',
    text: 'I am always ready for you and I love a good fight'
})