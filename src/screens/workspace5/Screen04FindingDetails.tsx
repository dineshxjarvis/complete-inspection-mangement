"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  AlertTriangle,
  Lock,
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
  ChevronLeft,
  ArrowRight,
  GitBranch,
  ShieldAlert,
  GitCommit,
  Layers,
  History
} from 'lucide-react';

export const Screen04FindingDetails: React.FC = () => {
  const {
    activeFinding,
    navigateTo,
    setIsEscalateModalOpen,
    openDocumentViewer,
    regulatoryDocuments
  } = useRegulatoryAction();

  const fnd = activeFinding;
  const obs = fnd.originalObservation;

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('02')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Queue</span>
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
            <span className="status-pill status-completed">✓ STATUS: {fnd.status.toUpperCase()}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY FINDING DOSSIER &bull; {fnd.title}
          </h1>
          <p className="screen-subtitle">
            Mine: <strong>{fnd.mine}</strong> &bull; Inspection: <strong>{fnd.inspectionId}</strong> &bull; Authority: {fnd.authority} &bull; Track: {fnd.track} &bull; Date: {fnd.inspectionDate}
          </p>
        </div>

        {/* Action Bar */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('05')}
          >
            <GitCommit size={13} color="#3F51B5" />
            <span>Traceability Chain (Screen 05)</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsEscalateModalOpen(true)}
            style={{ color: '#D32F2F', borderColor: '#FFCDD2' }}
          >
            <ShieldAlert size={13} />
            <span>Escalate</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('08')}
            style={{ background: '#1A237E', borderColor: '#303F9F' }}
          >
            <FileCheck size={13} />
            <span>Issue Regulatory Action</span>
          </button>
        </div>
      </div>

      {/* Grid: 10 Structured Sections across 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '16px', marginBottom: '30px' }}>
        {/* Left Column: Sections 1 to 6 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 1 — FINDING SUMMARY */}
          <div className="card" style={{ padding: '16px', borderLeft: '4px solid #D32F2F' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <AlertTriangle size={16} color="#D32F2F" />
              <h2 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                SECTION 1 — CONFIRMED STATUTORY FINDING
              </h2>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {fnd.title}
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {fnd.issueDescription}
            </p>
          </div>

          {/* SECTION 2 — SOURCE & INSPECTION CONTEXT */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              SECTION 2 — SOURCE & INSPECTION CONTEXT
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', fontSize: '12px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Lead Inspector:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{fnd.leadInspector.name}</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{fnd.leadInspector.designation}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Inspection Authority:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{fnd.authority} DGMS Audit</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Inspection Date:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{fnd.inspectionDate}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Inspection ID:</span>
                <div style={{ fontWeight: 700, color: '#1A237E', marginTop: '2px' }}>{fnd.inspectionId}</div>
              </div>
            </div>
          </div>

          {/* SECTION 3 — ORIGINAL FIELD OBSERVATION (READ-ONLY) */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={15} color="var(--text-secondary)" />
                <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  SECTION 3 — ORIGINAL OBSERVATION (IMMUTABLE)
                </h3>
              </div>
              <span className="badge badge-subtle font-mono" style={{ fontSize: '10.5px' }}>
                {obs.id}
              </span>
            </div>
            <div style={{ background: '#FAFAFA', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
              {obs.text}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Location: {obs.location}</span>
              <span>Logged: {obs.timestamp}</span>
            </div>
          </div>

          {/* SECTION 4 — QUANTITATIVE MEASUREMENT */}
          {obs.measurementObserved && (
            <div className="card" style={{ padding: '16px', background: '#FFF8E1', borderColor: '#FFE082' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Activity size={16} color="#F57F17" />
                <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', color: '#B78103' }}>
                  SECTION 4 — QUANTITATIVE MEASUREMENT DATA
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid #FFE082', textAlign: 'center' }}>
                  <div style={{ fontSize: '10.5px', color: '#B71C1C', fontWeight: 700 }}>OBSERVED VELOCITY</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace' }}>
                    {obs.measurementObserved}
                  </div>
                </div>

                <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid #C8E6C9', textAlign: 'center' }}>
                  <div style={{ fontSize: '10.5px', color: '#2E7D32', fontWeight: 700 }}>STATUTORY MINIMUM</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#2E7D32', fontFamily: 'monospace' }}>
                    {obs.measurementRequired}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '11.5px', color: '#5D4037' }}>
                Measuring Instrument: <strong>{obs.instrument}</strong> &bull; Calibration: <strong>{obs.calibrationStatus}</strong>
              </div>
            </div>
          )}

          {/* SECTION 6 — REGULATORY TRACEABILITY CHAIN (CLICKABLE) */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scale size={16} color="#1A237E" />
                <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                  SECTION 6 — REGULATORY TRACEABILITY HIERARCHY
                </h3>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('05')}
                style={{ fontSize: '11px', padding: '2px 8px' }}
              >
                View Full Chain (Screen 05) &rarr;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                <span className="badge badge-info font-mono" style={{ width: '100px' }}>REGULATION</span>
                <span style={{ fontWeight: 600 }}>{fnd.act}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                <span className="badge badge-info font-mono" style={{ width: '100px' }}>CLAUSE</span>
                <span style={{ fontWeight: 600, color: '#1A237E' }}>{fnd.clause}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                <span className="badge badge-info font-mono" style={{ width: '100px' }}>REQUIREMENT</span>
                <span>{fnd.regulatoryBasisText}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                <span className="badge badge-info font-mono" style={{ width: '100px' }}>APPLICABILITY</span>
                <span>{fnd.applicability}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                <span className="badge badge-info font-mono" style={{ width: '100px' }}>OBLIGATION</span>
                <span>{fnd.obligation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sections 5, 7, 8, 9, 10 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 5 — EVIDENCE ARTIFACTS */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={16} color="#1A237E" />
                <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                  SECTION 5 — EVIDENCE ARTIFACTS
                </h3>
              </div>
              <span className="badge badge-info">{obs.photos.length + obs.documents.length} Files</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {obs.photos.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px', fontSize: '11.5px' }}>
                  <span>📷 {p}</span>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '10px' }}>PHOTO</span>
                </div>
              ))}
              {obs.documents.map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px', fontSize: '11.5px' }}>
                  <span>📄 {d}</span>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '10px' }}>CERTIFICATE</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7 — REVIEW DECISION */}
          <div className="card" style={{ padding: '16px', background: '#E8F5E9', borderColor: '#C8E6C9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Shield size={16} color="#2E7D32" />
              <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', color: '#1B5E20' }}>
                SECTION 7 — STATUTORY REVIEW DECISION
              </h3>
            </div>
            <div style={{ fontSize: '12.5px', color: '#1B5E20', lineHeight: 1.4, marginBottom: '8px' }}>
              "{fnd.reviewDecision.remarks}"
            </div>
            <div style={{ fontSize: '11.5px', color: '#2E7D32', borderTop: '1px dashed #A5D6A7', paddingTop: '6px' }}>
              Confirmed By: <strong>{fnd.reviewDecision.reviewedBy}</strong> &bull; Date: {fnd.reviewDecision.reviewDate}
            </div>
          </div>

          {/* SECTION 8 — MINE RESPONSE STATUS */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                SECTION 8 — MINE RESPONSE
              </h3>
              <span className="badge badge-success">✓ {fnd.mineResponse?.status || 'Pending'}</span>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {fnd.mineResponse?.explanation || 'Awaiting formal mine management response submission.'}
            </p>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('10')}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Review Mine Response (Screen 10)</span>
            </button>
          </div>

          {/* SECTION 9 — CAPA CORRECTIVE ACTION */}
          <div className="card" style={{ padding: '16px', borderLeft: '4px solid #1A237E' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', color: '#1A237E' }}>
                SECTION 9 — CORRECTIVE ACTION (CAPA)
              </h3>
              <span className="badge badge-warning">{fnd.capaHandoff?.status || 'Required'}</span>
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-primary)', marginBottom: '4px' }}>
              Linked CAPA ID: <strong>{fnd.capaHandoff?.capaId || 'CAPA-2026-0048'}</strong>
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Department: {fnd.capaHandoff?.responsibleDepartment} &bull; Target: {fnd.capaHandoff?.dueDate}
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigateTo('12')}
              style={{ width: '100%', background: '#1A237E', borderColor: '#303F9F', justifyContent: 'center' }}
            >
              <CheckSquare size={13} />
              <span>CAPA Handoff (Screen 12)</span>
            </button>
          </div>

          {/* SECTION 10 — HISTORY SHORTCUT */}
          <div className="card" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={16} color="var(--text-muted)" />
              <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Section 10 — Chronological History</span>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('14')}
            >
              <span>View History (Screen 14)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
