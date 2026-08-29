"use client";

import React, { useState } from 'react';
import { useStrata } from '../context/StrataContext';
import { AlertTriangle } from 'lucide-react';

export const Screen10Schedule: React.FC = () => {
  const { data, screenParams, navigateTo, scheduleInspection, showToast } = useStrata();

  const planId = screenParams.planId || 'PLAN-2026-0088';
  const plan = data.inspectionPlans.find(p => p.id === planId) || data.inspectionPlans[0];

  const [date, setDate] = useState('2026-11-15');
  const [time, setTime] = useState('09:00 - 15:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleInspection(plan.id, date, time);
  };

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('06')}>Inspection Plans</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('08', { planId: plan.id })}>{plan.id}</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Schedule Inspection</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            Schedule Inspection: <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{plan.id}</span>
          </h1>
          <p className="screen-subtitle">
            Allocate time window, underground location access, verify shift capacity, and run real-time conflict validation.
          </p>
        </div>
      </div>

      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">Inspection Target Parameters</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '11.5px' }}>
            <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>MINE</div><strong>{plan.mine}</strong></div>
            <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>INSPECTION TYPE</div><strong>{plan.inspectionType}</strong></div>
            <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>RISK LEVEL</div><span className="badge badge-high">{plan.risk}</span></div>
            <div><div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>ESTIMATED DURATION</div><strong>{plan.plannedDuration}</strong></div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        
        <div className="enterprise-card">
          <div className="card-header">
            <span className="card-title">Date, Time Slot & Operational Location</span>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">Execution Date</label>
                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label required">Operating Shift</label>
                <select className="form-control">
                  <option>Morning Shift A (08:00 - 16:00)</option>
                  <option>Afternoon Shift B (16:00 - 00:00)</option>
                  <option>General Day Maintenance Window</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">Start Time</label>
                <input type="time" className="form-control" defaultValue="09:00" required />
              </div>
              <div className="form-group">
                <label className="form-label required">End Time</label>
                <input type="time" className="form-control" defaultValue="15:00" required />
              </div>
              <div className="form-group full-width">
                <label className="form-label required">Underground & Surface Location Scope</label>
                <input type="text" className="form-control" defaultValue="Mine A2 Underground Seam VII & Surface Main Fan Complex" required />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Team Competency Requirements (Workspace 02 Handoff note) */}
        <div className="enterprise-card">
          <div className="card-header">
            <span className="card-title">Inspection Team Competency Requirements</span>
            <span className="badge badge-draft">Assignment belongs to Workspace 02</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '3px' }}>
                <span>Lead Inspector (First Class Mine Manager Certificate)</span>
                <span className="badge badge-critical">Required</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '3px' }}>
                <span>DGMS Certified Ventilation Officer</span>
                <span className="badge badge-critical">Required</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '3px' }}>
                <span>Electrical Specialist</span>
                <span className="badge badge-draft">Optional</span>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
              &bull; Final inspector names and field roster assignments will be locked in Workspace 02.
            </div>
          </div>
        </div>

        {/* Section 6: Scheduling Validation & Conflict Detector */}
        <div className="enterprise-card">
          <div className="card-header">
            <span className="card-title">
              <AlertTriangle size={15} color="var(--status-orange-text)" />
              Scheduling Validation & Conflict Detection
            </span>
          </div>
          <div className="card-body">
            <div style={{ background: '#FFF3E0', border: '1px solid #FFE0B2', padding: '12px', borderRadius: '4px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#B78103', fontSize: '12.5px' }}>&excl; Potential High-Voltage Substation Conflict Detected</strong>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => navigateTo('11', { planId: plan.id })}>
                  View Conflict Resolution (Screen 11)
                </button>
              </div>
              <div style={{ fontSize: '11.5px', color: '#5D4037', marginTop: '4px' }}>
                Conflicting event: <strong>INS-2026-0782 (Electrical FLP Isolation Test)</strong> in Mine A2 on 15 Nov (10:00 - 13:00).
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              <div>&check; Mine operational clearance verified</div>
              <div>&check; Required 6-hour duration fits within Shift A</div>
              <div>&check; Authority scope matches authorized ECL jurisdiction</div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '30px' }}>
          <button type="button" className="btn btn-secondary" onClick={() => navigateTo('08', { planId: plan.id })}>Back to Plan</button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => { showToast('Schedule draft saved', 'success'); navigateTo('08', { planId: plan.id }); }}>Save Draft</button>
            <button type="submit" className="btn btn-primary">Schedule Inspection &rarr;</button>
          </div>
        </div>

      </form>
    </div>
  );
};
