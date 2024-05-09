const express = require("express");
const { Product } = require("../models/product");
const router = express.Router()

router.post("/", (req, res) => {
    try{
        const cartItems = req.body
        cartItems.forEach(async (item) => {
            const product = await Product.findById(item._id);
            if(!product) throw new Error();
            product.stock -= item.quantity;
            await product.save()
        });
        
        res.status(200).send("Order completed successfully!")
    }catch(err){
        return res.status(500).send("Internal Server Error")
    }
})

module.exports = router