// File: backend/models/Nomination.js - QUICK FIX VERSION
// This matches your current frontend validation requirements

const mongoose = require('mongoose');

const nominationSchema = new mongoose.Schema({
  submissionId: {
    type: String,
    unique: true,
    required: true
  },

  nominee: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    middleName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    age: {
      type: Number,
      min: [13, 'Nominee must be at least 13 years old'],
      max: [19, 'Nominee must be no older than 19 years old']
    },
    // FIXED: Match frontend exactly
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['male', 'female', 'other'],
        message: 'Gender must be male, female, or other'
      }
    },
    email: {
      type: String,
      lowercase: true,
      validate: {
        validator: function(email) {
          if (!email) return true;
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid email'
      }
    },
    phone: {
      type: String,
      trim: true
    },
    nationality: {
      type: String,
      required: [true, 'Nationality is required'],
      enum: {
        values: ['kenyan-citizen', 'kenyan-resident'],
        message: 'Nationality must be kenyan-citizen or kenyan-resident'
      }
    },
    location: {
      county: {
        type: String,
        required: [true, 'County is required'],
        trim: true
      },
      subcounty: {
        type: String,
        trim: true
      },
      ward: {
        type: String,
        trim: true
      }
    },
    school: {
      name: {
        type: String,
        trim: true
      },
      level: {
        type: String,
        trim: true
      },
      gradeLevel: {
        type: String,
        trim: true
      }
    },
    photo: {
      type: String,
      required: [true, 'Nominee photo is required']
    }
  },

  // NOMINATOR INFORMATION
  nominator: {
    firstName: {
      type: String,
      required: [true, 'Nominator first name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Nominator last name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Nominator email is required'],
      lowercase: true,
      validate: {
        validator: function(email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid nominator email'
      }
    },
    phone: {
      type: String,
      required: [true, 'Nominator phone is required'],
      trim: true
    },
    relationship: {
      type: String,
      required: [true, 'Relationship to nominee is required'],
      trim: true
    },
    organization: {
      type: String,
      trim: true
    },
    isSelfNomination: {
      type: Boolean,
      default: false
    }
  },

  // AWARD CATEGORY
  awardCategory: {
    type: String,
    required: [true, 'Award category is required'],
    enum: {
      values: [
        'Academic Excellence',
        'Sports Excellence', 
        'Academic Excellence',
        'Sports Excellence', 
        'Arts & Creativity',
        'Leadership Excellence',
        'Community Service',
        'Innovation & Technology',
        'Environmental Champion',
        'Entrepreneurship',
        'Cultural Ambassador',
        'Advocate for Change'
      ],
      message: 'Invalid award category'
    }
  },

  // NOMINATION STATEMENTS - ALL SET TO 100 CHARACTERS MINIMUM
  shortBio: {
    type: String,
    required: [true, 'Short bio is required'],
    minlength: [100, 'Bio must be at least 100 characters'],
    maxlength: [2000, 'Bio cannot exceed 2000 characters']
  },
  achievements: {
    type: String,
    minlength: [100, 'Achievements must be at least 100 characters'],
    maxlength: [1000, 'Achievements cannot exceed 1000 characters']
  },
  impact: {
    type: String,
    required: [true, 'Impact statement is required'],
    minlength: [100, 'Impact statement must be at least 100 characters'],
    maxlength: [2000, 'Impact statement cannot exceed 2000 characters']
  },
  whyDeserveAward: {
    type: String,
    required: [true, 'Reason for deserving award is required'],
    minlength: [100, 'Must be at least 100 characters'],
    maxlength: [1000, 'Cannot exceed 1000 characters']
  },
  additionalInfo: {
    type: String,
    maxlength: [500, 'Additional info cannot exceed 500 characters']
  },

  // SOCIAL MEDIA (Optional)
  socialMediaLinks: {
    instagram: String,
    twitter: String,
    linkedin: String,
    youtube: String,
    tiktok: String,
    other: String
  },

  // REFEREE INFORMATION - REMOVED RELATIONSHIP REQUIREMENT
  referee: {
    name: {
      type: String,
      required: [true, 'Referee name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Referee email is required'],
      lowercase: true,
      validate: {
        validator: function(email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid referee email'
      }
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
    organization: {
      type: String,
      trim: true
    },
    // REMOVED: relationship field that was causing validation error
    // relationship: {
    //   type: String,
    //   required: [true, 'Referee relationship is required']
    // }
  },

  // FILES AND URLS
  files: {
    photo: String,
    supportingFiles: [String]
  },

  adminAccessUrls: {
    nomineePhoto: String,
    supportingFiles: [String]
  },

  // CONSENTS - ALL REQUIRED
  consent: {
    accurateInfo: {
      type: Boolean,
      required: [true, 'Must confirm information accuracy']
    },
    nomineePermission: {
      type: Boolean,
      required: [true, 'Must have nominee permission']
    },
    parentalConsent: {
      type: Boolean,
      required: function() {
        return this.nominee && this.nominee.age && this.nominee.age < 18;
      }
    },
    publicRecognition: {
      type: Boolean,
      required: [true, 'Must consent to public recognition']
    },
    backgroundCheck: {
      type: Boolean,
      required: [true, 'Must consent to background check']
    },
    dataUsage: {
      type: Boolean,
      required: [true, 'Must consent to data usage']
    },
    antifraud: {
      type: Boolean,
      required: [true, 'Must agree to anti-fraud terms']
    }
  },

  // STATUS AND WORKFLOW
  status: {
    type: String,
    enum: ['submitted', 'under-review', 'approved', 'rejected'],
    default: 'submitted'
  },

  phase: {
    type: String,
    enum: ['nomination', 'review', 'judging', 'voting', 'results'],
    default: 'nomination'
  },

  // Admin review
  adminReview: {
    reviewed: {
      type: Boolean,
      default: false
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewDate: Date,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'needs-info'],
      default: 'pending'
    },
    notes: String,
    score: Number
  },

  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
nominationSchema.index({ submissionId: 1 });
nominationSchema.index({ status: 1, phase: 1 });
nominationSchema.index({ awardCategory: 1 });
nominationSchema.index({ 'nominee.email': 1 });
nominationSchema.index({ 'nominator.email': 1 });
nominationSchema.index({ createdAt: -1 });

// Pre-save middleware to calculate age
nominationSchema.pre('save', function(next) {
  if (this.nominee.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.nominee.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    this.nominee.age = age;
  }
  next();
});

// Method to check if nomination is complete
nominationSchema.methods.isComplete = function() {
  return !!(
    this.nominee.firstName &&
    this.nominee.lastName &&
    this.nominee.dateOfBirth &&
    this.nominee.photo &&
    this.nominator.firstName &&
    this.nominator.lastName &&
    this.nominator.email &&
    this.nominator.phone &&
    this.awardCategory &&
    this.shortBio &&
    this.impact &&
    this.whyDeserveAward &&
    this.referee.name &&
    this.referee.email &&
    this.consent.accurateInfo &&
    this.consent.nomineePermission &&
    this.consent.dataUsage &&
    this.consent.antifraud
  );
};

// Method to get display name
nominationSchema.methods.getDisplayName = function() {
  return `${this.nominee.firstName} ${this.nominee.lastName}`.trim();
};

// Method to check if nominee is minor (under 18)
nominationSchema.methods.isMinor = function() {
  return this.nominee.age < 18;
};

module.exports = mongoose.model('Nomination', nominationSchema);