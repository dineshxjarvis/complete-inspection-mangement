"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { Radio } from 'lucide-react';

export const Screen15ActiveMonitoring: React.FC = () => {
  const { data, navigateTo, openDrawer, showToast } = useStrata();
  const ins = data.inspections.find(i => i.id === 'INS-2026-0870') || data.inspections[1];

  const handleOpenTelemetryDrawer = () => {
    openDrawer(
      `Live Field Telemetry: ${ins.id}`,
      <div>
        <div style={{ background: '#E8F5E9', border: '1px solid #C8E6C9', padding: '10px 12px', borderRadius: '4px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ color: '#1B5E20', fontSize: '12px' }}>● Live Uplink: Online</strong>
            <span className="font-mono" style={{ fontSize: '10px', color: '#2E7D32' }}>Gateway: Substation Wi-Fi #04</span>
          </div>
          <div style={{ fontSize: '11px', color: '#1B5E20', marginTop: '2px' }}>Last Heartbeat: 12 seconds ago</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
          <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '3px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>FIELD TABLET BATTERY</div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>84% &bull; Intrinsically Safe (Group I)</div>
          </div>
          <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '3px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>OFFLINE QUEUED CHECKS</div>
            <div style={{ fontWeight: 600, fontSize: '13px' }}>0 Pending (All Synced)</div>
          </div>
          <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '3px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>GPS / UNDERGROUND BEACON</div>
            <div className="font-mono" style={{ fontWeight: 600, fontSize: '11.5px' }}>Mine A2 Seam VII &bull; Junction J-14</div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => showToast('Telemetry packet refresh triggered', 'success')}>
            Force Sync Heartbeat
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Active Inspections Monitoring</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Radio size={20} color="#10B981" />
            Live Field Inspections Monitoring
          </h1>
          <p className="screen-subtitle">
            Read-only supervisor telemetry feed observing active underground field executions.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={handleOpenTelemetryDrawer}>
            Open Live Telemetry Drawer &rarr;
          </button>
        </div>
      </div>

      <div className="enterprise-card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong className="font-mono" style={{ color: 'var(--purple-primary)', fontSize: '14px' }}>{ins.id}</strong>
            <span style={{ fontWeight: 700 }}>{ins.title}</span>
          </div>
          <span className="badge badge-in-progress"><span className="badge-dot" />Underway in Field</span>
        </div>
        <div className="card-body">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '18px' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>LEAD INSPECTOR</div>
              <strong>{ins.team.leadInspector}</strong>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>MINE & SECTION</div>
              <div>{ins.scopeDetails.mine.split('(')[0]} &bull; {ins.scopeDetails.districts}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SHIFT / STARTED</div>
              <div>Shift A (Started 08:30 IST)</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SYNC HEARTBEAT</div>
              <div style={{ color: 'var(--status-green-text)', fontWeight: 600 }}>{ins.monitoring?.lastSync}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
              <span>Execution Progress: <strong>{ins.monitoring?.completedChecks} Checks Completed</strong></span>
              <span className="font-mono" style={{ fontWeight: 700, color: 'var(--purple-primary)' }}>{ins.monitoring?.activeProgress}%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${ins.monitoring?.activeProgress}%` }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '10px 12px', borderRadius: '3px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>EVIDENCE COLLECTED</div>
              <div className="font-mono" style={{ fontSize: '18px', fontWeight: 700 }}>{ins.monitoring?.evidenceCollected} Photos / Logs</div>
            </div>
            <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', padding: '10px 12px', borderRadius: '3px' }}>
              <div style={{ fontSize: '10px', color: '#B78103', fontWeight: 700 }}>FINDINGS LOGGED IN FIELD</div>
              <div className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: '#E65100' }}>{ins.monitoring?.findingsLogged} Proposed</div>
            </div>
            <div style={{ background: '#E8F5E9', border: '1px solid #C8E6C9', padding: '10px 12px', borderRadius: '3px' }}>
              <div style={{ fontSize: '10px', color: '#1B5E20', fontWeight: 700 }}>FIELD TABLET UPLINK</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1B5E20' }}>{ins.monitoring?.syncStatus}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Live Activity Stream */}
      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">Live Field Event Feed (Read-Only)</span>
        </div>
        <div className="card-body">
          <div className="audit-timeline">
            {ins.activity.map((a, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-header">
                  <span className="timeline-user">{a.user}</span>
                  <span className="font-mono timestamp">{a.time}</span>
                </div>
                <div className="timeline-action">{a.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
