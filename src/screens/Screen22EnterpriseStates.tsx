"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import {
  Layers,
  Inbox,
  AlertTriangle,
  Lock,
  WifiOff,
  Radio,
  FileQuestion,
  RefreshCw
} from 'lucide-react';

export const Screen22EnterpriseStates: React.FC = () => {
  const {
    activeEnterpriseState,
    setEnterpriseState,
    navigateTo,
    showToast
  } = useStrata();

  const states = [
    { id: 'state-empty-rec', name: '1. Empty State (No Recommendations)' },
    { id: 'state-empty-plans', name: '2. Empty State (No Inspection Plans)' },
    { id: 'state-loading-table', name: '3. Skeleton Loading State' },
    { id: 'state-unauth', name: '4. Unauthorized / Permission Denied' },
    { id: 'state-conflict-alert', name: '5. Scheduling Conflict Alert State' },
    { id: 'state-overdue-banner', name: '6. Overdue Inspection Banner State' },
    { id: 'state-offline-sync', name: '7. Offline / Sync Pending State' },
    { id: 'state-live-field', name: '8. Live Telemetry Stream State' },
    { id: 'state-not-found', name: '9. Object Not Found (404)' }
  ];

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Enterprise States Gallery</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Layers size={20} color="var(--purple-primary)" />
            Enterprise System States Gallery (9 Mandatory States)
          </h1>
          <p className="screen-subtitle">
            Interactive showcase of enterprise states: empty states, skeleton loading, unauthorized access, scheduling conflicts, overdue alerts, offline sync, live telemetry, and 404.
          </p>
        </div>
      </div>

      {/* State Selector Tabs */}
      <div className="tabs-nav" style={{ flexWrap: 'wrap' }}>
        {states.map((s) => (
          <button
            key={s.id}
            className={`tab-btn ${activeEnterpriseState === s.id ? 'active' : ''}`}
            onClick={() => setEnterpriseState(s.id)}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* State Viewport */}
      <div className="enterprise-card" style={{ minHeight: '340px' }}>
        <div className="card-body">
          
          {/* 1. Empty Recommendations */}
          {activeEnterpriseState === 'state-empty-rec' && (
            <div className="state-container">
              <div className="state-icon-box state-icon-neutral">
                <Inbox size={24} />
              </div>
              <h2 className="state-title">No Recommendations In Queue</h2>
              <p className="state-description">
                All statutory inspection obligations for the selected scope (CIL / ECL / Area 01 / Mine A2) are up to date. No pending risk threshold alerts.
              </p>
              <div className="state-meta-box">Scope: CIL / ECL / Area 01 / Mine A2 &bull; Active Regulations: CMR 2017 & CEA 2010</div>
              <button className="btn btn-primary" onClick={() => navigateTo('07')}>+ Create Manual Inspection Plan</button>
            </div>
          )}

          {/* 2. Empty Plans */}
          {activeEnterpriseState === 'state-empty-plans' && (
            <div className="state-container">
              <div className="state-icon-box state-icon-neutral">
                <FileQuestion size={24} />
              </div>
              <h2 className="state-title">No Inspection Plans Configured</h2>
              <p className="state-description">
                No active or draft inspection plans exist for this colliery section. Convert an accepted recommendation or intake request to initialize a plan.
              </p>
              <div className="state-meta-box">Scope: Mine B1 (Inclined Mine) &bull; Status: DRAFT / PLANNED</div>
              <button className="btn btn-primary" onClick={() => navigateTo('04')}>Review Recommendations Queue</button>
            </div>
          )}

          {/* 3. Skeleton Loading */}
          {activeEnterpriseState === 'state-loading-table' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <strong style={{ fontSize: '13px' }}>Fetching Statutory Records from Central DGMS Repository...</strong>
                <span className="badge badge-draft">Simulated 450ms Fetch</span>
              </div>
              <div className="table-responsive">
                <table className="strata-table">
                  <thead>
                    <tr>
                      <th>Plan ID</th>
                      <th>Title</th>
                      <th>Mine</th>
                      <th>Regulatory Ref</th>
                      <th>Risk</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <tr key={idx} className="skeleton-row">
                        <td><div className="skeleton-box" style={{ width: '90px' }} /></td>
                        <td><div className="skeleton-box" style={{ width: '220px' }} /></td>
                        <td><div className="skeleton-box" style={{ width: '110px' }} /></td>
                        <td><div className="skeleton-box" style={{ width: '130px' }} /></td>
                        <td><div className="skeleton-box" style={{ width: '60px' }} /></td>
                        <td><div className="skeleton-box" style={{ width: '80px' }} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. Unauthorized Access */}
          {activeEnterpriseState === 'state-unauth' && (
            <div className="state-container">
              <div className="state-icon-box state-icon-danger">
                <Lock size={24} />
              </div>
              <h2 className="state-title" style={{ color: 'var(--status-red-text)' }}>403 &bull; Statutory Authorization Required</h2>
              <p className="state-description">
                Your current badge (STRATA-GOV-9042) does not possess the <strong>DIRECTOR_TECHNICAL_OVERRIDE</strong> credential required to bypass CMR 2017 Regulation 153 mandatory ventilation cycles.
              </p>
              <div className="state-meta-box">Current Role: Authorized Inspection Manager &bull; Required Permission: DIR_TECH_DGMS_SIGN</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary" onClick={() => navigateTo('01')}>Return to Dashboard</button>
                <button className="btn btn-primary" onClick={() => showToast('Permission escalation request logged to Security Cell', 'info')}>
                  Request Authority Elevation
                </button>
              </div>
            </div>
          )}

          {/* 5. Scheduling Conflict */}
          {activeEnterpriseState === 'state-conflict-alert' && (
            <div className="state-container">
              <div className="state-icon-box state-icon-warning">
                <AlertTriangle size={24} />
              </div>
              <h2 className="state-title" style={{ color: 'var(--status-orange-text)' }}>Scheduling Conflict Detected</h2>
              <p className="state-description">
                Underground high-voltage power isolation test overlaps with target ventilation audit slot in Mine A2 Seam VII on 15 Nov 2026.
              </p>
              <div className="state-meta-box">Conflict Target: INS-2026-0782 (10:00 - 13:00) vs INS-2026-0882 (09:00 - 15:00)</div>
              <button className="btn btn-danger" onClick={() => navigateTo('11', { planId: 'PLAN-2026-0088' })}>
                Open Conflict Resolution Workflow &rarr;
              </button>
            </div>
          )}

          {/* 6. Overdue Banner */}
          {activeEnterpriseState === 'state-overdue-banner' && (
            <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderLeft: '4px solid #C62828', padding: '16px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#B71C1C', letterSpacing: '0.6px' }}>STATUTORY NON-COMPLIANCE RISK &bull; 7 DAYS OVERDUE</div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#B71C1C', marginTop: '2px' }}>
                    Airborne Respirable Dust & Gas Survey (INS-2026-0799)
                  </h3>
                  <div style={{ fontSize: '11.5px', color: '#7F0000', marginTop: '4px' }}>
                    Statutory Window Expired: 22 Aug 2026 &bull; Obligation Ref: CMR 2017 Regulation 143 &bull; Mine S1 (Dabur Colliery)
                  </div>
                </div>
                <button className="btn btn-danger" onClick={() => navigateTo('12')}>
                  Open Overdue Monitor (Screen 12)
                </button>
              </div>
            </div>
          )}

          {/* 7. Offline Sync Pending */}
          {activeEnterpriseState === 'state-offline-sync' && (
            <div className="state-container">
              <div className="state-icon-box state-icon-warning">
                <WifiOff size={24} />
              </div>
              <h2 className="state-title">Offline Mode &bull; 4 Actions Queued for Synchronization</h2>
              <p className="state-description">
                Sub-surface Wi-Fi connection temporarily disconnected. All checklist inputs and observations are cached locally in encrypted SQLite storage.
              </p>
              <div className="state-meta-box">Field Node: Tablet-UG-04 &bull; Pending Packets: 4 &bull; Auto-Sync: Active</div>
              <button className="btn btn-secondary" onClick={() => showToast('Checking gateway connection...', 'info')}>
                <RefreshCw size={14} /> Retry Gateway Uplink
              </button>
            </div>
          )}

          {/* 8. Live Field Telemetry */}
          {activeEnterpriseState === 'state-live-field' && (
            <div className="state-container" style={{ borderColor: '#C8E6C9' }}>
              <div className="state-icon-box" style={{ background: '#E8F5E9', color: '#1B5E20' }}>
                <Radio size={24} />
              </div>
              <h2 className="state-title" style={{ color: '#1B5E20' }}>Live Field Execution Telemetry Uplink</h2>
              <p className="state-description">
                Real-time WebSocket connection to underground field inspection INS-2026-0870. 15 of 22 checks completed with 3 proposed findings.
              </p>
              <div className="state-meta-box">Inspector: R. Sharma &bull; Location: Mine A2 District 2 South Panel S3 &bull; Latency: 42ms</div>
              <button className="btn btn-success" onClick={() => navigateTo('15')}>
                Open Active Field Monitoring (Screen 15) &rarr;
              </button>
            </div>
          )}

          {/* 9. Object Not Found 404 */}
          {activeEnterpriseState === 'state-not-found' && (
            <div className="state-container">
              <div className="state-icon-box state-icon-neutral">
                <FileQuestion size={24} />
              </div>
              <h2 className="state-title">404 &bull; Governance Object Not Found</h2>
              <p className="state-description">
                The requested inspection ID, plan reference, or recommendation could not be located in the current organizational scope (CIL / ECL / Area 01 / Mine A2).
              </p>
              <div className="state-meta-box">Query: INVALID-RECORD-REF &bull; Scope Filter: Active</div>
              <button className="btn btn-primary" onClick={() => navigateTo('01')}>Return to Governance Dashboard</button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
