"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { AlertTriangle } from 'lucide-react';

export const Screen12Overdue: React.FC = () => {
  const { data, navigateTo, showModal, closeModal, showToast } = useStrata();

  const kpis = [
    { label: 'Total Overdue', value: '3', subtext: 'Exceeded statutory window', danger: true },
    { label: 'Critical Risk', value: '1', subtext: 'Winding engine brake', danger: true },
    { label: 'Awaiting Scheduling', value: '1', subtext: 'Dust survey' },
    { label: 'Awaiting Assignment', value: '1', subtext: 'DGMS inquiry duty' },
    { label: 'Delayed Execution', value: '1', subtext: 'Refuge chamber' }
  ];

  const openEscalateModal = (insId: string) => {
    showModal(
      'Statutory Escalation Notice',
      <div>
        <p style={{ fontSize: '12.5px', marginBottom: '12px' }}>
          Issue a formal governance escalation notice for overdue inspection <strong>{insId}</strong> to the General Manager (Safety) and Subsidiary Director Technical.
        </p>
        <div className="form-group">
          <label className="form-label required">Escalation Recipient</label>
          <input type="text" className="form-control" defaultValue="Director Technical (ECL) & DGMS Liaison Cell" readOnly style={{ background: '#F8FAFC' }} />
        </div>
        <div className="form-group" style={{ marginTop: '8px' }}>
          <label className="form-label required">Direct Remedial Directive</label>
          <textarea className="form-control" defaultValue="Mandate emergency allocation of replacement Lead Inspector within 24 hours per CMR 2017 governance rules." />
        </div>
      </div>,
      [
        { text: 'Cancel', className: 'btn-secondary', onClick: closeModal },
        {
          text: 'Dispatch Escalation',
          className: 'btn-danger',
          onClick: () => {
            closeModal();
            showToast(`Escalation dispatch logged to DGMS compliance binder for ${insId}.`, 'error');
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
        <span className="breadcrumb-current">Overdue Inspections</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title" style={{ color: 'var(--status-red-text)' }}>
            <AlertTriangle size={20} />
            Overdue Inspections Governance Monitor
          </h1>
          <p className="screen-subtitle">
            Statutory obligations that have passed their mandated execution window without completed inspection submissions.
          </p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="kpi-row">
        {kpis.map((k, i) => (
          <div key={i} className={`kpi-card ${k.danger ? 'kpi-danger' : ''}`}>
            <span className="kpi-label">{k.label}</span>
            <div className="kpi-val-row"><span className="kpi-value">{k.value}</span></div>
            <span className="kpi-subtext">{k.subtext}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="enterprise-card">
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Inspection ID</th>
                <th>Mine</th>
                <th>Type</th>
                <th>Due Date</th>
                <th>Days Overdue</th>
                <th>Risk</th>
                <th>Current Stage</th>
                <th>Owner</th>
                <th>Statutory Ref</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.overdueInspections.map((o) => (
                <tr key={o.id} className="row-danger">
                  <td>
                    <strong
                      className="font-mono"
                      style={{ color: 'var(--status-red-text)', cursor: 'pointer' }}
                      onClick={() => navigateTo('14', { inspectionId: o.id })}
                    >
                      {o.id}
                    </strong>
                  </td>
                  <td><strong>{o.mine.split('(')[0]}</strong></td>
                  <td>{o.type}</td>
                  <td className="font-mono">{o.dueDate}</td>
                  <td><span className="badge badge-overdue">{o.daysOverdue} Days</span></td>
                  <td>
                    <span className="badge badge-high"><span className="badge-dot" />{o.risk}</span>
                  </td>
                  <td><span className="badge badge-draft">{o.currentStage}</span></td>
                  <td>{o.owner}</td>
                  <td className="font-mono" style={{ fontSize: '11px' }}>{o.statutoryRef}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('14', { inspectionId: o.id })}>Open</button>
                      <button className="btn btn-primary btn-sm" onClick={() => navigateTo('10')}>Reschedule</button>
                      <button className="btn btn-danger btn-sm" onClick={() => openEscalateModal(o.id)}>Escalate</button>
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
