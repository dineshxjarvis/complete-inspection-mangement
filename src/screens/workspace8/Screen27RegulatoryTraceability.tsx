"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  FolderTree,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Lock,
  Layers,
  Award
} from 'lucide-react';

export const Screen27RegulatoryTraceability: React.FC = () => {
  const { navigateTo } = useOversight();

  const chain = [
    { tier: '1. STATUTORY REGULATION', title: 'Coal Mines Regulations, 2017 (CMR 2017)', detail: 'Gazette of India statutory standard enacted under Mines Act, 1952.' },
    { tier: '2. SPECIFIC CLAUSE', title: 'Regulation 153(2)(b) — Ventilation Airflow', detail: 'Standards of ventilation in underground working districts and returns.' },
    { tier: '3. SAFETY REQUIREMENT', title: 'Minimum Air Velocity ≥ 5.5 m/s in Returns', detail: 'Statutory threshold to prevent explosive methane layering in gassy seams.' },
    { tier: '4. STATUTORY OBLIGATION', title: 'Quarterly Statutory Ventilation Traverse Survey', detail: 'Mandatory quarterly physical measurement by certified ventilation officer.' },
    { tier: '5. FIELD INSPECTION', title: 'INS-2026-0882 (Mine A2 &bull; Seam VII)', detail: 'Executed 15–24 Nov 2026 by Lead Inspector Er. R. Sharma.' },
    { tier: '6. STATUTORY CHECKLIST', title: 'CHK-VENT-09 (Airway Velocity & louvre seals)', detail: '22 statutory checklist questions evaluated in field.' },
    { tier: '7. FIELD OBSERVATION', title: 'OBS-03: Measured Velocity 4.8 m/s', detail: 'Calibrated digital anemometer traverse recorded velocity deficit.' },
    { tier: '8. CONFIRMED FINDING', title: 'FND-2026-00127 (HIGH Severity Non-Compliance)', detail: 'Confirmed in Workspace 03 Review & statutory notice issued.' },
    { tier: '9. CORRECTIVE ACTION', title: 'CAPA-2026-0048 (Overhaul Fan Louvres & Regulators)', detail: 'Remediation executed in Workspace 06 with 4 evidence files.' },
    { tier: '10. INDEPENDENT VERIFICATION', title: 'VER-2026-0031 (PASS Certified at 5.9 m/s)', detail: 'Independently verified in Workspace 07 & certified compliant.' }
  ];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('07')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Finding Details</span>
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
              END-TO-END STATUTORY LINEAGE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            10-TIER REGULATORY TRACEABILITY & COMPLIANCE SPINE
          </h1>
          <p className="screen-subtitle">
            Demonstrate unbroken statutory lineage from Coal Mine Safety Regulation to verified colliery compliance
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('28')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Regulatory Status Matrix (Screen 28)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 10-Tier Interactive Traceability Tree */}
      <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '13.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
          CMR 2017 &rarr; VERIFIED COMPLIANCE CHAIN (INTERACTIVE AUDIT TRAIL)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {chain.map((c, idx) => (
            <div key={c.tier} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div
                style={{
                  background: idx === 9 ? '#2E7D32' : idx === 7 ? '#D32F2F' : idx === 8 ? '#0288D1' : '#1E1B4B',
                  color: '#FFF',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                  flexShrink: 0
                }}
              >
                {idx + 1}
              </div>

              <div style={{ flex: 1, background: idx === 9 ? '#E8F5E9' : idx === 7 ? '#FFEBEE' : 'var(--bg-surface-alt)', border: `1px solid ${idx === 9 ? '#C8E6C9' : idx === 7 ? '#FFCDD2' : 'var(--border-light)'}`, padding: '12px 16px', borderRadius: '6px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', color: idx === 9 ? '#1B5E20' : idx === 7 ? '#B71C1C' : 'var(--text-muted)' }}>
                  {c.tier}
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {c.title}
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {c.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
