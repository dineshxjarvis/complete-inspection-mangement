"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Upload,
  Calendar,
  ChevronLeft,
  FileText,
  ShieldCheck,
  ArrowRight,
  Layers
} from 'lucide-react';

export const Screen18CapaProgressUpdate: React.FC = () => {
  const {
    activeCapa,
    updateCapaProgress,
    navigateTo,
    showToast
  } = useMineResponse();

  const [progress, setProgress] = useState<number>(activeCapa.progressPercentage || 60);
  const [status, setStatus] = useState<string>(activeCapa.status || 'In Progress');
  const [blockedReason, setBlockedReason] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [nextReviewDate, setNextReviewDate] = useState<string>('2026-11-28');
  const [uploadedFile, setUploadedFile] = useState<string>('interim_velocity_test_log.pdf');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'Blocked' && !blockedReason.trim()) {
      showToast('Blocked Reason is mandatory when status is set to Blocked', 'error');
      return;
    }

    updateCapaProgress(
      activeCapa.id,
      progress,
      status,
      comment || `Progress milestone updated to ${progress}%. ${status === 'Blocked' ? 'Blocked: ' + blockedReason : ''}`,
      uploadedFile
    );

    if (progress === 100 || status === 'Completed') {
      showToast('CAPA 100% Completed! Handing off to Workspace 06 (CAPA Independent Verification)', 'success');
      navigateTo('13');
    } else {
      navigateTo('13');
    }
  };

  return (
    <div className="screen-content" style={{ maxWidth: '860px', margin: '0 auto' }}>
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('13')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to CAPA Details</span>
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
              {activeCapa.id}
            </span>
            <span className="badge badge-warning">CURRENT PROGRESS: {activeCapa.progressPercentage}%</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            UPDATE CAPA PROGRESS MILESTONE
          </h1>
          <p className="screen-subtitle">
            Action: <strong>{activeCapa.title}</strong> &bull; Owner: {activeCapa.responsiblePerson} ({activeCapa.department})
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleSave}
          style={{ background: '#00897B', borderColor: '#00796B' }}
        >
          <CheckCircle size={14} />
          <span>Save & Seal Milestone</span>
        </button>
      </div>

      {/* Main Update Card */}
      <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Action Scope Recap */}
          <div style={{ background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Statutory Action Commitment
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px', lineHeight: 1.4 }}>
              {activeCapa.actionDescription}
            </div>
          </div>

          {/* Progress Slider (Interactive 0 to 100%) */}
          <div style={{ background: 'rgba(0, 137, 123, 0.05)', border: '1px solid rgba(0, 137, 123, 0.25)', padding: '16px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#004D40', textTransform: 'uppercase' }}>
                Remediation Completion Percentage
              </label>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#00796B', fontFamily: 'monospace' }}>
                {progress}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={progress}
              onChange={e => {
                const val = Number(e.target.value);
                setProgress(val);
                if (val === 100) setStatus('Completed');
                else if (val > 0 && status === 'Not Started') setStatus('In Progress');
              }}
              style={{ width: '100%', height: '8px', accentColor: '#00897B', cursor: 'pointer' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
              <span>0% (Not Started)</span>
              <span>50% (Mechanical Assembly)</span>
              <span>80% (Airflow Traverse Test)</span>
              <span style={{ fontWeight: 700, color: '#2E7D32' }}>100% (Ready for WS06 Verification)</span>
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
              Operational Status *
            </label>
            <select
              className="form-control"
              value={status}
              onChange={e => {
                setStatus(e.target.value);
                if (e.target.value === 'Completed') setProgress(100);
              }}
              required
              style={{ fontSize: '13px' }}
            >
              <option value="In Progress">In Progress (Execution underway)</option>
              <option value="Completed">Completed (100% Remediation & Proof attached)</option>
              <option value="Blocked">Blocked (Operational / Geological Impediment)</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>

          {/* Blocked Reason (Enforced if status === 'Blocked') */}
          {status === 'Blocked' && (
            <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', padding: '14px', borderRadius: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 700, color: '#B71C1C', marginBottom: '6px' }}>
                <AlertTriangle size={14} />
                <span>Statutory Blocked Reason (Mandatory) *</span>
              </label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Explain the specific statutory, equipment, spare part, or geological block preventing completion..."
                value={blockedReason}
                onChange={e => setBlockedReason(e.target.value)}
                required
                style={{ height: 'auto', background: '#FFF', fontSize: '12.5px' }}
              />
            </div>
          )}

          {/* Progress Remarks */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
              Technical Work Completed & Milestone Remarks
            </label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Detail aerodynamic testing, blade angle adjustments, or repair certifications performed..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              style={{ height: 'auto', fontSize: '12.5px' }}
            />
          </div>

          {/* Supporting Evidence Attachment */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
              Attach Verification Evidence Artifact
            </label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: 'var(--bg-surface-alt)',
                  border: '1px dashed var(--border-color)',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              >
                <FileText size={15} color="#00897B" />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{uploadedFile}</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setUploadedFile(`post_repair_survey_${Date.now().toString().slice(-4)}.pdf`);
                  showToast('Verification survey sheet attached', 'info');
                }}
              >
                <Upload size={12} />
                <span>Upload New Artifact</span>
              </button>
            </div>
          </div>

          {/* Next Review Milestone Date */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
              Next Internal Review Milestone Date
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} color="var(--text-muted)" />
              <input
                type="date"
                className="form-control"
                value={nextReviewDate}
                onChange={e => setNextReviewDate(e.target.value)}
                style={{ fontSize: '12.5px' }}
              />
            </div>
          </div>

          {/* Workspace 06 Verification Banner if 100% */}
          {progress === 100 && (
            <div style={{ background: '#E8F5E9', border: '1px solid #C8E6C9', padding: '14px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={24} color="#2E7D32" />
              <div style={{ fontSize: '12px', color: '#1B5E20', lineHeight: 1.4 }}>
                <strong>Verification Ready:</strong> Marking progress at 100% automatically compiles the completed CAPA dossier and queues it for independent statutory verification by <strong>{activeCapa.verifier}</strong> in <strong>Workspace 06</strong>.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigateTo('13')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ background: '#00897B', borderColor: '#00796B', padding: '10px 20px' }}
            >
              <CheckCircle size={15} />
              <span>Save Progress Milestone (Screen 18)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
