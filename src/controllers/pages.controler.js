import CartDao from '../model/DAOs/cartDao.js'
import ProductsDao from '../model/DAOs/productsDao.js'
import UserDao from '../model/DAOs/userDao.js'


export default class PagesController {
    constructor() {

    }

    async homePage(req, res) {
        if (req.session.login === true) {
            res.render('pages/index', { status: req.session.login, products: await ProductsDao.getAll() })
        } else {
            res.render('pages/index', { status: req.session.login })
        }
    }

    signUpPage(req, res) {
        if (req.session.login !== true) {
            res.render('pages/signup', { status: req.session.login })
        } else {
            res.redirect('/')
        }

    }

    logInPage(req, res) {
        if (req.session.login !== true) {
            res.render('pages/login', { status: req.session.login })
        } else {
            res.redirect('/')
        }
    }

    async cartPage(req, res) {
        res.render('pages/cart', { status: req.session.login, cart: await CartDao.getAllProductsFromCart(req.session.userId) })

    }

    async chatPage(req, res) {
        const username = await UserDao.getById(req.session.userId)
        res.render('pages/chat', { status: req.session.login, username: username.name })
    }

    async productsPage(req, res) {
        res.render('pages/products', { products: await ProductsDao.getAll() })
    }

    productsCreatePage(req, res) {
        res.render('pages/productsCreate')
    }

    productsDeletePage(req, res) {
        const { id } = req.params

        res.render('pages/productsDelete', {prodId:id})
    }

    productsUpdatePage(req, res) {
        const { id } = req.params

        res.render('pages/productsUpdate', {prodId:id})
    }

    logOutPage(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.json(err);
            } else {
                res.render('pages/logout', { status: false })
            }
        })
    }

}