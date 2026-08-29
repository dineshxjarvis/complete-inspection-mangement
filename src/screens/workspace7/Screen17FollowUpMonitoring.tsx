"use client";

import React from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Activity,
  MapPin,
  Clock
} from 'lucide-react';

export const Screen17FollowUpMonitoring: React.FC = () => {
  const {
    activeVerification,
    setIsScheduleFollowUpModalOpen,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;
  const plan = ver.followUpPlan;

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
                background: 'rgba(0, 96, 100, 0.15)',
                color: '#006064'
              }}
            >
              POST-CLOSURE MONITORING
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            POST-VERIFICATION FOLLOW-UP & SURVEILLANCE &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Long-term statutory surveillance schedule to guarantee permanent non-recurrence of ventilation velocity deficits
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsScheduleFollowUpModalOpen(true)}
          style={{ background: '#006064', borderColor: '#004D40' }}
        >
          <Calendar size={13} />
          <span>Adjust Monitoring Schedule</span>
        </button>
      </div>

      {/* Surveillance Summary Card */}
      <div className="card" style={{ padding: '24px', borderTop: '4px solid #006064', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span className="badge badge-success font-bold">✓ VERIFICATION PASSED</span>
            <h2 style={{ margin: '6px 0 0', fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Follow-Up Surveillance Schedule: {plan?.scheduledDate || '15 Jan 2027'}
            </h2>
          </div>
          <span className="badge badge-warning font-bold" style={{ fontSize: '11.5px' }}>
            STATUS: SCHEDULED
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '16px' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Underground Split:</span>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{plan?.location || 'Mine A2 — Shaft 3'}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Assigned Auditor:</span>
            <div style={{ fontWeight: 700, color: '#006064', marginTop: '2px' }}>{plan?.verifier || 'Er. R. Sharma'}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Surveillance Protocol:</span>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>9-Grid Digital Anemometer Traverse</div>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          <strong>Statutory Purpose:</strong> Validate that the mechanical shutter louvres maintain continuous velocity &ge; 5.5 m/s without dust accumulation or booster blade drift over a 45-day operational cycle.
        </div>
      </div>

      {/* Surveillance Workflow Timeline */}
      <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
        <div style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', color: '#006064', marginBottom: '14px' }}>
          POST-CLOSURE SURVEILLANCE PIPELINE
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, color: '#2E7D32' }}>1. Verification Passed</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>30 Nov 2026</div>
          </div>
          <span style={{ color: '#80DEEA', fontWeight: 800 }}>&rarr;</span>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, color: '#006064' }}>2. Follow-Up Scheduled</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>15 Jan 2027</div>
          </div>
          <span style={{ color: '#80DEEA', fontWeight: 800 }}>&rarr;</span>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-muted)' }}>3. Field Re-Survey</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pending Field Execution</div>
          </div>
          <span style={{ color: '#80DEEA', fontWeight: 800 }}>&rarr;</span>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-muted)' }}>4. Zero Recurrence Sign-off</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Final Certification</div>
          </div>
        </div>
      </div>
    </div>
  );
};
