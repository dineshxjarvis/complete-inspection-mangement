"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  Shield,
  Search,
  Filter,
  Lock,
  Clock,
  User,
  Hash,
  ChevronLeft,
  Calendar,
  FileCheck,
  CheckSquare,
  Activity,
  Layers
} from 'lucide-react';

export const Screen20AuditActivity: React.FC = () => {
  const {
    auditLog,
    navigateTo,
    selectedMine
  } = useMineResponse();

  const [selectedObjectType, setSelectedObjectType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLog = auditLog.filter(item => {
    if (selectedObjectType !== 'All' && item.objectType !== selectedObjectType) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.actor.toLowerCase().includes(q) ||
        item.action.toLowerCase().includes(q) ||
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
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B'
              }}
            >
              WORKSPACE 04 &bull; AUDIT TRAIL
            </span>
            <span className="badge badge-subtle">{selectedMine}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            TAMPER-PROOF MINE AUDIT & ACTIVITY TRAIL
          </h1>
          <p className="screen-subtitle">
            Cryptographically chained statutory event ledger &bull; Complete state transition history across all findings, responses, and CAPAs
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: '#E8F5E9',
              border: '1px solid #C8E6C9',
              color: '#2E7D32',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            <Shield size={14} />
            <span>Cryptographic Chain: VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Immutability Banner */}
      <div
        className="card"
        style={{
          background: '#E0F2F1',
          border: '1px solid #80CBC4',
          padding: '10px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Lock size={15} color="#00695C" />
        <span style={{ fontSize: '12px', color: '#004D40' }}>
          <strong>Statutory Compliance Ledger:</strong> This audit trail is read-only. Every state transition records actor identity, role, timestamp, IP address, previous state, new state, justification, and SHA-256 integrity hash.
        </span>
      </div>

      {/* Filter Bar */}
      <div
        className="card"
        style={{
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '12px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search by Actor, Action, Object ID (e.g. FND-00127, CAPA-0048), or Reason..."
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
            <option value="All">All Object Types</option>
            <option value="Inspection">Inspection</option>
            <option value="Finding">Finding</option>
            <option value="Mine Response">Mine Response</option>
            <option value="CAPA">CAPA</option>
            <option value="Evidence">Evidence</option>
            <option value="Escalation">Escalation</option>
          </select>
        </div>
      </div>

      {/* Chronological State Transition Ledger Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Timestamp</th>
              <th style={{ width: '160px' }}>Actor & Role</th>
              <th style={{ width: '170px' }}>Action Executed</th>
              <th style={{ width: '130px' }}>Object ID</th>
              <th style={{ width: '220px' }}>State Transition</th>
              <th>Reason / Justification</th>
              <th style={{ width: '140px' }}>Tamper-Proof Hash</th>
            </tr>
          </thead>
          <tbody>
            {filteredLog.map(item => (
              <tr key={item.id}>
                <td>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {item.timestamp}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.actor}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                    {item.role}
                  </div>
                </td>
                <td>
                  <span className="badge badge-info" style={{ fontSize: '11px' }}>
                    {item.action}
                  </span>
                </td>
                <td>
                  <span className="id-badge font-mono" style={{ fontSize: '11px', background: 'rgba(0, 137, 123, 0.15)', color: '#00796B' }}>
                    {item.objectId}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    <span style={{ textDecoration: 'line-through' }}>{item.previousState}</span>
                    <span style={{ margin: '0 4px', color: '#00796B', fontWeight: 700 }}>&rarr;</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{item.newState}</span>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                    {item.reason}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '10px', color: '#00796B', fontFamily: 'monospace' }}>
                    <Hash size={10} style={{ display: 'inline', marginRight: '2px' }} />
                    {item.tamperProofHash.substring(0, 14)}...
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
