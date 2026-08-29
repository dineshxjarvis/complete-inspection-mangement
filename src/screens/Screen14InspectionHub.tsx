"use client";

import React, { useState } from 'react';
import { useStrata } from '../context/StrataContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { TraceabilityChain } from '../components/TraceabilityChain';
import { UserCheck } from 'lucide-react';

export const Screen14InspectionHub: React.FC = () => {
  const { data, screenParams, navigateTo, showModal, closeModal, showToast } = useStrata();
  const { switchWorkspace } = useWorkspace();
  const [activeTab, setActiveTab] = useState('Overview');

  const insId = screenParams.inspectionId || 'INS-2026-0882';
  const ins = data.inspections.find(i => i.id === insId) || data.inspections[0];

  const tabs = ['Overview', 'Planning', 'Regulatory Basis', 'Scope', 'Schedule', 'Team', 'Checklist', 'Findings', 'CAPA', 'Reports', 'Activity'];

  const openWorkspace02Modal = () => {
    showModal(
      'Hand-off to Workspace 02: Inspection Assignment & Team',
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <div style={{ fontSize: '28px', color: 'var(--purple-primary)', display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
          <UserCheck size={32} />
        </div>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 700 }}>
          Handoff Boundary: Workspace 01 &rarr; Workspace 02
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto' }}>
          Workspace 01 has completed governance scoping, regulatory mapping, and slot scheduling for <strong>{ins.id}</strong>.
          Control is now handed off to the Assignment Cell in Workspace 02 to assign certified Lead Inspectors and specialists.
        </p>
        <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '4px', marginTop: '14px', fontSize: '11.5px', textAlign: 'left' }}>
          <div><strong>Locked Scope:</strong> Mine A2 (Seam VII) &bull; CMR 2017 Reg 153</div>
          <div><strong>Scheduled Slot:</strong> 15 Nov 2026 (09:00 – 15:00 IST)</div>
          <div><strong>Required Competencies:</strong> First Class Manager + Ventilation Officer</div>
        </div>
      </div>,
      [
        { text: 'Stay in Workspace 01', className: 'btn-secondary', onClick: closeModal },
        {
          text: 'Launch Workspace 02 (Assignment)',
          className: 'btn-primary',
          onClick: () => {
            closeModal();
            showToast(`Hand-off payload for ${ins.id} transmitted to Workspace 02 (Inspector Assignment).`, 'success');
            switchWorkspace('ws2');
          }
        }
      ]
    );
  };

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Inspection Governance</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('06')}>Inspection</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{ins.id}</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{ins.id}</span>
            <span>{ins.title}</span>
            <span className={`badge ${ins.status === 'Scheduled' ? 'badge-scheduled' : ins.status === 'In Progress' ? 'badge-in-progress' : 'badge-final'}`}>
              <span className="badge-dot" />{ins.status}
            </span>
          </h1>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('13')}>Audit Trail</button>
          <button className="btn btn-primary" onClick={openWorkspace02Modal}>
            Proceed to Inspector Assignment &rarr;
          </button>
        </div>
      </div>

      {/* Identity Strip */}
      <div className="identity-strip">
        <div className="identity-grid">
          <div className="identity-field">
            <span className="identity-label">AUTHORITY</span>
            <span className="identity-val">{ins.authority.split('/')[0]}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">TRACK</span>
            <span className="identity-val">{ins.track}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">INSPECTION TYPE</span>
            <span className="identity-val">{ins.type}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">ORGANIZATIONAL SCOPE</span>
            <span className="identity-val font-mono">{ins.scope}</span>
          </div>
        </div>
      </div>

      {/* 7-Stage Stepper */}
      <div className="stepper-container">
        {ins.stepperStages.map((s, i) => (
          <React.Fragment key={s.name}>
            <div className={`stepper-step ${s.status}`}>
              <div className="step-circle">{s.status === 'completed' ? '✓' : s.status === 'current' ? '•' : (i + 1)}</div>
              <div className="step-name">{s.name}</div>
            </div>
            {i < ins.stepperStages.length - 1 && (
              <div className={`stepper-divider ${s.status === 'completed' ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        {tabs.map((t) => (
          <button
            key={t}
            className={`tab-btn ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="enterprise-card">
        <div className="card-body">
          {activeTab === 'Overview' && (
            <div className="form-grid">
              <div className="form-group full-width">
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>INSPECTION OBJECTIVE</div>
                <div style={{ fontSize: '12.5px', fontWeight: 600, marginTop: '2px' }}>
                  Statutory quarterly mechanical ventilation and gas dynamics survey under CMR 2017 Reg 153.
                </div>
              </div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PLANNED DATE</div><div className="font-mono">{ins.plannedDate}</div></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>DURATION</div><div>{ins.duration}</div></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>RISK CLASSIFICATION</div><span className="badge badge-high">{ins.risk}</span></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PRIMARY MINE</div><div>{ins.scopeDetails.mine}</div></div>
            </div>
          )}

          {activeTab === 'Planning' && (
            <div className="form-grid">
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PLAN ID</div><strong className="font-mono" style={{ color: 'var(--purple-primary)' }}>{ins.planId}</strong></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>RECOMMENDATION ID</div><strong className="font-mono">{ins.recommendationId}</strong></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>REQUEST ID</div><strong className="font-mono">{ins.requestId}</strong></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PLANNER</div><div>{ins.planner}</div></div>
            </div>
          )}

          {activeTab === 'Regulatory Basis' && (
            <div>
              <TraceabilityChain basis={ins.regulatoryBasis} />
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>{ins.regulatoryBasis.obligation}</p>
            </div>
          )}

          {activeTab === 'Schedule' && (
            <div className="form-grid">
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SCHEDULED DATE</div><div className="font-mono">{ins.schedule.date}</div></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>TIME WINDOW</div><div className="font-mono">{ins.schedule.time}</div></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SHIFT</div><div>{ins.schedule.shift}</div></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>LOCATION</div><div>{ins.schedule.location}</div></div>
            </div>
          )}

          {activeTab === 'Team' && (
            <div style={{ background: 'var(--purple-light)', border: '1px solid var(--purple-border)', padding: '16px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--purple-primary)' }}>Inspector Team Assignment (Workspace 02 Handoff)</strong>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Planning stage complete. Inspector roster and team lead selection occurs in Workspace 02.</div>
                </div>
                <button className="btn btn-primary" onClick={openWorkspace02Modal}>
                  Proceed to Inspector Assignment &rarr;
                </button>
              </div>
              <div style={{ fontSize: '12px', borderTop: '1px solid var(--purple-border)', paddingTop: '10px', marginTop: '10px' }}>
                <div><strong>Status:</strong> <span className="badge badge-awaiting">{ins.team.assignmentStatus}</span></div>
                <div style={{ marginTop: '4px' }}><strong>Specialists Required:</strong> {ins.team.specialistsRequired?.join(', ')}</div>
              </div>
            </div>
          )}

          {activeTab === 'Checklist' && ins.checklistPreview && (
            <div>
              <div className="recommendation-banner" style={{ marginBottom: '12px' }}>
                <div className="banner-content">
                  <span className="banner-tag">PREVIEW ONLY</span>
                  <span className="banner-text">&bull; Template: <strong>{ins.checklistPreview.template}</strong>. Actual field checklist execution occurs in Workspace 03 (Mobile / Field Tablet).</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {ins.checklistPreview.sampleChecks.map((c, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '8px 12px', borderRadius: '3px', fontSize: '11.5px' }}>
                    <span><strong className="font-mono">{c.checkNo}</strong> &bull; {c.item}</span>
                    <span className="badge badge-draft">Mandatory</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Findings' && (
            <div style={{ fontSize: '12px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Findings logged during execution are monitored here. (Approval authority belongs to Workspace 04/05).</p>
              <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('16')}>Open Findings Monitoring Screen &rarr;</button>
            </div>
          )}

          {activeTab === 'CAPA' && (
            <div style={{ fontSize: '12px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Corrective and Preventive Actions tracking.</p>
              <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('17')}>Open CAPA Monitoring Screen &rarr;</button>
            </div>
          )}

          {activeTab === 'Reports' && (
            <div style={{ fontSize: '12px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Final inspection statutory report status.</p>
              <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('18')}>Open Report Status Screen &rarr;</button>
            </div>
          )}

          {activeTab === 'Activity' && (
            <div className="audit-timeline">
              {ins.activity.map((a, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-header">
                    <span className="timeline-user">{a.user}</span>
                    <span className="font-mono timestamp">{a.time}</span>
                  </div>
                  <div className="timeline-action">{a.action}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
