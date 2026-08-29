"use client";

import React, { useState } from 'react';
import { useStrata } from '../context/StrataContext';
import { TraceabilityChain } from '../components/TraceabilityChain';
import { Shield } from 'lucide-react';

export const Screen08PlanDetail: React.FC = () => {
  const { data, screenParams, navigateTo, showModal, closeModal, showToast } = useStrata();
  const [activeTab, setActiveTab] = useState('Overview');

  const planId = screenParams.planId || 'PLAN-2026-0088';
  const plan = data.inspectionPlans.find(p => p.id === planId) || data.inspectionPlans[0];

  const tabs = ['Overview', 'Scope', 'Regulatory Basis', 'Checklist', 'Team Requirements', 'Preparation', 'Schedule', 'Activity'];

  const handleCancelPlan = () => {
    showModal(
      'Cancel Inspection Plan',
      <div>
        <p style={{ fontSize: '12.5px', marginBottom: '12px' }}>
          Are you sure you want to cancel plan <strong>{plan.id}</strong>? This action is immutable and will be recorded in the governance audit trail.
        </p>
        <div className="form-group">
          <label className="form-label required">Cancellation Reason</label>
          <input type="text" className="form-control" placeholder="Specify reason..." />
        </div>
      </div>,
      [
        { text: 'Keep Plan', className: 'btn-secondary', onClick: closeModal },
        {
          text: 'Confirm Cancellation',
          className: 'btn-danger',
          onClick: () => {
            closeModal();
            showToast(`Plan ${plan.id} has been cancelled.`, 'error');
            navigateTo('06');
          }
        }
      ]
    );
  };

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('06')}>Inspection Plans</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{plan.id}</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{plan.id}</span>
            <span>{plan.title}</span>
            <span className="badge badge-planned"><span className="badge-dot" />{plan.status}</span>
          </h1>
          <p className="screen-subtitle">
            <strong>Authority:</strong> {plan.authority} &bull; <strong>Track:</strong> {plan.track} &bull; <strong>Mine:</strong> {plan.mine.split('(')[0]} &bull; <strong>Planner:</strong> {plan.planner}
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('07', { planId: plan.id })}>Edit Plan</button>
          <button className="btn btn-secondary" onClick={() => showToast('Plan duplicate created as DRAFT', 'success')}>Duplicate</button>
          <button className="btn btn-primary" onClick={() => navigateTo('10', { planId: plan.id })}>Schedule</button>
        </div>
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
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PURPOSE & STATUTORY OBJECTIVE</div>
                <div style={{ fontSize: '12px', marginTop: '3px' }}>{plan.purpose}</div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{plan.objective}</p>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>RISK PROFILE</div>
                <span className={`badge ${plan.risk === 'High' ? 'badge-high' : 'badge-medium'}`}>{plan.risk}</span>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PLANNED DURATION</div>
                <div>{plan.plannedDuration}</div>
              </div>
              <div className="form-group full-width">
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PLANNING NOTES</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{plan.planningNotes}</div>
              </div>
            </div>
          )}

          {activeTab === 'Scope' && (
            <div className="form-grid">
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>HOLDING / SUBSIDIARY</div><div>{plan.organization} / {plan.subsidiary}</div></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>AREA & MINE</div><div>{plan.area} - {plan.mine}</div></div>
              <div className="form-group full-width"><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>UNDERGROUND LOCATION CIRCUIT</div><div className="font-mono" style={{ fontWeight: 600 }}>{plan.location}</div></div>
            </div>
          )}

          {activeTab === 'Regulatory Basis' && (
            <div>
              <TraceabilityChain basis={plan.regulatoryBasis} />
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>{plan.regulatoryBasis.obligation}</div>
            </div>
          )}

          {activeTab === 'Checklist' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <strong className="font-mono" style={{ color: 'var(--purple-primary)', fontSize: '13px' }}>{plan.checklist.templateId}</strong>
                  <div style={{ fontWeight: 600, fontSize: '12px' }}>{plan.checklist.name}</div>
                </div>
                <span className="badge badge-draft">{plan.checklist.checksCount} Checks</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>MANDATORY MEASUREMENTS</div>
                <ul style={{ marginLeft: '18px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  {plan.checklist.measurementRequirements.map((m, idx) => <li key={idx}>{m}</li>)}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'Team Requirements' && (
            <div style={{ fontSize: '12px' }}>
              <div style={{ marginBottom: '8px' }}><strong>Lead Competency:</strong> {plan.teamRequirements.leadCompetency}</div>
              <div style={{ marginBottom: '8px' }}><strong>Specialists Required:</strong> {plan.teamRequirements.specialists.join(', ')}</div>
              <div style={{ marginBottom: '8px' }}><strong>Supporting Inspectors:</strong> {plan.teamRequirements.supportingInspectors.join(', ')}</div>
              <div className="badge badge-medium" style={{ marginTop: '6px' }}>{plan.teamRequirements.assignmentStatus}</div>
            </div>
          )}

          {activeTab === 'Preparation' && (
            <div className="form-grid">
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>INSTRUMENTS</div><div style={{ fontSize: '11.5px' }}>{plan.preparation.instruments.join(', ')}</div></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PPE</div><div style={{ fontSize: '11.5px' }}>{plan.preparation.ppe.join(', ')}</div></div>
              <div className="form-group full-width"><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>DOCUMENTS</div><div style={{ fontSize: '11.5px' }}>{plan.preparation.documents.join(', ')}</div></div>
            </div>
          )}

          {activeTab === 'Schedule' && (
            <div style={{ fontSize: '12px' }}>
              <div><strong>Planned Date:</strong> <span className="font-mono">{plan.plannedDate}</span></div>
              <div style={{ marginTop: '4px' }}><strong>Target Window:</strong> 09:00 – 15:00 IST (Shift A)</div>
              <div style={{ marginTop: '8px' }}>
                <button className="btn btn-primary btn-sm" onClick={() => navigateTo('10', { planId: plan.id })}>Open Scheduling Screen</button>
              </div>
            </div>
          )}

          {activeTab === 'Activity' && (
            <div className="audit-timeline">
              {plan.activity.map((a, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-header">
                    <span className="timeline-user">{a.user}</span>
                    <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{a.time}</span>
                  </div>
                  <div className="timeline-action">{a.action} {a.reason ? `(${a.reason})` : ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <button className="btn btn-secondary" onClick={() => navigateTo('13', { planId: plan.id })}>
          <Shield size={14} /> View Immutable Plan Activity & Version Trail
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-danger" onClick={handleCancelPlan}>Cancel Plan</button>
          <button className="btn btn-primary" onClick={() => navigateTo('10', { planId: plan.id })}>Proceed to Scheduling &rarr;</button>
        </div>
      </div>

    </div>
  );
};
