"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import { VerificationDecisionOutcome } from '../../types/verification';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  HelpCircle,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Send,
  Lock
} from 'lucide-react';

export const Screen10VerificationDecision: React.FC = () => {
  const {
    activeVerification,
    passVerification,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;

  const [decision, setDecision] = useState<VerificationDecisionOutcome>('PASS');
  const [remarks, setVerifierRemarks] = useState<string>(
    'Certified independent verification: The mechanical descaling and blade pitch adjustments have achieved a certified return airway airflow velocity of 5.9 m/s, satisfying Regulation 153(2)(b).'
  );
  const [independentDecl, setIndependentDecl] = useState<boolean>(true);

  const handleConfirmDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!independentDecl) {
      showToast('Please check the independent verifier declaration to proceed', 'error');
      return;
    }

    if (decision === 'PASS') {
      navigateTo('11'); // Pass confirmation screen
    } else if (decision === 'FAIL') {
      navigateTo('12'); // Fail verification screen
    } else if (decision === 'RETURN') {
      navigateTo('14'); // Return clarification screen
    }
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
              <span>Back to Checklist</span>
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
              FINAL STATUTORY VERDICT
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY VERIFICATION DECISION &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Formal independent verdict on statutory compliance &bull; Pass (Close), Return (Clarify), or Fail (Reopen)
          </p>
        </div>
      </div>

      <form onSubmit={handleConfirmDecision}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: Decision Selection & Evaluation Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 3 Outcome Options */}
            <div className="card" style={{ padding: '20px', borderLeft: '4px solid #006064' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#006064', marginBottom: '10px' }}>
                SELECT INDEPENDENT VERIFICATION VERDICT
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {/* PASS */}
                <div
                  onClick={() => setDecision('PASS')}
                  style={{
                    padding: '14px 10px',
                    borderRadius: '6px',
                    border: `2px solid ${decision === 'PASS' ? '#2E7D32' : 'var(--border-color)'}`,
                    background: decision === 'PASS' ? '#E8F5E9' : 'var(--bg-surface-alt)',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#1B5E20' }}>✓ PASS</div>
                  <div style={{ fontSize: '11px', color: '#2E7D32', marginTop: '4px' }}>
                    Remediation verified; formally close finding.
                  </div>
                </div>

                {/* RETURN */}
                <div
                  onClick={() => setDecision('RETURN')}
                  style={{
                    padding: '14px 10px',
                    borderRadius: '6px',
                    border: `2px solid ${decision === 'RETURN' ? '#F57C00' : 'var(--border-color)'}`,
                    background: decision === 'RETURN' ? '#FFF3E0' : 'var(--bg-surface-alt)',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#E65100' }}>⚡ RETURN</div>
                  <div style={{ fontSize: '11px', color: '#E65100', marginTop: '4px' }}>
                    Clarification / missing data needed from WS06.
                  </div>
                </div>

                {/* FAIL */}
                <div
                  onClick={() => setDecision('FAIL')}
                  style={{
                    padding: '14px 10px',
                    borderRadius: '6px',
                    border: `2px solid ${decision === 'FAIL' ? '#D32F2F' : 'var(--border-color)'}`,
                    background: decision === 'FAIL' ? '#FFEBEE' : 'var(--bg-surface-alt)',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#B71C1C' }}>✕ FAIL</div>
                  <div style={{ fontSize: '11px', color: '#B71C1C', marginTop: '4px' }}>
                    Outcome not met; reopen CAPA for physical rework.
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment Checklist Summary */}
            <div className="card" style={{ padding: '18px' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Verification Basis Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: 600 }}>
                  <CheckCircle2 size={15} />
                  <span>Corrective action completed on-site ({ver.completionDate})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: 600 }}>
                  <CheckCircle2 size={15} />
                  <span>Evidence complete & authentic ({ver.evidenceList.length} artifacts verified)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: 600 }}>
                  <CheckCircle2 size={15} />
                  <span>Calibrated measurement valid: 5.9 m/s (Statutory Threshold: &ge; 5.5 m/s)</span>
                </div>
              </div>
            </div>

            {/* Verifier Remarks */}
            <div className="card" style={{ padding: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Auditor Statutory Decision Narrative *
              </label>
              <textarea
                className="form-control"
                rows={3}
                value={remarks}
                onChange={e => setVerifierRemarks(e.target.value)}
                required
                style={{ height: 'auto', fontSize: '12.5px', lineHeight: 1.4 }}
              />
            </div>
          </div>

          {/* Right Column: Independent Declaration & Confirmation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #006064' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#006064', textTransform: 'uppercase', marginBottom: '10px' }}>
                INDEPENDENT AUDITOR STATUTORY DECLARATION
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
                  id="audDecl"
                  checked={independentDecl}
                  onChange={e => setIndependentDecl(e.target.checked)}
                  style={{ marginTop: '2px', cursor: 'pointer' }}
                />
                <label htmlFor="audDecl" style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.4, cursor: 'pointer', fontWeight: 600 }}>
                  I confirm that I have independently reviewed the corrective action and submitted evidence without conflict of interest, in accordance with the Mines Act, 1952.
                </label>
              </div>

              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Auditor: <strong>{ver.assignedVerifier?.name}</strong><br />
                Authorization: <strong>{ver.assignedVerifier?.authorizationId}</strong><br />
                Date: <strong>07 Dec 2026</strong>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  background: decision === 'PASS' ? '#006064' : decision === 'FAIL' ? '#D32F2F' : '#F57C00',
                  borderColor: '#004D40',
                  justifyContent: 'center',
                  padding: '12px'
                }}
              >
                <Award size={15} />
                <span>Confirm {decision} Decision & Proceed &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
