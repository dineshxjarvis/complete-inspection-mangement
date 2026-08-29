"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  X,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Upload,
  FileText,
  Calendar,
  Send
} from 'lucide-react';

export const CapaUpdateModal: React.FC = () => {
  const {
    isCapaUpdateModalOpen,
    setIsCapaUpdateModalOpen,
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
  const [uploadedFile, setUploadedFile] = useState<string>('interim_velocity_test_24Nov.pdf');

  if (!isCapaUpdateModalOpen) return null;

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
      comment || `Progress updated to ${progress}%. ${status === 'Blocked' ? 'Blocked: ' + blockedReason : ''}`,
      uploadedFile
    );

    if (progress === 100 || status === 'Completed') {
      showToast('CAPA marked 100% complete! Proceeding to Submit for Verification in Workspace 06.', 'success');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(3px)',
        zIndex: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsCapaUpdateModalOpen(false)}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'var(--bg-surface-alt)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="id-badge font-mono" style={{ background: 'rgba(0, 137, 123, 0.15)', color: '#00796B' }}>
                {activeCapa.id}
              </span>
              <span className="badge badge-warning">PRIORITY: {activeCapa.priority}</span>
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              UPDATE CAPA PROGRESS
            </h2>
          </div>
          <button
            onClick={() => setIsCapaUpdateModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Action Description
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
              {activeCapa.actionDescription}
            </div>
          </div>

          {/* Progress Slider */}
          <div style={{ marginBottom: '18px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Progress Completion (%)
              </label>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#00897B', fontFamily: 'monospace' }}>
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
              style={{ width: '100%', accentColor: '#00897B', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>0% (Not Started)</span>
              <span>50% (Halfway)</span>
              <span>100% (Ready for Verification)</span>
            </div>
          </div>

          {/* Status Select */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Execution Status *
            </label>
            <select
              className="form-control"
              value={status}
              onChange={e => {
                setStatus(e.target.value);
                if (e.target.value === 'Completed') setProgress(100);
              }}
              required
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed (Ready for Independent Verification)</option>
              <option value="Blocked">Blocked / Operational Impediment</option>
            </select>
          </div>

          {/* Blocked Reason (conditional) */}
          {status === 'Blocked' && (
            <div style={{ marginBottom: '16px', background: '#FFEBEE', border: '1px solid #FFCDD2', padding: '12px', borderRadius: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 700, color: '#B71C1C', marginBottom: '6px' }}>
                <AlertTriangle size={13} />
                <span>Blocked Reason (Mandatory) *</span>
              </label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="Explain the specific statutory, equipment, or geological block preventing completion..."
                value={blockedReason}
                onChange={e => setBlockedReason(e.target.value)}
                required
                style={{ height: 'auto', background: '#FFF' }}
              />
            </div>
          )}

          {/* Progress Comment */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Progress Remarks / Actions Taken
            </label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Detail technical work completed since previous milestone..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              style={{ height: 'auto' }}
            />
          </div>

          {/* Evidence Upload */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Attach Verification Evidence Artifact
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  background: 'var(--bg-surface-alt)',
                  border: '1px dashed var(--border-color)',
                  borderRadius: '4px',
                  fontSize: '11.5px',
                  color: 'var(--text-secondary)'
                }}
              >
                <FileText size={14} color="#00897B" />
                <span>{uploadedFile || 'No file selected'}</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setUploadedFile(`post_repair_survey_${Date.now().toString().slice(-4)}.pdf`);
                  showToast('Sample evidence document attached', 'info');
                }}
              >
                <Upload size={12} />
                <span>Upload New</span>
              </button>
            </div>
          </div>

          {/* Next Review Date */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Next Statutory Review Milestone Date
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={15} color="var(--text-muted)" />
              <input
                type="date"
                className="form-control"
                value={nextReviewDate}
                onChange={e => setNextReviewDate(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div
            style={{
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px'
            }}
          >
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsCapaUpdateModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ background: '#00897B', borderColor: '#00796B' }}
            >
              <CheckCircle size={14} />
              <span>Save Progress Update</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
