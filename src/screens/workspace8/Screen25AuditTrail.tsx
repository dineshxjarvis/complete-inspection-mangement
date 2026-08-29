"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  History,
  Search,
  Filter,
  Lock,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export const Screen25AuditTrail: React.FC = () => {
  const { auditLog, navigateTo } = useOversight();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = auditLog.filter(l => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      l.id.toLowerCase().includes(q) ||
      l.actor.toLowerCase().includes(q) ||
      l.objectId.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      l.reason.toLowerCase().includes(q)
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
              IMMUTABLE AUDIT REGISTER
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            GLOBAL STATUTORY GOVERNANCE AUDIT TRAIL
          </h1>
          <p className="screen-subtitle">
            Cryptographically timestamped ledger of all state transitions, escalations, verifications, and regulatory closures
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('26')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Object History (Screen 26)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: '12px 16px', marginBottom: '16px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search Audit ID, Actor, Target Object (e.g. CAPA-2026-0048), Action Rationale..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Timestamp</th>
              <th style={{ width: '180px' }}>Actor & Role</th>
              <th style={{ width: '100px' }}>Entity Type</th>
              <th style={{ width: '130px' }}>Object ID</th>
              <th>Action Executed</th>
              <th style={{ width: '160px' }}>State Transition</th>
              <th>Statutory Justification Reason</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} onClick={() => navigateTo('26')} style={{ cursor: 'pointer' }}>
                <td><span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{item.timestamp}</span></td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12px' }}>{item.actor}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{item.role}</div>
                </td>
                <td><span className="badge badge-subtle">{item.objectType}</span></td>
                <td><span className="badge badge-info font-mono">{item.objectId}</span></td>
                <td><strong style={{ color: '#1E1B4B', fontSize: '12px' }}>{item.action}</strong></td>
                <td>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {item.previousState} &rarr; <strong style={{ color: '#2E7D32' }}>{item.newState}</strong>
                  </div>
                </td>
                <td><span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{item.reason}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
