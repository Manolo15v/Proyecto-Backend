import {Router} from 'express'

import UserController from '../controllers/user.controllers.js'
import upload from '../middlewares/uploadfile.middleware.js'



export default class UserRouter {
    constructor() {
        this.userController = new UserController()
        this.router = Router()
    }

    start() {
        this.router.post('/signup', upload.single("profileImage"), this.userController.signUp)
        this.router.post('/login', this.userController.logIn)

        return this.router
    }
}

