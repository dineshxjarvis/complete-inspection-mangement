"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  Shield,
  Layers,
  CheckSquare,
  Activity,
  History
} from 'lucide-react';

export const Screen13ActionTracker: React.FC = () => {
  const {
    activeFinding,
    navigateTo,
    showToast
  } = useRegulatoryAction();

  const fnd = activeFinding;

  const timelineSteps = [
    { label: 'Finding Confirmed', date: '16 Nov 2026 10:45 IST', status: 'completed', actor: 'Er. P. C. Joshi (Reviewer)' },
    { label: 'Mine Notified (Notice Issued)', date: '16 Nov 2026 11:00 IST', status: 'completed', actor: 'STRATA Gateway' },
    { label: 'Mine Response Submitted', date: '16 Nov 2026 14:20 IST', status: 'completed', actor: 'Er. A. K. Verma (Mine Mgr)' },
    { label: 'CAPA Created (CAPA-2026-0048)', date: '17 Nov 2026 09:30 IST', status: 'completed', actor: 'Ventilation Dept' },
    { label: 'Action Assigned to Chief Engineer', date: '17 Nov 2026 10:00 IST', status: 'completed', actor: 'Er. S. K. Mahapatra' },
    { label: 'Action In Progress (60% Progress)', date: '22 Nov 2026 16:00 IST', status: 'current', actor: 'Ventilation Maintenance Crew' },
    { label: 'Remediation Evidence Submission', date: 'Target: 28 Nov 2026', status: 'pending', actor: 'Mine A2 Management' },
    { label: 'Independent Verification (WS06)', date: 'Scheduled: 30 Nov 2026', status: 'pending', actor: 'DGMS Panel Verifier' },
    { label: 'Statutory Finding Closure', date: 'Pending Verification', status: 'pending', actor: 'Authorized Reviewer' }
  ];

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
              ACTION TRACKER & TIMELINE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY COMPLIANCE & CAPA PROGRESSION TRACKER
          </h1>
          <p className="screen-subtitle">
            Lifecycle monitoring establishing clear boundaries between Finding, Response, CAPA execution, and Independent Verification
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigateTo('17')}
        >
          <span>Resolution Preconditions (Screen 17)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* CORE DIFFERENTIATOR: 4 DISTINCT STATUS BADGES */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)',
          border: '1px solid #9FA8DA'
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#1A237E', textTransform: 'uppercase', marginBottom: '10px' }}>
          STRATA GOVERNANCE STATE SEPARATION (FINDING &ne; RESPONSE &ne; CAPA &ne; VERIFICATION)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid #C5CAE9' }}>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 700 }}>1. FINDING STATUS</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A237E', marginTop: '2px' }}>
              ✓ CONFIRMED
            </div>
          </div>

          <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid #C8E6C9' }}>
            <div style={{ fontSize: '10.5px', color: '#2E7D32', fontWeight: 700 }}>2. MINE RESPONSE</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#2E7D32', marginTop: '2px' }}>
              ✓ SUBMITTED (v2)
            </div>
          </div>

          <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid #FFE082' }}>
            <div style={{ fontSize: '10.5px', color: '#E65100', fontWeight: 700 }}>3. CAPA EXECUTION</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#E65100', marginTop: '2px' }}>
              ⚡ IN PROGRESS (60%)
            </div>
          </div>

          <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid #FFCDD2' }}>
            <div style={{ fontSize: '10.5px', color: '#D32F2F', fontWeight: 700 }}>4. VERIFICATION</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>
              ⏳ PENDING (WS06)
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE PROGRESSION CARD */}
      <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '16px' }}>
          END-TO-END STATUTORY LIFECYCLE TIMELINE
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
          {timelineSteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isLast = idx === timelineSteps.length - 1;

            return (
              <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                {/* Vertical Connector Line */}
                {!isLast && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '13px',
                      top: '26px',
                      bottom: '-6px',
                      width: '2px',
                      backgroundColor: isCompleted ? '#2E7D32' : '#E0E0E0',
                      zIndex: 1
                    }}
                  />
                )}

                {/* Node Icon */}
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isCompleted ? '#2E7D32' : isCurrent ? '#1A237E' : '#ECEFF1',
                    color: isCompleted || isCurrent ? '#FFF' : '#78909C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '11px',
                    zIndex: 2,
                    boxShadow: isCurrent ? '0 0 8px rgba(26, 35, 126, 0.4)' : 'none'
                  }}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>

                {/* Step Content */}
                <div style={{ flex: 1, paddingBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: isCurrent ? '#1A237E' : 'var(--text-primary)' }}>
                      {step.label}
                    </span>
                    {isCurrent && (
                      <span className="badge badge-warning font-bold" style={{ fontSize: '10px' }}>
                        CURRENT ACTIVE STAGE
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {step.date} &bull; Actor: <strong>{step.actor}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
