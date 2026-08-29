"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  Bell,
  ArrowRight,
  Edit,
  RotateCcw,
  ExternalLink,
  FileText
} from 'lucide-react';

export const Screen05TeamDetail: React.FC = () => {
  const {
    inspections,
    activeInspectionId,
    navigateTo,
    acceptAssignmentByInspector
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];
  const [notificationSent, setNotificationSent] = useState(false);
  const [notes, setNotes] = useState(
    '1. Priority entry via Shaft Intake 1 cage at 10:15 IST.\n2. Ventilation Officer Mr. S. Roy must provide updated Airway Network Plan v4.2.\n3. Digital anemometer calibrated calibration certificate to be checked.'
  );

  const team = insp.assignedTeam;
  const lead = team.leadInspector;
  const specialists = team.specialists;
  const supporting = team.supportingInspectors;

  const isComplete = !!lead && (specialists.length > 0 || insp.requiredTeam.specialistsRequired.length === 0);

  const handleSendNotification = () => {
    setNotificationSent(true);
  };

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('02')}>Assignment Queue</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{insp.id} Team Detail</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Users size={20} color="var(--purple-primary)" />
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{insp.id}</span>
            <span>Inspection Team Roster</span>
            <span className={`badge ${insp.status === 'Assigned' ? 'badge-completed' : 'badge-planned'}`}>
              <span className="badge-dot" />{insp.status.toUpperCase()}
            </span>
          </h1>
          <p className="screen-subtitle">
            {insp.inspectionType} &bull; {insp.mine} &bull; Scheduled {insp.scheduledDate} ({insp.scheduledTime})
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('08', { inspectionId: insp.id })}>
            <FileText size={14} /> Pre-Inspection Brief
          </button>
          <button className="btn btn-primary" onClick={() => navigateTo('04', { inspectionId: insp.id })}>
            <Edit size={14} /> Edit Team Composition
          </button>
        </div>
      </div>

      {/* Identity Strip */}
      <div className="identity-strip" style={{ marginBottom: '16px' }}>
        <div className="identity-grid">
          <div className="identity-field">
            <span className="identity-label">ORGANIZATIONAL SCOPE</span>
            <span className="identity-val font-mono">{insp.subsidiary} / {insp.area} / {insp.mine.split('(')[0]}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">STATUTORY TRACK</span>
            <span className="identity-val">{insp.track}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">TEAM COMPLETENESS</span>
            <span className="badge badge-completed">Required Team Complete: {isComplete ? 'YES' : 'NO'}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">ACCEPTANCE STATUS</span>
            <span className="badge badge-planned">{insp.acceptance.statusText}</span>
          </div>
        </div>
      </div>

      {/* Grid: Left Roster Details | Right Timeline & Notes */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '16px', marginBottom: '20px' }}>
        
        {/* Left Column: Team Personnel Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Lead Inspector Card */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <UserCheck size={15} color="var(--purple-primary)" />
                LEAD INSPECTOR (Mandatory Head of Audit)
              </span>
              <span className="badge badge-completed">Status: Assigned &bull; CMR 2017 Authorized</span>
            </div>
            <div className="card-body">
              {lead ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '4px', background: 'var(--purple-dark)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '15px' }}>
                      {lead.avatar}
                    </div>
                    <div>
                      <strong style={{ fontSize: '14px' }}>{lead.name}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{lead.designation}</div>
                      
                      <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '11px' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)', fontSize: '9.5px', fontWeight: 700 }}>SYSTEM ROLE:</span><br />
                          <strong>{lead.systemRole}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--purple-primary)', fontSize: '9.5px', fontWeight: 700 }}>INSPECTION ROLE:</span><br />
                          <strong style={{ color: 'var(--purple-primary)' }}>Lead Inspector</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)', fontSize: '9.5px', fontWeight: 700 }}>DGMS CERTIFICATE:</span><br />
                          <span className="font-mono">FCM-8821 (Valid)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('07', { personnelId: lead.id })}>
                      View Profile
                    </button>
                    <button className="btn btn-secondary btn-sm" style={{ color: 'var(--status-orange-text)' }} onClick={() => navigateTo('13', { inspectionId: insp.id })}>
                      <RotateCcw size={12} /> Reassign Lead
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '14px', background: '#FFF3E0', borderRadius: '4px', border: '1px solid #FFE0B2', color: '#E65100', fontSize: '12px' }}>
                  No Lead Inspector currently assigned. Appointment is required.
                </div>
              )}
            </div>
          </div>

          {/* Specialists Card */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <Users size={15} color="var(--purple-primary)" />
                ATTACHED SPECIALISTS & SUBJECT MATTER EXPERTS
              </span>
              <span className="badge badge-draft">{specialists.length} Specialist(s) Attached</span>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-responsive">
                <table className="strata-table">
                  <thead>
                    <tr>
                      <th>Specialist Name</th>
                      <th>System Role</th>
                      <th>Assigned Inspection Role</th>
                      <th>Competency Focus</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specialists.map((s, idx) => (
                      <tr key={idx}>
                        <td>
                          <strong>{s.person.name}</strong>
                          <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{s.person.designation}</div>
                        </td>
                        <td>{s.person.systemRole}</td>
                        <td><strong style={{ color: 'var(--purple-primary)' }}>{s.inspectionRole}</strong></td>
                        <td>{s.person.competencies.join(', ')}</td>
                        <td><span className="badge badge-completed">Assigned</span></td>
                        <td>
                          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('07', { personnelId: s.person.id })}>
                            Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                    {specialists.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '16px' }}>
                          No specialists attached. Add via [Edit Team].
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Supporting Inspectors Card */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <UserCheck size={15} />
                SUPPORTING FIELD INSPECTORS (Optional)
              </span>
            </div>
            <div className="card-body">
              {supporting.length > 0 ? (
                <div>
                  {supporting.map(sup => (
                    <div key={sup.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>{sup.name}</strong> ({sup.designation}) &bull; System Role: {sup.systemRole}
                      </div>
                      <span className="badge badge-completed">Assigned</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  None assigned. Optional role for large multi-split audits.
                </div>
              )}
            </div>
          </div>

          {/* Team Completeness Verification Matrix */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <ShieldCheck size={15} color="var(--status-green-text)" />
                Statutory Team Completeness Checklist
              </span>
            </div>
            <div className="card-body" style={{ fontSize: '11.5px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div style={{ padding: '8px', background: '#F1F8E9', borderRadius: '4px', border: '1px solid #DCEDC8' }}>
                  <div style={{ color: '#2E7D32', fontWeight: 700 }}>LEAD INSPECTOR</div>
                  <div style={{ marginTop: '4px' }}>&check; {lead ? lead.name : 'Missing'}</div>
                </div>
                <div style={{ padding: '8px', background: '#F1F8E9', borderRadius: '4px', border: '1px solid #DCEDC8' }}>
                  <div style={{ color: '#2E7D32', fontWeight: 700 }}>SAFETY SPECIALIST</div>
                  <div style={{ marginTop: '4px' }}>&check; Qualified Lead Covered</div>
                </div>
                <div style={{ padding: '8px', background: '#F1F8E9', borderRadius: '4px', border: '1px solid #DCEDC8' }}>
                  <div style={{ color: '#2E7D32', fontWeight: 700 }}>MECHANICAL SPEC.</div>
                  <div style={{ marginTop: '4px' }}>&check; K. Rao Assigned</div>
                </div>
                <div style={{ padding: '8px', background: '#FAFAFA', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>ELECTRICAL SPEC.</div>
                  <div style={{ marginTop: '4px' }}>&mdash; Optional (Not Req.)</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Assignment Notes & Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Assignment Notes */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">Assignment Notes & Site Instructions</span>
            </div>
            <div className="card-body">
              <textarea
                className="filter-input"
                style={{ width: '100%', height: '110px', fontSize: '11px', resize: 'vertical', fontFamily: 'inherit' }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Visible to Lead Inspector and attached specialists in Pre-Inspection Brief.
              </div>
            </div>
          </div>

          {/* Team Activity Timeline */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <Clock size={15} />
                Team Assignment Timeline
              </span>
            </div>
            <div className="card-body">
              <div className="timeline-container">
                
                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: 'var(--status-green-text)' }} />
                  <div className="timeline-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <strong>Team Assigned & Validated</strong>
                      <span className="timeline-date font-mono">15 Nov 09:42</span>
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                      STRATA automated 8-point eligibility passed. Lead + Specialist confirmed by S. K. Mukherjee.
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: notificationSent ? 'var(--status-green-text)' : 'var(--status-orange-text)' }} />
                  <div className="timeline-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <strong>Statutory Dispatch Notification</strong>
                      <span className="timeline-date font-mono">{notificationSent ? 'Sent Just Now' : 'Pending'}</span>
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                      {notificationSent ? 'Dispatched via SMS / Mobile Alert to R. Sharma & K. Rao.' : 'Awaiting manual broadcast trigger.'}
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: '#CBD5E1' }} />
                  <div className="timeline-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <strong>Inspector Formal Acceptance</strong>
                      <span className="timeline-date font-mono">Pending</span>
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                      Awaiting sign-off on Pre-Inspection Brief in Inspector Portal.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Quick Inspector Acceptance Trigger (Simulation for Walkthrough) */}
          <div className="enterprise-card" style={{ marginBottom: 0, background: '#F8FAFC' }}>
            <div className="card-header">
              <span className="card-title" style={{ fontSize: '12px' }}>Simulation / Quick Action</span>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  if (lead) acceptAssignmentByInspector(insp.id, lead.name);
                }}
              >
                Simulate Inspector Acceptance (R. Sharma)
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('18', { inspectionId: insp.id })}
              >
                <ExternalLink size={12} /> View Inspector Acceptance Portal (Screen 18)
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '4px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('04', { inspectionId: insp.id })}>
            <Edit size={14} /> Edit Team
          </button>
          <button className="btn btn-secondary" onClick={() => navigateTo('09', { inspectionId: insp.id })}>
            <ShieldCheck size={14} /> View Eligibility Checks
          </button>
          <button className="btn btn-secondary" onClick={() => navigateTo('13', { inspectionId: insp.id })}>
            <RotateCcw size={14} /> Reassign Personnel
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${notificationSent ? 'btn-success' : 'btn-secondary'}`}
            onClick={handleSendNotification}
          >
            <Bell size={14} /> {notificationSent ? '✓ Notification Dispatched' : 'Send Team Notification'}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigateTo('11', { inspectionId: insp.id })}
          >
            Proceed to Field Handoff &rarr;
          </button>
        </div>
      </div>

    </div>
  );
};
