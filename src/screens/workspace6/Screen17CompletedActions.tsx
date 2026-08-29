"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  Eye,
  Lock
} from 'lucide-react';

export const Screen17CompletedActions: React.FC = () => {
  const {
    capaList,
    setActiveCapa,
    navigateTo
  } = useCorrectiveAction();

  const completedActions = capaList.filter(c => c.capaStatus === 'COMPLETED' || c.capaStatus === 'AWAITING VERIFICATION');

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('01')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Dashboard</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(46, 125, 50, 0.15)',
                color: '#1B5E20'
              }}
            >
              COMPLETED EXECUTION STAGE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            COMPLETED CORRECTIVE ACTIONS (OWNER STAGE)
          </h1>
          <p className="screen-subtitle">
            Remediation works finished by action owners &bull; Awaiting independent DGMS statutory verification and final closure
          </p>
        </div>
      </div>

      {/* Fundamental Governance Distinction Alert */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          background: '#E8F5E9',
          border: '1px solid #C8E6C9',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <Lock size={16} color="#2E7D32" />
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#1B5E20', textTransform: 'uppercase' }}>
            CORE GOVERNANCE DISTINCTION: COMPLETED ≠ VERIFIED ≠ CLOSED
          </div>
        </div>
        <p style={{ margin: 0, fontSize: '12.5px', color: '#2E7D32', lineHeight: 1.4 }}>
          Action owner completion confirms on-site physical remediation and evidence submission. Final statutory compliance certification requires independent verification by the inspectorate in Workspace 07.
        </p>
      </div>

      {/* Completed Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>CAPA ID</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th style={{ width: '100px' }}>Mine</th>
              <th>Remediation Action</th>
              <th style={{ width: '120px' }}>Completed Date</th>
              <th style={{ width: '180px' }}>Submitted By</th>
              <th style={{ width: '160px' }}>Verification Status</th>
              <th style={{ width: '140px' }}>Final Compliance</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {completedActions.map(capa => (
              <tr
                key={capa.id}
                onClick={() => {
                  setActiveCapa(capa);
                  navigateTo('18');
                }}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(0, 105, 92, 0.15)', color: '#004D40' }}>
                    {capa.id}
                  </span>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono">{capa.findingId}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{capa.mine}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                    {capa.actionTitle}
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '12px' }}>{capa.dueDate}</span>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{capa.owner}</div>
                </td>
                <td>
                  <span className="badge badge-warning font-bold" style={{ fontSize: '11px' }}>
                    ⏳ PENDING (WS07)
                  </span>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '11px' }}>
                    {capa.complianceStatus}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      setActiveCapa(capa);
                      navigateTo('18');
                    }}
                    style={{ padding: '3px 8px' }}
                  >
                    <span>Inspect</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
