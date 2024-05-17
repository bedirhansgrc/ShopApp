const { mongoose, Schema } = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const isAdmin = require("../middleware/isAdmin")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

function validateRegister(user) {
    const schema = new Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(8).required()
    })

    return schema.validate(user)
}

function validateChange(user){
    const schema = new Joi.object({
        name: Joi.string().min(3).max(50),
        email: Joi.string().min(3).max(50).email(),
        isAdmin: Joi.boolean()
    })

    return schema.validate(user)
}

function validateLogin(user) {
    const schema = new Joi.object({
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(8).required(),
    })

    return schema.validate(user)
}
userSchema.methods.createAuthToken = function () {
    const decodedToken = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'jwtPrivateKey')
    return decodedToken
}

const User = mongoose.model("User", userSchema)


module.exports = { User, validateRegister, validateLogin, validateChange }
