import Container from "../../containers/containerMongoDb.js";
import productModel from "../../models/products.model.js"

class ProductsContainer extends Container {
    constructor(model) {
        super(model)
    }

    async save(data) {
        try {
            const product = new this.model({timestamp: this.timestamp  , ...data})
            const newProduct = await product.save(product)

            return newProduct._id.toString()
        } catch (error) {
            console.log(error);
        }
    }

    async change(id, data) {
        try {
            await this.model.updateOne({ _id: id }, { $set: data})

        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const products = await this.model.find()

            return products
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const products = await this.model.findById(id)

            return products
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
}

const productsContainer = new ProductsContainer(productModel);

export default productsContainer
