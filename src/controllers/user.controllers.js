import UserDao from '../model/DAOs/UserDao.js'
import CartDao from '../model/DAOs/CartDao.js'
import { newUserEmail } from '../utils/mails/sendEmail.js';
import logger from '../config/logger.js';

export default class UserController {
    constructor() {
        this.dao = UserDao;
    }

    async signUp(req, res) {
        //console.log(this.dao); Cannot read properties of undefined (reading 'dao'), i don't know why

        const { file, body } = req;


        const newUser = await UserDao.create({ ...body, profileImage: file.path })


        if (newUser) {
            await newUserEmail(body.name)
            await CartDao.create({ userId: newUser._id.toString() })
            req.session.login = true;
            req.session.userId = newUser._id.toString()
            res.status(201).redirect('/')

        } else {
            res.status(400).json({ "error": "there was an error, please verify the body content match the schema" })
        }

    }

    async logIn(req, res) {
        const { email, password } = req.body;

        const loggedUser = await UserDao.loginUser({
            email: email,
            password: password
        });




        if (loggedUser) {
            req.session.login = true;
            req.session.userId = loggedUser._id.toString()

            if (loggedUser.admin === true) {
                req.session.admin = true;
            }

            res.redirect('/')
        } else {
            req.session.login = false;
            res.redirect('/login')
        }
    }



}