"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Layers,
  Building,
  Activity,
  Send,
  Lock,
  History,
  FileCheck
} from 'lucide-react';

export const Screen35FinalSummary: React.FC = () => {
  const { navigateTo, kpis } = useOversight();
  const { switchWorkspace } = useWorkspace();

  const workspaces = [
    { id: 'ws1' as const, num: '01', title: 'GOVERNANCE & PLANNING', flow: 'Intake → Recommendation → Plan → Schedule', color: '#312E81', status: '492 Annual Plans Sealed' },
    { id: 'ws2' as const, num: '02', title: 'ASSIGNMENT & TEAM', flow: 'Eligibility → Team Lead → Specialists', color: '#0288D1', status: '482 Multi-Disciplinary Audits' },
    { id: 'ws3' as const, num: '03', title: 'FIELD INSPECTION', flow: 'Checklist → Measurement → Evidence → Findings', color: '#D97706', status: '421 Field Inspections Executed' },
    { id: 'ws4' as const, num: '04', title: 'MINE RESPONSE', flow: 'Notice → Response → Evidence → CAPA Plan', color: '#00897B', status: '100% Formal Response Rate' },
    { id: 'ws5' as const, num: '05', title: 'FINDINGS & REGULATORY ACTION', flow: 'Finding → Review → Confirm → Action', color: '#5E35B1', status: '387 Confirmed Statutory Findings' },
    { id: 'ws6' as const, num: '06', title: 'CORRECTIVE ACTION & COMPLIANCE', flow: 'CAPA → Remediation → Evidence → Submit', color: '#00ACC1', status: '142 Remediated Actions' },
    { id: 'ws7' as const, num: '07', title: 'VERIFICATION & FOLLOW-UP', flow: 'Verify → Pass / Return / Fail → Reopen', color: '#43A047', status: '96 Certified Verifications' },
    { id: 'ws8' as const, num: '08', title: 'INSPECTION OVERSIGHT & REGULATORY', flow: 'Analyze • Monitor • Drill Down • Escalate • Govern', color: '#1E1B4B', status: 'APEX STATUTORY GOVERNANCE' }
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
                background: 'linear-gradient(135deg, #1E1B4B, #312E81)',
                color: '#FCD34D'
              }}
            >
              MASTER ARCHITECTURE SUMMARY
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STRATA &bull; COMPLETE 8-WORKSPACE STATUTORY ARCHITECTURE
          </h1>
          <p className="screen-subtitle">
            Enterprise end-to-end statutory compliance lifecycle for Coal India Limited & Directorate General of Mines Safety
          </p>
        </div>
      </div>

      {/* Hero Master Summary Card */}
      <div
        className="card"
        style={{
          padding: '26px',
          background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
          color: '#FFFFFF',
          border: '2px solid #D97706',
          borderRadius: '8px',
          marginBottom: '24px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.25)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#FCD34D', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              UNIFIED STATUTORY SAFETY GOVERNANCE ENGINE
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 900, color: '#FEF3C7' }}>
              STRATA 8-STAGE END-TO-END PIPELINE
            </h2>
          </div>
          <Award size={36} color="#FCD34D" />
        </div>

        <p style={{ margin: 0, fontSize: '13px', color: '#E2E8F0', lineHeight: 1.5, maxWidth: '900px' }}>
          STRATA unites high-level governance planning, multi-disciplinary field team execution, digital measurement observations, colliery responses, legal regulatory actions, corrective remediation, independent audit verification, and executive apex oversight into an unbroken, immutable statutory chain of custody.
        </p>
      </div>

      {/* 8 Workspace Tiles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '30px' }}>
        {workspaces.map(w => (
          <div
            key={w.id}
            className="card"
            style={{
              padding: '16px',
              borderTop: `4px solid ${w.color}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#FFFFFF'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-subtle font-mono font-bold" style={{ fontSize: '10px' }}>WS {w.num}</span>
                <span className="badge badge-info" style={{ fontSize: '9.5px' }}>{w.status}</span>
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '12.5px', fontWeight: 800, color: '#1E1B4B' }}>{w.title}</h3>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.35 }}>{w.flow}</p>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => switchWorkspace(w.id)}
                style={{ width: '100%', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}
              >
                <span>Launch WS {w.num} &rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
