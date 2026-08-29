"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  Send,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  Activity,
  FileCheck,
  Award,
  Layers
} from 'lucide-react';

export const Screen18VerificationHandoff: React.FC = () => {
  const {
    activeCapa,
    navigateTo,
    showToast
  } = useCorrectiveAction();

  const capa = activeCapa;

  const handleOpenWorkspace07 = () => {
    showToast('Transitioning to Workspace 07: Verification & Follow-Up...', 'info');
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('17')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Completed Actions</span>
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
              WORKSPACE 07 TRANSITION
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            READY FOR VERIFICATION &bull; {capa.id}
          </h1>
          <p className="screen-subtitle">
            Remediation packet verified complete &bull; Formal handoff to independent DGMS inspection auditor for re-survey and closure
          </p>
        </div>
      </div>

      {/* Verification Handoff Summary Card */}
      <div className="card" style={{ padding: '24px', borderTop: '4px solid #00695C', marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <span className="badge badge-success font-bold" style={{ fontSize: '12px' }}>
              ✓ REMEDIATION PACKET SEALED
            </span>
            <h2 style={{ margin: '6px 0 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {capa.actionTitle}
            </h2>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>STATUTORY DEADLINE:</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>{capa.dueDate}</div>
          </div>
        </div>

        {/* Source & Result Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
          <div style={{ background: 'var(--bg-surface-alt)', padding: '16px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Source Finding
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#D32F2F', marginTop: '4px' }}>
              {capa.findingId}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {capa.findingTitle}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-alt)', padding: '16px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Statutory Requirement
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {capa.regulatoryRequirement}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-alt)', padding: '16px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Action Owner
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {capa.owner}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {capa.department} &bull; {capa.mine}
            </div>
          </div>
        </div>

        {/* Measured Outcome Box */}
        <div style={{ background: '#E8F5E9', border: '1.5px solid #C8E6C9', borderRadius: '8px', padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Activity size={32} color="#2E7D32" />
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#2E7D32', textTransform: 'uppercase' }}>
                MEASURED PHYSICAL OUTCOME (POST-REPAIR)
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1B5E20', marginTop: '2px' }}>
                5.9 m/s <span style={{ fontSize: '14px', fontWeight: 600, color: '#2E7D32' }}>(Statutory Threshold: &ge; 5.5 m/s) &bull; 107% of Target</span>
              </div>
            </div>
          </div>

          <span className="badge badge-success font-bold" style={{ fontSize: '12px', padding: '6px 14px' }}>
            READY FOR AUDIT
          </span>
        </div>

        {/* Action Handoff Button to Workspace 07 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="btn btn-primary"
            onClick={handleOpenWorkspace07}
            style={{ background: 'linear-gradient(135deg, #00695C 0%, #004D40 100%)', borderColor: '#004D40', padding: '12px 24px', fontSize: '14px', fontWeight: 700 }}
          >
            <Send size={16} />
            <span>Open Verification Workspace (Workspace 07) &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
