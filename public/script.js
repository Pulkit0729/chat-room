var chatForm = document.getElementById('message');
const urlParams = new URLSearchParams(window.location.search);
const myUser = urlParams.get('user');
const chat = document.getElementById('chat');
var userList = document.getElementById("users");

var socket;
if (myUser) {
    socket = io();
    socket.emit('user connected', myUser);
}

chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = e.target.msg;
    if (msg.value) {
        socket.emit('chat message', {msg:msg.value, id: socket.id, user:myUser});
        msg.value = '';
    }
});

socket.on('user connected', function(users) {
    userList.innerHTML='';
    for(var i in users) {
        var li = document.createElement("li");
        var h3 = document.createElement("h3");
        h3.innerHTML = users[i];
        li.appendChild(h3);
        userList.appendChild(li);
    }

});

socket.on('chat message', function ({msg, id, user}) {
    var item = createMessage(msg, id, user);
    chat.appendChild(item);
    var objDiv = document.getElementById("chat");
objDiv.scrollTop = objDiv.scrollHeight
});

function createMessage(msg, id, user){
    var li = document.createElement("li");
    li.classList.add(id==socket.id?'me':'you');
    var div1 = document.createElement("div");
    div1.innerHTML=user;
    div1.classList.add("entete");
    var div2 = document.createElement("div");
    div2.innerHTML= msg;
    div2.classList.add("message");
    li.appendChild(div1);
    li.appendChild(div2);

    return li;
}

