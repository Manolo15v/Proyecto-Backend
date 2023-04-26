import logger from "../config/logger.js";
import dbConnect from "../config/mongodb.config.js";

export default class MongoContainer {

    constructor(coleccion) {
        this.coleccion = coleccion;
        this.logger = logger;
        dbConnect();
    }

    async create(obj) {
        try {
            return await this.coleccion.create(obj)
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.coleccion.find();
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }
    async getById(id) {
        try {
            return await this.coleccion.findById(id)
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }

    async deleteById(id) {
        try {
            return await this.coleccion.findByIdAndDelete(id);
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }
}