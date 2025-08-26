// File: frontend/src/components/admin/NominationsManager.jsx
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

  // Handle status update
  const handleStatusUpdate = async (nominationId, newStatus, notes) => {
    try {
      const token = localStorage.getItem('adminToken');
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
                          newStatus === 'needs-info' ? 'flagged for more info' : 'updated';
        
        alert(`✅ Nomination ${statusText} successfully!`);
      } else {
        throw new Error(data.message || 'Failed to update nomination status');
      }
    } catch (error) {
      console.error('Error updating nomination status:', error);
      alert(`❌ Error: ${error.message}`);
      throw error;
    }
  };

  // Handle nomination deletion
  const handleDelete = async (nominationId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/nominations/${nominationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        // Success - refresh components
        triggerRefresh();
        alert('✅ Nomination deleted successfully!');
      } else {
        throw new Error(data.message || 'Failed to delete nomination');
      }
    } catch (error) {
      console.error('Error deleting nomination:', error);
      alert(`❌ Error: ${error.message}`);
      throw error;
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (nominationIds, action) => {
    try {
      if (!nominationIds || nominationIds.length === 0) {
        throw new Error('No nominations selected');
      }

      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/nominations/bulk-action', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nominationIds: nominationIds,
          action: action,
          notes: `Bulk ${action} action performed`,
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
      console.error('Error performing bulk action:', error);
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