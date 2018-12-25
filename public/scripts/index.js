const socket    = io ()
const msgInput  = $ ('[name=message]')
const msgForm   = $ ('#message-form')
const msgList   = $ ('#messages')
const msgTempl  = $ ('#message-template')
const locTempl  = $ ('#location-message-template')
const locButton = $ ('#send-location')

socket.on ('connect', function () {console.log ('Connected to Server')})
socket.on ('disconnect', function () {console.log ('Disconnected to Server')})
socket.on ('newMessage', function (msg) {
    const msgAt = moment (msg.createdAt).format ('h:mm a')
    const templ = msgTempl.html ()
    const html = Mustache.render (templ,
        {from: msg.from, text: msg.text, msgAt})
    msgList.append (html)
})

socket.on ('newLocMsg', function (msg) {
    const msgAt = moment(msg.createdAt).format('h:mm a')
    const templ = locTempl.html ()
    const html = Mustache.render (templ,
        {from: msg.from, url: msg.url, msgAt})
    msgList.append (html)
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