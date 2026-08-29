"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  X,
  AlertTriangle,
  ShieldAlert,
  Send,
  Building,
  User,
  Clock
} from 'lucide-react';

export const EscalationModal: React.FC = () => {
  const {
    isEscalationModalOpen,
    setIsEscalationModalOpen,
    activeCapa,
    escalateOverdueCapa
  } = useMineResponse();

  const [escalationLevel, setEscalationLevel] = useState<string>('General Manager (Mining & Operations)');
  const [reason, setReason] = useState<string>('Corrective action delayed due to procurement lead time for specialized flameproof apparatus parts.');
  const [targetRemediationDate, setTargetRemediationDate] = useState<string>('2026-12-05');

  if (!isEscalationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    escalateOverdueCapa(activeCapa.id, escalationLevel, reason);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(3px)',
        zIndex: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsEscalationModalOpen(false)}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            background: '#FFEBEE',
            borderBottom: '1px solid #FFCDD2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#D32F2F',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlertTriangle size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#B71C1C' }}>
                STATUTORY ESCALATION PROTOCOL
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#D32F2F' }}>
                Formal notification for Overdue Action &bull; {activeCapa.id}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEscalationModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#B71C1C',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '11.5px', color: '#B78103', lineHeight: 1.4 }}>
            <strong>Governance Notice:</strong> Escalation notifications are logged in the immutable audit trail and transmitted to Coal India Limited (CIL) Headquarter Safety Directorate and DGMS Liaison.
          </div>

          {/* Action Details */}
          <div style={{ marginBottom: '14px', fontSize: '12px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
              Overdue CAPA Action
            </div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
              {activeCapa.title}
            </div>
            <div style={{ color: '#D32F2F', fontSize: '11.5px', fontWeight: 600, marginTop: '2px' }}>
              Due: {activeCapa.dueDate} (3 Days Overdue) &bull; Department: {activeCapa.department}
            </div>
          </div>

          {/* Escalation Recipient */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Escalation Authority Tier *
            </label>
            <select
              className="form-control"
              value={escalationLevel}
              onChange={e => setEscalationLevel(e.target.value)}
              required
            >
              <option value="General Manager (Mining & Operations)">Tier 1: General Manager (Mining & Operations)</option>
              <option value="Director (Technical) / CIL Safety Board">Tier 2: Director (Technical) / CIL Safety Board</option>
              <option value="DGMS Regional Inspectorate (Statutory Notice)">Tier 3: DGMS Regional Inspectorate (Formal Notice)</option>
            </select>
          </div>

          {/* Escalation Reason */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Executive Justification & Root Obstruction *
            </label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="State the technical, procurement, or operational reason for delay..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
              style={{ height: 'auto' }}
            />
          </div>

          {/* Revised Remediation Target */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Requested Revised Remediation Deadline *
            </label>
            <input
              type="date"
              className="form-control"
              value={targetRemediationDate}
              onChange={e => setTargetRemediationDate(e.target.value)}
              required
            />
          </div>

          {/* Actions */}
          <div
            style={{
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px'
            }}
          >
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsEscalationModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-danger btn-sm"
              style={{ background: '#D32F2F', color: '#FFF' }}
            >
              <Send size={13} />
              <span>Dispatch Formal Escalation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
