"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Sliders,
  BarChart3,
  TrendingUp,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  Award
} from 'lucide-react';

export const Screen19InspectionTypeAnalytics: React.FC = () => {
  const { typeAnalytics, navigateTo } = useOversight();

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('18')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Track Analytics</span>
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
              DOMAIN DISCIPLINE ANALYTICS
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            TECHNICAL DOMAIN TYPE COMPARATIVE BENCHMARKS
          </h1>
          <p className="screen-subtitle">
            Systemic technical failure analysis &bull; Compare finding yield rates, critical severity densities, and remediation duration by discipline
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('20')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Report Centre (Screen 20)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Domain Type Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Technical Domain</th>
              <th style={{ width: '120px' }}>Inspections</th>
              <th style={{ width: '120px' }}>Findings</th>
              <th style={{ width: '150px' }}>Finding Yield Rate</th>
              <th style={{ width: '150px' }}>Critical Rate</th>
              <th style={{ width: '150px' }}>Avg Closure (Days)</th>
              <th style={{ width: '150px' }}>Repeat Deficit Rate</th>
            </tr>
          </thead>
          <tbody>
            {typeAnalytics.map(t => (
              <tr key={t.type}>
                <td><strong style={{ color: '#1E1B4B', fontSize: '13px' }}>{t.type}</strong></td>
                <td>{t.inspections} Audits</td>
                <td><strong style={{ color: '#0288D1' }}>{t.findings}</strong></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="progress-bar-container" style={{ width: '70px' }}>
                      <div className="progress-bar-fill" style={{ width: `${t.findingRate}%`, background: '#0288D1' }} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '12px' }}>{t.findingRate}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${t.criticalRate > 20 ? 'badge-danger font-bold' : t.criticalRate > 10 ? 'badge-warning font-bold' : 'badge-success'}`}>
                    {t.criticalRate}%
                  </span>
                </td>
                <td><span style={{ fontWeight: 700 }}>{t.avgClosureTimeDays} Days</span></td>
                <td>
                  <span className={`badge ${t.repeatFindingRate > 15 ? 'badge-warning font-bold' : 'badge-subtle'}`}>
                    {t.repeatFindingRate}%
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
