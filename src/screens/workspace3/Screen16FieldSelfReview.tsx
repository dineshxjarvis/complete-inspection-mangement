"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  FileText,
  Camera,
  Gauge,
  AlertOctagon,
  ArrowLeft,
  ArrowRight,
  Shield,
  Clock,
  CheckSquare
} from 'lucide-react';

export const Screen16FieldSelfReview: React.FC = () => {
  const {
    activeInspection,
    checklistItems,
    observations,
    evidenceList,
    proposedFindings,
    finalRemarks,
    setFinalRemarks,
    navigateTo,
    showToast
  } = useFieldInspection();

  const [confirmReviewed, setConfirmReviewed] = useState<boolean>(false);
  const [confirmAccurate, setConfirmAccurate] = useState<boolean>(false);
  const [confirmEvidence, setConfirmEvidence] = useState<boolean>(false);

  const completedCount = checklistItems.filter(c => c.status !== 'Pending').length;
  const isValidationPassing = completedCount === checklistItems.length;
  const canSubmit = isValidationPassing && confirmReviewed && confirmAccurate && confirmEvidence;

  const handleSubmit = () => {
    if (!canSubmit) {
      showToast('Please complete all statutory confirmation checkboxes before proceeding to formal submission.', 'error');
      return;
    }
    navigateTo('17');
  };

  return (
    <div className="screen-content" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-success">PRE-SUBMISSION AUDIT</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            MANDATORY FIELD SELF-REVIEW
          </h1>
          <p className="screen-subtitle">
            Statutory validation of completed checks, instrument measurements, evidence integrity & inspector affirmations
          </p>
        </div>

        <button className="btn btn-secondary" onClick={() => navigateTo('07')}>
          <ArrowLeft size={14} />
          <span>Back to Checklist</span>
        </button>
      </div>

      {/* Progress & Summary Bar */}
      <div className="card" style={{ padding: '16px 20px', background: 'var(--bg-surface-alt)', borderLeft: '4px solid #2E7D32', marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Checklist</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#2E7D32' }}>{completedCount} / 22</div>
            <div style={{ fontSize: '10.5px', color: '#2E7D32' }}>✓ 100% Complete</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Observations</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#5932A5' }}>{observations.length}</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Field Notes</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Evidence Items</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1976D2' }}>{evidenceList.length}</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Watermarked</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Measurements</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#FF6B00' }}>10</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Calibrated</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Proposed Findings</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#D32F2F' }}>{proposedFindings.length}</div>
            <div style={{ fontSize: '10.5px', color: '#D32F2F' }}>Ready for Review</div>
          </div>
        </div>
      </div>

      {/* 5-Point Validation Checklist */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
          AUTOMATED STATUTORY VALIDATION AUDIT
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'All 22 statutory checklist items evaluated with positive compliance status', passed: true },
            { label: 'Mandatory photo evidence attached for all identified non-compliances', passed: true },
            { label: 'Instrument measurements recorded with calibrated serial numbers and valid calibration dates', passed: true },
            { label: 'Tamper-evident GPS coordinates and cryptographic timestamps watermarked', passed: true },
            { label: 'Target scope (Mine A2 Seam VII District 4) fully covered without omissions', passed: true }
          ].map((val, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '6px',
                background: val.passed ? 'var(--status-green-bg)' : 'var(--status-red-bg)',
                border: `1px solid ${val.passed ? 'var(--status-green-border)' : 'var(--status-red-border)'}`,
                color: val.passed ? '#1B5E20' : '#B71C1C',
                fontSize: '12.5px',
                fontWeight: 500
              }}
            >
              <CheckCircle size={16} color="#2E7D32" />
              <span>{val.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory Warnings Block */}
      <div className="card" style={{ borderLeft: '4px solid #F57C00', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#E65100', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertTriangle size={15} />
          <span>Operational Advisory Warnings (Non-Blocking)</span>
        </h3>
        <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          <li>Previous CAPA-2026-018 (Stone dust replenishment) remains open (Due 20 Nov 2026).</li>
          <li>1 observation (OBS-004: Aux fan slurry) was cleaned on-site and has no open finding.</li>
          <li>Optional document scan for REQ-EMERG-001 was omitted (Physical check verified).</li>
        </ul>
      </div>

      {/* Proposed Findings Staged for Review */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
          PROPOSED FINDINGS STAGED FOR SUBMISSION ({proposedFindings.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {proposedFindings.map(f => (
            <div
              key={f.id}
              style={{
                padding: '12px 16px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-surface-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono" style={{ fontSize: '12px', fontWeight: 700, color: '#B71C1C' }}>
                    {f.id}
                  </span>
                  <span className={`badge ${f.severity === 'High' ? 'badge-danger' : 'badge-warning'}`}>
                    {f.severity.toUpperCase()} SEVERITY
                  </span>
                  <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{f.linkedChecklistId}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {f.requirementText}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Action Proposed: <strong>{f.proposedAction}</strong> &bull; Dept: {f.responsibleArea}
                </div>
              </div>
              <span className="badge badge-success">✓ Ready for Review</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Inspector Final Remarks */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '8px' }}>
          LEAD INSPECTOR CONCLUDING REMARKS
        </h3>
        <textarea
          className="form-control"
          rows={3}
          value={finalRemarks}
          onChange={e => setFinalRemarks(e.target.value)}
          placeholder="Enter concluding field inspection notes, operational risk summary, and specific recommendations..."
          style={{ fontSize: '13px', lineHeight: 1.5 }}
        />
      </div>

      {/* Statutory Affirmation Checkboxes */}
      <div className="card" style={{ border: '2px solid #5932A5', background: 'rgba(89, 50, 165, 0.03)', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#5932A5', textTransform: 'uppercase', marginBottom: '12px' }}>
          Statutory Inspector Affirmations (Required for Submission)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={confirmReviewed}
              onChange={e => setConfirmReviewed(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#5932A5' }}
            />
            <span>I have thoroughly reviewed the entire field inspection record for INS-2026-0882.</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={confirmAccurate}
              onChange={e => setConfirmAccurate(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#5932A5' }}
            />
            <span>The recorded measurements and observations accurately represent genuine underground conditions.</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={confirmEvidence}
              onChange={e => setConfirmEvidence(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#5932A5' }}
            />
            <span>All required statutory evidence, photos, and instrument readings have been captured and verified.</span>
          </label>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={() => navigateTo('07')}>
          <ArrowLeft size={14} />
          <span>Back to Checklist</span>
        </button>

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            background: canSubmit ? 'linear-gradient(135deg, #2E7D32, #1B5E20)' : '#A0AEC0',
            borderColor: canSubmit ? '#2E7D32' : '#A0AEC0',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            padding: '10px 28px',
            fontSize: '14px',
            fontWeight: 700
          }}
        >
          <ShieldCheck size={16} />
          <span>Proceed to Final Submission Confirmation</span>
        </button>
      </div>

    </div>
  );
};
