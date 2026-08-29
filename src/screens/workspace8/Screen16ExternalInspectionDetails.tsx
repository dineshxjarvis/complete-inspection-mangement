"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Lock,
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  Send,
  Award,
  Layers
} from 'lucide-react';

export const Screen16ExternalInspectionDetails: React.FC = () => {
  const { navigateTo, openRegulatoryDocModal, regulatoryNotices, showToast } = useOversight();
  const notice = regulatoryNotices[0];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('15')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Regulatory Notices</span>
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
              DGMS/INS/2026/0042
            </span>
            <span className="badge badge-warning font-bold">AWAITING REGULATORY CONFIRMATION</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            EXTERNAL STATUTORY INSPECTION DOSSIER & STRATA MIRROR
          </h1>
          <p className="screen-subtitle">
            Source: <strong>Directorate General of Mines Safety (DGMS)</strong> &bull; Colliery: <strong>Mine A2</strong> &bull; Date: <strong>15 Nov 2026</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => openRegulatoryDocModal(notice)}>
            <Lock size={13} />
            <span>View Sealed DGMS Form IV</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigateTo('33')} style={{ background: '#1E1B4B', borderColor: '#312E81' }}>
            <Award size={13} />
            <span>Regulatory Closure Hub (Screen 33) &rarr;</span>
          </button>
        </div>
      </div>

      {/* 5-Stage External Statutory Pipeline */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B', marginBottom: '14px' }}>
          EXTERNAL STATUTORY ENFORCEMENT LIFECYCLE
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px' }}>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>1. Registered</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>15 Nov 2026</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>2. Mine Notified</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>16 Nov 2026</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>3. Response Submitted</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>28 Nov 2026</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#2E7D32' }}>4. Action Taken (CAPA)</strong><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>30 Nov 2026</div></div>
          <span>&rarr;</span>
          <div style={{ textAlign: 'center' }}><strong style={{ color: '#D97706' }}>5. Regulatory Follow-up</strong><div style={{ fontSize: '10.5px', color: '#D97706', fontWeight: 700 }}>Awaiting DGMS Closure</div></div>
        </div>
      </div>

      {/* Side-by-Side Comparison: Authority Record vs STRATA Internal Tracking */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left: Protected Authority Record (Read-Only) */}
        <div className="card" style={{ padding: '20px', borderLeft: '4px solid #D97706', background: '#FFFDF5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Lock size={16} color="#B45309" />
            <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#B45309' }}>
              🔒 PROTECTED AUTHORITY RECORD (READ-ONLY)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <div>Issuing Body: <strong>Directorate General of Mines Safety (DGMS)</strong></div>
            <div>Statutory Notice Ref: <strong>DGMS/INS/2026/0042</strong></div>
            <div>Observed Deficit: <strong>Return Airway Airflow Velocity 4.8 m/s (&lt; 5.5 m/s)</strong></div>
            <div>Governing Statute: <strong>Coal Mines Regulations 2017 &bull; Reg 153(2)(b)</strong></div>
            <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px', border: '1px solid #FEF3C7', color: '#B45309', fontWeight: 600 }}>
              "STRATA does not edit or overwrite the regulatory inspector's original finding."
            </div>
          </div>
        </div>

        {/* Right: STRATA Internal Tracking & Corrective Lineage */}
        <div className="card" style={{ padding: '20px', borderLeft: '4px solid #1E1B4B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <ShieldCheck size={16} color="#1E1B4B" />
            <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
              STRATA INTERNAL COMPLIANCE MIRROR
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <div>Mine Response Status: <strong style={{ color: '#2E7D32' }}>✓ Submitted (Workspace 04)</strong></div>
            <div>Remediation Action: <strong>CAPA-2026-0048 (Overhaul Louvres & Fans)</strong></div>
            <div>Evidence Artifacts: <strong>4 Files Uploaded & Verified</strong></div>
            <div>Independent Verification: <strong style={{ color: '#2E7D32' }}>✓ Certified PASS (5.9 m/s)</strong></div>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
              Next Mandatory Step: DGMS Statutory Closure Certification (Screen 33).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
