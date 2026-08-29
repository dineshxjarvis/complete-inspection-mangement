"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { Plus } from 'lucide-react';

export const Screen06PlansList: React.FC = () => {
  const { data, navigateTo } = useStrata();

  const kpis = [
    { label: 'Draft', value: '0', subtext: 'Unfinalized' },
    { label: 'Planned', value: '1', subtext: 'Ready for scheduling', primary: true },
    { label: 'Ready for Scheduling', value: '1', subtext: 'Pre-monsoon' },
    { label: 'Scheduled', value: '1', subtext: 'Slot allocated' },
    { label: 'Cancelled', value: '0', subtext: 'None' },
    { label: 'Completed', value: '1', subtext: 'Executed' }
  ];

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Inspection Plans</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">Inspection Plans</h1>
          <p className="screen-subtitle">
            Governance inspection plans with defined scopes, regulatory mappings, controlled checklist templates, and competency criteria.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-primary" onClick={() => navigateTo('07')}>
            <Plus size={14} /> Create Inspection Plan
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="kpi-row">
        {kpis.map((k, i) => (
          <div key={i} className={`kpi-card ${k.primary ? 'kpi-primary' : ''}`}>
            <span className="kpi-label">{k.label}</span>
            <div className="kpi-val-row"><span className="kpi-value">{k.value}</span></div>
            <span className="kpi-subtext">{k.subtext}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input type="text" className="filter-input" placeholder="Search Plan ID, Mine, Planner..." style={{ minWidth: '220px' }} />
        <select className="filter-select"><option>All Plan Statuses</option><option>Planned</option><option>Ready for Scheduling</option><option>Scheduled</option></select>
        <select className="filter-select"><option>All Inspection Types</option><option>Ventilation</option><option>Strata Control</option><option>Electrical FLP</option></select>
        <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>Filter</button>
      </div>

      {/* Table */}
      <div className="enterprise-card">
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Plan ID</th>
                <th>Inspection Title</th>
                <th>Mine</th>
                <th>Type</th>
                <th>Risk</th>
                <th>Planned Date</th>
                <th>Planner</th>
                <th>Status</th>
                <th>Next Action</th>
              </tr>
            </thead>
            <tbody>
              {data.inspectionPlans.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong
                      className="font-mono"
                      style={{ color: 'var(--purple-primary)', cursor: 'pointer' }}
                      onClick={() => navigateTo('08', { planId: p.id })}
                    >
                      {p.id}
                    </strong>
                  </td>
                  <td><strong>{p.title}</strong></td>
                  <td>{p.mine.split('(')[0]}</td>
                  <td>{p.inspectionType}</td>
                  <td>
                    <span className={`badge ${p.risk === 'High' ? 'badge-high' : 'badge-medium'}`}>
                      <span className="badge-dot" />{p.risk}
                    </span>
                  </td>
                  <td className="font-mono">{p.plannedDate}</td>
                  <td>{p.planner.split('(')[0]}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.status === 'Scheduled'
                          ? 'badge-scheduled'
                          : p.status === 'Completed'
                          ? 'badge-completed'
                          : 'badge-planned'
                      }`}
                    >
                      <span className="badge-dot" />{p.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('08', { planId: p.id })}>Open</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('07', { planId: p.id })}>Edit</button>
                      {p.status !== 'Scheduled' && p.status !== 'Completed' && (
                        <button className="btn btn-primary btn-sm" onClick={() => navigateTo('10', { planId: p.id })}>Schedule</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
