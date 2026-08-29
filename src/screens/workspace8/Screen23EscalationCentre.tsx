"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  AlertOctagon,
  AlertTriangle,
  Send,
  Users,
  Calendar,
  ShieldAlert,
  ChevronLeft,
  ArrowRight,
  Clock,
  RotateCcw
} from 'lucide-react';

export const Screen23EscalationCentre: React.FC = () => {
  const {
    overdueCapas,
    openEscalateModal,
    navigateTo,
    showToast
  } = useOversight();

  const escalationItems = [
    {
      id: 'ESC-01',
      objectRef: 'CAPA-2026-0048',
      type: 'Overdue Corrective Action',
      colliery: 'Mine A2',
      title: 'Ventilation Louvres Overhaul (Shaft 3)',
      daysOverdue: 8,
      severity: 'HIGH',
      level: 'Level 3: Subsidiary Authority',
      reason: 'Statutory milestone expired; mandated technical intervention.'
    },
    {
      id: 'ESC-02',
      objectRef: 'CAPA-2026-0039',
      type: 'Critical Finding Aging Without Progress',
      colliery: 'Mine A5',
      title: 'FLP 3.3kV Substation Flange Tolerance Gap',
      daysOverdue: 16,
      severity: 'CRITICAL',
      level: 'Level 4: Senior Authority',
      reason: 'Gassy Seam III electrical spark explosion hazard.'
    },
    {
      id: 'ESC-03',
      objectRef: 'PAT-01',
      type: 'Repeated Verification Failure Pattern',
      colliery: 'Mine A2',
      title: 'Airflow Velocity Recurrence (4th occurrence in 18 months)',
      daysOverdue: 0,
      severity: 'HIGH',
      level: 'Level 2: Area Authority',
      reason: 'Systemic recurrence requiring preventive overhaul.'
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
              className="badge badge-danger font-bold"
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.04em'
              }}
            >
              EXECUTIVE INTERVENTION QUEUE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            SENIOR STATUTORY ESCALATION COMMAND CENTRE
          </h1>
          <p className="screen-subtitle">
            Centralized intervention hub for overdue remediation milestones, recurrent failures, and statutory DGMS notices
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('24')}
          style={{ background: '#D97706', borderColor: '#B45309', color: '#FFF' }}
        >
          <span>Escalation Details Workflow (Screen 24)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 4 Action Command Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <button
          className="card"
          onClick={() => showToast('Dispatched re-assignment order to Colliery Management', 'info')}
          style={{ padding: '14px', borderLeft: '4px solid #0288D1', textAlign: 'left', cursor: 'pointer' }}
        >
          <Users size={18} color="#0288D1" />
          <div style={{ fontWeight: 800, fontSize: '13px', color: '#1E1B4B', marginTop: '6px' }}>Reassign Action Owner</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Transfer remediation to senior engineer</div>
        </button>

        <button
          className="card"
          onClick={() => showToast('Allocated special capital engineering budget for ventilation repair', 'success')}
          style={{ padding: '14px', borderLeft: '4px solid #2E7D32', textAlign: 'left', cursor: 'pointer' }}
        >
          <ShieldAlert size={18} color="#2E7D32" />
          <div style={{ fontWeight: 800, fontSize: '13px', color: '#1E1B4B', marginTop: '6px' }}>Mandate Resources</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Authorize emergency procurement</div>
        </button>

        <button
          className="card"
          onClick={() => showToast('Scheduled Priority Verification Inspection for tomorrow 09:00 IST', 'warning')}
          style={{ padding: '14px', borderLeft: '4px solid #7B1FA2', textAlign: 'left', cursor: 'pointer' }}
        >
          <Calendar size={18} color="#7B1FA2" />
          <div style={{ fontWeight: 800, fontSize: '13px', color: '#1E1B4B', marginTop: '6px' }}>Schedule Priority Audit</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Deploy independent verifier</div>
        </button>

        <button
          className="card"
          onClick={() => showToast('Issued Formal Senior Authority Notice to Subsidiary Technical Director', 'error')}
          style={{ padding: '14px', borderLeft: '4px solid #D32F2F', textAlign: 'left', cursor: 'pointer' }}
        >
          <Send size={18} color="#D32F2F" />
          <div style={{ fontWeight: 800, fontSize: '13px', color: '#1E1B4B', marginTop: '6px' }}>Issue Senior Notice</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Formal statutory directive</div>
        </button>
      </div>

      {/* Escalation Queue Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '100px' }}>Esc Ref</th>
              <th style={{ width: '130px' }}>Target Object</th>
              <th style={{ width: '100px' }}>Colliery</th>
              <th>Intervention Subject & Escalation Rationale</th>
              <th style={{ width: '120px' }}>Severity</th>
              <th style={{ width: '180px' }}>Active Escalation Level</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {escalationItems.map(esc => (
              <tr key={esc.id} onClick={() => navigateTo('24')} style={{ cursor: 'pointer' }}>
                <td><span className="id-badge font-mono">{esc.id}</span></td>
                <td><span className="badge badge-info font-mono">{esc.objectRef}</span></td>
                <td><strong>{esc.colliery}</strong></td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>{esc.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{esc.reason}</div>
                </td>
                <td>
                  <span className={`badge ${esc.severity === 'CRITICAL' ? 'badge-danger font-bold' : 'badge-warning font-bold'}`}>
                    {esc.severity}
                  </span>
                </td>
                <td>
                  <span className="badge badge-warning font-bold" style={{ fontSize: '11px' }}>
                    {esc.level}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      navigateTo('24');
                    }}
                    style={{ padding: '3px 8px', fontSize: '11px' }}
                  >
                    <span>Execute &rarr;</span>
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
