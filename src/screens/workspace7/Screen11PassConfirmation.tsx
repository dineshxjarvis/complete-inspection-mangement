"use client";

import React from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  CheckCircle2,
  Lock,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Send,
  Award,
  FileCheck
} from 'lucide-react';

export const Screen11PassConfirmation: React.FC = () => {
  const {
    activeVerification,
    passVerification,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;

  const handleConfirmPass = () => {
    passVerification(ver.id, 'Statutory verification completed and sealed. Corrective action outcome confirmed.');
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('10')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Decision Form</span>
            </button>
            <span
              className="badge badge-success font-bold"
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.04em'
              }}
            >
              ✓ PASS CONFIRMATION & CLOSURE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CONFIRM VERIFICATION PASS & STATUTORY CLOSURE &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Lock regulatory decision, transition compliance state to VERIFIED, and formally close statutory finding under Mines Act, 1952
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Result Summary & Compliance Impact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Result Banner */}
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', border: '1.5px solid #81C784' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <CheckCircle2 size={36} color="#1B5E20" />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#1B5E20', textTransform: 'uppercase' }}>
                  STATUTORY VERDICT: PASS
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1B5E20', marginTop: '2px' }}>
                  Remediation Confirmed & Statutory Standard Restored
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Impact Transitions */}
          <div className="card" style={{ padding: '20px', borderLeft: '4px solid #2E7D32' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1B5E20' }}>
              Statutory State Transitions
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12px' }}>
              <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Compliance State:</span>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>NOT VERIFIED &rarr;</div>
                <div style={{ fontWeight: 800, color: '#2E7D32', fontSize: '14px' }}>✓ VERIFIED</div>
              </div>

              <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>CAPA Status:</span>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>AWAITING VERIF &rarr;</div>
                <div style={{ fontWeight: 800, color: '#2E7D32', fontSize: '14px' }}>✓ VERIFIED</div>
              </div>

              <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Finding Lifecycle:</span>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>CONFIRMED &rarr;</div>
                <div style={{ fontWeight: 800, color: '#1A237E', fontSize: '14px' }}>🔒 CLOSED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Immutability Warning & Confirm Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #2E7D32' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B78103', marginBottom: '8px' }}>
              <Lock size={16} />
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>
                PERMANENT DECISION LOCK
              </div>
            </div>

            <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Confirming verification will seal this decision and generate an official DGMS verification report certificate (Screen 19). The record cannot be modified post-confirmation.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigateTo('10')}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmPass}
                style={{ flex: 2, background: '#2E7D32', borderColor: '#1B5E20', justifyContent: 'center' }}
              >
                <Award size={15} />
                <span>Confirm PASS & Close Finding &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
