"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  Activity,
  Search,
  Filter,
  Lock,
  ChevronLeft,
  User,
  Clock,
  Hash,
  Shield,
  Download
} from 'lucide-react';

export const Screen18RegulatoryAudit: React.FC = () => {
  const {
    auditLog,
    navigateTo,
    activeFinding,
    showToast
  } = useRegulatoryAction();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedObjectType, setSelectedObjectType] = useState('All');

  const filteredLogs = auditLog.filter(item => {
    if (selectedObjectType !== 'All' && item.objectType !== selectedObjectType) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        item.action.toLowerCase().includes(q) ||
        item.actor.toLowerCase().includes(q) ||
        item.objectId.toLowerCase().includes(q) ||
        item.reason.toLowerCase().includes(q)
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
                background: 'rgba(63, 81, 181, 0.15)',
                color: '#1A237E'
              }}
            >
              STATUTORY AUDIT & ACTIVITY TRAIL
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            IMMUTABLE REGULATORY ACTIVITY LEDGER
          </h1>
          <p className="screen-subtitle">
            Cryptographically sealed chronological log of every finding confirmation, classification, notice issuance, and CAPA handoff
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => showToast('Complete statutory audit trail exported to certified PDF', 'success')}
        >
          <Download size={13} />
          <span>Export Certified Audit Ledger</span>
        </button>
      </div>

      {/* Filter Bar */}
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
            placeholder="Search Action, Actor, Object ID, Reason..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>

        <div>
          <select
            className="form-control"
            value={selectedObjectType}
            onChange={e => setSelectedObjectType(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Domains</option>
            <option value="Finding">Finding</option>
            <option value="Notice">Notice / Direction</option>
            <option value="Regulatory Action">Regulatory Action</option>
            <option value="Classification">Classification</option>
            <option value="CAPA">CAPA</option>
            <option value="Escalation">Escalation</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '12px', color: 'var(--text-muted)' }}>
          Showing {filteredLogs.length} of {auditLog.length} events
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Timestamp</th>
              <th style={{ width: '160px' }}>Actor & Role</th>
              <th style={{ width: '180px' }}>Action</th>
              <th style={{ width: '120px' }}>Domain</th>
              <th style={{ width: '130px' }}>Target ID</th>
              <th>State Transition & Reason</th>
              <th style={{ width: '140px' }}>Integrity Digest</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(item => (
              <tr key={item.id}>
                <td>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {item.timestamp}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12.5px' }}>
                    {item.actor}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {item.role}
                  </div>
                </td>
                <td>
                  <span style={{ fontWeight: 700, color: '#1A237E', fontSize: '12.5px' }}>
                    {item.action}
                  </span>
                </td>
                <td>
                  <span className="badge badge-info font-mono" style={{ fontSize: '10.5px' }}>
                    {item.objectType}
                  </span>
                </td>
                <td>
                  <span className="id-badge font-mono" style={{ fontSize: '11px' }}>
                    {item.objectId}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    <code>{item.previousState}</code> &rarr; <code style={{ color: '#1A237E', fontWeight: 700 }}>{item.newState}</code>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {item.reason}
                  </div>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '10px' }}>
                    {item.tamperProofHash.substring(0, 16)}...
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
