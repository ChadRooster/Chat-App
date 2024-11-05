// PLEASE START THE SERVER BEFORE USE 
//  HERE ARE THE STEPS:
//  cd .\nodeserver\
//  nodemon .\index.js\ 
 
//  if you face any issue, refer to the video on yt: whatsapp clone chat by codewithharry(web development projects)

const socket = io('http://localhost:8001')
let form = document.getElementById('sec')
const messageInput = document.getElementById("ip")
const messageContainer = document.querySelector(".main")
var audio= new Audio('ting.mp3')

const append= (message, position)=>{
    const messageElement= document.createElement('div')
    messageElement.innerHTML= message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position =='left'){
        audio.play()
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const message= messageInput.value
    append(`you: ${message}`, 'right')
    socket.emit('send', message )
    messageInput.value=''
})

const name = prompt('enter your name to join')
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
append(`${name} joined the chat`, 'right')
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left')
    })
socket.on('left', name=>{
        append(`${name} left the chat`, 'right')
        })

