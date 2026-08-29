"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  FileCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Shield,
  Send,
  ChevronLeft,
  Calendar,
  Building,
  User,
  Paperclip,
  Lock,
  Scale
} from 'lucide-react';

export const Screen10ResponseReview: React.FC = () => {
  const {
    activeFinding,
    draftResponse,
    submitOfficialResponse,
    navigateTo,
    showToast
  } = useMineResponse();

  const [officialConfirmation, setOfficialConfirmation] = useState<boolean>(false);
  const fnd = activeFinding;

  // Validation Checks
  const isExplanationValid = !!draftResponse.explanation?.trim();
  const isImmediateActionValid = !!draftResponse.immediateAction?.trim();
  const isCorrectiveActionValid = !!draftResponse.correctiveAction?.trim();
  const isOwnerValid = !!draftResponse.responsiblePerson?.trim();
  const isTargetDateValid = !!draftResponse.targetDate;
  const isEvidenceValid = draftResponse.attachments && draftResponse.attachments.length > 0;

  const allValid =
    isExplanationValid &&
    isImmediateActionValid &&
    isCorrectiveActionValid &&
    isOwnerValid &&
    isTargetDateValid &&
    isEvidenceValid;

  const handleFinalSubmit = () => {
    if (!allValid) {
      showToast('Cannot submit response: Required validation checks failed', 'error');
      return;
    }
    if (!officialConfirmation) {
      showToast('Official confirmation signature checkbox required before submission', 'warning');
      return;
    }

    submitOfficialResponse();
  };

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
              <span>Back to Edit Response</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B'
              }}
            >
              {fnd.id}
            </span>
            <span className="badge badge-warning">PRE-SUBMISSION AUDIT</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            REVIEW & VALIDATE MINE RESPONSE
          </h1>
          <p className="screen-subtitle">
            Verify official representations, technical facts, and regulatory commitments before statutory sign-off
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleFinalSubmit}
          disabled={!allValid || !officialConfirmation}
          style={{
            background: allValid && officialConfirmation ? '#00897B' : '#B0BEC5',
            borderColor: allValid && officialConfirmation ? '#00796B' : '#90A4AE',
            cursor: allValid && officialConfirmation ? 'pointer' : 'not-allowed'
          }}
        >
          <Send size={14} />
          <span>Submit Official Response</span>
        </button>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', marginBottom: '30px' }}>
        {/* Left Column: Complete Review Dossier */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Finding & Regulatory Basis Recap */}
          <div className="card" style={{ padding: '16px', background: 'var(--bg-surface-alt)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Scale size={16} color="#00897B" />
              <h2 style={{ margin: 0, fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                STATUTORY REQUIREMENT & OBSERVATION
              </h2>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {fnd.title}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <strong>Regulation:</strong> {fnd.regulatoryTrace.regulation} ({fnd.regulatoryTrace.clause})
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
              <strong>Original Observation:</strong> {fnd.issueDescription}
            </div>
          </div>

          {/* Mine Technical Explanation */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Mine Technical Explanation & Context
            </h3>
            <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)', background: '#FAFAFA', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              {draftResponse.explanation || '<No explanation provided>'}
            </div>
          </div>

          {/* Immediate Action Taken */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Immediate Remedial Action Taken
            </h3>
            <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)', background: '#FAFAFA', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              {draftResponse.immediateAction || '<No immediate action specified>'}
            </div>
          </div>

          {/* Corrective Action (CAPA) */}
          <div className="card" style={{ padding: '16px', borderLeft: '4px solid #00897B' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '12px', color: '#004D40', textTransform: 'uppercase', fontWeight: 700 }}>
              Committed Corrective & Preventive Action (CAPA)
            </h3>
            <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)', background: '#FAFAFA', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              {draftResponse.correctiveAction || '<No corrective action specified>'}
            </div>
          </div>

          {/* Attached Artifacts Summary */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Attached Supporting Evidence ({draftResponse.attachments.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {draftResponse.attachments.map((file, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'var(--bg-surface-alt)',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{file}</span>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '10.5px' }}>
                    READY FOR HASHING
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pre-Submission Validation Checklist & Confirmation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Statutory Validation Checklist */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Shield size={16} color="#00897B" />
              <h2 style={{ margin: 0, fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                STATUTORY VALIDATION GATES
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Technical explanation provided:</span>
                {isExplanationValid ? (
                  <span style={{ color: '#2E7D32', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={13} /> Valid
                  </span>
                ) : (
                  <span style={{ color: '#D32F2F', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <XCircle size={13} /> Missing
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Immediate action executed:</span>
                {isImmediateActionValid ? (
                  <span style={{ color: '#2E7D32', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={13} /> Valid
                  </span>
                ) : (
                  <span style={{ color: '#D32F2F', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <XCircle size={13} /> Missing
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Corrective action committed:</span>
                {isCorrectiveActionValid ? (
                  <span style={{ color: '#2E7D32', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={13} /> Valid
                  </span>
                ) : (
                  <span style={{ color: '#D32F2F', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <XCircle size={13} /> Missing
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Responsible owner assigned:</span>
                {isOwnerValid ? (
                  <span style={{ color: '#2E7D32', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={13} /> Valid
                  </span>
                ) : (
                  <span style={{ color: '#D32F2F', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <XCircle size={13} /> Missing
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Target completion date set:</span>
                {isTargetDateValid ? (
                  <span style={{ color: '#2E7D32', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={13} /> Valid
                  </span>
                ) : (
                  <span style={{ color: '#D32F2F', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <XCircle size={13} /> Missing
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Supporting evidence attached:</span>
                {isEvidenceValid ? (
                  <span style={{ color: '#2E7D32', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={13} /> Valid ({draftResponse.attachments.length})
                  </span>
                ) : (
                  <span style={{ color: '#D32F2F', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <XCircle size={13} /> Missing
                  </span>
                )}
              </div>
            </div>

            {!allValid && (
              <div style={{ marginTop: '14px', padding: '10px', background: '#FFEBEE', borderRadius: '4px', fontSize: '11.5px', color: '#B71C1C', lineHeight: 1.3 }}>
                <strong>Submission Blocked:</strong> All statutory validation requirements must be satisfied before official response dispatch.
              </div>
            )}
          </div>

          {/* Ownership Details */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Designated Action Owner
            </h3>
            <div style={{ fontSize: '12.5px', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Department: </span>
              <strong>{draftResponse.responsibleDepartment}</strong>
            </div>
            <div style={{ fontSize: '12.5px', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Owner: </span>
              <strong>{draftResponse.responsiblePerson}</strong>
            </div>
            <div style={{ fontSize: '12.5px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Target Date: </span>
              <strong style={{ color: '#00897B' }}>{draftResponse.targetDate}</strong>
            </div>
          </div>

          {/* Official Representation Confirmation */}
          <div className="card" style={{ padding: '16px', background: '#E0F2F1', borderColor: '#80CBC4' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={officialConfirmation}
                onChange={e => setOfficialConfirmation(e.target.checked)}
                style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#00897B' }}
              />
              <span style={{ fontSize: '12px', color: '#004D40', lineHeight: 1.4 }}>
                <strong>Official Submission Commitment:</strong> I confirm this submission represents the official response of Mine A2. Upon clicking submit, this record will be sealed in the tamper-proof statutory audit trail.
              </span>
            </label>
          </div>

          {/* Final Submit Button */}
          <button
            className="btn btn-primary"
            onClick={handleFinalSubmit}
            disabled={!allValid || !officialConfirmation}
            style={{
              padding: '12px',
              fontSize: '13.5px',
              justifyContent: 'center',
              background: allValid && officialConfirmation ? '#00897B' : '#B0BEC5',
              borderColor: allValid && officialConfirmation ? '#00796B' : '#90A4AE',
              cursor: allValid && officialConfirmation ? 'pointer' : 'not-allowed'
            }}
          >
            <Send size={15} />
            <span>Submit Official Response (Screen 10A)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
