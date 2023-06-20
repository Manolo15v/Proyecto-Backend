import ProductsDao from '../model/DAOs/productsDao.js'

export default class ProductController {
    constructor() {
        this.productsDao = ProductsDao
    }

    async getAll(req, res) {
        const products = await ProductsDao.getAll();
        if (products) {
            res.status(200).json(products)
        } else {
            res.status(400).json({ "error": "there was a problem when trying to get the products" })
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        const product = await ProductsDao.getProductById(id);

        if (product) {
            res.status(200).json(product)
        } else {
            res.status(400).json({ "error": "product not found" })
        }
    }

    async create(req, res) {
        const { body } = req;

        const newProduct = {
            title: body.title,
            price: parseInt(body.price), 
            description: body.description,
            urlImage: body.urlImage,
            stock: parseInt(body.stock) 
        }

        const wasCreated = await ProductsDao.create(newProduct);

        if (wasCreated) {
            res.status(201).redirect('/products')
        } else {
            res.status(400).json({"error": "there was an error, please verify the body content match the schema"})
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const updatedProduct = req.body;
        const wasUpdated = await ProductsDao.updateProductById(id, updatedProduct);

        if (wasUpdated) {
            res.status(200).redirect('/products')
        } else {
            res.status(404).json({ "error": "product not found or invalid body content." })
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        const wasDeleted = await ProductsDao.deleteById(id)

        if (wasDeleted) {
            res.status(200).redirect('/products')
        } else {
            res.status(404).json({ "error": "product not found" })
        }
    }
}