// File: backend/models/Nomination.js

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
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['male', 'female', 'other']
    },
    // UPDATED: Email is now optional (for minors)
    email: {
      type: String,
      lowercase: true,
      validate: {
        validator: function(email) {
          // Only validate if email is provided
          if (!email) return true;
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid email'
      }
    },
    // UPDATED: Phone is now optional (for minors) 
    phone: {
      type: String,
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
        required: [true, 'County is required'],
        trim: true
      },
      city: String
    },
    // UPDATED: School is now optional (some teens may not be in school)
    school: {
      name: String,
      level: {
        type: String,
        enum: ['Primary', 'Secondary', 'University', 'College', 'Vocational', 'Other']
      },
      grade: String
    },
    photo: {
      type: String,
      required: [true, 'Nominee photo is required']
    },
    photoPublicId: String
  },

  // NOMINATOR DETAILS REMAIN MANDATORY (need to contact them for updates)
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
      lowercase: true
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
      'Cultural Ambassador',
      'Teen Innovator',
      'Teenpreneur',
      'Creative Arts',
      'Sports & Wellness',
      'Digital Impact',
      'Teen of the Year'
    ]
  },

  shortBio: {
    type: String,
    required: [true, 'Short bio is required'],
    maxlength: [1500, 'Bio cannot exceed 1500 characters']
  },

  achievements: {
    type: String,
    required: [true, 'Achievements description is required']
  },

  // UPDATED: Impact statement minimum word requirement reduced to 100
  impact: {
    type: String,
    required: [true, 'Impact statement is required'],
    validate: {
      validator: function(text) {
        const wordCount = text ? text.split(' ').filter(word => word.length > 0).length : 0;
        return wordCount >= 100;
      },
      message: 'Impact statement must be at least 100 words'
    }
  },

  whyDeserveAward: {
    type: String,
    required: [true, 'Why deserve award explanation is required'],
    minlength: [200, 'Must be at least 200 characters']
  },

  additionalInfo: {
    type: String,
    maxlength: [1000, 'Additional info cannot exceed 1000 characters']
  },

  socialMediaLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String,
    website: String,
    other: String
  },

  supportingFiles: [{
    originalName: String,
    filename: String,
    mimetype: String,
    size: Number,
    url: String,
    cloudinaryUrl: String,
    cloudinaryPublicId: String
  }],

  referee: {
    name: {
      type: String,
      required: [true, 'Referee name is required']
    },
    position: {
      type: String,
      required: [true, 'Referee position is required']
    },
    email: {
      type: String,
      required: [true, 'Referee email is required'],
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Referee phone is required']
    },
    canContact: {
      type: Boolean,
      default: true
    }
  },

  consent: {
    accurateInfo: {
      type: Boolean,
      required: [true, 'Accurate info consent is required'],
      validate: {
        validator: function(v) { return v === true; },
        message: 'You must confirm that the information is accurate'
      }
    },
    nomineePermission: {
      type: Boolean,
      required: [true, 'Nominee permission consent is required'],
      validate: {
        validator: function(v) { return v === true; },
        message: 'You must have permission from the nominee'
      }
    },
    publicRecognition: {
      type: Boolean,
      required: [true, 'Public recognition consent is required'],
      validate: {
        validator: function(v) { return v === true; },
        message: 'You must agree to public recognition terms'
      }
    },
    backgroundCheck: {
      type: Boolean,
      required: [true, 'Background check consent is required'],
      validate: {
        validator: function(v) { return v === true; },
        message: 'You must agree to background check terms'
      }
    },
    dataUsage: {
      type: Boolean,
      required: [true, 'Data usage consent is required'],
      validate: {
        validator: function(v) { return v === true; },
        message: 'You must agree to data usage terms'
      }
    },
    antifraud: {
      type: Boolean,
      required: [true, 'Anti-fraud consent is required'],
      validate: {
        validator: function(v) { return v === true; },
        message: 'You must agree to anti-fraud measures'
      }
    }
  },

  // File storage information
  files: {
    photo: {
      filename: String,
      originalName: String,
      mimetype: String,
      size: Number,
      url: String
    },
    supportingFiles: [{
      filename: String,
      originalName: String,
      mimetype: String,
      size: Number,
      url: String
    }]
  },

  // Cloudinary storage information
  cloudinary: {
    photo: {
      url: String,
      publicId: String,
      secure_url: String,
      variations: {
        thumbnail: String,
        small: String,
        medium: String,
        large: String
      }
    },
    supportingFiles: [{
      url: String,
      publicId: String,
      secure_url: String,
      originalName: String
    }]
  },

  // Admin access URLs for easy viewing
  adminAccessUrls: {
    nomineePhoto: String,
    supportingFiles: [String]
  },

  // Status and workflow
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

  // Judging phase
  judging: {
    judges: [{
      judge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      scores: {
        impact: Number,
        achievement: Number,
        character: Number,
        potential: Number,
        total: Number
      },
      notes: String,
      submittedAt: Date
    }],
    averageScore: Number,
    totalJudges: Number,
    completed: {
      type: Boolean,
      default: false
    }
  },

  // Voting phase
  voting: {
    publicVotes: {
      type: Number,
      default: 0
    },
    publicVotingEnabled: {
      type: Boolean,
      default: false
    }
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

// Virtual for nominee age calculation
nominationSchema.virtual('nominee.calculatedAge').get(function() {
  if (!this.nominee.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.nominee.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

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
    this.consent.publicRecognition &&
    this.consent.backgroundCheck &&
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