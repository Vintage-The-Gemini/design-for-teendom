// File: backend/models/Award.js
const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Award name is required'],
    trim: true,
    maxlength: [100, 'Award name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Award description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Award category is required'],
    enum: [
      'Advocate for Change',
      'Sports Excellence', 
      'Academic Excellence',
      'Arts & Creativity',
      'Leadership Excellence',
      'Community Service',
      'Innovation & Technology',
      'Environmental Champion',
      'Entrepreneurship',
      'Cultural Ambassador'
    ]
  },
  phase: {
    type: String,
    enum: ['pre-awards', 'nominations', 'judging', 'voting', 'ceremony', 'post-awards'],
    default: 'pre-awards'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'active'
  },
  nominationDeadline: {
    type: Date,
    required: [true, 'Nomination deadline is required']
  },
  judgingDeadline: {
    type: Date,
    required: [true, 'Judging deadline is required']
  },
  votingDeadline: {
    type: Date,
    required: [true, 'Voting deadline is required']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
awardSchema.index({ category: 1, status: 1 });
awardSchema.index({ phase: 1, status: 1 });

module.exports = mongoose.model('Award', awardSchema);