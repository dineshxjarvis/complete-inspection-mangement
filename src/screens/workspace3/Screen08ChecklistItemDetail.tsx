"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import { ChecklistItem, CheckStatus } from '../../types/fieldInspection';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Camera,
  Gauge,
  FileText,
  MapPin,
  Clock,
  AlertTriangle,
  AlertOctagon,
  Save,
  Plus
} from 'lucide-react';

export const Screen08ChecklistItemDetail: React.FC = () => {
  const {
    activeChecklistId,
    checklistItems,
    updateChecklistItem,
    markChecklistStatus,
    navigateTo,
    setCameraModalOpen,
    setCameraTargetId,
    showToast
  } = useFieldInspection();

  const item = checklistItems.find(c => c.id === activeChecklistId) || checklistItems[0];
  const currentIndex = checklistItems.findIndex(c => c.id === item.id);

  const [measurementVal, setMeasurementVal] = useState<string>(item.measurementValue || '');
  const [measurementUnit, setMeasurementUnit] = useState<string>(item.measurementUnit || 'm³/min');
  const [instrument, setInstrument] = useState<string>(item.instrumentUsed || 'Digital Vane Anemometer (SN-AN-4491)');
  const [observation, setObservation] = useState<string>(item.observationText || '');
  const [status, setStatus] = useState<CheckStatus>(item.status);

  const handleSave = () => {
    updateChecklistItem(item.id, {
      measurementValue: measurementVal,
      measurementUnit: measurementUnit,
      instrumentUsed: instrument,
      observationText: observation,
      status: status
    });
    showToast(`Checklist item ${item.id} saved locally`, 'success');
  };

  const handleNext = () => {
    handleSave();
    if (currentIndex < checklistItems.length - 1) {
      navigateTo('08', { checklistId: checklistItems[currentIndex + 1].id });
    } else {
      navigateTo('07');
    }
  };

  const handlePrev = () => {
    handleSave();
    if (currentIndex > 0) {
      navigateTo('08', { checklistId: checklistItems[currentIndex - 1].id });
    } else {
      navigateTo('07');
    }
  };

  const handleOpenPhotoCamera = () => {
    setCameraTargetId(item.id);
    setCameraModalOpen(true);
  };

  const handleCreateFinding = () => {
    handleSave();
    navigateTo('13');
  };

  return (
    <div className="screen-content" style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '13px',
                fontWeight: 800,
                background: 'rgba(255, 107, 0, 0.15)',
                color: '#E65100',
                padding: '3px 8px',
                borderRadius: '4px'
              }}
            >
              {item.id}
            </span>
            <span className={`badge ${item.criticality === 'Critical' ? 'badge-danger' : 'badge-warning'}`}>
              {item.criticality.toUpperCase()}
            </span>
            <span className="badge badge-subtle">{item.category}</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            CHECKLIST ITEM EVALUATION
          </h1>
          <p className="screen-subtitle">
            Item {currentIndex + 1} of {checklistItems.length} &bull; Operational testing & statutory compliance recording
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('07')}>
            <ArrowLeft size={14} />
            <span>Checklist Index</span>
          </button>
          {status === 'Non-Compliant' && (
            <button
              className="btn btn-primary"
              onClick={handleCreateFinding}
              style={{ background: '#D32F2F', borderColor: '#D32F2F' }}
            >
              <AlertOctagon size={14} />
              <span>Create Proposed Finding</span>
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        
        {/* Left Column: Traceability, Question & Response */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* SECTION: REGULATORY TRACEABILITY */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
              REGULATORY STATUTORY TRACEABILITY
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#5932A5', fontWeight: 700 }}>REGULATION: </span>
                <span style={{ fontWeight: 600 }}>{item.regulatoryTrace.regulation}</span>
              </div>
              <div>
                <span style={{ color: '#5932A5', fontWeight: 700 }}>CLAUSE: </span>
                <span style={{ fontWeight: 600 }}>{item.regulatoryTrace.clause}</span>
              </div>
              <div>
                <span style={{ color: '#5932A5', fontWeight: 700 }}>STATUTORY REQUIREMENT: </span>
                <span style={{ color: 'var(--text-secondary)' }}>{item.regulatoryTrace.requirement}</span>
              </div>
              <div>
                <span style={{ color: '#5932A5', fontWeight: 700 }}>APPLICABILITY: </span>
                <span style={{ color: 'var(--text-secondary)' }}>{item.regulatoryTrace.applicability}</span>
              </div>
              <div>
                <span style={{ color: '#5932A5', fontWeight: 700 }}>STATUTORY OBLIGATION: </span>
                <span style={{ color: 'var(--text-secondary)' }}>{item.regulatoryTrace.obligation}</span>
              </div>
            </div>
          </div>

          {/* INSPECTION QUESTION & REQUIREMENT */}
          <div className="card" style={{ borderLeft: '4px solid #FF6B00' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Operational Inspection Check
            </h3>
            <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.4 }}>
              {item.text}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', background: 'var(--bg-surface-subtle)', padding: '10px 14px', borderRadius: '6px' }}>
              <strong>Verification Standard:</strong> {item.question}
            </div>
          </div>

          {/* RESPONSE SELECTOR */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '12px' }}>
              EVALUATION RESPONSE (SELECT COMPLIANCE STATE)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setStatus('Compliant')}
                style={{
                  padding: '12px 8px',
                  borderRadius: '8px',
                  border: `2px solid ${status === 'Compliant' ? '#2E7D32' : 'var(--border-color)'}`,
                  background: status === 'Compliant' ? 'var(--status-green-bg)' : 'var(--bg-surface)',
                  color: status === 'Compliant' ? '#1B5E20' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle size={20} color={status === 'Compliant' ? '#2E7D32' : '#A0AEC0'} />
                <span>Compliant</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('Non-Compliant')}
                style={{
                  padding: '12px 8px',
                  borderRadius: '8px',
                  border: `2px solid ${status === 'Non-Compliant' ? '#D32F2F' : 'var(--border-color)'}`,
                  background: status === 'Non-Compliant' ? 'var(--status-red-bg)' : 'var(--bg-surface)',
                  color: status === 'Non-Compliant' ? '#B71C1C' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <XCircle size={20} color={status === 'Non-Compliant' ? '#D32F2F' : '#A0AEC0'} />
                <span>Non-Compliant</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatus('N/A');
                  navigateTo('09');
                }}
                style={{
                  padding: '12px 8px',
                  borderRadius: '8px',
                  border: `2px solid ${status === 'N/A' ? '#7C4DFF' : 'var(--border-color)'}`,
                  background: status === 'N/A' ? 'var(--status-purple-bg)' : 'var(--bg-surface)',
                  color: status === 'N/A' ? '#4527A0' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ fontSize: '18px' }}>🚫</span>
                <span>Not Applicable</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatus('Unable to Verify');
                  navigateTo('09');
                }}
                style={{
                  padding: '12px 8px',
                  borderRadius: '8px',
                  border: `2px solid ${status === 'Unable to Verify' ? '#F57C00' : 'var(--border-color)'}`,
                  background: status === 'Unable to Verify' ? 'var(--status-amber-bg)' : 'var(--bg-surface)',
                  color: status === 'Unable to Verify' ? '#E65100' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ fontSize: '18px' }}>⚠️</span>
                <span>Unable to Verify</span>
              </button>
            </div>

            {status === 'Non-Compliant' && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '10px 14px',
                  background: 'var(--status-red-bg)',
                  border: '1px solid var(--status-red-border)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '12px', color: '#B71C1C', fontWeight: 600 }}>
                  ⚠️ Marking as Non-Compliant requires formulating a structured Proposed Finding.
                </span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleCreateFinding}
                  style={{ background: '#D32F2F', borderColor: '#D32F2F', fontSize: '11px' }}
                >
                  Formulate Finding
                </button>
              </div>
            )}
          </div>

          {/* OBSERVATION FIELD */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '8px' }}>
              FIELD OBSERVATION REMARKS
            </h3>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Record precise technical observations, visual defects, physical conditions, or deviations..."
              value={observation}
              onChange={e => setObservation(e.target.value)}
              style={{ width: '100%', fontSize: '13px', lineHeight: 1.5 }}
            />
          </div>

        </div>

        {/* Right Column: Measurement, Evidence, Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* EVIDENCE RULES BANNER */}
          <div
            className="card"
            style={{
              background: 'var(--bg-surface-alt)',
              borderLeft: '4px solid #5932A5'
            }}
          >
            <h3 style={{ fontSize: '12.5px', fontWeight: 700, color: '#5932A5', textTransform: 'uppercase', marginBottom: '8px' }}>
              Statutory Evidence Requirements
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '11.5px' }}>
              <div style={{ background: '#FFF', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                Measurement: <strong style={{ color: item.measurementRequired ? '#D32F2F' : '#718096' }}>{item.measurementRequired ? 'MANDATORY' : 'OPTIONAL'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                Photo: <strong style={{ color: item.photoRequired ? '#D32F2F' : '#718096' }}>{item.photoRequired ? 'MANDATORY' : 'OPTIONAL'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                Document: <strong style={{ color: item.documentRequired ? '#D32F2F' : '#718096' }}>{item.documentRequired ? 'MANDATORY' : 'OPTIONAL'}</strong>
              </div>
            </div>
          </div>

          {/* MEASUREMENT INPUT SECTION */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Gauge size={16} color="#FF6B00" />
              <span>INSTRUMENT MEASUREMENT CAPTURE</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Measured Value:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 210.4"
                    value={measurementVal}
                    onChange={e => setMeasurementVal(e.target.value)}
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
                    value={measurementUnit}
                    onChange={e => setMeasurementUnit(e.target.value)}
                    style={{ fontSize: '13px', fontWeight: 600 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Calibrated Instrument Used:
                </label>
                <select
                  className="form-control"
                  value={instrument}
                  onChange={e => setInstrument(e.target.value)}
                >
                  <option value="Digital Vane Anemometer (SN-AN-4491)">Digital Vane Anemometer (SN-AN-4491 &bull; Cal Due May 2027)</option>
                  <option value="Multi-Gas Detector MX6 iBrid (SN-GD-8802)">Multi-Gas Detector MX6 iBrid (SN-GD-8802 &bull; Cal Due Dec 2026)</option>
                  <option value="Digital Torque Wrench (SN-TW-220)">Digital Torque Wrench (SN-TW-220)</option>
                  <option value="Precision Feeler Gauge Set (SN-FG-009)">Precision Feeler Gauge Set (SN-FG-009)</option>
                  <option value="Industrial Hanging Scale (SN-SC-1102)">Industrial Hanging Scale (SN-SC-1102)</option>
                </select>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> Auto-Timestamp: 15 Nov 2026 11:10:15 IST
              </div>
            </div>
          </div>

          {/* ATTACHED EVIDENCE SECTION */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 700, margin: 0 }}>
                ATTACHED EVIDENCE ({item.photos.length + (item.documents.length || 0)})
              </h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleOpenPhotoCamera}
                style={{ fontSize: '11.5px' }}
              >
                <Camera size={13} />
                <span>Take Photo</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {item.photos.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-surface-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Camera size={14} color="#FF6B00" />
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>
                      Photo #{idx + 1} &bull; {p.replace('/evidence/', '')}
                    </span>
                  </div>
                  <span className="badge badge-success">✓ Watermarked</span>
                </div>
              ))}

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleOpenPhotoCamera}
                  style={{ flex: 1, fontSize: '11px' }}
                >
                  <Camera size={12} /> Add Photo
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => showToast('Document scanner opened', 'info')}
                  style={{ flex: 1, fontSize: '11px' }}
                >
                  <FileText size={12} /> Add Document
                </button>
              </div>
            </div>
          </div>

          {/* LOCATION & GEOTAG */}
          <div className="card">
            <h3 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="#FF6B00" />
              <span>GEOLOCATION & AUDIT STAMP</span>
            </h3>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              GPS: <span className="font-mono">{item.gpsCoordinates || '23.6841° N, 86.9532° E (Level -320m RL)'}</span><br />
              Recorded By: <strong>{item.inspectorName || 'R. Sharma (Lead Inspector)'}</strong><br />
              Audit Signature: <span className="font-mono" style={{ color: '#2E7D32' }}>SHA-256: 8f4b29c0e... (DGMS Valid)</span>
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM STICKY ACTION BAR */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 'var(--sidebar-width)',
          right: 0,
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-color)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={handlePrev}>
            <ArrowLeft size={14} />
            <span>Previous Check</span>
          </button>
          <button className="btn btn-secondary" onClick={handleSave}>
            <Save size={14} />
            <span>Save Evaluation</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => navigateTo('07')}
          >
            Checklist Index
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            style={{ background: '#FF6B00', borderColor: '#FF6B00' }}
          >
            <span>Save & Next Check</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
