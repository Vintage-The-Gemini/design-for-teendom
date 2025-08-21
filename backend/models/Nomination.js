// File: backend/models/Nomination.js
const mongoose = require('mongoose');

const nominationSchema = new mongoose.Schema({
  // Nominee Information
  nominee: {
    firstName: {
      type: String,
      required: [true, 'Nominee first name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Nominee last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Nominee email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Nominee phone is required'],
      trim: true
    },
    age: {
      type: Number,
      required: [true, 'Nominee age is required'],
      min: [13, 'Nominee must be at least 13 years old'],
      max: [19, 'Nominee must be 19 years old or younger']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say'],
      required: true
    },
    school: {
      name: String,
      level: {
        type: String,
        enum: ['primary', 'secondary', 'tertiary', 'other']
      },
      grade: String
    },
    location: {
      county: {
        type: String,
        required: [true, 'County is required']
      },
      subcounty: String,
      ward: String
    }
  },

  // Nominator Information
  nominator: {
    firstName: {
      type: String,
      required: [true, 'Nominator first name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Nominator last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Nominator email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Nominator phone is required'],
      trim: true
    },
    relationship: {
      type: String,
      required: [true, 'Relationship to nominee is required'],
      enum: ['parent', 'guardian', 'teacher', 'mentor', 'friend', 'self', 'other']
    },
    organization: String
  },

  // Award Details
  awardCategory: {
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

  // Nomination Content
  achievements: {
    type: String,
    required: [true, 'Achievements description is required'],
    maxlength: [2000, 'Achievements cannot exceed 2000 characters']
  },
  impact: {
    type: String,
    required: [true, 'Impact description is required'],
    maxlength: [2000, 'Impact cannot exceed 2000 characters']
  },
  additionalInfo: {
    type: String,
    maxlength: [1000, 'Additional information cannot exceed 1000 characters']
  },

  // Supporting Documents
  documents: [{
    originalName: String,
    filename: String,
    mimetype: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],

  // System Fields
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under-review', 'approved', 'rejected', 'finalist', 'winner'],
    default: 'draft'
  },
  submissionNumber: {
    type: String,
    unique: true
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  judgeNotes: [{
    judge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String,
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  finalScore: {
    type: Number,
    min: 0,
    max: 100
  },
  votes: {
    type: Number,
    default: 0
  },
  editCount: {
    type: Number,
    default: 0,
    max: 3 // Maximum 3 edits allowed
  },
  
  // Verification
  consentGiven: {
    type: Boolean,
    required: [true, 'Consent must be given'],
    default: false
  },
  termsAccepted: {
    type: Boolean,
    required: [true, 'Terms must be accepted'],
    default: false
  }
}, {
  timestamps: true
});

// Pre-save hook to generate submission number
nominationSchema.pre('save', async function(next) {
  if (this.isNew && !this.submissionNumber) {
    const year = new Date().getFullYear();
    const category = this.awardCategory.replace(/\s+/g, '').substring(0, 3).toUpperCase();
    const count = await this.constructor.countDocuments() + 1;
    this.submissionNumber = `TA${year}-${category}-${String(count).padStart(4, '0')}`;
  }
  next();
});

// Update isComplete based on required fields
nominationSchema.pre('save', function(next) {
  const requiredFields = [
    'nominee.firstName', 'nominee.lastName', 'nominee.email', 'nominee.phone',
    'nominee.age', 'nominator.firstName', 'nominator.lastName', 'nominator.email',
    'nominator.phone', 'nominator.relationship', 'awardCategory', 'achievements', 'impact'
  ];
  
  this.isComplete = requiredFields.every(field => {
    const value = field.split('.').reduce((obj, key) => obj && obj[key], this);
    return value && value.toString().trim().length > 0;
  }) && this.consentGiven && this.termsAccepted;
  
  next();
});

// Indexes for better performance
nominationSchema.index({ awardCategory: 1, status: 1 });
nominationSchema.index({ submissionNumber: 1 });
nominationSchema.index({ 'nominee.email': 1 });
nominationSchema.index({ 'nominator.email': 1 });
nominationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Nomination', nominationSchema);