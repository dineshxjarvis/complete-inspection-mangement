"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Activity,
  Search,
  Filter,
  Lock,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  Users
} from 'lucide-react';

export const Screen04ActiveInspections: React.FC = () => {
  const {
    activeInspections,
    navigateTo,
    showToast
  } = useOversight();

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = activeInspections.filter(item => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.id.toLowerCase().includes(q) ||
      item.mine.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.leadInspector.toLowerCase().includes(q)
    );
  });

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('01')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Dashboard</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(30, 27, 75, 0.15)',
                color: '#1E1B4B'
              }}
            >
              LIVE OPERATIONAL SURVEILLANCE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            ACTIVE FIELD INSPECTIONS IN PROGRESS
          </h1>
          <p className="screen-subtitle">
            Live operational oversight &bull; View active multi-disciplinary audit teams across underground and opencast collieries
          </p>
        </div>

        {/* Read-Only Governance Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF8E1', border: '1px solid #FFE082', padding: '6px 12px', borderRadius: '6px', fontSize: '11.5px', color: '#B45309' }}>
          <Lock size={13} />
          <span>Oversight Access: <strong>Read-Only Surveillance Mode</strong></span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: '12px 16px', marginBottom: '16px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search Inspection ID, Colliery, Lead Inspector, Technical Track..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>
      </div>

      {/* Active Inspections Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Inspection ID</th>
              <th style={{ width: '100px' }}>Colliery</th>
              <th>Technical Domain & Track</th>
              <th style={{ width: '180px' }}>Lead Inspector & Team</th>
              <th style={{ width: '160px' }}>Field Progress</th>
              <th style={{ width: '90px' }}>Findings</th>
              <th style={{ width: '130px' }}>Field Status</th>
              <th style={{ width: '100px' }}>Risk Level</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr
                key={item.id}
                onClick={() => navigateTo('05')}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(30, 27, 75, 0.12)', color: '#1E1B4B', fontWeight: 700 }}>
                    {item.id}
                  </span>
                </td>
                <td><strong style={{ color: '#1E1B4B' }}>{item.mine}</strong></td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.type}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Track: {item.track}</div>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{item.leadInspector}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{item.team.length} Field Auditors</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="progress-bar-container" style={{ width: '90px' }}>
                      <div className="progress-bar-fill" style={{ width: `${item.progress}%`, background: item.progress === 100 ? '#2E7D32' : '#0288D1' }} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '12px' }}>{item.progress}%</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-warning font-bold" style={{ fontSize: '11px' }}>
                    {item.findingsCount} Finds
                  </span>
                </td>
                <td>
                  <span className={`status-pill ${item.status === 'IN PROGRESS' ? 'status-active' : 'status-pending'}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <span className={`badge ${item.risk === 'CRITICAL' ? 'badge-danger font-bold' : item.risk === 'HIGH' ? 'badge-warning font-bold' : 'badge-success'}`}>
                    {item.risk}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      navigateTo('05');
                    }}
                    style={{ padding: '3px 8px', fontSize: '11px' }}
                  >
                    <span>Overview</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
