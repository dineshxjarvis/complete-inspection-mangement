"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  Lock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Camera,
  Layers,
  ArrowRight,
  Shield,
  Clock,
  User,
  MapPin,
  Flame,
  CheckSquare,
  GitBranch
} from 'lucide-react';

export const Screen03MineInspectionDetails: React.FC = () => {
  const {
    activeInspection,
    navigateTo,
    checklistItems,
    findings,
    capaList,
    evidenceItems,
    activeObservation,
    setActiveFinding
  } = useMineResponse();

  const [activeTab, setActiveTab] = useState<string>('Overview');

  const insp = activeInspection;
  const summary = insp.summary;

  const tabs = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Checklist', label: 'Checklist (22)', target: '04' },
    { id: 'Observations', label: 'Observations (7)', target: '05' },
    { id: 'Evidence', label: 'Evidence (28)', target: '06' },
    { id: 'Findings', label: 'Findings (3)', target: '07' },
    { id: 'Mine Response', label: 'Mine Response', target: '09' },
    { id: 'CAPA', label: 'CAPA Actions', target: '12' },
    { id: 'Timeline', label: 'Timeline & History', target: '20' }
  ];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B',
                borderColor: 'rgba(0, 137, 123, 0.4)'
              }}
            >
              {insp.id}
            </span>
            <span className="status-pill status-completed">✓ {insp.status}</span>
            <span className="badge badge-info">{insp.authority} STATUTORY</span>
            <span className="badge badge-subtle">{insp.track} TRACK</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            MINE INSPECTION DOSSIER &bull; {insp.type}
          </h1>
          <p className="screen-subtitle">
            Statutory field inspection record conducted by Lead Inspector {insp.leadInspector.name} &bull; {insp.mine} ({insp.location})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('07')}
            style={{ color: '#E65100', borderColor: '#FFE0B2', background: '#FFF3E0' }}
          >
            <AlertTriangle size={13} />
            <span>View 3 Findings</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setActiveFinding(findings[0]);
              navigateTo('09');
            }}
            style={{ background: '#00897B', borderColor: '#00796B' }}
          >
            <FileText size={13} />
            <span>Respond to Findings</span>
          </button>
        </div>
      </div>

      {/* IMMUTABILITY / READ-ONLY GOVERNANCE BANNER */}
      <div
        style={{
          padding: '12px 18px',
          borderRadius: '6px',
          backgroundColor: '#ECEFF1',
          border: '1px solid #CFD8DC',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <Lock size={18} color="#455A64" />
        <div style={{ fontSize: '12px', color: '#37474F', lineHeight: 1.4 }}>
          <strong>Original inspection records cannot be edited by mine management:</strong> Inspector observations, calibrated measurements, GPS logs, photos, and non-compliance findings are cryptographically sealed. Mine management responsibilities are to formulate operational explanations, execute corrective actions, and submit verification evidence.
        </div>
      </div>

      {/* INSPECTION METRIC SUMMARY STRIP */}
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
          onClick={() => navigateTo('04')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #00897B' }}
        >
          <div className="kpi-label">Checklist Items</div>
          <div className="kpi-value" style={{ color: '#00897B' }}>{summary.totalChecklist}</div>
          <div className="kpi-meta" style={{ color: '#00796B', fontWeight: 600 }}>
            {summary.passCount} Pass &bull; {summary.failCount} Fail &bull; {summary.naCount} N/A
          </div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('05')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #5932A5' }}
        >
          <div className="kpi-label">Field Observations</div>
          <div className="kpi-value" style={{ color: '#5932A5' }}>{summary.observationsCount}</div>
          <div className="kpi-meta">Logged during traverse</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('06')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #1976D2' }}
        >
          <div className="kpi-label">Evidence Items</div>
          <div className="kpi-value" style={{ color: '#1976D2' }}>{summary.evidenceCount}</div>
          <div className="kpi-meta">Photos & Instruments</div>
        </div>

        <div
          className="kpi-card"
          style={{ borderLeft: '3px solid #F57C00' }}
        >
          <div className="kpi-label">Measurements</div>
          <div className="kpi-value" style={{ color: '#F57C00' }}>{summary.measurementsCount}</div>
          <div className="kpi-meta">Calibrated survey logs</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('07')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #D32F2F', background: '#FFF8F8' }}
        >
          <div className="kpi-label" style={{ color: '#B71C1C' }}>Confirmed Findings</div>
          <div className="kpi-value" style={{ color: '#D32F2F' }}>{summary.confirmedFindingsCount}</div>
          <div className="kpi-meta" style={{ color: '#B71C1C', fontWeight: 700 }}>Action Required</div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '20px',
          overflowX: 'auto'
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.target && tab.id !== 'Overview') {
                navigateTo(tab.target as any);
              }
            }}
            style={{
              padding: '9px 16px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: activeTab === tab.id ? '#00897B' : 'var(--text-secondary)',
              borderBottom: activeTab === tab.id ? '2px solid #00897B' : '2px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW CONTENT */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        {/* Left Column: Scope, Authority & Key Findings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Metadata Card */}
          <div className="card" style={{ margin: 0 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
              STATUTORY SCOPE & AUTHORITY PARAMETERS
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Colliery / Division:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{insp.colliery}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Location / Seam:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{insp.location}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Execution Date:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{insp.date} ({insp.timeWindow})</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Lead Inspector:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {insp.leadInspector.name} ({insp.leadInspector.certification})
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Authority Framework:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  Coal Mines Regulations (CMR) 2017 &bull; Mines Act 1952
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Dossier Cryptographic Seal:</span>
                <div style={{ fontWeight: 600, fontFamily: 'monospace', color: '#00796B' }}>
                  sha256_9c56cc51b374... (Sealed)
                </div>
              </div>
            </div>
          </div>

          {/* Confirmed Findings Linked Card */}
          <div className="card" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                CONFIRMED STATUTORY FINDINGS (3)
              </h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('07')}
                style={{ fontSize: '11px' }}
              >
                View Full Findings List
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {findings.map(fnd => (
                <div
                  key={fnd.id}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    borderLeft: `4px solid ${fnd.severity === 'CRITICAL' || fnd.severity === 'HIGH' ? '#D32F2F' : '#F57C00'}`,
                    background: 'var(--bg-surface-alt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span className="id-badge font-mono" style={{ fontSize: '11px' }}>{fnd.id}</span>
                      <span className={`badge ${fnd.severity === 'CRITICAL' ? 'badge-danger' : fnd.severity === 'HIGH' ? 'badge-danger' : 'badge-warning'}`}>
                        {fnd.severity}
                      </span>
                      <span className="badge badge-subtle">{fnd.requirementId}</span>
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {fnd.title}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {fnd.measurementText}
                    </div>
                  </div>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setActiveFinding(fnd);
                      navigateTo('08');
                    }}
                    style={{ fontSize: '11px' }}
                  >
                    <span>View Finding</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Action Hub & Next Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            className="card"
            style={{
              margin: 0,
              background: 'linear-gradient(135deg, #E0F2F1, #FFFFFF)',
              border: '1px solid #80CBC4'
            }}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: '13.5px', fontWeight: 700, color: '#004D40' }}>
              MINE MANAGER ACTIONS
            </h3>
            <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#00695C', lineHeight: 1.4 }}>
              Statutory obligations for confirmed inspection non-compliances at {insp.mine}:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setActiveFinding(findings[0]);
                  navigateTo('09');
                }}
                style={{ background: '#00897B', borderColor: '#00796B', justifyContent: 'flex-start' }}
              >
                <FileText size={13} />
                <span>Author Mine Response (FND-2026-00127)</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('12')}
                style={{ justifyContent: 'flex-start' }}
              >
                <CheckSquare size={13} />
                <span>Manage Linked CAPA (CAPA-2026-0048)</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('17')}
                style={{ justifyContent: 'flex-start' }}
              >
                <Camera size={13} />
                <span>Upload Maintenance / Survey Proof</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('11')}
                style={{ justifyContent: 'flex-start' }}
              >
                <GitBranch size={13} />
                <span>View Response Version History</span>
              </button>
            </div>
          </div>

          <div className="card" style={{ margin: 0 }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              STATUTORY TIMELINE
            </h3>
            <div style={{ fontSize: '11.5px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-secondary)' }}>
              <div>&bull; <strong>15 Nov 10:30</strong> — Field inspection commenced</div>
              <div>&bull; <strong>15 Nov 15:10</strong> — Inspection completed & submitted</div>
              <div>&bull; <strong>16 Nov 10:45</strong> — 3 Findings confirmed by reviewer</div>
              <div>&bull; <strong>30 Nov 23:59</strong> — Mine Response statutory deadline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
