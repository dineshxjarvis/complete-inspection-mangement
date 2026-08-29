"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  Play,
  Clock,
  CheckCircle,
  PauseCircle,
  RefreshCw,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Shield,
  MapPin,
  Calendar,
  UserCheck,
  ChevronRight,
  Wifi
} from 'lucide-react';

export const Screen01Dashboard: React.FC = () => {
  const {
    navigateTo,
    activeInspection,
    inspections,
    isOnline,
    lastSyncTime,
    syncItems,
    showToast
  } = useFieldInspection();

  const pendingSyncCount = syncItems.filter(s => s.status === 'Pending' || s.status === 'Failed').length;

  return (
    <div className="screen-content">
      {/* Screen Title & Subtitle */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #FF6B00, #E65100)',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}
            >
              WORKSPACE 03
            </span>
            <h1 className="screen-title" style={{ margin: 0 }}>
              FIELD INSPECTION
            </h1>
          </div>
          <p className="screen-subtitle">
            Prepare, execute, document and submit assigned inspections.
          </p>
        </div>

        {/* Top Status Bar Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: isOnline ? 'var(--status-green-bg)' : 'var(--status-amber-bg)',
              border: `1px solid ${isOnline ? 'var(--status-green-border)' : 'var(--status-amber-border)'}`,
              color: isOnline ? 'var(--status-green-text)' : 'var(--status-amber-text)',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isOnline ? '#2E7D32' : '#F57C00',
                boxShadow: isOnline ? '0 0 6px #4CAF50' : 'none'
              }}
            />
            <span>{isOnline ? '● Online (DGMS Gateway Connected)' : '● Offline Mode (Local Cache Active)'}</span>
            <span style={{ opacity: 0.6, fontSize: '11px' }}>&bull; Last synced: {lastSyncTime}</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigateTo('03')}
            style={{ background: '#FF6B00', borderColor: '#FF6B00' }}
          >
            <Play size={14} />
            <span>Open Current Brief (INS-0882)</span>
          </button>
        </div>
      </div>

      {/* Main KPI Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div
          className="kpi-card"
          onClick={() => navigateTo('02')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #5932A5' }}
        >
          <div className="kpi-label">Today's Inspections</div>
          <div className="kpi-value" style={{ color: '#5932A5' }}>2</div>
          <div className="kpi-meta">Mine A2 &bull; Mine B1</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('03')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #2E7D32' }}
        >
          <div className="kpi-label">Ready to Inspect</div>
          <div className="kpi-value" style={{ color: '#2E7D32' }}>1</div>
          <div className="kpi-meta">INS-2026-0882</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('06')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #1976D2' }}
        >
          <div className="kpi-label">In Progress</div>
          <div className="kpi-value" style={{ color: '#1976D2' }}>1</div>
          <div className="kpi-meta">12/22 Checks Complete</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('11A')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #F57C00' }}
        >
          <div className="kpi-label">Paused</div>
          <div className="kpi-value" style={{ color: '#F57C00' }}>1</div>
          <div className="kpi-meta">Shift Handover Pause</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('14')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #7C4DFF' }}
        >
          <div className="kpi-label">Pending Sync</div>
          <div className="kpi-value" style={{ color: '#7C4DFF' }}>{pendingSyncCount}</div>
          <div className="kpi-meta">Local records pending</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('18')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #D32F2F' }}
        >
          <div className="kpi-label">Returned for Clarification</div>
          <div className="kpi-value" style={{ color: '#D32F2F' }}>1</div>
          <div className="kpi-meta">Action Required</div>
        </div>
      </div>

      {/* FIELD ATTENTION CARDS */}
      <div style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '13.5px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-secondary)',
            marginBottom: '10px'
          }}
        >
          Field Attention
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px'
          }}
        >
          {/* Card 1: Start in 45 min */}
          <div
            className="card"
            onClick={() => navigateTo('03')}
            style={{
              padding: '14px',
              borderLeft: '4px solid #FF6B00',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'transform 0.15s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Clock size={14} color="#FF6B00" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Inspection starts in 45 min
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-muted)' }}>
                INS-2026-0882 &bull; Mine A2 Seam VII &bull; 10:30 IST
              </p>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" />
          </div>

          {/* Card 2: 1 returned inspection */}
          <div
            className="card"
            onClick={() => navigateTo('18')}
            style={{
              padding: '14px',
              borderLeft: '4px solid #D32F2F',
              background: 'var(--status-red-bg)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <RotateCcw size={14} color="#D32F2F" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#B71C1C' }}>
                  1 Returned Inspection
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '11.5px', color: '#B71C1C' }}>
                Anemometer calibration clarification required
              </p>
            </div>
            <ChevronRight size={16} color="#B71C1C" />
          </div>

          {/* Card 3: 3 records pending sync */}
          <div
            className="card"
            onClick={() => navigateTo('14')}
            style={{
              padding: '14px',
              borderLeft: '4px solid #7C4DFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <RefreshCw size={14} color="#7C4DFF" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  3 Records Pending Sync
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Evidence E-0042 &bull; Obs OBS-019 &bull; M-008
              </p>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" />
          </div>

          {/* Card 4: 1 paused inspection */}
          <div
            className="card"
            onClick={() => navigateTo('11A')}
            style={{
              padding: '14px',
              borderLeft: '4px solid #F57C00',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <PauseCircle size={14} color="#F57C00" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  1 Paused Inspection
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Paused at 14:05 (Shift ended / Blasting)
              </p>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" />
          </div>
        </div>
      </div>

      {/* MY INSPECTIONS SECTION */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface-alt)'
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>
              MY ASSIGNED FIELD INSPECTIONS
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
              Operational assignments under your First Class Manager & Lead Inspector credentials
            </p>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('02')}
          >
            View All ({inspections.length})
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ minWidth: '130px' }}>Inspection ID</th>
                <th style={{ minWidth: '180px' }}>Mine & Colliery</th>
                <th style={{ minWidth: '190px' }}>Inspection Type</th>
                <th style={{ minWidth: '90px' }}>Track</th>
                <th style={{ minWidth: '130px' }}>Date / Window</th>
                <th style={{ minWidth: '130px' }}>Your Role</th>
                <th style={{ minWidth: '80px' }}>Risk</th>
                <th style={{ minWidth: '110px' }}>Status</th>
                <th style={{ minWidth: '120px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((insp) => {
                const isPrimary = insp.id === activeInspection.id;
                return (
                  <tr
                    key={insp.id}
                    style={{
                      backgroundColor: isPrimary ? 'rgba(255, 107, 0, 0.04)' : undefined
                    }}
                  >
                    <td>
                      <span
                        className="id-badge font-mono"
                        style={{
                          background: isPrimary ? 'rgba(255, 107, 0, 0.15)' : undefined,
                          color: isPrimary ? '#E65100' : undefined,
                          borderColor: isPrimary ? 'rgba(255, 107, 0, 0.4)' : undefined,
                          fontWeight: 700
                        }}
                      >
                        {insp.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{insp.mine}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{insp.location}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 500 }}>{insp.type}</span>
                    </td>
                    <td>
                      <span className="badge badge-subtle">{insp.track}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{insp.date}</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{insp.timeWindow}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {insp.role}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          insp.riskLevel === 'HIGH'
                            ? 'badge-danger'
                            : insp.riskLevel === 'MEDIUM'
                            ? 'badge-warning'
                            : 'badge-success'
                        }`}
                      >
                        {insp.riskLevel}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-pill status-${
                          insp.status === 'Ready'
                            ? 'ready'
                            : insp.status === 'In Progress'
                            ? 'active'
                            : insp.status === 'Paused'
                            ? 'paused'
                            : insp.status === 'Returned'
                            ? 'returned'
                            : 'completed'
                        }`}
                      >
                        {insp.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          if (insp.status === 'Ready') navigateTo('03');
                          else if (insp.status === 'In Progress') navigateTo('06');
                          else if (insp.status === 'Paused') navigateTo('11A');
                          else if (insp.status === 'Returned') navigateTo('18');
                          else navigateTo('03');
                        }}
                        style={{
                          borderColor: isPrimary ? '#FF6B00' : undefined,
                          color: isPrimary ? '#E65100' : undefined,
                          fontWeight: 600
                        }}
                      >
                        <span>Open Brief</span>
                        <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

