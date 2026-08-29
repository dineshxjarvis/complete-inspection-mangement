"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  Camera,
  FileText,
  Gauge,
  Video,
  MapPin,
  Clock,
  CheckCircle,
  ArrowLeft,
  Upload,
  Plus,
  Shield,
  Save
} from 'lucide-react';

export const Screen12EvidenceCapture: React.FC = () => {
  const {
    activeInspection,
    checklistItems,
    evidenceList,
    addEvidence,
    navigateTo,
    setCameraModalOpen,
    setCameraTargetId,
    showToast
  } = useFieldInspection();

  const [evidenceType, setEvidenceType] = useState<'PHOTO' | 'DOCUMENT' | 'MEASUREMENT' | 'VIDEO'>('PHOTO');
  const [title, setTitle] = useState<string>('Airflow Anemometer Measurement at Seam VII LVC');
  const [linkedChecklistId, setLinkedChecklistId] = useState<string>('REQ-VENT-014');
  const [measValue, setMeasValue] = useState<string>('210.4');
  const [measUnit, setMeasUnit] = useState<string>('m³/min');
  const [instrument, setInstrument] = useState<string>('Digital Vane Anemometer (SN-AN-4491)');

  const handleSaveEvidence = () => {
    if (!title.trim()) {
      showToast('Please enter an evidence title.', 'error');
      return;
    }

    addEvidence({
      inspectionId: activeInspection.id,
      type: evidenceType,
      title: title,
      previewUrl: evidenceType === 'PHOTO' ? '/evidence/lvc_anemometer_reading.jpg' : undefined,
      fileSize: evidenceType === 'PHOTO' ? '3.4 MB (JPEG)' : evidenceType === 'DOCUMENT' ? '1.8 MB (PDF)' : '14 KB',
      value: evidenceType === 'MEASUREMENT' ? measValue : undefined,
      unit: evidenceType === 'MEASUREMENT' ? measUnit : undefined,
      instrument: evidenceType === 'MEASUREMENT' ? instrument : undefined,
      linkedChecklistId,
      capturedBy: 'R. Sharma (Lead Inspector)',
      gpsCoordinates: '23.6841° N, 86.9532° E (Level -320m RL)',
      device: 'ToughPad G2 Industrial (DGMS Safe S/N: TP-8842)'
    });

    showToast('Evidence logged with cryptographic hash & geotag', 'success');
    navigateTo('06');
  };

  const handleOpenLiveCamera = () => {
    setCameraTargetId(linkedChecklistId);
    setCameraModalOpen(true);
  };

  return (
    <div className="screen-content" style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-info">EVIDENCE LOGGER</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            CAPTURE FIELD EVIDENCE
          </h1>
          <p className="screen-subtitle">
            Attach optical photos, calibrated telemetry readings, digital documents, and video recordings
          </p>
        </div>

        <button className="btn btn-secondary" onClick={() => navigateTo('06')}>
          <ArrowLeft size={14} />
          <span>Execution Overview</span>
        </button>
      </div>

      <div className="card" style={{ padding: '24px', borderTop: '4px solid #1976D2', marginBottom: '20px' }}>
        
        {/* Evidence Type Tabs */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>
            Select Evidence Modality:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {[
              { type: 'PHOTO', label: '📸 Photo Evidence', desc: 'Watermarked image' },
              { type: 'MEASUREMENT', label: '📊 Instrument Measurement', desc: 'Calibrated reading' },
              { type: 'DOCUMENT', label: '📄 PDF / Scan', desc: 'Statutory logbook' },
              { type: 'VIDEO', label: '🎥 Video Clip', desc: 'Approved FLP stream' }
            ].map(m => (
              <button
                key={m.type}
                type="button"
                onClick={() => setEvidenceType(m.type as any)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: `2px solid ${evidenceType === m.type ? '#1976D2' : 'var(--border-color)'}`,
                  background: evidenceType === m.type ? 'var(--status-blue-bg)' : 'var(--bg-surface)',
                  color: evidenceType === m.type ? '#1A237E' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div>{m.label}</div>
                <div style={{ fontSize: '10.5px', fontWeight: 400, opacity: 0.85, marginTop: '2px' }}>{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Title & Context Link */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px', marginBottom: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Evidence Title / Description:
            </label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. LVC Anemometer Flow Reading..."
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Linked Statutory Check:
            </label>
            <select
              className="form-control"
              value={linkedChecklistId}
              onChange={e => setLinkedChecklistId(e.target.value)}
            >
              {checklistItems.map(c => (
                <option key={c.id} value={c.id}>{c.id} ({c.category})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Type-Specific Input Panels */}
        {evidenceType === 'PHOTO' && (
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(25, 118, 210, 0.1)', color: '#1976D2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Camera size={32} />
            </div>
            <h4 style={{ margin: '0 0 6px', fontSize: '14px' }}>DGMS Optical Viewfinder</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              All captured photos are automatically watermarked with GPS coordinates, timestamp, and Inspector ID.
            </p>
            <button
              className="btn btn-primary"
              onClick={handleOpenLiveCamera}
              style={{ background: '#1976D2', borderColor: '#1976D2' }}
            >
              <Camera size={14} />
              <span>Launch Camera Viewfinder</span>
            </button>
          </div>
        )}

        {evidenceType === 'MEASUREMENT' && (
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Measured Reading:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={measValue}
                  onChange={e => setMeasValue(e.target.value)}
                  style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'monospace' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Unit:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={measUnit}
                  onChange={e => setMeasUnit(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Test Instrument:
              </label>
              <input
                type="text"
                className="form-control"
                value={instrument}
                onChange={e => setInstrument(e.target.value)}
              />
            </div>
          </div>
        )}

        {evidenceType === 'DOCUMENT' && (
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '24px', borderRadius: '8px', marginBottom: '20px', border: '2px dashed var(--border-color)', textAlign: 'center' }}>
            <Upload size={32} color="#1976D2" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '13.5px', fontWeight: 600 }}>Select PDF / Logbook Scan</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Supports PDF, PNG, TIFF up to 25 MB
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast('Document attached: DOC-CAL-AN-4491.pdf', 'success')}
              style={{ marginTop: '12px' }}
            >
              Browse Local Files
            </button>
          </div>
        )}

        {/* Auto Metadata Block */}
        <div style={{ background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Automatic Tamper-Proof Metadata Envelope:
          </div>
          <div>&bull; Captured By: <strong>R. Sharma (Lead Inspector &bull; FCC-MM-2015-8910)</strong></div>
          <div>&bull; GPS Location: <span className="font-mono">23.6841° N, 86.9532° E (Level -320m RL)</span></div>
          <div>&bull; Device: ToughPad G2 Industrial (S/N: TP-8842 &bull; DGMS Intrinsically Safe)</div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('06')}>
            <span>Cancel</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSaveEvidence}
            style={{ background: '#1976D2', borderColor: '#1976D2', padding: '10px 24px' }}
          >
            <CheckCircle size={15} />
            <span>Commit Evidence to Record</span>
          </button>
        </div>

      </div>
    </div>
  );
};
