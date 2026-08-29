"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  FileCheck,
  AlertTriangle,
  Upload,
  Calendar,
  Building,
  User,
  ShieldAlert,
  Save,
  Send,
  ChevronLeft,
  Paperclip,
  CheckCircle,
  FileText,
  Clock
} from 'lucide-react';

export const Screen09MineResponse: React.FC = () => {
  const {
    activeFinding,
    draftResponse,
    updateDraftResponse,
    saveResponseDraft,
    navigateTo,
    showToast
  } = useMineResponse();

  const [declarationChecked, setDeclarationChecked] = useState<boolean>(false);
  const fnd = activeFinding;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftResponse.explanation.trim()) {
      showToast('Mine explanation is mandatory for statutory response', 'error');
      return;
    }
    if (!draftResponse.immediateAction.trim()) {
      showToast('Immediate action statement is mandatory', 'error');
      return;
    }
    if (!draftResponse.correctiveAction.trim()) {
      showToast('Corrective action commitment is mandatory', 'error');
      return;
    }
    if (!declarationChecked) {
      showToast('Please check the statutory declaration before proceeding to review', 'warning');
      return;
    }

    navigateTo('10');
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('08')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Finding</span>
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
              {fnd.id}
            </span>
            <span className="badge badge-danger">SEVERITY: {fnd.severity}</span>
            <span className="badge badge-warning">DUE: {fnd.responseDue}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            RESPOND TO STATUTORY FINDING
          </h1>
          <p className="screen-subtitle">
            Issue: {fnd.title} &bull; Response Deadline: {fnd.responseDue} (2 days remaining)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={saveResponseDraft}
          >
            <Save size={13} />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
            style={{ background: '#00897B', borderColor: '#00796B' }}
          >
            <Send size={13} />
            <span>Proceed to Review & Submit</span>
          </button>
        </div>
      </div>

      {/* Main Response Form */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '16px', marginBottom: '30px' }}>
        {/* Left Column: Explanations, Actions & Causes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION: MINE RESPONSE / EXPLANATION */}
          <div className="card" style={{ padding: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              1. Mine Explanation, Operational Context & Background *
            </label>
            <p style={{ margin: '0 0 8px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Provide the mine management's technical explanation, operational background, and context regarding the observed deficiency.
            </p>
            <textarea
              className="form-control"
              rows={4}
              value={draftResponse.explanation}
              onChange={e => updateDraftResponse({ explanation: e.target.value })}
              placeholder="e.g. Airflow reduction occurred following sudden stone-dust spillage during conveyor feeder cleaning on shift 2..."
              required
              style={{ height: 'auto', fontSize: '13px' }}
            />
          </div>

          {/* SECTION: IMMEDIATE ACTION */}
          <div className="card" style={{ padding: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              2. Immediate Remedial Action Taken *
            </label>
            <p style={{ margin: '0 0 8px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              What immediate measures were executed on the ground to mitigate immediate statutory hazard?
            </p>
            <textarea
              className="form-control"
              rows={3}
              value={draftResponse.immediateAction}
              onChange={e => updateDraftResponse({ immediateAction: e.target.value })}
              placeholder="e.g. Regulator aperture manually cleared by Overman; preliminary velocity restored to 5.2 m/s..."
              required
              style={{ height: 'auto', fontSize: '13px' }}
            />
          </div>

          {/* SECTION: ROOT / CONTRIBUTING CAUSE */}
          <div className="card" style={{ padding: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              3. Root / Contributing Cause Analysis
            </label>
            <p style={{ margin: '0 0 8px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Underlying engineering, mechanical, or procedural factors that caused or allowed the condition to occur.
            </p>
            <textarea
              className="form-control"
              rows={3}
              value={draftResponse.rootCause}
              onChange={e => updateDraftResponse({ rootCause: e.target.value })}
              placeholder="e.g. Defective dust deflection baffle allowing material buildup combined with sub-optimal 14° fan blade pitch..."
              style={{ height: 'auto', fontSize: '13px' }}
            />
          </div>

          {/* SECTION: CORRECTIVE ACTION (CAPA COMMITMENT) */}
          <div className="card" style={{ padding: '16px', borderLeft: '4px solid #00897B' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#004D40', textTransform: 'uppercase', marginBottom: '6px' }}>
              4. Proposed Corrective & Preventive Action (CAPA) *
            </label>
            <p style={{ margin: '0 0 8px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              What comprehensive long-term corrective action will the mine undertake to ensure permanent compliance?
            </p>
            <textarea
              className="form-control"
              rows={4}
              value={draftResponse.correctiveAction}
              onChange={e => updateDraftResponse({ correctiveAction: e.target.value })}
              placeholder="e.g. Execute 4-stage CAPA: Louvre descaling, fan blade pitch adjustment to 18°, 9-point airflow survey, and statutory sign-off..."
              required
              style={{ height: 'auto', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* Right Column: Ownership, Dates, Supporting Evidence & Declaration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Ownership & Schedule */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              ACTION OWNERSHIP & TARGET DATE
            </h3>

            {/* Department */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Responsible Department *
              </label>
              <select
                className="form-control"
                value={draftResponse.responsibleDepartment}
                onChange={e => updateDraftResponse({ responsibleDepartment: e.target.value })}
                required
              >
                <option value="Ventilation Department">Ventilation Department</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Department">Mechanical Department</option>
                <option value="Strata Control & Safety Cell">Strata Control & Safety Cell</option>
                <option value="Mining Operations">Mining Operations</option>
              </select>
            </div>

            {/* Responsible Person */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Responsible Person / Owner *
              </label>
              <select
                className="form-control"
                value={draftResponse.responsiblePerson}
                onChange={e => updateDraftResponse({ responsiblePerson: e.target.value })}
                required
              >
                <option value="Er. S. K. Mahapatra (Chief Ventilation Engineer)">Er. S. K. Mahapatra (Chief Ventilation Engineer)</option>
                <option value="Er. D. P. Mukherjee (Chief Electrical Engineer)">Er. D. P. Mukherjee (Chief Electrical Engineer)</option>
                <option value="Er. M. S. Reddy (Senior Mechanical Engineer)">Er. M. S. Reddy (Senior Mechanical Engineer)</option>
                <option value="Er. A. K. Verma (Mine Manager)">Er. A. K. Verma (Mine Manager)</option>
              </select>
            </div>

            {/* Target Date */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Committed Completion Target Date *
              </label>
              <input
                type="date"
                className="form-control"
                value={draftResponse.targetDate}
                onChange={e => updateDraftResponse({ targetDate: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Supporting Evidence Upload */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                SUPPORTING EVIDENCE ATTACHMENTS
              </h3>
              <span className="badge badge-info">{draftResponse.attachments.length} attached</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              {draftResponse.attachments.map((file, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    background: 'var(--bg-surface-alt)',
                    borderRadius: '4px',
                    border: '1px solid var(--border-light)',
                    fontSize: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Paperclip size={13} color="#00897B" />
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{file}</span>
                  </div>
                  <span style={{ fontSize: '10.5px', color: '#2E7D32', fontWeight: 700 }}>✓ Attached</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  updateDraftResponse({ attachments: [...draftResponse.attachments, `doc_cert_${Date.now().toString().slice(-4)}.pdf`] });
                  showToast('Document attached to response draft', 'info');
                }}
                style={{ fontSize: '11px', padding: '6px 4px', justifyContent: 'center' }}
              >
                <Upload size={11} />
                <span>+ Document</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  updateDraftResponse({ attachments: [...draftResponse.attachments, `photo_rectification_${Date.now().toString().slice(-4)}.jpg`] });
                  showToast('Photo proof attached to response draft', 'info');
                }}
                style={{ fontSize: '11px', padding: '6px 4px', justifyContent: 'center' }}
              >
                <Upload size={11} />
                <span>+ Photo</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  updateDraftResponse({ attachments: [...draftResponse.attachments, `airflow_log_${Date.now().toString().slice(-4)}.pdf`] });
                  showToast('Measurement record attached to response draft', 'info');
                }}
                style={{ fontSize: '11px', padding: '6px 4px', justifyContent: 'center' }}
              >
                <Upload size={11} />
                <span>+ Record</span>
              </button>
            </div>
          </div>

          {/* Statutory Declaration */}
          <div className="card" style={{ padding: '16px', background: '#FFF8E1', borderColor: '#FFE082' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={declarationChecked}
                onChange={e => setDeclarationChecked(e.target.checked)}
                style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#00897B' }}
              />
              <span style={{ fontSize: '12px', color: '#5D4037', lineHeight: 1.4 }}>
                <strong>Statutory Declaration:</strong> I hereby declare that all technical facts, explanations, and corrective commitments provided herein are true, accurate, and authorized on behalf of Mine A2 management.
              </span>
            </label>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              background: '#00897B',
              borderColor: '#00796B',
              padding: '12px',
              fontSize: '13.5px',
              justifyContent: 'center'
            }}
          >
            <Send size={15} />
            <span>Proceed to Review & Submission (Screen 10)</span>
          </button>
        </div>
      </form>
    </div>
  );
};
