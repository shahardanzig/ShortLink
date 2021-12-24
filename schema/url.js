const mongoose = require('mongoose')

// create url schema
const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String
})

module.exports = mongoose.model('Url', URLSchema)