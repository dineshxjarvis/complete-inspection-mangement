"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  Users,
  AlertTriangle,
  GitMerge,
  Clock,
  CheckCircle,
  Eye,
  Camera,
  Gauge,
  ArrowLeft,
  Shield,
  Activity
} from 'lucide-react';

export const Screen15TeamActivity: React.FC = () => {
  const {
    activeInspection,
    teamActivities,
    navigateTo,
    hasConcurrentConflict,
    setHasConcurrentConflict,
    showToast
  } = useFieldInspection();

  const handleSimulateConflict = () => {
    setHasConcurrentConflict(true);
    showToast('Concurrent merge conflict simulated on REQ-VENT-014', 'warning');
  };

  return (
    <div className="screen-content" style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-info">2 ACTIVE SPECIALISTS</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            CONCURRENT TEAM ACTIVITY & COLLABORATION
          </h1>
          <p className="screen-subtitle">
            Real-time multi-inspector synchronization, section ownership, and merge conflict resolution
          </p>
        </div>

        <button className="btn btn-secondary" onClick={() => navigateTo('06')}>
          <ArrowLeft size={14} />
          <span>Execution Overview</span>
        </button>
      </div>

      {/* Concurrent Conflict Warning Banner */}
      <div
        className="card"
        style={{
          background: hasConcurrentConflict ? 'var(--status-red-bg)' : 'var(--bg-surface-alt)',
          borderLeft: `4px solid ${hasConcurrentConflict ? '#D32F2F' : '#5932A5'}`,
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertTriangle size={22} color={hasConcurrentConflict ? '#D32F2F' : '#5932A5'} />
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: hasConcurrentConflict ? '#B71C1C' : 'var(--text-primary)' }}>
              {hasConcurrentConflict ? 'CONFLICT DETECTED: Concurrent Edits on REQ-VENT-014' : 'Real-Time Operational Concurrency: Active'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {hasConcurrentConflict ? 'Two specialists updated the same check record simultaneously. Review and choose the master version.' : 'Edits from R. Sharma and K. Rao are automatically partitioned by technical domain.'}
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={handleSimulateConflict}
          style={{
            background: hasConcurrentConflict ? '#D32F2F' : '#5932A5',
            borderColor: hasConcurrentConflict ? '#D32F2F' : '#5932A5',
            fontSize: '11.5px'
          }}
        >
          {hasConcurrentConflict ? 'Resolve Conflict Modal' : 'Simulate Concurrency Conflict'}
        </button>
      </div>

      {/* Team Composition Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        {activeInspection.team.map(m => (
          <div key={m.id} className="card" style={{ padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: m.role.includes('Lead') ? '#E65100' : '#311B92',
                color: '#FFF',
                fontWeight: 700,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {m.avatar}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 700 }}>{m.name}</span>
                <span className="badge badge-success">● {m.status}</span>
              </div>
              <div style={{ fontSize: '11.5px', color: '#FF6B00', fontWeight: 600 }}>{m.role}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Assigned: <strong>{m.assignedSection}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Activity Stream */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', background: 'var(--bg-surface-alt)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={16} color="#FF6B00" />
            <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700 }}>
              LIVE MULTI-SPECIALIST ACTIVITY LOG
            </h3>
          </div>
          <span className="badge badge-subtle">Real-Time WebSocket Feed</span>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {teamActivities.map(act => (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '10px 14px',
                background: 'var(--bg-surface-subtle)',
                borderRadius: '6px',
                borderLeft: `3px solid ${act.userRole.includes('Lead') ? '#FF6B00' : '#5932A5'}`
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: act.userRole.includes('Lead') ? '#E65100' : '#311B92',
                  color: '#FFF',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {act.userAvatar}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px' }}>
                  <strong>{act.userName}</strong> ({act.userRole}) {act.action} <strong>{act.target}</strong>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={11} /> {act.timestamp} &bull; Verified in District 4
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
