"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  FileCheck,
  Shield
} from 'lucide-react';

export const Screen17SubmissionModal: React.FC = () => {
  const {
    activeInspection,
    checklistItems,
    observations,
    evidenceList,
    proposedFindings,
    submitInspection,
    navigateTo,
    finalRemarks
  } = useFieldInspection();

  const handleConfirmSubmit = () => {
    submitInspection();
  };

  return (
    <div className="screen-content" style={{ maxWidth: '780px', margin: '0 auto' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-success">FINAL STAGE</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            FORMAL INSPECTION SUBMISSION
          </h1>
          <p className="screen-subtitle">
            Statutory submission to Workspace 03 Review & Approval queue & DGMS Regulatory Spine
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '28px', borderTop: '4px solid #2E7D32', marginBottom: '20px' }}>
        
        {/* Final Execution Totals */}
        <div style={{ background: 'var(--bg-surface-subtle)', padding: '18px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
            Official Field Record Summary
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Checklist Evaluation</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#2E7D32' }}>22 / 22 Evaluated</div>
            </div>

            <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Field Observations</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#5932A5' }}>{observations.length} Logged</div>
            </div>

            <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Evidence Records</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#1976D2' }}>{evidenceList.length} Files</div>
            </div>

            <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Instrument Readings</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#FF6B00' }}>10 Readings</div>
            </div>

            <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Proposed Findings</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#D32F2F' }}>{proposedFindings.length} Violations</div>
            </div>

            <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Lead Inspector</div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>R. Sharma</div>
            </div>
          </div>
        </div>

        {/* Validation Confirmation */}
        <div style={{ background: 'var(--status-green-bg)', border: '1px solid var(--status-green-border)', padding: '14px', borderRadius: '6px', marginBottom: '20px' }}>
          <div style={{ fontSize: '12.5px', color: '#1B5E20', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <CheckCircle size={16} />
            <span>Statutory Validation Checks Passed</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#2E7D32' }}>
            ✓ Checklist complete &bull; ✓ Evidence requirements satisfied &bull; ✓ Field review complete &bull; ✓ Affirmations signed
          </div>
        </div>

        {/* Legal Disclaimer & Warning */}
        <div
          style={{
            background: '#FFF3E0',
            borderLeft: '4px solid #F57C00',
            padding: '14px 16px',
            borderRadius: '4px',
            marginBottom: '24px',
            fontSize: '12.5px',
            color: '#E65100',
            lineHeight: 1.5
          }}
        >
          <strong>Statutory Governance Warning:</strong> After submission, all field records become part of the formal, immutable inspection record under Coal Mines Regulations 2017. Further modifications will be locked and can only be updated through the authorized Reviewer Return/Clarification workflow.
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('16')}>
            <ArrowLeft size={14} />
            <span>Return to Review</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={handleConfirmSubmit}
            style={{
              background: 'linear-gradient(135deg, #2E7D32, #1B5E20)',
              borderColor: '#2E7D32',
              padding: '12px 32px',
              fontSize: '14px',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(46, 125, 50, 0.4)'
            }}
          >
            <ShieldCheck size={16} />
            <span>CONFIRM & SUBMIT INSPECTION</span>
          </button>
        </div>

      </div>
    </div>
  );
};
