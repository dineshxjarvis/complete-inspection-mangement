"use client";

import React, { useState } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  Layers,
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const Screen16CapaRegister: React.FC = () => {
  const {
    capaList,
    setActiveCapa,
    navigateTo,
    selectedMine
  } = useCorrectiveAction();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const filteredCapa = capaList.filter(c => {
    if (selectedStatus !== 'All' && c.capaStatus !== selectedStatus) return false;
    if (selectedDept !== 'All' && !c.department.includes(selectedDept)) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.findingId.toLowerCase().includes(q) ||
        c.actionTitle.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q) ||
        c.mine.toLowerCase().includes(q)
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
              STATUTORY REGISTER
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CENTRAL CORRECTIVE ACTION (CAPA) REGISTER
          </h1>
          <p className="screen-subtitle">
            Master multi-colliery ledger of all active, in-progress, blocked, and completed corrective actions across Singrauli Division
          </p>
        </div>
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
            placeholder="Search CAPA ID, Finding, Action Title, Owner..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>

        <div>
          <select
            className="form-control"
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Statuses</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="BLOCKED">Blocked</option>
            <option value="AWAITING VERIFICATION">Awaiting Verification</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div>
          <select
            className="form-control"
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
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

      {/* Master Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>CAPA ID</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th style={{ width: '100px' }}>Mine</th>
              <th>Action Title & Scope</th>
              <th style={{ width: '160px' }}>Owner & Dept</th>
              <th style={{ width: '90px' }}>Priority</th>
              <th style={{ width: '100px' }}>Assigned</th>
              <th style={{ width: '100px' }}>Due Date</th>
              <th style={{ width: '130px' }}>Status</th>
              <th style={{ width: '110px' }}>Verification</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCapa.map(capa => (
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
                  <span style={{ fontWeight: 600 }}>{capa.mine}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                    {capa.actionTitle}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{capa.owner}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{capa.department}</div>
                </td>
                <td>
                  <span className={`badge ${capa.priority === 'CRITICAL' ? 'badge-danger font-bold' : capa.priority === 'HIGH' ? 'badge-warning font-bold' : 'badge-subtle'}`}>
                    {capa.priority}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{capa.assignedDate}</span>
                </td>
                <td>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: capa.daysRemaining < 0 ? '#D32F2F' : 'var(--text-primary)' }}>
                    {capa.dueDate}
                  </span>
                </td>
                <td>
                  <span className={`status-pill ${capa.capaStatus === 'COMPLETED' ? 'status-completed' : capa.capaStatus === 'BLOCKED' ? 'status-overdue' : 'status-active'}`}>
                    {capa.capaStatus}
                  </span>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '10.5px' }}>
                    {capa.complianceStatus}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
