"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  History,
  ChevronLeft,
  User,
  Clock,
  ArrowRight,
  Shield,
  Lock,
  GitBranch
} from 'lucide-react';

export const Screen14FindingHistory: React.FC = () => {
  const {
    activeFinding,
    navigateTo,
    showToast
  } = useRegulatoryAction();

  const historyEvents = [
    {
      action: 'Verification Requested in Workspace 06',
      actor: 'Er. S. K. Mahapatra',
      role: 'Chief Ventilation Engineer',
      timestamp: '26 Nov 2026 11:30 IST',
      prevState: 'CAPA In Progress (60%)',
      newState: 'Independent Verification Queued',
      reason: 'Fan pitch recalibration and louvre descaling completed; preliminary test achieved 5.8 m/s.',
      source: 'Mine Management Portal'
    },
    {
      action: 'Remediation Evidence Pack Uploaded',
      actor: 'Er. A. K. Verma',
      role: 'Mine Manager',
      timestamp: '25 Nov 2026 15:45 IST',
      prevState: 'Evidence Awaiting',
      newState: 'Evidence Attached (2 Files)',
      reason: 'Uploaded anemometer test sheet and engineering modification drawing.',
      source: 'STRATA Evidence Vault'
    },
    {
      action: 'Corrective Action Assigned to Chief Engineer',
      actor: 'Er. A. K. Verma',
      role: 'Mine Manager',
      timestamp: '17 Nov 2026 10:00 IST',
      prevState: 'CAPA Created',
      newState: 'Assigned to Ventilation Dept',
      reason: 'Work order #WO-VENT-2026-88 issued for Shaft 3 maintenance.',
      source: 'Mine Operations ERP'
    },
    {
      action: 'CAPA Created & Handed Off (CAPA-2026-0048)',
      actor: 'Er. P. C. Joshi',
      role: 'Statutory Reviewer',
      timestamp: '17 Nov 2026 09:30 IST',
      prevState: 'CAPA Decision Pending',
      newState: 'CAPA Created',
      reason: 'Mandatory 4-stage CAPA plan registered under CMR 2017 Reg 153.',
      source: 'Workspace 05 Governance Engine'
    },
    {
      action: 'Mine Response Formally Submitted',
      actor: 'Er. A. K. Verma',
      role: 'Mine Manager',
      timestamp: '16 Nov 2026 14:20 IST',
      prevState: 'Notice Delivered / Pending Response',
      newState: 'Response Submitted (v2)',
      reason: 'Mine committed to full aerodynamic overhaul before 30 Nov 2026.',
      source: 'Mine Manager Portal'
    },
    {
      action: 'Statutory Finding Confirmed',
      actor: 'Er. P. C. Joshi',
      role: 'Statutory Reviewer & DGMS Liaison',
      timestamp: '16 Nov 2026 10:45 IST',
      prevState: 'Proposed Finding (Field Review)',
      newState: 'Confirmed Statutory Finding',
      reason: 'Validated anemometer calibration and 4.8 m/s physical measurement logs.',
      source: 'DGMS Review Cell'
    },
    {
      action: 'Finding Proposed from Field Audit',
      actor: 'R. Sharma',
      role: 'Lead Field Inspector',
      timestamp: '15 Nov 2026 14:30 IST',
      prevState: 'Inspection In Progress',
      newState: 'Proposed Finding Logged',
      reason: 'Airflow velocity 4.8 m/s recorded during underground traverse at Shaft 3.',
      source: 'Workspace 03 Field Inspection'
    }
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
              STATUTORY FINDING HISTORY
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CHRONOLOGICAL EVENT DOSSIER &bull; {activeFinding.id}
          </h1>
          <p className="screen-subtitle">
            Immutable, cryptographically chained audit timeline tracking every transition from field proposal to independent verification
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: '#E8EAF6',
            border: '1px solid #C5CAE9',
            borderRadius: '6px',
            color: '#1A237E',
            fontSize: '12px',
            fontWeight: 600
          }}
        >
          <Lock size={14} color="#303F9F" />
          <span>Tamper-Proof Audit Chain</span>
        </div>
      </div>

      {/* History Events List */}
      <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {historyEvents.map((evt, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                background: 'var(--bg-surface-alt)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      background: '#1A237E',
                      color: '#FFF',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    STEP 0{historyEvents.length - idx}
                  </span>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {evt.action}
                  </span>
                </div>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {evt.timestamp}
                </span>
              </div>

              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <strong>Reason / Notes:</strong> {evt.reason}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-light)', fontSize: '11.5px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Actor: </span>
                  <strong>{evt.actor}</strong> ({evt.role})
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>State Shift: </span>
                  <code>{evt.prevState}</code> &rarr; <code style={{ color: '#1A237E' }}>{evt.newState}</code>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Source: </span>
                  <strong>{evt.source}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
