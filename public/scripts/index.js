const socket    = io ()
const msgInput  = $ ('[name=message]')
const msgForm   = $ ('#message-form')
const msgList   = $ ('#messages')
const locButton = $ ('#send-location')

socket.on ('connect', function () {console.log ('Connected to Server')})
socket.on ('disconnect', function () {console.log ('Disconnected to Server')})
socket.on ('newMessage', function (msg) {
    const msgAt = moment(msg.createdAt).format('h:mm a')
    msgList.append ($ ('<li></li>').text (`${msg.from} ${msgAt}: ${msg.text}`))
})

socket.on ('newLogMsg', function (msg) {
    const msgAt = moment(msg.createdAt).format('h:mm a')
    var li = $ ('<li></li>')
    var a = $ ('<a target="_blank">My current location</a>')
    li.text (`${msg.from} ${msgAt}: `)
    a.attr ('href', msg.url)
    li.append (a)
    msgList.append (li)
})

msgForm.on ('submit', function (e) {
    e.preventDefault()
    socket.emit (
        'createMessage',
        {from: 'Srini', text: msgInput.val()},
        function () { msgInput.val('').focus() }
    )    
})

locButton.on ('click', function () {
    if (!navigator.geolocation) return alert ('Geolocation is not supported')
    locButton.prop ('disabled', true).html ('Sending Location...')
    navigator.geolocation.getCurrentPosition (
        function (pos) {
            socket.emit (
                'createLocMsg',
                {lat: pos.coords.latitude, lon: pos.coords.longitude},
                function () {
                    locButton.prop ('disabled', false).html ('Send Location')
                })
        },
        function (err) { 
            alert (err.message)
            locButton.prop ('disabled', false).html ('Send Location')
        })
    msgInput.focus()
})