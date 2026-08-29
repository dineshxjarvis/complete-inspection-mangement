"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Building,
  Lock,
  ChevronLeft,
  ArrowRight,
  Send,
  User
} from 'lucide-react';

export const Screen03VerificationAssignment: React.FC = () => {
  const {
    activeVerification,
    assignVerifier,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;
  const [selectedVerifier, setSelectedVerifier] = useState('Er. R. Sharma');

  const handleAssign = () => {
    assignVerifier(ver.id, selectedVerifier);
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
                background: 'rgba(0, 96, 100, 0.15)',
                color: '#006064'
              }}
            >
              VERIFIER ROUTING & SEPARATION OF DUTIES
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            INDEPENDENT VERIFIER ASSIGNMENT &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Competency matrix verification, organizational jurisdiction mapping, and conflict-of-interest screening under DGMS rules
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Competency, Scope & Verifier Candidates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Target CAPA Summary */}
          <div className="card" style={{ padding: '18px', borderLeft: '4px solid #006064' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#006064', fontWeight: 800, textTransform: 'uppercase' }}>
                  TARGET CORRECTIVE ACTION
                </span>
                <h3 style={{ margin: '2px 0 0', fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {ver.actionTitle}
                </h3>
              </div>
              <span className="badge badge-warning font-bold">{ver.severity}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: 'var(--bg-surface-alt)', padding: '10px 12px', borderRadius: '6px', fontSize: '12px' }}>
              <div>Linked Finding: <strong>{ver.findingId}</strong></div>
              <div>Colliery: <strong>{ver.mine}</strong></div>
              <div>Category: <strong>{ver.capaType}</strong></div>
            </div>
          </div>

          {/* Competency & Organizational Scope Requirements */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#006064' }}>
              REQUIRED STATUTORY VERIFICATION COMPETENCIES
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: 600 }}>
                <CheckCircle2 size={15} />
                <span>Certified Ventilation Engineering Competency (Regulation 153 Specialist)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: 600 }}>
                <CheckCircle2 size={15} />
                <span>Underground Mine Safety Level-3 Auditor Certification</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: 600 }}>
                <CheckCircle2 size={15} />
                <span>DGMS Formal CAPA Verification & Closure Authority</span>
              </div>
            </div>

            <div style={{ paddingTop: '10px', borderTop: '1px solid var(--border-light)', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <strong>Organizational Jurisdiction:</strong> Mine A2 &bull; Area 1 &bull; Singrauli Division
            </div>
          </div>

          {/* Recommended Verifier Candidate Selection */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              STRATA RECOMMENDED INDEPENDENT AUDITORS
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Candidate A (Recommended) */}
              <div
                onClick={() => setSelectedVerifier('Er. R. Sharma')}
                style={{
                  padding: '14px',
                  borderRadius: '6px',
                  border: `1.5px solid ${selectedVerifier === 'Er. R. Sharma' ? '#006064' : 'var(--border-color)'}`,
                  background: selectedVerifier === 'Er. R. Sharma' ? '#E0F7FA' : 'var(--bg-surface-alt)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#006064' }}>Er. R. Sharma</span>
                    <span className="badge badge-success" style={{ fontSize: '10px' }}>RECOMMENDED</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DGMS-AUTH-2024-88</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  ✓ Required Competency &bull; ✓ Scope Match &bull; ✓ Available &bull; ✓ Zero SoD Conflict
                </div>
              </div>

              {/* Candidate B */}
              <div
                onClick={() => setSelectedVerifier('Er. K. L. Rao')}
                style={{
                  padding: '14px',
                  borderRadius: '6px',
                  border: `1.5px solid ${selectedVerifier === 'Er. K. L. Rao' ? '#006064' : 'var(--border-color)'}`,
                  background: selectedVerifier === 'Er. K. L. Rao' ? '#E0F7FA' : 'var(--bg-surface-alt)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--text-primary)' }}>Er. K. L. Rao</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DGMS-AUTH-2023-42</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  ✓ Required Competency &bull; ⚠️ Higher Workload (5 active audits)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Separation of Duties & Assignment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SEPARATION OF DUTIES VERIFICATION */}
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #2E7D32' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Lock size={16} color="#2E7D32" />
              <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1B5E20' }}>
                SEPARATION OF DUTIES (SoD) VALIDATION
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', marginBottom: '14px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Action Remediation Owner:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{ver.actionOwner}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Selected Independent Verifier:</span>
                <strong style={{ color: '#006064' }}>{selectedVerifier}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Conflict Screening:</span>
                <span className="badge badge-success font-bold">✓ NO CONFLICT DETECTED</span>
              </div>
            </div>

            <p style={{ margin: '0 0 16px', fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              The verifier has no operational role in executing the corrective action and possesses independent statutory authority.
            </p>

            <button
              className="btn btn-primary"
              onClick={handleAssign}
              style={{ width: '100%', background: '#006064', borderColor: '#004D40', justifyContent: 'center', padding: '12px' }}
            >
              <UserCheck size={16} />
              <span>Assign Verifier & Open Audit Workspace &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
