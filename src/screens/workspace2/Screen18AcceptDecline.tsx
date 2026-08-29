"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Shield,
  HardHat,
  Wrench,
  ArrowRight
} from 'lucide-react';

export const Screen18AcceptDecline: React.FC = () => {
  const {
    inspections,
    activeInspectionId,
    acceptAssignmentByInspector,
    declineAssignmentByInspector,
    navigateTo
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];

  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReasonType, setDeclineReasonType] = useState('Unavailable (Medical / Urgent Leave)');
  const [declineDetails, setDeclineDetails] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    acceptAssignmentByInspector(insp.id, 'R. Sharma');
    setAccepted(true);
  };

  const handleDeclineSubmit = () => {
    const fullReason = `${declineReasonType}: ${declineDetails || 'No further comments'}`;
    declineAssignmentByInspector(insp.id, 'R. Sharma', fullReason);
    setShowDeclineModal(false);
  };

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Inspector Portal &bull; Assignment Acceptance</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <UserCheck size={20} color="var(--purple-primary)" />
            <span>STATUTORY APPOINTMENT & ACCEPTANCE PORTAL</span>
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{insp.id}</span>
          </h1>
          <p className="screen-subtitle">
            Inspector-facing statutory portal for acknowledging briefing requirements and formal acceptance under CMR 2017.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Welcome / Appointment Notice Card */}
        <div
          style={{
            background: accepted ? 'linear-gradient(135deg, #14532D 0%, #166534 100%)' : 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
            borderRadius: '8px',
            padding: '22px',
            color: '#FFFFFF'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="badge badge-completed" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFF', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '6px' }}>
                LOGGED IN AS: R. SHARMA (LEAD INSPECTOR)
              </span>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '4px 0' }}>
                {accepted ? '✓ ASSIGNMENT ACCEPTED & READY FOR EXECUTION' : 'NEW STATUTORY INSPECTION ASSIGNMENT DISPATCHED'}
              </h2>
              <div style={{ fontSize: '12.5px', color: '#E0E7FF' }}>
                {insp.inspectionType} &bull; {insp.mine} &bull; {insp.scheduledDate} ({insp.scheduledTime})
              </div>
            </div>
            <span className="badge badge-high">{insp.risk} RISK</span>
          </div>
        </div>

        {/* Pre-Inspection Brief Summary */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <FileText size={15} color="var(--purple-primary)" />
              Statutory Pre-Inspection Brief Dossier
            </span>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('08', { inspectionId: insp.id })}>
              View Full 10-Section Brief &rarr;
            </button>
          </div>
          <div className="card-body" style={{ fontSize: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>YOUR APPOINTED ROLE:</span>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--purple-primary)' }}>Lead Inspector (Head of Audit)</div>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>ATTACHED SPECIALISTS:</span>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>K. Rao (Mechanical Specialist)</div>
              </div>
            </div>

            <div style={{ padding: '10px 14px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><strong>Statutory Objective:</strong> {insp.objective}</div>
              <div><strong>Mandatory Checks:</strong> {insp.checklistChecksCount} checks approved under CMR 2017 Reg 153.</div>
              <div><strong>Required Instruments:</strong> {insp.preparation.instruments.join(', ')}</div>
              <div><strong>Mandatory PPE:</strong> {insp.preparation.ppe.join(', ')}</div>
            </div>
          </div>
        </div>

        {/* Acceptance Actions */}
        {!accepted ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '16px 20px', borderRadius: '6px', marginBottom: '30px' }}>
            <button
              className="btn btn-secondary"
              style={{ color: 'var(--status-red-text)', borderColor: '#FCA5A5' }}
              onClick={() => setShowDeclineModal(true)}
            >
              <XCircle size={14} /> Decline Assignment
            </button>

            <button
              className="btn btn-primary"
              style={{ background: '#16A34A', borderColor: '#15803D', padding: '9px 24px', fontSize: '13px' }}
              onClick={handleAccept}
            >
              <CheckCircle2 size={15} /> Accept Assignment &bull; Ready for Field
            </button>
          </div>
        ) : (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '16px 20px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={20} color="#16A34A" />
              <div>
                <strong style={{ color: '#14532D', fontSize: '13px' }}>You have formally accepted this assignment.</strong>
                <div style={{ fontSize: '11px', color: '#166534' }}>Your confirmation token has been transmitted to the Coordinator.</div>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => navigateTo('11', { inspectionId: insp.id })}
            >
              Proceed to Workspace 03 Handoff &rarr;
            </button>
          </div>
        )}

      </div>

      {/* Decline Reason Modal */}
      {showDeclineModal && (
        <div className="modal-backdrop" onClick={() => setShowDeclineModal(false)}>
          <div className="modal-dialog" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ background: '#7F1D1D', color: '#FFF' }}>
              <h3 className="modal-title" style={{ color: '#FFF' }}>Decline Inspection Assignment</h3>
              <button className="modal-close-btn" style={{ color: '#FFF' }} onClick={() => setShowDeclineModal(false)}>&times;</button>
            </div>
            <div className="modal-body" style={{ padding: '16px' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Declining a statutory inspection assignment will immediately trigger a <strong>Reassignment Required</strong> alert to the Inspection Coordinator.
              </p>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                  Statutory Decline Reason (Mandatory):
                </label>
                <select
                  className="filter-select"
                  style={{ width: '100%' }}
                  value={declineReasonType}
                  onChange={(e) => setDeclineReasonType(e.target.value)}
                >
                  <option>Unavailable (Medical / Urgent Leave)</option>
                  <option>Operational Conflict (Overlapping Inquiry)</option>
                  <option>Authorization / Certification Issue</option>
                  <option>Safety Concern (Underground Hazard Alert)</option>
                  <option>Other Operational Cause</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                  Additional Explanatory Notes:
                </label>
                <textarea
                  className="filter-input"
                  style={{ width: '100%', height: '70px', fontSize: '11px', resize: 'vertical' }}
                  placeholder="Provide brief context for the Inspection Coordinator..."
                  value={declineDetails}
                  onChange={(e) => setDeclineDetails(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDeclineModal(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                style={{ background: '#DC2626', borderColor: '#B91C1C' }}
                onClick={handleDeclineSubmit}
              >
                Submit Decline & Alert Manager
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
