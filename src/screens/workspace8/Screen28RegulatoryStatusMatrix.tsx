"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Search,
  Award
} from 'lucide-react';

export const Screen28RegulatoryStatusMatrix: React.FC = () => {
  const { navigateTo } = useOversight();

  const matrix = [
    { req: 'CMR 2017 Reg 153 — Ventilation Standards & Velocity', app: 'Yes', due: '12 / Year', comp: 10, find: 'FND-00127', capa: 'CAPA-0048', ver: 'PASS (VER-0031)', status: 'COMPLIANT & VERIFIED', color: 'success' },
    { req: 'CMR 2017 Reg 123 — Strata Control & SCAMP Pull Tests', app: 'Yes', due: '24 / Year', comp: 24, find: 'None', capa: 'None', ver: 'Certified', status: '100% COMPLIANT', color: 'success' },
    { req: 'CMR 2017 Reg 185 — FLP Enclosure Tolerances in Gassy Seam', app: 'Yes', due: '12 / Year', comp: 9, find: 'FND-00115', capa: 'CAPA-0039', ver: 'Pending Audit', status: 'GAP DEFICIT (3 Overdue)', color: 'danger' },
    { req: 'CMR 2017 Reg 92 — Haulage & Conveyor Safeguards', app: 'Yes', due: '18 / Year', comp: 13, find: 'FND-00098', capa: 'CAPA-0027', ver: 'In Review', status: 'ACTION REQUIRED', color: 'warning' },
    { req: 'CMR 2017 Reg 210 — Emergency Escape Plan & Refuge Bays', app: 'Yes', due: '4 / Year', comp: 4, find: 'None', capa: 'None', ver: 'Certified', status: '100% COMPLIANT', color: 'success' }
  ];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('27')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Traceability</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(30, 27, 75, 0.15)',
                color: '#1E1B4B'
              }}
            >
              GAP & ASSURANCE MATRIX
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY REQUIREMENT COMPLIANCE MATRIX
          </h1>
          <p className="screen-subtitle">
            Requirement-by-requirement audit matrix &bull; Identify regulatory compliance coverage gaps vs verified assurance
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('29')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Senior Authority Alerts (Screen 29)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Matrix Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>CMR 2017 Statutory Requirement</th>
              <th style={{ width: '90px' }}>Applicable</th>
              <th style={{ width: '100px' }}>Due Audits</th>
              <th style={{ width: '100px' }}>Completed</th>
              <th style={{ width: '110px' }}>Findings</th>
              <th style={{ width: '110px' }}>Linked CAPA</th>
              <th style={{ width: '140px' }}>Verification State</th>
              <th style={{ width: '180px' }}>Statutory Assurance</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, idx) => (
              <tr key={idx}>
                <td><strong style={{ color: '#1E1B4B', fontSize: '12.5px' }}>{row.req}</strong></td>
                <td><span className="badge badge-subtle">{row.app}</span></td>
                <td>{row.due}</td>
                <td><strong style={{ color: '#2E7D32' }}>{row.comp}</strong></td>
                <td><span className="badge badge-warning font-mono">{row.find}</span></td>
                <td><span className="badge badge-info font-mono">{row.capa}</span></td>
                <td><span style={{ fontSize: '11.5px', fontWeight: 600 }}>{row.ver}</span></td>
                <td>
                  <span className={`badge ${row.color === 'danger' ? 'badge-danger font-bold' : row.color === 'warning' ? 'badge-warning font-bold' : 'badge-success font-bold'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
