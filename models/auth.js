const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm password is required'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Password not the same'
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

authSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined
    next()
})

authSchema.methods.correctPassword = async function(reqPassord, userPassword) {
     return await bcrypt.compare(reqPassord, userPassword)
}



module.exports = Auth = mongoose.model('Auth', authSchema)