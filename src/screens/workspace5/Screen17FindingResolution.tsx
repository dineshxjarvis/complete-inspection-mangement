"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  ChevronLeft,
  ArrowRight,
  Shield,
  FileCheck,
  CheckSquare,
  Clock
} from 'lucide-react';

export const Screen17FindingResolution: React.FC = () => {
  const {
    activeFinding,
    closeFinding,
    navigateTo,
    showToast
  } = useRegulatoryAction();

  const [closureNotes, setClosureNotes] = useState('');
  const fnd = activeFinding;

  // Preconditions evaluation
  const isReviewed = true;
  const isResponseReceived = fnd.mineResponse?.status === 'Submitted';
  const isActionIssued = !!fnd.regulatoryActionType;
  const isCapaVerified = fnd.capaHandoff?.status === 'Verified' || fnd.capaHandoff?.status === 'Closed';

  const canClose = isReviewed && isResponseReceived && isActionIssued && isCapaVerified;

  const handleAttemptClose = (e: React.FormEvent) => {
    e.preventDefault();
    const success = closeFinding(fnd.id, closureNotes);
    if (success) {
      navigateTo('02');
    }
  };

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
              <span>Back to Finding</span>
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
              FINDING RESOLUTION & CLOSURE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY RESOLUTION & PRECONDITION VALIDATION
          </h1>
          <p className="screen-subtitle">
            Enforces strict statutory closure gates preventing finding dismissal until downstream CAPA verification in Workspace 06 is certified
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: canClose ? '#E8F5E9' : '#FFEBEE',
            border: `1px solid ${canClose ? '#C8E6C9' : '#FFCDD2'}`,
            borderRadius: '6px',
            color: canClose ? '#2E7D32' : '#C62828',
            fontSize: '12px',
            fontWeight: 700
          }}
        >
          <Lock size={14} />
          <span>{canClose ? 'Eligible for Statutory Closure' : 'Closure Gate Locked: Pending Actions'}</span>
        </div>
      </div>

      {/* Main Resolution Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Precondition Gates Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Current State Summary */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Current Downstream State Breakdown
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Finding Status</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A237E', marginTop: '2px' }}>
                  ✓ CONFIRMED
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Regulatory Action</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#2E7D32', marginTop: '2px' }}>
                  ✓ COMPLETED
                </div>
              </div>

              <div style={{ background: '#FFF3E0', padding: '12px', borderRadius: '6px', border: '1px solid #FFE0B2' }}>
                <div style={{ fontSize: '11px', color: '#E65100' }}>CAPA Verification</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#E65100', marginTop: '2px' }}>
                  ⚡ IN PROGRESS (60%)
                </div>
              </div>
            </div>
          </div>

          {/* Closure Preconditions Gate List */}
          <div className="card" style={{ padding: '20px', borderLeft: '4px solid #1A237E' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E' }}>
              Mandatory Statutory Closure Preconditions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Gate 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', background: '#E8F5E9', borderRadius: '6px' }}>
                <CheckCircle2 size={18} color="#2E7D32" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#1B5E20', fontSize: '13px' }}>
                    Gate 1: Finding Formally Reviewed & Confirmed
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#2E7D32' }}>
                    Reviewed by Authorized Statutory Reviewer Er. P. C. Joshi on 16 Nov 2026.
                  </div>
                </div>
              </div>

              {/* Gate 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', background: '#E8F5E9', borderRadius: '6px' }}>
                <CheckCircle2 size={18} color="#2E7D32" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#1B5E20', fontSize: '13px' }}>
                    Gate 2: Official Mine Management Response Received
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#2E7D32' }}>
                    Submitted by Er. A. K. Verma (Mine Manager) with signed commitment memo.
                  </div>
                </div>
              </div>

              {/* Gate 3 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', background: '#E8F5E9', borderRadius: '6px' }}>
                <CheckCircle2 size={18} color="#2E7D32" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#1B5E20', fontSize: '13px' }}>
                    Gate 3: Required Regulatory Action & Direction Issued
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#2E7D32' }}>
                    Formal direction NOTICE-2026-0021 generated and acknowledged.
                  </div>
                </div>
              </div>

              {/* Gate 4 (Blocking Gate) */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', background: '#FFEBEE', borderRadius: '6px', border: '1px solid #FFCDD2' }}>
                <XCircle size={18} color="#D32F2F" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#B71C1C', fontSize: '13px' }}>
                    Gate 4: Independent CAPA Verification (BLOCKING)
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#C62828', lineHeight: 1.4 }}>
                    CAPA-2026-0048 is at 60% progress. Physical on-site verification traverse by DGMS Panel Auditor Er. T. Bannerjee is scheduled for 30 Nov 2026.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Closure Execution Form & Block Banner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #1A237E' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E' }}>
              Statutory Closure Authorization
            </h3>

            {canClose ? (
              <form onSubmit={handleAttemptClose}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Statutory Closure Remarks & Sealing Notes *
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={closureNotes}
                    onChange={e => setClosureNotes(e.target.value)}
                    required
                    style={{ height: 'auto' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', background: '#2E7D32', borderColor: '#1B5E20', justifyContent: 'center' }}
                >
                  <CheckCircle2 size={14} />
                  <span>Formally Close & Seal Finding</span>
                </button>
              </form>
            ) : (
              <div>
                <div
                  style={{
                    background: '#FFEBEE',
                    border: '1px solid #FFCDD2',
                    borderRadius: '6px',
                    padding: '14px',
                    marginBottom: '16px',
                    fontSize: '12.5px',
                    color: '#B71C1C',
                    lineHeight: 1.4
                  }}
                >
                  <strong>Closure Guard Enforced:</strong> Finding cannot be closed because independent statutory verification in Workspace 06 is still pending.
                </div>

                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled
                  style={{ width: '100%', justifyContent: 'center', opacity: 0.6, cursor: 'not-allowed' }}
                >
                  <Lock size={14} />
                  <span>Close Finding (Locked by Preconditions)</span>
                </button>

                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigateTo('13')}
                    style={{ fontSize: '11.5px' }}
                  >
                    <span>View Action Tracker &rarr;</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
