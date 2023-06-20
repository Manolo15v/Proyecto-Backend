import {Router} from 'express'
import ProductController from '../controllers/products.controllers.js'
import authAdmin from '../middlewares/authAdmin.middleware.js'

class ProductsRouter {
    constructor() {
        this.productsController = new ProductController()
        this.router = Router()
    }

    start() {
        this.router.get('/', this.productsController.getAll)
        this.router.get('/:id', this.productsController.getById)

        this.router.post('/', authAdmin, this.productsController.create)

        this.router.put('/:id', authAdmin, this.productsController.update)

        this.router.delete('/:id', authAdmin, this.productsController.delete)

        return this.router
    }
}

export default ProductsRouter