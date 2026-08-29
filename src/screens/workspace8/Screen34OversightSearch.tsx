"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Search,
  Building,
  FileText,
  AlertTriangle,
  Award,
  ShieldCheck,
  Globe,
  ChevronLeft,
  ArrowRight,
  Clock
} from 'lucide-react';

export const Screen34OversightSearch: React.FC = () => {
  const { navigateTo } = useOversight();
  const [query, setQuery] = useState('ventilation');

  const results = [
    { cat: 'Mines', title: 'Mine A2 (Seam VII Underground)', sub: 'ECL &bull; Area 1 &bull; High Risk &bull; Gassy Seam Degree III', target: '14' as const },
    { cat: 'Inspections', title: 'INS-2026-0882 (Quarterly Statutory Ventilation)', sub: 'Mine A2 &bull; Completed 24 Nov &bull; 4 Findings Generated', target: '05' as const },
    { cat: 'Findings', title: 'FND-2026-00127 (Velocity below 5.5 m/s in Shaft 3)', sub: 'CMR 2017 Reg 153(2)(b) &bull; HIGH Severity &bull; Confirmed', target: '07' as const },
    { cat: 'CAPA Actions', title: 'CAPA-2026-0048 (Overhaul Fan Louvres & Telemetry)', sub: 'Ventilation Dept &bull; Level 3 Escalated &bull; VER-0031 PASS', target: '24' as const },
    { cat: 'Statutory Regulations', title: 'CMR 2017 Regulation 153 (Ventilation Velocity Standards)', sub: 'Statutory threshold &ge; 5.5 m/s in return airways', target: '27' as const },
    { cat: 'DGMS Notices', title: 'DGMS/INS/2026/0042 (Statutory Form IV Notice)', sub: 'Issued 15 Nov 2026 &bull; Rectification Certified &bull; Closure Ready', target: '16' as const }
  ];

  const filtered = results.filter(
    r =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.sub.toLowerCase().includes(query.toLowerCase()) ||
      r.cat.toLowerCase().includes(query.toLowerCase())
  );

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
              UNIVERSAL SEARCH
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CROSS-WORKSPACE STATUTORY ENTERPRISE SEARCH
          </h1>
          <p className="screen-subtitle">
            Universal semantic search across Collieries, Field Audits, Statutory Findings, Remediation CAPAs, and DGMS Regulations
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('35')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Final Oversight Summary (Screen 35)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Big Search Input */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#1E1B4B' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search across all 8 STRATA workspaces (e.g. Ventilation, Shaft 3, FLP, CMR 153, Er. Sharma)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ paddingLeft: '38px', fontSize: '14px', height: '42px', fontWeight: 600 }}
          />
        </div>
      </div>

      {/* Grouped Search Results */}
      <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
        <div style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B', marginBottom: '14px' }}>
          {filtered.length} RESULTS FOUND FOR "{query}"
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((res, idx) => (
            <div
              key={idx}
              onClick={() => navigateTo(res.target)}
              style={{
                padding: '12px 16px',
                background: 'var(--bg-surface-alt)',
                borderRadius: '6px',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#EEF2FF';
                e.currentTarget.style.borderColor = '#C7D2FE';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-surface-alt)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              <div>
                <span className="badge badge-info" style={{ marginBottom: '4px' }}>{res.cat}</span>
                <div style={{ fontWeight: 800, fontSize: '13px', color: '#1E1B4B' }}>{res.title}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>{res.sub}</div>
              </div>

              <button className="btn btn-secondary btn-sm" style={{ padding: '4px 10px', fontSize: '11px' }}>
                <span>Inspect Record &rarr;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
