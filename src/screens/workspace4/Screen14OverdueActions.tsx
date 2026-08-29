"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  Clock,
  AlertTriangle,
  Flame,
  Send,
  User,
  Building,
  Mail,
  ChevronLeft,
  Filter,
  Search,
  Eye,
  ShieldAlert
} from 'lucide-react';

export const Screen14OverdueActions: React.FC = () => {
  const {
    capaList,
    setActiveCapa,
    navigateTo,
    setIsEscalationModalOpen,
    showToast
  } = useMineResponse();

  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const overdueActions = capaList.filter(c => c.status === 'Overdue' || (c.daysOverdue && c.daysOverdue > 0));

  const filteredOverdue = overdueActions.filter(c => {
    if (selectedDept !== 'All' && c.department !== selectedDept) return false;
    if (selectedPriority !== 'All' && c.priority !== selectedPriority) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.responsiblePerson.toLowerCase().includes(q) ||
        c.findingId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleContactOwner = (owner: string, actionId: string) => {
    showToast(`Urgent Statutory Reminder SMS & Email dispatched to ${owner} for ${actionId}`, 'info');
  };

  const handleOpenEscalate = (capa: typeof capaList[0]) => {
    setActiveCapa(capa);
    setIsEscalationModalOpen(true);
  };

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
              <span>Back to CAPA</span>
            </button>
            <span className="badge badge-danger">STATUTORY ESCALATION QUEUE</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            OVERDUE CORRECTIVE ACTIONS
          </h1>
          <p className="screen-subtitle">
            Mandatory remediation items that have exceeded statutory deadlines &bull; Authorized formal escalation protocol
          </p>
        </div>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (overdueActions.length > 0) {
              handleOpenEscalate(overdueActions[0]);
            }
          }}
          style={{ background: '#D32F2F', color: '#FFF' }}
        >
          <ShieldAlert size={13} />
          <span>Trigger Statutory Escalation Protocol</span>
        </button>
      </div>

      {/* Governance Notice */}
      <div
        className="card"
        style={{
          background: '#FFEBEE',
          border: '1px solid #FFCDD2',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <AlertTriangle size={20} color="#D32F2F" />
        <div style={{ flex: 1, fontSize: '12px', color: '#B71C1C', lineHeight: 1.4 }}>
          <strong>Statutory Compliance Warning:</strong> Actions overdue by more than 48 hours trigger automated statutory notices to the Coal India Limited (CIL) Safety Directorate and regional DGMS liaison. Overdue status cannot be silently altered or deleted.
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className="card"
        style={{
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '12px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search Overdue CAPA ID, Title, or Owner..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>

        <div>
          <select
            className="form-control"
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Departments</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Ventilation Department">Ventilation Department</option>
            <option value="Mechanical Department">Mechanical Department</option>
          </select>
        </div>

        <div>
          <select
            className="form-control"
            value={selectedPriority}
            onChange={e => setSelectedPriority(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="CRITICAL">Critical Priority</option>
          </select>
        </div>
      </div>

      {/* Overdue Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>CAPA ID</th>
              <th>Corrective Action Title & Scope</th>
              <th style={{ width: '160px' }}>Responsible Owner</th>
              <th style={{ width: '110px' }}>Due Date</th>
              <th style={{ width: '120px' }}>Days Overdue</th>
              <th style={{ width: '100px' }}>Priority</th>
              <th style={{ width: '110px' }}>Status</th>
              <th style={{ width: '220px', textAlign: 'center' }}>Management Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOverdue.map(capa => (
              <tr key={capa.id} style={{ backgroundColor: 'rgba(211, 47, 47, 0.04)' }}>
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(211, 47, 47, 0.15)', color: '#D32F2F' }}>
                    {capa.id}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13px' }}>
                    {capa.title}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Linked: {capa.findingId} &bull; {capa.department}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {capa.responsiblePerson}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {capa.responsibleTitle}
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {capa.dueDate}
                  </span>
                </td>
                <td>
                  <span className="badge badge-danger font-mono" style={{ fontSize: '11.5px', fontWeight: 800 }}>
                    {capa.daysOverdue || 3} DAYS OVERDUE
                  </span>
                </td>
                <td>
                  <span className="badge badge-danger">{capa.priority}</span>
                </td>
                <td>
                  <span className="status-pill status-overdue">OVERDUE</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setActiveCapa(capa);
                        navigateTo('13');
                      }}
                      style={{ padding: '3px 8px' }}
                      title="View Details"
                    >
                      <Eye size={12} />
                      <span>View</span>
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleContactOwner(capa.responsiblePerson, capa.id)}
                      style={{ padding: '3px 8px' }}
                      title="Send Urgent Reminder"
                    >
                      <Mail size={12} />
                      <span>Contact</span>
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleOpenEscalate(capa)}
                      style={{ padding: '3px 8px', background: '#D32F2F', color: '#FFF' }}
                      title="Escalate to General Manager / DGMS"
                    >
                      <ShieldAlert size={12} />
                      <span>Escalate</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
