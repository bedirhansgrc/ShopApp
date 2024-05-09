const express = require("express")
const router = express.Router()
const { User, validateLogin, validateRegister } = require("../models/user")
const bcrypt = require("bcrypt")
const auth = require("../middleware/auth")
const isAdmin = require("../middleware/isAdmin")

router.get("/",[auth, isAdmin], async (req, res) => {
    const user = await User.find()
    res.send(user)
})

router.post("/create", async (req, res) => {
    const { error } = validateRegister(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne({ email: req.body.email })

    if (user) {
        return res.status(400).send("bu mail adresiyle bir kullanıcı mevcut.")
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    await user.save()

    const token = user.createAuthToken()

    res.header("x-auth-token", token).send(user)
})

router.post("/auth", async (req, res) => {
    const { error } = validateLogin(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send("hatalı email veya parola")
    }

    const isSuccess = await bcrypt.compare(req.body.password, user.password)
    if (!isSuccess) {
        return res.status(400).send("hatalı email veya parola")
    }

    const token = user.createAuthToken()

    res.send(token)
})



module.exports = router