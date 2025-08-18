// File: backend/utils/seedDatabase.js
// Script to add your existing articles to the database

require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('../models/Article');

// Your existing articles data
const sampleArticles = [
  {
    title: 'ACNE IN TEENAGE BOYS',
    category: 'SELF-CARE',
    author: 'Catherine Kinyanjui',
    excerpt: 'Understanding how acne affects teenage boys and building confidence through proper skincare and self-acceptance.',
    content: 'This is where the full article content would go. Understanding acne in teenage boys is crucial for building confidence and maintaining proper skincare routines.',
    image: '/src/assets/images/acne/acne1.jpg',
    featured: true,
    views: 2500,
    readTime: 5,
    tags: ['skincare', 'confidence', 'puberty', 'boys']
  },
  {
    title: 'THE BOYLAN SISTERS: Constitutional Champions',
    category: 'LEADERSHIP',
    author: 'Teendom Team',
    excerpt: 'Meet the inspiring Boylan sisters who are revolutionizing youth advocacy and constitutional education across Kenya.',
    content: 'The Boylan sisters are making waves in constitutional education and youth advocacy across Kenya. Their story is one of determination and impact.',
    image: '/src/assets/images/babylon/babylon-sisters-cover.jpg',
    featured: true,
    views: 3200,
    readTime: 7,
    tags: ['leadership', 'constitution', 'advocacy', 'sisters']
  },
  {
    title: 'TEEN CEO: Building Your Empire Young',
    category: 'BUSINESS',
    author: 'Business Team',
    excerpt: 'Inspiring stories of young entrepreneurs and practical steps to start your own business as a teenager.',
    content: 'Starting a business as a teenager might seem daunting, but with the right guidance and determination, young entrepreneurs can build successful enterprises.',
    image: '/src/assets/images/teen ceo/Teen ceo primary.JPG',
    featured: false,
    views: 2800,
    readTime: 8,
    tags: ['business', 'entrepreneur', 'startup', 'success']
  },
  {
    title: 'HOW TO STAY WISE ABOUT YOUR CENTS',
    category: 'MONEY',
    author: 'Linet Makenya',
    excerpt: 'Teen-friendly financial tips for saving, budgeting, and making smart money decisions for your future.',
    content: 'Financial literacy is crucial for teenagers. Learning to manage money early sets the foundation for financial success in adulthood.',
    image: '/src/assets/images/savings/savings primary.jpg',
    featured: false,
    views: 1900,
    readTime: 6,
    tags: ['money', 'savings', 'budgeting', 'financial literacy']
  },
  {
    title: 'BOOST YOUR SELF-ESTEEM',
    category: 'SELF-CARE',
    author: 'Mental Health Team',
    excerpt: 'Practical strategies for building confidence and maintaining positive self-image during teenage years.',
    content: 'Self-esteem is fundamental to teenage development. Here are practical strategies to build confidence and maintain a positive self-image.',
    image: '/src/assets/images/self-esteem/self-esteem1.jpg',
    featured: false,
    views: 1800,
    readTime: 7,
    tags: ['self-esteem', 'confidence', 'mental health', 'positivity']
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing articles (optional)
    await Article.deleteMany({});
    console.log('🗑️  Cleared existing articles');

    // Insert sample articles
    const articles = await Article.insertMany(sampleArticles);
    console.log(`✨ Added ${articles.length} sample articles`);

    console.log('\n📚 Sample Articles Added:');
    articles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title} (${article.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();