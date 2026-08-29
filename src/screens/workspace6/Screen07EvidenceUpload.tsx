"use client";

import React, { useState } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  FileUp,
  Camera,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  Shield,
  UploadCloud,
  Hash
} from 'lucide-react';

export const Screen07EvidenceUpload: React.FC = () => {
  const {
    activeCapa,
    uploadEvidence,
    navigateTo,
    showToast
  } = useCorrectiveAction();

  const [evidenceType, setEvidenceType] = useState<'Document' | 'Photo' | 'Measurement' | 'Other'>('Measurement');
  const [title, setTitle] = useState<string>('Post-Repair 9-Grid Anemometer Traverse Velocity Sheet');
  const [description, setDescription] = useState<string>('Traverse velocity across 9 grid planes conducted at 140m chainage split; average measured 5.9 m/s.');
  const [date, setDate] = useState<string>('26 Nov 2026');
  const [location, setLocation] = useState<string>('Shaft 3 (Chainage 140m)');
  const [capturedBy, setCapturedBy] = useState<string>('Er. S. K. Mahapatra (Chief Ventilation Engineer)');
  const [relatedTaskId, setRelatedTaskId] = useState<string>('TSK-03');

  // Measurement Specific Fields
  const [measurementValue, setMeasurementValue] = useState<string>('5.9');
  const [measurementUnit, setMeasurementUnit] = useState<string>('m/s');
  const [instrumentName, setInstrumentName] = useState<string>('Digital Vane Anemometer (Model DA-800)');
  const [instrumentId, setInstrumentId] = useState<string>('ANM-2024-91');
  const [calibrationStatus, setCalibrationStatus] = useState<string>('Valid through 24 Jan 2027');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    uploadEvidence(activeCapa.id, {
      title,
      type: evidenceType,
      description,
      date,
      location,
      capturedBy,
      relatedTaskId,
      status: 'ACCEPTED',
      fileSize: '3.4 MB',
      filename: `${title.replace(/\s+/g, '_')}.pdf`,
      measurementData: evidenceType === 'Measurement' ? {
        value: measurementValue,
        unit: measurementUnit,
        instrument: instrumentName,
        instrumentId,
        calibrationStatus
      } : undefined,
      photoData: evidenceType === 'Photo' ? {
        timestamp: `${date} 15:30 IST`,
        location,
        gpsCoordinates: '24°11\'48.2"N 82°41\'15.6"E'
      } : undefined
    });
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
              EVIDENCE CAPTURE & UPLOAD
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            ENTERPRISE CORRECTIVE ACTION EVIDENCE &bull; {activeCapa.id}
          </h1>
          <p className="screen-subtitle">
            Upload field-verified engineering reports, GPS optical captures, and calibrated measurement data for verification
          </p>
        </div>
      </div>

      {/* Required Evidence Status Cards */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '20px', background: '#FAFAFA' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#004D40', marginBottom: '10px' }}>
          STATUTORY EVIDENCE CHECKLIST REQUIREMENT
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ background: '#E8F5E9', padding: '12px', borderRadius: '6px', border: '1px solid #C8E6C9' }}>
            <div style={{ fontSize: '11px', color: '#2E7D32', fontWeight: 700 }}>1. REPAIR REPORT</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#1B5E20', marginTop: '2px' }}>✓ UPLOADED</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>DOC-VENT-REPAIR-REPORT.pdf</div>
          </div>

          <div style={{ background: '#FFF3E0', padding: '12px', borderRadius: '6px', border: '1px solid #FFE082' }}>
            <div style={{ fontSize: '11px', color: '#BF360C', fontWeight: 700 }}>2. POST-REPAIR MEASUREMENT</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>⚠️ MISSING (UPLOAD BELOW)</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Required: &ge; 5.5 m/s velocity</div>
          </div>

          <div style={{ background: '#E8F5E9', padding: '12px', borderRadius: '6px', border: '1px solid #C8E6C9' }}>
            <div style={{ fontSize: '11px', color: '#2E7D32', fontWeight: 700 }}>3. PHOTOGRAPH</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#1B5E20', marginTop: '2px' }}>✓ UPLOADED</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>PHOTO-LOUVRE-CLEARED.jpg</div>
          </div>
        </div>
      </div>

      {/* Upload Form Grid */}
      <form onSubmit={handleUpload}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: Evidence Upload Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Evidence Type & Metadata
              </h3>

              {/* Type Selector */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '14px' }}>
                {(['Measurement', 'Photo', 'Document', 'Other'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setEvidenceType(t)}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: `1.5px solid ${evidenceType === t ? '#00695C' : 'var(--border-color)'}`,
                      background: evidenceType === t ? '#E0F2F1' : 'var(--bg-surface-alt)',
                      color: evidenceType === t ? '#004D40' : 'var(--text-primary)',
                      fontWeight: evidenceType === t ? 800 : 500,
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Title & Description */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Evidence Title *
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Technical Description & Execution Remarks *
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  style={{ height: 'auto', fontSize: '12px' }}
                />
              </div>

              {/* Metadata Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Capture Date *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Underground Location *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Captured By *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={capturedBy}
                    onChange={e => setCapturedBy(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Related Task
                  </label>
                  <select
                    className="form-control"
                    value={relatedTaskId}
                    onChange={e => setRelatedTaskId(e.target.value)}
                  >
                    <option value="TSK-01">TSK-01: Fan Inspection</option>
                    <option value="TSK-02">TSK-02: Mechanical Repair</option>
                    <option value="TSK-03">TSK-03: Post-repair Measurement</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Measurement Specific Details */}
            {evidenceType === 'Measurement' && (
              <div className="card" style={{ padding: '20px', background: '#E8F5E9', border: '1px solid #C8E6C9' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#1B5E20', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Calibrated Measurement Parameters
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                      Measured Value (Airflow Velocity) *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={measurementValue}
                      onChange={e => setMeasurementValue(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                      Unit *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={measurementUnit}
                      onChange={e => setMeasurementUnit(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                      Instrument Model *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={instrumentName}
                      onChange={e => setInstrumentName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                      Calibration Status *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={calibrationStatus}
                      onChange={e => setCalibrationStatus(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: File Drop & Integrity Digest */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #00695C' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#004D40' }}>
                Upload & Cryptographic Sealing
              </h3>

              <div
                style={{
                  border: '2px dashed #80CBC4',
                  borderRadius: '8px',
                  padding: '30px 16px',
                  textAlign: 'center',
                  background: 'var(--bg-surface-alt)',
                  marginBottom: '16px',
                  cursor: 'pointer'
                }}
              >
                <UploadCloud size={36} color="#00695C" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#004D40' }}>
                  Click to select file or drag & drop
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  PDF, JPG, PNG, CSV up to 50 MB
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', background: '#00695C', borderColor: '#004D40', justifyContent: 'center' }}
              >
                <UploadCloud size={14} />
                <span>Upload Evidence & Seal in Ledger</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
