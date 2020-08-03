const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Cyjson = new Schema({
    cyjson: JSON,
})

Cyjson.methods.writeCyjson = function(cyjson){
    const cyjson_= new this({
        cyjson:cyjson
    })
    return cyjson_.save()
}

Cyjson.methods.test = function(cyjson){
    const cyjson_ = new this({
        cyjson:"233"
    })
    return cyjson_.svae()
}

Cyjson.methods.getCyjson = function(cyjson){
    return Cyjson.find({}).exec()
}

module.exports = mongoose.model('Cyjson',Cyjson)