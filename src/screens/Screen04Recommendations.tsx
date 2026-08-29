"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { Plus, Info } from 'lucide-react';

export const Screen04Recommendations: React.FC = () => {
  const { data, navigateTo } = useStrata();

  const kpis = [
    { label: 'New Recommendations', value: '2', subtext: 'System triggers' },
    { label: 'High Risk', value: '2', subtext: 'DGMS / Gassy Seam', danger: true },
    { label: 'Due Soon', value: '1', subtext: 'Within 14 days', warning: true },
    { label: 'Overdue', value: '0', subtext: 'None overdue' },
    { label: 'Accepted', value: '1', subtext: 'Queued for plan' },
    { label: 'Deferred', value: '0', subtext: 'None' }
  ];

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Inspection Recommendations</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">Inspection Recommendations Queue</h1>
          <p className="screen-subtitle">
            System-generated recommendations requiring authorized planning review based on statutory obligations, risk thresholds, telemetry, and previous findings.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-primary" onClick={() => navigateTo('07')}>
            <Plus size={14} /> Create Inspection Plan
          </button>
        </div>
      </div>

      {/* Mandatory Warning Banner */}
      <div className="recommendation-banner">
        <div className="banner-content">
          <span className="banner-tag">SYSTEM RECOMMENDATION</span>
          <span className="banner-text">&bull; All items require authorized human evaluation before any field inspection or resource allocation is confirmed.</span>
        </div>
        <span className="badge badge-medium">HUMAN DECISION REQUIRED</span>
      </div>

      {/* KPI Row */}
      <div className="kpi-row">
        {kpis.map((k, i) => (
          <div key={i} className={`kpi-card ${k.danger ? 'kpi-danger' : ''} ${k.warning ? 'kpi-warning' : ''}`}>
            <span className="kpi-label">{k.label}</span>
            <div className="kpi-val-row"><span className="kpi-value">{k.value}</span></div>
            <span className="kpi-subtext">{k.subtext}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input type="text" className="filter-input" placeholder="Search Recommendation ID, Obligation..." style={{ minWidth: '220px' }} />
        <select className="filter-select"><option>All Authorities (DGMS, Internal Safety)</option></select>
        <select className="filter-select"><option>Track: All Tracks</option><option>Safety & Occupational Health</option><option>Strata Control</option></select>
        <select className="filter-select"><option>Risk: All</option><option>High Risk Only</option></select>
        <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>Filter</button>
      </div>

      {/* Table */}
      <div className="enterprise-card">
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Recommendation ID</th>
                <th>Inspection Type</th>
                <th>Mine</th>
                <th>Regulatory Basis</th>
                <th>Obligation</th>
                <th>Due Date</th>
                <th>Risk</th>
                <th>Reason Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.recommendations.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong
                      className="font-mono"
                      style={{ color: 'var(--purple-primary)', cursor: 'pointer' }}
                      onClick={() => navigateTo('05', { recId: r.id })}
                    >
                      {r.id}
                    </strong>
                  </td>
                  <td><strong>{r.inspectionType}</strong></td>
                  <td>{r.mine.split('(')[0]}</td>
                  <td><span className="badge badge-draft font-mono">{r.regulatoryBasis}</span></td>
                  <td style={{ maxWidth: '200px', fontSize: '11.5px' }}>{r.obligation}</td>
                  <td className="font-mono">{r.dueDate}</td>
                  <td>
                    <span className={`badge ${r.risk === 'High' ? 'badge-high' : 'badge-medium'}`}>
                      <span className="badge-dot" />{r.risk}
                    </span>
                  </td>
                  <td>{r.reasonCategory}</td>
                  <td>
                    <span className={`badge ${r.status === 'Accepted' ? 'badge-accepted' : 'badge-awaiting'}`}>
                      <span className="badge-dot" />{r.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="btn btn-primary btn-sm" onClick={() => navigateTo('05', { recId: r.id })}>
                        Review
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('07', { recId: r.id })}>
                        Create Plan
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expandable Why Recommended */}
      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">
            <Info size={15} /> Why STRATA Recommended These Items
          </span>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '10px 12px', borderRadius: '4px' }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '12px' }}>Periodic Statutory Obligation</strong>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                Calculated from DGMS Coal Mines Regulations 2017 (e.g. CMR Reg 153 quarterly ventilation cycle and CMR Reg 123 SCAMP audit).
              </p>
            </div>
            <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '10px 12px', borderRadius: '4px' }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '12px' }}>Risk & Telemetry Alarm</strong>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                Automated correlation with continuous convergence sensors, gas telemetry peaks, or colliery agent safety alerts.
              </p>
            </div>
            <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '10px 12px', borderRadius: '4px' }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '12px' }}>Historical Recurrence Pattern</strong>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                Identifies previously critical findings (e.g. FND-2026-00084) or pending CAPA re-verification requirements.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
