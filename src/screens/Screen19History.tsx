"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { Archive } from 'lucide-react';

export const Screen19History: React.FC = () => {
  const { navigateTo } = useStrata();

  const completed = [
    {
      id: 'INS-2026-0782',
      title: 'Comprehensive DGMS Flameproof Electrical & Switchgear Audit',
      mine: 'Mine A2',
      type: 'Flameproof Electrical',
      date: '15 Jul 2026',
      lead: 'K. Sen',
      outcome: 'Satisfactory (3 Rectifications Verified)',
      findings: 3,
      report: 'Final Report v1.0'
    },
    {
      id: 'INS-2026-0610',
      title: 'Monthly Underground Substation FLP Test',
      mine: 'Mine B1',
      type: 'Flameproof Electrical',
      date: '01 Aug 2026',
      lead: 'K. Sen',
      outcome: 'Satisfactory',
      findings: 1,
      report: 'Final Report v1.0'
    },
    {
      id: 'INS-2026-0412',
      title: 'Statutory Q2 Underground Ventilation Audit',
      mine: 'Mine A2',
      type: 'Ventilation & Gas Dynamics',
      date: '18 May 2026',
      lead: 'S. K. Mukherjee',
      outcome: 'Non-Compliant (Booster Fan Mandated)',
      findings: 3,
      report: 'Final Report v2.0'
    }
  ];

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Inspection History</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Archive size={20} color="var(--purple-primary)" />
            Completed Statutory Inspection Records & Archive
          </h1>
          <p className="screen-subtitle">
            Immutable repository of finalized statutory inspections, digital signatures, and historical compliance trends.
          </p>
        </div>
      </div>

      <div className="enterprise-card">
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Inspection ID</th>
                <th>Title</th>
                <th>Mine</th>
                <th>Type</th>
                <th>Execution Date</th>
                <th>Lead Inspector</th>
                <th>Outcome</th>
                <th>Findings</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {completed.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong
                      className="font-mono"
                      style={{ color: 'var(--purple-primary)', cursor: 'pointer' }}
                      onClick={() => navigateTo('20', { inspectionId: c.id })}
                    >
                      {c.id}
                    </strong>
                  </td>
                  <td><strong>{c.title}</strong></td>
                  <td>{c.mine}</td>
                  <td>{c.type}</td>
                  <td className="font-mono">{c.date}</td>
                  <td>{c.lead}</td>
                  <td>
                    <span className={`badge ${c.outcome.includes('Non-Compliant') ? 'badge-high' : 'badge-completed'}`}>
                      <span className="badge-dot" />{c.outcome}
                    </span>
                  </td>
                  <td>{c.findings} Findings</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('20', { inspectionId: c.id })}>
                      Open Final Record
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
