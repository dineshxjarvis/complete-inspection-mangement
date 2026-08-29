"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import { ResponseReviewStatus } from '../../types/regulatoryAction';
import {
  FileText,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Clock,
  User,
  Building,
  Calendar,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  CheckSquare,
  Lock,
  Camera
} from 'lucide-react';

export const Screen10MineResponseStatus: React.FC = () => {
  const {
    activeFinding,
    activeNotice,
    navigateTo,
    setIsClarificationModalOpen,
    setIsEscalateModalOpen,
    showToast
  } = useRegulatoryAction();

  const fnd = activeFinding;
  const resp = fnd.mineResponse;

  const [reviewState, setReviewState] = useState<ResponseReviewStatus>('Under Review');

  const reviewStages: ResponseReviewStatus[] = [
    'Submitted',
    'Under Review',
    'Clarification Required',
    'Accepted',
    'Action Required'
  ];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('09')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Notice</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(63, 81, 181, 0.15)',
                color: '#1A237E'
              }}
            >
              REGULATORY RESPONSE REVIEW
            </span>
            <span className="badge badge-subtle">{activeNotice.id}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            MINE MANAGEMENT STATUTORY RESPONSE &bull; {fnd.id}
          </h1>
          <p className="screen-subtitle">
            Submitted by: <strong>{resp?.submittedBy || 'Mine Manager'}</strong> &bull; Submitted At: {resp?.submittedAt || '16 Nov 2026'} &bull; Target: {resp?.targetDate || '30 Nov 2026'}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsClarificationModalOpen(true)}
            style={{ color: '#E65100', borderColor: '#FFE0B2' }}
          >
            <HelpCircle size={13} />
            <span>Request Clarification</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsEscalateModalOpen(true)}
            style={{ color: '#D32F2F', borderColor: '#FFCDD2' }}
          >
            <ShieldAlert size={13} />
            <span>Escalate</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('12')}
            style={{ background: '#1A237E', borderColor: '#303F9F' }}
          >
            <CheckSquare size={13} />
            <span>Proceed to CAPA Handoff (Screen 12)</span>
          </button>
        </div>
      </div>

      {/* Response Review Stages Bar */}
      <div
        className="card"
        style={{
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)',
          border: '1px solid #9FA8DA'
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E' }}>
          STATUTORY REVIEW STAGES:
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {reviewStages.map(stage => {
            const isCurrent = reviewState === stage;
            return (
              <button
                key={stage}
                onClick={() => {
                  setReviewState(stage);
                  showToast(`Response review stage changed to: ${stage}`, 'info');
                }}
                style={{
                  padding: '4px 10px',
                  borderRadius: '16px',
                  border: `1.5px solid ${isCurrent ? '#1A237E' : 'transparent'}`,
                  background: isCurrent ? '#1A237E' : 'rgba(255,255,255,0.7)',
                  color: isCurrent ? '#FFF' : '#1A237E',
                  fontSize: '11.5px',
                  fontWeight: isCurrent ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {isCurrent ? '◉ ' : ''}{stage}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Response Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Response Narrative & Commitments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Technical Explanation */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E' }}>
              1. Technical Explanation & Root Cause
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {resp?.explanation || 'Official explanation of airflow variation resulting from regulator louvre encrustation.'}
            </p>
          </div>

          {/* Immediate Action Taken */}
          <div className="card" style={{ padding: '18px', borderLeft: '4px solid #2E7D32', background: '#F1F8E9' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1B5E20' }}>
              2. Immediate Remedial Measures Implemented
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#1B5E20', lineHeight: 1.5 }}>
              {resp?.immediateAction || 'Regulator aperture manually cleared by Overman; preliminary velocity restored to 5.2 m/s.'}
            </p>
          </div>

          {/* Corrective Action Commitment */}
          <div className="card" style={{ padding: '18px', borderLeft: '4px solid #1A237E' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E' }}>
              3. Permanent Corrective Action (CAPA Commitment)
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {resp?.correctiveAction || 'Execute 4-stage CAPA-2026-0048 including fan blade pitch calibration and independent verification.'}
            </p>
          </div>
        </div>

        {/* Right Column: Ownership, Deadlines, Evidence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Ownership Card */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Operational Responsibility
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Department:</span>
                <span style={{ fontWeight: 600 }}>{resp?.department || 'Ventilation Department'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Responsible Engineer:</span>
                <span style={{ fontWeight: 600 }}>{resp?.responsiblePerson || 'Er. S. K. Mahapatra'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Target Completion:</span>
                <span style={{ fontWeight: 700, color: '#D32F2F' }}>{resp?.targetDate || '30 Nov 2026'}</span>
              </div>
            </div>
          </div>

          {/* Attached Evidence List */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Attached Mine Evidence Artifacts
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px', fontSize: '11.5px' }}>
                <span>📄 preliminary_incident_memo.pdf</span>
                <span className="badge badge-subtle font-mono">PDF</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px', fontSize: '11.5px' }}>
                <span>📐 engineering_mod_drawing_v2.pdf</span>
                <span className="badge badge-subtle font-mono">DWG</span>
              </div>
            </div>
          </div>

          {/* Governance Notice */}
          <div
            className="card"
            style={{
              padding: '12px 14px',
              background: '#FFF8E1',
              border: '1px solid #FFE082',
              fontSize: '11.5px',
              color: '#B78103',
              lineHeight: 1.4
            }}
          >
            <strong>Statutory Rule:</strong> Reviewing the mine response updates the response status. The original field observation and quantitative measurement values remain immutable.
          </div>
        </div>
      </div>
    </div>
  );
};
