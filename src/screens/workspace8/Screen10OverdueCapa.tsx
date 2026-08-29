"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Clock,
  AlertTriangle,
  AlertOctagon,
  ChevronLeft,
  ArrowRight,
  Send,
  ShieldAlert,
  Search
} from 'lucide-react';

export const Screen10OverdueCapa: React.FC = () => {
  const {
    overdueCapas,
    openEscalateModal,
    navigateTo,
    showToast
  } = useOversight();

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = overdueCapas.filter(c => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      c.id.toLowerCase().includes(q) ||
      c.actionTitle.toLowerCase().includes(q) ||
      c.mine.toLowerCase().includes(q) ||
      c.actionOwner.toLowerCase().includes(q)
    );
  });

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('09')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to CAPA Performance</span>
            </button>
            <span
              className="badge badge-danger font-bold"
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.04em'
              }}
            >
              STATUTORY DEFICIT LEDGER
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            OVERDUE REMEDIATION CAPAs & ESCALATION LADDER
          </h1>
          <p className="screen-subtitle">
            Active corrective actions exceeding statutory target completion milestones under Coal Mines Regulations, 2017
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('23')}
          style={{ background: '#D97706', borderColor: '#B45309', color: '#FFF' }}
        >
          <AlertOctagon size={13} />
          <span>Open Escalation Centre (Screen 23)</span>
        </button>
      </div>

      {/* Escalation Level Matrix Legend */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '20px', background: 'var(--bg-surface-alt)' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B', marginBottom: '10px' }}>
          STATUTORY 4-TIER ESCALATION LADDER HIERARCHY
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '12px' }}>
          <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
            <strong style={{ color: '#0288D1' }}>Level 1: Mine Management</strong>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Colliery Agent & Manager</div>
          </div>
          <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
            <strong style={{ color: '#F57C00' }}>Level 2: Area Authority</strong>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Area General Manager & Safety Lead</div>
          </div>
          <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
            <strong style={{ color: '#D32F2F' }}>Level 3: Subsidiary Authority</strong>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Director Technical / ECL Board</div>
          </div>
          <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
            <strong style={{ color: '#7B1FA2' }}>Level 4: Senior Authority</strong>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Chairman CIL & DGMS Directorate</div>
          </div>
        </div>
      </div>

      {/* Overdue CAPAs Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>CAPA Ref</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th style={{ width: '90px' }}>Colliery</th>
              <th>Action Title & Remediation Scope</th>
              <th style={{ width: '160px' }}>Action Owner</th>
              <th style={{ width: '100px' }}>Due Date</th>
              <th style={{ width: '110px' }}>Overdue</th>
              <th style={{ width: '90px' }}>Priority</th>
              <th style={{ width: '180px' }}>Current Escalation Level</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td>
                  <span className="id-badge font-mono" style={{ background: '#FFEBEE', color: '#C62828', fontWeight: 700 }}>
                    {c.id}
                  </span>
                </td>
                <td><span className="badge badge-subtle font-mono">{c.findingId}</span></td>
                <td><strong>{c.mine}</strong></td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>{c.actionTitle}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status: {c.status}</div>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{c.actionOwner}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{c.department}</div>
                </td>
                <td><span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{c.dueDate}</span></td>
                <td>
                  <span className="badge badge-danger font-bold font-mono">
                    {c.daysOverdue} Days
                  </span>
                </td>
                <td>
                  <span className={`badge ${c.priority === 'CRITICAL' ? 'badge-danger font-bold' : 'badge-warning font-bold'}`}>
                    {c.priority}
                  </span>
                </td>
                <td>
                  <span className="badge badge-warning font-bold" style={{ fontSize: '11px' }}>
                    {c.escalationLevel}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => openEscalateModal(c)}
                    style={{ padding: '2px 8px', fontSize: '11px', background: '#D97706', borderColor: '#B45309', color: '#FFF' }}
                  >
                    <Send size={11} />
                    <span>Escalate</span>
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
