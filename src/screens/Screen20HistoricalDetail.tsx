"use client";

import React, { useState } from 'react';
import { useStrata } from '../context/StrataContext';
import { TraceabilityChain } from '../components/TraceabilityChain';
import { Shield, FileCheck, CheckCircle2 } from 'lucide-react';

export const Screen20HistoricalDetail: React.FC = () => {
  const { data, screenParams, navigateTo, showToast } = useStrata();
  const [activeTab, setActiveTab] = useState('Overview');

  const insId = screenParams.inspectionId || 'INS-2026-0782';
  const ins = data.inspections.find(i => i.id === insId) || data.inspections[2];
  const summ = ins.finalSummary;

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('19')}>Inspection History</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{ins.id}</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{ins.id}</span>
            <span>{ins.title}</span>
            <span className="badge badge-final"><span className="badge-dot" />Final &bull; Immutable</span>
          </h1>
          <p className="screen-subtitle">
            Executed on <strong>{ins.inspectionDate || ins.plannedDate}</strong> &bull; Lead Inspector: <strong>{ins.team.leadInspector}</strong>
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => showToast(`Exporting digitally signed PDF for ${ins.id}`, 'success')}>
            <FileCheck size={14} /> Export Statutory Signed PDF
          </button>
        </div>
      </div>

      {/* Final Outcome Banner */}
      <div style={{ background: '#E8F5E9', border: '1px solid #C8E6C9', borderLeft: '4px solid #2E7D32', padding: '12px 16px', borderRadius: '4px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#1B5E20', letterSpacing: '0.5px' }}>STATUTORY INSPECTION CONCLUDED</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1B5E20', marginTop: '2px' }}>
            Outcome: {summ?.outcome} &bull; 100% Checklist Compliance &bull; All 3 CAPA Rectifications Verified
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1B5E20', fontWeight: 700, fontSize: '12px' }}>
          <CheckCircle2 size={16} /> Digitally Signed (DGMS Liaison Verified)
        </div>
      </div>

      {/* Stepper (All 7 Completed) */}
      <div className="stepper-container">
        {ins.stepperStages.map((s, i) => (
          <React.Fragment key={s.name}>
            <div className="stepper-step completed">
              <div className="step-circle">✓</div>
              <div className="step-name">{s.name}</div>
            </div>
            {i < ins.stepperStages.length - 1 && (
              <div className="stepper-divider completed" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        {['Overview', 'Measurements', 'Findings', 'CAPA', 'Version History'].map((t) => (
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
                <TraceabilityChain basis={ins.regulatoryBasis} />
              </div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>LEAD STATUTORY INSPECTOR</div><strong>{ins.team.leadInspector}</strong></div>
              <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>MINE & SUBSTATION SCOPE</div><div>{ins.scopeDetails.mine} - {ins.scopeDetails.districts}</div></div>
              <div className="form-group full-width"><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>REPORT IDENTIFIER</div><div className="font-mono" style={{ color: 'var(--purple-primary)', fontWeight: 600 }}>{summ?.reportVersion}</div></div>
            </div>
          )}

          {activeTab === 'Measurements' && summ?.measurements && (
            <div className="table-responsive">
              <table className="strata-table">
                <thead>
                  <tr>
                    <th>Parameter Measured</th>
                    <th>Recorded Value</th>
                    <th>Statutory Limit (CMR 2017 / CEA)</th>
                    <th>Compliance Result</th>
                  </tr>
                </thead>
                <tbody>
                  {summ.measurements.map((m, idx) => (
                    <tr key={idx}>
                      <td><strong>{m.param}</strong></td>
                      <td className="font-mono">{m.recorded}</td>
                      <td>{m.limit}</td>
                      <td><span className="badge badge-completed">{m.result}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Findings' && summ?.findings && (
            <div className="table-responsive">
              <table className="strata-table">
                <thead>
                  <tr>
                    <th>Finding ID</th>
                    <th>Description</th>
                    <th>Severity</th>
                    <th>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {summ.findings.map((f, idx) => (
                    <tr key={idx}>
                      <td className="font-mono" style={{ color: 'var(--purple-primary)' }}><strong>{f.id}</strong></td>
                      <td>{f.title}</td>
                      <td><span className={`badge ${f.severity === 'High' ? 'badge-high' : 'badge-medium'}`}>{f.severity}</span></td>
                      <td><span className="badge badge-completed">{f.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'CAPA' && summ?.capa && (
            <div className="table-responsive">
              <table className="strata-table">
                <thead>
                  <tr>
                    <th>CAPA ID</th>
                    <th>Remedial Engineering Action</th>
                    <th>Status</th>
                    <th>Verified By</th>
                  </tr>
                </thead>
                <tbody>
                  {summ.capa.map((c, idx) => (
                    <tr key={idx}>
                      <td className="font-mono" style={{ color: 'var(--purple-primary)' }}><strong>{c.id}</strong></td>
                      <td>{c.action}</td>
                      <td><span className="badge badge-completed">{c.status}</span></td>
                      <td>{c.verifiedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Version History' && summ?.versions && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {summ.versions.map((v, idx) => (
                <div key={idx} style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '10px 14px', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong className="font-mono" style={{ color: 'var(--purple-primary)' }}>{v.version}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}>Published {v.date} by {v.user}</span>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>{v.note}</div>
                  </div>
                  <span className="badge badge-completed">Signed</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
