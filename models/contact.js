const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    name: {
        type: String,
        required: [true, 'Name is requried']
    },
    email: {
        type: String,
        required: [true,  'Email is required']
    },
    phone: {
        type: String
    } ,
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Contact = mongoose.model('Contact', contactSchema)