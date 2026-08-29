"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { CheckSquare } from 'lucide-react';

export const Screen17Capa: React.FC = () => {
  const { data, navigateTo } = useStrata();

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">CAPA Monitoring</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <CheckSquare size={20} color="var(--purple-primary)" />
            Corrective & Preventive Actions (CAPA) Monitoring
          </h1>
          <p className="screen-subtitle">
            Track remedial engineering actions, colliery department assignments, and statutory closure verification.
          </p>
        </div>
      </div>

      <div className="enterprise-card">
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>CAPA ID</th>
                <th>Finding Ref</th>
                <th>Mine</th>
                <th>Responsible Dept</th>
                <th>Action Title</th>
                <th>Action Owner</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Verifier</th>
              </tr>
            </thead>
            <tbody>
              {data.capaList.map((c) => (
                <tr key={c.id}>
                  <td><strong className="font-mono" style={{ color: 'var(--purple-primary)' }}>{c.id}</strong></td>
                  <td>
                    <span
                      className="font-mono"
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => navigateTo('16')}
                    >
                      {c.findingId}
                    </span>
                  </td>
                  <td>{c.mine}</td>
                  <td>{c.department}</td>
                  <td style={{ maxWidth: '240px' }}><strong>{c.actionTitle}</strong></td>
                  <td>{c.actionOwner}</td>
                  <td className="font-mono">{c.dueDate}</td>
                  <td>
                    <span className={`badge ${c.priority === 'Critical' ? 'badge-critical' : c.priority === 'High' ? 'badge-high' : 'badge-medium'}`}>
                      <span className="badge-dot" />{c.priority}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        c.status === 'Closed'
                          ? 'badge-completed'
                          : c.status === 'Overdue'
                          ? 'badge-overdue'
                          : c.status === 'Awaiting Verification'
                          ? 'badge-awaiting'
                          : 'badge-draft'
                      }`}
                    >
                      <span className="badge-dot" />{c.status}
                    </span>
                  </td>
                  <td>{c.verifier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
