"use client";

import React from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  Lock,
  Eye,
  AlertTriangle,
  FileText,
  Camera,
  Calendar,
  User,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Hash,
  Activity,
  ChevronLeft
} from 'lucide-react';

export const Screen05ObservationDetails: React.FC = () => {
  const {
    activeObservation,
    activeInspection,
    findings,
    setActiveFinding,
    navigateTo,
    openEvidenceDrawer,
    evidenceItems
  } = useMineResponse();

  const obs = activeObservation;
  const linkedFinding = findings.find(f => f.id === obs.relatedFindingId) || findings[0];

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
              <span>Back to Checklist</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B',
                borderColor: 'rgba(0, 137, 123, 0.4)'
              }}
            >
              {obs.id}
            </span>
            <span className="badge badge-danger">NON-COMPLIANT</span>
            <span className="badge badge-warning">LINKED TO {obs.requirementId}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            FIELD OBSERVATION DETAILS
          </h1>
          <p className="screen-subtitle">
            Immutable field record captured by Lead Inspector {obs.inspector.name} during statutory inspection {obs.inspectionId}
          </p>
        </div>

        {/* Action Controls for Mine Manager */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (linkedFinding) setActiveFinding(linkedFinding);
              navigateTo('08');
            }}
          >
            <AlertTriangle size={13} color="#E65100" />
            <span>View Related Finding ({obs.relatedFindingId})</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              if (linkedFinding) setActiveFinding(linkedFinding);
              navigateTo('09');
            }}
            style={{ background: '#00897B', borderColor: '#00796B' }}
          >
            <FileText size={13} />
            <span>Add Mine Response</span>
          </button>
        </div>
      </div>

      {/* Statutory Immutability Banner */}
      <div
        className="card"
        style={{
          background: '#FFF8E1',
          border: '1px solid #FFE082',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#FFA000',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Lock size={15} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#B78103' }}>
            IMMUTABLE STATUTORY FIELD RECORD
          </div>
          <div style={{ fontSize: '11.5px', color: '#5D4037', marginTop: '1px' }}>
            Original inspector observations, physical measurements, optical captures, and timestamps are cryptographically signed and cannot be altered by mine management.
          </div>
        </div>
        <span className="badge badge-subtle font-mono" style={{ fontSize: '11px' }}>
          SHA-256 VERIFIED
        </span>
      </div>

      {/* Grid Layout: 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '20px' }}>
        {/* Left Column: Source, Location, Description & Assessment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Source Metadata */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              SOURCE CONTEXT
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Inspection ID</div>
                <div
                  style={{ fontSize: '13px', fontWeight: 700, color: '#00897B', cursor: 'pointer', marginTop: '2px' }}
                  onClick={() => navigateTo('03')}
                >
                  {obs.inspectionId} &rarr;
                </div>
              </div>
              <div style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Checklist Requirement</div>
                <div
                  style={{ fontSize: '13px', fontWeight: 700, color: '#00897B', cursor: 'pointer', marginTop: '2px' }}
                  onClick={() => navigateTo('04')}
                >
                  {obs.requirementId} &rarr;
                </div>
              </div>
              <div style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Location in Mine</div>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="#D32F2F" />
                  <span>{obs.location}</span>
                </div>
              </div>
              <div style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Inspector & Timestamp</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {obs.inspector.name} &bull; {obs.timestamp}
                </div>
              </div>
            </div>
          </div>

          {/* Observation Narrative */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              INSPECTOR OBSERVATION
            </h3>
            <div
              style={{
                fontSize: '13.5px',
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                background: '#FAFAFA',
                padding: '14px',
                borderRadius: '6px',
                borderLeft: '4px solid #D32F2F',
                borderTop: '1px solid var(--border-light)',
                borderRight: '1px solid var(--border-light)',
                borderBottom: '1px solid var(--border-light)'
              }}
            >
              {obs.text}
            </div>
          </div>

          {/* Inspector Assessment */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <AlertTriangle size={15} color="#D32F2F" />
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#D32F2F', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                INSPECTOR ASSESSMENT &bull; POTENTIAL NON-COMPLIANCE
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
              {obs.assessment}
            </p>
          </div>
        </div>

        {/* Right Column: Physical Measurement & Evidence Dossier */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Measurement Box */}
          {obs.measurement && (
            <div className="card" style={{ padding: '16px', background: '#FBE9E7', borderColor: '#FFCCBC' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Activity size={16} color="#D84315" />
                  <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#D84315', textTransform: 'uppercase' }}>
                    QUANTITATIVE MEASUREMENT
                  </h3>
                </div>
                <span className="badge badge-danger">DEFICIT RECORDED</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div style={{ background: '#FFF', padding: '12px', borderRadius: '6px', border: '1px solid #FFAB91', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#BF360C', fontWeight: 700, textTransform: 'uppercase' }}>
                    Observed Field Reading
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '4px' }}>
                    {obs.measurement.observed}
                  </div>
                </div>

                <div style={{ background: '#FFF', padding: '12px', borderRadius: '6px', border: '1px solid #C8E6C9', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#2E7D32', fontWeight: 700, textTransform: 'uppercase' }}>
                    Statutory Required
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#2E7D32', fontFamily: 'monospace', marginTop: '4px' }}>
                    {obs.measurement.required}
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.85)', padding: '10px 12px', borderRadius: '6px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Measuring Instrument:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{obs.measurement.instrument}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Calibration Status:</span>
                  <span style={{ fontWeight: 700, color: '#2E7D32' }}>✓ {obs.measurement.calibrationStatus}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Calibration Validity:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Through {obs.measurement.calibrationExpiry}</span>
                </div>
              </div>
            </div>
          )}

          {/* Captured Field Evidence */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                LINKED INSPECTION EVIDENCE
              </h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('06')}
                style={{ fontSize: '11px', padding: '2px 8px' }}
              >
                View Gallery ({evidenceItems.length})
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {evidenceItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => openEvidenceDrawer(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    background: 'var(--bg-surface-alt)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#00897B')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-light)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {item.type === 'PHOTO' ? <Camera size={16} color="#00897B" /> : <FileText size={16} color="#0288D1" />}
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {item.filename} &bull; {item.fileSize}
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '10.5px' }}>
                    {item.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
