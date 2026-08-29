"use client";

import React, { useState } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ChevronLeft,
  ArrowRight,
  Shield,
  Lock,
  UserCheck
} from 'lucide-react';

export const Screen13SubmitForVerification: React.FC = () => {
  const {
    activeCapa,
    submitForVerification,
    navigateTo,
    showToast
  } = useCorrectiveAction();

  const capa = activeCapa;
  const isEvidenceComplete = capa.uploadedEvidenceCount >= capa.requiredEvidenceCount;

  const [declarationChecked, setDeclarationChecked] = useState<boolean>(false);
  const [actionResultText, setActionResultText] = useState<string>(
    'Shaft 3 return airway regulator louvres were descaled and straightened. The auxiliary booster fan pitch angle was adjusted by +3 degrees. Anemometer traverse test conducted on 26 Nov confirmed airflow velocity of 5.9 m/s, satisfying Regulation 153(2)(b).'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declarationChecked) {
      showToast('Please check the owner statutory declaration to proceed', 'error');
      return;
    }
    submitForVerification(capa.id, actionResultText);
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
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(0, 105, 92, 0.15)',
                color: '#004D40'
              }}
            >
              STATUTORY VERIFICATION HANDOFF GATE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            SUBMIT CAPA FOR INDEPENDENT VERIFICATION &bull; {capa.id}
          </h1>
          <p className="screen-subtitle">
            Final action owner declaration, proof packet compilation, and transmission to Workspace 07 for audit
          </p>
        </div>
      </div>

      {/* Validation Gate Alert if Missing Evidence */}
      {!isEvidenceComplete && (
        <div
          className="card"
          style={{
            padding: '16px 20px',
            background: '#FFEBEE',
            border: '1px solid #FFCDD2',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={24} color="#D32F2F" />
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#B71C1C', textTransform: 'uppercase' }}>
                SUBMISSION BLOCKED &bull; MANDATORY EVIDENCE ARTIFACT MISSING
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#B71C1C', marginTop: '2px' }}>
                Missing: Post-Repair Calibrated Anemometer Traverse Measurement Sheet (≥ 5.5 m/s)
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('07')}
            style={{ background: '#D32F2F', borderColor: '#B71C1C' }}
          >
            <span>Upload Missing Measurement (Screen 07) &rarr;</span>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: Validation Checklist & Result Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Validation Checklist */}
            <div className="card" style={{ padding: '20px', borderLeft: '4px solid #00695C' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#004D40' }}>
                Pre-Submission Compliance Validation Checklist
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: 600 }}>
                  <CheckCircle2 size={15} />
                  <span>Corrective engineering repair completed on-site</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: 600 }}>
                  <CheckCircle2 size={15} />
                  <span>All 3 action plan sub-tasks completed and closed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isEvidenceComplete ? '#2E7D32' : '#D32F2F', fontWeight: 600 }}>
                  <CheckCircle2 size={15} />
                  <span>Required evidence pack uploaded ({capa.uploadedEvidenceCount} of {capa.requiredEvidenceCount})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: 600 }}>
                  <CheckCircle2 size={15} />
                  <span>Action owner engineering remarks recorded</span>
                </div>
              </div>
            </div>

            {/* Action Result Narrative */}
            <div className="card" style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Action Result Narrative & Remediation Summary *
              </label>
              <textarea
                className="form-control"
                rows={4}
                value={actionResultText}
                onChange={e => setActionResultText(e.target.value)}
                required
                style={{ height: 'auto', fontSize: '12.5px', lineHeight: 1.4 }}
              />
            </div>

            {/* Evidence Summary Pack */}
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Attached Verification Evidence Pack
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {capa.evidenceList.map(evd => (
                  <div key={evd.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: '6px', fontSize: '12px' }}>
                    <div>
                      <span className="badge badge-info font-mono" style={{ fontSize: '10px', marginRight: '6px' }}>{evd.id}</span>
                      <strong>{evd.title}</strong>
                    </div>
                    <span className="badge badge-success">✓ {evd.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Owner Declaration & Submit Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #00695C' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#004D40', textTransform: 'uppercase', marginBottom: '10px' }}>
                STATUTORY ACTION OWNER DECLARATION
              </div>

              <div
                style={{
                  background: 'var(--bg-surface-alt)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '14px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                <input
                  type="checkbox"
                  id="ownerDecl"
                  checked={declarationChecked}
                  onChange={e => setDeclarationChecked(e.target.checked)}
                  style={{ marginTop: '2px', cursor: 'pointer' }}
                />
                <label htmlFor="ownerDecl" style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.4, cursor: 'pointer', fontWeight: 600 }}>
                  I confirm that the corrective action described above has been completed on-site and the submitted evidence accurately represents the completed action in compliance with CMR 2017.
                </label>
              </div>

              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Signatory: <strong>Er. S. K. Mahapatra</strong><br />
                Designation: <strong>Chief Ventilation Engineer</strong><br />
                Date: <strong>30 Nov 2026</strong>
              </div>

              <button
                type="submit"
                disabled={!isEvidenceComplete}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  background: isEvidenceComplete ? '#00695C' : '#BDBDBD',
                  borderColor: isEvidenceComplete ? '#004D40' : '#9E9E9E',
                  justifyContent: 'center',
                  padding: '12px',
                  cursor: isEvidenceComplete ? 'pointer' : 'not-allowed'
                }}
              >
                <Send size={15} />
                <span>Submit for Verification (WS07 Handoff) &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
