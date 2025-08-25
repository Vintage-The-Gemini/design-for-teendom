// File: backend/models/Nomination.js
const mongoose = require('mongoose');

const nominationSchema = new mongoose.Schema({
  submissionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  nominee: {
    firstName: {
      type: String,
      required: [true, 'Nominee first name is required'],
      trim: true
    },
    middleName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Nominee last name is required'],
      trim: true
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
      lowercase: true
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
      type: String,
      required: [true, 'Nominee photo is required']
    },
    photoPublicId: String
  },

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
      'Cultural Ambassador'
    ]
  },

  shortBio: {
    type: String,
    required: [true, 'Short bio is required']
  },

  achievements: {
    type: String,
    required: [true, 'Achievements description is required']
  },

  // FIXED: Impact with NO word count restrictions
  impact: {
    type: String,
    required: [true, 'Impact description is required']
  },

  whyDeserveAward: {
    type: String
  },

  additionalInfo: {
    type: String
  },

  socialMediaLinks: {
    instagram: String,
    twitter: String,
    linkedin: String,
    youtube: String,
    tiktok: String,
    other: String
  },

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

  supportingFiles: [{
    filename: String,
    originalName: String,
    url: String,
    cloudinaryId: String,
    size: Number,
    mimetype: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],

  // FIXED: Consent with correct field names matching your form
  consent: {
    accurateInfo: {
      type: Boolean,
      required: [true, 'Accuracy consent is required']
    },
    nomineePermission: {
      type: Boolean,
      required: [true, 'Nominee permission consent is required']
    },
    publicRecognition: {
      type: Boolean,
      required: [true, 'Public recognition consent is required']
    },
    backgroundCheck: {
      type: Boolean,
      required: [true, 'Background check consent is required']
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
    notes: String
  },

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

  voting: {
    publicVotes: {
      type: Number,
      default: 0
    },
    voteStartDate: Date,
    voteEndDate: Date
  }
}, {
  timestamps: true
});

// Indexes
nominationSchema.index({ submissionId: 1 });
nominationSchema.index({ 'nominee.email': 1 });
nominationSchema.index({ awardCategory: 1 });
nominationSchema.index({ status: 1 });
nominationSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('Nomination', nominationSchema);