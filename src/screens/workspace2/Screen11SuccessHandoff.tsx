"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  CheckCircle2,
  Users,
  FileText,
  Radio,
  ArrowRight,
  ExternalLink,
  Shield,
  Clock,
  Send,
  Layers,
  Sparkles
} from 'lucide-react';

export const Screen11SuccessHandoff: React.FC = () => {
  const {
    inspections,
    activeInspectionId,
    navigateTo
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];
  const [showWs03Modal, setShowWs03Modal] = useState(false);

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('05', { inspectionId: insp.id })}>Team Detail</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Assignment Success & Field Handoff</span>
      </div>

      {/* Main Success Container */}
      <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Success Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <CheckCircle2 size={26} />
            </div>
            <div>
              <span className="badge badge-completed" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#86EFAC', border: '1px solid #22C55E', marginBottom: '4px' }}>
                STATUS: ASSIGNED &bull; STATUTORY TOKEN LOCKED
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>
                ✓ INSPECTION TEAM SUCCESSFULLY ASSIGNED
              </h2>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: '#C7D2FE', lineHeight: 1.5, margin: 0 }}>
            Personnel roster for <strong style={{ color: '#FFF' }}>{insp.id}</strong> ({insp.inspectionType}) at <strong>{insp.mine}</strong> has been locked and recorded in the audit history.
          </p>
        </div>

        {/* Assigned Team Summary Card */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <Users size={15} color="var(--purple-primary)" />
              Confirmed Field Roster
            </span>
            <span className="badge badge-completed">Ready for Field Dispatch</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12px' }}>
              <div style={{ padding: '10px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>LEAD INSPECTOR</span>
                <div style={{ marginTop: '4px', fontWeight: 700, fontSize: '13px' }}>
                  {insp.assignedTeam.leadInspector?.name || 'R. Sharma'}
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>First Class Mine Manager</div>
              </div>

              <div style={{ padding: '10px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>ATTACHED SPECIALIST</span>
                <div style={{ marginTop: '4px', fontWeight: 700, fontSize: '13px' }}>
                  {insp.assignedTeam.specialists[0]?.person.name || 'K. Rao'}
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                  {insp.assignedTeam.specialists[0]?.inspectionRole || 'Mechanical Specialist'}
                </div>
              </div>

              <div style={{ padding: '10px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SCHEDULED WINDOW</span>
                <div style={{ marginTop: '4px', fontWeight: 700, fontSize: '13px' }} className="font-mono">
                  {insp.scheduledDate}
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{insp.scheduledTime} ({insp.shift})</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Automated Handoff Milestones */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <Shield size={15} color="var(--status-green-text)" />
              Automated Governance & Handoff Milestones
            </span>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#F0FDF4', borderRadius: '4px', border: '1px solid #DCFCE7' }}>
                <CheckCircle2 size={16} color="#16A34A" />
                <div>
                  <strong>Team Dispatched & Notified</strong>
                  <div style={{ fontSize: '10.5px', color: '#166534' }}>Digital brief sent to Lead & Specialist devices</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#F0FDF4', borderRadius: '4px', border: '1px solid #DCFCE7' }}>
                <CheckCircle2 size={16} color="#16A34A" />
                <div>
                  <strong>Pre-Inspection Brief Active</strong>
                  <div style={{ fontSize: '10.5px', color: '#166534' }}>Dossier, checklists, and instruments ready</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#F0FDF4', borderRadius: '4px', border: '1px solid #DCFCE7' }}>
                <CheckCircle2 size={16} color="#16A34A" />
                <div>
                  <strong>Workspace 03 Payload Created</strong>
                  <div style={{ fontSize: '10.5px', color: '#166534' }}>Offline tablet sync container initialized</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#F0FDF4', borderRadius: '4px', border: '1px solid #DCFCE7' }}>
                <CheckCircle2 size={16} color="#16A34A" />
                <div>
                  <strong>Statutory Ready for Execution</strong>
                  <div style={{ fontSize: '10.5px', color: '#166534' }}>Shaft priority token granted for Shift A</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Primary Action Button Bar */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '16px 20px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" onClick={() => navigateTo('05', { inspectionId: insp.id })}>
              <Users size={14} /> View Assignment Roster
            </button>
            <button className="btn btn-secondary" onClick={() => navigateTo('12', { inspectionId: insp.id })}>
              <Clock size={14} /> View Audit History
            </button>
            <button className="btn btn-secondary" onClick={() => navigateTo('01')}>
              Back to Dashboard
            </button>
          </div>

          <button
            className="btn btn-primary"
            style={{ padding: '9px 22px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
            onClick={() => setShowWs03Modal(true)}
          >
            <span>Open Field Inspection (Workspace 03)</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* Modal: Workspace 03 Field Inspection Handoff Simulation */}
      {showWs03Modal && (
        <div className="modal-backdrop" onClick={() => setShowWs03Modal(false)}>
          <div className="modal-dialog" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ background: '#1E1B4B', color: '#FFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} color="#A78BFA" />
                <h3 className="modal-title" style={{ color: '#FFF' }}>WORKSPACE 03 &bull; FIELD INSPECTION EXECUTION</h3>
              </div>
              <button className="modal-close-btn" style={{ color: '#FFF' }} onClick={() => setShowWs03Modal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <div style={{ padding: '10px 14px', background: '#F5F3FF', borderRadius: '4px', border: '1px solid #DDD6FE', marginBottom: '14px', fontSize: '12px' }}>
                <strong>Inspection Token:</strong> <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{insp.id}</span> | <strong>Colliery:</strong> {insp.mine}
              </div>

              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Control is now handed off from <strong>Workspace 02 (Assignment & Team)</strong> to <strong>Workspace 03 (Field Inspection Execution)</strong>. The tablet field lifecycle proceeds through the 8 statutory field execution steps:
              </div>

              {/* 8 Field Steps Lifecycle Tree */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-completed font-mono">STEP 1</span> <strong>PREPARE:</strong> Download ventilation network survey dossier & calibrate anemometer.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-completed font-mono">STEP 2</span> <strong>START:</strong> Digital underground check-in via tag-board beacon.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-planned font-mono">STEP 3</span> <strong>CHECKLIST:</strong> Execute 22 mandatory CMR 2017 checks.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-draft font-mono">STEP 4</span> <strong>MEASUREMENT:</strong> Record airflow velocities (m/s) & water gauge depression.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-draft font-mono">STEP 5</span> <strong>OBSERVATION:</strong> Note ventilation door air leakages and air crossing condition.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-draft font-mono">STEP 6</span> <strong>EVIDENCE:</strong> Capture geotagged photos & digital instrument logs.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-draft font-mono">STEP 7</span> <strong>PROPOSED FINDING:</strong> Draft preliminary non-conformances.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-draft font-mono">STEP 8</span> <strong>SUBMIT:</strong> Digital cryptographic sign-off by Lead Inspector R. Sharma.
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowWs03Modal(false)}>
                Close Preview
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowWs03Modal(false);
                  navigateTo('16');
                }}
              >
                Go to Active Field Assignments (Screen 16)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
