import { promises } from 'fs';
import logger from '../config/logger.js';

export default class fsContainer {
    constructor(filePath) {
        this.filePath = filePath
    }

    async #readFile() {
        try {
            const res = await promises.readFile(this.filePath, "utf-8");
            if (res.length === 0) {// Si el archivo esta vacio
                return res
            } else {
                const content = JSON.parse(res);

                return content
            }


        } catch (error) {
            logger.error(error)
        }
    }

    async #writeFile(data) {
        try {
            await promises.writeFile(this.filePath, JSON.stringify(data), "utf-8");
        } catch (error) {
            logger.error(error)
        }
    }

    async save(data) {
        const file = await this.#readFile();

        if (file.length === 0) {
            await this.#writeFile([data]);
        } else {
            await this.#writeFile([...file, data ]);
        }
    }

    async getAll() {
        const file = await this.#readFile();
        return file
    }
}