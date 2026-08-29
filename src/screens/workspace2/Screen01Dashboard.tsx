"use client";

import React from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import { Users, UserPlus, AlertCircle, Calendar, Bell, Shield, ArrowRight } from 'lucide-react';

export const Screen01Dashboard: React.FC = () => {
  const { inspections, navigateTo } = useAssignment();

  const kpis = [
    { label: 'Unassigned', value: '2', subtext: 'Require lead & team', warning: true },
    { label: 'Awaiting Assignment', value: '1', subtext: 'In preparation' },
    { label: 'Assigned', value: '1', subtext: 'In field / ready', primary: true },
    { label: 'Assignment Conflicts', value: '1', subtext: 'Overlap detected', danger: true },
    { label: 'Team Incomplete', value: '1', subtext: 'Missing specialist', warning: true },
    { label: 'Starting Soon', value: '1', subtext: 'Within 24 hours' }
  ];

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Workspace 02</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Inspection Assignment & Team Dashboard</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Users size={20} color="var(--purple-primary)" />
            Inspection Assignment & Team
          </h1>
          <p className="screen-subtitle">
            Assign qualified inspection personnel, verify statutory competencies under CMR 2017, and manage inspection teams across the organizational scope.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('15')}>
            <Calendar size={14} /> Inspector Availability
          </button>
          <button className="btn btn-primary" onClick={() => navigateTo('02')}>
            <UserPlus size={14} /> Assignment Queue ({inspections.filter(i => i.status !== 'Assigned').length})
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="kpi-row">
        {kpis.map((k, i) => (
          <div
            key={i}
            className={`kpi-card ${k.danger ? 'kpi-danger' : ''} ${k.warning ? 'kpi-warning' : ''} ${k.primary ? 'kpi-primary' : ''}`}
          >
            <span className="kpi-label">{k.label}</span>
            <div className="kpi-val-row">
              <span className="kpi-value">{k.value}</span>
            </div>
            <span className="kpi-subtext">{k.subtext}</span>
          </div>
        ))}
      </div>

      {/* Section 1: Inspections Requiring Assignment */}
      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">
            <AlertCircle size={15} color="var(--status-orange-text)" />
            Inspections Requiring Assignment
          </span>
          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('02')}>
            View Full Queue ({inspections.length})
          </button>
        </div>
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Inspection ID</th>
                <th>Mine</th>
                <th>Inspection Type</th>
                <th>Track</th>
                <th>Risk</th>
                <th>Scheduled Date</th>
                <th>Required Competencies</th>
                <th>Assignment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((insp) => (
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
                  <td>{insp.track}</td>
                  <td>
                    <span className={`badge ${insp.risk === 'High' ? 'badge-high' : 'badge-medium'}`}>
                      <span className="badge-dot" />{insp.risk}
                    </span>
                  </td>
                  <td className="font-mono">{insp.scheduledDate}</td>
                  <td>
                    <span className="badge badge-draft">{insp.requiredTeam.competencyList.join(' + ')}</span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        insp.status === 'Assigned'
                          ? 'badge-completed'
                          : insp.status === 'Partially Assigned'
                          ? 'badge-planned'
                          : insp.status === 'Conflict'
                          ? 'badge-high'
                          : 'badge-awaiting'
                      }`}
                    >
                      <span className="badge-dot" />{insp.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${insp.status === 'Assigned' ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => {
                        if (insp.status === 'Assigned') {
                          navigateTo('05', { inspectionId: insp.id });
                        } else {
                          navigateTo('04', { inspectionId: insp.id });
                        }
                      }}
                    >
                      {insp.status === 'Assigned' ? 'View Team' : 'Assign'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Upcoming Assigned Inspections + Assignment Attention */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '20px' }}>
        
        {/* Left: Upcoming Assigned */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <Calendar size={15} />
              Upcoming Assigned Inspections
            </span>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('16')}>
              View Active Assignments
            </button>
          </div>
          <div className="table-responsive">
            <table className="strata-table">
              <thead>
                <tr>
                  <th>Inspection</th>
                  <th>Mine</th>
                  <th>Lead Inspector</th>
                  <th>Team Composition</th>
                  <th>Date</th>
                  <th>Acceptance</th>
                </tr>
              </thead>
              <tbody>
                {inspections.filter(i => i.status === 'Assigned').map((ai) => (
                  <tr key={ai.id} style={{ cursor: 'pointer' }} onClick={() => navigateTo('05', { inspectionId: ai.id })}>
                    <td><strong className="font-mono" style={{ color: 'var(--purple-primary)' }}>{ai.id}</strong></td>
                    <td>{ai.mine.split('(')[0]}</td>
                    <td><strong>{ai.assignedTeam.leadInspector?.name || 'Assigned'}</strong></td>
                    <td>
                      {ai.assignedTeam.specialists.length > 0 ? `Lead + ${ai.assignedTeam.specialists.length} Specialists` : 'Lead Inspector Only'}
                    </td>
                    <td className="font-mono">{ai.scheduledDate}</td>
                    <td><span className="badge badge-completed">{ai.acceptance.statusText}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Assignment Attention Cards */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <Bell size={15} /> Assignment Attention
            </span>
          </div>
          <div className="card-body" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            <div
              style={{
                padding: '8px 12px',
                background: '#FFF8E1',
                border: '1px solid #FFE082',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => navigateTo('02')}
            >
              <div>
                <strong style={{ color: '#B78103', fontSize: '12px' }}>2 Inspections Unassigned</strong>
                <div style={{ fontSize: '10.5px', color: '#6D4C41' }}>Scheduled slots require personnel selection</div>
              </div>
              <span className="badge badge-medium"><ArrowRight size={12} /></span>
            </div>

            <div
              style={{
                padding: '8px 12px',
                background: '#FFEBEE',
                border: '1px solid #FFCDD2',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => navigateTo('19')}
            >
              <div>
                <strong style={{ color: '#C62828', fontSize: '12px' }}>1 Availability / Conflict Alert</strong>
                <div style={{ fontSize: '10.5px', color: '#7F0000' }}>Overlap in Mine A2 with Substation 3 test</div>
              </div>
              <span className="badge badge-high"><ArrowRight size={12} /></span>
            </div>

            <div
              style={{
                padding: '8px 12px',
                background: '#EDE7F6',
                border: '1px solid #D1C4E9',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => navigateTo('07')}
            >
              <div>
                <strong style={{ color: 'var(--purple-primary)', fontSize: '12px' }}>Inspector Directory (7 Certified)</strong>
                <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>View statutory certifications & CMR records</div>
              </div>
              <span className="badge badge-planned"><ArrowRight size={12} /></span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
