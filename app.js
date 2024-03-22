const express = require("express")
const app = express()

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

app.post("/api/products")

app.get("/", (req,res) =>{
    res.send("hello wolverine")
})


app.listen(3000, () => {
    console.log("listening on port 3000")
})