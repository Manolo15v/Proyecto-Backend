import logger from "../../config/logger.js"
import MessagesDao from "../../model/DAOs/messagesDao.js"

const messages = new MessagesDao("messages/messages.txt")


const initSocket = (io) => {
    io.on('connection', async socket => {
        logger.info('Client connected')

        socket.emit('messages', await messages.getAll());

        socket.on('client-message', async (data) => {
            await messages.save(data);
            io.sockets.emit('messages', await messages.getAll());
        });
    })
}

export default initSocket