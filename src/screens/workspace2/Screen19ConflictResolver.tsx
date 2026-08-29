"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  AlertTriangle,
  Clock,
  UserX,
  Calendar,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  UserPlus
} from 'lucide-react';

export const Screen19ConflictResolver: React.FC = () => {
  const {
    inspections,
    activeInspectionId,
    navigateTo
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];
  const [exceptionModalOpen, setExceptionModalOpen] = useState(false);
  const [exceptionJustification, setExceptionJustification] = useState('');

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('04', { inspectionId: insp.id })}>Assign Team</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Assignment Conflict Resolver</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <AlertTriangle size={20} color="var(--status-red-text)" />
            <span>ASSIGNMENT SCHEDULING CONFLICT RESOLVER</span>
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{insp.id}</span>
          </h1>
          <p className="screen-subtitle">
            Automated double-booking prevention engine detected an operational overlap under CMR 2017.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Conflict Warning Banner */}
        <div
          style={{
            background: '#FEF2F2',
            border: '1.5px solid #FCA5A5',
            borderRadius: '6px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px'
          }}
        >
          <AlertTriangle size={22} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ fontSize: '14px', color: '#991B1B' }}>
              SCHEDULING CLASH DETECTED: DOUBLE-BOOKING PREVENTED
            </strong>
            <div style={{ fontSize: '12px', color: '#7F1D1D', marginTop: '4px', lineHeight: 1.5 }}>
              Inspector <strong>P. Mukhopadhyay (Strata Specialist)</strong> has an active overlapping commitment in <strong>Mine A2 District 2 South Panel</strong> during the requested time window. STRATA governance rules prohibit concurrent underground audit assignments.
            </div>
          </div>
        </div>

        {/* Overlapping Shift Visual Comparison */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">1. Overlapping Shift & Location Analysis</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              
              {/* Current Inspection Target */}
              <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <span className="badge badge-planned" style={{ marginBottom: '6px' }}>TARGET INSPECTION</span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--purple-primary)' }}>{insp.id}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{insp.inspectionType}</div>
                
                <div style={{ marginTop: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div><strong>Mine:</strong> {insp.mine}</div>
                  <div><strong>Time Slot:</strong> <span className="font-mono">{insp.scheduledDate} (10:30 &ndash; 14:30 IST)</span></div>
                  <div><strong>Location:</strong> Intake Shaft 1 & Splits 1-6</div>
                </div>
              </div>

              {/* Conflicting Active Inspection */}
              <div style={{ padding: '14px', background: '#FFF1F2', borderRadius: '4px', border: '1.5px solid #FDA4AF' }}>
                <span className="badge badge-rejected" style={{ marginBottom: '6px' }}>CONFLICTING ACTIVE INSPECTION</span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#BE123C' }}>INS-2026-0870</div>
                <div style={{ fontSize: '11.5px', color: '#9F1239' }}>Strata Control & Roof Support Audit</div>
                
                <div style={{ marginTop: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#881337' }}>
                  <div><strong>Mine:</strong> Mine A2 (District 2 South Panel)</div>
                  <div><strong>Time Slot:</strong> <span className="font-mono">15 Nov (08:30 &ndash; 14:30 IST)</span></div>
                  <div><strong>Overlap Duration:</strong> <strong style={{ color: '#BE123C' }}>4 Hours Direct Overlap</strong></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Resolution Strategies */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">2. Choose Statutory Resolution Path</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              
              {/* Option A: Choose Another Inspector */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: '6px',
                  border: '1.5px solid var(--purple-primary)',
                  background: '#FAF8FF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onClick={() => navigateTo('06', { role: 'Specialist' })}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <UserPlus size={16} color="var(--purple-primary)" />
                    <strong style={{ fontSize: '12.5px', color: 'var(--purple-primary)' }}>Choose Alternative</strong>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    Select an available certified specialist (e.g. K. Rao or K. Sen) who is free during Shift A.
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" style={{ marginTop: '12px', width: '100%' }}>
                  Select Alternative &rarr;
                </button>
              </div>

              {/* Option B: Change Schedule in WS01 */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onClick={() => navigateTo('15')}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Calendar size={16} color="var(--brand-dark)" />
                    <strong style={{ fontSize: '12.5px' }}>Shift Inspection Time</strong>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    Move inspection slot to Afternoon Shift B (15:00 &ndash; 19:00 IST) when P. Mukhopadhyay is free.
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm" style={{ marginTop: '12px', width: '100%' }}>
                  View Availability Matrix
                </button>
              </div>

              {/* Option C: Request Exception */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onClick={() => setExceptionModalOpen(true)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <ShieldAlert size={16} color="var(--status-orange-text)" />
                    <strong style={{ fontSize: '12.5px' }}>Request Exception</strong>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    Request formal General Manager dispensation for emergency joint-district audit.
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm" style={{ marginTop: '12px', width: '100%' }}>
                  File Exception
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '4px', marginBottom: '30px' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('04', { inspectionId: insp.id })}>
            <ArrowLeft size={14} /> Back to Team Builder
          </button>
          <button className="btn btn-primary" onClick={() => navigateTo('06', { role: 'Specialist' })}>
            Resolve Conflict in Candidate Picker &rarr;
          </button>
        </div>

      </div>

      {/* Exception Request Modal */}
      {exceptionModalOpen && (
        <div className="modal-backdrop" onClick={() => setExceptionModalOpen(false)}>
          <div className="modal-dialog" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Request Statutory Conflict Exception</h3>
              <button className="modal-close-btn" onClick={() => setExceptionModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body" style={{ padding: '16px' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Exceptions require digital authorization from the General Manager (Safety & Governance) per CIL governance handbook.
              </p>
              <textarea
                className="filter-input"
                style={{ width: '100%', height: '80px', fontSize: '11px', resize: 'vertical' }}
                placeholder="State operational rationale and joint mitigation protocol..."
                value={exceptionJustification}
                onChange={(e) => setExceptionJustification(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setExceptionModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { setExceptionModalOpen(false); navigateTo('04', { inspectionId: insp.id }); }}>
                Submit to GM for Approval
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
