// File: frontend/src/components/admin/nominations/NominationsTable.jsx
import React, { useState, useEffect } from 'react';
import { 
  Eye, CheckCircle, XCircle, Clock, AlertTriangle, User, Mail, Phone, 
  MapPin, Award, Calendar, FileText, MoreHorizontal, ChevronLeft, 
  ChevronRight, Check, X, Trash2, Download, Search, Filter
} from 'lucide-react';

const NominationsTable = ({ 
  filters = {}, 
  onNominationClick, 
  onStatusUpdate, 
  refreshTrigger = 0 
}) => {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // FIXED: Smart image URL getter that handles all URL types
  const getAccessibleImageUrl = (nomination) => {
    const baseUrl = 'http://localhost:5000';
    
    // Priority order for image access
    const urlSources = [
      // 1. Cloudinary URL (best)
      nomination.cloudinary?.photo?.url,
      // 2. Admin access URL 
      nomination.adminAccessUrls?.nomineePhoto,
      // 3. Local server file
      nomination.files?.photo?.filename ? `${baseUrl}/uploads/nominations/${nomination.files.photo.filename}` : null,
      // 4. Files URL (if not blob)
      nomination.files?.photo?.url && !nomination.files.photo.url.startsWith('blob:') ? 
        (nomination.files.photo.url.startsWith('http') ? nomination.files.photo.url : `${baseUrl}${nomination.files.photo.url}`) : null
    ];
    
    // Return first valid URL
    for (const url of urlSources) {
      if (url) return url;
    }
    
    return '/placeholder-photo.jpg';
  };

  // Fetch nominations from API
  const fetchNominations = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...filters
      });

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/nominations?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please log in again.');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        setNominations(data.data.nominations || []);
        if (data.pagination) {
          setTotalPages(Math.ceil(data.pagination.totalCount / itemsPerPage));
        }
      } else {
        throw new Error(data.message || 'Failed to fetch nominations');
      }
    } catch (err) {
      console.error('Error fetching nominations:', err);
      setError(err.message);
      setNominations([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when filters change or component mounts
  useEffect(() => {
    fetchNominations();
  }, [filters, refreshTrigger, currentPage]);

  // Format date helper
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' },
      'needs-info': { color: 'bg-blue-100 text-blue-800', icon: AlertTriangle, label: 'Needs Info' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;