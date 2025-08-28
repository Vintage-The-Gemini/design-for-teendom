// File path: src/components/admin/nominations/NominationsManager.jsx

import { useState, useCallback } from 'react';
import NominationsStatsHeader from './NominationsStatsHeader';
import NominationsFilters from './NominationsFilters';
import NominationsTable from './NominationsTable';
import NominationDetailModal from './NominationDetailModal';

const NominationsManager = () => {
  const [selectedNomination, setSelectedNomination] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  // Trigger refresh of components
  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Handle nomination click to view details
  const handleNominationClick = (nomination) => {
    setSelectedNomination(nomination);
    setShowDetailModal(true);
  };

  // Handle closing detail modal
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedNomination(null);
  };

  // FIXED: Handle status update with proper error handling
  const handleStatusUpdate = async (nominationId, newStatus, notes = '') => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('Admin token not found. Please log in again.');
      }

      console.log(`🔄 Updating nomination ${nominationId} to ${newStatus}`);
      
      const response = await fetch(`http://localhost:5000/api/admin/nominations/${nominationId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus,
          notes: notes,
          sendNotification: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        // Success - refresh components
        triggerRefresh();
        
        // Show success message
        const statusText = newStatus === 'approved' ? 'approved' : 
                          newStatus === 'rejected' ? 'rejected' : 
                          newStatus === 'needs-info' ? 'flagged for more info' : 
                          newStatus;
        
        alert(`✅ Successfully ${statusText} nomination!`);
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('❌ Status update error:', error);
      alert(`❌ Error: ${error.message}`);
      throw error;
    }
  };

  // FIXED: Handle delete with proper confirmation
  const handleDelete = async (nomination) => {
    const nomineName = nomination.nominee?.firstName ? 
      `${nomination.nominee.firstName} ${nomination.nominee.lastName}` : 
      nomination.nomineeName || 'this nomination';
      
    if (!window.confirm(`Are you sure you want to delete the nomination for ${nomineName}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/nominations/${nomination._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete nomination');
      }

      // Success - refresh and close modal if this nomination was open
      triggerRefresh();
      if (selectedNomination?._id === nomination._id) {
        setShowDetailModal(false);
        setSelectedNomination(null);
      }
      
      alert(`✅ Successfully deleted nomination for ${nomineName}`);
    } catch (error) {
      console.error('❌ Delete error:', error);
      alert(`❌ Error deleting nomination: ${error.message}`);
    }
  };

  // FIXED: Handle bulk actions
  const handleBulkAction = async (nominationIds, action) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!nominationIds || nominationIds.length === 0) {
        alert('Please select nominations first');
        return;
      }

      const actionText = action === 'approve' ? 'approve' : 
                        action === 'reject' ? 'reject' : 
                        action === 'delete' ? 'delete' : action;

      if (!window.confirm(`Are you sure you want to ${actionText} ${nominationIds.length} nomination(s)?`)) {
        return;
      }

      console.log(`🔄 Bulk ${action} for ${nominationIds.length} nominations`);

      const response = await fetch('http://localhost:5000/api/admin/nominations/bulk-action', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nominationIds: nominationIds,
          action: action,
          notes: `Bulk ${action} action`,
          sendNotifications: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        // Success - refresh components
        triggerRefresh();
        
        const actionText = action === 'approve' ? 'approved' : 
                          action === 'reject' ? 'rejected' : 
                          action === 'delete' ? 'deleted' : action;
        
        alert(`✅ Successfully ${actionText} ${nominationIds.length} nomination${nominationIds.length > 1 ? 's' : ''}!`);
      } else {
        throw new Error(data.message || 'Failed to perform bulk action');
      }
    } catch (error) {
      console.error('❌ Bulk action error:', error);
      alert(`❌ Error: ${error.message}`);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Stats Header */}
        <NominationsStatsHeader 
          refreshTrigger={refreshTrigger}
        />

        {/* Filters */}
        <NominationsFilters 
          onFiltersChange={handleFiltersChange}
          totalResults={totalResults}
        />

        {/* Nominations Table */}
        <NominationsTable 
          filters={filters}
          onNominationClick={handleNominationClick}
          onStatusUpdate={handleStatusUpdate}
          onBulkAction={handleBulkAction}
          refreshTrigger={refreshTrigger}
        />

        {/* Detail Modal */}
        <NominationDetailModal
          nomination={selectedNomination}
          isOpen={showDetailModal}
          onClose={handleCloseDetailModal}
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleDelete}
        />

      </div>
    </div>
  );
};

export default NominationsManager;