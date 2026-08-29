"use client";

import React, { useState } from 'react';
import { useStrata } from '../context/StrataContext';
import { Shield } from 'lucide-react';

export const Screen13PlanAudit: React.FC = () => {
  const { data, screenParams, navigateTo, showToast } = useStrata();
  const [activeTab, setActiveTab] = useState('Activity');

  const planId = screenParams.planId || 'PLAN-2026-0088';
  const plan = data.inspectionPlans.find(p => p.id === planId) || data.inspectionPlans[0];

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('06')}>Inspection Plans</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('08', { planId: plan.id })}>{plan.id}</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Plan Audit & Activity</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Shield size={20} color="var(--purple-primary)" />
            Inspection Plan Audit & Immutable Activity Trail
          </h1>
          <p className="screen-subtitle">
            Plan ID: <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{plan.id}</span> &bull; Full version history and parameter change diffs.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('08', { planId: plan.id })}>Back to Plan</button>
        </div>
      </div>

      <div className="tabs-nav">
        {['Activity', 'Versions', 'Changes'].map((t) => (
          <button
            key={t}
            className={`tab-btn ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="enterprise-card">
        <div className="card-body">
          {activeTab === 'Activity' && (
            <div className="audit-timeline">
              {plan.activity.map((a, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-header">
                    <div>
                      <span className="timeline-user">{a.user}</span>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginLeft: '6px' }}>{a.action}</span>
                    </div>
                    <span className="font-mono timestamp">{a.time}</span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Reason: {a.reason}</div>
                  {a.prev && a.next && (
                    <div className="timeline-diff">
                      <span style={{ color: '#C62828' }}>- {a.prev}</span> &rarr; <span style={{ color: '#1B5E20' }}>+ {a.next}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Versions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {plan.versions.map((v, idx) => (
                <div key={idx} style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong className="font-mono" style={{ fontSize: '13px', color: 'var(--purple-primary)' }}>{v.version}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}>{v.date} by {v.user}</span>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => showToast(`Viewing snapshot of ${v.version}`, 'success')}>Inspect Snapshot</button>
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>{v.note}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Changes' && (
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              <p>No unauthorized parameter rollbacks detected. All 6 validation checkpoints verified under CMR 2017 statutory governance.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
