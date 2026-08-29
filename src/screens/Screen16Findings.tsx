"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { Eye } from 'lucide-react';

export const Screen16Findings: React.FC = () => {
  const { data, navigateTo } = useStrata();

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Findings Monitoring</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Eye size={20} color="var(--purple-primary)" />
            Findings Monitoring Hub (Cross-Workspace Governance)
          </h1>
          <p className="screen-subtitle">
            Supervisory visibility over statutory findings logged across active and reviewed inspections.
          </p>
        </div>
      </div>

      {/* Warning banner about Review Authority */}
      <div className="recommendation-banner">
        <div className="banner-content">
          <span className="banner-tag">GOVERNANCE VISIBILITY</span>
          <span className="banner-text">&bull; Formal Finding Confirmation / Return decisions belong to Workspace 04/05 Review Panels.</span>
        </div>
      </div>

      <div className="enterprise-card">
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Finding ID</th>
                <th>Inspection ID</th>
                <th>Mine</th>
                <th>Severity</th>
                <th>Category</th>
                <th>Regulation Ref</th>
                <th>Field Inspector</th>
                <th>Status</th>
                <th>CAPA Req</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.findings.map((f) => (
                <tr key={f.id}>
                  <td><strong className="font-mono" style={{ color: 'var(--purple-primary)' }}>{f.id}</strong></td>
                  <td>
                    <span
                      className="font-mono"
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => navigateTo('14', { inspectionId: f.inspectionId })}
                    >
                      {f.inspectionId}
                    </span>
                  </td>
                  <td>{f.mine}</td>
                  <td>
                    <span className={`badge ${f.severity === 'Critical' ? 'badge-critical' : f.severity === 'High' ? 'badge-high' : 'badge-medium'}`}>
                      <span className="badge-dot" />{f.severity}
                    </span>
                  </td>
                  <td>{f.findingType}</td>
                  <td className="font-mono" style={{ fontSize: '11px' }}>{f.regulationRef}</td>
                  <td>{f.inspector}</td>
                  <td>
                    <span className={`badge ${f.status === 'Confirmed' ? 'badge-approved' : f.status === 'Returned' ? 'badge-rejected' : 'badge-draft'}`}>
                      <span className="badge-dot" />{f.status}
                    </span>
                  </td>
                  <td>{f.capaRequired ? <span className="badge badge-medium">Yes</span> : <span className="badge badge-draft">No</span>}</td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => navigateTo('17', { findingId: f.id })}
                    >
                      View CAPA
                    </button>
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
