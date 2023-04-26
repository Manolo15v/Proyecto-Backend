import MongoContainer from "../../container/Mongodb.container.js";
import { usersModel } from "../models/user.model.js";


class UserDao extends MongoContainer {
    constructor(coleccion) {
        super(coleccion);
    }
    
    async loginUser(object) {
        try {
            const user = await this.coleccion.findOne({
                [this.EMAIL_FIELD] : object.email
            });
            
            if (!user) {
                this.logger.info(`User '${object.email}' does not exist`)
                return null;   
            } 
            
            if(!user.comparePassword(object.password)){
                this.logger.info(`User '${object.email}' password doesn't mach`)
                return null;
            }

            return user;
        
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }
}

export default new UserDao(usersModel)