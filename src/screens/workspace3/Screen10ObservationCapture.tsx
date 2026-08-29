"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  Eye,
  Camera,
  FileText,
  Gauge,
  Video,
  MapPin,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Check,
  AlertOctagon
} from 'lucide-react';

export const Screen10ObservationCapture: React.FC = () => {
  const {
    activeInspection,
    checklistItems,
    addObservation,
    navigateTo,
    setCameraModalOpen,
    setCameraTargetId,
    showToast
  } = useFieldInspection();

  const [linkedChecklistId, setLinkedChecklistId] = useState<string>('REQ-VENT-014');
  const [observationText, setObservationText] = useState<string>('Airflow velocity at District 4 Seam VII LVC measured at 210.4 m³/min, representing a 26% deficit below statutory requirement of 285 m³/min. Temporary brattice cloth partition in 3rd dip gallery found torn and bypassed.');
  const [classification, setClassification] = useState<any>('Safety');
  const [severity, setSeverity] = useState<any>('High');
  const [location, setLocation] = useState<string>('District 4, Seam VII (Level -320m RL, 3rd Dip)');

  const selectedItem = checklistItems.find(c => c.id === linkedChecklistId) || checklistItems[0];

  const handleSaveObservation = () => {
    if (!observationText.trim()) {
      showToast('Please enter observation text before saving.', 'error');
      return;
    }

    addObservation({
      inspectionId: activeInspection.id,
      linkedChecklistId,
      text: observationText,
      classification,
      severity,
      location,
      gpsCoordinates: '23.6841° N, 86.9532° E',
      capturedBy: 'R. Sharma (Lead Inspector)',
      photos: ['/evidence/lvc_anemometer_reading.jpg'],
      hasProposedFinding: false,
      linkedRegulation: selectedItem.regulatoryTrace.clause
    });

    showToast('Field Observation recorded and saved locally.', 'success');
    navigateTo('06');
  };

  const handleSaveAndCreateFinding = () => {
    if (!observationText.trim()) {
      showToast('Please enter observation text before proceeding.', 'error');
      return;
    }

    addObservation({
      inspectionId: activeInspection.id,
      linkedChecklistId,
      text: observationText,
      classification,
      severity,
      location,
      gpsCoordinates: '23.6841° N, 86.9532° E',
      capturedBy: 'R. Sharma (Lead Inspector)',
      photos: ['/evidence/lvc_anemometer_reading.jpg'],
      hasProposedFinding: true,
      linkedRegulation: selectedItem.regulatoryTrace.clause
    });

    showToast('Observation recorded. Escalating to Proposed Finding builder...', 'info');
    navigateTo('13');
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
            <span className="badge badge-info">FIELD OBSERVATION LOG</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            CAPTURE FIELD OBSERVATION
          </h1>
          <p className="screen-subtitle">
            Document raw operational observations, physical mine conditions, and attach multi-modal evidence
          </p>
        </div>

        <button className="btn btn-secondary" onClick={() => navigateTo('06')}>
          <ArrowLeft size={14} />
          <span>Execution Overview</span>
        </button>
      </div>

      <div className="card" style={{ padding: '24px', borderTop: '4px solid #5932A5', marginBottom: '20px' }}>
        
        {/* Link to Checklist Requirement */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
            Link to Statutory Checklist Item:
          </label>
          <select
            className="form-control"
            value={linkedChecklistId}
            onChange={e => setLinkedChecklistId(e.target.value)}
            style={{ fontSize: '13px', padding: '10px' }}
          >
            {checklistItems.map(c => (
              <option key={c.id} value={c.id}>
                {c.id} &bull; {c.category}: {c.text.substring(0, 75)}...
              </option>
            ))}
          </select>
          {selectedItem && (
            <div style={{ fontSize: '11.5px', color: '#5932A5', marginTop: '4px', background: 'var(--status-purple-bg)', padding: '6px 10px', borderRadius: '4px' }}>
              <strong>Regulatory Baseline:</strong> {selectedItem.regulatoryTrace.regulation} &bull; {selectedItem.regulatoryTrace.clause}
            </div>
          )}
        </div>

        {/* Observation Text Field */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
            Observation Description (Detailed Field Findings):
          </label>
          <textarea
            className="form-control"
            rows={5}
            placeholder="Record clear factual descriptions of what was observed, measured, or detected..."
            value={observationText}
            onChange={e => setObservationText(e.target.value)}
            style={{ fontSize: '13.5px', lineHeight: 1.5 }}
          />
        </div>

        {/* Classification & Severity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Classification Category:
            </label>
            <select
              className="form-control"
              value={classification}
              onChange={e => setClassification(e.target.value)}
            >
              <option value="Safety">Safety Hazard / Violation</option>
              <option value="Operational">Operational Condition</option>
              <option value="Environmental">Environmental & Gas Telemetry</option>
              <option value="Equipment">Equipment / FLP Condition</option>
              <option value="Documentation">Documentation & Statutory Registers</option>
              <option value="Other">Other Observation</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Observed Severity Level:
            </label>
            <select
              className="form-control"
              value={severity}
              onChange={e => setSeverity(e.target.value)}
            >
              <option value="Informational">Informational (Compliant/Neutral)</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Severity</option>
              <option value="High">High Severity (Imminent Safety Impact)</option>
              <option value="Critical">Critical (Immediate Stop Work Required)</option>
            </select>
          </div>
        </div>

        {/* Location & Geospatial Tag */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
            Specific Physical Location:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={e => setLocation(e.target.value)}
              style={{ flex: 1, fontSize: '13px' }}
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => showToast('GPS Lock verified at Level -320m RL', 'success')}
              style={{ whiteSpace: 'nowrap' }}
            >
              <MapPin size={13} color="#FF6B00" />
              <span>Current GPS</span>
            </button>
          </div>
        </div>

        {/* Evidence Attachment Quick Triggers */}
        <div style={{ marginBottom: '24px', background: 'var(--bg-surface-subtle)', padding: '14px', borderRadius: '8px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Attach Evidence to Observation:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setCameraTargetId(linkedChecklistId);
                setCameraModalOpen(true);
              }}
            >
              <Camera size={13} color="#FF6B00" />
              <span>Take Photo</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => showToast('Intrinsically safe video recorder activated', 'info')}
            >
              <Video size={13} color="#5932A5" />
              <span>Record Video</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => showToast('Document upload dialog opened', 'info')}
            >
              <FileText size={13} color="#1976D2" />
              <span>Attach Doc</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('08', { checklistId: linkedChecklistId })}
            >
              <Gauge size={13} color="#2E7D32" />
              <span>Measurement</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('06')}>
            <span>Cancel</span>
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn btn-secondary"
              onClick={handleSaveObservation}
              style={{ borderColor: '#5932A5', color: '#5932A5' }}
            >
              <Check size={14} />
              <span>Save Observation Only</span>
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSaveAndCreateFinding}
              style={{ background: '#FF6B00', borderColor: '#FF6B00' }}
            >
              <AlertOctagon size={15} />
              <span>Save & Formulate Proposed Finding</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
