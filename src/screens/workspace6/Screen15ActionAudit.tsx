"use client";

import React, { useState } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  Activity,
  Search,
  Filter,
  ShieldCheck,
  ChevronLeft,
  Lock,
  Calendar,
  User,
  Hash
} from 'lucide-react';

export const Screen15ActionAudit: React.FC = () => {
  const {
    auditLog,
    navigateTo
  } = useCorrectiveAction();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<string>('All');

  const filteredLogs = auditLog.filter(log => {
    if (selectedUser !== 'All' && log.actor !== selectedUser) return false;
    if (selectedEvent !== 'All' && !log.event.includes(selectedEvent)) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        log.id.toLowerCase().includes(q) ||
        log.actor.toLowerCase().includes(q) ||
        log.event.toLowerCase().includes(q) ||
        log.objectId.toLowerCase().includes(q) ||
        log.reason.toLowerCase().includes(q)
      );
    }
    return true;
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
                background: 'rgba(0, 105, 92, 0.15)',
                color: '#004D40'
              }}
            >
              TAMPER-PROOF AUDIT TRAIL
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CORRECTIVE ACTION AUDIT & ACTIVITY LEDGER
          </h1>
          <p className="screen-subtitle">
            Cryptographically sealed immutable activity log &bull; Zero deletion policy for regulatory compliance under Mines Act, 1952
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div
        className="card"
        style={{
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '12px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search Audit ID, Actor, Event, CAPA Ref..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>

        <div>
          <select
            className="form-control"
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Users / Actors</option>
            <option value="Er. S. K. Mahapatra">Er. S. K. Mahapatra</option>
            <option value="M. K. Pandey">M. K. Pandey</option>
            <option value="Er. P. C. Joshi">Er. P. C. Joshi</option>
          </select>
        </div>

        <div>
          <select
            className="form-control"
            value={selectedEvent}
            onChange={e => setSelectedEvent(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Event Types</option>
            <option value="Progress">Progress Updates</option>
            <option value="Evidence">Evidence Uploads</option>
            <option value="Accepted">Action Acceptance</option>
            <option value="Submitted">Verification Submissions</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Audit ID</th>
              <th style={{ width: '160px' }}>Timestamp</th>
              <th style={{ width: '180px' }}>Actor & Role</th>
              <th style={{ width: '180px' }}>Event Action</th>
              <th style={{ width: '120px' }}>Object Ref</th>
              <th style={{ width: '140px' }}>State Transition</th>
              <th>Statutory Justification / Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td>
                  <span className="id-badge font-mono" style={{ fontSize: '11px' }}>
                    {log.id}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {log.timestamp}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, fontSize: '12.5px', color: 'var(--text-primary)' }}>
                    {log.actor}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                    {log.role}
                  </div>
                </td>
                <td>
                  <span className="badge badge-info" style={{ fontSize: '11px' }}>
                    {log.event}
                  </span>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '11px' }}>
                    {log.objectId}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {log.previousState} &rarr; <strong>{log.newState}</strong>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                    {log.reason}
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
