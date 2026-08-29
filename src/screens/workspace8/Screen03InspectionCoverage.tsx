"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  ShieldCheck,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  Search,
  Building,
  CheckCircle2
} from 'lucide-react';

export const Screen03InspectionCoverage: React.FC = () => {
  const {
    coverageList,
    navigateTo,
    showToast
  } = useOversight();

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
              PROGRAMME COVERAGE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY INSPECTION COVERAGE & GAP ANALYSIS
          </h1>
          <p className="screen-subtitle">
            Validate whether mandatory regulatory inspections under Coal Mines Regulations, 2017 are executed at the required frequency
          </p>
        </div>
      </div>

      {/* Regulatory Coverage Highlight Card */}
      <div className="card" style={{ padding: '20px', background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', border: '1.5px solid #C7D2FE', marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#312E81', textTransform: 'uppercase', marginBottom: '10px' }}>
          REGULATORY / PROGRAMME BASIS (VENTILATION REGULATION 153)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', textAlign: 'center' }}>
          <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px' }}>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>STATUTORY FREQUENCY</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#1E1B4B', marginTop: '2px' }}>Quarterly</div>
          </div>
          <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px' }}>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>EXPECTED AUDITS</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#1E1B4B', marginTop: '2px' }}>12</div>
          </div>
          <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px' }}>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>COMPLETED AUDITS</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#2E7D32', marginTop: '2px' }}>10</div>
          </div>
          <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px' }}>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>COVERAGE RATE</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#1E1B4B', marginTop: '2px' }}>83%</div>
          </div>
          <div style={{ background: '#FFEBEE', padding: '10px', borderRadius: '4px', border: '1px solid #FFCDD2' }}>
            <div style={{ fontSize: '10.5px', color: '#B71C1C', fontWeight: 800 }}>⚠ GAP DEFICIT</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>2 Overdue</div>
          </div>
        </div>
      </div>

      {/* Coverage Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Regulatory Requirement</th>
              <th>Technical Domain</th>
              <th>Colliery</th>
              <th style={{ width: '100px' }}>Frequency</th>
              <th style={{ width: '90px' }}>Expected</th>
              <th style={{ width: '90px' }}>Completed</th>
              <th style={{ width: '90px' }}>Overdue</th>
              <th style={{ width: '160px' }}>Coverage</th>
              <th style={{ width: '100px' }}>Risk Posture</th>
            </tr>
          </thead>
          <tbody>
            {coverageList.map(item => (
              <tr
                key={item.id}
                onClick={() => {
                  showToast(`Drilling down into statutory history for ${item.requirement}`, 'info');
                  navigateTo('04');
                }}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.requirement}</div>
                  <div style={{ fontSize: '11px', color: '#D32F2F', marginTop: '2px' }}>{item.gapDescription}</div>
                </td>
                <td><span className="badge badge-subtle">{item.inspectionType}</span></td>
                <td><strong>{item.mine}</strong></td>
                <td>{item.frequency}</td>
                <td>{item.expected}</td>
                <td style={{ color: '#2E7D32', fontWeight: 700 }}>{item.completed}</td>
                <td style={{ color: item.overdue > 0 ? '#D32F2F' : 'var(--text-primary)', fontWeight: 700 }}>{item.overdue}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="progress-bar-container" style={{ width: '80px' }}>
                      <div className="progress-bar-fill" style={{ width: `${item.coverage}%`, background: item.coverage < 80 ? '#D32F2F' : '#2E7D32' }} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '12px' }}>{item.coverage}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${item.risk === 'CRITICAL' ? 'badge-danger font-bold' : item.risk === 'HIGH' ? 'badge-warning font-bold' : 'badge-success'}`}>
                    {item.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
