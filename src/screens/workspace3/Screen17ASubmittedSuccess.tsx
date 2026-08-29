"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  CheckCircle,
  ShieldCheck,
  FileText,
  ArrowRight,
  Inbox,
  GitBranch,
  ExternalLink,
  Award
} from 'lucide-react';

export const Screen17ASubmittedSuccess: React.FC = () => {
  const { activeInspection, navigateTo } = useFieldInspection();

  return (
    <div className="screen-content" style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', paddingTop: '20px' }}>
      
      {/* Success Badge & Animation */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2E7D32, #1B5E20)',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 0 24px rgba(46, 125, 50, 0.4)'
        }}
      >
        <CheckCircle size={40} />
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
        INSPECTION SUCCESSFULLY SUBMITTED
      </h1>
      <div style={{ display: 'inline-block', background: 'rgba(46, 125, 50, 0.12)', color: '#1B5E20', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginBottom: '24px' }}>
        ● SUBMITTED &mdash; AWAITING REVIEW & APPROVAL
      </div>

      {/* Submission Certificate Card */}
      <div className="card" style={{ padding: '24px', textAlign: 'left', borderTop: '4px solid #2E7D32', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inspection Identifier</span>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
              {activeInspection.id}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Submission Timestamp</span>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>15 Nov 2026 16:42 IST</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '16px' }}>
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px 14px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Lead Inspector:</div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>R. Sharma (DGMS Lead)</div>
          </div>

          <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px 14px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target Colliery:</div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>{activeInspection.mine} (Seam VII)</div>
          </div>

          <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px 14px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DGMS Spine Hash:</div>
            <div style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'monospace', color: '#5932A5' }}>
              SHA-256: 9b2d8f...
            </div>
          </div>
        </div>

        {/* Handoff Status Steps */}
        <div style={{ background: 'var(--bg-surface-alt)', padding: '14px 16px', borderRadius: '6px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Operational Lifecycle Handoff:
          </div>
          <div>✓ Field execution record created and locked against modification.</div>
          <div>✓ 28 optical evidence files and 10 instrument readings synchronized to Central Repository.</div>
          <div>✓ 3 Proposed Findings dispatched to <strong>Workspace 03 Review & Approval</strong> queue for DGMS Authorized Reviewer sign-off.</div>
          <div>✓ Immutable Audit Trail committed.</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          className="btn btn-secondary"
          onClick={() => navigateTo('19')}
        >
          <GitBranch size={14} />
          <span>View Version History</span>
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigateTo('03')}
        >
          <FileText size={14} />
          <span>View Read-Only Brief</span>
        </button>

        <button
          className="btn btn-primary"
          onClick={() => navigateTo('02')}
          style={{ background: '#FF6B00', borderColor: '#FF6B00', padding: '10px 24px', fontWeight: 700 }}
        >
          <Inbox size={14} />
          <span>Return to My Inspections</span>
        </button>
      </div>

    </div>
  );
};
