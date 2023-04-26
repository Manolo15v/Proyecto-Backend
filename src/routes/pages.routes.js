import {Router} from 'express'
import PagesController from '../controllers/pages.controler.js'
import authUser from '../middlewares/authUser.middleware.js'
import authAdmin from '../middlewares/authAdmin.middleware.js'


export default class PagesRouter {
    constructor() {
        this.pagesController = new PagesController()
        this.router = Router()
    }

    start() {
        this.router.get('/', this.pagesController.homePage)
        this.router.get('/signup', this.pagesController.signUpPage)
        this.router.get('/login', this.pagesController.logInPage)

        this.router.get('/logout', authUser, this.pagesController.logOutPage)
        this.router.get('/cart', authUser, this.pagesController.cartPage)
        this.router.get('/chat', authUser, this.pagesController.chatPage)

        this.router.get('/products', authAdmin, this.pagesController.productsPage)
        this.router.get('/products/new', authAdmin, this.pagesController.productsCreatePage)
        this.router.get('/products/update/:id', authAdmin, this.pagesController.productsUpdatePage)
        this.router.get('/products/delete/:id', authAdmin, this.pagesController.productsDeletePage)

        return this.router
    }
}

