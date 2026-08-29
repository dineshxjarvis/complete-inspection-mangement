"use client";

import React from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  CheckSquare,
  AlertTriangle,
  Building,
  User,
  Calendar,
  ShieldCheck,
  RotateCcw,
  Paperclip,
  CheckCircle,
  Clock,
  ChevronLeft,
  ArrowRight,
  Upload,
  Layers,
  Send
} from 'lucide-react';

export const Screen13CapaDetails: React.FC = () => {
  const {
    activeCapa,
    navigateTo,
    findings,
    setActiveFinding,
    setIsCapaUpdateModalOpen
  } = useMineResponse();

  const capa = activeCapa;
  const linkedFinding = findings.find(f => f.id === capa.findingId) || findings[0];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('12')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to CAPA List</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B',
                borderColor: 'rgba(0, 137, 123, 0.4)'
              }}
            >
              {capa.id}
            </span>
            <span className="badge badge-danger">PRIORITY: {capa.priority}</span>
            <span className="badge badge-warning">{capa.status.toUpperCase()}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            {capa.title}
          </h1>
          <p className="screen-subtitle">
            Linked Finding: <strong>{capa.findingId}</strong> &bull; {capa.findingTitle}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (linkedFinding) setActiveFinding(linkedFinding);
              navigateTo('08');
            }}
          >
            <AlertTriangle size={13} color="#E65100" />
            <span>View Finding ({capa.findingId})</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('18')}
            style={{ background: '#00897B', borderColor: '#00796B' }}
          >
            <RotateCcw size={13} />
            <span>Update Progress Milestone</span>
          </button>
        </div>
      </div>

      {/* Grid Layout: 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '16px', marginBottom: '30px' }}>
        {/* Left Column: Action Narrative, Sub-actions Breakdown, Update History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Action Scope Description */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              CORRECTIVE ACTION SCOPE & TECHNICAL PLAN
            </h3>
            <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-primary)', background: '#FAFAFA', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              {capa.actionDescription}
            </div>
          </div>

          {/* Sub-actions Breakdown */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                BREAKDOWN ACTIONS & TASK MILESTONES
              </h3>
              <span className="badge badge-info">{capa.subActions.length} Sub-tasks</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {capa.subActions.map(action => {
                const isDone = action.status === 'Completed';
                const isInProg = action.status === 'In Progress';
                return (
                  <div
                    key={action.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: 'var(--bg-surface-alt)',
                      borderRadius: '6px',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: isDone ? '#2E7D32' : isInProg ? '#F57C00' : '#90A4AE',
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 700
                        }}
                      >
                        {isDone ? '✓' : isInProg ? '▶' : '○'}
                      </div>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', textDecoration: isDone ? 'line-through' : 'none' }}>
                          {action.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Owner: {action.owner} &bull; Target: {action.dueDate}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`badge ${
                        isDone ? 'badge-success' : isInProg ? 'badge-warning' : 'badge-subtle'
                      }`}
                      style={{ fontSize: '10.5px' }}
                    >
                      {action.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Execution Progress & Updates History */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              PROGRESS LOG & OPERATIONAL MILESTONES
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {capa.updates.map(upd => (
                <div
                  key={upd.id}
                  style={{
                    padding: '10px 12px',
                    background: 'var(--bg-surface-alt)',
                    borderRadius: '6px',
                    borderLeft: '3px solid #00897B',
                    borderTop: '1px solid var(--border-light)',
                    borderRight: '1px solid var(--border-light)',
                    borderBottom: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#00796B' }}>
                      Milestone: {upd.progress}% Completed ({upd.status})
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{upd.timestamp}</span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {upd.comment}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Logged by {upd.updatedBy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Ownership, Progress Bar, Required Evidence & Verifier */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Progress Card */}
          <div className="card" style={{ padding: '16px', background: '#E0F2F1', borderColor: '#80CBC4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#004D40', textTransform: 'uppercase' }}>
                OVERALL REMEDIATION PROGRESS
              </span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#004D40', fontFamily: 'monospace' }}>
                {capa.progressPercentage}%
              </span>
            </div>

            <div className="progress-bar-container" style={{ height: '8px', background: 'rgba(0,0,0,0.1)', marginBottom: '14px' }}>
              <div
                className="progress-bar-fill"
                style={{
                  width: `${capa.progressPercentage}%`,
                  background: '#00796B'
                }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigateTo('18')}
              style={{
                width: '100%',
                background: '#00897B',
                borderColor: '#00796B',
                justifyContent: 'center',
                padding: '9px'
              }}
            >
              <RotateCcw size={14} />
              <span>Update Progress (Screen 18)</span>
            </button>
          </div>

          {/* Ownership & Schedule */}
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              OWNERSHIP & TIMELINE
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Department:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{capa.department}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Responsible Person:</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{capa.responsiblePerson} ({capa.responsibleTitle})</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Statutory Due Date:</span>
                <div style={{ fontWeight: 700, color: '#D32F2F' }}>{capa.dueDate} (Statutory Deadline)</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Independent Verifier (Workspace 06):</span>
                <div style={{ fontWeight: 600, color: '#00796B' }}>{capa.verifier}</div>
              </div>
            </div>
          </div>

          {/* Required Evidence Checklist */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                REQUIRED VERIFICATION EVIDENCE
              </h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('17')}
                style={{ fontSize: '11px', padding: '2px 8px' }}
              >
                + Upload (Screen 17)
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {capa.requiredEvidenceChecklist.map(evc => (
                <div
                  key={evc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    background: evc.completed ? '#E8F5E9' : 'var(--bg-surface-alt)',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: evc.completed ? '#C8E6C9' : 'var(--border-light)',
                    fontSize: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: evc.completed ? '#2E7D32' : 'var(--text-muted)', fontWeight: 700 }}>
                      {evc.completed ? '✓' : '☐'}
                    </span>
                    <span style={{ color: evc.completed ? '#1B5E20' : 'var(--text-secondary)', fontWeight: evc.completed ? 600 : 400 }}>
                      {evc.title}
                    </span>
                  </div>
                  {evc.fileAttached && (
                    <span className="badge badge-subtle font-mono" style={{ fontSize: '10px' }}>
                      {evc.fileAttached}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
