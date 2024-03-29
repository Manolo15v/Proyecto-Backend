const socket = io.connect();

const message = document.getElementById('message').value;
const button = document.getElementById('submit');

button.addEventListener('click', e => {
    e.preventDefault();


    // ---- Para tener la fecha en formato YYYY-MM-DD HH:MI:SS
    const date = new Date();
    const padL = (str, len = 2, chr = `0`) => `${str}`.padStart(len, chr);

    let messageDate = `${date.getFullYear()}/${  padL(date.getMonth() + 1)}/${padL(date.getDate())} ${padL(date.getHours())}:${padL(date.getMinutes())}:${padL(date.getSeconds())}`; 

    //

    if (message) {
        const newMessage = {
            message: message,
            date: messageDate
        }

        socket.emit('client-message', newMessage)
    }
});

socket.on('messages', data => {
    let messagesList = data.map(message => `
        <li>
            <p class="d-inline text-primary fw-bold">${message.email}</p>
            <p class="d-inline text-danger"> ${message.fecha} </p>
            <p class="d-inline text-success fst-italic">:${message.mensaje}</p>
        </li>
    `).join('')
    document.getElementById('messagesContainer').innerHTML = messagesList
});