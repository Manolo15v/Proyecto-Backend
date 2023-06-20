import fsContainer from "../../container/fs.container.js";

export default class MessagesDao extends fsContainer{
    constructor(filePath) {
        super(filePath)
    }
}