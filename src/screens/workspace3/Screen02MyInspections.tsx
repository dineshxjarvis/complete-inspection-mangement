"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import { InspectionStatus } from '../../types/fieldInspection';
import {
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  RotateCcw,
  PauseCircle,
  PlayCircle,
  Users,
  Shield
} from 'lucide-react';

export const Screen02MyInspections: React.FC = () => {
  const { inspections, navigateTo, activeInspection } = useFieldInspection();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMine, setSelectedMine] = useState<string>('All');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<string>('All');

  const tabs = [
    'All',
    'Scheduled',
    'Ready',
    'In Progress',
    'Paused',
    'Draft',
    'Submitted',
    'Returned',
    'Completed'
  ];

  const filteredInspections = inspections.filter(insp => {
    if (activeTab !== 'All' && insp.status !== activeTab) return false;
    if (selectedMine !== 'All' && insp.mine !== selectedMine) return false;
    if (selectedTrack !== 'All' && insp.track !== selectedTrack) return false;
    if (selectedRole !== 'All' && insp.role !== selectedRole) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        insp.id.toLowerCase().includes(q) ||
        insp.mine.toLowerCase().includes(q) ||
        insp.type.toLowerCase().includes(q) ||
        insp.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleActionClick = (insp: typeof inspections[0]) => {
    if (insp.status === 'Ready') navigateTo('03');
    else if (insp.status === 'In Progress') navigateTo('07');
    else if (insp.status === 'Paused') navigateTo('11A');
    else if (insp.status === 'Returned') navigateTo('18');
    else navigateTo('03');
  };

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="screen-header">
        <div>
          <h1 className="screen-title">MY FIELD INSPECTIONS</h1>
          <p className="screen-subtitle">
            Statutory field assignments, active execution records and historical submissions
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigateTo('03')}
          style={{ background: '#FF6B00', borderColor: '#FF6B00' }}
        >
          <PlayCircle size={14} />
          <span>Execute Current: {activeInspection.id}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '12px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Inspection ID, mine colliery, seam or equipment..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="form-control"
          value={selectedMine}
          onChange={e => setSelectedMine(e.target.value)}
        >
          <option value="All">All Mines (ECL & BCCL)</option>
          <option value="Mine A2">Mine A2 (Seam VII)</option>
          <option value="Mine B1">Mine B1 (Seam IV)</option>
          <option value="Mine C4">Mine C4 (Pit 2)</option>
          <option value="Mine D1">Mine D1 (Seam XI)</option>
        </select>

        <select
          className="form-control"
          value={selectedTrack}
          onChange={e => setSelectedTrack(e.target.value)}
        >
          <option value="All">All Tracks</option>
          <option value="Safety">Safety Track</option>
          <option value="Statutory">Statutory Track</option>
        </select>

        <select
          className="form-control"
          value={selectedRole}
          onChange={e => setSelectedRole(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Lead Inspector">Lead Inspector</option>
          <option value="Supporting Inspector">Supporting Inspector</option>
        </select>
      </div>

      {/* Status Tabs */}
      <div className="filter-tabs" style={{ marginBottom: '16px' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ minWidth: '130px' }}>Inspection ID</th>
                <th style={{ minWidth: '180px' }}>Mine / Location</th>
                <th style={{ minWidth: '90px' }}>Track</th>
                <th style={{ minWidth: '180px' }}>Type</th>
                <th style={{ minWidth: '130px' }}>Scheduled Date</th>
                <th style={{ minWidth: '130px' }}>Your Role</th>
                <th style={{ minWidth: '150px' }}>Team Composition</th>
                <th style={{ minWidth: '110px' }}>Status</th>
                <th style={{ minWidth: '120px' }}>Last Updated</th>
                <th style={{ minWidth: '130px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInspections.map(insp => (
                <tr key={insp.id}>
                  <td>
                    <span className="id-badge font-mono" style={{ fontWeight: 700 }}>
                      {insp.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{insp.mine}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{insp.location}</div>
                  </td>
                  <td>
                    <span className="badge badge-subtle">{insp.track}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 500 }}>{insp.type}</span>
                  </td>
                  <td>
                    <div>{insp.date}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{insp.timeWindow}</div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {insp.role}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ display: 'flex', marginLeft: '4px' }}>
                        {insp.team.map(m => (
                          <div
                            key={m.id}
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              background: '#311B92',
                              color: '#FFF',
                              fontSize: '9.5px',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: '-4px',
                              border: '1.5px solid var(--bg-surface)'
                            }}
                            title={`${m.name} (${m.role})`}
                          >
                            {m.avatar}
                          </div>
                        ))}
                      </div>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                        {insp.team.length} {insp.team.length === 1 ? 'Inspector' : 'Members'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`status-pill status-${
                        insp.status === 'Ready'
                          ? 'scheduled'
                          : insp.status === 'In Progress'
                          ? 'active'
                          : insp.status === 'Paused'
                          ? 'pending'
                          : insp.status === 'Returned'
                          ? 'rejected'
                          : 'completed'
                      }`}
                    >
                      {insp.status}
                    </span>
                  </td>
                  <td>
                    <span className="timestamp font-mono" style={{ fontSize: '11px' }}>
                      {insp.startedAt || '15 Nov 10:30'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleActionClick(insp)}
                      style={{
                        background: insp.status === 'Ready' ? '#FF6B00' : undefined,
                        color: insp.status === 'Ready' ? '#FFF' : undefined,
                        borderColor: insp.status === 'Ready' ? '#FF6B00' : undefined
                      }}
                    >
                      <span>
                        {insp.status === 'Ready'
                          ? 'Start Brief'
                          : insp.status === 'In Progress'
                          ? 'Resume Checklist'
                          : insp.status === 'Paused'
                          ? 'View Paused'
                          : insp.status === 'Returned'
                          ? 'Review Return'
                          : 'View Record'}
                      </span>
                      <ArrowRight size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
