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
    description: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: null
    },
    category: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived', 'deleted'],
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
