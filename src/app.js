import cluster from "cluster"
import { cpus } from "os";

import initServer from "./server.js";

import logger from "./config/logger.js";

const app = initServer()
const PORT = process.argv[2] || process.env.PORT
const cpusNum = cpus().length

const init = () => {
    try {
        app.listen(PORT)
        logger.info(`listen in http://localhost:${PORT}`)
    } catch (error) {
        logger.error(error)
    }
}


if (process.env.CLUSTER === "true") {
    if (cluster.isPrimary) {
        for (let i = 0; i < cpusNum; i++) {
            cluster.fork()
        }
    } else {
        init()
    }

} else {
    init()
}


// to do //

// integrar envio de whatsapp/mensajes
// intentar hacer documentacion
// probar todo
// hacer prueba de rendimiento

