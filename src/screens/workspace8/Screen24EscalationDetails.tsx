"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Send,
  AlertOctagon,
  ChevronLeft,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  UserCheck
} from 'lucide-react';

export const Screen24EscalationDetails: React.FC = () => {
  const { navigateTo, showToast } = useOversight();
  const [escalationReason, setEscalationReason] = useState(
    'Ventilation deficit persists beyond statutory 7-day cure period in active production Seam VII. Direct technical intervention mandated by Subsidiary Technical Director.'
  );

  const handleEscalateAdvance = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Escalation advanced to Level 4: Senior Authority & CIL Board', 'warning');
    navigateTo('25');
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('23')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Escalation Centre</span>
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
            <span className="badge badge-danger font-bold">LEVEL 3: SUBSIDIARY AUTHORITY</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY ESCALATION PROGRESSION & WORKFLOW
          </h1>
          <p className="screen-subtitle">
            Target: <strong>Mine A2 &bull; Shaft 3 Return Airway Overhaul</strong> &bull; Overdue: <strong>8 Days</strong> &bull; Severity: <strong>HIGH</strong>
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('25')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Global Audit Trail (Screen 25)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Escalation Progression History */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
          MULTI-TIER ESCALATION PROGRESSION TRAIL
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ background: '#0288D1', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>1</div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>Level 1: Mine Management (Triggered 01 Dec 2026)</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Automated notification sent to Colliery Agent upon 24-hour milestone breach.</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ background: '#F57C00', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>2</div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>Level 2: Area Authority (Triggered 03 Dec 2026)</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Escalated to Area General Manager; requested daily progress logs from ventilation lead.</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: '#FFF8E1', border: '1px solid #FFE082', padding: '12px', borderRadius: '6px' }}>
            <div style={{ background: '#D97706', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>3</div>
            <div>
              <div style={{ fontWeight: 800, color: '#B45309', fontSize: '12.5px' }}>Level 3: Subsidiary Authority (Active — 05 Dec 2026)</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>Director Technical (ECL) seized direct oversight. Mandated procurement of high-capacity booster regulator.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Escalation Action & Justification Form */}
      <form onSubmit={handleEscalateAdvance} className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
          ADVANCE STATUTORY ESCALATION TO LEVEL 4 (SENIOR AUTHORITY)
        </h3>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
            Statutory Escalation Rationale & Justification (Mandatory) *
          </label>
          <textarea
            className="form-control"
            rows={3}
            value={escalationReason}
            onChange={e => setEscalationReason(e.target.value)}
            required
            style={{ height: 'auto', fontSize: '12px', lineHeight: 1.4 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="submit"
            className="btn btn-danger"
            style={{ background: '#D97706', borderColor: '#B45309', color: '#FFF', padding: '8px 20px' }}
          >
            <Send size={14} />
            <span>Formally Escalate to Chairman CIL & DGMS Directorate &rarr;</span>
          </button>
        </div>
      </form>
    </div>
  );
};
