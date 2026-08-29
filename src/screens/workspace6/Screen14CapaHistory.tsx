"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  History,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  FileUp,
  RotateCcw,
  Send,
  ChevronLeft,
  Lock,
  Clock,
  User
} from 'lucide-react';

interface HistoryEvent {
  id: string;
  stage: string;
  actor: string;
  role: string;
  timestamp: string;
  oldState: string;
  newState: string;
  reason: string;
  evidenceRef?: string;
}

const EVENTS: HistoryEvent[] = [
  {
    id: 'EVT-01',
    stage: 'CAPA Created',
    actor: 'Er. P. C. Joshi',
    role: 'Statutory Reviewer / DGMS Liaison',
    timestamp: '17 Nov 2026 10:30 IST',
    oldState: 'Regulatory Action Issued',
    newState: 'CAPA Created',
    reason: 'Formal direction issued following field inspection INS-2026-0882 finding.'
  },
  {
    id: 'EVT-02',
    stage: 'Assigned to Action Owner',
    actor: 'Er. P. C. Joshi',
    role: 'Statutory Reviewer',
    timestamp: '17 Nov 2026 11:15 IST',
    oldState: 'CAPA Created',
    newState: 'Assigned',
    reason: 'Assigned to Chief Ventilation Engineer (Er. S. K. Mahapatra) with 30 Nov 2026 deadline.'
  },
  {
    id: 'EVT-03',
    stage: 'Action Accepted',
    actor: 'Er. S. K. Mahapatra',
    role: 'Chief Ventilation Engineer',
    timestamp: '18 Nov 2026 09:00 IST',
    oldState: 'Assigned',
    newState: 'In Progress (0%)',
    reason: 'Formulated 3-tier action plan and initiated Task 01 louvre inspection.'
  },
  {
    id: 'EVT-04',
    stage: 'Progress Updated',
    actor: 'Er. S. K. Mahapatra',
    role: 'Action Owner',
    timestamp: '22 Nov 2026 14:00 IST',
    oldState: '0%',
    newState: '40%',
    reason: 'Completed Task 01 fan inspection; mechanical crew deployed for descaling.'
  },
  {
    id: 'EVT-05',
    stage: 'Evidence Uploaded',
    actor: 'Er. S. K. Mahapatra',
    role: 'Action Owner',
    timestamp: '24 Nov 2026 16:30 IST',
    oldState: 'Missing',
    newState: 'Uploaded & Accepted',
    reason: 'Uploaded Louvre Overhaul & Repair Engineering Report.',
    evidenceRef: 'DOC-VENT-REPAIR-REPORT.pdf'
  },
  {
    id: 'EVT-06',
    stage: 'Evidence Uploaded',
    actor: 'M. K. Pandey',
    role: 'Foreman',
    timestamp: '25 Nov 2026 14:15 IST',
    oldState: 'Missing',
    newState: 'Uploaded & Accepted',
    reason: 'Uploaded photographic capture of realigned louvres at Shaft 3.',
    evidenceRef: 'PHOTO-LOUVRE-CLEARED.jpg'
  },
  {
    id: 'EVT-07',
    stage: 'Progress Updated',
    actor: 'Er. S. K. Mahapatra',
    role: 'Action Owner',
    timestamp: '25 Nov 2026 17:00 IST',
    oldState: '40%',
    newState: '60%',
    reason: 'Louvres descaled, fan linkages replaced; post-repair traverse measurement pending.'
  }
];

export const Screen14CapaHistory: React.FC = () => {
  const {
    activeCapa,
    navigateTo
  } = useCorrectiveAction();

  const capa = activeCapa;

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
              <span>Back to CAPA Details</span>
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
              CHRONOLOGICAL EVENT HISTORY
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            {capa.id} &bull; LIFECYCLE AUDIT TRAIL
          </h1>
          <p className="screen-subtitle">
            Immutable, sequential event timeline recording creation, task assignments, progress shifts, evidence submissions, and verifier remarks
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
          {EVENTS.map((evt, idx) => (
            <div
              key={evt.id}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '14px 16px',
                background: 'var(--bg-surface-alt)',
                borderRadius: '6px',
                borderLeft: '4px solid #00695C',
                border: '1px solid var(--border-color)',
                borderLeftWidth: '4px',
                borderLeftColor: '#00695C'
              }}
            >
              <div style={{ minWidth: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#00695C',
                    color: '#FFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {idx + 1}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {evt.stage}
                  </div>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {evt.timestamp}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Actor: <strong>{evt.actor}</strong> &bull; Role: <strong>{evt.role}</strong>
                </div>

                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '6px' }}>
                  "{evt.reason}"
                </div>

                <div style={{ display: 'flex', gap: '8px', fontSize: '11.5px' }}>
                  <span className="badge badge-subtle">Old: {evt.oldState}</span>
                  <span className="badge badge-info">New: {evt.newState}</span>
                  {evt.evidenceRef && (
                    <span className="badge badge-success">Ref: {evt.evidenceRef}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
