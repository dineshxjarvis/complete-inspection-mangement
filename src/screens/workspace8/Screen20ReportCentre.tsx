"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  FileCheck,
  FileText,
  Download,
  Sliders,
  ChevronLeft,
  ArrowRight,
  Printer,
  ShieldCheck,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

export const Screen20ReportCentre: React.FC = () => {
  const { navigateTo, showToast } = useOversight();

  const reports = [
    { id: 'REP-01', title: 'Inspection Performance Report', desc: 'Monthly inspection throughput, scheduled vs actuals, colliery completion velocity.', track: 'Performance' },
    { id: 'REP-02', title: 'Finding Analysis & Density Report', desc: 'Breakdown of findings by severity, technical category, and repeated systemic clusters.', track: 'Findings' },
    { id: 'REP-03', title: 'CAPA Remediation & Closure Report', desc: 'Remediation cycle time, overdue actions, verification pass/reopen ratios.', track: 'CAPA' },
    { id: 'REP-04', title: 'Enterprise Statutory Risk Report', desc: 'Colliery risk rankings, $3x4$ risk matrix distribution, emerging hazard patterns.', track: 'Risk' },
    { id: 'REP-05', title: 'Colliery Governance Profile Report', desc: 'Deep dive profile into specific colliery safety parameters, assets, and teams.', track: 'Mine' },
    { id: 'REP-06', title: 'DGMS Regulatory Compliance Report', desc: 'Statutory notices, Form IV responses, follow-up deadlines, and closure letters.', track: 'Regulatory' },
    { id: 'REP-07', title: 'CMR 2017 Statutory Coverage Report', desc: 'Regulatory requirements coverage gap matrix across all operating seams.', track: 'Compliance' },
    { id: 'REP-08', title: 'Immutable Governance Audit Log Report', desc: 'Cryptographically sealed audit trail of all governance state transitions.', track: 'Audit' }
  ];

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
                background: 'rgba(30, 27, 75, 0.15)',
                color: '#1E1B4B'
              }}
            >
              INTELLIGENCE HUB
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY REPORTING & REGULATORY DISCLOSURE CENTRE
          </h1>
          <p className="screen-subtitle">
            Curated executive reports &bull; Generate, configure, and export official statutory packages for DGMS and CIL Board
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('21')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <Sliders size={13} />
          <span>Launch Custom Report Builder (Screen 21) &rarr;</span>
        </button>
      </div>

      {/* 8 Report Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '30px' }}>
        {reports.map(rep => (
          <div key={rep.id} className="card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-info font-bold">{rep.track}</span>
                <span className="id-badge font-mono" style={{ fontSize: '11px' }}>{rep.id}</span>
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '13.5px', fontWeight: 800, color: '#1E1B4B' }}>{rep.title}</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{rep.desc}</p>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('22')}
                style={{ flex: 1, justifyContent: 'center', fontSize: '11.5px' }}
              >
                <span>View Live</span>
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('21')}
                style={{ flex: 1, justifyContent: 'center', fontSize: '11.5px' }}
              >
                <Sliders size={12} />
                <span>Configure</span>
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => showToast(`Exported ${rep.title} (PDF & Excel)`, 'success')}
                style={{ background: '#1E1B4B', borderColor: '#312E81', padding: '3px 10px' }}
                title="Export PDF / Excel"
              >
                <Download size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
