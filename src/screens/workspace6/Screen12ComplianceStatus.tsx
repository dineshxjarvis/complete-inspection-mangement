"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  ShieldCheck,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  Shield,
  Layers,
  Activity,
  CheckCircle2,
  Lock,
  GitBranch
} from 'lucide-react';

export const Screen12ComplianceStatus: React.FC = () => {
  const {
    activeCapa,
    navigateTo,
    showToast
  } = useCorrectiveAction();

  const capa = activeCapa;

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
              <span>Back to CAPA Details</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(0, 105, 92, 0.15)',
                color: '#004D40'
              }}
            >
              COMPLIANCE STATUS & GAP ANALYSIS
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY COMPLIANCE POSTURE &bull; {capa.id}
          </h1>
          <p className="screen-subtitle">
            Mine: <strong>{capa.mine}</strong> &bull; Colliery: {capa.colliery} &bull; Requirement: {capa.regulatoryRequirement}
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('13')}
          style={{ background: '#00695C', borderColor: '#004D40' }}
        >
          <span>Submit for Verification (Screen 13)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 4 Multi-Tier Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #1A237E', background: '#E8EAF6' }}>
          <div style={{ fontSize: '10.5px', color: '#1A237E', fontWeight: 800, textTransform: 'uppercase' }}>1. FINDING STATUS</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A237E', marginTop: '2px' }}>
            ✓ CONFIRMED
          </div>
        </div>

        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #00695C', background: '#E0F2F1' }}>
          <div style={{ fontSize: '10.5px', color: '#004D40', fontWeight: 800, textTransform: 'uppercase' }}>2. REGULATORY ACTION</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#004D40', marginTop: '2px' }}>
            ✓ DIRECTION ISSUED
          </div>
        </div>

        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #F57C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '10.5px', color: '#E65100', fontWeight: 800, textTransform: 'uppercase' }}>3. CAPA STATUS</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#E65100', marginTop: '2px' }}>
            ⚡ IN PROGRESS (60%)
          </div>
        </div>

        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '10.5px', color: '#B71C1C', fontWeight: 800, textTransform: 'uppercase' }}>4. VERIFICATION</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>
            ⏳ PENDING (WS07)
          </div>
        </div>
      </div>

      {/* Visual Lineage Chain & Gap Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Visual Chain */}
        <div className="card" style={{ padding: '20px', borderLeft: '4px solid #00695C' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#004D40', marginBottom: '14px' }}>
            STATUTORY VERIFICATION CHAIN
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: '6px' }}>
              <span className="badge badge-info font-mono" style={{ width: '110px' }}>REQUIREMENT</span>
              <span>{capa.regulatoryRequirement}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: '6px' }}>
              <span className="badge badge-info font-mono" style={{ width: '110px' }}>FINDING</span>
              <span>{capa.findingId}: Airflow below threshold (4.8 m/s)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: '6px' }}>
              <span className="badge badge-info font-mono" style={{ width: '110px' }}>DIRECTION</span>
              <span>Formal corrective notice issued to Mine Manager</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: '6px' }}>
              <span className="badge badge-info font-mono" style={{ width: '110px' }}>CAPA PLAN</span>
              <span>{capa.id}: Louvre descaling & fan pitch recalibration</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: '6px' }}>
              <span className="badge badge-warning font-mono" style={{ width: '110px' }}>EVIDENCE</span>
              <span>2 of 3 Uploaded (Post-repair measurement missing)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#FFEBEE', borderRadius: '6px', border: '1px solid #FFCDD2' }}>
              <span className="badge badge-danger font-mono" style={{ width: '110px' }}>VERIFICATION</span>
              <span style={{ color: '#B71C1C', fontWeight: 700 }}>Pending On-Site Inspection (Workspace 07)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Current Gap & Overall Conclusion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #D32F2F' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#B71C1C' }}>
              CURRENT COMPLIANCE GAP
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Prescribed Velocity:</span>
                <strong style={{ color: '#2E7D32' }}>&ge; 5.5 m/s</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Latest Field Measure:</span>
                <strong style={{ color: '#D32F2F' }}>Pending Final Traverse</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Overall Posture:</span>
                <span className="badge badge-danger font-bold">NOT YET VERIFIED</span>
              </div>
            </div>

            {/* Core Principle Alert */}
            <div
              style={{
                background: '#FFF8E1',
                border: '1px solid #FFE082',
                borderRadius: '6px',
                padding: '12px',
                fontSize: '12px',
                color: '#B78103',
                lineHeight: 1.4
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, marginBottom: '4px' }}>
                <Lock size={13} />
                <span>ENTERPRISE GOVERNANCE RULE:</span>
              </div>
              "Do not display 'Compliant' merely because the action owner marked tasks completed. Final statutory compliance certification requires independent verification in Workspace 07."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
