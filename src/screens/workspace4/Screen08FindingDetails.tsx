"use client";

import React from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  AlertTriangle,
  Scale,
  Eye,
  Activity,
  Camera,
  FileCheck,
  CheckSquare,
  Clock,
  User,
  Shield,
  Calendar,
  Lock,
  ChevronLeft,
  ArrowRight,
  GitBranch
} from 'lucide-react';

export const Screen08FindingDetails: React.FC = () => {
  const {
    activeFinding,
    activeObservation,
    navigateTo,
    evidenceItems,
    openEvidenceDrawer,
    capaList,
    setActiveCapa
  } = useMineResponse();

  const fnd = activeFinding;
  const trace = fnd.regulatoryTrace;
  const linkedCapa = capaList.find(c => c.findingId === fnd.id || c.id === fnd.capaId);

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('07')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Findings</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                background: 'rgba(211, 47, 47, 0.15)',
                color: '#D32F2F',
                borderColor: 'rgba(211, 47, 47, 0.4)'
              }}
            >
              {fnd.id}
            </span>
            <span className="badge badge-danger">SEVERITY: {fnd.severity}</span>
            <span className="status-pill status-active">✓ STATUS: {fnd.status.toUpperCase()}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY FINDING DOSSIER &bull; {fnd.title}
          </h1>
          <p className="screen-subtitle">
            Source: Inspection {fnd.inspectionId} &bull; Authority: Internal Statutory &bull; Track: Safety &bull; Mine A2
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {linkedCapa && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setActiveCapa(linkedCapa);
                navigateTo('13');
              }}
            >
              <CheckSquare size={13} color="#00897B" />
              <span>View CAPA ({linkedCapa.id})</span>
            </button>
          )}

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('11')}
          >
            <GitBranch size={13} />
            <span>Response History</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('09')}
            style={{ background: '#00897B', borderColor: '#00796B' }}
          >
            <FileCheck size={13} />
            <span>Respond to Finding</span>
          </button>
        </div>
      </div>

      {/* Grid Layout: 7 Structured Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '20px' }}>
        {/* Left Column: Finding, Regulatory Basis, Original Observation, Review Decision */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 1: FINDING SUMMARY */}
          <div className="card" style={{ padding: '16px', borderLeft: '4px solid #D32F2F' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <AlertTriangle size={16} color="#D32F2F" />
              <h2 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                SECTION 1: CONFIRMED FINDING
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: 500 }}>
              {fnd.issueDescription}
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              <span>Requirement ID: <strong className="font-mono" style={{ color: '#00796B' }}>{fnd.requirementId}</strong></span>
              <span>Response Deadline: <strong style={{ color: '#D32F2F' }}>{fnd.responseDue} ({fnd.daysRemaining} days left)</strong></span>
            </div>
          </div>

          {/* SECTION 2: REGULATORY BASIS (COMPLETE TRACEABILITY) */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Scale size={16} color="#00897B" />
              <h2 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                SECTION 2: REGULATORY BASIS & STATUTORY TRACEABILITY
              </h2>
            </div>
            <div style={{ background: 'var(--bg-surface-alt)', borderRadius: '6px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-light)', display: 'grid', gridTemplateColumns: '130px 1fr', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Governing Act:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{trace.act}</span>
              </div>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-light)', display: 'grid', gridTemplateColumns: '130px 1fr', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Regulation:</span>
                <span style={{ fontWeight: 700, color: '#00796B' }}>{trace.regulation}</span>
              </div>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-light)', display: 'grid', gridTemplateColumns: '130px 1fr', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Clause:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{trace.clause}</span>
              </div>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-light)', display: 'grid', gridTemplateColumns: '130px 1fr', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Statutory Text:</span>
                <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{trace.requirement}</span>
              </div>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-light)', display: 'grid', gridTemplateColumns: '130px 1fr', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Applicability:</span>
                <span style={{ color: 'var(--text-secondary)' }}>{trace.applicability}</span>
              </div>
              <div style={{ padding: '10px 14px', display: 'grid', gridTemplateColumns: '130px 1fr', fontSize: '12px', background: '#FFF8E1' }}>
                <span style={{ color: '#B78103', fontWeight: 700 }}>Penal Provision:</span>
                <span style={{ color: '#B71C1C', fontWeight: 600 }}>{trace.penalProvision}</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: INSPECTOR OBSERVATION */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={16} color="var(--text-secondary)" />
                <h2 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                  SECTION 3: ORIGINAL INSPECTOR OBSERVATION
                </h2>
              </div>
              <span className="badge badge-subtle font-mono" style={{ fontSize: '11px' }}>
                {fnd.originalObservationId}
              </span>
            </div>
            <div style={{ background: '#FAFAFA', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
              {activeObservation.text}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Inspector: {activeObservation.inspector.name}</span>
              <span>Captured: {activeObservation.timestamp}</span>
            </div>
          </div>

          {/* SECTION 6: REVIEW DECISION */}
          <div className="card" style={{ padding: '16px', background: '#F1F8E9', borderColor: '#C8E6C9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Shield size={16} color="#2E7D32" />
              <h2 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#2E7D32', textTransform: 'uppercase' }}>
                SECTION 6: STATUTORY REVIEW DECISION
              </h2>
            </div>
            <div style={{ fontSize: '12.5px', color: '#1B5E20', lineHeight: 1.5, marginBottom: '8px' }}>
              "{fnd.reviewDecision.reviewerRemarks}"
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#33691E', fontWeight: 600, borderTop: '1px dashed #A5D6A7', paddingTop: '8px' }}>
              <span>Confirmed By: {fnd.reviewDecision.confirmedBy}</span>
              <span>Date: {fnd.reviewDecision.confirmedDate}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Measurement, Evidence, Mine Response Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 4: QUANTITATIVE MEASUREMENT */}
          <div className="card" style={{ padding: '16px', background: '#FBE9E7', borderColor: '#FFCCBC' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Activity size={16} color="#D84315" />
              <h2 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#D84315', textTransform: 'uppercase' }}>
                SECTION 4: MEASUREMENT DATA
              </h2>
            </div>
            <div style={{ background: '#FFF', padding: '12px', borderRadius: '6px', border: '1px solid #FFAB91', marginBottom: '8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Observed vs Prescribed Threshold
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#D32F2F', fontFamily: 'monospace', marginTop: '4px' }}>
                {fnd.measurementText}
              </div>
            </div>
            <div style={{ fontSize: '11.5px', color: '#BF360C' }}>
              Calibrated instrument: Digital Anemometer #ANM-2024-91 (Valid through Jan 2027)
            </div>
          </div>

          {/* SECTION 5: EVIDENCE ATTACHMENTS */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={16} color="#00897B" />
                <h2 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                  SECTION 5: EVIDENCE ARTIFACTS
                </h2>
              </div>
              <span className="badge badge-info">{evidenceItems.length} Files</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {evidenceItems.slice(0, 3).map(item => (
                <div
                  key={item.id}
                  onClick={() => openEvidenceDrawer(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'var(--bg-surface-alt)',
                    borderRadius: '6px',
                    border: '1px solid var(--border-light)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.title}
                  </span>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '10px' }}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7: MINE RESPONSE STATUS & CTA */}
          <div className="card" style={{ padding: '16px', border: '2px solid #00897B', background: 'rgba(0, 137, 123, 0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <FileCheck size={16} color="#00897B" />
              <h2 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#004D40', textTransform: 'uppercase' }}>
                SECTION 7: MINE MANAGEMENT RESPONSE
              </h2>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Response Submission Status
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: fnd.mineResponse?.status === 'Submitted' ? '#2E7D32' : '#E65100', marginTop: '2px' }}>
                {fnd.mineResponse?.status === 'Submitted' ? '✓ Official Response Submitted' : '⏳ Response Not Yet Submitted / Pending'}
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0 0 16px' }}>
              Mine management must formally submit an explanation, immediate remedial actions taken, root cause analysis, and committed corrective action plan (CAPA).
            </p>

            <button
              className="btn btn-primary"
              onClick={() => navigateTo('09')}
              style={{
                width: '100%',
                background: '#00897B',
                borderColor: '#00796B',
                justifyContent: 'center',
                padding: '10px'
              }}
            >
              <FileCheck size={15} />
              <span>Author & Submit Official Mine Response</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
