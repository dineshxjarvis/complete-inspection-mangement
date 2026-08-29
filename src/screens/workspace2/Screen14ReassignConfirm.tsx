"use client";

import React from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  CheckCircle2,
  Users,
  RotateCcw,
  ShieldCheck,
  Clock,
  ArrowRight,
  Bell,
  FileText
} from 'lucide-react';

export const Screen14ReassignConfirm: React.FC = () => {
  const {
    inspections,
    activeInspectionId,
    screenParams,
    navigateTo
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];

  const oldPersonName = screenParams.oldPersonName || 'R. Sharma';
  const newPersonName = screenParams.newPersonName || 'A. Kumar';
  const reason = screenParams.reason || 'Original inspector unavailable due to emergency DGMS statutory enquiry.';

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('05', { inspectionId: insp.id })}>Team Detail</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Reassignment Confirmed</span>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Success Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <RotateCcw size={22} />
            </div>
            <div>
              <span className="badge badge-completed" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#86EFAC', border: '1px solid #22C55E', marginBottom: '4px' }}>
                AUDIT EVENT RECORDED
              </span>
              <h2 style={{ fontSize: '19px', fontWeight: 800, margin: 0 }}>
                ✓ INSPECTION PERSONNEL SUCCESSFULLY REASSIGNED
              </h2>
            </div>
          </div>
          <p style={{ fontSize: '12.5px', color: '#C7D2FE', lineHeight: 1.5, margin: 0 }}>
            Lead inspection authority for <strong style={{ color: '#FFF' }}>{insp.id}</strong> at <strong>{insp.mine}</strong> has been transferred. All statutory audit logs and dispatch notices have been dispatched.
          </p>
        </div>

        {/* Previous vs New Inspector Transition Card */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">1. Personnel Transition Audit Record</span>
            <span className="badge badge-completed">Verified Under CMR 2017</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
              
              {/* Previous Inspector */}
              <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PREVIOUS LEAD INSPECTOR</span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {oldPersonName}
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>First Class Mine Manager & Safety Officer</div>
                <div style={{ marginTop: '6px' }}>
                  <span className="badge badge-draft" style={{ fontSize: '9.5px' }}>Relieved / Notified</span>
                </div>
              </div>

              <div style={{ color: 'var(--purple-primary)', fontWeight: 700, fontSize: '18px' }}>
                &rarr;
              </div>

              {/* New Inspector */}
              <div style={{ padding: '12px', background: '#FAF8FF', borderRadius: '4px', border: '1.5px solid var(--purple-primary)' }}>
                <span style={{ fontSize: '10px', color: 'var(--purple-primary)', fontWeight: 700 }}>NEW APPOINTED LEAD</span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {newPersonName}
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>Assistant Mine Safety Inspector</div>
                <div style={{ marginTop: '6px' }}>
                  <span className="badge badge-completed" style={{ fontSize: '9.5px' }}>Active Lead</span>
                </div>
              </div>

            </div>

            {/* Justification Text */}
            <div style={{ marginTop: '14px', padding: '10px 14px', background: '#F1F5F9', borderRadius: '4px', fontSize: '11.5px' }}>
              <strong>Statutory Justification Recorded:</strong>
              <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{reason}</div>
            </div>
          </div>
        </div>

        {/* Verification & Notifications Summary */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <ShieldCheck size={15} color="var(--status-green-text)" />
              2. Pre-Flight Criteria & Notification Status
            </span>
          </div>
          <div className="card-body" style={{ fontSize: '11.5px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="var(--status-green-text)" />
                <span>Statutory Authorization Verified (CMR 2017)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="var(--status-green-text)" />
                <span>Previous Inspector ({oldPersonName}) Relieved & Notified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="var(--status-green-text)" />
                <span>Organizational Scope Match (Area 01 / Mine A2)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="var(--status-green-text)" />
                <span>New Inspector ({newPersonName}) Dispatched Dossier</span>
              </div>
            </div>

            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Authorized Officer: <strong>S. K. Mukherjee (Inspection Manager)</strong></span>
              <span className="font-mono">Audit Timestamp: Today 11:00 IST</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '4px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={() => navigateTo('05', { inspectionId: insp.id })}>
              <Users size={14} /> Open Assignment Roster (Screen 05)
            </button>
            <button className="btn btn-secondary" onClick={() => navigateTo('12', { inspectionId: insp.id })}>
              <Clock size={14} /> View History Ledger (Screen 12)
            </button>
          </div>

          <button className="btn btn-primary" onClick={() => navigateTo('11', { inspectionId: insp.id })}>
            Proceed to Field Handoff &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
