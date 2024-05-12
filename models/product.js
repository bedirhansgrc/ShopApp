const mongoose = require("mongoose")
const Joi = require("joi")
const { Schema } = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    date: {
        type: Date,
        default: Date.now
    },
    category : { type: Schema.Types.ObjectId, ref:"Category" },
    actualPrice: Number,
    discount: Number,
    stock : Number,
    tags: Array
})

function validateProduct(product) {
    const schema = new Joi.object({
        name: Joi.string().min(3).max(30).required(),
        price: Joi.number().min(0),
        description: Joi.string(),
        imageUrl: Joi.string(),
        category: Joi.string(),
        actualPrice: Joi.number().required().min(0),
        date: Joi.date(),
        discount: Joi.number(),
        stock: Joi.number(),
        tags: Joi.array(),
    })

    return schema.validate(product)
}

const Product = mongoose.model("Product", productSchema)

module.exports = { Product, validateProduct }
