"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  AlertTriangle,
  Shield,
  ArrowLeft,
  Check,
  X,
  FileText
} from 'lucide-react';

export const Screen09NAUnableToVerify: React.FC = () => {
  const {
    activeChecklistId,
    checklistItems,
    markChecklistStatus,
    navigateTo,
    showToast
  } = useFieldInspection();

  const item = checklistItems.find(c => c.id === activeChecklistId) || checklistItems[0];

  const [responseType, setResponseType] = useState<'N/A' | 'Unable to Verify'>('N/A');
  const [controlledReason, setControlledReason] = useState<string>('Condition not present in current working face');
  const [justificationNotes, setJustificationNotes] = useState<string>('');

  const naReasons = [
    'Outside assigned inspection scope',
    'Condition not present in current working face',
    'Requirement not applicable to this seam classification',
    'Equipment not installed in target district',
    'Other (Detailed justification required)'
  ];

  const unableReasons = [
    'Physical access unavailable / Waterlogged gallery',
    'Target equipment powered down for scheduled overhaul',
    'Safety restriction (Active blasting gas clearance in progress)',
    'Required statutory specialist unavailable on shift',
    'Operational restriction / Roof strata condition prohibitive',
    'Evidence unavailable on-site',
    'Other (Detailed justification required)'
  ];

  const handleSave = () => {
    if (!justificationNotes.trim()) {
      showToast('Mandatory technical justification note is required by DGMS statutory governance.', 'error');
      return;
    }

    markChecklistStatus(
      item.id,
      responseType,
      responseType === 'N/A' ? `${controlledReason}: ${justificationNotes}` : undefined,
      responseType === 'Unable to Verify' ? `${controlledReason}: ${justificationNotes}` : undefined
    );

    showToast(`Response ${responseType} recorded with justification for ${item.id}`, 'success');
    navigateTo('07');
  };

  return (
    <div className="screen-content" style={{ maxWidth: '780px', margin: '0 auto' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {item.id}
            </span>
            <span className="badge badge-warning">CONDITIONAL JUSTIFICATION</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            STATUTORY EXCEPTION JUSTIFICATION
          </h1>
          <p className="screen-subtitle">
            Provide formal justification for Not Applicable (N/A) or Unable to Verify determinations
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '24px', borderTop: '4px solid #7C4DFF', marginBottom: '20px' }}>
        
        {/* Requirement Context */}
        <div style={{ background: 'var(--bg-surface-subtle)', padding: '14px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', color: '#5932A5', fontWeight: 700, textTransform: 'uppercase' }}>
            Requirement Under Evaluation
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {item.text}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {item.regulatoryTrace.regulation} &bull; {item.regulatoryTrace.clause}
          </div>
        </div>

        {/* Response Type Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '8px' }}>
            Select Exception Status:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button
              type="button"
              onClick={() => {
                setResponseType('N/A');
                setControlledReason(naReasons[0]);
              }}
              style={{
                padding: '14px',
                borderRadius: '8px',
                border: `2px solid ${responseType === 'N/A' ? '#7C4DFF' : 'var(--border-color)'}`,
                background: responseType === 'N/A' ? 'var(--status-purple-bg)' : 'var(--bg-surface)',
                color: responseType === 'N/A' ? '#4527A0' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '14px', marginBottom: '4px' }}>🚫 NOT APPLICABLE (N/A)</div>
              <div style={{ fontSize: '11.5px', fontWeight: 400, opacity: 0.85 }}>
                Requirement is outside scope or physical condition is not present.
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setResponseType('Unable to Verify');
                setControlledReason(unableReasons[0]);
              }}
              style={{
                padding: '14px',
                borderRadius: '8px',
                border: `2px solid ${responseType === 'Unable to Verify' ? '#F57C00' : 'var(--border-color)'}`,
                background: responseType === 'Unable to Verify' ? 'var(--status-amber-bg)' : 'var(--bg-surface)',
                color: responseType === 'Unable to Verify' ? '#E65100' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '14px', marginBottom: '4px' }}>⚠️ UNABLE TO VERIFY</div>
              <div style={{ fontSize: '11.5px', fontWeight: 400, opacity: 0.85 }}>
                Access restriction, safety hazard or operational unavailability prevented test.
              </div>
            </button>
          </div>
        </div>

        {/* Controlled Reason Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
            Primary Controlled Reason (Required):
          </label>
          <select
            className="form-control"
            value={controlledReason}
            onChange={e => setControlledReason(e.target.value)}
            style={{ fontSize: '13px', padding: '10px' }}
          >
            {(responseType === 'N/A' ? naReasons : unableReasons).map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Detailed Technical Justification Note */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
            Technical Justification & Inspector Remarks (Mandatory):
          </label>
          <textarea
            className="form-control"
            rows={4}
            placeholder="Explain why this requirement was not checked, cite operational logs, shift conditions, or physical boundaries..."
            value={justificationNotes}
            onChange={e => setJustificationNotes(e.target.value)}
            style={{ fontSize: '13px', lineHeight: 1.5 }}
          />
        </div>

        {/* Governance Warning */}
        <div
          style={{
            background: 'var(--status-red-bg)',
            borderLeft: '4px solid #D32F2F',
            padding: '12px 16px',
            borderRadius: '4px',
            marginBottom: '24px',
            fontSize: '12px',
            color: '#B71C1C'
          }}
        >
          <strong>Statutory Governance Constraint:</strong> Do not silently convert an incomplete item into N/A. Every exception creates a permanent audit record and will be reviewed by the Authorized DGMS Reviewer during post-inspection approval.
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('08', { checklistId: item.id })}>
            <ArrowLeft size={14} />
            <span>Cancel & Return</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSave}
            style={{ background: '#7C4DFF', borderColor: '#7C4DFF', padding: '10px 24px' }}
          >
            <Check size={15} />
            <span>Save Justification & Return to Checklist</span>
          </button>
        </div>

      </div>
    </div>
  );
};
