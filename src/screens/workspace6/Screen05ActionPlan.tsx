"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  ListTodo,
  Plus,
  ChevronLeft,
  Calendar,
  User,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const Screen05ActionPlan: React.FC = () => {
  const {
    activeCapa,
    navigateTo,
    setIsAddTaskModalOpen,
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
              onClick={() => navigateTo('04')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to CAPA Details</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(0, 105, 92, 0.15)',
                color: '#004D40'
              }}
            >
              ACTION PLAN & WORK BREAKDOWN
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            {capa.id} &bull; OPERATIONAL ACTION PLAN
          </h1>
          <p className="screen-subtitle">
            Hierarchical task breakdown, crew dependencies, execution schedules, and mandatory verification milestones
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsAddTaskModalOpen(true)}
          style={{ background: '#00695C', borderColor: '#004D40' }}
        >
          <Plus size={13} />
          <span>Add Task to Action Plan</span>
        </button>
      </div>

      {/* Plan Hierarchy Card */}
      <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#004D40', marginBottom: '14px' }}>
          CORRECTIVE ACTION HIERARCHY & TASK SCHEDULE
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {capa.tasks.map((task, idx) => {
            const isDone = task.status === 'COMPLETE';
            const isProg = task.status === 'IN PROGRESS';

            return (
              <div
                key={task.id}
                style={{
                  padding: '16px',
                  borderRadius: '6px',
                  background: 'var(--bg-surface-alt)',
                  border: `1.5px solid ${isDone ? '#C8E6C9' : isProg ? '#80CBC4' : 'var(--border-color)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        background: '#00695C',
                        color: '#FFF',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      TASK 0{idx + 1} &bull; {task.id}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {task.title}
                    </h3>
                  </div>

                  <span className={`status-pill ${isDone ? 'status-completed' : isProg ? 'status-active' : 'status-pending'}`}>
                    {task.status} ({task.progressPercentage}%)
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {task.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', fontSize: '11.5px' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Assigned Owner:</span>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{task.owner}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Execution Dates:</span>
                    <div style={{ fontWeight: 600, marginTop: '2px' }}>{task.startDate} &rarr; {task.dueDate}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Dependencies:</span>
                    <div style={{ fontWeight: 600, marginTop: '2px' }}>{task.dependencies.length > 0 ? task.dependencies.join(', ') : 'None (Root Task)'}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Mandatory Evidence:</span>
                    <div style={{ fontWeight: 700, color: '#00695C', marginTop: '2px' }}>{task.evidenceRequired ? `Yes (${task.evidenceType})` : 'Optional'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
