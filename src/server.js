import express from "express";
import { Server as HttpServer } from "http";
import cors from "cors";

import session from "express-session";
import compression from "compression";
import dotenv from 'dotenv';

import { Server as IOServer } from "socket.io";

import PagesRouter from "./routes/pages.routes.js";
import UserRouter from './routes/user.routes.js'
import ProductRouter from './routes/products.routes.js'
import CartRouter from './routes/cart.routes.js'

import initSocket from "./utils/web socket/initSocket.js";

dotenv.config();

const initServer = () => {
    
    const app = express();
    const httpServer = new HttpServer(app);
    const io = new IOServer(httpServer);
    
    
    //---------- ejs --------//
    
    app.set('view engine', 'ejs');
    
    //---------- middlewares --------//
    
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(cors());
    
    app.use(compression());
    
    app.use(session({
        secret: process.env.SECRET_KEY_SESSION,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 60 * 40
        },
        rolling: true,
        resave: true,
        saveUninitialized: false
    }));
    
    //---------- routes --------//

    const pagesRouter = new PagesRouter()
    const userRouter = new UserRouter()
    const productRouter = new ProductRouter()
    const cartRouter = new CartRouter()
    
    app.use('', pagesRouter.start())
    // app.use('/docs', )
    app.use('/user', userRouter.start())
    app.use('/api/products', productRouter.start())
    app.use('/api/cart', cartRouter.start())
    
    app.all("*", (req, res) => {
        res.status(404).json({ "error": "endpoint not found" })
    });
    
    //---------- Socket init --------//
    
    initSocket(io)

    //----------------------------//
    
    return {
        listen: port => new Promise((res, rej)=>{
            const server = httpServer.listen(port, () => {
                res(server)
            });
            
            server.on('error', err => rej(err))
        })
    }
    

}

export default initServer