// File: frontend/src/components/admin/nominations/NominationsFilters.jsx
import React from 'react';
import { Search, Download } from 'lucide-react';

const NominationsFilters = ({ filters, setFilters, onExport }) => {
  const categories = [
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

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'finalist', label: 'Finalist' },
    { value: 'winner', label: 'Winner' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const adminStatusOptions = [
    { value: 'all', label: 'All Admin Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'needs-info', label: 'Needs Info' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900">Filter Nominations</h2>
        <div className="text-sm text-gray-500">
          Use filters to find specific nominations quickly
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search nominations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
          />
        </div>

        {/* Status Filter */}
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Admin Status Filter */}
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          value={filters.adminStatus}
          onChange={(e) => setFilters(prev => ({ ...prev, adminStatus: e.target.value, page: 1 }))}
        >
          {adminStatusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value, page: 1 }))}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Export Button */}
        <button 
          onClick={onExport}
          className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default NominationsFilters;