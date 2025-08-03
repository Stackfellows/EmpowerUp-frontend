import React, { useState, useEffect } from 'react';

const SimpleCommissionDashboard = ({ userId, apiBaseUrl = '/api/users/:userId/commissions' }) => {
  const [commissionData, setCommissionData] = useState({
    summary: null,
    history: [],
    loading: true,
    error: null
  });

  // Fetch commission data
  const fetchCommissionData = async () => {
    try {
      setCommissionData(prev => ({ ...prev, loading: true, error: null }));

      console.log(`📊 Fetching commission data for user: ${userId}`);

      // Fetch commission summary
      const summaryResponse = await fetch(`${apiBaseUrl}/users/${userId}/commission-summary`);
      if (!summaryResponse.ok) {
        throw new Error(`Summary fetch failed: ${summaryResponse.status}`);
      }
      const summaryData = await summaryResponse.json();

      // Fetch commission history
      const historyResponse = await fetch(`${apiBaseUrl}/users/${userId}/commissions?limit=10`);
      if (!historyResponse.ok) {
        throw new Error(`History fetch failed: ${historyResponse.status}`);
      }
      const historyData = await historyResponse.json();

      setCommissionData({
        summary: summaryData.summary,
        history: historyData.commissions || [],
        loading: false,
        error: null
      });

      console.log('✅ Commission data fetched successfully:', {
        summary: summaryData.summary,
        historyCount: historyData.commissions?.length || 0
      });

    } catch (error) {
      console.error('❌ Failed to fetch commission data:', error);
      setCommissionData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  // Fetch data on component mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchCommissionData();
    }
  }, [userId]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Loading state
  if (commissionData.loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading commission data...</div>
      </div>
    );
  }

  // Error state
  if (commissionData.error) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#fee', 
        border: '1px solid #fcc',
        borderRadius: '4px',
        color: '#c33'
      }}>
        <h3>Error Loading Commission Data</h3>
        <p>{commissionData.error}</p>
        <button 
          onClick={fetchCommissionData}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const { summary, history } = commissionData;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Commission Dashboard</h2>
      
      {/* Commission Summary */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>Summary</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '6px'
          }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
              Total Earned
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
              {formatCurrency(summary?.totalEarned)}
            </div>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '6px'
          }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
              Pending
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
              {formatCurrency(summary?.totalPending)}
            </div>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '6px'
          }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
              Total Commissions
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
              {summary?.totalCommissions || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Commission History */}
      <div>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>Recent Commissions</h3>
        
        {history.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '6px',
            color: '#666'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>💰</div>
            <h4 style={{ margin: '0 0 10px 0' }}>No Commissions Yet</h4>
            <p style={{ margin: 0 }}>
              Commissions will appear here when users make purchases through your referral.
            </p>
          </div>
        ) : (
          <div style={{
            border: '1px solid #dee2e6',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              backgroundColor: '#f8f9fa',
              padding: '12px',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#495057',
              borderBottom: '1px solid #dee2e6'
            }}>
              <div>Date</div>
              <div>Amount</div>
              <div>Type</div>
              <div>Status</div>
            </div>

            {/* Table Rows */}
            {history.map((commission, index) => (
              <div 
                key={commission._id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  padding: '12px',
                  borderBottom: index < history.length - 1 ? '1px solid #dee2e6' : 'none',
                  backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa'
                }}
              >
                <div style={{ fontSize: '14px', color: '#495057' }}>
                  {formatDate(commission.createdAt)}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#28a745' }}>
                  {formatCurrency(commission.amount)}
                </div>
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: commission.commissionType === 'upliner' ? '#e3f2fd' : '#f3e5f5',
                    color: commission.commissionType === 'upliner' ? '#1976d2' : '#7b1fa2'
                  }}>
                    {commission.commissionType === 'upliner' ? 'Upliner (15%)' : 'Team Lead (5%)'}
                  </span>
                </div>
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: commission.status === 'pending' ? '#fff3cd' : '#d4edda',
                    color: commission.status === 'pending' ? '#856404' : '#155724'
                  }}>
                    {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={fetchCommissionData}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default SimpleCommissionDashboard;

