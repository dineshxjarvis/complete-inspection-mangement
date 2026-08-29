"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  AlertTriangle,
  Flame,
  Clock,
  CheckCircle,
  FileCheck,
  ArrowRight,
  Shield,
  MapPin,
  Scale,
  Send,
  ShieldAlert,
  ChevronRight,
  Layers,
  Inbox
} from 'lucide-react';

export const Screen01Dashboard: React.FC = () => {
  const {
    findings,
    notices,
    setActiveFinding,
    navigateTo,
    selectedMine
  } = useMineResponseShim();

  const newCount = findings.filter(f => f.status === 'New').length;
  const underActionCount = findings.filter(f => f.status === 'Under Action').length;
  const criticalCount = findings.filter(f => f.severity === 'CRITICAL').length;
  const highCount = findings.filter(f => f.severity === 'HIGH').length;
  const regulatoryFindingsCount = findings.length;
  const awaitingActionCount = findings.filter(f => f.actionRequired && f.status === 'Confirmed').length;
  const overdueCount = findings.filter(f => f.daysRemaining < 0).length;
  const escalatedCount = findings.filter(f => f.status === 'Escalated').length;

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #1A237E 0%, #303F9F 100%)',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}
            >
              WORKSPACE 05
            </span>
            <h1 className="screen-title" style={{ margin: 0 }}>
              FINDINGS & REGULATORY ACTION
            </h1>
          </div>
          <p className="screen-subtitle">
            Statutory governance command center &bull; Assess confirmed findings, issue regulatory directions, manage escalations & CAPA handoff
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
              background: '#E8EAF6',
              border: '1px solid #C5CAE9',
              color: '#1A237E',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            <MapPin size={13} color="#3F51B5" />
            <span>Scope: {selectedMine} (Singrauli Division)</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigateTo('08')}
            style={{ background: '#1A237E', borderColor: '#303F9F' }}
          >
            <FileCheck size={14} />
            <span>Issue Regulatory Action</span>
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
        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #3F51B5' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            New Findings
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#1A237E', fontFamily: 'monospace', marginTop: '2px' }}>
            {newCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #0288D1' }}>
          <div style={{ fontSize: '11px', color: '#01579B', textTransform: 'uppercase', fontWeight: 700 }}>
            Under Action
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0288D1', fontFamily: 'monospace', marginTop: '2px' }}>
            {underActionCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>
            Critical Severity
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>
            {criticalCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #F57C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '11px', color: '#E65100', textTransform: 'uppercase', fontWeight: 700 }}>
            High Severity
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#E65100', fontFamily: 'monospace', marginTop: '2px' }}>
            {highCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #5C6BC0' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Regulatory Findings
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#303F9F', fontFamily: 'monospace', marginTop: '2px' }}>
            {regulatoryFindingsCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #FBC02D' }}>
          <div style={{ fontSize: '11px', color: '#F57F17', textTransform: 'uppercase', fontWeight: 700 }}>
            Awaiting Action
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#F57F17', fontFamily: 'monospace', marginTop: '2px' }}>
            {awaitingActionCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #C62828', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>
            Overdue Action
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#C62828', fontFamily: 'monospace', marginTop: '2px' }}>
            {overdueCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #7B1FA2', background: '#F3E5F5' }}>
          <div style={{ fontSize: '11px', color: '#4A148C', textTransform: 'uppercase', fontWeight: 700 }}>
            Escalated Cases
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#7B1FA2', fontFamily: 'monospace', marginTop: '2px' }}>
            {escalatedCount}
          </div>
        </div>
      </div>

      {/* SECTION: CRITICAL / HIGH PRIORITY HIGHLIGHT CARDS */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={18} color="#D32F2F" />
            <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              CRITICAL / HIGH PRIORITY FINDINGS REQUIRING STATUTORY ACTION
            </h2>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('03')}
          >
            <span>View All Critical ({criticalCount + highCount})</span>
            <ChevronRight size={13} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {findings.slice(0, 2).map(fnd => {
            const isCrit = fnd.severity === 'CRITICAL';
            return (
              <div
                key={fnd.id}
                className="card"
                style={{
                  padding: '16px',
                  borderLeft: `4px solid ${isCrit ? '#D32F2F' : '#F57C00'}`,
                  background: isCrit ? '#FFF5F5' : '#FFFBF5',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="id-badge font-mono" style={{ background: isCrit ? 'rgba(211, 47, 47, 0.15)' : 'rgba(245, 124, 0, 0.15)', color: isCrit ? '#D32F2F' : '#E65100' }}>
                      {fnd.id}
                    </span>
                    <span className={`badge ${isCrit ? 'badge-danger font-bold' : 'badge-warning font-bold'}`}>
                      {fnd.severity}
                    </span>
                    <span className="badge badge-subtle">{fnd.mine}</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#D32F2F', fontWeight: 700 }}>
                    Due: {fnd.dueDate}
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {fnd.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                    {fnd.issueDescription}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '10px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    Regulation: <strong>{fnd.clause}</strong>
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setActiveFinding(fnd);
                      navigateTo('04');
                    }}
                    style={{ background: '#FFF' }}
                  >
                    <span>Assess & Action</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION: REGULATORY ACTION SUMMARY CARDS */}
      <div
        className="card"
        style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)',
          border: '1px solid #9FA8DA',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: '#1A237E', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            REGULATORY ACTION PIPELINE
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
            <span style={{ fontSize: '13px', color: '#1A237E' }}><strong>Notice Required:</strong> 3</span>
            <span style={{ fontSize: '13px', color: '#1A237E' }}><strong>Response Pending:</strong> 5</span>
            <span style={{ fontSize: '13px', color: '#1A237E' }}><strong>Action Pending:</strong> 7</span>
            <span style={{ fontSize: '13px', color: '#C62828' }}><strong>Escalated:</strong> 2</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('11')}
            style={{ background: '#FFF', color: '#C62828', borderColor: '#FFCDD2' }}
          >
            <ShieldAlert size={13} />
            <span>Escalation Center (Screen 11)</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('08')}
            style={{ background: '#1A237E', borderColor: '#303F9F' }}
          >
            <FileCheck size={13} />
            <span>Regulatory Actions (Screen 08)</span>
          </button>
        </div>
      </div>

      {/* SECTION: FINDINGS REQUIRING ATTENTION TABLE */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Inbox size={16} color="#1A237E" />
            <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, textTransform: 'uppercase' }}>
              FINDINGS REQUIRING STATUTORY ATTENTION & DECISION
            </h3>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('02')}
          >
            <span>View Complete Queue ({findings.length})</span>
            <ChevronRight size={12} />
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Finding ID</th>
              <th style={{ width: '100px' }}>Mine</th>
              <th style={{ width: '120px' }}>Inspection</th>
              <th>Finding Title & Scope</th>
              <th style={{ width: '100px' }}>Severity</th>
              <th style={{ width: '130px' }}>Regulatory Basis</th>
              <th style={{ width: '110px' }}>Status</th>
              <th style={{ width: '110px' }}>Action Req.</th>
              <th style={{ width: '110px' }}>Due Date</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {findings.map(fnd => {
              const isCrit = fnd.severity === 'CRITICAL';
              return (
                <tr
                  key={fnd.id}
                  onClick={() => {
                    setActiveFinding(fnd);
                    navigateTo('04');
                  }}
                  style={{
                    backgroundColor: isCrit ? 'rgba(211, 47, 47, 0.04)' : undefined,
                    cursor: 'pointer'
                  }}
                >
                  <td>
                    <span
                      className="id-badge font-mono"
                      style={{
                        background: isCrit ? 'rgba(211, 47, 47, 0.15)' : 'rgba(63, 81, 181, 0.15)',
                        color: isCrit ? '#D32F2F' : '#1A237E'
                      }}
                    >
                      {fnd.id}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{fnd.mine}</span>
                  </td>
                  <td>
                    <span className="badge badge-subtle font-mono" style={{ fontSize: '10.5px' }}>
                      {fnd.inspectionId}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12.5px' }}>
                      {fnd.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {fnd.findingType}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${isCrit ? 'badge-danger font-bold' : fnd.severity === 'HIGH' ? 'badge-warning font-bold' : 'badge-subtle'}`}>
                      {fnd.severity}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-info font-mono" style={{ fontSize: '10.5px' }}>
                      {fnd.regulatoryBasisId}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill status-active" style={{ fontSize: '10.5px' }}>
                      ✓ {fnd.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${fnd.actionRequired ? 'badge-danger' : 'badge-subtle'}`} style={{ fontSize: '10.5px' }}>
                      {fnd.actionRequired ? 'YES' : 'NO'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: fnd.daysRemaining < 0 ? '#D32F2F' : 'var(--text-primary)' }}>
                      {fnd.dueDate}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={e => {
                        e.stopPropagation();
                        setActiveFinding(fnd);
                        navigateTo('04');
                      }}
                      style={{ padding: '3px 8px' }}
                    >
                      <span>Open</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper hook
function useMineResponseShim() {
  return useRegulatoryAction();
}
