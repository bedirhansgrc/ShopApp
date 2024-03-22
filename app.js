const express = require("express")
const app = express()

const mongoose = require("mongoose")

const products = require("./routes/products")
const home = require("./routes/home")

app.use(express.json())

app.use("/api/products", products)
app.use("/", home)

const username = "bedirhansigirci"
const password = "13579"
const database = "ShopDb";

    (async () => {
        try {
            await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.yhin6f0.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`)
            console.log("mongodb bağlantısı kuruldu")
        }
        catch (err) {
            console.log(err)
        }

})()

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
const prd = new Product({
    name: "iPhone 14 Pro",
    price: 60.000,
    description: "İyi Telefon",
    imageUrl: "1.jpeg",
    isActive: true
})
async function saveProduct() {
    try {
        await prd.save()
    }
    catch (err) {
        console.log(err)
    }
}

saveProduct()


app.listen(3000, () => {
    console.log("listening on port 3000")
})