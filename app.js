const express = require("express")
const app = express()

const mongoose = require("mongoose")

const products = require("./routes/products")
const home = require("./routes/home")

app.use(express.json())

app.use("/api/products", products)
app.use("/", home)

mongoose.connect("mongodb+srv://bedirhansigirci:13579@cluster0.yhin6f0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("mongodb bağlantısı kuruldu")
    })
    .catch((err) => {
        console.log(err)
    })

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    date: {
        type: Date,
        default: Date.now
    },
    isActive: Boolean
})

const Product = mongoose.model("Product", productSchema) //model

app.listen(3000, () => {
    console.log("listening on port 3000")
})