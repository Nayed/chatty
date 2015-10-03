"use strict"

let chat = document.getElementById("chatwindow")
let msg = document.getElementById("messagebox")

let socket = new WebSocket("ws://127.0.0.1:2000")

let open = false

let addMessage = msg => {
    chat.innerHTML += "<p>" + msg + "</p"
}

msg.addEventListener('keypress', evt => {
    if (evt.charCode != 13)
        return;

    evt.preventDefault()

    if (msg.value == "" || !open)
        return;

    socket.send(JSON.stringify({
        msg: msg.value
    }))

    addMessage(msg.value)

    msg.value = ""
})

socket.onopen = function() {
    open = true

    addMessage("Connected")
}

socket.onmessage = function(evt) {
    let data = JSON.parse(evt.data)
    addMessage(data.msg)
}

socket.onclose = function() {
    open = false
    addMessage("Disconnected")
}