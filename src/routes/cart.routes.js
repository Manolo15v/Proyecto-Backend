import {Router} from 'express'
import CartController from '../controllers/cart.controllers.js'


class CarRouter {
    constructor() {
        this.cartController = new CartController()
        this.router = Router()
    }

    start() {
        this.router.get('/:id/productos', this.cartController.getProducts)

        this.router.post('/', this.cartController.create)
        this.router.post('/:id/productos', this.cartController.addProduct)

        this.router.delete('/:id/productos/:id_prod', this.cartController.removeProduct)
        this.router.delete('/:id', this.cartController.remove)


        return this.router
    }
}

export default CarRouter