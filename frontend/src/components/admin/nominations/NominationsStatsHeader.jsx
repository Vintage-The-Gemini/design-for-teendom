// File: frontend/src/components/admin/nominations/NominationsStatsHeader.jsx
import React from 'react';
import { Clock, CheckCircle, XCircle, Award } from 'lucide-react';

const NominationsStatsHeader = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-8 text-white animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="h-8 bg-red-500 rounded w-64"></div>
            <div className="h-4 bg-red-500 rounded w-48"></div>
          </div>
          <div className="h-12 bg-red-500 rounded w-16"></div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="h-8 bg-red-500 rounded mb-2"></div>
              <div className="h-6 bg-red-500 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black mb-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
            Nominations Management
          </h1>
          <p className="text-red-100">Review and manage award nominations</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black">{stats.overview?.total || 0}</div>
          <div className="text-red-100">Total Nominations</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-300" />
            <div>
              <div className="text-2xl font-bold">{stats.overview?.pending || 0}</div>
              <div className="text-red-100 text-sm">Pending Review</div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-300" />
            <div>
              <div className="text-2xl font-bold">{stats.overview?.approved || 0}</div>
              <div className="text-red-100 text-sm">Approved</div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-300" />
            <div>
              <div className="text-2xl font-bold">{stats.overview?.rejected || 0}</div>
              <div className="text-red-100 text-sm">Rejected</div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-purple-300" />
            <div>
              <div className="text-2xl font-bold">{stats.overview?.total || 0}</div>
              <div className="text-red-100 text-sm">All Entries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominationsStatsHeader;