const express = require("express")
const app = express()

app.use(express.json())

const products = [
    {id:1, name: "iphone 12", price: 20000},
    {id:2, name: "iphone 13", price: 30000},
    {id:3, name: "iphone 14", price: 40000}
]

app.get("/api/products/:id", (req,res) => {
    const product = products.find(p => p.id == req.params.id)
    if(!product){
        res.status(404).send("aradığınız ürün bulunamadı")
    }else{
        res.send(product)
    }
})
app.get("/api/products", (req,res) => {
    res.send(products)
})

app.post("/api/products", (req,res) => {
    if(!req.body.name || req.body.name.length <= 3){
        res.status(400).send("Ürün adı bilgisini en az 3 karakter olarak girmelisiniz.")
    }
    const product = {
        id: products.length + 1,
        name: req.body.name,
        price:  req.body.price
    }
    products.push(product)
    res.send(product)
})

app.get("/", (req,res) =>{
    res.send("hello wolverine")
})


app.listen(3000, () => {
    console.log("listening on port 3000")
})