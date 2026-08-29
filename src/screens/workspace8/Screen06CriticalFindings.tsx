"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  AlertTriangle,
  Search,
  Filter,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  Clock,
  Award
} from 'lucide-react';

export const Screen06CriticalFindings: React.FC = () => {
  const {
    criticalFindings,
    navigateTo,
    kpis,
    showToast
  } = useOversight();

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = criticalFindings.filter(f => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      f.id.toLowerCase().includes(q) ||
      f.title.toLowerCase().includes(q) ||
      f.mine.toLowerCase().includes(q) ||
      f.type.toLowerCase().includes(q)
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
              className="badge badge-danger font-bold"
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.04em'
              }}
            >
              HIGH-PRIORITY STATUTORY DEFICITS
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CRITICAL & HIGH-SEVERITY FINDINGS REGISTER
          </h1>
          <p className="screen-subtitle">
            Prioritized safety hazards requiring executive intervention, rapid corrective action tracking, and DGMS reporting
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('08')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Repeat Findings Analytics (Screen 08)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Severity Breakdown Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #C62828', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 800 }}>Critical Severity</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#C62828', fontFamily: 'monospace', marginTop: '2px' }}>18</div>
          <div style={{ fontSize: '11px', color: '#B71C1C', marginTop: '2px' }}>Imminent hazard category</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #EF6C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '11px', color: '#E65100', textTransform: 'uppercase', fontWeight: 800 }}>High Severity</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#EF6C00', fontFamily: 'monospace', marginTop: '2px' }}>42</div>
          <div style={{ fontSize: '11px', color: '#E65100', marginTop: '2px' }}>Statutory non-compliance</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #0288D1', background: '#E0F2FE' }}>
          <div style={{ fontSize: '11px', color: '#0369A1', textTransform: 'uppercase', fontWeight: 800 }}>Medium Severity</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0288D1', fontFamily: 'monospace', marginTop: '2px' }}>109</div>
          <div style={{ fontSize: '11px', color: '#0369A1', marginTop: '2px' }}>Operational tolerance drift</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #475569', background: '#F1F5F9' }}>
          <div style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', fontWeight: 800 }}>Low Severity</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#334155', fontFamily: 'monospace', marginTop: '2px' }}>218</div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>Housekeeping / minor</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: '12px 16px', marginBottom: '16px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search Finding ID, Title, Colliery, Regulatory Basis..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>
      </div>

      {/* Critical Findings Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th style={{ width: '100px' }}>Colliery</th>
              <th style={{ width: '120px' }}>Inspection</th>
              <th>Finding Title & Statutory Standard</th>
              <th style={{ width: '110px' }}>Severity</th>
              <th style={{ width: '90px' }}>Age (Days)</th>
              <th style={{ width: '120px' }}>Linked CAPA</th>
              <th style={{ width: '120px' }}>Status</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => {
              const isCrit = f.severity === 'CRITICAL';

              return (
                <tr
                  key={f.id}
                  onClick={() => navigateTo('07')}
                  style={{ cursor: 'pointer', background: isCrit ? 'rgba(254, 242, 242, 0.5)' : undefined }}
                >
                  <td>
                    <span className="id-badge font-mono" style={{ background: isCrit ? '#FFEBEE' : 'rgba(30, 27, 75, 0.12)', color: isCrit ? '#C62828' : '#1E1B4B', fontWeight: 700 }}>
                      {f.id}
                    </span>
                  </td>
                  <td><strong>{f.mine}</strong></td>
                  <td><span className="badge badge-subtle font-mono">{f.inspectionId}</span></td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>{f.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{f.requiredStandard}</div>
                  </td>
                  <td>
                    <span className={`badge ${isCrit ? 'badge-danger font-bold' : 'badge-warning font-bold'}`}>
                      {f.severity}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: f.ageDays > 14 ? '#D32F2F' : 'var(--text-primary)' }}>
                      {f.ageDays} Days
                    </span>
                  </td>
                  <td><span className="badge badge-info font-mono">{f.capaId}</span></td>
                  <td>
                    <span className={`status-pill ${f.status === 'CONFIRMED' ? 'status-active' : 'status-pending'}`}>
                      {f.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={e => {
                        e.stopPropagation();
                        navigateTo('07');
                      }}
                      style={{ padding: '2px 6px', fontSize: '11px' }}
                    >
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
