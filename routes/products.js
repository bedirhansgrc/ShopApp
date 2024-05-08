const express = require("express")
const router = express.Router()

const { Product, validateProduct } = require("../models/product")


router.get("/", async (req, res) => {
    const products = await Product.find()
                                        .populate("category", "name -_id")
    res.send(products)
})

router.post("/", async (req, res) => {
    const { error } = validateProduct(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)

    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        actualPrice: req.body.actualPrice,
        discount: req.body.discount,
        stock: req.body.stock
    })

    const newProduct = await product.save()
    res.send(newProduct)
})

router.put("/:id", async (req, res) => {
    //id'e göre ürün alalım
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).send("aradığınız ürün bulunamadı")
    }

    const { error } = validateProduct(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)

    }

    product.name = req.body.name
    product.discount = req.body.discount
    product.price = req.body.price
    product.description = req.body.description
    product.imageUrl = req.body.imageUrl
    product.actualPrice = req.body.actualPrice
    product.discount = req.body.discount
    product.stock = req.body.stock
    product.category = req.body.category

    const updatedProduct = await product.save()

    res.send(updatedProduct)
})

router.delete("/:id", async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    
    if(!product){
        return res.status(404).send("Aradığınız Ürün Bulunamadı")
    }

    res.send(product)
})

router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).send("aradığınız ürün bulunamadı")
    }
    res.send(product)
})


module.exports = router