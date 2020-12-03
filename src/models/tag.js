const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tagSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
})

module.exports.Tag = mongoose.model('Tag', tagSchema)
