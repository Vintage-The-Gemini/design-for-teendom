// File: backend/models/Article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Article title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  excerpt: {
    type: String,
    required: [true, 'Article excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Article content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['SELF-CARE', 'LEADERSHIP', 'BUSINESS', 'MONEY', 'LIFESTYLE', 'RELATIONSHIPS', 'EDUCATION']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  image: {
    type: String,
    default: '/src/assets/images/default-article.jpg'
  },
  readTime: {
    type: Number,
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Article', articleSchema);