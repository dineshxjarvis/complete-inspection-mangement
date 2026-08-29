"use client";

import React, { useState } from 'react';
import { useStrata } from '../context/StrataContext';
import { Plus } from 'lucide-react';

export const Screen02Intake: React.FC = () => {
  const { data, navigateTo, activeIntakeTab, setIntakeTab } = useStrata();
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = ['All', 'New', 'Under Review', 'Accepted', 'Rejected', 'Converted to Recommendation', 'Converted to Plan'];

  let filtered = data.intakeRequests;
  if (activeIntakeTab !== 'All') {
    filtered = filtered.filter(r => r.status.toLowerCase() === activeIntakeTab.toLowerCase());
  }
  if (searchTerm.trim()) {
    const query = searchTerm.toLowerCase();
    filtered = filtered.filter(r =>
      r.id.toLowerCase().includes(query) ||
      r.scope.mine.toLowerCase().includes(query) ||
      r.reason.toLowerCase().includes(query)
    );
  }

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Inspection Intake</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">Inspection Intake</h1>
          <p className="screen-subtitle">
            Review incoming inspection triggers, management requests, compliance engine signals, and DGMS notices before plan conversion.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-primary" onClick={() => navigateTo('03A')}>
            <Plus size={14} /> Create Inspection Request
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          className="filter-input"
          placeholder="Search Request ID, Mine, Reason..."
          style={{ minWidth: '240px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="filter-select">
          <option>All Sources (Internal, Mine Mgmt, Compliance, DGMS)</option>
          <option>Mine Management</option>
          <option>Compliance Engine</option>
          <option>Senior Authority / DGMS</option>
        </select>
        <select className="filter-select">
          <option>All Priority (Critical, High, Medium, Low)</option>
          <option>High / Critical</option>
          <option>Medium</option>
        </select>
        <select className="filter-select">
          <option>Subsidiary: ECL</option>
          <option>BCCL</option>
          <option>CCL</option>
        </select>
        <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setSearchTerm('')}>
          Reset Filters
        </button>
      </div>

      {/* Status Tabs */}
      <div className="tabs-nav">
        {tabs.map((t) => {
          const count = t === 'All'
            ? data.intakeRequests.length
            : data.intakeRequests.filter(r => r.status.toLowerCase() === t.toLowerCase()).length;

          return (
            <button
              key={t}
              className={`tab-btn ${activeIntakeTab === t ? 'active' : ''}`}
              onClick={() => setIntakeTab(t)}
            >
              {t} <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="enterprise-card">
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Source</th>
                <th>Inspection Type</th>
                <th>Mine / Scope</th>
                <th>Reason</th>
                <th>Priority</th>
                <th>Requested By</th>
                <th>Received</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong
                      className="font-mono"
                      style={{ color: 'var(--purple-primary)', cursor: 'pointer' }}
                      onClick={() => navigateTo('03B', { requestId: r.id })}
                    >
                      {r.id}
                    </strong>
                  </td>
                  <td><span className="badge badge-draft">{r.source}</span></td>
                  <td><strong>{r.inspectionType}</strong></td>
                  <td>
                    {r.scope.mine.split('(')[0]}
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{r.scope.location}</div>
                  </td>
                  <td style={{ maxWidth: '220px' }}>{r.reason}</td>
                  <td>
                    <span
                      className={`badge ${
                        r.priority === 'Critical'
                          ? 'badge-critical'
                          : r.priority === 'High'
                          ? 'badge-high'
                          : 'badge-medium'
                      }`}
                    >
                      <span className="badge-dot" />{r.priority}
                    </span>
                  </td>
                  <td>
                    {r.requester}
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{r.designation}</div>
                  </td>
                  <td className="font-mono">{r.received}</td>
                  <td>
                    <span
                      className={`badge ${
                        r.status === 'New'
                          ? 'badge-new'
                          : r.status === 'Accepted'
                          ? 'badge-accepted'
                          : r.status === 'Rejected'
                          ? 'badge-rejected'
                          : 'badge-converted'
                      }`}
                    >
                      <span className="badge-dot" />{r.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigateTo('03B', { requestId: r.id })}
                      >
                        {r.status === 'New' ? 'Review' : 'View'}
                      </button>
                      {r.status === 'Accepted' && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigateTo('04')}
                        >
                          To Rec
                        </button>
                      )}
                    </div>
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
