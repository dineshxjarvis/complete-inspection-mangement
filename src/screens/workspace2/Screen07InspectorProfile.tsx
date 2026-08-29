"use client";

import React from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  UserCheck,
  Shield,
  Award,
  Calendar,
  AlertTriangle,
  FileText,
  Clock,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const Screen07InspectorProfile: React.FC = () => {
  const {
    personnelList,
    selectedPersonnelId,
    activeInspectionId,
    setLeadInspector,
    addSpecialist,
    navigateTo
  } = useAssignment();

  const person = personnelList.find(p => p.id === selectedPersonnelId) || personnelList[0];

  const handleSelectForActiveInspection = () => {
    if (person.competencies.includes('Ventilation') || person.systemRole === 'Field Inspector') {
      setLeadInspector(person);
    } else {
      addSpecialist(person, person.currentInspectionRole || 'Specialist');
    }
    navigateTo('04', { inspectionId: activeInspectionId });
  };

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('04')}>Assign Team</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Inspector Profile: {person.name}</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <UserCheck size={20} color="var(--purple-primary)" />
            <span>{person.name.toUpperCase()}</span>
            <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '13px' }}>({person.id})</span>
            <span className="badge badge-completed"><span className="badge-dot" />{person.availability.status}</span>
          </h1>
          <p className="screen-subtitle">
            {person.designation} &bull; {person.department} &bull; {person.subsidiary}
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('04')}>
            <ArrowLeft size={14} /> Back
          </button>
          <button className="btn btn-primary" onClick={handleSelectForActiveInspection}>
            Select for Inspection ({activeInspectionId}) &rarr;
          </button>
        </div>
      </div>

      {/* Strict Role Separation Banner */}
      <div
        style={{
          background: 'linear-gradient(90deg, #FAF5FF 0%, #F3E8FF 100%)',
          border: '1.5px solid #D8B4FE',
          borderRadius: '4px',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ fontSize: '10px', color: '#6B21A8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            PERMANENT SYSTEM ROLE (HR / Organizational Designation)
          </div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
            {person.systemRole}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Designated post in {person.organization} &bull; {person.subsidiary}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '10px', color: '#7E22CE', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            STATUTORY INSPECTION ROLE (Per Inspection Assignment)
          </div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--purple-primary)', marginTop: '2px' }}>
            {person.currentInspectionRole || 'Lead Inspector'}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Role assumed during field execution per CMR 2017 competency match
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        
        {/* Column 1: Identity, Competency, Authorizations & Scope */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Identity & Scope */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">1. Personnel Identity & Jurisdiction Scope</span>
            </div>
            <div className="card-body" style={{ fontSize: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>FULL NAME</div>
                  <div><strong>{person.name}</strong></div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PERSONNEL ID</div>
                  <div className="font-mono">{person.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>ORGANIZATION</div>
                  <div>{person.organization}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SUBSIDIARY / AREA</div>
                  <div>{person.subsidiary} / {person.area}</div>
                </div>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>AUTHORIZED MINES UNDER JURISDICTION</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {person.scope.authorizedMines.map((m, i) => (
                    <span key={i} className="badge badge-draft font-mono" style={{ fontSize: '10px' }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Competencies & Authorizations */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <Shield size={15} color="var(--purple-primary)" />
                2. Statutory Competencies & Authorizations (CMR 2017)
              </span>
            </div>
            <div className="card-body" style={{ fontSize: '12px' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>VERIFIED COMPETENCIES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {person.competencies.map((comp, idx) => (
                    <span key={idx} className="badge badge-completed">{comp}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>STATUTORY CMR AUTHORIZATIONS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {person.authorizations.map((auth, idx) => (
                    <span key={idx} className="badge badge-planned">{auth}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <Award size={15} color="var(--status-green-text)" />
                3. DGMS Certificates of Competency
              </span>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-responsive">
                <table className="strata-table">
                  <thead>
                    <tr>
                      <th>Certificate Name</th>
                      <th>Certificate No.</th>
                      <th>Valid Until</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {person.certifications.map((c, i) => (
                      <tr key={i}>
                        <td><strong>{c.name}</strong></td>
                        <td className="font-mono">{c.certificateNo}</td>
                        <td className="font-mono">{c.validUntil}</td>
                        <td><span className="badge badge-completed">{c.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* Column 2: Workload, Availability, Conflicts & History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Workload & Availability */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <Calendar size={15} />
                4. Operational Availability & Workload Thresholds
              </span>
            </div>
            <div className="card-body" style={{ fontSize: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
                <div style={{ padding: '10px', background: '#F8FAFC', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>ACTIVE INSPECTIONS</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--purple-primary)' }}>{person.workload.activeInspections}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Limit: 4 active</div>
                </div>
                <div style={{ padding: '10px', background: '#F8FAFC', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>UPCOMING</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{person.workload.upcomingInspections}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Next 14 days</div>
                </div>
                <div style={{ padding: '10px', background: '#F8FAFC', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>OVERDUE</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--status-green-text)' }}>{person.workload.overdueAssignments}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Zero overdue</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>AVAILABLE SHIFTS & SLOTS</div>
                <div className="font-mono" style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {person.availability.availableSlots?.join(', ') || 'Available in standard shift schedule'}
                </div>
              </div>
            </div>
          </div>

          {/* Conflict / Restrictions */}
          {person.conflicts && person.conflicts.length > 0 ? (
            <div className="enterprise-card" style={{ marginBottom: 0, border: '1px solid #FFCDD2' }}>
              <div className="card-header" style={{ background: '#FFEBEE' }}>
                <span className="card-title" style={{ color: '#C62828' }}>
                  <AlertTriangle size={15} /> Operational Conflict / Restriction
                </span>
              </div>
              <div className="card-body" style={{ fontSize: '12px', color: '#B71C1C' }}>
                {person.conflicts.map((conf, idx) => (
                  <div key={idx}>
                    <strong>{conf.reason}</strong>
                    <div style={{ fontSize: '10.5px', marginTop: '2px' }}>Conflicting ID: {conf.conflictingInspectionId} | Time: {conf.time}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="enterprise-card" style={{ marginBottom: 0 }}>
              <div className="card-header">
                <span className="card-title" style={{ color: 'var(--status-green-text)' }}>
                  <CheckCircle2 size={15} /> 5. Conflict & Double-Booking Audit
                </span>
              </div>
              <div className="card-body" style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                &check; No overlapping underground assignments detected across DGMS/CIL schedules.
              </div>
            </div>
          )}

          {/* Inspection History */}
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <Clock size={15} />
                6. Recent Inspection Execution History
              </span>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-responsive">
                <table className="strata-table">
                  <thead>
                    <tr>
                      <th>Inspection ID</th>
                      <th>Date</th>
                      <th>Role</th>
                      <th>Mine</th>
                      <th>Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {person.history.map((h, i) => (
                      <tr key={i}>
                        <td className="font-mono" style={{ color: 'var(--purple-primary)' }}>{h.inspectionId}</td>
                        <td className="font-mono">{h.date}</td>
                        <td>{h.role}</td>
                        <td>{h.mine}</td>
                        <td><span className="badge badge-completed">{h.outcome}</span></td>
                      </tr>
                    ))}
                    {person.history.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '12px' }}>
                          No past inspection history recorded in current cycle.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Sticky Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '4px', marginBottom: '30px' }}>
        <button className="btn btn-secondary" onClick={() => navigateTo('04')}>
          <ArrowLeft size={14} /> Back to Assignment Workspace
        </button>

        <button className="btn btn-primary" onClick={handleSelectForActiveInspection}>
          Select {person.name} for {activeInspectionId} &rarr;
        </button>
      </div>

    </div>
  );
};
