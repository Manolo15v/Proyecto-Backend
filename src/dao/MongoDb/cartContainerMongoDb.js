import Container from "../../containers/containerMongoDb.js";
import productsContainer from "./productsContainerMongoDb.js";
import cartModel from "../../models/cart.model.js"

class CartContainer extends Container {
    constructor(model) {
        super(model)
    }


    async create() {
        try {
            const cart = new this.model({ timestamp: this.timestamp });
            const newCart = await cart.save(cart);

            return newCart._id.toString();
        } catch (error) {
            console.log(error);
        }
    }

    async saveItem(id, prodId) {
        try {
            const { _id, timestamp, nombre, codigo, precio, stock } = await productsContainer.getById(prodId);

            const cart = await this.model.findById(id);


            cart.products.push({ _id, timestamp, nombre, codigo, precio, stock })


            await this.model.updateOne({ _id: id }, { $set: cart })

        } catch (error) {
            console.log(error);
        }
    }


    async getAllItems(id) {
        try {
            const cart = await this.model.findById(id);

            return cart.products

        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const cart = await this.model.findById(id)

            return cart
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await this.model.deleteOne({ _id: id })
        } catch (error) {
            console.log(error);
        }
    }


    async deleteItem(id, prodId) {
        try {
            const cart = await this.model.findById(id)

            cart.products.id(prodId).remove()

            await this.model.updateOne({ _id: id }, { $set: cart })
        } catch (error) {
            console.log(error);
        }
    }
}

const cartContainer = new CartContainer(cartModel);

export default cartContainer