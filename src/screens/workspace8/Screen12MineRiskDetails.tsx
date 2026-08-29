"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  AlertOctagon,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building,
  Award
} from 'lucide-react';

export const Screen12MineRiskDetails: React.FC = () => {
  const {
    mineRiskProfile,
    navigateTo,
    showToast
  } = useOversight();

  const p = mineRiskProfile;

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('11')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Risk Matrix</span>
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
              MINE RISK DOSSIER
            </span>
            <span className="badge badge-warning font-bold">OVERALL RISK: HIGH (SCORE: 78/100)</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            MINE RISK PROFILE & DRIVER DECOMPOSITION &bull; {p.mine}
          </h1>
          <p className="screen-subtitle">
            Subsidiary: <strong>{p.subsidiary}</strong> &bull; Area: <strong>{p.area}</strong> &bull; Posture: <strong>{p.operationalStatus}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('04')}>
            <span>View Inspections</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('06')}>
            <span>View Findings</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('09')}>
            <span>View CAPA</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigateTo('14')} style={{ background: '#1E1B4B', borderColor: '#312E81' }}>
            <span>Mine Governance Profile (Screen 14) &rarr;</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Risk Drivers Meters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', borderLeft: '4px solid #EF6C00' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
              PRIMARY STATUTORY RISK DRIVERS
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700 }}>Critical Severity Findings</span>
                  <strong style={{ color: '#C62828' }}>18 Findings (High Density)</strong>
                </div>
                <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '85%', background: '#C62828' }} /></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700 }}>Overdue Statutory Surveys</span>
                  <strong style={{ color: '#D32F2F' }}>4 Overdue</strong>
                </div>
                <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '45%', background: '#D32F2F' }} /></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700 }}>Repeat Failure Patterns</span>
                  <strong style={{ color: '#EF6C00' }}>6 Recurrences</strong>
                </div>
                <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '65%', background: '#EF6C00' }} /></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700 }}>Open Remediation CAPAs</span>
                  <strong style={{ color: '#0288D1' }}>5 Active</strong>
                </div>
                <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '50%', background: '#0288D1' }} /></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700 }}>Verification Audit Failures</span>
                  <strong style={{ color: '#7B1FA2' }}>3 Reopened</strong>
                </div>
                <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '35%', background: '#7B1FA2' }} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 6-Month Trend & Top Hazard Areas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Trend Card */}
          <div className="card" style={{ padding: '20px', background: '#FFF3E0', border: '1.5px solid #FFE082' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={24} color="#E65100" />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#E65100', textTransform: 'uppercase' }}>
                  6-MONTH RISK TRAJECTORY
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#BF360C', marginTop: '2px' }}>
                  Risk Increasing &uarr; (Velocity deficit in Seam VII)
                </div>
              </div>
            </div>
          </div>

          {/* Top Issues List */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
              TOP 3 STATUTORY HAZARD ISSUES
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
              {p.topIssues.map(issue => (
                <div key={issue} style={{ padding: '10px 12px', background: 'var(--bg-surface-alt)', borderRadius: '4px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {issue}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
