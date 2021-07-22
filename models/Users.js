// BUILDING OF THE USER SCHEMA AND IMPLEMENTING AND EXPORTING MODEL TO SERVER.JS

const mongoose = require('mongoose')

const user_Schema = new mongoose.Schema({
    name : {type: String, unique : true},
    email : {type: String, unique : true},
    age : Number
})

module.exports = mongoose.model('User', user_Schema)