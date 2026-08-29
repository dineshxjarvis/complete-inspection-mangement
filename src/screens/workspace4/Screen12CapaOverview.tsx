"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import { MineCAPAItem, MineSeverity } from '../../types/mineResponse';
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  RotateCcw,
  Flame
} from 'lucide-react';

export const Screen12CapaOverview: React.FC = () => {
  const {
    capaList,
    setActiveCapa,
    navigateTo,
    selectedMine,
    setIsCapaUpdateModalOpen
  } = useMineResponse();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const openCount = capaList.filter(c => c.status === 'In Progress' || c.status === 'Not Started').length;
  const dueSoonCount = 2; // Simulated active upcoming due
  const overdueCount = capaList.filter(c => c.status === 'Overdue').length;
  const underVerificationCount = capaList.filter(c => c.status === 'Under Verification').length;
  const closedCount = 18; // Historical closed

  const tabs = [
    'All',
    'Open',
    'Due Soon',
    'Overdue',
    'Under Verification',
    'Completed'
  ];

  const filteredCapa = capaList.filter(c => {
    if (activeTab === 'Open' && (c.status !== 'In Progress' && c.status !== 'Not Started')) return false;
    if (activeTab === 'Overdue' && c.status !== 'Overdue') return false;
    if (activeTab === 'Under Verification' && c.status !== 'Under Verification') return false;
    if (activeTab === 'Completed' && c.status !== 'Completed') return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.findingId.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        c.responsiblePerson.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getPriorityBadge = (p: MineSeverity) => {
    switch (p) {
      case 'CRITICAL':
        return <span className="badge badge-critical font-bold">CRITICAL</span>;
      case 'HIGH':
        return <span className="badge badge-danger font-bold">HIGH</span>;
      case 'MEDIUM':
        return <span className="badge badge-warning font-bold">MEDIUM</span>;
      case 'LOW':
        return <span className="badge badge-subtle">LOW</span>;
      default:
        return <span className="badge">{p}</span>;
    }
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case 'Overdue':
        return <span className="badge badge-danger">OVERDUE (3D)</span>;
      case 'In Progress':
        return <span className="badge badge-warning">IN PROGRESS</span>;
      case 'Under Verification':
        return <span className="badge badge-info">UNDER VERIFICATION</span>;
      case 'Completed':
        return <span className="badge badge-success">✓ COMPLETED</span>;
      default:
        return <span className="badge badge-subtle">{s}</span>;
    }
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B'
              }}
            >
              WORKSPACE 04 &bull; CAPA
            </span>
            <span className="badge badge-subtle">{selectedMine}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CORRECTIVE & PREVENTIVE ACTION (CAPA) MANAGEMENT
          </h1>
          <p className="screen-subtitle">
            Mine-side operational execution tracking &bull; Progress milestones, evidence uploads, and verification handoff
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigateTo('14')}
          style={{ color: '#D32F2F', borderColor: '#FFCDD2', background: '#FFEBEE' }}
        >
          <Clock size={13} />
          <span>Overdue Actions Queue ({overdueCount})</span>
        </button>
      </div>

      {/* KPI Cards (Open 5, Due Soon 2, Overdue 1, Under Verification 2, Closed 18) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px',
          marginBottom: '16px'
        }}
      >
        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #00897B' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Open Actions
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#00897B', fontFamily: 'monospace', marginTop: '2px' }}>
            {openCount}
          </div>
        </div>

        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #F57C00' }}>
          <div style={{ fontSize: '11px', color: '#E65100', textTransform: 'uppercase', fontWeight: 700 }}>
            Due Soon (&lt; 7 Days)
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#E65100', fontFamily: 'monospace', marginTop: '2px' }}>
            {dueSoonCount}
          </div>
        </div>

        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>
            Overdue
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>
            {overdueCount}
          </div>
        </div>

        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #0288D1' }}>
          <div style={{ fontSize: '11px', color: '#01579B', textTransform: 'uppercase', fontWeight: 700 }}>
            Under Verification
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0288D1', fontFamily: 'monospace', marginTop: '2px' }}>
            {underVerificationCount}
          </div>
        </div>

        <div className="card" style={{ padding: '14px', borderLeft: '4px solid #388E3C' }}>
          <div style={{ fontSize: '11px', color: '#1B5E20', textTransform: 'uppercase', fontWeight: 700 }}>
            Closed / Verified
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#2E7D32', fontFamily: 'monospace', marginTop: '2px' }}>
            {closedCount}
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div
        className="card"
        style={{
          padding: '10px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                background: activeTab === tab ? '#00897B' : 'transparent',
                color: activeTab === tab ? '#FFF' : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: activeTab === tab ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ width: '280px', position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search CAPA ID, Finding, Owner..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>
      </div>

      {/* CAPA Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>CAPA ID</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th>Corrective Action Title & Scope</th>
              <th style={{ width: '150px' }}>Owner & Department</th>
              <th style={{ width: '110px' }}>Due Date</th>
              <th style={{ width: '100px' }}>Priority</th>
              <th style={{ width: '120px' }}>Progress</th>
              <th style={{ width: '130px' }}>Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCapa.map(capa => {
              const isOverdue = capa.status === 'Overdue';
              return (
                <tr
                  key={capa.id}
                  style={{
                    backgroundColor: isOverdue ? 'rgba(211, 47, 47, 0.04)' : undefined,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setActiveCapa(capa);
                    navigateTo('13');
                  }}
                >
                  <td>
                    <span
                      className="id-badge font-mono"
                      style={{
                        background: isOverdue ? 'rgba(211, 47, 47, 0.15)' : 'rgba(0, 137, 123, 0.15)',
                        color: isOverdue ? '#D32F2F' : '#00796B'
                      }}
                    >
                      {capa.id}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-subtle font-mono" style={{ fontSize: '11px' }}>
                      {capa.findingId}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12.5px' }}>
                      {capa.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
                      {capa.actionDescription.substring(0, 75)}...
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {capa.responsiblePerson.split(' ')[0]} {capa.responsiblePerson.split(' ')[1]}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {capa.department}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: isOverdue ? '#D32F2F' : 'var(--text-primary)' }}>
                      {capa.dueDate}
                    </span>
                  </td>
                  <td>{getPriorityBadge(capa.priority)}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className="progress-bar-container" style={{ flex: 1, height: '6px' }}>
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${capa.progressPercentage}%`,
                            background: capa.progressPercentage === 100 ? '#2E7D32' : isOverdue ? '#D32F2F' : '#00897B'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'monospace' }}>
                        {capa.progressPercentage}%
                      </span>
                    </div>
                  </td>
                  <td>{getStatusBadge(capa.status)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCapa(capa);
                        navigateTo('13');
                      }}
                      style={{ padding: '3px 8px' }}
                    >
                      <Eye size={12} />
                      <span>View</span>
                    </button>
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
