"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  Calendar,
  Clock,
  User,
  Users,
  Shield,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Upload,
  Eye,
  FileText,
  Lock,
  ChevronLeft,
  Filter
} from 'lucide-react';

export const Screen16UpcomingInspections: React.FC = () => {
  const {
    upcomingInspections,
    navigateTo,
    showToast,
    selectedMine
  } = useMineResponse();

  const [selectedInspectionId, setSelectedInspectionId] = useState<string>(upcomingInspections[0]?.id || 'UP-01');
  const activeUpcoming = upcomingInspections.find(u => u.id === selectedInspectionId) || upcomingInspections[0];

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
              WORKSPACE 04 &bull; ADVANCE PREPARATION
            </span>
            <span className="badge badge-subtle">{selectedMine}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            UPCOMING STATUTORY INSPECTIONS
          </h1>
          <p className="screen-subtitle">
            Advance schedule, preparation requirements checklists, and team briefs for scheduled statutory audits
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('17')}
          style={{ background: '#00897B', borderColor: '#00796B' }}
        >
          <Upload size={13} />
          <span>Stage Advance Documents (Screen 17)</span>
        </button>
      </div>

      {/* Statutory Assignment Immutability Notice */}
      <div
        className="card"
        style={{
          background: '#FFF8E1',
          border: '1px solid #FFE082',
          padding: '10px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Lock size={15} color="#FFA000" />
        <span style={{ fontSize: '12px', color: '#5D4037' }}>
          <strong>Inspector Assignment Governance:</strong> Lead inspector assignments and audit teams are statutory appointments managed by the DGMS / Safety Directorate and cannot be modified by mine management.
        </span>
      </div>

      {/* Grid Layout: Calendar/List on Left, Selected Inspection Details & Checklist on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '16px', marginBottom: '30px' }}>
        {/* Left Column: Scheduled Inspection List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              SCHEDULED AUDIT CALENDAR ({upcomingInspections.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {upcomingInspections.map(item => {
                const isSelected = item.id === selectedInspectionId;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedInspectionId(item.id)}
                    style={{
                      padding: '14px',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: isSelected ? '#00897B' : 'var(--border-color)',
                      background: isSelected ? 'rgba(0, 137, 123, 0.08)' : 'var(--bg-surface-alt)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span className="badge badge-subtle font-mono" style={{ fontSize: '11px' }}>
                        {item.date} &bull; {item.time}
                      </span>
                      <span className={`badge ${item.status === 'Scheduled' ? 'badge-info' : 'badge-warning'}`}>
                        {item.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.title}
                    </div>

                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      <strong>Lead:</strong> {item.leadInspector}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Authority: {item.authority}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Upcoming Inspection Preparation Card */}
        {activeUpcoming && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                <div>
                  <span className="badge badge-info font-mono" style={{ fontSize: '11px' }}>
                    {activeUpcoming.type}
                  </span>
                  <h2 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {activeUpcoming.title}
                  </h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#00897B' }}>{activeUpcoming.date}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{activeUpcoming.time}</div>
                </div>
              </div>

              {/* Scope & Team */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '12px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Inspection Scope:</span>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{activeUpcoming.scope}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Statutory Authority:</span>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{activeUpcoming.authority}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Lead Inspector:</span>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{activeUpcoming.leadInspector}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Team Members:</span>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{activeUpcoming.teamMembers.join(', ')}</div>
                </div>
              </div>

              {/* Advance Preparation Requirements */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                    MINE READINESS & STATUTORY PREPARATION REQUIREMENTS
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeUpcoming.prepRequirements.map(req => (
                    <div
                      key={req.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        background: req.isReady ? '#E8F5E9' : '#FFFDE7',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: req.isReady ? '#C8E6C9' : '#FFF59D',
                        fontSize: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: req.isReady ? '#2E7D32' : '#F57F17', fontWeight: 700 }}>
                          {req.isReady ? '✓' : '⏳'}
                        </span>
                        <span style={{ color: req.isReady ? '#1B5E20' : '#5D4037', fontWeight: req.isReady ? 600 : 500 }}>
                          {req.item}
                        </span>
                      </div>
                      <span className={`badge ${req.isReady ? 'badge-success' : 'badge-warning'}`}>
                        {req.isReady ? 'Staged' : 'Action Needed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mine Manager Action Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => showToast(`Pre-inspection briefing note printed for ${activeUpcoming.title}`, 'info')}
                  style={{ justifyContent: 'center' }}
                >
                  <FileText size={12} />
                  <span>View Brief</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigateTo('17')}
                  style={{ justifyContent: 'center' }}
                >
                  <Upload size={12} />
                  <span>Prepare Documents</span>
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => showToast('Preparation checklist confirmed ready for inspection team arrival', 'success')}
                  style={{ background: '#00897B', borderColor: '#00796B', justifyContent: 'center' }}
                >
                  <CheckCircle size={12} />
                  <span>Confirm Readiness</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
