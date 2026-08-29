"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  Plus,
  Trash2,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const Screen04AssignTeam: React.FC = () => {
  const {
    inspections,
    activeInspectionId,
    personnelList,
    stagedLead,
    stagedSupporting,
    stagedSpecialists,
    setLeadInspector,
    addSpecialist,
    removeSpecialist,
    addSupportingInspector,
    removeSupportingInspector,
    navigateTo,
    runValidation,
    setSelectedPersonnelId
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];
  const [draftSaved, setDraftSaved] = useState(false);

  // Recommended candidate 1: R. Sharma (Lead / Safety)
  const recLead = personnelList.find(p => p.id === 'PER-0901') || personnelList[0];
  // Recommended candidate 2: K. Rao (Mechanical Specialist)
  const recSpecialist = personnelList.find(p => p.id === 'PER-0902') || personnelList[1];
  // Supporting candidate: A. Kumar
  const recSupporting = personnelList.find(p => p.id === 'PER-0905') || personnelList[4];

  const handleValidateTeam = () => {
    navigateTo('09', { inspectionId: insp.id });
  };

  const handleAssignClick = () => {
    const val = runValidation(insp.id);
    if (!val.allPassed) {
      navigateTo('09', { inspectionId: insp.id });
    } else {
      navigateTo('10', { inspectionId: insp.id });
    }
  };

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('02')}>Assignment Queue</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{insp.id} Assign Team</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <UserPlus size={20} color="var(--purple-primary)" />
            <span>ASSIGN INSPECTION TEAM</span>
            <span className="font-mono" style={{ color: 'var(--purple-primary)', fontSize: '15px' }}>{insp.id}</span>
            <span className="badge badge-high"><span className="badge-dot" />{insp.risk} RISK</span>
          </h1>
          <p className="screen-subtitle">
            {insp.inspectionType} &bull; {insp.mine} &bull; {insp.scheduledDate} ({insp.scheduledTime})
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('03', { inspectionId: insp.id })}>
            View Preparation Brief
          </button>
          <button className="btn btn-primary" onClick={handleAssignClick}>
            Proceed to Confirmation &rarr;
          </button>
        </div>
      </div>

      {/* 4-Step Lifecycle Stepper */}
      <div className="stepper-container" style={{ marginBottom: '20px' }}>
        <div className="step-item step-completed">
          <div className="step-number"><CheckCircle2 size={13} /></div>
          <span className="step-label">1. Inspection Planned</span>
        </div>
        <div className="step-divider step-completed-divider" />
        <div className="step-item step-completed">
          <div className="step-number"><CheckCircle2 size={13} /></div>
          <span className="step-label">2. Scheduled</span>
        </div>
        <div className="step-divider step-active-divider" />
        <div className="step-item step-active">
          <div className="step-number">3</div>
          <span className="step-label">3. Assignment</span>
        </div>
        <div className="step-divider" />
        <div className="step-item step-upcoming">
          <div className="step-number">4</div>
          <span className="step-label">4. Field Execution</span>
        </div>
      </div>

      {/* Scope / Identity Summary Bar */}
      <div className="identity-strip" style={{ marginBottom: '16px' }}>
        <div className="identity-grid">
          <div className="identity-field">
            <span className="identity-label">ORGANIZATIONAL SCOPE</span>
            <span className="identity-val font-mono">{insp.holding} / {insp.subsidiary} / {insp.area} / {insp.mine.split('(')[0]}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">STATUTORY TRACK</span>
            <span className="identity-val">{insp.track}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">INSPECTION WINDOW</span>
            <span className="identity-val font-mono">{insp.scheduledDate} | {insp.shift}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">SEPARATION OF ROLES</span>
            <span className="identity-val" style={{ color: 'var(--purple-primary)', fontWeight: 600 }}>System Role &ne; Inspection Role</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: REQUIRED TEAM REQUIREMENTS */}
      <div className="enterprise-card" style={{ marginBottom: '16px' }}>
        <div className="card-header">
          <span className="card-title">
            <ShieldCheck size={15} color="var(--purple-primary)" />
            SECTION 1: Mandated Team Requirements (CMR 2017 & DGMS Safety Track)
          </span>
          <span className="badge badge-planned">Statutory Rules Enforced</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', background: '#FBFBFE' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>LEAD INSPECTOR</strong>
                <span className="badge badge-critical" style={{ fontSize: '9px' }}>1 Mandatory</span>
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>First Class Manager Certification with DGMS Safety Authorization</div>
            </div>

            <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>SUPPORTING INSPECTOR</strong>
                <span className="badge badge-draft" style={{ fontSize: '9px' }}>Optional</span>
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>Assistant Inspector / Overman for sampling and traverse assistance</div>
            </div>

            <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', background: '#FBFBFE' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>SAFETY SPECIALIST</strong>
                <span className="badge badge-high" style={{ fontSize: '9px' }}>1 Required</span>
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>Ventilation gas dynamics & hazardous atmosphere survey expertise</div>
            </div>

            <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>MECHANICAL SPECIALIST</strong>
                <span className="badge badge-planned" style={{ fontSize: '9px' }}>Recommended</span>
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>Main fan drift mechanical efficiency & pressure survey</div>
            </div>

            <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>ELECTRICAL SPECIALIST</strong>
                <span className="badge badge-draft" style={{ fontSize: '9px' }}>Optional</span>
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>Flameproof aux fan circuit verification if required</div>
            </div>

            <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>ENVIRONMENTAL SPEC.</strong>
                <span className="badge badge-draft" style={{ fontSize: '9px' }}>Optional</span>
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>Dust concentration and ambient surface discharge</div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 2: STRATA ELIGIBILITY & RECOMMENDATION ENGINE */}
      <div className="enterprise-card" style={{ marginBottom: '16px' }}>
        <div className="card-header" style={{ background: '#F7F4FD', borderBottom: '1px solid #E4DCFA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--purple-primary)" />
            <span className="card-title" style={{ color: 'var(--purple-dark)' }}>
              SECTION 2: STRATA Recommended Personnel (AI / Algorithmic Matching)
            </span>
          </div>
          <span className="badge badge-planned" style={{ background: 'var(--purple-light)', color: 'var(--purple-primary)' }}>
            Ranked by Competency &bull; Scope &bull; Availability &bull; Zero Conflict
          </span>
        </div>
        <div className="card-body">
          {/* Recommendation Basis Pill Strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px', padding: '8px 12px', background: '#FAFAFA', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>Recommendation Basis:</span>
            <span className="badge badge-completed">&check; Required Competency</span>
            <span className="badge badge-completed">&check; Statutory CMR Authorization</span>
            <span className="badge badge-completed">&check; Organizational Scope (Area 01)</span>
            <span className="badge badge-completed">&check; Available in Shift</span>
            <span className="badge badge-completed">&check; Workload (&le; 4 active)</span>
            <span className="badge badge-completed">&check; Zero Double-Booking Conflict</span>
            <span className="badge badge-completed">&check; Prior Mine A2 Experience</span>
          </div>

          {/* Recommended Candidate Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '14px' }}>
            
            {/* Recommendation 1: R. Sharma */}
            <div style={{ border: '1.5px solid var(--purple-primary)', borderRadius: '6px', padding: '14px', background: '#FFFFFF', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '12px', background: 'var(--purple-primary)', color: '#FFF', fontSize: '9.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>
                MATCH SCORE: 98% &bull; TOP RECOMMENDATION
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '4px', background: 'var(--purple-dark)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {recLead.avatar}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{recLead.name}</strong>
                    <span className="badge badge-completed">Eligible</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{recLead.designation}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px', background: 'var(--bg-surface-alt)', padding: '8px', borderRadius: '4px', marginBottom: '10px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '9.5px', fontWeight: 700 }}>SYSTEM ROLE:</span><br />
                  <strong>{recLead.systemRole}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--purple-primary)', fontSize: '9.5px', fontWeight: 700 }}>SUGGESTED INSPECTION ROLE:</span><br />
                  <strong style={{ color: 'var(--purple-primary)' }}>Lead Inspector</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '9.5px', fontWeight: 700 }}>COMPETENCIES:</span><br />
                  <span>Safety, Ventilation, Strata</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '9.5px', fontWeight: 700 }}>WORKLOAD:</span><br />
                  <span>{recLead.workload.activeInspections} active ({recLead.workload.upcomingInspections} upcoming)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSelectedPersonnelId(recLead.id);
                    navigateTo('07', { personnelId: recLead.id });
                  }}
                >
                  View Profile
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${stagedLead?.id === recLead.id ? 'btn-success' : 'btn-primary'}`}
                  onClick={() => setLeadInspector(recLead)}
                >
                  {stagedLead?.id === recLead.id ? '✓ Selected as Lead' : 'Select as Lead Inspector'}
                </button>
              </div>
            </div>

            {/* Recommendation 2: K. Rao */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '14px', background: '#FFFFFF', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '12px', background: 'var(--brand-dark)', color: '#FFF', fontSize: '9.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>
                MATCH SCORE: 94% &bull; SPECIALIST
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '4px', background: '#1E293B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {recSpecialist.avatar}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{recSpecialist.name}</strong>
                    <span className="badge badge-completed">Eligible</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{recSpecialist.designation}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px', background: 'var(--bg-surface-alt)', padding: '8px', borderRadius: '4px', marginBottom: '10px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '9.5px', fontWeight: 700 }}>SYSTEM ROLE:</span><br />
                  <strong>{recSpecialist.systemRole}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--purple-primary)', fontSize: '9.5px', fontWeight: 700 }}>SUGGESTED INSPECTION ROLE:</span><br />
                  <strong style={{ color: 'var(--purple-primary)' }}>Mechanical Specialist</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '9.5px', fontWeight: 700 }}>COMPETENCIES:</span><br />
                  <span>Mechanical, Main Fan Drift</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '9.5px', fontWeight: 700 }}>AVAILABILITY:</span><br />
                  <span>Available (Shift A)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSelectedPersonnelId(recSpecialist.id);
                    navigateTo('07', { personnelId: recSpecialist.id });
                  }}
                >
                  View Profile
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${stagedSpecialists.some(s => s.person.id === recSpecialist.id) ? 'btn-success' : 'btn-primary'}`}
                  onClick={() => addSpecialist(recSpecialist, 'Mechanical Specialist')}
                >
                  {stagedSpecialists.some(s => s.person.id === recSpecialist.id) ? '✓ Added to Specialists' : 'Select as Specialist'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 3: CURRENT SELECTED TEAM BUILDER */}
      <div className="enterprise-card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <span className="card-title">
            <User size={15} color="var(--purple-primary)" />
            SECTION 3: Current Selected Inspection Team (Staged Roster)
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('06', { role: 'Supporting Inspector' })}>
              <Plus size={12} /> Add Supporting Inspector
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('06', { role: 'Specialist' })}>
              <Plus size={12} /> Add Specialist
            </button>
          </div>
        </div>
        <div className="card-body">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* Slot 1: Lead Inspector */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: stagedLead ? '1px solid var(--purple-primary)' : '1px dashed var(--border-color)', borderRadius: '4px', background: stagedLead ? '#FAF8FF' : '#FFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: stagedLead ? 'var(--purple-primary)' : '#CBD5E1', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {stagedLead ? stagedLead.avatar : '?'}
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    MANDATORY LEAD INSPECTOR (1 Required)
                  </div>
                  {stagedLead ? (
                    <div>
                      <strong style={{ fontSize: '13px' }}>{stagedLead.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '8px' }}>({stagedLead.designation})</span>
                      <span className="badge badge-completed" style={{ marginLeft: '8px' }}>Verified CMR Lead</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: '12px', color: 'var(--status-red-text)', fontWeight: 600 }}>
                      No Lead Inspector appointed. Selection is mandatory.
                    </div>
                  )}
                </div>
              </div>
              <div>
                {stagedLead ? (
                  <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('06', { role: 'Lead Inspector' })}>
                    Change Lead
                  </button>
                ) : (
                  <button className="btn btn-primary btn-sm" onClick={() => navigateTo('06', { role: 'Lead Inspector' })}>
                    + Select Lead Inspector
                  </button>
                )}
              </div>
            </div>

            {/* Slot 2: Supporting Inspectors */}
            {stagedSupporting.map((sup) => (
              <div key={sup.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: '#FFF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '4px', background: '#475569', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {sup.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SUPPORTING INSPECTOR</div>
                    <strong style={{ fontSize: '12.5px' }}>{sup.name}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '6px' }}>({sup.designation})</span>
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm" style={{ color: 'var(--status-red-text)' }} onClick={() => removeSupportingInspector(sup.id)}>
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            ))}

            {/* Slot 3: Specialists */}
            {stagedSpecialists.map((spec) => (
              <div key={spec.person.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: '#FFF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '4px', background: '#334155', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {spec.person.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--purple-primary)', fontWeight: 700 }}>ATTACHED SPECIALIST ROLE: {spec.role.toUpperCase()}</div>
                    <strong style={{ fontSize: '12.5px' }}>{spec.person.name}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '6px' }}>({spec.person.designation})</span>
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm" style={{ color: 'var(--status-red-text)' }} onClick={() => removeSpecialist(spec.person.id)}>
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '4px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => setDraftSaved(true)}>
            {draftSaved ? '✓ Draft Saved' : 'Save Draft'}
          </button>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Authorized Manager: <strong>S. K. Mukherjee (Coordinator)</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={handleValidateTeam}>
            <ShieldCheck size={14} /> Validate Team (8 Checks)
          </button>
          <button className="btn btn-primary" onClick={handleAssignClick}>
            Assign Inspection Team &rarr;
          </button>
        </div>
      </div>

    </div>
  );
};
