"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  History,
  Search,
  Filter,
  Shield,
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';

export const Screen12History: React.FC = () => {
  const { historyEvents, navigateTo } = useAssignment();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All');

  let filtered = historyEvents;
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    filtered = filtered.filter(e =>
      e.inspectionId.toLowerCase().includes(q) ||
      e.personName.toLowerCase().includes(q) ||
      e.inspectionRole.toLowerCase().includes(q) ||
      (e.reason && e.reason.toLowerCase().includes(q))
    );
  }
  if (actionFilter !== 'All') {
    filtered = filtered.filter(e => e.action.toLowerCase() === actionFilter.toLowerCase());
  }

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Assignment History & Immutable Audit Ledger</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <History size={20} color="var(--purple-primary)" />
            <span>Assignment History & Statutory Audit Ledger</span>
          </h1>
          <p className="screen-subtitle">
            Immutable chronological record of all personnel appointments, specialists attached, reassignments, and inspector acceptances under CMR 2017.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('17')}>
            <Shield size={14} /> Full Audit Activity Feed (Screen 17)
          </button>
        </div>
      </div>

      {/* Multi-Dimensional Filter Bar */}
      <div className="filter-bar" style={{ marginBottom: '16px' }}>
        <input
          type="text"
          className="filter-input"
          placeholder="Search by Inspection ID, Inspector, Role, Reason..."
          style={{ minWidth: '260px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="filter-select" value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}>
          <option value="All">All Actions</option>
          <option value="Assigned">Assigned</option>
          <option value="Added">Added (Specialist)</option>
          <option value="Reassigned">Reassigned</option>
          <option value="Accepted">Accepted</option>
          <option value="Declined">Declined</option>
        </select>
        <select className="filter-select"><option>Role: All Roles</option><option>Lead Inspector</option><option>Specialist</option></select>
        <button className="btn btn-secondary btn-sm" onClick={() => { setSearchTerm(''); setActionFilter('All'); }}>
          Reset Filters
        </button>
      </div>

      {/* History Ledger Table */}
      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">
            Statutory Assignment Audit Log ({filtered.length} Recorded Events)
          </span>
          <span className="badge badge-completed">Cryptographically Verified</span>
        </div>
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Inspection ID</th>
                <th>Person Name</th>
                <th>Inspection Role</th>
                <th>Action</th>
                <th>Previous Person</th>
                <th>New Person</th>
                <th>Reason / Justification</th>
                <th>Authorized Officer</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((evt) => (
                <tr key={evt.id}>
                  <td className="font-mono" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                    {evt.timestamp}
                  </td>
                  <td>
                    <strong
                      className="font-mono"
                      style={{ color: 'var(--purple-primary)', cursor: 'pointer' }}
                      onClick={() => navigateTo('05', { inspectionId: evt.inspectionId })}
                    >
                      {evt.inspectionId}
                    </strong>
                  </td>
                  <td>
                    <strong>{evt.personName}</strong>
                  </td>
                  <td>
                    <span className="badge badge-draft" style={{ fontSize: '10px' }}>{evt.inspectionRole}</span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        evt.action === 'Assigned'
                          ? 'badge-completed'
                          : evt.action === 'Reassigned'
                          ? 'badge-planned'
                          : evt.action === 'Declined'
                          ? 'badge-rejected'
                          : 'badge-completed'
                      }`}
                    >
                      {evt.action}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{evt.previousPerson || '—'}</td>
                  <td>
                    <strong style={{ color: 'var(--text-primary)' }}>{evt.newPerson || evt.personName}</strong>
                  </td>
                  <td style={{ fontSize: '11px', maxWidth: '240px', lineHeight: 1.4 }}>
                    {evt.reason}
                  </td>
                  <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {evt.changedBy}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px' }}>
                    No assignment events match the current filter parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
