"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  Flame,
  CheckCircle,
  PlayCircle,
  FileUp,
  RotateCcw,
  ArrowRight,
  Shield,
  MapPin,
  ChevronRight,
  Send,
  Layers,
  Activity
} from 'lucide-react';

export const Screen01Dashboard: React.FC = () => {
  const {
    capaList,
    setActiveCapa,
    navigateTo,
    selectedMine,
    auditLog
  } = useCorrectiveAction();

  const totalOpen = capaList.filter(c => c.capaStatus !== 'COMPLETED' && c.capaStatus !== 'VERIFIED').length;
  const myActions = capaList.length;
  const dueSoon = capaList.filter(c => c.daysRemaining >= 0 && c.daysRemaining <= 2).length;
  const overdue = capaList.filter(c => c.daysRemaining < 0).length;
  const inProgress = capaList.filter(c => c.capaStatus === 'IN PROGRESS').length;
  const awaitingVerif = capaList.filter(c => c.capaStatus === 'AWAITING VERIFICATION').length;
  const returnedCount = capaList.filter(c => c.capaStatus === 'RETURNED').length;
  const completedCount = capaList.filter(c => c.capaStatus === 'COMPLETED' || c.capaStatus === 'VERIFIED').length;

  const overdueActions = capaList.filter(c => c.daysRemaining < 0);

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #00695C 0%, #004D40 100%)',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}
            >
              WORKSPACE 06
            </span>
            <h1 className="screen-title" style={{ margin: 0 }}>
              CORRECTIVE ACTION & COMPLIANCE (CAPA)
            </h1>
          </div>
          <p className="screen-subtitle">
            Operational remediation hub &bull; Execute tasks, track milestone progress, upload field evidence, and submit for verification
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
              background: '#E0F2F1',
              border: '1px solid #80CBC4',
              color: '#004D40',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            <MapPin size={13} color="#00796B" />
            <span>Colliery: {selectedMine}</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigateTo('02')}
            style={{ background: '#00695C', borderColor: '#004D40' }}
          >
            <CheckSquare size={14} />
            <span>View My CAPA Queue</span>
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
        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #00695C' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Total Open CAPA
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#004D40', fontFamily: 'monospace', marginTop: '2px' }}>
            {totalOpen}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #0288D1' }}>
          <div style={{ fontSize: '11px', color: '#01579B', textTransform: 'uppercase', fontWeight: 700 }}>
            My Actions
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0288D1', fontFamily: 'monospace', marginTop: '2px' }}>
            {myActions}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #F57C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '11px', color: '#E65100', textTransform: 'uppercase', fontWeight: 700 }}>
            Due Soon (&le; 2 Days)
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#E65100', fontFamily: 'monospace', marginTop: '2px' }}>
            {dueSoon}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>
            Overdue
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>
            {overdue}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #00897B' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            In Progress
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#00796B', fontFamily: 'monospace', marginTop: '2px' }}>
            {inProgress}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #7B1FA2', background: '#F3E5F5' }}>
          <div style={{ fontSize: '11px', color: '#4A148C', textTransform: 'uppercase', fontWeight: 700 }}>
            Awaiting Verification
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#7B1FA2', fontFamily: 'monospace', marginTop: '2px' }}>
            {awaitingVerif}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #C62828', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>
            Returned Actions
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#C62828', fontFamily: 'monospace', marginTop: '2px' }}>
            {returnedCount}
          </div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #2E7D32', background: '#E8F5E9' }}>
          <div style={{ fontSize: '11px', color: '#1B5E20', textTransform: 'uppercase', fontWeight: 700 }}>
            Completed
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#2E7D32', fontFamily: 'monospace', marginTop: '2px' }}>
            {completedCount}
          </div>
        </div>
      </div>

      {/* SECTION: OVERDUE ACTIONS HIGHLIGHT BANNER */}
      {overdueActions.length > 0 && (
        <div
          className="card"
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)',
            border: '1px solid #EF9A9A',
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
                OVERDUE CORRECTIVE ACTIONS REQUIRING ATTENTION
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#B71C1C', marginTop: '2px' }}>
                {overdueActions[0].id}: {overdueActions[0].actionTitle} &bull; Owner: {overdueActions[0].owner}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-danger font-mono font-bold">
              {Math.abs(overdueActions[0].daysRemaining)} DAYS OVERDUE
            </span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setActiveCapa(overdueActions[0]);
                navigateTo('09');
              }}
              style={{ background: '#FFF', color: '#B71C1C', borderColor: '#FFCDD2' }}
            >
              <span>Manage Blocker (Screen 09)</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION: MY PRIORITY ACTIONS TABLE */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckSquare size={16} color="#00695C" />
            <h2 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, textTransform: 'uppercase' }}>
              MY PRIORITY CORRECTIVE ACTIONS
            </h2>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('02')}
          >
            <span>View All ({capaList.length})</span>
            <ChevronRight size={12} />
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>CAPA ID</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th style={{ width: '100px' }}>Mine</th>
              <th>Action Title & Scope</th>
              <th style={{ width: '100px' }}>Priority</th>
              <th style={{ width: '110px' }}>Due Date</th>
              <th style={{ width: '130px' }}>Status</th>
              <th style={{ width: '100px' }}>Evidence</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {capaList.map(capa => {
              const isCrit = capa.priority === 'CRITICAL';
              const isHigh = capa.priority === 'HIGH';

              return (
                <tr
                  key={capa.id}
                  onClick={() => {
                    setActiveCapa(capa);
                    navigateTo('04');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <span
                      className="id-badge font-mono"
                      style={{
                        background: 'rgba(0, 105, 92, 0.15)',
                        color: '#004D40',
                        fontWeight: 700
                      }}
                    >
                      {capa.id}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-subtle font-mono" style={{ fontSize: '10.5px' }}>
                      {capa.findingId}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{capa.mine}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                      {capa.actionTitle}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Department: {capa.department} &bull; Owner: {capa.owner}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${isCrit ? 'badge-danger font-bold' : isHigh ? 'badge-warning font-bold' : 'badge-subtle'}`}>
                      {capa.priority}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: capa.daysRemaining < 0 ? '#D32F2F' : 'var(--text-primary)' }}>
                      {capa.dueDate}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${capa.capaStatus === 'COMPLETED' ? 'status-completed' : capa.capaStatus === 'BLOCKED' ? 'status-overdue' : 'status-active'}`} style={{ fontSize: '10.5px' }}>
                      {capa.capaStatus} ({capa.progressPercentage}%)
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-info font-mono" style={{ fontSize: '11px' }}>
                      {capa.uploadedEvidenceCount} / {capa.requiredEvidenceCount}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCapa(capa);
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

      {/* SECTION: RECENT ACTIVITY */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '30px' }}>
        <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#004D40', textTransform: 'uppercase', marginBottom: '12px' }}>
          RECENT COMPLIANCE ACTIVITY FEED
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {auditLog.slice(0, 3).map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: '4px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-info font-mono" style={{ fontSize: '10px' }}>{item.objectId}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.event}</span>
                <span style={{ color: 'var(--text-muted)' }}>&bull; {item.reason}</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                {item.timestamp} &bull; <strong>{item.actor}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
