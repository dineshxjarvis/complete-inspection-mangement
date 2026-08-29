"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { AlertTriangle } from 'lucide-react';

export const Screen11ConflictResolution: React.FC = () => {
  const { screenParams, navigateTo, showToast } = useStrata();
  const planId = screenParams.planId || 'PLAN-2026-0088';

  const selectAlternative = (date: string, time: string) => {
    showToast(`Conflict resolved! Slot allocated for ${date} at ${time}.`, 'success');
    navigateTo('14', { inspectionId: 'INS-2026-0882' });
  };

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('09')}>Planning Calendar</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('10', { planId })}>Schedule</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Scheduling Conflict</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title" style={{ color: 'var(--status-red-text)' }}>
            <AlertTriangle size={20} />
            Scheduling Conflict Resolution
          </h1>
          <p className="screen-subtitle">
            Conflict type: <strong>Operational Restriction & Substation Isolation Overlap</strong>
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        
        {/* Target Plan */}
        <div className="enterprise-card" style={{ borderColor: 'var(--purple-border)', marginBottom: 0 }}>
          <div className="card-header" style={{ background: 'var(--purple-light)' }}>
            <span className="card-title" style={{ color: 'var(--purple-primary)' }}>CURRENT TARGET PLAN</span>
            <span className="badge badge-planned font-mono">{planId}</span>
          </div>
          <div className="card-body" style={{ fontSize: '12px' }}>
            <div style={{ marginBottom: '6px' }}><strong>Type:</strong> Ventilation & Gas Dynamics Inspection</div>
            <div style={{ marginBottom: '6px' }}><strong>Mine:</strong> Mine A2 (Seam VII)</div>
            <div style={{ marginBottom: '6px' }}><strong>Target Slot:</strong> <span className="font-mono">15 Nov 2026 (09:00 – 15:00 IST)</span></div>
            <div><strong>Requirement:</strong> Requires full auxiliary ventilation fan operation and airway access.</div>
          </div>
        </div>

        {/* Conflicting Event */}
        <div className="enterprise-card" style={{ borderColor: 'var(--status-red-border)', marginBottom: 0 }}>
          <div className="card-header" style={{ background: 'var(--status-red-bg)' }}>
            <span className="card-title" style={{ color: 'var(--status-red-text)' }}>CONFLICTING EVENT</span>
            <span className="badge badge-high font-mono">INS-2026-0782</span>
          </div>
          <div className="card-body" style={{ fontSize: '12px' }}>
            <div style={{ marginBottom: '6px' }}><strong>Type:</strong> Electrical Flameproof (FLP) High-Voltage Audit</div>
            <div style={{ marginBottom: '6px' }}><strong>Mine:</strong> Mine A2 Substation 3 & Fan Feeders</div>
            <div style={{ marginBottom: '6px' }}><strong>Slot:</strong> <span className="font-mono">15 Nov 2026 (10:00 – 13:00 IST)</span></div>
            <div style={{ color: 'var(--status-red-text)' }}>
              <strong>Conflict Reason:</strong> High-voltage power shutdown to Section 2 substations prevents mandatory mechanical ventilation survey simultaneously.
            </div>
          </div>
        </div>

      </div>

      {/* Suggested Alternatives */}
      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">System-Calculated Non-Conflicting Alternative Windows</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-alt)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '4px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-approved">Option 1 (Recommended)</span>
                  <strong className="font-mono" style={{ fontSize: '13px' }}>15 Nov 2026 &bull; 14:00 – 20:00 IST</strong>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Afternoon Shift window immediately following completion of Substation 3 high-voltage energization.
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => selectAlternative('2026-11-15', '14:00')}>Select Option 1</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-alt)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '4px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-draft">Option 2</span>
                  <strong className="font-mono" style={{ fontSize: '13px' }}>16 Nov 2026 &bull; 10:00 – 16:00 IST</strong>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Next working day &bull; Full unobstructed Morning Shift A window with full colliery team available.
                </div>
              </div>
              <button className="btn btn-secondary" onClick={() => selectAlternative('2026-11-16', '10:00')}>Select Option 2</button>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <button className="btn btn-secondary" onClick={() => navigateTo('08', { planId })}>Cancel</button>
        <button className="btn btn-primary" onClick={() => navigateTo('10', { planId })}>Custom Reschedule &rarr;</button>
      </div>

    </div>
  );
};
