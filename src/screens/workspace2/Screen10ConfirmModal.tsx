"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Users,
  Calendar,
  Lock,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

export const Screen10ConfirmModal: React.FC = () => {
  const {
    inspections,
    activeInspectionId,
    stagedLead,
    stagedSpecialists,
    stagedSupporting,
    confirmCurrentAssignment,
    navigateTo
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];
  const [acknowledged, setAcknowledged] = useState(true);

  const handleConfirm = () => {
    confirmCurrentAssignment();
  };

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('04', { inspectionId: insp.id })}>Assign Team</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Final Statutory Confirmation</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Lock size={20} color="var(--purple-primary)" />
            <span>CONFIRM INSPECTION PERSONNEL ASSIGNMENT</span>
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{insp.id}</span>
          </h1>
          <p className="screen-subtitle">
            Formal statutory locking and digital delegation of authority under CMR 2017 & DGMS Safety Track.
          </p>
        </div>
      </div>

      {/* Main Confirmation Card (Centered layout) */}
      <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Inspection & Target Team Summary */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header" style={{ background: '#FAF8FF' }}>
            <span className="card-title" style={{ color: 'var(--purple-dark)' }}>
              1. Inspection & Target Field Roster Summary
            </span>
            <span className="badge badge-completed">8/8 Validation Passed</span>
          </div>
          <div className="card-body">
            
            {/* Metadata Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', paddingBottom: '14px', borderBottom: '1px solid var(--border-light)', marginBottom: '14px', fontSize: '11.5px' }}>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>INSPECTION ID</span>
                <div className="font-mono" style={{ fontWeight: 700, color: 'var(--purple-primary)' }}>{insp.id}</div>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>COLLIERY / MINE</span>
                <div><strong>{insp.mine.split('(')[0]}</strong></div>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SCHEDULED DATE</span>
                <div className="font-mono">{insp.scheduledDate} ({insp.shift})</div>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>RISK LEVEL</span>
                <div><span className="badge badge-high">{insp.risk}</span></div>
              </div>
            </div>

            {/* Team Roster Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>ASSIGNED TEAM ROSTER:</div>
              
              {/* Lead */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <UserCheck size={16} color="var(--purple-primary)" />
                  <div>
                    <strong style={{ fontSize: '12.5px' }}>{stagedLead?.name || 'R. Sharma'}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '6px' }}>({stagedLead?.designation})</span>
                  </div>
                </div>
                <span className="badge badge-completed">Lead Inspector (Assigned)</span>
              </div>

              {/* Specialists */}
              {stagedSpecialists.map((spec, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={16} color="var(--brand-dark)" />
                    <div>
                      <strong style={{ fontSize: '12.5px' }}>{spec.person.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '6px' }}>({spec.person.designation})</span>
                    </div>
                  </div>
                  <span className="badge badge-draft">{spec.role}</span>
                </div>
              ))}

              {/* Supporting */}
              {stagedSupporting.map((sup, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={16} />
                    <div>
                      <strong style={{ fontSize: '12.5px' }}>{sup.name}</strong>
                    </div>
                  </div>
                  <span className="badge badge-draft">Supporting Inspector</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Validation Confirmation Badges */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <ShieldCheck size={15} color="var(--status-green-text)" />
              2. Pre-Flight Verification Summary
            </span>
          </div>
          <div className="card-body" style={{ fontSize: '11.5px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="var(--status-green-text)" />
                <span>All Required Competencies Verified (CMR 2017)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="var(--status-green-text)" />
                <span>Statutory CMR 2017 Authorizations Valid</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="var(--status-green-text)" />
                <span>Organizational Scope Match (Area 01 / Mine A2)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="var(--status-green-text)" />
                <span>Personnel Shift Availability & Zero Double-Booking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Statutory Governance Warning */}
        <div
          style={{
            background: '#FFF8E1',
            border: '1.5px solid #FFE082',
            borderRadius: '6px',
            padding: '14px 18px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}
        >
          <AlertTriangle size={20} color="#F57F17" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ fontSize: '12.5px', color: '#B78103' }}>
              STATUTORY AUDIT NOTICE & IMMUTABLE LOGGING WARNING
            </strong>
            <div style={{ fontSize: '11px', color: '#5D4037', marginTop: '3px', lineHeight: 1.45 }}>
              Once confirmed, this inspection roster will be locked. A digital token will be generated, and all subsequent modifications or reassignment events will be immutably recorded in the STRATA Global Audit Trail per CIL/DGMS governance directives.
            </div>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="checkbox"
                id="ack"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="ack" style={{ fontSize: '11px', color: '#5D4037', cursor: 'pointer', fontWeight: 600 }}>
                I certify as Authorized Inspection Coordinator that this team meets all regulatory standards.
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '4px', marginBottom: '30px' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('04', { inspectionId: insp.id })}>
            <ArrowLeft size={14} /> Cancel & Return
          </button>

          <button
            className="btn btn-primary"
            disabled={!acknowledged}
            style={{ padding: '8px 24px', fontSize: '13px' }}
            onClick={handleConfirm}
          >
            Confirm & Lock Assignment &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
