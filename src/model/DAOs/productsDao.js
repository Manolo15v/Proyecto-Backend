import MongoContainer from "../../container/Mongodb.container.js";
import { productosModel } from "../models/products.model.js";

class ProductsDao extends MongoContainer {

    constructor(coleccion) {
        super(coleccion);
    }

    static async exists(id) {
        try {
            return await this.coleccion.findById(id);
        } catch (error) {
            this.logger.error(error);
        }
    }

    async getProductById(id) {
        try {
            const product = await this.coleccion.findById(id)
            return product;
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }


    async updateProductById(id, obj) {
        try {
            await this.coleccion.findByIdAndUpdate(id, obj)
            return true;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }

}

export default new ProductsDao(productosModel)