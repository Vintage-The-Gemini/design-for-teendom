// File: frontend/src/components/admin/nominations/StatusBadge.jsx

import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, AlertCircle } from 'lucide-react';

const StatusBadge = ({ status, adminStatus }) => {
  const getStatusConfig = () => {
    if (adminStatus) {
      switch (adminStatus) {
        case 'approved':
          return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' };
        case 'rejected':
          return { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' };
        case 'needs-info':
          return { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle, label: 'Needs Info' };
        case 'pending':
        default:
          return { color: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Pending Review' };
      }
    }
    
    switch (status) {
      case 'submitted':
        return { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'Submitted' };
      case 'under-review':
        return { color: 'bg-purple-100 text-purple-800', icon: AlertCircle, label: 'Under Review' };
      case 'approved':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Unknown' };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <IconComponent className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

export default StatusBadge;