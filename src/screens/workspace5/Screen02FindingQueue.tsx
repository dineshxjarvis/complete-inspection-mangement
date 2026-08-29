"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  Inbox,
  Search,
  Filter,
  Eye,
  Calendar,
  AlertTriangle,
  Flame,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

export const Screen02FindingQueue: React.FC = () => {
  const {
    findings,
    setActiveFinding,
    navigateTo,
    selectedMine
  } = useRegulatoryAction();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const tabs = [
    'All',
    'New',
    'Confirmed',
    'Critical',
    'High',
    'Action Required',
    'Under Action',
    'Escalated',
    'Closed'
  ];

  const filteredFindings = findings.filter(f => {
    if (activeTab === 'New' && f.status !== 'New') return false;
    if (activeTab === 'Confirmed' && f.status !== 'Confirmed') return false;
    if (activeTab === 'Critical' && f.severity !== 'CRITICAL') return false;
    if (activeTab === 'High' && f.severity !== 'HIGH') return false;
    if (activeTab === 'Action Required' && (!f.actionRequired || f.status === 'Closed')) return false;
    if (activeTab === 'Under Action' && f.status !== 'Under Action') return false;
    if (activeTab === 'Escalated' && f.status !== 'Escalated') return false;
    if (activeTab === 'Closed' && f.status !== 'Closed') return false;

    if (selectedSeverity !== 'All' && f.severity !== selectedSeverity) return false;
    if (selectedType !== 'All' && f.findingType !== selectedType) return false;
    if (selectedStatus !== 'All' && f.status !== selectedStatus) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        f.id.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        f.mine.toLowerCase().includes(q) ||
        f.inspectionId.toLowerCase().includes(q) ||
        f.regulatoryBasisId.toLowerCase().includes(q) ||
        f.issueDescription.toLowerCase().includes(q)
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
                background: 'rgba(63, 81, 181, 0.15)',
                color: '#1A237E'
              }}
            >
              FINDING QUEUE
            </span>
            <span className="badge badge-subtle">{selectedMine}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY FINDINGS REGISTER & QUEUE
          </h1>
          <p className="screen-subtitle">
            Master register of all field-confirmed non-compliances, statutory classifications, and regulatory action statuses
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setActiveFinding(findings[0]);
            navigateTo('04');
          }}
          style={{ background: '#1A237E', borderColor: '#303F9F' }}
        >
          <Eye size={13} />
          <span>View Primary Finding (FND-2026-00127)</span>
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
              background: activeTab === tab ? '#1A237E' : 'transparent',
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

      {/* Filter Bar */}
      <div
        className="card"
        style={{
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '10px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search Finding ID, Title, Regulation, Mine, Inspection..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>

        <div>
          <select
            className="form-control"
            value={selectedSeverity}
            onChange={e => setSelectedSeverity(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <div>
          <select
            className="form-control"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Finding Types</option>
            <option value="Safety Non-Compliance">Safety Non-Compliance</option>
            <option value="Environmental Non-Compliance">Environmental</option>
            <option value="Regulatory Violation">Regulatory Violation</option>
            <option value="Documentation Non-Compliance">Documentation</option>
          </select>
        </div>

        <div>
          <select
            className="form-control"
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Under Action">Under Action</option>
            <option value="Escalated">Escalated</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Findings Register Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Finding ID</th>
              <th>Finding Title & Issue Scope</th>
              <th style={{ width: '100px' }}>Mine</th>
              <th style={{ width: '120px' }}>Inspection</th>
              <th style={{ width: '100px' }}>Severity</th>
              <th style={{ width: '140px' }}>Regulatory Basis</th>
              <th style={{ width: '110px' }}>Status</th>
              <th style={{ width: '110px' }}>Action</th>
              <th style={{ width: '110px' }}>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredFindings.map(fnd => {
              const isCrit = fnd.severity === 'CRITICAL';
              return (
                <tr
                  key={fnd.id}
                  onClick={() => {
                    setActiveFinding(fnd);
                    navigateTo('04');
                  }}
                  style={{
                    backgroundColor: isCrit ? 'rgba(211, 47, 47, 0.04)' : undefined,
                    cursor: 'pointer'
                  }}
                >
                  <td>
                    <span
                      className="id-badge font-mono"
                      style={{
                        background: isCrit ? 'rgba(211, 47, 47, 0.15)' : 'rgba(63, 81, 181, 0.15)',
                        color: isCrit ? '#D32F2F' : '#1A237E'
                      }}
                    >
                      {fnd.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                      {fnd.title}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {fnd.issueDescription.substring(0, 80)}...
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{fnd.mine}</span>
                  </td>
                  <td>
                    <span className="badge badge-subtle font-mono">{fnd.inspectionId}</span>
                  </td>
                  <td>
                    <span className={`badge ${isCrit ? 'badge-danger font-bold' : fnd.severity === 'HIGH' ? 'badge-warning font-bold' : 'badge-subtle'}`}>
                      {fnd.severity}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-info font-mono" style={{ fontSize: '10.5px' }}>
                      {fnd.regulatoryBasisId}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill status-active" style={{ fontSize: '10.5px' }}>
                      ✓ {fnd.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${fnd.actionRequired ? 'badge-danger' : 'badge-subtle'}`}>
                      {fnd.actionRequired ? 'REQUIRED' : 'NONE'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: fnd.daysRemaining < 0 ? '#D32F2F' : 'var(--text-primary)' }}>
                      {fnd.dueDate}
                    </span>
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
