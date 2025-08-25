// File: frontend/src/components/admin/nominations/NominationsTable.jsx
import React from 'react';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  User, 
  FileText,
  Clock,
  Award
} from 'lucide-react';

const StatusBadge = ({ status, adminStatus }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'submitted': { color: 'blue', label: 'Submitted' },
      'under-review': { color: 'yellow', label: 'Under Review' },
      'finalist': { color: 'green', label: 'Finalist' },
      'winner': { color: 'purple', label: 'Winner' },
      'rejected': { color: 'red', label: 'Rejected' }
    };
    return configs[status] || { color: 'gray', label: status };
  };

  const getAdminStatusConfig = (adminStatus) => {
    const configs = {
      'pending': { color: 'yellow', label: 'Pending' },
      'approved': { color: 'green', label: 'Approved' },
      'rejected': { color: 'red', label: 'Rejected' },
      'needs-info': { color: 'orange', label: 'Needs Info' }
    };
    return configs[adminStatus] || null;
  };

  const statusConfig = getStatusConfig(status);
  const adminConfig = getAdminStatusConfig(adminStatus);
  
  return (
    <div className="flex flex-col gap-1">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusConfig.color}-100 text-${statusConfig.color}-800`}>
        {statusConfig.label}
      </span>
      {adminConfig && (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${adminConfig.color}-100 text-${adminConfig.color}-800`}>
          {adminConfig.label}
        </span>
      )}
    </div>
  );
};

const ActionButtons = ({ nomination, onView, onApprove, onReject }) => {
  const isReviewed = nomination.adminReview?.status && nomination.adminReview?.status !== 'pending';

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onView(nomination)}
        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      
      {!isReviewed ? (
        <>
          <button
            onClick={() => onApprove(nomination._id)}
            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
            title="Approve"
          >
            <CheckCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => onReject(nomination._id)}
            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
            title="Reject"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </>
      ) : (
        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
          {nomination.adminReview?.status === 'approved' ? '✅ Approved' : 
           nomination.adminReview?.status === 'rejected' ? '❌ Rejected' :
           nomination.adminReview?.status === 'needs-info' ? '⚠️ Needs Info' : 'Reviewed'}
        </span>
      )}
    </div>
  );
};

const NominationsTable = ({ 
  nominations, 
  loading, 
  onView, 
  onApprove, 
  onReject,
  pagination,
  onPageChange 
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading nominations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {nominations.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nominee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nominator
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {nominations.map((nomination) => (
                  <tr key={nomination._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {nomination.nominee?.firstName} {nomination.nominee?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {nomination.nominee?.email}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {nomination.submissionId}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {nomination.awardCategory}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {nomination.nominator?.firstName} {nomination.nominator?.lastName}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {nomination.nominator?.relationship || 'Not specified'}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(nomination.submittedAt || nomination.createdAt)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge 
                        status={nomination.status} 
                        adminStatus={nomination.adminReview?.status} 
                      />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <ActionButtons
                        nomination={nomination}
                        onView={onView}
                        onApprove={onApprove}
                        onReject={onReject}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => onPageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => onPageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>

              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">
                      {((pagination.currentPage - 1) * pagination.limit) + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium">
                      {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)}
                    </span>{' '}
                    of{' '}
                    <span className="font-medium">{pagination.totalCount}</span>{' '}
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => onPageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNumber = i + 1;
                      const isActive = pageNumber === pagination.currentPage;
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => onPageChange(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            isActive
                              ? 'z-10 bg-red-50 border-red-500 text-red-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => onPageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No nominations found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {nominations.length === 0 ? 'No nominations have been submitted yet.' : 'Try adjusting your filters.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default NominationsTable;