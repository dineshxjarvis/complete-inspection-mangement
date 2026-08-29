"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  FileText,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Flame,
  CheckSquare,
  Wrench,
  HardHat,
  FolderOpen
} from 'lucide-react';

export const Screen08PreInspectionBrief: React.FC = () => {
  const {
    inspections,
    activeInspectionId,
    navigateTo
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];
  const [briefReviewed, setBriefReviewed] = useState(false);

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('04', { inspectionId: insp.id })}>Assign Team</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Pre-Inspection Brief Dossier</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <FileText size={20} color="var(--purple-primary)" />
            <span>PRE-INSPECTION CONTEXT BRIEF</span>
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{insp.id}</span>
            <span className={`badge ${briefReviewed ? 'badge-completed' : 'badge-planned'}`}>
              <span className="badge-dot" />{briefReviewed ? 'BRIEF REVIEWED (READY)' : 'AWAITING TEAM REVIEW'}
            </span>
          </h1>
          <p className="screen-subtitle">
            Statutory operational briefing dossier compiled for assigned team before entering <strong>{insp.mine}</strong>.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('05', { inspectionId: insp.id })}>
            <ArrowLeft size={14} /> Back to Team Detail
          </button>
          <button
            className={`btn ${briefReviewed ? 'btn-success' : 'btn-primary'}`}
            onClick={() => setBriefReviewed(true)}
          >
            {briefReviewed ? '✓ Brief Marked Reviewed' : 'Mark Brief Reviewed'}
          </button>
        </div>
      </div>

      {/* Assigned Team Summary Strip */}
      <div className="identity-strip" style={{ marginBottom: '16px' }}>
        <div className="identity-grid">
          <div className="identity-field">
            <span className="identity-label">LEAD INSPECTOR</span>
            <span className="identity-val">{insp.assignedTeam.leadInspector?.name || 'R. Sharma (Assigned)'}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">SPECIALIST(S)</span>
            <span className="identity-val">{insp.assignedTeam.specialists.map(s => s.person.name).join(', ') || 'K. Rao (Mechanical)'}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">SCHEDULED SLOT</span>
            <span className="identity-val font-mono">{insp.scheduledDate} ({insp.scheduledTime})</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">CIRCUIT SCOPE</span>
            <span className="identity-val font-mono">{insp.location}</span>
          </div>
        </div>
      </div>

      {/* 10 Structured Briefing Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        
        {/* Section 1 & 2: Objective & Scope */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">1. Statutory Objective</span>
            </div>
            <div className="card-body" style={{ fontSize: '12px' }}>
              <p style={{ lineHeight: 1.5, color: 'var(--text-primary)' }}>
                {insp.objective}
              </p>
              <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                Mandated under Coal Mines Regulations (CMR) 2017 Regulation 153 & Section 22 of Mines Act 1952.
              </div>
            </div>
          </div>

          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">2. Operational Scope</span>
            </div>
            <div className="card-body" style={{ fontSize: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>MINE & SEAM</span>
                  <div>{insp.mine}</div>
                </div>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>AREA & SUBSIDIARY</span>
                  <div>{insp.area} / {insp.subsidiary}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SPECIFIC CIRCUIT / EQUIPMENT</span>
                  <div className="font-mono" style={{ fontSize: '11px' }}>{insp.location}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section 3: Statutory Regulatory Basis & Governance Spine */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <Shield size={15} color="var(--purple-primary)" />
              3. Regulatory Basis & Statutory Traceability Spine
            </span>
          </div>
          <div className="card-body">
            {/* Traceability Chain Visual */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)', marginBottom: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 700 }}>REGULATION</span>
                <div style={{ fontWeight: 700, color: 'var(--purple-primary)', fontSize: '12px' }}>CMR 2017 Reg 153</div>
              </div>
              <span style={{ color: 'var(--purple-primary)', fontWeight: 700 }}>&rarr;</span>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 700 }}>REQUIREMENT</span>
                <div style={{ fontWeight: 600, fontSize: '11.5px' }}>Quarterly Airway Survey</div>
              </div>
              <span style={{ color: 'var(--purple-primary)', fontWeight: 700 }}>&rarr;</span>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 700 }}>OBLIGATION</span>
                <div style={{ fontWeight: 600, fontSize: '11.5px' }}>Audit Split 1 to 6 Velocity</div>
              </div>
              <span style={{ color: 'var(--purple-primary)', fontWeight: 700 }}>&rarr;</span>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 700 }}>INSPECTION</span>
                <div style={{ fontWeight: 700, color: 'var(--status-green-text)', fontSize: '12px' }}>{insp.id}</div>
              </div>
            </div>

            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              <strong>Statutory Clause:</strong> &ldquo;The manager shall cause the quantity of air to be measured at least once in every 30 days at intake and return splits, and calibrate mechanical fan drift depression continuously.&rdquo;
            </div>
          </div>
        </div>

        {/* Section 4: Approved Checklist */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <CheckSquare size={15} color="var(--purple-primary)" />
              4. Mandated Inspection Checklist ({insp.checklistChecksCount} Approved Checks)
            </span>
            <span className="badge badge-completed">DGMS Standard Checklist v3.1</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="strata-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>Check Description</th>
                    <th>Statutory Threshold / Standard</th>
                    <th>Mandatory Method</th>
                  </tr>
                </thead>
                <tbody>
                  {insp.checklistSample.map((check, idx) => (
                    <tr key={idx}>
                      <td className="font-mono">{idx + 1}</td>
                      <td><strong>{check}</strong></td>
                      <td>
                        <span className="badge badge-draft">Per CMR 153 Formula</span>
                      </td>
                      <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Calibrated Digital Instrument Measurement</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 5 & 6: Previous Findings & Open CAPAs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <AlertTriangle size={15} color="var(--status-red-text)" />
                5. Previous Inspection Findings ({insp.previousContext.findingsCount} Logged)
              </span>
            </div>
            <div className="card-body" style={{ fontSize: '11.5px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '8px 10px', background: '#FFEBEE', borderRadius: '3px', border: '1px solid #FFCDD2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ color: '#C62828' }}>FND-2026-0318 (High Severity)</strong>
                    <span className="badge badge-high">Open</span>
                  </div>
                  <div style={{ color: '#5C0000', marginTop: '2px' }}>
                    Inadequate return airway air velocity in Split 4 (&lt; 0.3 m/s).
                  </div>
                </div>
                <div style={{ padding: '8px 10px', background: '#FFF8E1', borderRadius: '3px', border: '1px solid #FFE082' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ color: '#F57F17' }}>FND-2026-0319 (Medium Severity)</strong>
                    <span className="badge badge-planned">Remediated</span>
                  </div>
                  <div style={{ color: '#795548', marginTop: '2px' }}>
                    Water gauge manometer oil level depleted at main fan drift.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <CheckCircle2 size={15} color="var(--status-orange-text)" />
                6. Corrective Actions (CAPA Monitoring)
              </span>
            </div>
            <div className="card-body" style={{ fontSize: '11.5px' }}>
              <div style={{ padding: '8px 10px', background: '#FFF3E0', borderRadius: '3px', border: '1px solid #FFE0B2', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ color: '#E65100' }}>CAPA-2026-0044 &bull; Priority 1</strong>
                  <span className="badge badge-medium">Target: 30 Nov 2026</span>
                </div>
                <div style={{ color: '#5D4037', marginTop: '2px' }}>
                  Install auxiliary booster fan in Split 4 return regulator to elevate face velocity above 0.45 m/s.
                </div>
              </div>

              <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', padding: '6px 10px', borderRadius: '3px', fontSize: '11px', color: '#B78103' }}>
                <strong>Repeat Issue Signal:</strong> Team must perform strict anemometer verification in Split 4.
              </div>
            </div>
          </div>

        </div>

        {/* Section 7, 8 & 9: Instruments, PPE & Mandatory Documents */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <Wrench size={15} />
                7. Required Instruments
              </span>
            </div>
            <div className="card-body" style={{ fontSize: '11.5px' }}>
              <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {insp.preparation.instruments.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <HardHat size={15} />
                8. Mandatory PPE
              </span>
            </div>
            <div className="card-body" style={{ fontSize: '11.5px' }}>
              <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {insp.preparation.ppe.map((ppe, i) => (
                  <li key={i}>{ppe}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <FolderOpen size={15} />
                9. Documents to Verify
              </span>
            </div>
            <div className="card-body" style={{ fontSize: '11.5px' }}>
              <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {insp.preparation.documents.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Section 10: Operational Site Notes */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">10. Operational Site Notes & Colliery Coordination</span>
          </div>
          <div className="card-body" style={{ fontSize: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {insp.preparation.siteNotes.map((note, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--purple-primary)', fontWeight: 700 }}>&bull;</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '4px', marginBottom: '30px' }}>
        <button className="btn btn-secondary" onClick={() => navigateTo('05', { inspectionId: insp.id })}>
          <ArrowLeft size={14} /> Back to Team Detail
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${briefReviewed ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setBriefReviewed(true)}
          >
            <CheckCircle2 size={14} /> {briefReviewed ? '✓ Brief Marked Reviewed' : 'Mark Brief Reviewed'}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigateTo('11', { inspectionId: insp.id })}
          >
            Open Field Inspection (Workspace 03) &rarr;
          </button>
        </div>
      </div>

    </div>
  );
};
