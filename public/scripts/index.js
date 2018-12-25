const socket    = io ()
const msgInput  = $ ('[name=message]')
const msgForm   = $ ('#message-form')
const msgList   = $ ('#messages')
const msgTempl  = $ ('#message-template')
const locTempl  = $ ('#location-message-template')
const locButton = $ ('#send-location')

function scrollToBottom () {
    const scrollHeight  = msgList.prop ('scrollHeight')
    const clientHeight  = msgList.prop ('clientHeight')

    if (scrollHeight == clientHeight) return

    const scrollTop     = msgList.prop ('scrollTop')
    const newMsg        = msgList.children ('li:last-child')
    const prevMsg       = newMsg.prev ()
    const newMsgHeight  = newMsg.outerHeight()
    const prevMsgHeight = prevMsg.outerHeight()

    if (scrollTop + clientHeight + prevMsgHeight + newMsgHeight >= scrollHeight)
        msgList.scrollTop (scrollHeight)
}

socket.on ('connect', function () {
    msgInput.focus()
    console.log ('Connected to Server')
})

socket.on ('disconnect', function () {
    console.log ('Disconnected to Server')
})

socket.on ('newMessage', function (msg) {
    const msgAt = moment (msg.createdAt).format ('h:mm a')
    const templ = msgTempl.html ()
    const html = Mustache.render (templ,
        {from: msg.from, text: msg.text, msgAt})
    msgList.append (html)
    scrollToBottom ()
})

socket.on ('newLocMsg', function (msg) {
    const msgAt = moment(msg.createdAt).format('h:mm a')
    const templ = locTempl.html ()
    const html = Mustache.render (templ,
        {from: msg.from, url: msg.url, msgAt})
    msgList.append (html)
    scrollToBottom ()
})

msgForm.on ('submit', function (e) {
    e.preventDefault()
    const text = msgInput.val()
    if (text.trim().length < 1) return
    socket.emit ('createMessage', {from: 'Srini', text})    
    msgInput.val('').focus()
})

locButton.on ('click', function () {
    msgInput.focus()
    if (!navigator.geolocation) return alert ('Geolocation is not supported')
    locButton.prop ('disabled', true).html ('Sending Location...')
    navigator.geolocation.getCurrentPosition (
        function (pos) {
            socket.emit ('createLocMsg', {
                    from: 'Srini',
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                },
                function () {
                    locButton.prop ('disabled', false).html ('Send Location')
                })
        },
        function (err) { 
            alert (err.message)
            locButton.prop ('disabled', false).html ('Send Location')
        })
})