"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  Clock,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Users,
  ExternalLink
} from 'lucide-react';

export const Screen16ActiveAssignments: React.FC = () => {
  const { inspections, navigateTo } = useAssignment();
  const [searchTerm, setSearchTerm] = useState('');

  const assignedInspections = inspections.filter(i => i.status === 'Assigned' || i.status === 'Partially Assigned' || i.status === 'Reassignment Required');

  const kpis = [
    { label: 'Total Assigned', value: assignedInspections.length.toString(), primary: true },
    { label: 'Fully Accepted', value: assignedInspections.filter(i => i.acceptance.acceptedCount >= i.acceptance.totalRequired && i.acceptance.totalRequired > 0).length.toString(), success: true },
    { label: 'Awaiting Acceptance', value: assignedInspections.filter(i => i.acceptance.acceptedCount < i.acceptance.totalRequired && i.status !== 'Reassignment Required').length.toString(), warning: true },
    { label: 'Declined / Reassign Req.', value: assignedInspections.filter(i => i.status === 'Reassignment Required').length.toString(), danger: true }
  ];

  let filtered = assignedInspections;
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    filtered = filtered.filter(i =>
      i.id.toLowerCase().includes(q) ||
      i.mine.toLowerCase().includes(q) ||
      (i.assignedTeam.leadInspector?.name && i.assignedTeam.leadInspector.name.toLowerCase().includes(q))
    );
  }

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Active Team Assignments</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Clock size={20} color="var(--purple-primary)" />
            <span>Active Team Assignments & Field Deployment Monitor</span>
          </h1>
          <p className="screen-subtitle">
            Live monitoring of dispatched inspection rosters, personnel acceptance confirmations, and field execution status.
          </p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="kpi-row" style={{ marginBottom: '16px' }}>
        {kpis.map((k, i) => (
          <div
            key={i}
            className={`kpi-card ${k.danger ? 'kpi-danger' : ''} ${k.warning ? 'kpi-warning' : ''} ${k.primary ? 'kpi-primary' : ''} ${k.success ? 'kpi-completed' : ''}`}
          >
            <span className="kpi-label">{k.label}</span>
            <div className="kpi-val-row">
              <span className="kpi-value">{k.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="filter-bar" style={{ marginBottom: '16px' }}>
        <input
          type="text"
          className="filter-input"
          placeholder="Search inspection, colliery, lead inspector..."
          style={{ minWidth: '240px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="filter-select"><option>Area: Area 01 (Sripur-Kenda)</option></select>
        <select className="filter-select"><option>Status: All Active</option><option>Accepted Only</option><option>Awaiting Acceptance</option><option>Reassignment Required</option></select>
        <button className="btn btn-secondary btn-sm" onClick={() => setSearchTerm('')}>Reset</button>
      </div>

      {/* Active Assignments Table */}
      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">Active Field Deployments ({filtered.length})</span>
        </div>
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Inspection ID</th>
                <th>Mine / Colliery</th>
                <th>Lead Inspector</th>
                <th>Team Size</th>
                <th>Scheduled Date</th>
                <th>Acceptance Status</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((insp) => {
                const teamSize = (insp.assignedTeam.leadInspector ? 1 : 0) + insp.assignedTeam.specialists.length + insp.assignedTeam.supportingInspectors.length;
                const isReassignReq = insp.status === 'Reassignment Required';

                return (
                  <tr key={insp.id} style={{ background: isReassignReq ? '#FFF5F5' : '#FFFFFF' }}>
                    <td>
                      <strong
                        className="font-mono"
                        style={{ color: 'var(--purple-primary)', cursor: 'pointer' }}
                        onClick={() => navigateTo('05', { inspectionId: insp.id })}
                      >
                        {insp.id}
                      </strong>
                    </td>
                    <td>{insp.mine.split('(')[0]}</td>
                    <td>
                      <strong>{insp.assignedTeam.leadInspector?.name || 'Pending Lead'}</strong>
                    </td>
                    <td className="font-mono">{teamSize} Personnel</td>
                    <td className="font-mono">{insp.scheduledDate}</td>
                    <td>
                      <span className={`badge ${insp.acceptance.acceptedCount >= insp.acceptance.totalRequired ? 'badge-completed' : isReassignReq ? 'badge-rejected' : 'badge-planned'}`}>
                        {insp.acceptance.statusText}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${isReassignReq ? 'badge-rejected' : 'badge-completed'}`}>
                        <span className="badge-dot" />{isReassignReq ? 'REASSIGNMENT REQ.' : 'ASSIGNED (READY)'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {isReassignReq ? (
                          <button
                            className="btn btn-primary btn-sm"
                            style={{ background: '#DC2626', borderColor: '#B91C1C' }}
                            onClick={() => navigateTo('13', { inspectionId: insp.id })}
                          >
                            <RotateCcw size={12} /> Reassign
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => navigateTo('05', { inspectionId: insp.id })}
                          >
                            Open Roster
                          </button>
                        )}
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => navigateTo('08', { inspectionId: insp.id })}
                          title="View Pre-Inspection Brief"
                        >
                          Brief
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
