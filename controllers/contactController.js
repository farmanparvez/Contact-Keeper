const catchAsync = require("../utils/catchAsync");
const Contact = require('../models/contact');
const AppError = require("../utils/appError");


exports.getContacts = catchAsync(async (req, res, next) => {
    const contacts = await Contact.find({ user: req.user.id })
    res.status(200).json({ status: 'Success', contacts})
})

exports.createContact = catchAsync(async (req, res, next) => {
    const { name,  email, phone, type } = req.body
    await Contact.create({ name,  email, phone, type, user: req.user.id})
    res.status(200).json({ status: 'Success', message: 'Contact created successfully'})
})

exports.updateContact = catchAsync(async (req, res, next) => {
    const contact = await Contact.findById(req.params.id)
    if(contact.user.toString() !== req.user.id) return next(new AppError('Your are not authorized login in again', 400))
    const { name,  email, phone, type } = req.body
    const data = {name, email, phone, type }
    await Contact.findByIdAndUpdate(req.params.id, { $set: data }, { new: true, runValidators: true}) 
    res.status(200).json({ status: 'Success', message: 'Contact updated successfully' })
})

exports.deleteContact = catchAsync(async(req, res, next) => {
    const contact = await Contact.findById(req.params.id)
    if(contact.user.toString() !== req.user.id) return next(new AppError('Your are not authorized login in again', 400))
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({ status: 'Success', message: 'Contact deleted successfully' })
})