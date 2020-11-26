const mongoose = require('mongoose')
const mongooseSlugPlugin = require('mongoose-slug-plugin')
const Schema = mongoose.Schema
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
    cover: {
      type: String,
      default: null
    },
    description: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'deleted'],
      default: 'draft',
      required: true
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
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

blogSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=title%>' })
const Blog = mongoose.model('Blog', blogSchema)

module.exports.Blog = Blog
