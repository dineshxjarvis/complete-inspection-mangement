"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  PlayCircle,
  Clock,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  Shield,
  MapPin,
  Calendar,
  LogOut
} from 'lucide-react';

export const Screen11APausedState: React.FC = () => {
  const {
    activeInspection,
    resumeInspection,
    navigateTo,
    checklistItems,
    observations,
    evidenceList,
    pauseReason,
    pauseNotes,
    showToast
  } = useFieldInspection();

  const completedCount = checklistItems.filter(c => c.status !== 'Pending').length;

  return (
    <div className="screen-content" style={{ maxWidth: '820px', margin: '0 auto' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="status-pill status-pending" style={{ fontSize: '12px', padding: '4px 12px' }}>
              ⏸ PAUSED
            </span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            INSPECTION CURRENTLY PAUSED
          </h1>
          <p className="screen-subtitle">
            Execution state preserved in local encrypted storage. Ready for immediate resumption.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={resumeInspection}
          style={{ background: '#2E7D32', borderColor: '#2E7D32', padding: '10px 24px', fontSize: '13.5px', fontWeight: 700 }}
        >
          <PlayCircle size={16} />
          <span>Resume Inspection</span>
        </button>
      </div>

      <div className="card" style={{ padding: '24px', borderLeft: '4px solid #F57C00', marginBottom: '20px' }}>
        
        {/* Pause Details Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px', background: 'var(--bg-surface-subtle)', padding: '14px', borderRadius: '8px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reason</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#E65100' }}>
              {pauseReason || 'Shift ended'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Paused At</div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>
              {activeInspection.pausedAt || '14:05 IST'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Paused By</div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>
              R. Sharma (Lead)
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Progress</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#2E7D32' }}>
              {completedCount} / 22 Checks
            </div>
          </div>
        </div>

        {/* Local Storage & Sync Status Badges */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--status-green-bg)', color: '#1B5E20', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
            <CheckCircle size={14} /> Saved Locally (SQLite Encrypted)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--status-blue-bg)', color: '#1A237E', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
            <CheckCircle size={14} /> Telemetry Checkpoint Committed
          </div>
        </div>

        {/* Operational Resume Conditions */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Statutory Resumption Conditions
          </h3>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Inspection may be resumed when the field activity can safely continue (e.g. post-blasting gas clearance verified by Mining Sirdar, or next shift crew deployment). All previously logged measurements, photos, and observations remain completely untouched.
          </p>
        </div>

        {/* Action Options */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              showToast('Navigating to Workspace 01 Planning for reschedule request', 'info');
            }}
          >
            <Calendar size={14} />
            <span>Request Manager Reschedule</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => navigateTo('01')}
            >
              <LogOut size={14} />
              <span>Save & Exit to Dashboard</span>
            </button>

            <button
              className="btn btn-primary"
              onClick={resumeInspection}
              style={{ background: '#2E7D32', borderColor: '#2E7D32', fontWeight: 700 }}
            >
              <PlayCircle size={15} />
              <span>Resume Field Inspection</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
