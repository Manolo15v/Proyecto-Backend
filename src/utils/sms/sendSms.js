import twilio from "twilio"
import logger from "../../config/logger.js"


const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

export default async function sendSms(params) {
   try {
      await client.messages.create({
         body: 'funciona desgracio',
         from: process.env.TWILIO_TEL_SMS,
         to: '+584120204473'
      })
   } catch (error) {
      logger.error(error)
   }
}

