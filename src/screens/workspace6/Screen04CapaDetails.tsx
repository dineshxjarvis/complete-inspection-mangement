"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  Layers,
  CheckSquare,
  AlertTriangle,
  PlayCircle,
  FileUp,
  Clock,
  Send,
  HelpCircle,
  CheckCircle2,
  Lock,
  ChevronLeft,
  ArrowRight,
  User,
  Building,
  Calendar,
  MessageSquare,
  Camera,
  Activity
} from 'lucide-react';

export const Screen04CapaDetails: React.FC = () => {
  const {
    activeCapa,
    navigateTo,
    openEvidenceViewer,
    showToast
  } = useCorrectiveAction();

  const capa = activeCapa;

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('02')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Queue</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                background: 'rgba(0, 105, 92, 0.15)',
                color: '#004D40',
                borderColor: 'rgba(0, 105, 92, 0.4)'
              }}
            >
              {capa.id}
            </span>
            <span className="badge badge-warning font-bold">STATUS: {capa.capaStatus}</span>
            <span className="badge badge-danger font-bold">PRIORITY: {capa.priority}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            {capa.actionTitle}
          </h1>
          <p className="screen-subtitle">
            Mine: <strong>{capa.mine}</strong> &bull; Finding: <strong style={{ color: '#D32F2F' }}>{capa.findingId}</strong> &bull; Owner: {capa.owner} &bull; Dept: {capa.department} &bull; Due: {capa.dueDate}
          </p>
        </div>

        {/* Action Bar */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('06')}
          >
            <PlayCircle size={13} />
            <span>Update Progress (Screen 06)</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('07')}
          >
            <FileUp size={13} />
            <span>Upload Evidence (Screen 07)</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('10')}
            style={{ color: '#E65100', borderColor: '#FFE0B2' }}
          >
            <HelpCircle size={13} />
            <span>Clarification (Screen 10)</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('13')}
            style={{ background: '#00695C', borderColor: '#004D40' }}
          >
            <Send size={13} />
            <span>Submit for Verification (Screen 13)</span>
          </button>
        </div>
      </div>

      {/* Main 8-Section Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Sections 1, 3, 4, 5 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 1 & 2 — ACTION DESCRIPTION & SOURCE FINDING */}
          <div className="card" style={{ padding: '18px', borderLeft: '4px solid #00695C' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#004D40', fontWeight: 800, textTransform: 'uppercase' }}>
                  SECTION 1 — AUTHORIZED CORRECTIVE ACTION
                </span>
                <h2 style={{ margin: '4px 0 0', fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {capa.actionTitle}
                </h2>
              </div>
              <span className="badge badge-subtle font-mono">{capa.findingId}</span>
            </div>

            <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {capa.actionDescription}
            </p>

            <div style={{ background: '#FFEBEE', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', color: '#B71C1C', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Source Finding: <strong>{capa.findingTitle}</strong></span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => showToast(`Linked finding record ${capa.findingId} inspected`, 'info')}
                style={{ padding: '2px 6px', fontSize: '11px', background: '#FFF' }}
              >
                View Finding &rarr;
              </button>
            </div>
          </div>

          {/* SECTION 5 — PROGRESS METER */}
          <div className="card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                SECTION 5 — MILESTONE PROGRESS COMPLETION
              </h3>
              <span className="badge badge-primary font-mono font-bold" style={{ background: '#00695C', color: '#FFF' }}>
                {capa.progressPercentage}% COMPLETE
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div style={{ width: '100%', height: '10px', background: '#E0E0E0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
              <div
                style={{
                  width: `${capa.progressPercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #00897B, #004D40)',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              <span>Assigned: <strong>{capa.assignedDate}</strong></span>
              <span>Statutory Deadline: <strong style={{ color: '#D32F2F' }}>{capa.dueDate}</strong></span>
            </div>
          </div>

          {/* SECTION 4 — ACTION PLAN TASKS */}
          <div className="card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                SECTION 4 — TASK BREAKDOWN ({capa.tasks.length} Sub-tasks)
              </h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('05')}
                style={{ fontSize: '11px', padding: '2px 8px' }}
              >
                Manage Action Plan (Screen 05) &rarr;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {capa.tasks.map(task => {
                const isDone = task.status === 'COMPLETE';
                const isProg = task.status === 'IN PROGRESS';

                return (
                  <div
                    key={task.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '6px',
                      background: 'var(--bg-surface-alt)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="badge badge-info font-mono" style={{ fontSize: '10px' }}>{task.id}</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{task.title}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Owner: <strong>{task.owner}</strong> &bull; Due: {task.dueDate}
                      </div>
                    </div>

                    <span className={`status-pill ${isDone ? 'status-completed' : isProg ? 'status-active' : 'status-pending'}`}>
                      {task.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Sections 3, 6, 7, 8 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 6 — EVIDENCE ARTIFACTS */}
          <div className="card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                SECTION 6 — REQUIRED EVIDENCE ({capa.uploadedEvidenceCount} of {capa.requiredEvidenceCount})
              </h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('07')}
                style={{ fontSize: '11px', padding: '2px 8px' }}
              >
                + Upload
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {capa.evidenceList.map(evd => (
                <div
                  key={evd.id}
                  onClick={() => openEvidenceViewer(evd)}
                  style={{
                    padding: '8px 10px',
                    background: 'var(--bg-surface-alt)',
                    borderRadius: '6px',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {evd.type === 'Photo' ? <Camera size={13} color="#00695C" /> : <FileUp size={13} color="#00695C" />}
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{evd.title.substring(0, 30)}...</span>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '10px' }}>✓ {evd.status}</span>
                </div>
              ))}

              {capa.uploadedEvidenceCount < capa.requiredEvidenceCount && (
                <div style={{ padding: '8px 10px', background: '#FFF3E0', borderRadius: '6px', border: '1px solid #FFE0B2', fontSize: '11.5px', color: '#BF360C', display: 'flex', justifyContent: 'space-between' }}>
                  <span>⚠️ Missing: Post-Repair Anemometer Traverse</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigateTo('07')}
                    style={{ fontSize: '10.5px', padding: '2px 6px', background: '#00695C' }}
                  >
                    Upload Now
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 7 — ACTION OWNER COMMENTS */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              SECTION 7 — ACTION LOG & COMMENTS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {capa.comments.map(cmt => (
                <div key={cmt.id} style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)', fontSize: '11px' }}>
                    <strong>{cmt.author}</strong> ({cmt.role}) &bull; {cmt.timestamp}
                  </div>
                  <div style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    "{cmt.text}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 8 — CHRONOLOGICAL ACTIVITY LINK */}
          <div className="card" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Section 8 — Chronological Audit Trail</span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('14')}
            >
              <span>View History (Screen 14) &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
