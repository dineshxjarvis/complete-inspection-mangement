"use client";

import React from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  AlertTriangle,
  Flame,
  Clock,
  Calendar,
  CheckCircle,
  FileCheck,
  ArrowRight,
  Shield,
  MapPin,
  Play,
  UserCheck,
  ChevronRight,
  Layers
} from 'lucide-react';

export const Screen01Dashboard: React.FC = () => {
  const {
    navigateTo,
    selectedMine,
    inspections,
    findings,
    capaList,
    upcomingInspections,
    setActiveInspection,
    setActiveFinding,
    setActiveCapa
  } = useMineResponse();

  const upcomingCount = upcomingInspections.length;
  const activeCount = inspections.filter(i => i.status === 'Active').length;
  const openFindingsCount = findings.filter(f => f.status === 'Confirmed' || f.status === 'Under Review').length;
  const criticalFindingsCount = findings.filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH').length;
  const openCapaCount = capaList.filter(c => c.status === 'In Progress' || c.status === 'Overdue').length;
  const overdueCapaCount = capaList.filter(c => c.status === 'Overdue').length;
  const pendingResponsesCount = findings.filter(f => f.status === 'Confirmed' && (!f.mineResponse || f.mineResponse.status === 'Pending')).length;

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #00897B, #004D40)',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}
            >
              WORKSPACE 04
            </span>
            <h1 className="screen-title" style={{ margin: 0 }}>
              MINE RESPONSE & SAFETY MANAGEMENT
            </h1>
          </div>
          <p className="screen-subtitle">
            Mine Manager's operational command center &bull; Review confirmed findings, author statutory responses & manage CAPA actions
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: '#E0F2F1',
              border: '1px solid #80CBC4',
              color: '#004D40',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            <MapPin size={13} color="#00796B" />
            <span>Scope: {selectedMine} (Singrauli Division)</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigateTo('15')}
            style={{ background: '#00897B', borderColor: '#00796B' }}
          >
            <Shield size={14} />
            <span>Safety Action Center</span>
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS (7 Metrics) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '22px'
        }}
      >
        {/* Card 1: Upcoming Inspections */}
        <div
          className="kpi-card"
          onClick={() => navigateTo('16')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #1976D2' }}
        >
          <div className="kpi-label">Upcoming Inspections</div>
          <div className="kpi-value" style={{ color: '#1976D2' }}>{upcomingCount}</div>
          <div className="kpi-meta">Next: 15 Nov (10:30 IST)</div>
        </div>

        {/* Card 2: Active Inspections */}
        <div
          className="kpi-card"
          onClick={() => navigateTo('02')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #00897B' }}
        >
          <div className="kpi-label">Active Inspections</div>
          <div className="kpi-value" style={{ color: '#00897B' }}>{activeCount}</div>
          <div className="kpi-meta">In-field verification</div>
        </div>

        {/* Card 3: Open Findings */}
        <div
          className="kpi-card"
          onClick={() => navigateTo('07')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #E65100' }}
        >
          <div className="kpi-label">Open Findings</div>
          <div className="kpi-value" style={{ color: '#E65100' }}>{openFindingsCount}</div>
          <div className="kpi-meta">Confirmed non-compliances</div>
        </div>

        {/* Card 4: Critical Findings */}
        <div
          className="kpi-card"
          onClick={() => navigateTo('07')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #D32F2F', background: '#FFF8F8' }}
        >
          <div className="kpi-label" style={{ color: '#B71C1C' }}>Critical Findings</div>
          <div className="kpi-value" style={{ color: '#D32F2F' }}>{criticalFindingsCount}</div>
          <div className="kpi-meta" style={{ color: '#B71C1C' }}>Immediate Attention</div>
        </div>

        {/* Card 5: Open CAPA */}
        <div
          className="kpi-card"
          onClick={() => navigateTo('12')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #5932A5' }}
        >
          <div className="kpi-label">Open CAPA</div>
          <div className="kpi-value" style={{ color: '#5932A5' }}>{openCapaCount}</div>
          <div className="kpi-meta">Active corrective tasks</div>
        </div>

        {/* Card 6: Overdue CAPA */}
        <div
          className="kpi-card"
          onClick={() => navigateTo('14')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #C62828', background: '#FFEBEE' }}
        >
          <div className="kpi-label" style={{ color: '#C62828' }}>Overdue CAPA</div>
          <div className="kpi-value" style={{ color: '#C62828' }}>{overdueCapaCount}</div>
          <div className="kpi-meta" style={{ color: '#B71C1C' }}>Statutory Escalation</div>
        </div>

        {/* Card 7: Pending Responses */}
        <div
          className="kpi-card"
          onClick={() => navigateTo('09')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #F57C00' }}
        >
          <div className="kpi-label">Pending Responses</div>
          <div className="kpi-value" style={{ color: '#F57C00' }}>{pendingResponsesCount}</div>
          <div className="kpi-meta">Awaiting Mine Submission</div>
        </div>
      </div>

      {/* MAIN SECTION: "ACTION REQUIRED" CARDS */}
      <div style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '13.5px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-secondary)',
            marginBottom: '10px'
          }}
        >
          Action Required &bull; Mine Priority Queue
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '14px'
          }}
        >
          {/* Card 1: Critical Finding Response */}
          <div
            className="card"
            style={{
              padding: '16px',
              borderLeft: '4px solid #D32F2F',
              background: '#FFF8F8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className="badge badge-danger">CRITICAL FINDING</span>
                <span style={{ fontSize: '11px', color: '#D32F2F', fontWeight: 700 }}>
                  Response due in 2 days (30 Nov)
                </span>
              </div>
              <h4 style={{ margin: '0 0 4px', fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Ventilation Airflow Deficiency in Shaft 3 Return
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Measured 4.8 m/s (Statutory threshold ≥ 5.5 m/s). Immediate formal response and corrective plan required.
              </p>
            </div>
            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setActiveFinding(findings[0]);
                  navigateTo('09');
                }}
                style={{ background: '#D32F2F', borderColor: '#B71C1C' }}
              >
                <span>Respond to Finding</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Card 2: CAPA Overdue */}
          <div
            className="card"
            style={{
              padding: '16px',
              borderLeft: '4px solid #C62828',
              background: '#FFEBEE',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className="badge badge-danger">CAPA OVERDUE</span>
                <span style={{ fontSize: '11px', color: '#B71C1C', fontWeight: 700 }}>
                  3 days overdue (25 Nov)
                </span>
              </div>
              <h4 style={{ margin: '0 0 4px', fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Electrical Substation Earth Pit Resistance Correction
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Earth pit chemical treatment and Megger validation pending for Substation Sub-level 3.
              </p>
            </div>
            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setActiveCapa(capaList[1]);
                  navigateTo('14');
                }}
                style={{ color: '#B71C1C', borderColor: '#FFCDD2', background: '#FFF' }}
              >
                <span>Manage Overdue Action</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Card 3: Inspection Upcoming */}
          <div
            className="card"
            style={{
              padding: '16px',
              borderLeft: '4px solid #1976D2',
              background: 'var(--bg-surface)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className="badge badge-scheduled">INSPECTION UPCOMING</span>
                <span style={{ fontSize: '11px', color: '#1976D2', fontWeight: 700 }}>
                  Tomorrow 10:30 IST
                </span>
              </div>
              <h4 style={{ margin: '0 0 4px', fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Mine A2 — Ventilation & Methane Statutory Inspection
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Lead: Er. R. Sharma &bull; Preparation of stopping registers & telemetry records required.
              </p>
            </div>
            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('16')}
              >
                <span>View Prep Requirements</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: "RECENT INSPECTIONS" */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface-alt)'
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>
              RECENT INSPECTIONS &bull; STATUTORY RECORDS
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
              Completed and scheduled field inspections conducted under DGMS / Internal safety governance
            </p>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('02')}
          >
            View All Inspections ({inspections.length})
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ minWidth: '130px' }}>Inspection ID</th>
                <th style={{ minWidth: '180px' }}>Type</th>
                <th style={{ minWidth: '110px' }}>Date</th>
                <th style={{ minWidth: '150px' }}>Inspector</th>
                <th style={{ minWidth: '100px' }}>Findings</th>
                <th style={{ minWidth: '110px' }}>Status</th>
                <th style={{ minWidth: '140px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map(insp => (
                <tr key={insp.id}>
                  <td>
                    <span
                      className="id-badge font-mono"
                      style={{
                        background: insp.id === 'INS-2026-0882' ? 'rgba(0, 137, 123, 0.15)' : undefined,
                        color: insp.id === 'INS-2026-0882' ? '#00796B' : undefined,
                        borderColor: insp.id === 'INS-2026-0882' ? 'rgba(0, 137, 123, 0.4)' : undefined,
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setActiveInspection(insp);
                        navigateTo('03');
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
                    <div style={{ fontWeight: 500 }}>{insp.date}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{insp.timeWindow}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{insp.leadInspector.name}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{insp.leadInspector.designation}</div>
                  </td>
                  <td>
                    {insp.findingsCount > 0 ? (
                      <span
                        className="badge badge-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setActiveInspection(insp);
                          navigateTo('07');
                        }}
                      >
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
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setActiveInspection(insp);
                          navigateTo('03');
                        }}
                        style={{ fontSize: '11px' }}
                      >
                        <span>Inspection</span>
                        <ChevronRight size={11} />
                      </button>

                      {insp.findingsCount > 0 && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setActiveInspection(insp);
                            navigateTo('07');
                          }}
                          style={{
                            fontSize: '11px',
                            color: '#E65100',
                            borderColor: '#FFE0B2',
                            background: '#FFF3E0'
                          }}
                        >
                          <span>Findings</span>
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
