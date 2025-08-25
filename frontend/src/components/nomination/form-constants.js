// File: frontend/src/components/nomination/form-constants.js
// Correct enum values that match your database schema

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

export const NATIONALITY_OPTIONS = [
  { value: 'kenyan-citizen', label: 'Kenyan Citizen' },
  { value: 'kenyan-resident', label: 'Kenyan Resident' }
];

export const RELATIONSHIP_OPTIONS = [
  { value: 'parent', label: 'Parent' },
  { value: 'guardian', label: 'Guardian' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'mentor', label: 'Mentor' },
  { value: 'friend', label: 'Friend' },
  { value: 'self', label: 'Self-Nomination' },
  { value: 'other', label: 'Other' }
];

export const SCHOOL_LEVELS = [
  'Primary School',
  'Secondary School', 
  'College/University',
  'Technical/Vocational',
  'Other'
];

export const AWARD_CATEGORIES = [
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
];

// Updated test data with correct enum values
export const TEST_FORM_DATA = {
  nominee: {
    firstName: 'Test',
    middleName: 'Student',
    lastName: 'Nominee',
    dateOfBirth: '2006-01-15',
    age: 18,
    gender: 'male', // ✅ lowercase
    email: 'test.nominee@example.com',
    phone: '+254712345678',
    nationality: 'kenyan-citizen', // ✅ with hyphen
    county: 'Nairobi',
    subcounty: 'Westlands',
    ward: 'Parklands',
    school: {
      name: 'Test Secondary School',
      level: 'Secondary School', // ✅ exact match
      grade: 'Form 4'
    },
    photo: 'test-photo.jpg', // ✅ required field
    photoFile: null
  },
  
  nominator: {
    firstName: 'Test',
    lastName: 'Nominator',
    email: 'test.nominator@example.com',
    phone: '+254798765432',
    relationship: 'teacher', // ✅ lowercase
    organization: 'Test Secondary School',
    isSelfNomination: false
  },
  
  awardCategory: 'Academic Excellence',
  
  shortBio: 'This is a test nominee who has demonstrated exceptional academic performance throughout their secondary school education. They consistently achieve top grades and help fellow students.',
  
  achievements: 'Top student in mathematics and sciences for 3 consecutive years. Won the regional science fair competition. Mentored over 20 junior students. Led debate team to national championships.',
  
  // ✅ CRITICAL: 300+ words for impact
  impact: `Through comprehensive tutoring programs, this nominee has helped improve the mathematics scores of their peers by an average of 25%. They started a study group that now includes over 50 students and has become a permanent school program. Their innovative teaching methods have been adopted by other students, creating a collaborative learning environment that benefits the entire school community. The nominee has established peer-to-peer mentorship networks that continue to support struggling students across multiple grade levels. Their dedication to inclusive education ensures that students from all backgrounds receive equal support and encouragement. The academic improvement initiatives they started have become integral parts of the school's educational framework, creating lasting positive change that will benefit future generations of students. Beyond academics, they have organized science clubs, debate societies, and academic competitions that have elevated the school's reputation regionally. Their systematic approach to problem-solving has influenced teaching methodologies, with teachers incorporating some of their collaborative learning techniques into regular curriculum delivery.`,
  
  whyDeserveAward: 'This nominee deserves recognition for outstanding academic achievements combined with their exceptional dedication to helping others succeed and creating lasting positive educational impact.',
  
  additionalInfo: 'Additional information about community service and extracurricular activities that demonstrate leadership and commitment to excellence.',
  
  socialMediaLinks: {
    twitter: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    other: ''
  },
  
  referee: {
    name: 'Dr. Test Referee',
    email: 'referee@test.com',
    phone: '+254700000000',
    position: 'Head Teacher',
    organization: 'Test Secondary School',
    relationship: 'teacher' // ✅ lowercase
  },
  
  consent: {
    accurateInfo: true,
    dataUsage: true,
    publicRecognition: true,
    backgroundCheck: true,
    nomineePermission: true, // ✅ THIS WAS MISSING!
    antifraud: true
  },
  
  supportingFiles: []
};