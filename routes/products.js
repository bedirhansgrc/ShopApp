const express = require("express")
const router = express.Router()
const Joi = require("joi")

const { Product , validateProduct} = require("../models/product")

const products = [
    {id: 1, name: "iphone 12", price:20000},
    {id: 2, name: "iphone 13", price:30000},
    {id: 3, name: "iphone 14", price:40000},
]

router.get("/", (req, res) => {
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
        isActive: req.body.isActive
    })

    try {
        await product.save()
    }
    catch (err) {
        console.log(err)
    }
})

router.put("/:id", (req, res) => {
    //id'e göre ürün alalım
    const product = products.find(p => p.id == req.params.id)
    if (!product) {
        return res.status(404).send("aradığınız ürün bulunamadı")
    }

    const { error } = validateProduct(req.body)

    if (error) {
        return res.status(400).send(result.error.details[0].message)

    }

    product.name = req.body.name
    product.price = req.body.price

    res.send(product)
})

router.delete("/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id)
    if (!product) {
        return res.status(404).send("aradığınız ürün bulunamadı")
    }

    const index = products.indexOf(product)
    products.splice(index, 1)
    res.send(product)
})

router.get("/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id)
    if (!product) {
        res.status(404).send("aradığınız ürün bulunamadı")
    } else {
        res.send(product)
    }
})


module.exports = router