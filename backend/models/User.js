const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config.js')
const crypto = require('crypto')

const User = new Schema({
    username: String,
    password: String,
    admin: {type: Boolean, default: false}
})

User.statics.create = function(username, password){
    const encrypted = crypto.createHmac('sha1',config.secret).update(password).digest('base64')

    const user = new this({
        username,
        password:encrypted
    })
    return user.save()
}

User.statics.findOneByUsername = function(username){
    return this.findOne({
        username
    }).exec()
}


User.methods.verify = function(password){
    const encrypted = crypto.createHmac('sha1',config.secret).update(password).digest('base64')
    return this.password === encrypted
}

User.methods.assignAdmin = function(){
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('User',User)