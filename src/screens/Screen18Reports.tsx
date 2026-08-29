"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { FileCheck } from 'lucide-react';

export const Screen18Reports: React.FC = () => {
  const { data, navigateTo } = useStrata();

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Report Status</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <FileCheck size={20} color="var(--purple-primary)" />
            Statutory Inspection Report Status
          </h1>
          <p className="screen-subtitle">
            Track report drafting, technical reviewer signoffs, DGMS liaison approval, and final publication status.
          </p>
        </div>
      </div>

      <div className="enterprise-card">
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Inspection ID</th>
                <th>Mine</th>
                <th>Version</th>
                <th>Lead Inspector</th>
                <th>Submitted Date</th>
                <th>Reviewer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.reports.map((rep) => (
                <tr key={rep.id}>
                  <td><strong className="font-mono" style={{ color: 'var(--purple-primary)' }}>{rep.id}</strong></td>
                  <td>
                    <span
                      className="font-mono"
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => navigateTo('14', { inspectionId: rep.inspectionId })}
                    >
                      {rep.inspectionId}
                    </span>
                  </td>
                  <td>{rep.mine}</td>
                  <td className="font-mono">{rep.reportVersion}</td>
                  <td>{rep.leadInspector}</td>
                  <td className="font-mono">{rep.submittedDate}</td>
                  <td>{rep.reviewer}</td>
                  <td>
                    <span
                      className={`badge ${
                        rep.status === 'Approved'
                          ? 'badge-completed'
                          : rep.status === 'Returned'
                          ? 'badge-rejected'
                          : rep.status === 'Awaiting Review'
                          ? 'badge-awaiting'
                          : 'badge-draft'
                      }`}
                    >
                      <span className="badge-dot" />{rep.status}
                    </span>
                  </td>
                  <td>
                    {rep.status === 'Approved' ? (
                      <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('20', { inspectionId: rep.inspectionId })}>
                        View Final
                      </button>
                    ) : (
                      <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('14', { inspectionId: rep.inspectionId })}>
                        Open
                      </button>
                    )}
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
