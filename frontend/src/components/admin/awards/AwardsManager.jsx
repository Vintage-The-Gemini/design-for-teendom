// File: frontend/src/components/admin/awards/AwardsManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Award,
  Plus,
  Filter,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import adminApi from '../../../services/adminApi';

const AwardsManager = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [awardsData, setAwardsData] = useState({
    overview: {},
    awards: [],
    nominations: [],
    judges: [],
    loading: true
  });
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    phase: ''
  });

  useEffect(() => {
    loadAwardsData();
  }, []);

  const loadAwardsData = async () => {
    try {
      setAwardsData(prev => ({ ...prev, loading: true }));
      
      const [overview, awards, nominations] = await Promise.all([
        adminApi.makeRequest('/admin/awards/stats'),
        adminApi.makeRequest('/admin/awards'),
        adminApi.makeRequest('/admin/awards/nominations?limit=50')
      ]);

      setAwardsData({
        overview: overview.data,
        awards: awards.data.awards,
        nominations: nominations.data.nominations,
        judges: [],
        loading: false
      });
    } catch (error) {
      console.error('Failed to load awards data:', error);
      setAwardsData(prev => ({ ...prev, loading: false }));
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'awards', name: 'Awards', icon: Trophy },
    { id: 'nominations', name: 'Nominations', icon: FileText },
    { id: 'judges', name: 'Judges', icon: Users },
    { id: 'voting', name: 'Voting', icon: Award }
  ];

  if (awardsData.loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">Loading awards data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black mb-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Teendom Awards 2025
            </h1>
            <p className="text-red-100">Recognizing and celebrating outstanding teenagers</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{awardsData.overview.totalNominations || 0}</div>
              <div className="text-red-200 text-sm">Nominations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{awardsData.overview.totalAwards || 0}</div>
              <div className="text-red-200 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{awardsData.overview.totalJudges || 0}</div>
              <div className="text-red-200 text-sm">Judges</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab data={awardsData.overview} />}
          {activeTab === 'awards' && <AwardsTab awards={awardsData.awards} onRefresh={loadAwardsData} />}
          {activeTab === 'nominations' && <NominationsTab nominations={awardsData.nominations} onRefresh={loadAwardsData} />}
          {activeTab === 'judges' && <JudgesTab judges={awardsData.judges} onRefresh={loadAwardsData} />}
          {activeTab === 'voting' && <VotingTab />}
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ data }) => {
  const phases = [
    { id: 'pre-awards', name: 'Pre-Awards', period: 'Aug - Sep 4', status: 'completed' },
    { id: 'nominations', name: 'Nominations', period: 'Sep 5 - 30', status: 'active' },
    { id: 'judging', name: 'Judging', period: 'Oct 5 - Nov 5', status: 'upcoming' },
    { id: 'voting', name: 'Voting', period: 'Nov 8 - 24', status: 'upcoming' },
    { id: 'ceremony', name: 'Ceremony', period: 'Dec 6', status: 'upcoming' },
    { id: 'post-awards', name: 'Legacy', period: 'Dec 7 - 2026', status: 'upcoming' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Clock className="w-4 h-4" />;
      case 'upcoming': return <Calendar className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Awards Timeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phases.map((phase, index) => (
            <div key={phase.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{phase.name}</h4>
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                  {getStatusIcon(phase.status)}
                  <span className="capitalize">{phase.status}</span>
                </span>
              </div>
              <p className="text-sm text-gray-600">{phase.period}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Nominations</p>
                <p className="text-2xl font-bold">{data.overview?.totalNominations || 0}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Award Categories</p>
                <p className="text-2xl font-bold">{data.overview?.totalAwards || 0}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Active Judges</p>
                <p className="text-2xl font-bold">{data.overview?.totalJudges || 0}</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Total Votes</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Award className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {data.nominationsByCategory && data.nominationsByCategory.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Nominations by Category</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-3">
              {data.nominationsByCategory.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{category.category}</span>
                  <span className="text-sm font-bold text-gray-600">{category.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Awards Tab Component
const AwardsTab = ({ awards, onRefresh }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const awardCategories = [
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
  ];

  const getPhaseColor = (phase) => {
    const colors = {
      'pre-awards': 'bg-gray-100 text-gray-800',
      'nominations': 'bg-blue-100 text-blue-800',
      'judging': 'bg-yellow-100 text-yellow-800',
      'voting': 'bg-purple-100 text-purple-800',
      'ceremony': 'bg-green-100 text-green-800',
      'post-awards': 'bg-indigo-100 text-indigo-800'
    };
    return colors[phase] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Award Categories</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Award</span>
        </button>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {awards.map((award) => (
          <div key={award._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">{award.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{award.category}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPhaseColor(award.phase)}`}>
                  {award.phase.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{award.description}</p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  <FileText className="w-4 h-4 inline mr-1" />
                  {award.nominationCount || 0} nominations
                </span>
                <span className="text-gray-600">
                  <Star className="w-4 h-4 inline mr-1" />
                  {award.finalistsCount || 0} finalists
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Deadline: {new Date(award.nominationDeadline).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full ${award.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {award.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {awards.length === 0 && (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No awards created yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first award category.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Create First Award
          </button>
        </div>
      )}
    </div>
  );
};

// Nominations Tab Component
const NominationsTab = ({ nominations, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'finalist', label: 'Finalist' },
    { value: 'winner', label: 'Winner' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      'under-review': 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      finalist: 'bg-purple-100 text-purple-800',
      winner: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredNominations = nominations.filter(nomination => {
    const matchesSearch = searchTerm === '' || 
      nomination.nominee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nomination.nominee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nomination.submissionNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || nomination.status === statusFilter;
    const matchesCategory = categoryFilter === '' || nomination.awardCategory === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search nominations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Nominations Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nominee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNominations.map((nomination) => (
                <tr key={nomination._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {nomination.nominee.firstName} {nomination.nominee.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{nomination.nominee.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{nomination.awardCategory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(nomination.status)}`}>
                      {nomination.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{nomination.submissionNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(nomination.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredNominations.length === 0 && (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No nominations found</h3>
          <p className="text-gray-600">No nominations match your current filters.</p>
        </div>
      )}
    </div>
  );
};

// Judges Tab Component
const JudgesTab = ({ judges, onRefresh }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Judges Management</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Judge</span>
        </button>
      </div>

      {/* Coming Soon Placeholder */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Judges Management</h3>
          <p className="text-gray-600 mb-6">
            Comprehensive judge management system including assignment, progress tracking, and access control.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">Judge Assignment</h4>
              <p className="text-blue-700 text-sm">Assign judges to specific categories with expertise matching</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-900 mb-2">Progress Tracking</h4>
              <p className="text-green-700 text-sm">Monitor judging progress and completion rates</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-bold text-purple-900 mb-2">Access Control</h4>
              <p className="text-purple-700 text-sm">Generate secure access links and scoring sheets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Voting Tab Component
const VotingTab = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Public Voting Management</h3>

      {/* Coming Soon Placeholder */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="text-center">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Voting System</h3>
          <p className="text-gray-600 mb-6">
            Public voting interface for finalists selection and winner determination.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-900 mb-2">Finalist Display</h4>
              <p className="text-yellow-700 text-sm">Showcase top 3 finalists per category</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h4 className="font-bold text-pink-900 mb-2">Vote Management</h4>
              <p className="text-pink-700 text-sm">Secure voting with duplicate prevention</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-bold text-indigo-900 mb-2">Real-time Results</h4>
              <p className="text-indigo-700 text-sm">Live vote counting and analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsManager;