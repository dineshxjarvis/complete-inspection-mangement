"use client";

import React from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  History,
  CheckCircle2,
  AlertOctagon,
  RotateCcw,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Lock,
  Calendar,
  User
} from 'lucide-react';

export const Screen16VerificationHistory: React.FC = () => {
  const {
    activeVerification,
    navigateTo
  } = useVerification();

  const ver = activeVerification;

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('04')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Verification Details</span>
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
              MULTI-CYCLE AUDIT TRAIL
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            VERIFICATION HISTORY & MULTI-CYCLE AUDIT &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Non-destructive sequential log of all verification iterations, failure causes, rework cycles, and final certification
          </p>
        </div>
      </div>

      {/* Multi-Cycle Timeline Card */}
      <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
          {ver.historyCycles.map((cycle) => {
            const isPass = cycle.decision === 'PASS';

            return (
              <div
                key={cycle.cycleNumber}
                style={{
                  padding: '18px 20px',
                  borderRadius: '6px',
                  background: 'var(--bg-surface-alt)',
                  border: `1.5px solid ${isPass ? '#C8E6C9' : '#FFCDD2'}`,
                  borderLeftWidth: '5px',
                  borderLeftColor: isPass ? '#2E7D32' : '#D32F2F'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        background: isPass ? '#2E7D32' : '#D32F2F',
                        color: '#FFF',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      CYCLE 0{cycle.cycleNumber}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Auditor Verdict: {cycle.decision}
                    </h3>
                  </div>

                  <span className={`badge ${isPass ? 'badge-success' : 'badge-danger'} font-bold`}>
                    {isPass ? '✓ CERTIFIED' : '✕ REOPENED'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  <div>Submission Date: <strong>{cycle.submissionDate}</strong></div>
                  <div>Auditor: <strong>{cycle.verifier}</strong></div>
                  <div>Measured Outcome: <strong>{cycle.measuredOutcome}</strong></div>
                </div>

                <div style={{ background: '#FFF', padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  <strong>Auditor Findings:</strong> "{cycle.reason}"
                </div>
              </div>
            );
          })}

          {/* Final Closure State Banner */}
          <div
            style={{
              padding: '16px 20px',
              background: '#E8F5E9',
              borderRadius: '6px',
              border: '1px solid #A5D6A7',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={24} color="#2E7D32" />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#1B5E20', textTransform: 'uppercase' }}>
                  FINAL STATUTORY POSTURE
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#1B5E20', marginTop: '2px' }}>
                  VERIFIED &bull; FORMALLY CLOSED UNDER MINES ACT, 1952
                </div>
              </div>
            </div>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('19')}
              style={{ background: '#FFF', color: '#1B5E20', borderColor: '#C8E6C9' }}
            >
              <span>View Verification Certificate (Screen 19) &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
