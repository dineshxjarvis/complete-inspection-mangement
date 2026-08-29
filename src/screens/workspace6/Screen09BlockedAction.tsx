"use client";

import React, { useState } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import { BlockerReason } from '../../types/correctiveAction';
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  Calendar,
  ChevronLeft,
  ArrowRight,
  Send,
  Lock,
  UploadCloud
} from 'lucide-react';

export const Screen09BlockedAction: React.FC = () => {
  const {
    activeCapa,
    submitBlockerRequest,
    navigateTo,
    showToast
  } = useCorrectiveAction();

  const [selectedReason, setSelectedReason] = useState<BlockerReason>('Spare parts unavailable');
  const [details, setDetails] = useState<string>('High-capacity ultrasonic velocity telemetry sensor head replacement delayed at CIL central warehouse transit.');
  const [extensionRequested, setExtensionRequested] = useState<boolean>(true);
  const [requestedDate, setRequestedDate] = useState<string>('05 Dec 2026');

  const blockerOptions: BlockerReason[] = [
    'Equipment unavailable',
    'Spare parts unavailable',
    'Mine operational restriction',
    'Safety restriction',
    'Vendor dependency',
    'Regulatory dependency',
    'Weather',
    'Personnel unavailable',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitBlockerRequest(activeCapa.id, {
      reason: selectedReason,
      details,
      extensionRequested,
      newDate: extensionRequested ? requestedDate : undefined
    });
  };

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
              className="badge badge-danger"
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.04em'
              }}
            >
              ACTION BLOCKED PROTOCOL
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            DECLARE OPERATIONAL BLOCKER &bull; {activeCapa.id}
          </h1>
          <p className="screen-subtitle">
            Formal notification of technical or supply impediments preventing on-time corrective action execution
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: Blocker Questionnaire */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Blocker Category Selection */}
            <div className="card" style={{ padding: '20px', borderLeft: '4px solid #D32F2F' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#B71C1C', marginBottom: '6px' }}>
                PRIMARY IMPEDIMENT
              </div>
              <h2 style={{ margin: '0 0 14px', fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Why is the corrective action blocked?
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {blockerOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedReason(opt)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '6px',
                      border: `1.5px solid ${selectedReason === opt ? '#D32F2F' : 'var(--border-color)'}`,
                      background: selectedReason === opt ? '#FFEBEE' : 'var(--bg-surface-alt)',
                      color: selectedReason === opt ? '#B71C1C' : 'var(--text-primary)',
                      fontWeight: selectedReason === opt ? 800 : 500,
                      fontSize: '11.5px',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    {selectedReason === opt ? '◉ ' : '○ '} {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Explanation */}
            <div className="card" style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Technical Blocker Details & Circumstances *
              </label>
              <textarea
                className="form-control"
                rows={4}
                value={details}
                onChange={e => setDetails(e.target.value)}
                required
                style={{ height: 'auto', fontSize: '12.5px' }}
              />
            </div>

            {/* Extension Request */}
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Statutory Time Extension Request
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                  <input
                    type="radio"
                    name="extReq"
                    checked={extensionRequested}
                    onChange={() => setExtensionRequested(true)}
                  />
                  YES — Request Formal Extension
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                  <input
                    type="radio"
                    name="extReq"
                    checked={!extensionRequested}
                    onChange={() => setExtensionRequested(false)}
                  />
                  NO — Informational Blocker Only
                </label>
              </div>

              {extensionRequested && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Requested New Completion Deadline *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={requestedDate}
                    onChange={e => setRequestedDate(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Governance Pipeline & Submission */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Approval Hierarchy */}
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #D32F2F' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#B71C1C', textTransform: 'uppercase', marginBottom: '8px' }}>
                BLOCKER REVIEW & APPROVAL ROUTE
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
                <div>1. Action Owner Submits Blocker</div>
                <div>&darr;</div>
                <div>2. Colliery Manager / Reviewer Evaluation</div>
                <div>&darr;</div>
                <div>3. Formal Extension Approval / Rejection</div>
              </div>

              <div
                style={{
                  background: '#FFEBEE',
                  border: '1px solid #FFCDD2',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '16px',
                  fontSize: '12px',
                  color: '#B71C1C',
                  lineHeight: 1.4
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, marginBottom: '4px' }}>
                  <Lock size={13} />
                  <span>IMMUTABLE RULE:</span>
                </div>
                The original statutory due date ({activeCapa.originalDueDate}) is never silently overwritten. Extension approvals are recorded as formal addenda.
              </div>

              <button
                type="submit"
                className="btn btn-danger"
                style={{ width: '100%', background: '#D32F2F', color: '#FFF', justifyContent: 'center' }}
              >
                <Send size={14} />
                <span>Submit Blocker Request &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
