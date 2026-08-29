"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Layers,
  BarChart3,
  TrendingUp,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export const Screen18InspectionTrackAnalytics: React.FC = () => {
  const { trackAnalytics, navigateTo } = useOversight();

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
              TRACK BENCHMARKING
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            INSPECTION TRACK COMPARATIVE ANALYTICS
          </h1>
          <p className="screen-subtitle">
            Evaluate efficacy across statutory tracks &bull; DGMS, ISO 45001, Area Oversight, Workmen Inspectors, Internal Safety & Environmental Audits
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('19')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Domain Type Analytics (Screen 19)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Comparative Track Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Inspection Track</th>
              <th style={{ width: '130px' }}>Total Inspections</th>
              <th style={{ width: '130px' }}>Findings Generated</th>
              <th style={{ width: '130px' }}>Critical Severity</th>
              <th style={{ width: '130px' }}>CAPA Actions</th>
              <th style={{ width: '160px' }}>Closure Rate</th>
              <th style={{ width: '130px' }}>Repeat Rate</th>
            </tr>
          </thead>
          <tbody>
            {trackAnalytics.map(t => (
              <tr key={t.track}>
                <td><strong style={{ color: '#1E1B4B', fontSize: '13px' }}>{t.track}</strong></td>
                <td>{t.inspections} Audits</td>
                <td><strong style={{ color: '#0288D1' }}>{t.findings}</strong></td>
                <td><span className="badge badge-danger font-bold">{t.critical}</span></td>
                <td><span className="badge badge-info">{t.capas}</span></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="progress-bar-container" style={{ width: '90px' }}>
                      <div className="progress-bar-fill" style={{ width: `${t.closureRate}%`, background: '#2E7D32' }} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '12px' }}>{t.closureRate}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${t.repeatRate > 10 ? 'badge-warning font-bold' : 'badge-success'}`}>
                    {t.repeatRate}%
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
