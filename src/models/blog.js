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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tags: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
)

blogSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=title%>' })
module.exports.Blog = mongoose.model('Blog', blogSchema)
