"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  Lock,
  Layers,
  Users,
  Award
} from 'lucide-react';

export const Screen05InspectionOverview: React.FC = () => {
  const { navigateTo, showToast } = useOversight();

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('04')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Active Queue</span>
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
              INS-2026-0882
            </span>
            <span className="badge badge-success font-bold">STATUS: COMPLETED</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            FIELD INSPECTION EXECUTIVE DOSSIER & SUMMARY
          </h1>
          <p className="screen-subtitle">
            Mine: <strong>Mine A2 (Seam VII)</strong> &bull; Type: <strong>Ventilation</strong> &bull; Track: <strong>Internal Safety</strong> &bull; Lead: <strong>Er. R. Sharma</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('06')}>
            <AlertTriangle size={13} />
            <span>View Findings (Screen 06)</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigateTo('09')} style={{ background: '#1E1B4B', borderColor: '#312E81' }}>
            <Award size={13} />
            <span>View CAPAs (Screen 09) &rarr;</span>
          </button>
        </div>
      </div>

      {/* 8-Stage Timeline */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B', marginBottom: '14px' }}>
          END-TO-END INSPECTION LIFECYCLE TIMELINE
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', overflowX: 'auto' }}>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>1. Planned</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>01 Nov</div></div>
          <span style={{ color: '#CBD5E1' }}>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>2. Scheduled</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>05 Nov</div></div>
          <span style={{ color: '#CBD5E1' }}>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>3. Assigned</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>10 Nov</div></div>
          <span style={{ color: '#CBD5E1' }}>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>4. Started</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>15 Nov</div></div>
          <span style={{ color: '#CBD5E1' }}>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>5. Completed</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>24 Nov</div></div>
          <span style={{ color: '#CBD5E1' }}>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>6. Submitted</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>25 Nov</div></div>
          <span style={{ color: '#CBD5E1' }}>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>7. Reviewed</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>28 Nov</div></div>
          <span style={{ color: '#CBD5E1' }}>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#1E1B4B' }}>8. Finalized</strong><div style={{ fontSize: '10.5px', color: '#2E7D32', fontWeight: 700 }}>✓ Sealed</div></div>
        </div>
      </div>

      {/* Summary Metrics & Action Triggers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <div className="card stat-card" style={{ padding: '16px', borderLeft: '4px solid #1E1B4B' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Checklist Items</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#1E1B4B', marginTop: '2px' }}>22</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>17 Pass &bull; 4 Fail &bull; 1 N/A</div>
        </div>

        <div className="card stat-card" style={{ padding: '16px', borderLeft: '4px solid #0288D1' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Observations</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0288D1', marginTop: '2px' }}>7</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Recorded in field</div>
        </div>

        <div className="card stat-card" style={{ padding: '16px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>Confirmed Findings</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>4</div>
          <div style={{ fontSize: '11px', color: '#B71C1C', marginTop: '4px' }}>1 Critical &bull; 2 High &bull; 1 Med</div>
        </div>

        <div className="card stat-card" style={{ padding: '16px', borderLeft: '4px solid #F57C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '11px', color: '#E65100', textTransform: 'uppercase', fontWeight: 700 }}>Generated CAPAs</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#E65100', marginTop: '2px' }}>3</div>
          <div style={{ fontSize: '11px', color: '#E65100', marginTop: '4px' }}>Under remediation in WS06</div>
        </div>
      </div>
    </div>
  );
};
