"use client";

import React from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  MapPin,
  Calendar,
  User,
  Activity,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

export const Screen08SiteFollowUp: React.FC = () => {
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
              onClick={() => navigateTo('04')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Verification Details</span>
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
              PHYSICAL ON-SITE AUDIT
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            FIELD FOLLOW-UP VERIFICATION PLAN &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Schedule on-site underground physical inspections where photographic or document evidence alone is insufficient for statutory sign-off
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsScheduleFollowUpModalOpen(true)}
          style={{ background: '#006064', borderColor: '#004D40' }}
        >
          <Calendar size={13} />
          <span>Schedule New Field Follow-Up</span>
        </button>
      </div>

      {/* Rationale Box */}
      <div className="card" style={{ padding: '20px', borderLeft: '4px solid #006064', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#006064' }}>
          Statutory Justification for Field Follow-Up Inspection
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#006064', fontWeight: 600 }}>
            <CheckCircle2 size={15} />
            <span>Physical correction requires in-situ cross-sectional traverse inspection by DGMS auditor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#006064', fontWeight: 600 }}>
            <CheckCircle2 size={15} />
            <span>Multi-point airflow velocity and methane concentration validation under dynamic ventilation load</span>
          </div>
        </div>
      </div>

      {/* Active Follow-Up Plan Details */}
      {plan && (
        <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              SCHEDULED ON-SITE VERIFICATION DOSSIER
            </div>
            <span className="badge badge-success font-bold">✓ {plan.status.toUpperCase()}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '16px', fontSize: '12.5px' }}>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Target Date:</span>
              <div style={{ fontWeight: 800, color: '#006064', fontSize: '14px', marginTop: '2px' }}>{plan.scheduledDate}</div>
            </div>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Assigned Auditor:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{plan.verifier}</div>
            </div>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Underground Split:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{plan.location}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div><strong>Required Instrumentation:</strong> {plan.requiredEquipment}</div>
            <div><strong>Mandatory Documentation:</strong> {plan.requiredDocuments}</div>
          </div>
        </div>
      )}
    </div>
  );
};
