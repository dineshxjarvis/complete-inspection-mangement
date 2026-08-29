"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  Archive,
  Search,
  Filter,
  ArrowRight,
  Shield,
  FileText,
  Clock,
  ArrowLeft
} from 'lucide-react';

export const Screen21CompletedHistory: React.FC = () => {
  const { inspections, navigateTo, showToast } = useFieldInspection();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mineFilter, setMineFilter] = useState<string>('All');
  const [trackFilter, setTrackFilter] = useState<string>('All');

  const historyRecords = [
    {
      id: 'INS-2026-0880',
      mine: 'Mine C4',
      date: '14 Nov 2026',
      type: 'Highwall Slope & Dump Stability',
      role: 'Lead Inspector (R. Sharma)',
      findings: 1,
      status: 'Completed & Approved',
      submitted: '14 Nov 2026 15:20 IST'
    },
    {
      id: 'INS-2026-0879',
      mine: 'Mine A2',
      date: '12 Nov 2026',
      type: 'Winding Engine & Brake Governor',
      role: 'Lead Inspector (R. Sharma)',
      findings: 0,
      status: 'Completed & Approved',
      submitted: '12 Nov 2026 16:45 IST'
    },
    {
      id: 'INS-2026-0875',
      mine: 'Mine D1',
      date: '08 Nov 2026',
      type: 'Continuous Miner Strata Control',
      role: 'Supporting Inspector (R. Sharma)',
      findings: 2,
      status: 'Completed & Approved',
      submitted: '08 Nov 2026 17:10 IST'
    }
  ];

  return (
    <div className="screen-content" style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-info">HISTORICAL REPOSITORY</span>
            <span className="badge badge-subtle">STATUTORY ARCHIVE</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            COMPLETED INSPECTION ARCHIVE
          </h1>
          <p className="screen-subtitle">
            Searchable historical archive of formally submitted, reviewed, and finalized field inspections
          </p>
        </div>

        <button className="btn btn-secondary" onClick={() => navigateTo('02')}>
          <ArrowLeft size={14} />
          <span>My Inspections</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search historical records by ID, mine colliery, or inspection type..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <select
          className="form-control"
          value={mineFilter}
          onChange={e => setMineFilter(e.target.value)}
        >
          <option value="All">All Colleries</option>
          <option value="Mine A2">Mine A2</option>
          <option value="Mine C4">Mine C4</option>
          <option value="Mine D1">Mine D1</option>
        </select>

        <select
          className="form-control"
          value={trackFilter}
          onChange={e => setTrackFilter(e.target.value)}
        >
          <option value="All">All Statutory Tracks</option>
          <option value="Safety">Safety Track</option>
          <option value="Statutory">Statutory Track</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ minWidth: '130px' }}>Inspection ID</th>
                <th style={{ minWidth: '180px' }}>Colliery & Mine</th>
                <th style={{ minWidth: '120px' }}>Inspection Date</th>
                <th style={{ minWidth: '180px' }}>Inspection Type</th>
                <th style={{ minWidth: '130px' }}>Role / Inspector</th>
                <th style={{ minWidth: '130px' }}>Statutory Findings</th>
                <th style={{ minWidth: '120px' }}>Approval Status</th>
                <th style={{ minWidth: '140px' }}>Submitted Timestamp</th>
                <th style={{ minWidth: '120px', textAlign: 'right' }}>Record Action</th>
              </tr>
            </thead>
            <tbody>
              {historyRecords.map(rec => (
                <tr key={rec.id}>
                  <td>
                    <span className="id-badge font-mono" style={{ fontWeight: 700 }}>
                      {rec.id}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{rec.mine}</span>
                  </td>
                  <td>{rec.date}</td>
                  <td>{rec.type}</td>
                  <td>{rec.role}</td>
                  <td>
                    <span className={`badge ${rec.findings > 0 ? 'badge-danger' : 'badge-success'}`}>
                      {rec.findings} {rec.findings === 1 ? 'Finding' : 'Findings'}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill status-completed">
                      ✓ {rec.status}
                    </span>
                  </td>
                  <td>
                    <span className="timestamp font-mono" style={{ fontSize: '11px' }}>
                      {rec.submitted}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        showToast(`Opening read-only statutory dossier for ${rec.id}`, 'info');
                        navigateTo('03');
                      }}
                    >
                      <FileText size={12} />
                      <span>View Dossier</span>
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
