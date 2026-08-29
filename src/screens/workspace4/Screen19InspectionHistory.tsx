"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  History,
  Search,
  Filter,
  Eye,
  Calendar,
  Lock,
  ChevronLeft,
  ArrowRight,
  Shield,
  FileText
} from 'lucide-react';

export const Screen19InspectionHistory: React.FC = () => {
  const {
    inspections,
    setActiveInspection,
    navigateTo,
    selectedMine
  } = useMineResponse();

  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedAuthority, setSelectedAuthority] = useState<string>('All');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredInspections = inspections.filter(insp => {
    if (selectedAuthority !== 'All' && insp.authority !== selectedAuthority) return false;
    if (selectedTrack !== 'All' && insp.track !== selectedTrack) return false;
    if (selectedStatus !== 'All' && insp.status !== selectedStatus) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        insp.id.toLowerCase().includes(q) ||
        insp.type.toLowerCase().includes(q) ||
        insp.location.toLowerCase().includes(q) ||
        insp.leadInspector.name.toLowerCase().includes(q)
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
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B'
              }}
            >
              WORKSPACE 04 &bull; ARCHIVES
            </span>
            <span className="badge badge-subtle">{selectedMine}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY INSPECTION HISTORY & ARCHIVE
          </h1>
          <p className="screen-subtitle">
            Multi-year historical compliance ledger &bull; Official inspection archives and closed statutory findings
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Lock size={14} color="#00796B" />
          <span style={{ fontSize: '12px', color: '#004D40', fontWeight: 600 }}>
            All historical records sealed & read-only
          </span>
        </div>
      </div>

      {/* Filter Bar (8 Filters) */}
      <div
        className="card"
        style={{
          padding: '14px',
          marginBottom: '16px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: '10px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search Inspection ID, Type, Seam..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>

        <div>
          <select
            className="form-control"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="2026">Year: 2026 (Active)</option>
            <option value="2025">Year: 2025</option>
            <option value="2024">Year: 2024</option>
          </select>
        </div>

        <div>
          <select
            className="form-control"
            value={selectedAuthority}
            onChange={e => setSelectedAuthority(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Authorities</option>
            <option value="Internal">Internal Audit</option>
            <option value="DGMS">DGMS Inspectorate</option>
            <option value="CIL Headquarter">CIL HQ</option>
          </select>
        </div>

        <div>
          <select
            className="form-control"
            value={selectedTrack}
            onChange={e => setSelectedTrack(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Tracks</option>
            <option value="Safety">Safety</option>
            <option value="Statutory">Statutory</option>
            <option value="Environmental">Environmental</option>
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
            <option value="Completed">Completed</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Historical Inspection Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '120px' }}>Date</th>
              <th style={{ width: '140px' }}>Inspection ID</th>
              <th style={{ width: '120px' }}>Authority</th>
              <th>Inspection Type & Scope</th>
              <th style={{ width: '140px' }}>Lead Inspector</th>
              <th style={{ width: '100px' }}>Findings</th>
              <th style={{ width: '130px' }}>Status</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInspections.map(insp => (
              <tr
                key={insp.id}
                onClick={() => {
                  setActiveInspection(insp);
                  navigateTo('03');
                }}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {insp.date}
                  </span>
                </td>
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(0, 137, 123, 0.15)', color: '#00796B' }}>
                    {insp.id}
                  </span>
                </td>
                <td>
                  <span className="badge badge-info">{insp.authority}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                    {insp.type}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {insp.location}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {insp.leadInspector.name}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                    {insp.leadInspector.designation.split(' ')[0]}
                  </div>
                </td>
                <td>
                  <span
                    className={`badge ${insp.findingsCount > 0 ? 'badge-danger font-mono' : 'badge-success'}`}
                    style={{ fontSize: '11px' }}
                  >
                    {insp.findingsCount > 0 ? `${insp.findingsCount} Findings` : '0 Findings'}
                  </span>
                </td>
                <td>
                  <span className={`status-pill status-${insp.status.toLowerCase()}`}>
                    {insp.status === 'Completed' ? '✓ Completed' : insp.status}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      setActiveInspection(insp);
                      navigateTo('03');
                    }}
                    style={{ padding: '3px 8px' }}
                  >
                    <Eye size={12} />
                    <span>View Dossier</span>
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
