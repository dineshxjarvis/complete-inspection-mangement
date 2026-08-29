"use client";

import React, { useState } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import { CapaStatus, BlockerReason } from '../../types/correctiveAction';
import {
  PlayCircle,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  Shield,
  MessageSquare,
  Lock
} from 'lucide-react';

export const Screen06UpdateProgress: React.FC = () => {
  const {
    activeCapa,
    updateProgress,
    navigateTo,
    showToast
  } = useCorrectiveAction();

  const [progress, setProgress] = useState<number>(activeCapa.progressPercentage);
  const [status, setStatus] = useState<CapaStatus>(activeCapa.capaStatus);
  const [comment, setComment] = useState<string>('Ventilation shutter realignment completed. Post-repair anemometer traverse scheduled.');
  const [blockerReason, setBlockerReason] = useState<BlockerReason>('Equipment unavailable');
  const [expectedResolutionDate, setExpectedResolutionDate] = useState<string>('02 Dec 2026');

  const statusOptions: CapaStatus[] = [
    'ASSIGNED',
    'IN PROGRESS',
    'BLOCKED',
    'COMPLETED',
    'AWAITING VERIFICATION'
  ];

  const blockerOptions: BlockerReason[] = [
    'Equipment unavailable',
    'Spare parts unavailable',
    'Mine operational restriction',
    'Safety restriction',
    'Vendor dependency',
    'Regulatory dependency',
    'Weather',
    'Personnel unavailable',
    'Other'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProgress(activeCapa.id, progress, status, comment);
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
              UPDATE PROGRESS & STATUS
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            MILESTONE PROGRESS UPDATE &bull; {activeCapa.id}
          </h1>
          <p className="screen-subtitle">
            Log operational milestone progression, adjust completion percentages, and record detailed engineering remarks
          </p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: Progress Slider & Status Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Progress Percentage Meter & Slider */}
            <div className="card" style={{ padding: '20px', borderLeft: '4px solid #00695C' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#004D40' }}>
                  Completion Progress Percentage
                </label>
                <span className="badge badge-primary font-mono font-bold" style={{ fontSize: '14px', background: '#00695C', color: '#FFF' }}>
                  {progress}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progress}
                onChange={e => setProgress(Number(e.target.value))}
                style={{ width: '100%', height: '8px', cursor: 'pointer', accentColor: '#00695C', marginBottom: '10px' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>0% (Not Started)</span>
                <span>50% (Mechanical Assembly)</span>
                <span>100% (Ready for Verification)</span>
              </div>
            </div>

            {/* Operational Status Selector */}
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Select Operational Execution Status
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {statusOptions.map(opt => {
                  const isSelected = status === opt;
                  const isBlocked = opt === 'BLOCKED';

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setStatus(opt)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '6px',
                        border: `1.5px solid ${isSelected ? (isBlocked ? '#D32F2F' : '#00695C') : 'var(--border-color)'}`,
                        background: isSelected ? (isBlocked ? '#FFEBEE' : '#E0F2F1') : 'var(--bg-surface-alt)',
                        color: isSelected ? (isBlocked ? '#B71C1C' : '#004D40') : 'var(--text-primary)',
                        fontWeight: isSelected ? 800 : 500,
                        fontSize: '11.5px',
                        cursor: 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blocked Reason Details (Conditional) */}
            {status === 'BLOCKED' && (
              <div className="card" style={{ padding: '20px', background: '#FFF5F5', border: '1px solid #FFCDD2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <AlertTriangle size={16} color="#D32F2F" />
                  <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#B71C1C' }}>
                    Mandatory Blocker Reason & Extension
                  </h3>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Blocker Classification *
                  </label>
                  <select
                    className="form-control"
                    value={blockerReason}
                    onChange={e => setBlockerReason(e.target.value as any)}
                  >
                    {blockerOptions.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Expected Resolution Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={expectedResolutionDate}
                    onChange={e => setExpectedResolutionDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Action Owner Comments */}
            <div className="card" style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Action Owner Log Remarks *
              </label>
              <textarea
                className="form-control"
                rows={3}
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
                style={{ height: 'auto', fontSize: '12.5px' }}
              />
            </div>
          </div>

          {/* Right Column: Governance Audit Callout & Save Action */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #00695C' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#004D40', textTransform: 'uppercase', marginBottom: '6px' }}>
                AUDIT COMMITMENT
              </div>
              <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Saving this progress update generates an immutable audit record in STRATA. Original statutory deadlines remain non-alterable without formal reviewer extension approval.
              </p>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', background: '#00695C', borderColor: '#004D40', justifyContent: 'center' }}
              >
                <span>Save Progress Update & Audit &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
