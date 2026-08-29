"use client";

import React, { useState } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  X,
  ListTodo,
  Plus,
  Calendar,
  User,
  Building,
  CheckSquare
} from 'lucide-react';

export const AddTaskModal: React.FC = () => {
  const {
    isAddTaskModalOpen,
    setIsAddTaskModalOpen,
    activeCapa,
    addTask
  } = useCorrectiveAction();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('Mechanical Overhaul Crew');
  const [department, setDepartment] = useState('Ventilation');
  const [startDate, setStartDate] = useState('25 Nov 2026');
  const [dueDate, setDueDate] = useState('29 Nov 2026');
  const [evidenceRequired, setEvidenceRequired] = useState(true);
  const [evidenceType, setEvidenceType] = useState('Photo');

  if (!isAddTaskModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(activeCapa.id, {
      title,
      description,
      owner,
      department,
      startDate,
      dueDate,
      status: 'PENDING',
      dependencies: [],
      evidenceRequired,
      evidenceType,
      progressPercentage: 0
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 20, 15, 0.75)',
        backdropFilter: 'blur(3px)',
        zIndex: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsAddTaskModalOpen(false)}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #00695C 0%, #004D40 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ListTodo size={18} color="#80CBC4" />
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>
              ADD TASK TO ACTION PLAN &bull; {activeCapa.id}
            </h2>
          </div>
          <button
            onClick={() => setIsAddTaskModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#80CBC4',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Task Title *
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Pressure test auxiliary booster fan seals"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Task Description *
            </label>
            <textarea
              className="form-control"
              rows={2}
              placeholder="Technical specifications, procedure reference, and execution checklist..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              style={{ height: 'auto' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Assigned Owner / Crew *
              </label>
              <input
                type="text"
                className="form-control"
                value={owner}
                onChange={e => setOwner(e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Department *
              </label>
              <input
                type="text"
                className="form-control"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Start Date *
              </label>
              <input
                type="text"
                className="form-control"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Target Due Date *
              </label>
              <input
                type="text"
                className="form-control"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-surface-alt)', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px' }}>
            <input
              type="checkbox"
              id="evdCheck"
              checked={evidenceRequired}
              onChange={e => setEvidenceRequired(e.target.checked)}
            />
            <label htmlFor="evdCheck" style={{ fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
              Mandatory Evidence Upload Required upon Completion
            </label>
          </div>

          <div
            style={{
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px'
            }}
          >
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsAddTaskModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ background: '#00695C', borderColor: '#004D40' }}
            >
              <Plus size={13} />
              <span>Add Task & Audit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
