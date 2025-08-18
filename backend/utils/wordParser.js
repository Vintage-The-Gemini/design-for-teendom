// File: backend/utils/wordParser.js
// Word document parser to extract real article content

const mammoth = require('mammoth');
const fs = require('fs').promises;
const path = require('path');

class WordDocumentParser {
  constructor() {
    this.docsFolder = path.join(__dirname, '../docs'); // Create this folder
  }

  /**
   * Parse a Word document and extract HTML content
   * @param {string} filePath - Path to the Word document
   * @returns {Promise<Object>} - Parsed content with HTML and raw text
   */
  async parseWordDocument(filePath) {
    try {
      console.log(`📄 Parsing Word document: ${filePath}`);
      
      // Check if file exists
      await fs.access(filePath);
      
      // Parse document to HTML (preserves formatting)
      const htmlResult = await mammoth.convertToHtml({ path: filePath });
      
      // Parse document to plain text (for excerpts)
      const textResult = await mammoth.extractRawText({ path: filePath });
      
      // Clean up the HTML (remove excessive whitespace, etc.)
      const cleanHtml = this.cleanHtml(htmlResult.value);
      const cleanText = this.cleanText(textResult.value);
      
      // Extract excerpt (first 2-3 sentences)
      const excerpt = this.extractExcerpt(cleanText);
      
      // Calculate reading time (average 200 words per minute)
      const wordCount = cleanText.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);
      
      return {
        html: cleanHtml,
        text: cleanText,
        excerpt,
        wordCount,
        readTime,
        warnings: htmlResult.messages || []
      };
      
    } catch (error) {
      console.error(`❌ Error parsing document ${filePath}:`, error.message);
      throw new Error(`Failed to parse document: ${error.message}`);
    }
  }

  /**
   * Clean HTML content for better display
   * @param {string} html - Raw HTML from mammoth
   * @returns {string} - Cleaned HTML
   */
  cleanHtml(html) {
    return html
      // Remove empty paragraphs
      .replace(/<p>\s*<\/p>/g, '')
      // Clean up excessive whitespace
      .replace(/\s+/g, ' ')
      // Add proper spacing after paragraphs
      .replace(/<\/p>/g, '</p>\n')
      // Clean up line breaks
      .trim();
  }

  /**
   * Clean text content
   * @param {string} text - Raw text
   * @returns {string} - Cleaned text
   */
  cleanText(text) {
    return text
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove multiple line breaks
      .replace(/\n\s*\n/g, '\n')
      .trim();
  }

  /**
   * Extract excerpt from text (first 2-3 sentences)
   * @param {string} text - Full text content
   * @returns {string} - Excerpt
   */
  extractExcerpt(text) {
    // Split into sentences (basic sentence detection)
    const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [];
    
    // Take first 2-3 sentences, max 300 characters
    let excerpt = sentences.slice(0, 3).join(' ').trim();
    
    if (excerpt.length > 300) {
      excerpt = excerpt.substring(0, 300).trim() + '...';
    }
    
    return excerpt || text.substring(0, 300) + '...';
  }

  /**
   * Process all Word documents in a folder
   * @param {string} folderPath - Path to folder containing Word docs
   * @returns {Promise<Array>} - Array of parsed documents with metadata
   */
  async processDocumentsFolder(folderPath) {
    try {
      const files = await fs.readdir(folderPath);
      const wordFiles = files.filter(file => 
        file.toLowerCase().endsWith('.docx') || file.toLowerCase().endsWith('.doc')
      );

      console.log(`📁 Found ${wordFiles.length} Word documents in ${folderPath}`);

      const results = [];
      
      for (const file of wordFiles) {
        try {
          const filePath = path.join(folderPath, file);
          const parsed = await this.parseWordDocument(filePath);
          
          results.push({
            filename: file,
            filePath,
            ...parsed
          });
          
          console.log(`✅ Successfully parsed: ${file}`);
        } catch (error) {
          console.error(`❌ Failed to parse ${file}:`, error.message);
          results.push({
            filename: file,
            error: error.message
          });
        }
      }

      return results;
    } catch (error) {
      console.error(`❌ Error processing folder ${folderPath}:`, error.message);
      throw error;
    }
  }
}

module.exports = WordDocumentParser;

// File: backend/utils/updateArticlesWithContent.js
// Script to update database articles with real Word document content

require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('../models/Article');
const WordDocumentParser = require('./wordParser');
const path = require('path');

const updateArticlesWithRealContent = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const parser = new WordDocumentParser();
    
    // Get all articles from database
    const articles = await Article.find({});
    console.log(`📚 Found ${articles.length} articles in database`);

    // Map of document filenames to article titles (for matching)
    const documentMap = {
      'ACNE IN TEENAGE BOYS - Catherine Kinyanjui.docx': 'ACNE IN TEENAGE BOYS',
      'COVER STORY_ BOYLAN SISTERS.docx': 'THE BOYLAN SISTERS: Constitutional Champions',
      'TEEN CEO.docx': 'TEEN CEO: Building Your Empire Young',
      'SAVINGS-Makenya.docx': 'HOW TO STAY WISE ABOUT YOUR CENTS',
      'Boost Your Self-Esteem.docx': 'BOOST YOUR SELF-ESTEEM',
      'Relationships.docx': 'RELATIONSHIPS: NAVIGATING TEEN LOVE',
      'Body Odour.docx': 'BODY ODOUR: A Teen\'s Guide',
      'Bully proof.docx': 'BULLY PROOF: Standing Strong',
      'In their FootSteps.docx': 'IN THEIR FOOTSTEPS: Career Guidance',
      'RIDE OR DIE- By Faith Bwari.doc': 'RIDE OR DIE: Friendship Loyalty'
    };

    const docsPath = path.join(__dirname, '../docs'); // You'll need to create this folder
    
    // Check if docs folder exists
    try {
      await require('fs').promises.access(docsPath);
    } catch (error) {
      console.log(`📁 Creating docs folder at: ${docsPath}`);
      await require('fs').promises.mkdir(docsPath, { recursive: true });
      console.log(`❗ Please place your Word documents in: ${docsPath}`);
      console.log('❗ Documents needed:');
      Object.keys(documentMap).forEach(doc => console.log(`   - ${doc}`));
      return;
    }

    // Process documents
    const parsedDocs = await parser.processDocumentsFolder(docsPath);
    console.log(`📄 Parsed ${parsedDocs.length} documents`);

    let updatedCount = 0;

    // Update each article with real content
    for (const article of articles) {
      console.log(`\n🔍 Processing: ${article.title}`);
      
      // Find matching document
      const docFilename = Object.keys(documentMap).find(filename => 
        documentMap[filename] === article.title
      );
      
      if (!docFilename) {
        console.log(`⚠️  No document mapping found for: ${article.title}`);
        continue;
      }

      const parsedDoc = parsedDocs.find(doc => doc.filename === docFilename);
      
      if (!parsedDoc) {
        console.log(`⚠️  Document not found: ${docFilename}`);
        continue;
      }

      if (parsedDoc.error) {
        console.log(`❌ Error in document ${docFilename}: ${parsedDoc.error}`);
        continue;
      }

      // Update article with real content
      article.content = parsedDoc.html;
      article.excerpt = parsedDoc.excerpt;
      article.readTime = parsedDoc.readTime;
      
      await article.save();
      updatedCount++;
      
      console.log(`✅ Updated: ${article.title}`);
      console.log(`   📝 Content length: ${parsedDoc.html.length} characters`);
      console.log(`   ⏱️  Read time: ${parsedDoc.readTime} minutes`);
      console.log(`   📄 Word count: ${parsedDoc.wordCount} words`);
    }

    console.log(`\n🎉 Successfully updated ${updatedCount} articles with real content!`);
    
  } catch (error) {
    console.error('❌ Error updating articles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
};

// Run the update script
if (require.main === module) {
  updateArticlesWithRealContent();
}

module.exports = updateArticlesWithRealContent;