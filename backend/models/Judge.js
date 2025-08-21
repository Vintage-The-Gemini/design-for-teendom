// File: backend/models/Judge.js
const mongoose = require('mongoose');

const judgeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedCategories: [{
    type: String,
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
  }],
  expertise: [{
    type: String
  }],
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  organization: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  judgingProgress: [{
    category: String,
    totalNominations: {
      type: Number,
      default: 0
    },
    reviewedNominations: {
      type: Number,
      default: 0
    },
    completedAt: Date
  }],
  accessLinks: [{
    category: String,
    driveLink: String,
    scoringSheetLink: String,
    generatedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for better performance
judgeSchema.index({ user: 1 });
judgeSchema.index({ assignedCategories: 1 });

module.exports = mongoose.model('Judge', judgeSchema);

// File: backend/models/Vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  nomination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nomination',
    required: true
  },
  voterEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  voterIp: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  // Optional voter demographics for analytics
  voterInfo: {
    age: Number,
    gender: String,
    county: String
  }
}, {
  timestamps: true
});

// Prevent duplicate votes from same email per category
voteSchema.index({ voterEmail: 1, category: 1 }, { unique: true });
voteSchema.index({ nomination: 1 });
voteSchema.index({ voterIp: 1, category: 1 });

module.exports = mongoose.model('Vote', voteSchema);