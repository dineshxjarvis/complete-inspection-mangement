"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  RotateCcw,
  AlertTriangle,
  FileText,
  Camera,
  Eye,
  Check,
  ArrowRight,
  GitBranch,
  Clock,
  Shield,
  ArrowLeft
} from 'lucide-react';

export const Screen18ReturnedInspection: React.FC = () => {
  const {
    activeInspection,
    resubmitReturnedInspection,
    navigateTo,
    showToast
  } = useFieldInspection();

  const handleOpenItem = () => {
    navigateTo('08', { checklistId: 'REQ-VENT-014' });
  };

  const handleAddEvidence = () => {
    navigateTo('12');
  };

  const handleCorrectObservation = () => {
    navigateTo('10');
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
            <span className="status-pill status-rejected" style={{ fontSize: '12px', padding: '4px 12px' }}>
              ● RETURNED FOR CLARIFICATION
            </span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            RETURNED INSPECTION REMEDIATION
          </h1>
          <p className="screen-subtitle">
            Address specific technical reviewer comments, upload supplementary calibration certificates, and resubmit
          </p>
        </div>

        <button className="btn btn-secondary" onClick={() => navigateTo('02')}>
          <ArrowLeft size={14} />
          <span>My Inspections</span>
        </button>
      </div>

      {/* Reviewer Notice Card */}
      <div className="card" style={{ padding: '24px', borderLeft: '4px solid #D32F2F', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Returned By</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {activeInspection.returnedBy || 'Dr. A. B. Roy (Authorized DGMS Reviewer)'}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Returned Date</div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>
              {activeInspection.returnedAt || '16 Nov 2026 09:15 IST'}
            </div>
          </div>
        </div>

        {/* SECTION: REVIEWER COMMENT */}
        <div style={{ background: 'var(--status-red-bg)', border: '1px solid var(--status-red-border)', padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#B71C1C', textTransform: 'uppercase', marginBottom: '4px' }}>
            Official Reviewer Comment & Deficiency Notice:
          </div>
          <div style={{ fontSize: '13.5px', color: '#B71C1C', lineHeight: 1.5 }}>
            "{activeInspection.returnComment || 'Evidence for ventilation measurement at REQ-VENT-014 requires clarification. Please attach the certified OEM calibration certificate for Vane Anemometer SN-AN-4491 to rule out instrument drift.'}"
          </div>
        </div>

        {/* SECTION: ITEMS REQUIRING ACTION */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '10px' }}>
            ITEMS REQUIRING REMEDIATION ACTION (1 ITEM)
          </h3>

          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-surface-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-mono" style={{ fontSize: '12px', fontWeight: 700, color: '#5932A5' }}>
                  REQ-VENT-014
                </span>
                <span className="badge badge-danger">Critical</span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>LVC Airflow Measurement</span>
              </div>
              <div style={{ fontSize: '12px', color: '#D32F2F', marginTop: '4px' }}>
                <strong>Issue:</strong> Measurement evidence unclear. Reading 210.4 m³/min requires calibration certificate verification.
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                <strong>Required Action:</strong> Attach certified calibration certificate DOC-CAL-AN-4491.pdf.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={handleOpenItem}>
                <FileText size={12} />
                <span>Open Item</span>
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleAddEvidence}>
                <Camera size={12} />
                <span>Add Evidence</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION: RETURN & CORRECTION TIMELINE */}
        <div style={{ background: 'var(--bg-surface-alt)', padding: '14px 16px', borderRadius: '6px', marginBottom: '24px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Correction Lifecycle Trail
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="font-mono" style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>v1</span>
              <span>Submitted: 15 Nov 16:42</span>
            </div>
            <span>&rarr;</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D32F2F', fontWeight: 600 }}>
              <span className="font-mono" style={{ background: 'var(--status-red-bg)', padding: '2px 6px', borderRadius: '4px' }}>v2</span>
              <span>Returned: 16 Nov 09:15 (Reviewer Dr. Roy)</span>
            </div>
            <span>&rarr;</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2E7D32', fontWeight: 700 }}>
              <span className="font-mono" style={{ background: 'var(--status-green-bg)', padding: '2px 6px', borderRadius: '4px' }}>v3</span>
              <span>Pending Resubmission</span>
            </div>
          </div>
        </div>

        {/* Quick Correction Triggers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={handleCorrectObservation}>
              <Eye size={13} />
              <span>Correct Observation</span>
            </button>
            <button className="btn btn-secondary" onClick={() => navigateTo('19')}>
              <GitBranch size={13} />
              <span>View Review History</span>
            </button>
          </div>

          <button
            className="btn btn-primary"
            onClick={resubmitReturnedInspection}
            style={{
              background: 'linear-gradient(135deg, #2E7D32, #1B5E20)',
              borderColor: '#2E7D32',
              padding: '10px 28px',
              fontSize: '13.5px',
              fontWeight: 700
            }}
          >
            <RotateCcw size={15} />
            <span>Resubmit Corrected Inspection (v3)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
