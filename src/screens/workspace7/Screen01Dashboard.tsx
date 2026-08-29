"use client";

import React from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  ShieldCheck,
  CheckSquare,
  Clock,
  AlertTriangle,
  Award,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Eye,
  MapPin,
  Flame,
  ArrowRight,
  Activity,
  Layers
} from 'lucide-react';

export const Screen01Dashboard: React.FC = () => {
  const {
    verificationList,
    setActiveVerification,
    navigateTo,
    selectedMine,
    auditLog
  } = useVerification();

  const pendingCount = verificationList.filter(v => v.status === 'Awaiting Verification' || v.status === 'In Verification Review').length;
  const dueToday = verificationList.filter(v => v.daysRemaining === 0).length;
  const overdueCount = verificationList.filter(v => v.daysRemaining < 0).length;
  const criticalCount = verificationList.filter(v => v.severity === 'CRITICAL').length;
  const returnedCount = verificationList.filter(v => v.status === 'Returned to WS06').length;
  const reverificationCount = verificationList.filter(v => v.status === 'Reverification Pending').length;
  const verifiedCount = verificationList.filter(v => v.status === 'Verified' || v.status === 'Closed').length;
  const closedCount = verificationList.filter(v => v.status === 'Closed').length;

  const overdueList = verificationList.filter(v => v.daysRemaining < 0);

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #006064 0%, #00838F 100%)',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}
            >
              WORKSPACE 07
            </span>
            <h1 className="screen-title" style={{ margin: 0 }}>
              INDEPENDENT VERIFICATION & STATUTORY FOLLOW-UP
            </h1>
          </div>
          <p className="screen-subtitle">
            Regulatory audit command center &bull; Review CAPA evidence, validate measured outcomes, decide verdicts (PASS / RETURN / FAIL), and close statutory findings
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: '#E0F7FA',
              border: '1px solid #80DEEA',
              color: '#006064',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            <MapPin size={13} color="#00838F" />
            <span>Colliery: {selectedMine}</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigateTo('02')}
            style={{ background: '#006064', borderColor: '#004D40' }}
          >
            <CheckSquare size={14} />
            <span>Open Verification Queue</span>
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS (8 Metrics) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #00838F' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Pending Verification
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#006064', fontFamily: 'monospace', marginTop: '2px' }}>
            {pendingCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #F57C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '11px', color: '#E65100', textTransform: 'uppercase', fontWeight: 700 }}>
            Due Today
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#E65100', fontFamily: 'monospace', marginTop: '2px' }}>
            {dueToday}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>
            Overdue
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>
            {overdueCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #C62828', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>
            Critical Severity
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#C62828', fontFamily: 'monospace', marginTop: '2px' }}>
            {criticalCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #0288D1' }}>
          <div style={{ fontSize: '11px', color: '#01579B', textTransform: 'uppercase', fontWeight: 700 }}>
            Returned Actions
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0288D1', fontFamily: 'monospace', marginTop: '2px' }}>
            {returnedCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #7B1FA2', background: '#F3E5F5' }}>
          <div style={{ fontSize: '11px', color: '#4A148C', textTransform: 'uppercase', fontWeight: 700 }}>
            Reverification Queue
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#7B1FA2', fontFamily: 'monospace', marginTop: '2px' }}>
            {reverificationCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #2E7D32', background: '#E8F5E9' }}>
          <div style={{ fontSize: '11px', color: '#1B5E20', textTransform: 'uppercase', fontWeight: 700 }}>
            Verified This Month
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#2E7D32', fontFamily: 'monospace', marginTop: '2px' }}>
            {verifiedCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #1A237E', background: '#E8EAF6' }}>
          <div style={{ fontSize: '11px', color: '#1A237E', textTransform: 'uppercase', fontWeight: 700 }}>
            Formally Closed
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#1A237E', fontFamily: 'monospace', marginTop: '2px' }}>
            {closedCount}
          </div>
        </div>
      </div>

      {/* OVERDUE VERIFICATIONS (CONDITIONAL) */}
      {overdueList.length > 0 && (
        <div
          className="card"
          style={{
            padding: '16px 20px',
            background: '#FFEBEE',
            border: '1px solid #FFCDD2',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={24} color="#D32F2F" />
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#B71C1C', textTransform: 'uppercase' }}>
                OVERDUE VERIFICATION AUDIT
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#B71C1C', marginTop: '2px' }}>
                {overdueList[0].id}: {overdueList[0].actionTitle} &bull; Mine: {overdueList[0].mine}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-danger font-mono font-bold">
              {Math.abs(overdueList[0].daysRemaining)} DAYS OVERDUE
            </span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setActiveVerification(overdueList[0]);
                navigateTo('04');
              }}
              style={{ background: '#FFF', color: '#B71C1C', borderColor: '#FFCDD2' }}
            >
              <span>Audit Now (Screen 04)</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN SECTION: VERIFICATION REQUIRING ACTION TABLE */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} color="#006064" />
            <h2 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, textTransform: 'uppercase' }}>
              VERIFICATION REQUIRING STATUTORY AUDIT & DECISION
            </h2>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('02')}
          >
            <span>View All ({verificationList.length})</span>
            <ChevronRight size={12} />
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Verification ID</th>
              <th style={{ width: '130px' }}>CAPA Ref</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th style={{ width: '90px' }}>Mine</th>
              <th>Action Title & Remediation Scope</th>
              <th style={{ width: '100px' }}>Severity</th>
              <th style={{ width: '160px' }}>Action Owner</th>
              <th style={{ width: '100px' }}>Submitted</th>
              <th style={{ width: '100px' }}>Due Date</th>
              <th style={{ width: '140px' }}>Audit Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {verificationList.map(ver => {
              const isCrit = ver.severity === 'CRITICAL';
              const isHigh = ver.severity === 'HIGH';

              return (
                <tr
                  key={ver.id}
                  onClick={() => {
                    setActiveVerification(ver);
                    navigateTo('04');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <span className="id-badge font-mono" style={{ background: 'rgba(0, 96, 100, 0.15)', color: '#006064', fontWeight: 700 }}>
                      {ver.id}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-subtle font-mono" style={{ fontSize: '10.5px' }}>
                      {ver.capaId}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-subtle font-mono" style={{ fontSize: '10.5px' }}>
                      {ver.findingId}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{ver.mine}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                      {ver.actionTitle}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Category: {ver.capaType} &bull; Outcome: {ver.expectedOutcome.requiredValue}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${isCrit ? 'badge-danger font-bold' : isHigh ? 'badge-warning font-bold' : 'badge-subtle'}`}>
                      {ver.severity}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{ver.actionOwner}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{ver.department}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{ver.submissionDate}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: ver.daysRemaining < 0 ? '#D32F2F' : 'var(--text-primary)' }}>
                      {ver.verificationDueDate}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${ver.status === 'Verified' ? 'status-completed' : ver.status === 'Returned to WS06' ? 'status-overdue' : 'status-active'}`} style={{ fontSize: '10.5px' }}>
                      {ver.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={e => {
                        e.stopPropagation();
                        setActiveVerification(ver);
                        navigateTo('04');
                      }}
                      style={{ padding: '3px 8px' }}
                    >
                      <span>Audit</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* RECENT VERIFICATIONS / DECISIONS */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '30px' }}>
        <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#006064', textTransform: 'uppercase', marginBottom: '12px' }}>
          RECENT STATUTORY VERIFICATION DECISIONS & AUDIT LEDGER
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {auditLog.map((log, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: '4px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-info font-mono" style={{ fontSize: '10px' }}>{log.objectId}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.event}</span>
                <span style={{ color: 'var(--text-muted)' }}>&bull; {log.reason}</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                {log.timestamp} &bull; <strong>{log.actor}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
