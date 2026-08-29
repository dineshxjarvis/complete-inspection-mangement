"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  Shield,
  Activity,
  CheckCircle2,
  Bell,
  Clock,
  FileText,
  UserCheck,
  Sparkles
} from 'lucide-react';

export const Screen17AuditActivity: React.FC = () => {
  const { historyEvents, navigateTo } = useAssignment();
  const [activeTab, setActiveTab] = useState<'activity' | 'versions' | 'notifications' | 'eligibility'>('activity');

  const lifecycleEvents = [
    { title: 'Inspection Scheduled & Dispatched from Workspace 01', time: '14 Nov 16:00 IST', user: 'System (Planning Engine)', desc: 'Inspection INS-2026-0882 scheduled for 15 Nov Shift A under CMR 2017 Reg 153.' },
    { title: 'Assignment Workflow Initiated in Workspace 02', time: '15 Nov 09:00 IST', user: 'S. K. Mukherjee (Coordinator)', desc: 'Requirement criteria extracted: Lead Inspector (First Class Manager) + Safety Specialist + Mechanical Specialist.' },
    { title: 'STRATA AI Recommendation Engine Executed', time: '15 Nov 09:10 IST', user: 'STRATA Algorithmic Engine', desc: 'R. Sharma matched 98% (Lead) & K. Rao matched 94% (Specialist). Zero double-booking detected.' },
    { title: 'Authorized Coordinator Selected R. Sharma as Lead', time: '15 Nov 09:12 IST', user: 'S. K. Mukherjee (Coordinator)', desc: 'Delegation of statutory authority confirmed under DGMS-FCM-8821.' },
    { title: 'K. Rao Attached as Mechanical Specialist', time: '15 Nov 09:42 IST', user: 'S. K. Mukherjee (Coordinator)', desc: 'Specialist roster expanded for main ventilation fan drift audit.' },
    { title: 'Automated 8-Point Compliance Pre-Flight Checks Passed', time: '15 Nov 09:45 IST', user: 'STRATA Compliance Engine', desc: 'All statutory criteria (Competency, Scope, Availability, Workload threshold) verified green.' },
    { title: 'Assignment Formally Locked & Digital Token Issued', time: '15 Nov 09:46 IST', user: 'S. K. Mukherjee (Coordinator)', desc: 'Statutory team locked. Change audit history activated.' },
    { title: 'Dispatch Notification Sent to Lead & Specialist Devices', time: '15 Nov 09:47 IST', user: 'Notification Service', desc: 'Pre-Inspection Brief payload transmitted to mobile units.' },
    { title: 'Inspector R. Sharma Acknowledged & Accepted Assignment', time: '15 Nov 10:00 IST', user: 'R. Sharma (Lead Inspector)', desc: 'Pre-inspection briefing acknowledged. Ready for underground shift execution.' }
  ];

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Assignment Audit & Activity Ledger</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Shield size={20} color="var(--purple-primary)" />
            <span>Assignment Audit & Governance Activity Ledger</span>
          </h1>
          <p className="screen-subtitle">
            Statutory immutable lifecycle tracking and multi-stage compliance verification records.
          </p>
        </div>
      </div>

      {/* 4 Tabs */}
      <div className="tabs-nav" style={{ marginBottom: '16px' }}>
        <button
          className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          <Activity size={13} /> Activity Feed ({lifecycleEvents.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'versions' ? 'active' : ''}`}
          onClick={() => setActiveTab('versions')}
        >
          <FileText size={13} /> Assignment Versions (3)
        </button>
        <button
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={13} /> Dispatched Notifications (4)
        </button>
        <button
          className={`tab-btn ${activeTab === 'eligibility' ? 'active' : ''}`}
          onClick={() => setActiveTab('eligibility')}
        >
          <Sparkles size={13} /> Eligibility Checks Run (12)
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'activity' && (
        <div className="enterprise-card">
          <div className="card-header">
            <span className="card-title">Chronological Lifecycle Sequence (INS-2026-0882)</span>
            <span className="badge badge-completed">100% Traceable</span>
          </div>
          <div className="card-body">
            <div className="timeline-container">
              {lifecycleEvents.map((evt, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot" style={{ background: idx === lifecycleEvents.length - 1 ? '#16A34A' : 'var(--purple-primary)' }} />
                  <div className="timeline-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{evt.title}</strong>
                      <span className="font-mono timeline-date">{evt.time}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {evt.desc}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Actor: <strong>{evt.user}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'versions' && (
        <div className="enterprise-card">
          <div className="card-header"><span className="card-title">Immutable Assignment Version Snapshots</span></div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="strata-table">
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Timestamp</th>
                    <th>Lead Inspector</th>
                    <th>Specialists</th>
                    <th>Status</th>
                    <th>Authorized Modifier</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-mono">v1.2 (Current)</td>
                    <td className="font-mono">15 Nov 09:46 IST</td>
                    <td><strong>R. Sharma</strong></td>
                    <td>K. Rao (Mechanical)</td>
                    <td><span className="badge badge-completed">Locked</span></td>
                    <td>S. K. Mukherjee</td>
                  </tr>
                  <tr>
                    <td className="font-mono">v1.1</td>
                    <td className="font-mono">15 Nov 09:12 IST</td>
                    <td><strong>R. Sharma</strong></td>
                    <td>—</td>
                    <td><span className="badge badge-draft">Draft</span></td>
                    <td>S. K. Mukherjee</td>
                  </tr>
                  <tr>
                    <td className="font-mono">v1.0</td>
                    <td className="font-mono">14 Nov 16:00 IST</td>
                    <td>Pending Assignment</td>
                    <td>—</td>
                    <td><span className="badge badge-awaiting">Unassigned</span></td>
                    <td>System Automated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="enterprise-card">
          <div className="card-header"><span className="card-title">Statutory Dispatch Notifications Log</span></div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="strata-table">
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Channel</th>
                    <th>Subject / Content</th>
                    <th>Timestamp</th>
                    <th>Delivery Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>R. Sharma (Lead)</strong></td>
                    <td>Push Alert + SMS</td>
                    <td>Statutory Appointment: Lead for INS-2026-0882 (Mine A2)</td>
                    <td className="font-mono">15 Nov 09:47 IST</td>
                    <td><span className="badge badge-completed">Delivered & Read</span></td>
                  </tr>
                  <tr>
                    <td><strong>K. Rao (Specialist)</strong></td>
                    <td>Push Alert + SMS</td>
                    <td>Specialist Attachment: Mechanical Audit (Mine A2)</td>
                    <td className="font-mono">15 Nov 09:47 IST</td>
                    <td><span className="badge badge-completed">Delivered & Read</span></td>
                  </tr>
                  <tr>
                    <td><strong>Mine A2 Colliery Agent</strong></td>
                    <td>Email Notification</td>
                    <td>Notice of Impending Statutory Ventilation Survey</td>
                    <td className="font-mono">15 Nov 09:48 IST</td>
                    <td><span className="badge badge-completed">Acknowledged</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'eligibility' && (
        <div className="enterprise-card">
          <div className="card-header"><span className="card-title">Automated Eligibility Evaluation Runs</span></div>
          <div className="card-body" style={{ fontSize: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '10px 14px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <strong>Run #4812 — 15 Nov 09:45 IST</strong> &bull; Evaluation against INS-2026-0882:
                <div style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>
                  Evaluated 7 candidates &rarr; 2 fully eligible, 3 outside shift, 1 scope mismatch (Area 02), 1 double-booking conflict.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
