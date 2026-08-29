"use client";

import React, { useState } from 'react';
import { useStrata } from '../context/StrataContext';
import { Shield } from 'lucide-react';

export const Screen21GlobalAudit: React.FC = () => {
  const { data, navigateTo } = useStrata();
  const [filterUser, setFilterUser] = useState('All');
  const [filterType, setFilterType] = useState('All');

  let filtered = data.globalAudit;
  if (filterUser !== 'All') {
    filtered = filtered.filter(a => a.user.includes(filterUser));
  }
  if (filterType !== 'All') {
    filtered = filtered.filter(a => a.objectType === filterType);
  }

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Global Governance Audit</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Shield size={20} color="var(--purple-primary)" />
            Global Governance Audit & Activity Trail
          </h1>
          <p className="screen-subtitle">
            Cryptographically signed immutable governance log recording every state transition, plan creation, scheduling action, and recommendation override.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <select className="filter-select" value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
          <option value="All">All Governance Users</option>
          <option value="Mukherjee">S. K. Mukherjee (Manager)</option>
          <option value="Agarwal">R. K. Agarwal (Mine Agent)</option>
          <option value="Sen">K. Sen (Inspector)</option>
        </select>
        <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="All">All Object Types</option>
          <option value="Inspection">Inspection</option>
          <option value="Plan">Inspection Plan</option>
          <option value="Recommendation">Recommendation</option>
          <option value="Request">Intake Request</option>
        </select>
        <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => { setFilterUser('All'); setFilterType('All'); }}>
          Reset
        </button>
      </div>

      <div className="enterprise-card">
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Audit ID</th>
                <th>Timestamp (IST)</th>
                <th>Authorized User</th>
                <th>Action Performed</th>
                <th>Object Type</th>
                <th>Object ID</th>
                <th>Scope</th>
                <th>State Transition</th>
                <th>Reason / Statutory Note</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td><strong className="font-mono" style={{ color: 'var(--purple-primary)' }}>{a.id}</strong></td>
                  <td className="font-mono timestamp" style={{ fontSize: '11px' }}>{a.timestamp}</td>
                  <td><strong>{a.user}</strong></td>
                  <td>{a.action}</td>
                  <td><span className="badge badge-draft">{a.objectType}</span></td>
                  <td><strong className="font-mono">{a.objectId}</strong></td>
                  <td>{a.scope}</td>
                  <td>
                    <span className="font-mono" style={{ fontSize: '10.5px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{a.previousState}</span> &rarr; <span style={{ color: 'var(--purple-primary)', fontWeight: 700 }}>{a.newState}</span>
                    </span>
                  </td>
                  <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{a.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
