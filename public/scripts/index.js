/* eslint-disable no-console */
/* global io */

var socket = io ()

socket.on ('connect', function () {console.log ('Connected to Server')})
socket.on ('disconnect', function () {console.log ('Disconnected to Server')})
socket.on ('newMessage', function (msg) {console.log ('New Message: ', msg)})