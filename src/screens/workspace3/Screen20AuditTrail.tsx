"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  History,
  Clock,
  User,
  Shield,
  MapPin,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  AlertOctagon,
  Camera,
  ArrowLeft
} from 'lucide-react';

export const Screen20AuditTrail: React.FC = () => {
  const { activeInspection, auditTrail, navigateTo } = useFieldInspection();

  const getEventIcon = (action: string) => {
    if (action.includes('Started')) return <PlayCircle size={15} color="#2E7D32" />;
    if (action.includes('Paused')) return <PauseCircle size={15} color="#F57C00" />;
    if (action.includes('Resumed')) return <PlayCircle size={15} color="#2E7D32" />;
    if (action.includes('Finding')) return <AlertOctagon size={15} color="#D32F2F" />;
    if (action.includes('Evidence')) return <Camera size={15} color="#1976D2" />;
    if (action.includes('Submitted')) return <CheckCircle size={15} color="#2E7D32" />;
    return <Clock size={15} color="#5932A5" />;
  };

  return (
    <div className="screen-content" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-info">IMMUTABLE TIME-STAMPED LOG</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            FIELD INSPECTION AUDIT TRAIL & EVENT STREAM
          </h1>
          <p className="screen-subtitle">
            Cryptographically sealed chronological ledger of all actions, state transitions, GPS logs & evidence timestamps
          </p>
        </div>

        <button className="btn btn-secondary" onClick={() => navigateTo('02')}>
          <ArrowLeft size={14} />
          <span>My Inspections</span>
        </button>
      </div>

      {/* Chronological Event Stream */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', background: 'var(--bg-surface-alt)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700 }}>
            VERIFIED EVENT STREAM ({auditTrail.length} EVENTS)
          </h3>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            All entries digitally signed with inspector key
          </span>
        </div>

        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {auditTrail.map((ev, idx) => (
            <div
              key={ev.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                position: 'relative'
              }}
            >
              {/* Timeline dot & icon */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 2
                }}
              >
                {getEventIcon(ev.action)}
              </div>

              {/* Event Content Box */}
              <div
                style={{
                  flex: 1,
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '12px 16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {ev.action}
                  </div>
                  <span className="timestamp font-mono" style={{ fontSize: '11.5px', fontWeight: 700, color: '#5932A5' }}>
                    {ev.timeStr}
                  </span>
                </div>

                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {ev.details}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px', paddingTop: '6px', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <div>Actor: <strong>{ev.actor}</strong> ({ev.role})</div>
                  {ev.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <MapPin size={11} color="#FF6B00" />
                      <span>{ev.location}</span>
                    </div>
                  )}
                  {ev.previousState && ev.newState && (
                    <div>State: <span className="badge badge-subtle">{ev.previousState}</span> &rarr; <span className="badge badge-info">{ev.newState}</span></div>
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
