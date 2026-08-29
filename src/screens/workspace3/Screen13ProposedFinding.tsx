"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  AlertOctagon,
  Shield,
  Camera,
  Gauge,
  FileText,
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';

export const Screen13ProposedFinding: React.FC = () => {
  const {
    activeInspection,
    checklistItems,
    observations,
    proposedFindings,
    addProposedFinding,
    navigateTo,
    showToast
  } = useFieldInspection();

  const [linkedChecklistId, setLinkedChecklistId] = useState<string>('REQ-VENT-014');
  const [nonComplianceDetails, setNonComplianceDetails] = useState<string>('Volumetric airflow is deficient by 74.6 m³/min (26.2% below statutory baseline of 285 m³/min). Risk of noxious/inflammable gas accumulation in active heading.');
  const [severity, setSeverity] = useState<any>('High');
  const [riskCategory, setRiskCategory] = useState<any>('Safety');
  const [proposedAction, setProposedAction] = useState<any>('Immediate Action');
  const [responsibleArea, setResponsibleArea] = useState<string>('Mine A2 / Ventilation Department');
  
  const [hasPhoto, setHasPhoto] = useState<boolean>(true);
  const [hasMeasurement, setHasMeasurement] = useState<boolean>(true);
  const [hasDocument, setHasDocument] = useState<boolean>(false);

  const selectedItem = checklistItems.find(c => c.id === linkedChecklistId) || checklistItems[0];
  const linkedObs = observations.find(o => o.linkedChecklistId === linkedChecklistId) || observations[0];

  // Evidence validation rule: For ventilation, measurement is MANDATORY
  const isMeasurementMandatory = selectedItem.measurementRequired;
  const isEvidenceSatisfied = (!isMeasurementMandatory || hasMeasurement) && (!selectedItem.photoRequired || hasPhoto);

  const handleSubmitFinding = () => {
    if (!isEvidenceSatisfied) {
      showToast('Measurement and Photo evidence are strictly mandatory for this statutory violation before submission.', 'error');
      return;
    }

    addProposedFinding({
      inspectionId: activeInspection.id,
      linkedChecklistId,
      linkedObservationId: linkedObs?.id,
      regulationClause: selectedItem.regulatoryTrace.clause,
      requirementText: selectedItem.text,
      observationSummary: linkedObs?.text || 'Field observation recorded during inspection.',
      nonComplianceDetails,
      severity,
      riskCategory,
      hasPhoto,
      hasMeasurement,
      hasDocument,
      proposedAction,
      responsibleArea,
      status: 'Ready',
      createdBy: 'R. Sharma (Lead Inspector)'
    });

    showToast('Proposed Finding formulated and staged for Final Review.', 'success');
    navigateTo('06');
  };

  return (
    <div className="screen-content" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(211, 47, 47, 0.15)', color: '#B71C1C' }}>
              FND-PROP-001 (DRAFT)
            </span>
            <span className="badge badge-danger">PROPOSED STATUTORY FINDING</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            FORMULATE PROPOSED FINDING
          </h1>
          <p className="screen-subtitle">
            Convert field observation into structured statutory violation notice for Review & Approval
          </p>
        </div>

        <button className="btn btn-secondary" onClick={() => navigateTo('06')}>
          <ArrowLeft size={14} />
          <span>Execution Overview</span>
        </button>
      </div>

      <div className="card" style={{ padding: '24px', borderTop: '4px solid #D32F2F', marginBottom: '20px' }}>
        
        {/* LINKED REQUIREMENT TRACEABILITY */}
        <div style={{ background: 'var(--bg-surface-subtle)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11.5px', color: '#5932A5', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            Linked Regulatory Requirement
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {selectedItem.regulatoryTrace.regulation} &bull; {selectedItem.regulatoryTrace.clause}
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <strong>Requirement:</strong> {selectedItem.regulatoryTrace.requirement}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            <strong>Obligation:</strong> {selectedItem.regulatoryTrace.obligation}
          </div>
        </div>

        {/* LINKED FIELD OBSERVATION */}
        <div style={{ background: 'var(--status-orange-bg)', border: '1px solid var(--status-orange-border)', padding: '14px', borderRadius: '6px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11.5px', color: '#E65100', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
            Underlying Field Observation ({linkedObs?.id || 'OBS-001'})
          </div>
          <div style={{ fontSize: '13px', color: '#B71C1C', lineHeight: 1.45 }}>
            "{linkedObs?.text || 'Airflow velocity measured at Seam VII LVC is 210.4 m³/min, below mandatory threshold of 285 m³/min.'}"
          </div>
        </div>

        {/* NON-COMPLIANCE EXPLANATION */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
            Non-Compliance Technical Explanation (What was violated):
          </label>
          <textarea
            className="form-control"
            rows={4}
            value={nonComplianceDetails}
            onChange={e => setNonComplianceDetails(e.target.value)}
            style={{ fontSize: '13px', lineHeight: 1.5 }}
          />
        </div>

        {/* SEVERITY & RISK */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Finding Severity:
            </label>
            <select
              className="form-control"
              value={severity}
              onChange={e => setSeverity(e.target.value)}
            >
              <option value="Low">Low (Informational / Minor deviation)</option>
              <option value="Medium">Medium (Procedural / Logbook)</option>
              <option value="High">High (Direct Safety Hazard)</option>
              <option value="Critical">Critical (Immediate Hazard / Section 22 Threat)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Risk Classification:
            </label>
            <select
              className="form-control"
              value={riskCategory}
              onChange={e => setRiskCategory(e.target.value)}
            >
              <option value="Safety">Safety Risk (Life & Limb)</option>
              <option value="Environmental">Environmental & Gas Risk</option>
              <option value="Operational">Operational / Production Risk</option>
              <option value="Regulatory">Regulatory & Compliance Risk</option>
            </select>
          </div>
        </div>

        {/* MANDATORY EVIDENCE VERIFICATION CHECKLIST */}
        <div style={{ background: 'var(--bg-surface-subtle)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Evidence Verification Matrix:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div
              onClick={() => setHasPhoto(!hasPhoto)}
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                border: `1px solid ${hasPhoto ? '#2E7D32' : '#D32F2F'}`,
                background: hasPhoto ? 'var(--status-green-bg)' : 'var(--status-red-bg)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 600 }}>📸 Photo Evidence</span>
              {hasPhoto ? <CheckCircle size={16} color="#2E7D32" /> : <XCircle size={16} color="#D32F2F" />}
            </div>

            <div
              onClick={() => setHasMeasurement(!hasMeasurement)}
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                border: `1px solid ${hasMeasurement ? '#2E7D32' : '#D32F2F'}`,
                background: hasMeasurement ? 'var(--status-green-bg)' : 'var(--status-red-bg)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 600 }}>📊 Instrument Reading</span>
              {hasMeasurement ? <CheckCircle size={16} color="#2E7D32" /> : <XCircle size={16} color="#D32F2F" />}
            </div>

            <div
              onClick={() => setHasDocument(!hasDocument)}
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-surface)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 600 }}>📄 Document Scan</span>
              {hasDocument ? <CheckCircle size={16} color="#2E7D32" /> : <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Optional</span>}
            </div>
          </div>

          {!isEvidenceSatisfied && (
            <div style={{ marginTop: '10px', fontSize: '11.5px', color: '#B71C1C', fontWeight: 600 }}>
              ⚠️ Measurement and Photo evidence are required for this finding under CMR 2017 Regulation 153(2)(b).
            </div>
          )}
        </div>

        {/* PROPOSED ACTION & RESPONSIBLE AREA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Proposed Remedial Action:
            </label>
            <select
              className="form-control"
              value={proposedAction}
              onChange={e => setProposedAction(e.target.value)}
            >
              <option value="Immediate Action">Immediate Action (Replace brattice partition immediately)</option>
              <option value="Corrective Action">Corrective Action (Issue CAPA)</option>
              <option value="Further Investigation">Further Investigation by Ventilation Officer</option>
              <option value="Stop Work Notice">Provisional Stop Work Notice</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Responsible Mine Department:
            </label>
            <input
              type="text"
              className="form-control"
              value={responsibleArea}
              onChange={e => setResponsibleArea(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('08', { checklistId: linkedChecklistId })}>
            <ArrowLeft size={14} />
            <span>Back to Check</span>
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => showToast('Finding draft saved in local session', 'info')}
            >
              Save Draft
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmitFinding}
              disabled={!isEvidenceSatisfied}
              style={{
                background: isEvidenceSatisfied ? '#D32F2F' : '#A0AEC0',
                borderColor: isEvidenceSatisfied ? '#D32F2F' : '#A0AEC0',
                cursor: isEvidenceSatisfied ? 'pointer' : 'not-allowed',
                padding: '10px 24px'
              }}
            >
              <Check size={15} />
              <span>Submit Finding for Statutory Review</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
