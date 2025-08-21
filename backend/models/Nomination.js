// File: backend/models/Nomination.js
const mongoose = require('mongoose');

const nominationSchema = new mongoose.Schema({
  // Unique submission identifier
  submissionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  // Nominee Information
  nominee: {
    firstName: {
      type: String,
      required: [true, 'Nominee first name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    middleName: {
      type: String,
      trim: true,
      maxlength: [50, 'Middle name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Nominee last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    age: {
      type: Number,
      required: [true, 'Nominee age is required'],
      min: [13, 'Nominee must be at least 13 years old'],
      max: [19, 'Nominee must be 19 years old or younger']
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required']
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
    nationality: {
      type: String,
      required: [true, 'Nationality is required'],
      enum: ['kenyan-citizen', 'kenyan-resident']
    },
    location: {
      county: {
        type: String,
        required: [true, 'County is required']
      },
      subcounty: String,
      ward: String
    },
    school: {
      name: String,
      level: {
        type: String,
        enum: ['Primary School', 'Secondary School', 'College/University', 'Technical/Vocational', 'Other']
      },
      grade: String
    },
    photo: {
      type: String, // Cloudinary URL or filename
      required: [true, 'Nominee photo is required']
    },
    photoPublicId: {
      type: String // Cloudinary public ID for deletion
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
    organization: String,
    isSelfNomination: {
      type: Boolean,
      default: false
    }
  },

  // Award Details
  awardCategory: {
    type: String,
    required: [true, 'Award category is required'],
    enum: [
      'Academic Excellence',
      'Leadership Excellence',
      'Sports Excellence',
      'Arts & Creativity',
      'Innovation & Technology',
      'Community Service',
      'Environmental Champion',
      'Entrepreneurship',
      'Advocate for Change',
      'Cultural Ambassador'
    ]
  },

  // Nomination Content
  shortBio: {
    type: String,
    required: [true, 'Short bio is required'],
    maxlength: [250, 'Bio cannot exceed 250 words']
  },
  achievements: {
    type: String,
    required: [true, 'Achievements description is required'],
    maxlength: [2000, 'Achievements cannot exceed 2000 characters']
  },
  impact: {
    type: String,
    required: [true, 'Impact description is required'],
    minlength: [300, 'Impact must be at least 300 words'],
    maxlength: [500, 'Impact cannot exceed 500 words']
  },
  whyDeserveAward: {
    type: String,
    maxlength: [1000, 'Why deserve award cannot exceed 1000 characters']
  },
  additionalInfo: {
    type: String,
    maxlength: [1000, 'Additional information cannot exceed 1000 characters']
  },

  // Social Media Links
  socialMediaLinks: {
    instagram: String,
    twitter: String,
    linkedin: String,
    youtube: String,
    tiktok: String,
    other: String
  },

  // Referee Information
  referee: {
    name: {
      type: String,
      required: [true, 'Referee name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Referee email is required'],
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Referee phone is required'],
      trim: true
    },
    position: {
      type: String,
      required: [true, 'Referee position is required'],
      trim: true
    },
    organization: String,
    relationship: String
  },

  // Supporting Documents
  documents: [{
    originalName: String,
    cloudinaryUrl: String, // Cloudinary URL
    publicId: String, // Cloudinary public ID
    mimetype: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],

  // Consent and Declarations
  consent: {
    accurateInfo: {
      type: Boolean,
      required: [true, 'Accuracy consent is required']
    },
    nomineePermission: {
      type: Boolean,
      required: [true, 'Nominee permission consent is required']
    },
    parentalConsent: {
      type: Boolean,
      default: false
    },
    dataUsage: {
      type: Boolean,
      required: [true, 'Data usage consent is required']
    },
    antifraud: {
      type: Boolean,
      required: [true, 'Anti-fraud declaration is required']
    }
  },

  // System Fields
  status: {
    type: String,
    enum: ['submitted', 'under-review', 'finalist', 'winner', 'rejected', 'deleted'],
    default: 'submitted'
  },
  
  phase: {
    type: String,
    enum: ['nomination', 'judging', 'voting', 'completed'],
    default: 'nomination'
  },

  // Admin Review
  adminReview: {
    reviewed: {
      type: Boolean,
      default: false
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    reviewDate: Date,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'needs-info'],
      default: 'pending'
    },
    notes: String
  },

  // Judging Information
  judging: {
    assignedJudges: [{
      judge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Judge'
      },
      assignedDate: Date
    }],
    scores: [{
      judge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Judge'
      },
      score: Number,
      feedback: String,
      scoredDate: Date
    }],
    averageScore: Number,
    isFinalist: {
      type: Boolean,
      default: false
    }
  },

  // Voting Information (for finalists)
  voting: {
    publicVotes: {
      type: Number,
      default: 0
    },
    voteStartDate: Date,
    voteEndDate: Date
  },

  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: Date,
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
nominationSchema.index({ submissionId: 1 });
nominationSchema.index({ 'nominee.email': 1 });
nominationSchema.index({ 'nominator.email': 1 });
nominationSchema.index({ awardCategory: 1 });
nominationSchema.index({ status: 1 });
nominationSchema.index({ 'adminReview.status': 1 });
nominationSchema.index({ submittedAt: -1 });

// Virtual for nominee full name
nominationSchema.virtual('nominee.fullName').get(function() {
  const parts = [this.nominee.firstName];
  if (this.nominee.middleName) parts.push(this.nominee.middleName);
  parts.push(this.nominee.lastName);
  return parts.join(' ');
});

// Virtual for nominator full name
nominationSchema.virtual('nominator.fullName').get(function() {
  return `${this.nominator.firstName} ${this.nominator.lastName}`;
});

// Pre-save middleware to update timestamps
nominationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Instance method to check if eligible for judging
nominationSchema.methods.isEligibleForJudging = function() {
  return this.adminReview.status === 'approved' && this.status === 'under-review';
};

// Instance method to calculate age at award date
nominationSchema.methods.getAgeAtAwardDate = function() {
  const awardDate = new Date('2025-12-06'); // Award ceremony date
  const birthDate = this.nominee.dateOfBirth;
  let age = awardDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = awardDate.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && awardDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Static method to get nominations by category
nominationSchema.statics.getByCategory = function(category, status = null) {
  const filter = { awardCategory: category };
  if (status) filter.status = status;
  return this.find(filter);
};

// Static method to get pending admin reviews
nominationSchema.statics.getPendingReviews = function() {
  return this.find({ 'adminReview.status': 'pending' }).sort({ submittedAt: 1 });
};

module.exports = mongoose.model('Nomination', nominationSchema);