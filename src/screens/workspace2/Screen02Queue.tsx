"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import { Inbox, UserPlus } from 'lucide-react';

export const Screen02Queue: React.FC = () => {
  const { inspections, navigateTo } = useAssignment();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Unassigned', 'Partially Assigned', 'Team Incomplete', 'Conflict', 'Assigned', 'Starting Soon'];

  let filtered = inspections;
  if (activeTab !== 'All') {
    filtered = filtered.filter(i => i.status.toLowerCase() === activeTab.toLowerCase());
  }
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    filtered = filtered.filter(i =>
      i.id.toLowerCase().includes(q) ||
      i.mine.toLowerCase().includes(q) ||
      i.inspectionType.toLowerCase().includes(q)
    );
  }

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Assignment Queue</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Inbox size={20} color="var(--purple-primary)" />
            Assignment Queue
          </h1>
          <p className="screen-subtitle">
            Scheduled inspections requiring personnel assignment, lead inspector appointment, and specialist team building.
          </p>
        </div>
      </div>

      {/* Multi-Dimensional Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          className="filter-input"
          placeholder="Search Inspection ID, Mine, Track..."
          style={{ minWidth: '220px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="filter-select"><option>Authority: All Authorities</option><option>DGMS / Safety Board</option></select>
        <select className="filter-select"><option>Track: All Tracks</option><option>Safety & Occupational Health</option><option>Electrical</option></select>
        <select className="filter-select"><option>Area: Area 01 (Sripur-Kenda)</option></select>
        <select className="filter-select"><option>Mine: All Mines</option><option>Mine A2</option><option>Mine B1</option><option>Mine C4</option></select>
        <select className="filter-select"><option>Risk: All</option><option>High Risk Only</option></select>
        <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setSearchTerm('')}>Reset</button>
      </div>

      {/* 7 Status Tabs */}
      <div className="tabs-nav">
        {tabs.map((t) => {
          const count = t === 'All'
            ? inspections.length
            : inspections.filter(i => i.status.toLowerCase() === t.toLowerCase()).length;
          return (
            <button
              key={t}
              className={`tab-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t} <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Queue Table */}
      <div className="enterprise-card">
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Inspection ID</th>
                <th>Mine</th>
                <th>Inspection Type</th>
                <th>Date</th>
                <th>Risk</th>
                <th>Required Team</th>
                <th>Assigned</th>
                <th>Missing</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((insp) => {
                const assignedCount = (insp.assignedTeam.leadInspector ? 1 : 0) + insp.assignedTeam.specialists.length;
                const totalReq = insp.requiredTeam.leadInspectorCount + insp.requiredTeam.specialistsRequired.length;
                const missingCount = Math.max(0, totalReq - assignedCount);

                return (
                  <tr key={insp.id}>
                    <td>
                      <strong
                        className="font-mono"
                        style={{ color: 'var(--purple-primary)', cursor: 'pointer' }}
                        onClick={() => navigateTo('03', { inspectionId: insp.id })}
                      >
                        {insp.id}
                      </strong>
                    </td>
                    <td>{insp.mine.split('(')[0]}</td>
                    <td><strong>{insp.inspectionType}</strong></td>
                    <td className="font-mono">{insp.scheduledDate}</td>
                    <td>
                      <span className={`badge ${insp.risk === 'High' ? 'badge-high' : 'badge-medium'}`}>
                        <span className="badge-dot" />{insp.risk}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-draft">
                        Lead + {insp.requiredTeam.competencyList.join(' + ')}
                      </span>
                    </td>
                    <td className="font-mono"><strong>{assignedCount}/{totalReq}</strong></td>
                    <td className="font-mono" style={{ color: missingCount > 0 ? 'var(--status-red-text)' : 'var(--status-green-text)', fontWeight: 700 }}>
                      {missingCount}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          insp.status === 'Assigned'
                            ? 'badge-completed'
                            : insp.status === 'Partially Assigned'
                            ? 'badge-planned'
                            : 'badge-awaiting'
                        }`}
                      >
                        <span className="badge-dot" />{insp.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => navigateTo('03', { inspectionId: insp.id })}
                        >
                          Preview
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            if (insp.status === 'Partially Assigned') {
                              navigateTo('05', { inspectionId: insp.id });
                            } else {
                              navigateTo('04', { inspectionId: insp.id });
                            }
                          }}
                        >
                          {insp.status === 'Partially Assigned' ? 'Continue' : 'Assign'}
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
