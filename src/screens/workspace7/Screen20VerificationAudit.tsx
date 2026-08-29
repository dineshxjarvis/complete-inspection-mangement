"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  FileText,
  Search,
  Filter,
  ShieldCheck,
  Lock,
  ChevronLeft,
  Calendar,
  Hash
} from 'lucide-react';

export const Screen20VerificationAudit: React.FC = () => {
  const {
    auditLog,
    navigateTo,
    activeVerification
  } = useVerification();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLog.filter(log => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      log.event.toLowerCase().includes(q) ||
      log.actor.toLowerCase().includes(q) ||
      log.objectId.toLowerCase().includes(q) ||
      log.reason.toLowerCase().includes(q)
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
                background: 'rgba(0, 96, 100, 0.15)',
                color: '#006064'
              }}
            >
              STATUTORY AUDIT REPOSITORY
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            TAMPER-PROOF VERIFICATION ACTIVITY & AUDIT LEDGER
          </h1>
          <p className="screen-subtitle">
            Cryptographically sealed immutable log of all verification reviews, measurements, verdicts, and state transitions
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: '12px 16px', marginBottom: '16px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search audit events, auditor, reference ID, reason..."
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
              <th style={{ width: '130px' }}>Target Ref</th>
              <th style={{ width: '160px' }}>Auditor / Actor</th>
              <th>Statutory Action & Operational Context</th>
              <th style={{ width: '180px' }}>State Transition</th>
              <th style={{ width: '180px' }}>SHA-256 Digest</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{log.timestamp}</span>
                </td>
                <td>
                  <span className="badge badge-info font-mono" style={{ fontSize: '11px' }}>{log.objectId}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12px' }}>{log.actor}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{log.role}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>{log.event}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{log.reason}</div>
                </td>
                <td>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {log.previousState} &rarr; <strong style={{ color: '#006064' }}>{log.newState}</strong>
                  </div>
                </td>
                <td>
                  <code style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{log.tamperProofHash}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
