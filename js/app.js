"use strict"

let chat = document.getElementById("chatwindow")
let msg = document.getElementById("messagebox")

let socket = new WebSocket("ws://127.0.0.1:2000")

let addMessage = msg => {
    chat.innerHTML += "<p>" + msg + "</p"
}

msg.addEventListener('keypress', evt => {
    if (evt.charCode != 13 || msg.value == "")
        return;

    evt.preventDefault()

    socket.send(JSON.stringify({
        msg: msg.value
    }))

    addMessage(msg.value)

    msg.value = ""
})