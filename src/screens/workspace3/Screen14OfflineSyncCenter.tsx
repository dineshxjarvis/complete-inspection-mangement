"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  RefreshCw,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  ArrowLeft,
  Shield,
  HardDrive,
  Clock,
  ExternalLink
} from 'lucide-react';

export const Screen14OfflineSyncCenter: React.FC = () => {
  const {
    isOnline,
    toggleOnline,
    syncStatus,
    lastSyncTime,
    syncItems,
    syncNow,
    retrySyncItem,
    navigateTo,
    showToast
  } = useFieldInspection();

  const savedLocally = 4;
  const pendingCount = syncItems.filter(s => s.status === 'Pending').length;
  const syncedCount = syncItems.filter(s => s.status === 'Synced').length;
  const failedCount = syncItems.filter(s => s.status === 'Failed').length;

  return (
    <div className="screen-content" style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: isOnline ? '#2E7D32' : '#F57C00'
              }}
            />
            <span className="badge badge-subtle">{isOnline ? 'ONLINE' : 'OFFLINE MODE'}</span>
            <span className="id-badge font-mono" style={{ fontSize: '11px' }}>SYNC ENGINE</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            OFFLINE & SYNCHRONIZATION CENTER
          </h1>
          <p className="screen-subtitle">
            Local SQLite buffer, edge encrypted caching, and reliable multi-point telemetry sync
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={syncNow}
          disabled={syncStatus === 'SYNCING' || !isOnline}
          style={{
            background: isOnline ? '#7C4DFF' : '#A0AEC0',
            borderColor: isOnline ? '#7C4DFF' : '#A0AEC0',
            padding: '8px 20px'
          }}
        >
          <RefreshCw size={14} style={{ animation: syncStatus === 'SYNCING' ? 'spin 1s linear infinite' : 'none' }} />
          <span>{syncStatus === 'SYNCING' ? 'Synchronizing Records...' : 'Sync Now'}</span>
        </button>
      </div>

      {/* Connectivity Switch Banner */}
      <div
        className="card"
        style={{
          background: isOnline ? 'var(--status-green-bg)' : 'var(--status-amber-bg)',
          borderLeft: `4px solid ${isOnline ? '#2E7D32' : '#F57C00'}`,
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isOnline ? <Wifi size={24} color="#2E7D32" /> : <WifiOff size={24} color="#F57C00" />}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: isOnline ? '#1B5E20' : '#E65100' }}>
              Current Status: {isOnline ? 'Online — Connected to STRATA Central Server' : 'Offline Mode — Operating on Local Storage'}
            </div>
            <div style={{ fontSize: '12px', color: isOnline ? '#2E7D32' : '#E65100', marginTop: '2px' }}>
              Last Synchronization: <span className="font-mono">{lastSyncTime}</span> &bull; Buffer encryption: AES-256 GCM
            </div>
          </div>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={toggleOnline}
          style={{
            background: '#FFF',
            borderColor: isOnline ? '#2E7D32' : '#F57C00',
            color: isOnline ? '#1B5E20' : '#E65100',
            fontWeight: 700
          }}
        >
          {isOnline ? 'Simulate Offline Mode' : 'Reconnect Online'}
        </button>
      </div>

      {/* Sync Summary Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div className="kpi-card" style={{ borderLeft: '3px solid #5932A5' }}>
          <div className="kpi-label">Saved Locally</div>
          <div className="kpi-value" style={{ color: '#5932A5' }}>{savedLocally}</div>
          <div className="kpi-meta">Local SQLite database</div>
        </div>

        <div className="kpi-card" style={{ borderLeft: '3px solid #F57C00' }}>
          <div className="kpi-label">Pending Upload</div>
          <div className="kpi-value" style={{ color: '#F57C00' }}>{pendingCount}</div>
          <div className="kpi-meta">Staged in transmit queue</div>
        </div>

        <div className="kpi-card" style={{ borderLeft: '3px solid #2E7D32' }}>
          <div className="kpi-label">Synchronized</div>
          <div className="kpi-value" style={{ color: '#2E7D32' }}>{syncedCount}</div>
          <div className="kpi-meta">Server confirmed</div>
        </div>

        <div className="kpi-card" style={{ borderLeft: '3px solid #D32F2F' }}>
          <div className="kpi-label">Failed Transmits</div>
          <div className="kpi-value" style={{ color: '#D32F2F' }}>{failedCount}</div>
          <div className="kpi-meta">Requires retry</div>
        </div>
      </div>

      {/* PENDING TRANSMISSION QUEUE */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ padding: '14px 20px', background: 'var(--bg-surface-alt)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700 }}>
            FIELD ITEMS TRANSMISSION QUEUE
          </h3>
          <span className="badge badge-subtle">{syncItems.length} Total Items</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ minWidth: '100px' }}>Type</th>
                <th style={{ minWidth: '220px' }}>Reference Item</th>
                <th style={{ minWidth: '100px' }}>Payload Size</th>
                <th style={{ minWidth: '140px' }}>Timestamp</th>
                <th style={{ minWidth: '120px' }}>Status</th>
                <th style={{ minWidth: '110px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {syncItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <span className="badge badge-subtle">{item.type}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '12.5px' }}>{item.reference}</div>
                    {item.errorReason && (
                      <div style={{ fontSize: '11px', color: '#D32F2F', marginTop: '2px' }}>
                        ⚠️ {item.errorReason}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="font-mono" style={{ fontSize: '11.5px' }}>{item.size}</span>
                  </td>
                  <td>
                    <span className="timestamp font-mono" style={{ fontSize: '11px' }}>{item.timestamp}</span>
                  </td>
                  <td>
                    <span
                      className={`status-pill status-${
                        item.status === 'Synced'
                          ? 'completed'
                          : item.status === 'Pending'
                          ? 'pending'
                          : item.status === 'Syncing'
                          ? 'scheduled'
                          : 'rejected'
                      }`}
                    >
                      {item.status === 'Synced' && '✓ '}
                      {item.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {item.status === 'Failed' || item.status === 'Pending' ? (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => retrySyncItem(item.id)}
                        disabled={!isOnline}
                        style={{ fontSize: '11px' }}
                      >
                        <RotateCcw size={11} />
                        <span>Retry</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#2E7D32', fontWeight: 600 }}>Committed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Offline Policy Governance Box */}
      <div
        style={{
          background: 'var(--bg-surface-alt)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '16px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          lineHeight: 1.5
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5932A5', fontWeight: 700, marginBottom: '4px' }}>
          <Shield size={15} />
          <span>OFFLINE OPERATION POLICY:</span>
        </div>
        Inspection can continue offline using previously synchronized inspection data. All checks, observations, measurements, and photos are saved locally in the device's hardware encrypted vault. Official submission requires reconnection to STRATA Central Gateway for statutory cryptographic signing.
      </div>
    </div>
  );
};
