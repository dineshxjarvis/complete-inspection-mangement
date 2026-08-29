"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  RotateCcw,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Lock,
  ShieldAlert,
  Send
} from 'lucide-react';

export const Screen08RepeatFindings: React.FC = () => {
  const {
    repeatFindings,
    navigateTo,
    showToast
  } = useOversight();

  const handleEscalatePattern = (patId: string) => {
    showToast(`Recurring pattern ${patId} escalated to Subsidiary Technical Directorate`, 'warning');
    navigateTo('23');
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('06')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Critical Findings</span>
            </button>
            <span
              className="badge badge-warning font-bold"
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.04em'
              }}
            >
              SAFETY PATTERN CLUSTERING
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            REPEAT & RECURRING STATUTORY FINDINGS ANALYTICS
          </h1>
          <p className="screen-subtitle">
            Safety intelligence pattern clustering &bull; Identify systemic failure modes across mines, areas, and regulatory requirements
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('09')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>CAPA Performance (Screen 09)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Main Grid: Patterns Table & Insight Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left: Repeat Findings Pattern Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
              DETECTED RECURRING PATTERN CLUSTERS
            </h3>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Pattern Description</th>
                <th style={{ width: '90px' }}>Colliery</th>
                <th style={{ width: '90px' }}>Counts</th>
                <th style={{ width: '100px' }}>Span</th>
                <th style={{ width: '100px' }}>CAPAs</th>
                <th style={{ width: '110px' }}>Pattern State</th>
              </tr>
            </thead>
            <tbody>
              {repeatFindings.map(pat => (
                <tr key={pat.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>{pat.patternName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{pat.recommendation}</div>
                  </td>
                  <td><strong>{pat.mine}</strong></td>
                  <td><span className="badge badge-danger font-bold">{pat.occurrences} Times</span></td>
                  <td><span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{pat.firstSeenYear}–{pat.lastSeenYear}</span></td>
                  <td><span className="badge badge-info">{pat.capaCount} CAPAs</span></td>
                  <td><span className="badge badge-warning font-bold">{pat.currentStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Insight & Advisory Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #D97706', background: '#FFFDF5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <AlertTriangle size={18} color="#D97706" />
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#B45309' }}>
                ⚠ RECURRING ISSUE INSIGHT (MINE A2)
              </h3>
            </div>

            <div style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: '14px' }}>
              <strong>4 Similar Ventilation Findings</strong> detected across 18 months in Shaft 3 Return Airway.
            </div>

            <div style={{ background: '#FFF', padding: '12px', borderRadius: '4px', border: '1px solid #FEF3C7', fontSize: '11.5px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>Previous Remediation: <strong>CAPA-2025-0092</strong></div>
              <div>Current Active Remediation: <strong>CAPA-2026-0048</strong></div>
              <div style={{ color: '#B45309', fontWeight: 700, marginTop: '2px' }}>
                Recommendation: Review preventive louvre descaling schedules and install continuous ultrasonic telemetry sensors.
              </div>
            </div>

            {/* Human Decision Guard */}
            <div style={{ background: 'var(--bg-surface-alt)', padding: '8px 10px', borderRadius: '4px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} />
              <strong>HUMAN GOVERNANCE RULE:</strong> Recommendation &ne; Automatic Decision. Authorized senior authorities mandate physical interventions.
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleEscalatePattern('PAT-01')}
              style={{ width: '100%', background: '#D97706', borderColor: '#B45309', color: '#FFF', justifyContent: 'center' }}
            >
              <Send size={14} />
              <span>Escalate Systemic Risk to Directorate &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
