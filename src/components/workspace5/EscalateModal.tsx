"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import { EscalationLevel } from '../../types/regulatoryAction';
import {
  X,
  ShieldAlert,
  AlertTriangle,
  Send,
  Building,
  User,
  Scale
} from 'lucide-react';

export const EscalateModal: React.FC = () => {
  const {
    isEscalateModalOpen,
    setIsEscalateModalOpen,
    activeFinding,
    escalateFinding
  } = useRegulatoryAction();

  const [targetLevel, setTargetLevel] = useState<EscalationLevel>('Area Authority');
  const [reason, setReason] = useState<string>('Critical statutory safety finding exceeded remediation deadline without verified corrective action.');

  if (!isEscalateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    escalateFinding(activeFinding.id, targetLevel, reason);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 20, 45, 0.75)',
        backdropFilter: 'blur(3px)',
        zIndex: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsEscalateModalOpen(false)}
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
              <ShieldAlert size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#B71C1C' }}>
                STATUTORY ESCALATION PROTOCOL
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#D32F2F' }}>
                Formal Escalation for Finding {activeFinding.id} ({activeFinding.mine})
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEscalateModalOpen(false)}
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
            <strong>Regulatory Rule Engine:</strong> Escalation follows the configured 4-tier matrix: <code>Mine &rarr; Area &rarr; Subsidiary &rarr; Senior Authority / DGMS Liaison</code>. This action generates an immutable audit event.
          </div>

          {/* Finding Details */}
          <div style={{ marginBottom: '14px', fontSize: '12px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
              Finding Title
            </div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
              {activeFinding.title}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '11.5px', marginTop: '2px' }}>
              Severity: <strong>{activeFinding.severity}</strong> &bull; Requirement: <strong>{activeFinding.regulatoryBasisId}</strong>
            </div>
          </div>

          {/* Target Escalation Tier */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Target Escalation Authority Tier *
            </label>
            <select
              className="form-control"
              value={targetLevel}
              onChange={e => setTargetLevel(e.target.value as any)}
              required
            >
              <option value="Area Authority">Tier 2: Area Authority (General Manager / Area Safety Officer)</option>
              <option value="Subsidiary Safety Directorate">Tier 3: Subsidiary Safety Directorate (Director Technical)</option>
              <option value="Senior Authority / DGMS Liaison">Tier 4: Senior Authority / DGMS Regional Liaison Cell</option>
            </select>
          </div>

          {/* Justification Reason */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Statutory Escalation Justification & Rationale *
            </label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="State the regulatory basis, overdue duration, or risk severity justifying formal escalation..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
              style={{ height: 'auto' }}
            />
          </div>

          {/* Action Buttons */}
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
              onClick={() => setIsEscalateModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-danger btn-sm"
              style={{ background: '#D32F2F', color: '#FFF' }}
            >
              <Send size={13} />
              <span>Authorize & Dispatch Escalation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
