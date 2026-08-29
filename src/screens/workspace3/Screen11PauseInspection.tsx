"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  PauseCircle,
  AlertTriangle,
  ArrowLeft,
  Check,
  Shield,
  Clock,
  HardHat
} from 'lucide-react';

export const Screen11PauseInspection: React.FC = () => {
  const {
    activeInspection,
    checklistItems,
    observations,
    evidenceList,
    proposedFindings,
    pauseInspection,
    navigateTo,
    pauseReason,
    setPauseReason,
    pauseNotes,
    setPauseNotes
  } = useFieldInspection();

  const pauseReasons = [
    'Shift ended / Scheduled shift handover',
    'Emergency / Immediate evacuation alarm',
    'Weather / Surface storm impacting ventilation fans',
    'Network issue / Telemetry gateway offline',
    'Equipment unavailable / Powered off for repairs',
    'Safety restriction / Blasting gas clearance protocol',
    'Access restriction / Water accumulation in gallery',
    'Other operational pause'
  ];

  const completedCount = checklistItems.filter(c => c.status !== 'Pending').length;
  const measurementCount = checklistItems.filter(c => c.measurementValue).length;

  const handleConfirmPause = () => {
    pauseInspection(pauseReason, pauseNotes);
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
            <span className="badge badge-warning">OPERATIONAL SUSPENSION</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            PAUSE FIELD INSPECTION
          </h1>
          <p className="screen-subtitle">
            Temporarily suspend active execution session while preserving all local measurements & evidence
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '24px', borderTop: '4px solid #F57C00', marginBottom: '20px' }}>
        
        {/* Current State Summary Snapshot */}
        <div style={{ background: 'var(--bg-surface-subtle)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
            Current Execution Snapshot (Saved Locally)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', textAlign: 'center' }}>
            <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#FF6B00' }}>{completedCount}/22</div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Checks Done</div>
            </div>
            <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#5932A5' }}>{observations.length}</div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Observations</div>
            </div>
            <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#1976D2' }}>{evidenceList.length}</div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Evidence Items</div>
            </div>
            <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#2E7D32' }}>{measurementCount}</div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Measurements</div>
            </div>
            <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#D32F2F' }}>{proposedFindings.length}</div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Findings</div>
            </div>
          </div>
        </div>

        {/* Reason Selection */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
            Statutory Reason for Pausing Inspection (Required):
          </label>
          <select
            className="form-control"
            value={pauseReason}
            onChange={e => setPauseReason(e.target.value)}
            style={{ fontSize: '13px', padding: '10px' }}
          >
            {pauseReasons.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
            Operational Notes & Safety Clearance Remarks (Optional):
          </label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="e.g. Blasting window scheduled in adjacent Seam VII district. Team relocating to Fresh Air Base..."
            value={pauseNotes}
            onChange={e => setPauseNotes(e.target.value)}
            style={{ fontSize: '13px', lineHeight: 1.5 }}
          />
        </div>

        {/* Reassurance Notice */}
        <div
          style={{
            background: 'var(--status-green-bg)',
            borderLeft: '4px solid #2E7D32',
            padding: '12px 16px',
            borderRadius: '4px',
            marginBottom: '24px',
            fontSize: '12px',
            color: '#1B5E20'
          }}
        >
          ✓ <strong>Local State Guarantee:</strong> All saved field records, GPS tags, photos, and measurements will remain cached in SQLite local storage and will be instantly available when you click Resume.
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('06')}>
            <ArrowLeft size={14} />
            <span>Cancel & Continue Execution</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={handleConfirmPause}
            style={{ background: '#F57C00', borderColor: '#F57C00', padding: '10px 24px' }}
          >
            <PauseCircle size={15} />
            <span>Confirm & Pause Inspection</span>
          </button>
        </div>

      </div>
    </div>
  );
};
