"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Bell,
  AlertTriangle,
  AlertOctagon,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  Send,
  CheckCircle2
} from 'lucide-react';

export const Screen29SeniorNotifications: React.FC = () => {
  const { alerts, navigateTo, showToast } = useOversight();

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('01')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Dashboard</span>
            </button>
            <span
              className="badge badge-danger font-bold"
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.04em'
              }}
            >
              HIGH-PRIORITY DIRECTIVE STREAM
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            SENIOR AUTHORITY OVERSIGHT & STATUTORY ALERTS
          </h1>
          <p className="screen-subtitle">
            Executive notifications queue requiring direct intervention, acknowledgment, or escalation
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('30')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Regulator Portal View (Screen 30)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Alerts Stream List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '30px' }}>
        {alerts.map(alt => (
          <div
            key={alt.id}
            className="card"
            style={{
              padding: '18px 20px',
              borderLeft: `4px solid ${alt.severity === 'CRITICAL' ? '#D32F2F' : '#EF6C00'}`,
              background: alt.severity === 'CRITICAL' ? '#FFFDFD' : '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`badge ${alt.severity === 'CRITICAL' ? 'badge-danger font-bold' : 'badge-warning font-bold'}`}>
                  {alt.severity}
                </span>
                <span className="badge badge-info">{alt.type}</span>
                <strong style={{ color: '#1E1B4B', fontSize: '13.5px' }}>{alt.mine}</strong>
              </div>

              <div style={{ fontSize: '11.5px', color: '#D32F2F', fontWeight: 700 }}>
                Deadline: {alt.deadline}
              </div>
            </div>

            <h3 style={{ margin: '0 0 6px', fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {alt.title}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'var(--bg-surface-alt)', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', marginBottom: '14px' }}>
              <div>Current Action Owner: <strong>{alt.currentOwner}</strong></div>
              <div>Required Statutory Action: <strong>{alt.requiredAction}</strong></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  showToast(`Acknowledged alert ${alt.id}`, 'info');
                }}
              >
                <CheckCircle2 size={12} />
                <span>Acknowledge</span>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  navigateTo('23');
                }}
                style={{ background: '#D97706', borderColor: '#B45309', color: '#FFF' }}
              >
                <Send size={12} />
                <span>Escalate &rarr;</span>
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigateTo(alt.targetScreen)}
                style={{ background: '#1E1B4B', borderColor: '#312E81' }}
              >
                <span>View Details &rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
