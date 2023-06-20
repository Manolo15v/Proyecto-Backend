import MongoContainer from "../../container/Mongodb.container.js";
import { cartModel } from '../models/cart.model.js';

class CartDao extends MongoContainer {

    constructor(coleccion) {
        super(coleccion);
    }

    async saveProductToCart(userId, obj) {
        try {
            const cart = await this.coleccion.find({userId: userId})
            cart.products.push(obj.productId);
            cart.save();
            return true;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }

    async deleteProductFromCart(userId, productId) {
        try {
            const cart = await this.coleccion.find({userId: userId});
            cart.products.remove(productId);
            cart.save();
            return true;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    async getAllProductsFromCart(userId) {
        try {
            return await this.coleccion.find({userId: userId}).populate('products').select({ products: 1, _id: 0 });
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }
}

export default new CartDao(cartModel)