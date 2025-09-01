// File: frontend/src/components/admin/ArticlesManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Eye, EyeOff, Search, RefreshCw, 
  Save, X, Star, BookOpen, User, Clock, TrendingUp,
  CheckCircle, AlertCircle
} from 'lucide-react';
import adminApi from '../../services/adminApi';
import ImageUpload from './ImageUpload';

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between animate-slide-in`}>
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Article Form Modal
const ArticleFormModal = ({ article, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'SELF-CARE',
    author: '',
    image: '',
    readTime: 5,
    featured: false,
    published: true,
    tags: []
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const categories = [
    'SELF-CARE', 'LEADERSHIP', 'BUSINESS', 'MONEY', 
    'LIFESTYLE', 'RELATIONSHIPS', 'EDUCATION'
  ];

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        category: article.category || 'SELF-CARE',
        author: article.author || '',
        image: article.image || '',
        readTime: article.readTime || 5,
        featured: article.featured || false,
        published: article.published !== undefined ? article.published : true,
        tags: article.tags || []
      });
    } else {
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'SELF-CARE',
        author: '',
        image: '',
        readTime: 5,
        featured: false,
        published: true,
        tags: []
      });
    }
    setImageFile(null);
  }, [article, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const uploadToCloudinary = async (file) => {
    try {
      setUploading(true);
      
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', 'teendom_uploads');
      formDataUpload.append('folder', 'teendom-awards/articles');

      const response = await fetch('https://api.cloudinary.com/v1_1/dbidxxqxr/image/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw new Error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);

      let finalImageUrl = formData.image;
      if (imageFile) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      const articleData = {
        ...formData,
        image: finalImageUrl
      };

      await onSave(articleData);
      onClose();
    } catch (error) {
      console.error('Error saving article:', error);
      alert(`Error saving article: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900">
              {article ? 'Edit Article' : 'Create New Article'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter article title..."
                />
              </div>

              {/* Category & Author */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Author name"
                  />
                </div>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Read Time (min)</label>
                  <input
                    type="number"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    min="1"
                    max="60"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center pt-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Featured</span>
                  </label>
                </div>
                <div className="flex items-center pt-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Published</span>
                  </label>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the article..."
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Image Upload */}
              <ImageUpload
                currentImage={formData.image}
                onImageChange={setImageFile}
                uploading={uploading}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your article content here... You can use HTML tags for formatting."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium flex items-center"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {article ? 'Update Article' : 'Create Article'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Article Card Component
const ArticleCard = ({ article, onEdit, onDelete, onTogglePublished, onToggleFeatured }) => {
  const getImageUrl = () => {
    if (!article.image) return null;
    return article.image.startsWith('http') ? article.image : null;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <BookOpen className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        <div className="absolute top-3 left-3 space-y-2">
          {article.featured && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Star className="w-3 h-3 mr-1" />
              FEATURED
            </span>
          )}
          <span 
            className={`px-2 py-1 rounded-full text-xs font-bold ${
              article.published ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {article.published ? 'PUBLISHED' : 'DRAFT'}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              {article.author}
            </span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {article.readTime}m
            </span>
            <span className="flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {article.views || 0}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => onTogglePublished(article._id)}
              className={`p-2 rounded-lg transition-colors ${
                article.published ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              {article.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onToggleFeatured(article._id)}
              className={`p-2 rounded-lg transition-colors ${
                article.featured ? 'text-yellow-600 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <Star className={`w-4 h-4 ${article.featured ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(article)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(article._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Articles Manager
const ArticlesManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [toasts, setToasts] = useState([]);

  const categories = ['all', 'SELF-CARE', 'LEADERSHIP', 'BUSINESS', 'MONEY', 'LIFESTYLE', 'RELATIONSHIPS', 'EDUCATION'];

  useEffect(() => {
    loadArticles();
  }, []);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getArticles();
      setArticles(response.data?.articles || []);
      addToast('Articles loaded successfully', 'success');
    } catch (err) {
      console.error('Error loading articles:', err);
      setError(err.message);
      addToast('Failed to load articles', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArticle = () => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleSaveArticle = async (articleData) => {
    try {
      if (editingArticle) {
        await adminApi.updateArticle(editingArticle._id, articleData);
        addToast('Article updated successfully', 'success');
      } else {
        await adminApi.createArticle(articleData);
        addToast('Article created successfully', 'success');
      }
      loadArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      addToast(`Failed to save article: ${error.message}`, 'error');
      throw error;
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      await adminApi.deleteArticle(id);
      addToast('Article deleted successfully', 'success');
      loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      addToast('Failed to delete article', 'error');
    }
  };

  const handleTogglePublished = async (id) => {
    try {
      await adminApi.toggleArticlePublished(id);
      addToast('Article status updated', 'success');
      loadArticles();
    } catch (error) {
      console.error('Error toggling published status:', error);
      addToast('Failed to update article status', 'error');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await adminApi.toggleArticleFeatured(id);
      addToast('Featured status updated', 'success');
      loadArticles();
    } catch (error) {
      console.error('Error toggling featured status:', error);
      addToast('Failed to update featured status', 'error');
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Articles Manager</h1>
          <p className="text-gray-600 mt-1">Create and manage articles with image upload</p>
        </div>
        <button
          onClick={handleCreateArticle}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Article
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <button
              onClick={loadArticles}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-blue-900">{articles.length}</p>
              <p className="text-blue-700 text-sm font-medium">Total Articles</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-green-900">
                {articles.filter(a => a.published).length}
              </p>
              <p className="text-green-700 text-sm font-medium">Published</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-yellow-900">
                {articles.filter(a => a.featured).length}
              </p>
              <p className="text-yellow-700 text-sm font-medium">Featured</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-purple-900">
                {articles.reduce((sum, a) => sum + (a.views || 0), 0)}
              </p>
              <p className="text-purple-700 text-sm font-medium">Total Views</p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Articles</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadArticles}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard
              key={article._id}
              article={article}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
              onTogglePublished={handleTogglePublished}
              onToggleFeatured={handleToggleFeatured}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Articles Found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search criteria' 
              : 'Create your first article to get started'
            }
          </p>
          <button
            onClick={handleCreateArticle}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Create Article
          </button>
        </div>
      )}

      {/* Article Form Modal */}
      <ArticleFormModal
        article={editingArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveArticle}
      />
    </div>
  );
};

export default ArticlesManager;