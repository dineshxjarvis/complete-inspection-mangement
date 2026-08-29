"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  GitBranch,
  Lock
} from 'lucide-react';

export const Screen26ObjectHistory: React.FC = () => {
  const { navigateTo } = useOversight();

  const events = [
    { step: 1, date: '15 Nov 2026', title: 'Finding Confirmed', desc: 'FND-2026-00127 confirmed in Workspace 03 Review by Lead Auditor.' },
    { step: 2, date: '16 Nov 2026', title: 'Regulatory Action Assigned', desc: 'Form IV statutory notice registered in Workspace 05.' },
    { step: 3, date: '17 Nov 2026', title: 'CAPA Created', desc: 'CAPA-2026-0048 generated for Shaft 3 Return Airway.' },
    { step: 4, date: '18 Nov 2026', title: 'Action Owner Assigned', desc: 'Chief Ventilation Engineer assigned in Workspace 06.' },
    { step: 5, date: '20 Nov 2026', title: 'Action Plan Submitted', desc: 'Engineering plan for fan louvre overhaul and 9-grid traverse submitted.' },
    { step: 6, date: '21 Nov 2026', title: 'Plan Approved', desc: 'Safety Officer and Mine Agent approved remediation plan.' },
    { step: 7, date: '22 Nov 2026', title: 'Execution Started', desc: 'Maintenance crew commenced fan damper pitch overhaul.' },
    { step: 8, date: '28 Nov 2026', title: 'Action Blocked / Milestone Overdue', desc: 'Procurement delay for replacement blades caused temporary milestone slip.' },
    { step: 9, date: '01 Dec 2026', title: 'Escalation Level 1 & Level 2', desc: 'Colliery Agent and Area General Manager intervention mandated.' },
    { step: 10, date: '04 Dec 2026', title: 'Evidence Uploaded', desc: 'Digital calibration certificate and anemometer photos uploaded.' },
    { step: 11, date: '05 Dec 2026', title: 'Submitted for Independent Verification', desc: 'Dispatched to Workspace 07 for DGMS panel auditor traverse review.' }
  ];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('25')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Audit Trail</span>
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
              CAPA-2026-0048
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            COMPLETE 11-STAGE OBJECT LIFECYCLE EVENT TREE
          </h1>
          <p className="screen-subtitle">
            End-to-end statutory evolution from initial field observation to final independent verification and closure
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('27')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Regulatory Lineage (Screen 27)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 11-Step Event Trail */}
      <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '13.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
          CAPA-2026-0048 &bull; CHRONOLOGICAL EVENT LOG
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {events.map(ev => (
            <div key={ev.step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  background: ev.step === 11 ? '#2E7D32' : '#312E81',
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
                {ev.step}
              </div>

              <div style={{ flex: 1, background: 'var(--bg-surface-alt)', padding: '12px 16px', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-primary)' }}>{ev.title}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{ev.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
