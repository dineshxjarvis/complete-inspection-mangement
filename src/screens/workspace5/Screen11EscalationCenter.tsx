"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  CheckCircle,
  Building,
  User,
  Scale,
  ChevronLeft,
  ArrowRight,
  Flame,
  Layers,
  Send
} from 'lucide-react';

export const Screen11EscalationCenter: React.FC = () => {
  const {
    findings,
    activeFinding,
    setActiveFinding,
    navigateTo,
    setIsEscalateModalOpen,
    showToast
  } = useRegulatoryAction();

  const escalatedCases = [
    {
      id: 'FND-2026-00121',
      title: 'Electrical Substation Earth Pit Resistance Exceedance',
      mine: 'Mine A2',
      currentLevel: 'Area Authority',
      reason: 'Remediation deadline of 25 Nov passed without verified test log.',
      escalatedOn: '26 Nov 2026',
      escalatedBy: 'Er. P. C. Joshi',
      status: 'Open / Under Area Review'
    },
    {
      id: 'FND-2026-00088',
      title: 'Haul Road Dust Suppression Pump Pressure Drop',
      mine: 'Mine B1',
      currentLevel: 'Subsidiary Safety Directorate',
      reason: 'Repeated failure to procure heavy-duty booster pump impellers across 2 quarters.',
      escalatedOn: '22 Nov 2026',
      escalatedBy: 'Area Safety Officer',
      status: 'Open / Board Review'
    },
    {
      id: 'FND-2026-00054',
      title: 'Emergency Escape Shaft Winder Brake Test Non-Compliance',
      mine: 'Mine C4',
      currentLevel: 'Senior Authority / DGMS Liaison',
      reason: 'Statutory emergency winder dynamic test not conducted within 180-day cycle.',
      escalatedOn: '15 Nov 2026',
      escalatedBy: 'DGMS Regional Inspector',
      status: 'Statutory Show-Cause Active'
    }
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
              className="badge badge-danger"
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.04em'
              }}
            >
              ESCALATION COMMAND CENTER
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY ESCALATIONS & MULTI-TIER ENFORCEMENT
          </h1>
          <p className="screen-subtitle">
            Automated & human-authorized escalation protocols triggered by severity, recurrence patterns, and statutory deadline breaches
          </p>
        </div>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => setIsEscalateModalOpen(true)}
          style={{ background: '#D32F2F', color: '#FFF' }}
        >
          <ShieldAlert size={13} />
          <span>Initiate Escalation Protocol</span>
        </button>
      </div>

      {/* TOP KPI CARDS (4 Metrics) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div className="card stat-card" style={{ padding: '16px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 800 }}>
            Critical Severity
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>
            4
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '16px', borderLeft: '4px solid #F57C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '11px', color: '#E65100', textTransform: 'uppercase', fontWeight: 800 }}>
            Overdue Action
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#E65100', fontFamily: 'monospace', marginTop: '2px' }}>
            7
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '16px', borderLeft: '4px solid #C62828', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 800 }}>
            Response Overdue
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#C62828', fontFamily: 'monospace', marginTop: '2px' }}>
            3
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '16px', borderLeft: '4px solid #7B1FA2', background: '#F3E5F5' }}>
          <div style={{ fontSize: '11px', color: '#4A148C', textTransform: 'uppercase', fontWeight: 800 }}>
            Repeated Breaches
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#7B1FA2', fontFamily: 'monospace', marginTop: '2px' }}>
            5
          </div>
        </div>
      </div>

      {/* SECTION: ESCALATION RULE ENGINE MATRIX */}
      <div
        className="card"
        style={{
          padding: '18px',
          background: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)',
          border: '1px solid #9FA8DA',
          marginBottom: '20px'
        }}
      >
        <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#1A237E', textTransform: 'uppercase', marginBottom: '8px' }}>
          STATUTORY ESCALATION HIERARCHY MATRIX
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          <div style={{ background: '#FFF', padding: '10px 12px', borderRadius: '6px', border: '1px solid #C5CAE9' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>TIER 1 (0–7 Days)</div>
            <div style={{ fontWeight: 800, color: '#1A237E', fontSize: '13px' }}>Mine Authority</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Mine Manager / Overman</div>
          </div>

          <div style={{ background: '#FFF', padding: '10px 12px', borderRadius: '6px', border: '1px solid #FFE082' }}>
            <div style={{ fontSize: '10px', color: '#E65100', fontWeight: 700 }}>TIER 2 (8–14 Days)</div>
            <div style={{ fontWeight: 800, color: '#E65100', fontSize: '13px' }}>Area Authority</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>General Manager / Area SO</div>
          </div>

          <div style={{ background: '#FFF', padding: '10px 12px', borderRadius: '6px', border: '1px solid #FFCDD2' }}>
            <div style={{ fontSize: '10px', color: '#D32F2F', fontWeight: 700 }}>TIER 3 (15–21 Days)</div>
            <div style={{ fontWeight: 800, color: '#D32F2F', fontSize: '13px' }}>Subsidiary Directorate</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Director Technical / CIL Board</div>
          </div>

          <div style={{ background: '#FFF', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1C4E9' }}>
            <div style={{ fontSize: '10px', color: '#4A148C', fontWeight: 700 }}>TIER 4 (&gt;21 Days)</div>
            <div style={{ fontWeight: 800, color: '#4A148C', fontSize: '13px' }}>Senior Authority / DGMS</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Regional Safety Inspectorate</div>
          </div>
        </div>
      </div>

      {/* SECTION: ESCALATED FINDINGS QUEUE */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', fontWeight: 700, fontSize: '13px' }}>
          ACTIVE ESCALATED STATUTORY DOSSIERS
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Finding ID</th>
              <th>Issue & Finding Title</th>
              <th style={{ width: '100px' }}>Mine</th>
              <th style={{ width: '180px' }}>Current Escalation Level</th>
              <th>Escalation Rationale</th>
              <th style={{ width: '120px' }}>Escalated On</th>
              <th style={{ width: '140px' }}>Status</th>
              <th style={{ width: '130px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {escalatedCases.map(esc => (
              <tr key={esc.id}>
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(211, 47, 47, 0.15)', color: '#D32F2F', fontWeight: 800 }}>
                    {esc.id}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13px' }}>
                    {esc.title}
                  </div>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{esc.mine}</span>
                </td>
                <td>
                  <span className="badge badge-danger font-bold" style={{ fontSize: '11px' }}>
                    {esc.currentLevel}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{esc.reason}</div>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{esc.escalatedOn}</span>
                </td>
                <td>
                  <span className="status-pill status-overdue" style={{ fontSize: '10.5px' }}>
                    {esc.status}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        const f = findings.find(x => x.id === esc.id) || activeFinding;
                        setActiveFinding(f);
                        navigateTo('04');
                      }}
                      style={{ padding: '2px 6px', fontSize: '11px' }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => showToast(`Escalation resolution workflow triggered for ${esc.id}`, 'success')}
                      style={{ padding: '2px 6px', fontSize: '11px', background: '#2E7D32', borderColor: '#1B5E20' }}
                    >
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
