"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import { OverdueCapaItem } from '../../types/oversight';
import {
  X,
  AlertOctagon,
  Send,
  ShieldAlert,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const EscalateModal: React.FC = () => {
  const {
    isEscalateModalOpen,
    setIsEscalateModalOpen,
    selectedEscalateItem,
    escalateCapa
  } = useOversight();

  const [targetLevel, setTargetLevel] = useState<OverdueCapaItem['escalationLevel']>('Level 3: Subsidiary Authority');
  const [reason, setReason] = useState(
    'Remediation milestone overdue beyond statutory tolerance. Mandating direct Subsidiary / Directorate General intervention and daily progress reporting.'
  );

  if (!isEscalateModalOpen || !selectedEscalateItem) return null;

  const item = selectedEscalateItem;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    escalateCapa(item.id, targetLevel, reason);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 10, 35, 0.8)',
        backdropFilter: 'blur(3px)',
        zIndex: 960,
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
          maxWidth: '600px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
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
            background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #D97706'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon size={20} color="#FCD34D" />
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>
              STATUTORY ESCALATION PROTOCOL &bull; {item.id}
            </h2>
          </div>
          <button
            onClick={() => setIsEscalateModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#FCD34D',
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
          {/* Target CAPA Summary */}
          <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '12px' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13px' }}>{item.actionTitle}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '6px', color: 'var(--text-muted)' }}>
              <div>Mine: <strong style={{ color: 'var(--text-primary)' }}>{item.mine}</strong></div>
              <div>Days Overdue: <strong style={{ color: '#D32F2F' }}>{item.daysOverdue} Days</strong></div>
              <div>Priority: <strong style={{ color: '#D32F2F' }}>{item.priority}</strong></div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Target Escalation Authority Level *
            </label>
            <select
              className="form-control"
              value={targetLevel}
              onChange={e => setTargetLevel(e.target.value as any)}
              style={{ fontSize: '12.5px', fontWeight: 600 }}
            >
              <option value="Level 1: Mine Management">Level 1: Mine Management (Colliery Agent & Manager)</option>
              <option value="Level 2: Area Authority">Level 2: Area Authority (Area General Manager & Safety Lead)</option>
              <option value="Level 3: Subsidiary Authority">Level 3: Subsidiary Authority (Director Technical / ECL Board)</option>
              <option value="Level 4: Senior Authority">Level 4: Senior Authority (Chairman CIL & DGMS Directorate)</option>
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Statutory Justification & Mandatory Escalation Reason *
            </label>
            <textarea
              className="form-control"
              rows={3}
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
              style={{ height: 'auto', fontSize: '12px', lineHeight: 1.4 }}
            />
          </div>

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
              style={{ background: '#D97706', borderColor: '#B45309', color: '#FFF' }}
            >
              <Send size={13} />
              <span>Confirm & Advance Escalation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
