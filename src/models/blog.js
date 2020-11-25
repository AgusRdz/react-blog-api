const mongoose = require('mongoose')
const Schema = mongoose.Schema
const blogSchema = new Schema(
  {
    title: {
      type: String
    },
    // slug: {
    //   type: String,
    //   unique: true
    // },
    cover: {
      type: String,
      default: null
    },
    content: {
      type: String
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'deleted'],
      default: 'draft'
    },
    publishedAt: {
      type: Date,
      default: null
    },
    deletedAt: {
      type: Date,
      default: null
    },
    author: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports.Blog = Blog
