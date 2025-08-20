// File: backend/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  color: {
    type: String,
    default: '#6B7280', // Default gray color
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color']
  },
  icon: {
    type: String,
    default: '📄' // Default document emoji
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  articleCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// FIXED: Remove the problematic pre-save hook that was causing circular dependency
// Article count will be updated manually in the routes when needed

module.exports = mongoose.model('Category', categorySchema);