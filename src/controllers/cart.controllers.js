import CartDao from '../model/DAOs/cartDao.js'
import ProductsDao from '../model/DAOs/productsDao.js'

export default class CarController {
    constructor() {
        this.cartDao = CartDao
        this.productsDao = ProductsDao
    }

    async create(req, res) {
        const newCart = await this.cartDao.create()
    
        if (newCart) {
            res.status(200).json({"success": "Product added with ID " + newCart._id})
        } else {
            res.status(500).json({"error": "there was an error"})
        }
    }
    
    async remove(req, res) {
        const {id} = req.params;
        const wasDeleted = await this.cartDao.deleteById(id)
    
        if (wasDeleted) {
            res.status(200).json({"success": "cart successfully removed"})
        } else {
            res.status(404).json({"error": "cart not found"})
        }
    }
    
    async addProduct(req, res) {
        const {id} = req.params;
        const product = req.body;
    
        const productExists = await this.productsDao.exists(product.productId)

        if (productExists) {
            await this.cartDao.saveProductToCart(id, product)
        } else {
            res.status(404).json({"error": "product not found"})
        }
    }
    
    async getProducts(req, res) {
        const {id} = req.params;
        const cartProducts = await this.cartDao.getAllProductsFromCart(id)
    
        if (cartProducts) {
            res.status(200).json(cartProducts)
        } else {
            res.status(404).json({"error": "cart not found"})
        }
    }
    
    async removeProduct(req, res) {
        const {id, id_prod} = req.params;
    
        const wasDeleted = await this.cartDao.deleteProductFromCart(id, id_prod);
    
        if (wasDeleted) {
            res.status(200).json({"success": "that product is no longer in the cart"})
        } else {
            res.status(400).json({"error": "there was some problem"})
        }
    }
}