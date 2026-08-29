"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  AlertOctagon,
  AlertTriangle,
  RotateCcw,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  Lock
} from 'lucide-react';

export const Screen12FailVerification: React.FC = () => {
  const {
    activeVerification,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;

  const [ineffectiveAction, setIneffectiveAction] = useState(true);
  const [evidenceInsufficient, setEvidenceInsufficient] = useState(false);
  const [incompleteAction, setIncompleteAction] = useState(false);
  const [requirementNotSatisfied, setRequirementNotSatisfied] = useState(true);

  const [failRemarks, setFailRemarks] = useState(
    'Measured return airway airflow velocity is 5.0 m/s, which fails the statutory threshold of >= 5.5 m/s. Physical mechanical overhaul was ineffective; secondary booster fan pitch adjustment and duct realignment required.'
  );

  const handleProceedToReopen = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('13'); // Navigate to Reopen screen
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('10')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Decision</span>
            </button>
            <span
              className="badge badge-danger font-bold"
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.04em'
              }}
            >
              ✕ VERIFICATION FAILED
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY VERIFICATION DEFICIENCY NOTICE &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Remediation failed to achieve statutory threshold &bull; Document non-compliance causes and initiate formal CAPA reopening
          </p>
        </div>
      </div>

      <form onSubmit={handleProceedToReopen}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: Failure Reasons & Quantitative Deficit */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Failure Alert Banner */}
            <div className="card" style={{ padding: '20px', background: '#FFEBEE', border: '1.5px solid #EF9A9A' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <AlertOctagon size={32} color="#D32F2F" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#B71C1C', textTransform: 'uppercase' }}>
                    RESULT: VERIFICATION FAILED (THRESHOLD NOT ACHIEVED)
                  </div>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#B71C1C', marginTop: '2px' }}>
                    Measured Airflow: 5.0 m/s &bull; Required Threshold: &ge; 5.5 m/s
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Failure Root Causes */}
            <div className="card" style={{ padding: '20px', borderLeft: '4px solid #D32F2F' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#B71C1C' }}>
                Primary Failure Causes
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={ineffectiveAction}
                    onChange={e => setIneffectiveAction(e.target.checked)}
                  />
                  <span>Corrective action ineffective in restoring required airway velocity</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={requirementNotSatisfied}
                    onChange={e => setRequirementNotSatisfied(e.target.checked)}
                  />
                  <span>Statutory standard (CMR 2017 Reg 153(2)(b)) remains unsatisfied</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={incompleteAction}
                    onChange={e => setIncompleteAction(e.target.checked)}
                  />
                  <span>Required mechanical overhaul incomplete</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={evidenceInsufficient}
                    onChange={e => setEvidenceInsufficient(e.target.checked)}
                  />
                  <span>Evidence insufficient or contradictory</span>
                </label>
              </div>
            </div>

            {/* Verifier Remarks */}
            <div className="card" style={{ padding: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Verifier Statutory Non-Compliance Remarks *
              </label>
              <textarea
                className="form-control"
                rows={3}
                value={failRemarks}
                onChange={e => setFailRemarks(e.target.value)}
                required
                style={{ height: 'auto', fontSize: '12.5px', lineHeight: 1.4 }}
              />
            </div>
          </div>

          {/* Right Column: Next Steps & Reopen Action */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #D32F2F' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#B71C1C', textTransform: 'uppercase', marginBottom: '10px' }}>
                MANDATORY STATUTORY NEXT ACTION
              </div>

              <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', fontSize: '12px', marginBottom: '16px' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Required Action: CAPA Physical Rework</div>
                <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                  Transmission to Workspace 06 (Chief Ventilation Engineer) for secondary remediation and re-survey.
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-danger"
                style={{ width: '100%', background: '#D32F2F', color: '#FFF', justifyContent: 'center', padding: '12px' }}
              >
                <RotateCcw size={15} />
                <span>Proceed to Reopen CAPA (Screen 13) &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
