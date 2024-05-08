const express = require("express")
const app = express()
const cors = require("cors")

const mongoose = require("mongoose")

const products = require("./routes/products")
const home = require("./routes/home")
const categories = require("./routes/categories")
const users = require("./routes/users")
const cart = require("./routes/cart")

app.use(express.json())

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use("/api/products", products)
app.use("/api/categories", categories)
app.use("/api/users", users)
app.use("/cart", cart)
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

app.listen(3000, () => {
    console.log("listening on port 3000")
})