"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  CheckSquare,
  AlertTriangle,
  Lock,
  ChevronLeft,
  ArrowRight,
  Shield,
  Building,
  User,
  Calendar,
  FileCheck,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const Screen03CapaIntake: React.FC = () => {
  const {
    activeCapa,
    navigateTo,
    showToast
  } = useCorrectiveAction();

  const capa = activeCapa;

  const handleAcceptAction = () => {
    showToast(`CAPA ${capa.id} accepted. Proceeding to action plan and task breakdown.`, 'success');
    navigateTo('04');
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('02')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Queue</span>
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
              CAPA INTAKE & CONTEXT DOSSIER
            </span>
            <span className="badge badge-warning font-bold">ASSIGNED</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            {capa.id} &bull; {capa.actionTitle}
          </h1>
          <p className="screen-subtitle">
            Action Owner Intake &bull; Understand statutory origin, regulatory requirements, committed outcomes, and required verification evidence
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('10')}
            style={{ color: '#E65100', borderColor: '#FFE0B2' }}
          >
            <HelpCircle size={13} />
            <span>Request Clarification (Screen 10)</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAcceptAction}
            style={{ background: '#00695C', borderColor: '#004D40' }}
          >
            <CheckSquare size={13} />
            <span>Accept Action & Open Plan (Screen 04)</span>
          </button>
        </div>
      </div>

      {/* 8 Structured Intake Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Sections 1 to 5 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 1 — SOURCE CONTEXT */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              SECTION 1 — STATUTORY SOURCE
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', fontSize: '12px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Linked Finding:</span>
                <div style={{ fontWeight: 700, color: '#D32F2F', marginTop: '2px' }}>{capa.findingId}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Inspection ID:</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{capa.inspectionId}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Colliery Location:</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{capa.mine} ({capa.location})</div>
              </div>
            </div>
          </div>

          {/* SECTION 2 — WHY THIS ACTION EXISTS */}
          <div className="card" style={{ padding: '18px', borderLeft: '4px solid #D32F2F' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#D32F2F' }}>
              SECTION 2 — WHY THIS CORRECTIVE ACTION EXISTS
            </h3>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {capa.findingTitle}
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Observed airflow velocity 4.8 m/s against statutory minimum requirement of &ge; 5.5 m/s. High-priority safety remediation required to prevent methane layering.
            </p>
          </div>

          {/* SECTION 3 — REGULATORY BASIS (READ-ONLY) */}
          <div className="card" style={{ padding: '18px', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#004D40' }}>
                SECTION 3 — REGULATORY BASIS (READ-ONLY)
              </h3>
              <Lock size={14} color="#00695C" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px' }}>
              <div><strong>Act:</strong> {capa.act}</div>
              <div><strong>Clause:</strong> {capa.clause}</div>
              <div><strong>Requirement:</strong> {capa.regulatoryRequirement}</div>
            </div>
          </div>

          {/* SECTION 4 & 5 — REQUIRED CORRECTION & EXPECTED OUTCOME */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              SECTIONS 4 & 5 — MANDATED CORRECTION & OUTCOME
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#E0F2F1', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#004D40', textTransform: 'uppercase' }}>
                  Required Correction
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#004D40', marginTop: '2px' }}>
                  {capa.requiredCorrection}
                </div>
              </div>

              <div style={{ background: '#E8F5E9', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#1B5E20', textTransform: 'uppercase' }}>
                  Expected Outcome
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1B5E20', marginTop: '2px' }}>
                  {capa.expectedOutcome}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sections 6 to 8 & Acceptance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 6 & 7 — ASSIGNMENT & DEADLINE */}
          <div className="card" style={{ padding: '18px', borderTop: '4px solid #00695C' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#004D40' }}>
              SECTIONS 6 & 7 — ASSIGNMENT & STATUTORY DEADLINE
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Department:</span>
                <span style={{ fontWeight: 600 }}>{capa.department}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Action Owner:</span>
                <span style={{ fontWeight: 600 }}>{capa.owner}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assigned By:</span>
                <span>{capa.assignedBy}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assignment Date:</span>
                <span>{capa.assignedDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Statutory Due Date:</span>
                <span style={{ fontWeight: 800, color: '#D32F2F', fontSize: '13px' }}>{capa.dueDate}</span>
              </div>
            </div>
          </div>

          {/* SECTION 8 — REQUIRED EVIDENCE */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              SECTION 8 — REQUIRED VERIFICATION EVIDENCE
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                <CheckCircle2 size={14} color="#2E7D32" />
                <span>1. Engineering Louvre Overhaul & Repair Report</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                <CheckCircle2 size={14} color="#2E7D32" />
                <span>2. Calibrated Post-Repair Measurement (&ge; 5.5 m/s)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                <CheckCircle2 size={14} color="#2E7D32" />
                <span>3. Optical Photographic Proof with GPS Coordinates</span>
              </div>
            </div>
          </div>

          {/* Intake Acceptance Button */}
          <button
            className="btn btn-primary"
            onClick={handleAcceptAction}
            style={{ width: '100%', background: '#00695C', borderColor: '#004D40', justifyContent: 'center', padding: '12px' }}
          >
            <CheckSquare size={16} />
            <span>Accept Action & Open Execution Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
