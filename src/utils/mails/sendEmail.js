import { createTransport } from "nodemailer"
import logger from "../../config/logger.js"


const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD
    }
})


async function newUserEmail(name) {

    const mail = {
        from: 'Api node',
        to: process.env.EMAIL_TO,
        subject: 'New user',
        html: `<h1 style="color: black;">New user (${name}) is now signup</h1>`
    }


    try {
        await transporter.sendMail(mail)
    } catch (error) {
        logger.error(error)
    }
}

async function newOrderEmail(name, email, cartContent) {

    const mail = {
        from: 'Api node',
        to: process.env.EMAIL_TO,
        subject: `New order of  ${name}/${email}`,
        html: `<h1 style="color: black;">${cartContent} </h1>`
    }


    try {
        await transporter.sendMail(mail)
    } catch (error) {
        logger.error(error)
    }
}

export {newUserEmail, newOrderEmail}