"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  Layers,
  Award,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Eye,
  Activity,
  FileText,
  Camera,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Send,
  Lock,
  GitBranch
} from 'lucide-react';

export const Screen04VerificationDetails: React.FC = () => {
  const {
    activeVerification,
    openEvidenceViewer,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;

  const [checkCompleted, setCheckCompleted] = useState<boolean>(true);
  const [checkEvidence, setCheckEvidence] = useState<boolean>(true);
  const [checkOutcome, setCheckOutcome] = useState<boolean>(true);
  const [verifierRemarks, setVerifierRemarks] = useState<string>(
    'Independent measurement audit confirms Shaft 3 return airway velocity restored to 5.9 m/s, exceeding CMR 2017 minimum statutory threshold of 5.5 m/s.'
  );

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('02')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Queue</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                background: 'rgba(0, 96, 100, 0.15)',
                color: '#006064',
                borderColor: 'rgba(0, 96, 100, 0.4)'
              }}
            >
              {ver.id} &bull; {ver.capaId}
            </span>
            <span className="badge badge-warning font-bold">STATUS: {ver.status}</span>
            <span className="badge badge-danger font-bold">SEVERITY: {ver.severity}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            {ver.actionTitle}
          </h1>
          <p className="screen-subtitle">
            Mine: <strong>{ver.mine}</strong> &bull; Finding Ref: <strong style={{ color: '#D32F2F' }}>{ver.findingId}</strong> &bull; Owner: {ver.actionOwner} &bull; Verifier: {ver.assignedVerifier?.name}
          </p>
        </div>

        {/* Action Bar Triggers */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('05')}
          >
            <GitBranch size={13} />
            <span>Traceability (Screen 05)</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('14')}
            style={{ color: '#E65100', borderColor: '#FFE0B2' }}
          >
            <HelpCircle size={13} />
            <span>Return Clarification (Screen 14)</span>
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => navigateTo('12')}
            style={{ background: '#D32F2F', color: '#FFF' }}
          >
            <RotateCcw size={13} />
            <span>FAIL / Reopen (Screen 12)</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('10')}
            style={{ background: '#006064', borderColor: '#004D40' }}
          >
            <Award size={13} />
            <span>Verify & Decide (Screen 10) &rarr;</span>
          </button>
        </div>
      </div>

      {/* Main 7-Section Working Dossier Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Sections 1, 2, 3, 4 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 1 — ORIGINAL STATUTORY FINDING */}
          <div className="card" style={{ padding: '18px', borderLeft: '4px solid #D32F2F' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#D32F2F', fontWeight: 800, textTransform: 'uppercase' }}>
                SECTION 1 — ORIGINAL STATUTORY FINDING
              </span>
              <span className="badge badge-subtle font-mono">{ver.findingId}</span>
            </div>

            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {ver.findingSummary.description}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '8px' }}>
              <strong>Observed Condition:</strong> {ver.findingSummary.observedCondition}
            </div>

            <div style={{ background: '#FFEBEE', padding: '8px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#B71C1C', display: 'flex', justifyContent: 'space-between' }}>
              <span>Regulatory Basis: <strong>{ver.findingSummary.regulatoryBasis}</strong></span>
              <span>Inspection: {ver.inspectionId} ({ver.findingSummary.inspectionDate})</span>
            </div>
          </div>

          {/* SECTION 2 & 4 — CORRECTIVE ACTION & COMPLETION */}
          <div className="card" style={{ padding: '18px', borderLeft: '4px solid #006064' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#006064', fontWeight: 800, textTransform: 'uppercase' }}>
                SECTIONS 2 & 4 — REMEDIATION EXECUTION & COMPLETION
              </span>
              <span className="badge badge-success font-bold">✓ COMPLETED</span>
            </div>

            <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              {ver.actionTitle}
            </div>
            <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {ver.actionDescription}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '4px', fontSize: '11.5px' }}>
              <div>Owner: <strong>{ver.actionOwner}</strong></div>
              <div>Due: <strong>{ver.verificationDueDate}</strong></div>
              <div>Completed: <strong style={{ color: '#2E7D32' }}>{ver.completionDate}</strong></div>
            </div>
          </div>

          {/* SECTION 3 — EXPECTED OUTCOME & MEASUREMENT CHECK */}
          <div className="card" style={{ padding: '18px', background: '#E0F7FA', border: '1.5px solid #80DEEA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#006064', fontWeight: 800, textTransform: 'uppercase' }}>
                SECTION 3 — MANDATED OUTCOME CRITERIA
              </span>
              <span className="badge badge-success font-bold">✓ THRESHOLD SATISFIED</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px', border: '1px solid #B2EBF2' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>STATUTORY MINIMUM:</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#006064', marginTop: '2px' }}>
                  {ver.expectedOutcome.requiredValue}
                </div>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px', border: '1px solid #B2EBF2' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>POST-ACTION CERTIFIED:</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1B5E20', marginTop: '2px' }}>
                  {ver.expectedOutcome.achievedValue}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sections 5, 6, 7 & Decision Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 5 — EVIDENCE ARTIFACTS VAULT */}
          <div className="card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: '#006064', fontWeight: 800, textTransform: 'uppercase' }}>
                SECTION 5 — VERIFICATION EVIDENCE ({ver.evidenceList.length} Items)
              </span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('06')}
                style={{ fontSize: '11px', padding: '2px 8px' }}
              >
                Deep Evidence Review &rarr;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ver.evidenceList.map(evd => (
                <div
                  key={evd.id}
                  onClick={() => openEvidenceViewer(evd)}
                  style={{
                    padding: '8px 10px',
                    background: 'var(--bg-surface-alt)',
                    borderRadius: '6px',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {evd.isMeasurement ? <Activity size={13} color="#006064" /> : <FileText size={13} color="#006064" />}
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{evd.title.substring(0, 32)}...</span>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '10px' }}>✓ {evd.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6 — VERIFIER 3-POINT ASSESSMENT */}
          <div className="card" style={{ padding: '18px', borderTop: '4px solid #006064' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#006064' }}>
              SECTION 6 — INDEPENDENT VERIFIER 3-POINT CHECKLIST
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={checkCompleted}
                  onChange={e => setCheckCompleted(e.target.checked)}
                />
                <span>Was the corrective action completed on-site?</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={checkEvidence}
                  onChange={e => setCheckEvidence(e.target.checked)}
                />
                <span>Is the submitted evidence authentic and sufficient?</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={checkOutcome}
                  onChange={e => setCheckOutcome(e.target.checked)}
                />
                <span>Does the evidence demonstrate statutory compliance (&ge; 5.5 m/s)?</span>
              </label>
            </div>

            {/* SECTION 7 — REMARKS */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', color: 'var(--text-muted)' }}>
                SECTION 7 — VERIFIER STATUTORY REMARKS
              </label>
              <textarea
                className="form-control"
                rows={2}
                value={verifierRemarks}
                onChange={e => setVerifierRemarks(e.target.value)}
                style={{ height: 'auto', fontSize: '12px' }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigateTo('10')}
              style={{ width: '100%', background: '#006064', borderColor: '#004D40', justifyContent: 'center' }}
            >
              <Award size={14} />
              <span>Proceed to Verification Decision (Screen 10) &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
