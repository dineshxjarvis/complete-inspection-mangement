"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { Shield, Inbox, Plus, AlertCircle, Calendar, Bell, Clock } from 'lucide-react';

export const Screen01Dashboard: React.FC = () => {
  const { data, navigateTo } = useStrata();

  const kpis = [
    { label: 'Inspection Recommendations', value: '4', subtext: '2 High Risk', warning: true },
    { label: 'Inspection Plans', value: '3', subtext: '1 Ready for scheduling', primary: true },
    { label: 'Scheduled', value: '2', subtext: 'Allocated slots' },
    { label: 'Unassigned', value: '5', subtext: 'Awaiting Workspace 02', warning: true },
    { label: 'In Progress', value: '1', subtext: 'Live field execution' },
    { label: 'Overdue', value: '3', subtext: 'Action required', danger: true }
  ];

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Workspace</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Inspection Governance & Planning Dashboard</span>
      </div>

      {/* Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Shield size={20} color="var(--purple-primary)" />
            Inspection Governance & Planning
          </h1>
          <p className="screen-subtitle">
            Plan, schedule, assign, and monitor inspections across the authorized organizational scope (CIL / ECL / Area 01 / Mine A2).
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('02')}>
            <Inbox size={14} /> Inspection Intake
          </button>
          <button className="btn btn-primary" onClick={() => navigateTo('07')}>
            <Plus size={14} /> Create Inspection Plan
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="kpi-row">
        {kpis.map((k, i) => (
          <div
            key={i}
            className={`kpi-card ${k.danger ? 'kpi-danger' : ''} ${k.warning ? 'kpi-warning' : ''} ${k.primary ? 'kpi-primary' : ''}`}
          >
            <span className="kpi-label">{k.label}</span>
            <div className="kpi-val-row">
              <span className="kpi-value">{k.value}</span>
            </div>
            <span className="kpi-subtext">{k.subtext}</span>
          </div>
        ))}
      </div>

      {/* Section 2: Recommendations Requiring Attention */}
      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">
            <AlertCircle size={15} color="var(--status-orange-text)" />
            Inspection Recommendations Requiring Attention
          </span>
          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('04')}>
            View All Recommendations ({data.recommendations.length})
          </button>
        </div>
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Recommendation ID</th>
                <th>Mine</th>
                <th>Inspection Type</th>
                <th>Regulatory Basis</th>
                <th>Due Date</th>
                <th>Risk</th>
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
                  <td>{r.mine.split('(')[0]}</td>
                  <td>{r.inspectionType}</td>
                  <td><span className="badge badge-draft font-mono">{r.regulatoryBasis}</span></td>
                  <td className="font-mono">{r.dueDate}</td>
                  <td>
                    <span className={`badge ${r.risk === 'High' ? 'badge-high' : 'badge-medium'}`}>
                      <span className="badge-dot" />{r.risk}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-awaiting">
                      <span className="badge-dot" />{r.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigateTo('05', { recId: r.id })}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Upcoming Inspections + Attention Cards & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '20px' }}>
        
        {/* Left: Upcoming Inspections */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <Calendar size={15} />
              Upcoming Inspections
            </span>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('09')}>
              Open Planning Calendar
            </button>
          </div>
          <div className="table-responsive">
            <table className="strata-table">
              <thead>
                <tr>
                  <th>Inspection ID</th>
                  <th>Mine</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Lead Inspector</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.calendarEvents.slice(0, 4).map((e) => (
                  <tr
                    key={e.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigateTo('14', { inspectionId: e.id.replace('-SIM', '') })}
                  >
                    <td>
                      <strong className="font-mono" style={{ color: 'var(--purple-primary)' }}>
                        {e.id}
                      </strong>
                    </td>
                    <td>{e.mine}</td>
                    <td>{e.type}</td>
                    <td className="font-mono">{e.date}</td>
                    <td>{e.leadInspector}</td>
                    <td>
                      <span
                        className={`badge ${
                          e.status === 'In Progress'
                            ? 'badge-in-progress'
                            : e.status === 'Overdue'
                            ? 'badge-overdue'
                            : 'badge-scheduled'
                        }`}
                      >
                        <span className="badge-dot" />{e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Attention Required + Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <Bell size={15} /> Attention Required
              </span>
            </div>
            <div className="card-body" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  padding: '8px 12px',
                  background: '#FFF8E1',
                  border: '1px solid #FFE082',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => navigateTo('04')}
              >
                <div>
                  <strong style={{ color: '#B78103', fontSize: '12px' }}>4 Unplanned Recommendations</strong>
                  <div style={{ fontSize: '10.5px', color: '#6D4C41' }}>Statutory obligations awaiting plan approval</div>
                </div>
                <span className="badge badge-medium">Action</span>
              </div>

              <div
                style={{
                  padding: '8px 12px',
                  background: '#FFEBEE',
                  border: '1px solid #FFCDD2',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => navigateTo('12')}
              >
                <div>
                  <strong style={{ color: '#C62828', fontSize: '12px' }}>3 Overdue Inspections</strong>
                  <div style={{ fontSize: '10.5px', color: '#7F0000' }}>Exceeded statutory due date window</div>
                </div>
                <span className="badge badge-high">Escalate</span>
              </div>

              <div
                style={{
                  padding: '8px 12px',
                  background: '#EDE7F6',
                  border: '1px solid #D1C4E9',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => navigateTo('06')}
              >
                <div>
                  <strong style={{ color: 'var(--purple-primary)', fontSize: '12px' }}>5 Unassigned Inspections</strong>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>Ready for Workspace 02 assignment</div>
                </div>
                <span className="badge badge-planned">Assign</span>
              </div>
            </div>
          </div>

          <div className="enterprise-card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <span className="card-title">
                <Clock size={15} /> Recent Governance Activity
              </span>
              <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('21')}>
                All Logs
              </button>
            </div>
            <div className="card-body" style={{ padding: '10px 14px', maxHeight: '200px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.globalAudit.slice(0, 3).map((a) => (
                  <div key={a.id} style={{ fontSize: '11.5px', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '10px' }}>
                      <span>{a.user.split('(')[0]}</span>
                      <span className="font-mono">{a.timestamp.split(' ')[1]}</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {a.action}: <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{a.objectId}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
