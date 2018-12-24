var socket = io ()

socket.on ('connect', function () {console.log ('Connected to Server')})
socket.on ('disconnect', function () {console.log ('Disconnected to Server')})
socket.on ('newMessage', function (msg) {
    $ ('#messages').append ($ ('<li></li>').text (`${msg.from}: ${msg.text}`))
})

socket.on ('newLogMsg', function (msg) {
    var li = $ ('<li></li>')
    var a = $ ('<a target="_blank">My current location</a>')
    li.text (`${msg.from}: `)
    a.attr ('href', msg.url)
    li.append (a)
    $ ('#messages').append (li)
})

$ ('#message-form').on ('submit', function (e) {
    e.preventDefault()
    socket.emit ('createMessage', {from: 'Srini', text: $ ('[name=message]').val()}
    )    
})

var btnLocation = $ ('#send-location')
btnLocation.on ('click', function () {
    if (!navigator.geolocation) return alert ('Geolocation is not supported')
    navigator.geolocation.getCurrentPosition (
        function (pos) {
            socket.emit ('createLocMsg', {lat: pos.coords.latitude, lon: pos.coords.longitude})
        },
        function (err) { alert (err.message) })
})