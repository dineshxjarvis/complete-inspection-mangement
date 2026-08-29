"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  GitBranch,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';

export const Screen07FindingDetails: React.FC = () => {
  const { navigateTo } = useOversight();

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
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(30, 27, 75, 0.15)',
                color: '#1E1B4B'
              }}
            >
              FND-2026-00127
            </span>
            <span className="badge badge-warning font-bold">SEVERITY: HIGH</span>
            <span className="badge badge-info font-bold">CONFIRMED</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY FINDING GOVERNANCE DOSSIER &bull; MINE A2
          </h1>
          <p className="screen-subtitle">
            Mine: <strong>Mine A2</strong> &bull; Inspection: <strong>INS-2026-0882</strong> &bull; Regulatory Basis: <strong>CMR 2017 Regulation 153(2)(b)</strong>
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('27')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <GitBranch size={13} />
          <span>View Full Lineage Traceability (Screen 27) &rarr;</span>
        </button>
      </div>

      {/* 10-Tier Traceability Spine Horizontal Banner */}
      <div className="card" style={{ padding: '18px', marginBottom: '20px', overflowX: 'auto' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B', marginBottom: '12px' }}>
          STATUTORY LINEAGE CHAIN (REGULATION &rarr; FINDING &rarr; CLOSURE)
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '1100px', fontSize: '11px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
          <div style={{ textAlign: 'center' }}><strong>REGULATION</strong><div style={{ color: 'var(--text-muted)' }}>CMR 2017</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong>CLAUSE</strong><div style={{ color: 'var(--text-muted)' }}>Reg 153</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong>REQUIREMENT</strong><div style={{ color: 'var(--text-muted)' }}>Velocity &ge; 5.5m/s</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong>OBLIGATION</strong><div style={{ color: 'var(--text-muted)' }}>Quarterly Survey</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong>INSPECTION</strong><div style={{ color: 'var(--text-muted)' }}>INS-0882</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong>CHECKLIST</strong><div style={{ color: 'var(--text-muted)' }}>CHK-VENT-09</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong>OBSERVATION</strong><div style={{ color: '#D32F2F', fontWeight: 700 }}>4.8 m/s</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#D32F2F' }}>FINDING</strong><div style={{ color: '#D32F2F', fontWeight: 700 }}>FND-00127</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#0288D1' }}>CAPA</strong><div style={{ color: '#0288D1' }}>CAPA-0048</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>VERIFICATION</strong><div style={{ color: '#2E7D32' }}>VER-0031</div></div>
        </div>
      </div>

      {/* Current State & Summary Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left: Finding Synopsis */}
        <div className="card" style={{ padding: '20px', borderLeft: '4px solid #D32F2F' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#B71C1C' }}>
            Confirmed Statutory Non-Compliance
          </h3>

          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Ventilation Airflow Velocity below Statutory Threshold in Shaft 3 Return
          </div>

          <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Observed velocity 4.8 m/s with calibrated digital anemometer at 140m chainage split during quarterly statutory survey. Mandatory standard under CMR 2017 Regulation 153(2)(b) requires airway velocity &ge; 5.5 m/s to prevent methane layering in working return.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', fontSize: '12px' }}>
            <div>Location: <strong>Shaft 3 (Ch: 140m)</strong></div>
            <div>Inspector: <strong>Er. R. Sharma</strong></div>
          </div>
        </div>

        {/* Right: Current State Grid */}
        <div className="card" style={{ padding: '20px', borderTop: '4px solid #1E1B4B' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
            Current Governance Posture
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
              <span>Finding Status:</span>
              <strong style={{ color: '#0288D1' }}>✓ CONFIRMED</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
              <span>CAPA Execution:</span>
              <strong style={{ color: '#E65100' }}>IN PROGRESS (CAPA-0048)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
              <span>Independent Verification:</span>
              <strong style={{ color: '#7B1FA2' }}>PENDING (VER-2026-0031)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#FFEBEE', borderRadius: '4px' }}>
              <span>Compliance Certification:</span>
              <strong style={{ color: '#B71C1C' }}>NOT YET VERIFIED</strong>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigateTo('27')}
            style={{ width: '100%', background: '#1E1B4B', borderColor: '#312E81', justifyContent: 'center' }}
          >
            <span>[VIEW FULL TRACEABILITY & AUDIT] &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
