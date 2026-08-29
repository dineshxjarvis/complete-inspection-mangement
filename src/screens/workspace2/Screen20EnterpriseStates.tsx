"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  WifiOff,
  RefreshCw,
  Clock,
  UserX,
  Lock,
  ArrowRight,
  Info
} from 'lucide-react';

export const Screen20EnterpriseStates: React.FC = () => {
  const { navigateTo } = useAssignment();
  const [activeState, setActiveState] = useState('state-1');

  const states = [
    { id: 'state-1', name: '1. No Unassigned Inspections', category: 'Empty State', icon: CheckCircle2, color: '#16A34A' },
    { id: 'state-2', name: '2. No Eligible Inspectors', category: 'Eligibility Error', icon: UserX, color: '#DC2626' },
    { id: 'state-3', name: '3. No Available Specialist', category: 'Roster Gap', icon: AlertTriangle, color: '#D97706' },
    { id: 'state-4', name: '4. Assignment Conflict / Overlap', category: 'Clash Alert', icon: Clock, color: '#DC2626' },
    { id: 'state-5', name: '5. Outside Jurisdiction Scope', category: 'Boundary Violation', icon: ShieldAlert, color: '#B91C1C' },
    { id: 'state-6', name: '6. Insufficient Role Permission', category: 'Access Control', icon: Lock, color: '#4B5563' },
    { id: 'state-7', name: '7. Already Confirmed / Locked', category: 'Idempotency', icon: CheckCircle2, color: '#2563EB' },
    { id: 'state-8', name: '8. Concurrently Modified by Peer', category: 'Concurrency', icon: RefreshCw, color: '#7C3AED' },
    { id: 'state-9', name: '9. Offline / Underground Sync', category: 'Network Resilience', icon: WifiOff, color: '#EA580C' },
    { id: 'state-10', name: '10. Enterprise Loading Skeleton', category: 'Data Fetching', icon: RefreshCw, color: '#64748B' }
  ];

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">10 Enterprise States & Resilience Gallery</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Layers size={20} color="var(--purple-primary)" />
            <span>Workspace 02 &bull; 10 Enterprise Edge & Resilient States</span>
          </h1>
          <p className="screen-subtitle">
            Statutory edge cases, concurrency locks, permission boundaries, and zero-state handling for coal-mining operations.
          </p>
        </div>
      </div>

      {/* 2-Column Gallery Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px', marginBottom: '30px' }}>
        
        {/* Left: State Selector List */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">Select State Scenario</span>
          </div>
          <div className="card-body" style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {states.map((st) => {
              const Icon = st.icon;
              const isSelected = activeState === st.id;
              return (
                <div
                  key={st.id}
                  onClick={() => setActiveState(st.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: isSelected ? '#FAF8FF' : '#FFFFFF',
                    border: isSelected ? '1.5px solid var(--purple-primary)' : '1px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} color={st.color} />
                  <div>
                    <strong style={{ fontSize: '11.5px', color: isSelected ? 'var(--purple-primary)' : 'var(--text-primary)', display: 'block' }}>
                      {st.name}
                    </strong>
                    <span style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>{st.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive State Preview Canvas */}
        <div className="enterprise-card" style={{ marginBottom: 0, minHeight: '440px' }}>
          <div className="card-header">
            <span className="card-title">Interactive State Rendering & Operator Guidance</span>
            <span className="badge badge-draft font-mono">{activeState}</span>
          </div>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
            
            {/* STATE 1: No Unassigned Inspections */}
            {activeState === 'state-1' && (
              <div style={{ textAlign: 'center', maxWidth: '440px', padding: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px' }}>All Scheduled Inspections Fully Assigned</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  There are currently zero pending inspections in the assignment queue. All quarterly CMR 2017 schedules have appointed Lead Inspectors and verified specialists.
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('16')}>View Active Deployments</button>
                  <button className="btn btn-primary btn-sm" onClick={() => navigateTo('01')}>Return to Dashboard</button>
                </div>
              </div>
            )}

            {/* STATE 2: No Eligible Inspectors */}
            {activeState === 'state-2' && (
              <div style={{ textAlign: 'center', maxWidth: '460px', padding: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <UserX size={32} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#991B1B', margin: '0 0 6px' }}>No Eligible Personnel for Requested Criteria</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  No available personnel in Area 01 hold the required <strong>First Class Mine Manager Certification</strong> with current gas testing endorsements for this high-risk shaft survey.
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('15')}>Check Adjacent Area Matrix</button>
                  <button className="btn btn-primary btn-sm" onClick={() => navigateTo('19')}>Request Inter-Area Transfer</button>
                </div>
              </div>
            )}

            {/* STATE 3: No Available Specialist */}
            {activeState === 'state-3' && (
              <div style={{ textAlign: 'center', maxWidth: '460px', padding: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <AlertTriangle size={32} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#92400E', margin: '0 0 6px' }}>Required Specialist Currently Unavailable</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  The mandated <strong>Mechanical Main Fan Specialist</strong> is currently on statutory leave. An approved replacement from ECL Head Office is required before team validation can pass.
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => navigateTo('06', { role: 'Mechanical Specialist' })}>
                  Find Proxy Specialist &rarr;
                </button>
              </div>
            )}

            {/* STATE 4: Assignment Conflict */}
            {activeState === 'state-4' && (
              <div style={{ textAlign: 'center', maxWidth: '460px', padding: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Clock size={32} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#991B1B', margin: '0 0 6px' }}>Operational Double-Booking Conflict Detected</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  Selected inspector is scheduled on an overlapping underground audit in Mine B1 during 10:30 &ndash; 14:30 IST. Concurrent assignments are prohibited.
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => navigateTo('19')}>
                  Open Conflict Resolver (Screen 19) &rarr;
                </button>
              </div>
            )}

            {/* STATE 5: Outside Scope */}
            {activeState === 'state-5' && (
              <div style={{ textAlign: 'center', maxWidth: '460px', padding: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FEE2E2', color: '#B91C1C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <ShieldAlert size={32} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#7F1D1D', margin: '0 0 6px' }}>Jurisdictional Scope Boundary Violation</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  You cannot assign personnel outside your authorized organizational scope (Area 01 Sripur-Kenda). Personnel from Area 02 (Salanpur) require cross-area GM dispensation.
                </p>
                <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('06')}>Filter Within Area 01 Scope</button>
              </div>
            )}

            {/* STATE 6: Insufficient Permission */}
            {activeState === 'state-6' && (
              <div style={{ textAlign: 'center', maxWidth: '440px', padding: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F1F5F9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Lock size={32} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px' }}>Insufficient Assignment Authority</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  Your current login credentials do not have the <strong>Inspection Manager / Coordinator</strong> authorization role required to lock DGMS statutory teams.
                </p>
                <span className="badge badge-draft">Read-Only Governance Mode</span>
              </div>
            )}

            {/* STATE 7: Assignment Already Completed */}
            {activeState === 'state-7' && (
              <div style={{ textAlign: 'center', maxWidth: '440px', padding: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E40AF', margin: '0 0 6px' }}>Assignment Roster Already Confirmed</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  This inspection has a confirmed team and an active cryptographic token. To modify personnel, you must execute a formal statutory reassignment.
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('05')}>View Roster</button>
                  <button className="btn btn-primary btn-sm" onClick={() => navigateTo('13')}>Initiate Reassignment &rarr;</button>
                </div>
              </div>
            )}

            {/* STATE 8: Concurrency Conflict */}
            {activeState === 'state-8' && (
              <div style={{ textAlign: 'center', maxWidth: '460px', padding: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <RefreshCw size={32} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#5B21B6', margin: '0 0 6px' }}>Modified by Another Authorized User</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  Coordinator <strong>P. K. Verma</strong> committed changes to this team roster 2 minutes ago. Your draft view has been superseded.
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button className="btn btn-primary btn-sm" onClick={() => navigateTo('05')}>Reload Latest Confirmed Version</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('12')}>Review Diff in Audit History</button>
                </div>
              </div>
            )}

            {/* STATE 9: Offline Mode */}
            {activeState === 'state-9' && (
              <div style={{ textAlign: 'center', maxWidth: '460px', padding: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FFF7ED', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <WifiOff size={32} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#9A3412', margin: '0 0 6px' }}>Offline Mode / Colliery Intranet Partition</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  Assignment commits are cached locally in cryptographic SQLite queue. Dispatches will sync automatically upon surface connection restore.
                </p>
                <span className="badge badge-planned">2 Staged Assignments Queued for Sync</span>
              </div>
            )}

            {/* STATE 10: Loading Skeleton */}
            {activeState === 'state-10' && (
              <div style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ height: '24px', width: '45%', background: '#E2E8F0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: '60px', background: '#F1F5F9', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: '36px', background: '#F1F5F9', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: '36px', background: '#F1F5F9', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: '36px', background: '#F1F5F9', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Simulating Enterprise Table & Metric Skeleton Loading...
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
