"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  Search,
  Filter,
  ArrowRight,
  Shield,
  Calendar,
  Layers,
  CheckCircle,
  FileText
} from 'lucide-react';

export const Screen02MineInspections: React.FC = () => {
  const { inspections, navigateTo, setActiveInspection, selectedMine } = useMineResponse();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedAuthority, setSelectedAuthority] = useState<string>('All');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');

  const tabs = [
    'All',
    'Upcoming',
    'Active',
    'Submitted',
    'Under Review',
    'Completed',
    'External / Regulatory'
  ];

  const filteredInspections = inspections.filter(insp => {
    if (activeTab === 'Upcoming' && insp.status !== 'Scheduled') return false;
    if (activeTab === 'Active' && insp.status !== 'Active') return false;
    if (activeTab === 'Completed' && insp.status !== 'Completed') return false;
    if (activeTab === 'External / Regulatory' && insp.authority !== 'DGMS') return false;

    if (selectedType !== 'All' && !insp.type.includes(selectedType)) return false;
    if (selectedAuthority !== 'All' && insp.authority !== selectedAuthority) return false;
    if (selectedTrack !== 'All' && insp.track !== selectedTrack) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
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
      {/* Header */}
      <div className="screen-header">
        <div>
          <h1 className="screen-title">MINE INSPECTIONS &bull; {selectedMine}</h1>
          <p className="screen-subtitle">
            All statutory field inspection records, scheduled audits, and compliance findings for {selectedMine}
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setActiveInspection(inspections[0]);
            navigateTo('03');
          }}
          style={{ background: '#00897B', borderColor: '#00796B' }}
        >
          <FileText size={14} />
          <span>View Primary Dossier (INS-2026-0882)</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div
        className="card filter-bar"
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '12px',
          padding: '14px',
          marginBottom: '16px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Inspection ID, Type, Seam, or Lead Inspector..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="form-control"
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
        >
          <option value="All">All Inspection Types</option>
          <option value="Ventilation">Ventilation & Environmental</option>
          <option value="Electrical">Electrical & Flameproof</option>
          <option value="Slope">Slope & Dump Stability</option>
          <option value="Strata">Strata Control & Support</option>
        </select>

        <select
          className="form-control"
          value={selectedAuthority}
          onChange={e => setSelectedAuthority(e.target.value)}
        >
          <option value="All">All Authorities</option>
          <option value="Internal">Internal Safety Audit</option>
          <option value="DGMS">DGMS Statutory</option>
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
      </div>

      {/* Tabs Strip */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '16px',
          overflowX: 'auto'
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 600,
              color: activeTab === tab ? '#00897B' : 'var(--text-secondary)',
              borderBottom: activeTab === tab ? '2px solid #00897B' : '2px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Inspections Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ minWidth: '130px' }}>Inspection ID</th>
                <th style={{ minWidth: '200px' }}>Inspection Type</th>
                <th style={{ minWidth: '90px' }}>Track</th>
                <th style={{ minWidth: '100px' }}>Authority</th>
                <th style={{ minWidth: '120px' }}>Date</th>
                <th style={{ minWidth: '150px' }}>Lead Inspector</th>
                <th style={{ minWidth: '100px' }}>Findings</th>
                <th style={{ minWidth: '110px' }}>Status</th>
                <th style={{ minWidth: '110px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInspections.map(insp => (
                <tr
                  key={insp.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setActiveInspection(insp);
                    navigateTo('03');
                  }}
                >
                  <td>
                    <span
                      className="id-badge font-mono"
                      style={{
                        background: insp.id === 'INS-2026-0882' ? 'rgba(0, 137, 123, 0.15)' : undefined,
                        color: insp.id === 'INS-2026-0882' ? '#00796B' : undefined,
                        fontWeight: 700
                      }}
                    >
                      {insp.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{insp.type}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{insp.location}</div>
                  </td>
                  <td>
                    <span className="badge badge-subtle">{insp.track}</span>
                  </td>
                  <td>
                    <span className="badge badge-info">{insp.authority}</span>
                  </td>
                  <td>
                    <div>{insp.date}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{insp.timeWindow}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{insp.leadInspector.name}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{insp.leadInspector.designation}</div>
                  </td>
                  <td>
                    {insp.findingsCount > 0 ? (
                      <span className="badge badge-danger">
                        {insp.findingsCount} {insp.findingsCount === 1 ? 'Finding' : 'Findings'}
                      </span>
                    ) : (
                      <span className="badge badge-success">0 Findings</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`status-pill status-${
                        insp.status === 'Completed'
                          ? 'completed'
                          : insp.status === 'Active'
                          ? 'active'
                          : 'scheduled'
                      }`}
                    >
                      {insp.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={e => {
                        e.stopPropagation();
                        setActiveInspection(insp);
                        navigateTo('03');
                      }}
                      style={{ color: '#00796B', borderColor: '#80CBC4' }}
                    >
                      <span>View Dossier</span>
                      <ArrowRight size={11} />
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
