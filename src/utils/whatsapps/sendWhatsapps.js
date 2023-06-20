import twilio from "twilio"
import logger from "../../config/logger.js"

process.env.TWILIO_TEL

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)


export default async function sendWhatsapp(params) {
    try {
        await client.messages.create({
            body: 'funciona desde wasa desgracio',
            from: `whatsapp:${TWILIO_TEL_WHATSAPP}`,
            to: 'whatsapp:+584120204473'
        })
        
    } catch (error) {
        logger.error(error)
    }
}

