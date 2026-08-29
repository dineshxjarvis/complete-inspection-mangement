"use client";

import React, { useState } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  CheckSquare,
  Search,
  Filter,
  Eye,
  Calendar,
  AlertTriangle,
  Flame,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

export const Screen02MyCapaQueue: React.FC = () => {
  const {
    capaList,
    setActiveCapa,
    navigateTo,
    selectedMine
  } = useCorrectiveAction();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  const tabs = [
    'All',
    'Assigned',
    'In Progress',
    'Due Soon',
    'Overdue',
    'Awaiting Evidence',
    'Returned',
    'Submitted'
  ];

  const filteredCapa = capaList.filter(c => {
    if (activeTab === 'Assigned' && c.capaStatus !== 'ASSIGNED') return false;
    if (activeTab === 'In Progress' && c.capaStatus !== 'IN PROGRESS') return false;
    if (activeTab === 'Due Soon' && (c.daysRemaining < 0 || c.daysRemaining > 2)) return false;
    if (activeTab === 'Overdue' && c.daysRemaining >= 0) return false;
    if (activeTab === 'Awaiting Evidence' && c.uploadedEvidenceCount >= c.requiredEvidenceCount) return false;
    if (activeTab === 'Returned' && c.capaStatus !== 'RETURNED') return false;
    if (activeTab === 'Submitted' && c.capaStatus !== 'AWAITING VERIFICATION') return false;

    if (selectedPriority !== 'All' && c.priority !== selectedPriority) return false;
    if (selectedDepartment !== 'All' && !c.department.includes(selectedDepartment)) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.actionTitle.toLowerCase().includes(q) ||
        c.findingId.toLowerCase().includes(q) ||
        c.mine.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('01')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Dashboard</span>
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
              MY CORRECTIVE ACTIONS
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CORRECTIVE ACTION (CAPA) WORK QUEUE
          </h1>
          <p className="screen-subtitle">
            Assigned corrective actions, task schedules, evidence tracking, and statutory compliance status
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setActiveCapa(capaList[0]);
            navigateTo('03');
          }}
          style={{ background: '#00695C', borderColor: '#004D40' }}
        >
          <span>View Intake Dossier (Screen 03)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Tabs */}
      <div
        className="card"
        style={{
          padding: '8px 12px',
          marginBottom: '14px',
          display: 'flex',
          gap: '4px',
          overflowX: 'auto'
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              background: activeTab === tab ? '#00695C' : 'transparent',
              color: activeTab === tab ? '#FFF' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: activeTab === tab ? 700 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters Bar */}
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
            placeholder="Search CAPA ID, Action Title, Finding Ref, Owner..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>

        <div>
          <select
            className="form-control"
            value={selectedPriority}
            onChange={e => setSelectedPriority(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <div>
          <select
            className="form-control"
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Departments</option>
            <option value="Ventilation">Ventilation</option>
            <option value="Strata">Strata Control</option>
            <option value="Electrical">Electrical</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>CAPA ID</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th>Action Title & Scope</th>
              <th style={{ width: '100px' }}>Mine</th>
              <th style={{ width: '100px' }}>Priority</th>
              <th style={{ width: '180px' }}>Owner & Dept</th>
              <th style={{ width: '110px' }}>Due Date</th>
              <th style={{ width: '130px' }}>Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCapa.map(capa => {
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
                    <span className="id-badge font-mono" style={{ background: 'rgba(0, 105, 92, 0.15)', color: '#004D40' }}>
                      {capa.id}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-subtle font-mono">{capa.findingId}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                      {capa.actionTitle}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {capa.actionDescription.substring(0, 75)}...
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{capa.mine}</span>
                  </td>
                  <td>
                    <span className={`badge ${isCrit ? 'badge-danger font-bold' : isHigh ? 'badge-warning font-bold' : 'badge-subtle'}`}>
                      {capa.priority}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{capa.owner}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{capa.department}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: capa.daysRemaining < 0 ? '#D32F2F' : 'var(--text-primary)' }}>
                      {capa.dueDate}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${capa.capaStatus === 'COMPLETED' ? 'status-completed' : capa.capaStatus === 'BLOCKED' ? 'status-overdue' : 'status-active'}`}>
                      {capa.capaStatus} ({capa.progressPercentage}%)
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
    </div>
  );
};
