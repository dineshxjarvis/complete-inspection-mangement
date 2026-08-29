"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Sliders,
  FileCheck,
  Building,
  Calendar,
  ChevronLeft,
  ArrowRight,
  Send,
  Layers,
  FileText
} from 'lucide-react';

export const Screen21ReportBuilder: React.FC = () => {
  const { navigateTo, orgScope, showToast } = useOversight();

  const [period, setPeriod] = useState('Current Month (November 2026)');
  const [format, setFormat] = useState('PDF Executive Dossier');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Compiling custom statutory oversight report...', 'info');
    setTimeout(() => {
      navigateTo('22');
    }, 400);
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('20')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Report Centre</span>
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
              QUERY & PARAMETER BUILDER
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CUSTOM STATUTORY OVERSIGHT REPORT BUILDER
          </h1>
          <p className="screen-subtitle">
            Configure parameters, filter sets, statutory modules, and output formats for executive presentation
          </p>
        </div>
      </div>

      {/* Builder Form */}
      <form onSubmit={handleGenerate} className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Jurisdiction Scope */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Jurisdiction & Organization Scope *
            </label>
            <input
              type="text"
              className="form-control"
              value={`${orgScope.corporate} → ${orgScope.subsidiary} → ${orgScope.area} → ${orgScope.mine}`}
              readOnly
              style={{ background: 'var(--bg-surface-alt)', fontWeight: 600, fontSize: '12px' }}
            />
          </div>

          {/* Time Period */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Reporting Time Window *
            </label>
            <select
              className="form-control"
              value={period}
              onChange={e => setPeriod(e.target.value)}
              style={{ fontSize: '12px', fontWeight: 600 }}
            >
              <option value="Current Month (November 2026)">Current Month (November 2026)</option>
              <option value="Q3 FY2026 (Oct–Dec 2026)">Q3 FY2026 (Oct–Dec 2026)</option>
              <option value="Year-to-Date (Jan–Nov 2026)">Year-to-Date (Jan–Nov 2026)</option>
              <option value="Annual Statutory Audit (FY2025-26)">Annual Statutory Audit (FY2025-26)</option>
            </select>
          </div>
        </div>

        {/* Modules to Include */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>
            Statutory Intelligence Modules to Include *
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '4px' }}>
              <input type="checkbox" defaultChecked />
              <span>Inspection KPIs & Throughput</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '4px' }}>
              <input type="checkbox" defaultChecked />
              <span>Critical Findings Ledger</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '4px' }}>
              <input type="checkbox" defaultChecked />
              <span>Overdue CAPAs & Escalations</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '4px' }}>
              <input type="checkbox" defaultChecked />
              <span>$3\times 4$ Risk Matrix Heatmap</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '4px' }}>
              <input type="checkbox" defaultChecked />
              <span>DGMS Form IV Notices Mirror</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '4px' }}>
              <input type="checkbox" defaultChecked />
              <span>Cryptographic Audit Seal</span>
            </label>
          </div>
        </div>

        {/* Output Format */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
            Output Artifact Format *
          </label>
          <select
            className="form-control"
            value={format}
            onChange={e => setFormat(e.target.value)}
            style={{ fontSize: '12px', fontWeight: 600, maxWidth: '400px' }}
          >
            <option value="PDF Executive Dossier">PDF Executive Dossier (Certified Digital Seal)</option>
            <option value="Excel Raw Statutory Ledger">Excel Raw Statutory Ledger (.xlsx)</option>
            <option value="DGMS Electronic Portal XML/JSON">DGMS Electronic Portal Compliant JSON</option>
          </select>
        </div>

        {/* Generate Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ background: '#1E1B4B', borderColor: '#312E81', padding: '8px 24px' }}
          >
            <FileText size={15} />
            <span>Compile & Generate Executive Report &rarr;</span>
          </button>
        </div>
      </form>
    </div>
  );
};
