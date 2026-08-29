"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Wrench,
  HardHat,
  ChevronDown,
  ChevronUp,
  Download,
  Check,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const Screen03PreInspectionBrief: React.FC = () => {
  const { activeInspection, navigateTo, showToast } = useFieldInspection();
  const [expandedClause, setExpandedClause] = useState<boolean>(true);
  const [isCached, setIsCached] = useState<boolean>(true);

  const handleCacheBrief = () => {
    setIsCached(true);
    showToast('Pre-Inspection Brief & 22 Checklist items downloaded to encrypted local storage (Offline Available)', 'success');
  };

  const handleMarkReviewed = () => {
    showToast('Brief confirmed and marked as reviewed. Proceeding to Field Readiness Verification.', 'success');
    navigateTo('04');
  };

  return (
    <div className="screen-content" style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '12px', fontWeight: 700, background: 'rgba(255, 107, 0, 0.15)', color: '#E65100' }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-danger">RISK: HIGH</span>
            <span className="badge badge-info">DGMS STATUTORY</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            PRE-INSPECTION OPERATIONAL BRIEF
          </h1>
          <p className="screen-subtitle">
            Statutory authority, objective, scope, and technical parameters prior to underground entry
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="status-pill status-scheduled" style={{ fontSize: '12px', padding: '6px 14px' }}>
            ● READY FOR INSPECTION
          </span>
        </div>
      </div>

      {/* Identity Strip */}
      <div
        className="card"
        style={{
          background: 'var(--bg-surface-alt)',
          borderLeft: '4px solid #FF6B00',
          padding: '16px 20px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Authority</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Internal &bull; DGMS Statutory
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Track & Type</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Safety &bull; Ventilation Audit
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scope Location</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Area 01 / Mine A2 (Seam VII)
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date & Window</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              15 Nov 2026 (10:30 – 14:30)
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Offline Status</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#2E7D32' }}>
              ✓ Encrypted & Cached
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Grid of 11 Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        
        {/* Left Column: Scope, Regulatory Basis, Checklist & Findings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* SECTION 1 — OBJECTIVE */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
              SECTION 1 &bull; OPERATIONAL OBJECTIVE
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {activeInspection.objective}
            </p>
          </div>

          {/* SECTION 2 — INSPECTION SCOPE */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
              SECTION 2 &bull; TARGET INSPECTION SCOPE
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px 14px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target Colliery:</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{activeInspection.mine} (Eastern Coalfields)</div>
              </div>
              <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px 14px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target Seam & Horizon:</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{activeInspection.seam} (-320m RL)</div>
              </div>
              <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px 14px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Working District:</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>District 4 (Heading 7E & Return Split)</div>
              </div>
              <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px 14px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Key Equipment:</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Main Booster, Aux Fan #7, Gate End Box #4</div>
              </div>
            </div>
          </div>

          {/* SECTION 3 — REGULATORY BASIS (Traceability Chain) */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                SECTION 3 &bull; STATUTORY REGULATORY TRACEABILITY
              </h3>
              <button
                onClick={() => setExpandedClause(!expandedClause)}
                style={{ background: 'none', border: 'none', color: '#FF6B00', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>{expandedClause ? 'Collapse Chain' : 'Expand Chain'}</span>
                {expandedClause ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {expandedClause && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ background: '#EDE7F6', color: '#4527A0', padding: '4px 8px', borderRadius: '4px', fontSize: '11.5px', fontWeight: 700 }}>
                    REGULATION
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Coal Mines Regulations (CMR) 2017</span>
                </div>
                <div style={{ marginLeft: '12px', borderLeft: '2px solid #D1C4E9', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#7C4DFF', fontWeight: 700 }}>CLAUSE: </span>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>Regulation 153(2)(b) — Standard of Ventilation</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#7C4DFF', fontWeight: 700 }}>REQUIREMENT: </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Minimum air quantity of 285 m³/min at Last Ventilation Connection (LVC).</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#7C4DFF', fontWeight: 700 }}>APPLICABILITY: </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>All Degree II & III gassy underground workings.</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#7C4DFF', fontWeight: 700 }}>OBLIGATION: </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Mandatory cross-sectional anemometer test at each split before shift entry.</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#7C4DFF', fontWeight: 700 }}>INSPECTION CHECK: </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Measure volumetric airflow with calibrated vane anemometer and record photo.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 4 — CHECKLIST OVERVIEW */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                SECTION 4 &bull; STATUTORY CHECKLIST (22 ITEMS)
              </h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('07')}
              >
                View Full Checklist
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ background: 'var(--status-red-bg)', border: '1px solid var(--status-red-border)', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: '#B71C1C', fontWeight: 700 }}>CRITICAL CHECKS</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#B71C1C' }}>5 Checks</div>
                <div style={{ fontSize: '10.5px', color: '#B71C1C' }}>LVC Flow, CH4, SCAMP, FLP, Sirdar</div>
              </div>

              <div style={{ background: 'var(--status-amber-bg)', border: '1px solid var(--status-amber-border)', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: '#E65100', fontWeight: 700 }}>MANDATORY CHECKS</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#E65100' }}>17 Checks</div>
                <div style={{ fontSize: '10.5px', color: '#E65100' }}>Dust Barriers, Cables, Refuge, Plans</div>
              </div>

              <div style={{ background: 'var(--bg-surface-subtle)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>SECTIONS</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>5 Groups</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Vent, Strata, Elec, Logs, Emerg</div>
              </div>
            </div>
          </div>

          {/* SECTION 5 & 6 — PREVIOUS FINDINGS & CAPA */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
              SECTION 5 & 6 &bull; PREVIOUS FINDINGS & OPEN CAPA
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeInspection.previousFindings.map(f => (
                <div
                  key={f.id}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: f.status === 'Open' ? 'var(--status-red-bg)' : 'var(--bg-surface-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="font-mono" style={{ fontSize: '11.5px', fontWeight: 700 }}>{f.id}</span>
                      <span className={`badge ${f.status === 'Open' ? 'badge-danger' : 'badge-subtle'}`}>
                        {f.status}
                      </span>
                      <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{f.title}</span>
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      {f.notes}
                    </p>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{f.dateReported}</span>
                </div>
              ))}

              {/* Open CAPA */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--status-orange-border)',
                  background: 'var(--status-orange-bg)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#E65100' }}>
                    OPEN CAPA &bull; {activeInspection.previousCAPAs[0].id}
                  </span>
                  <span style={{ fontSize: '11px', color: '#E65100', fontWeight: 600 }}>
                    Due: {activeInspection.previousCAPAs[0].targetDate}
                  </span>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#E65100', marginTop: '4px' }}>
                  {activeInspection.previousCAPAs[0].issue}
                </div>
                <div style={{ fontSize: '11.5px', color: '#4A5568', marginTop: '2px' }}>
                  Officer Responsible: {activeInspection.previousCAPAs[0].responsibleOfficer}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Evidence Rules, Instruments, PPE, Team, Site Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* SECTION 7 — REQUIRED EVIDENCE RULES */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
              SECTION 7 &bull; EVIDENCE CAPTURE RULES
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <div style={{ background: 'var(--bg-surface-subtle)', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                <span style={{ fontWeight: 600 }}>📸 Photo Evidence:</span> Mandatory for deviations
              </div>
              <div style={{ background: 'var(--bg-surface-subtle)', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                <span style={{ fontWeight: 600 }}>📊 Measurement:</span> Mandatory for Airflow & Gas
              </div>
              <div style={{ background: 'var(--bg-surface-subtle)', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                <span style={{ fontWeight: 600 }}>📄 Document:</span> Required for Statutory Logs
              </div>
              <div style={{ background: 'var(--bg-surface-subtle)', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                <span style={{ fontWeight: 600 }}>📍 GPS/Level:</span> Auto-stamped on every capture
              </div>
            </div>
          </div>

          {/* SECTION 8 — REQUIRED INSTRUMENTS */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
              SECTION 8 &bull; REQUIRED CALIBRATED INSTRUMENTS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeInspection.requiredInstruments.map(inst => (
                <div
                  key={inst.serial}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600 }}>{inst.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>S/N: {inst.serial} &bull; Cal Due: {inst.calibrationDue}</div>
                  </div>
                  <span className="badge badge-success">✓ {inst.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 9 — REQUIRED PPE */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
              SECTION 9 &bull; MANDATORY SAFETY PPE
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {activeInspection.requiredPPE.map((ppe, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: 'var(--bg-surface-subtle)',
                    fontSize: '11.5px'
                  }}
                >
                  <Check size={14} color="#2E7D32" />
                  <span style={{ fontWeight: 500 }}>{ppe.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 10 — INSPECTION TEAM */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
              SECTION 10 &bull; ASSIGNED INSPECTION PERSONNEL
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeInspection.team.map(m => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    borderRadius: '6px',
                    background: 'var(--bg-surface-subtle)'
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: m.role.includes('Lead') ? '#E65100' : '#311B92',
                      color: '#FFF',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px'
                    }}
                  >
                    {m.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>
                      {m.name} &bull; <span style={{ color: '#FF6B00' }}>{m.role}</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{m.designation}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Assigned: {m.assignedSection}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 11 — SITE / SAFETY NOTES */}
          <div className="card" style={{ borderLeft: '4px solid #F57C00' }}>
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '8px', color: '#E65100', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={15} />
              <span>SECTION 11 &bull; OPERATIONAL RESTRICTIONS & NOTES</span>
            </h3>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {activeInspection.siteSafetyNotes.map((note, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>
                  {note}
                </li>
              ))}
            </ul>
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
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('07')}
          >
            View Full Checklist (22)
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleCacheBrief}
          >
            <Download size={13} />
            <span>Download/Cache Brief Offline</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            All 11 sections must be acknowledged before field entry
          </span>
          <button
            className="btn btn-primary"
            onClick={handleMarkReviewed}
            style={{
              background: '#FF6B00',
              borderColor: '#FF6B00',
              padding: '8px 20px',
              fontSize: '13px'
            }}
          >
            <Check size={15} />
            <span>Mark Brief Reviewed &rarr; Step 04 Readiness</span>
          </button>
        </div>
      </div>
    </div>
  );
};
