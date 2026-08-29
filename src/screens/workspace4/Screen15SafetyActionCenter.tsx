"use client";

import React from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  ShieldAlert,
  Flame,
  AlertTriangle,
  Clock,
  CheckSquare,
  Paperclip,
  FileCheck,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Eye,
  Calendar,
  Activity
} from 'lucide-react';

export const Screen15SafetyActionCenter: React.FC = () => {
  const {
    findings,
    capaList,
    setActiveFinding,
    setActiveCapa,
    navigateTo,
    selectedMine
  } = useMineResponse();

  const criticalFindings = findings.filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH');
  const overdueCapa = capaList.filter(c => c.status === 'Overdue');
  const openCapa = capaList.filter(c => c.status === 'In Progress');
  const underVerification = capaList.filter(c => c.status === 'Under Verification');
  const pendingResponses = findings.filter(f => f.status === 'Confirmed' && (!f.mineResponse || f.mineResponse.status === 'Pending'));

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}
            >
              EXECUTIVE SAFETY HUB
            </span>
            <span className="badge badge-subtle">{selectedMine}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            MINE SAFETY ACTION CENTER
          </h1>
          <p className="screen-subtitle">
            Unified command hub for high-risk statutory safety obligations, pending responses, and critical remediation
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('01')}
          style={{ background: '#00897B', borderColor: '#00796B' }}
        >
          <span>Return to Primary Dashboard</span>
        </button>
      </div>

      {/* RISK SUMMARY CARDS (Critical: 2, High: 6, Medium: 12) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '14px',
          marginBottom: '20px'
        }}
      >
        <div
          className="card"
          style={{
            padding: '16px',
            borderLeft: '4px solid #D32F2F',
            background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.1) 0%, rgba(211, 47, 47, 0.02) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#B71C1C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              CRITICAL RISK OBLIGATIONS
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>
              2
            </div>
            <div style={{ fontSize: '11.5px', color: '#B71C1C', marginTop: '2px' }}>
              Immediate strata & roof support intervention required
            </div>
          </div>
          <Flame size={36} color="#D32F2F" />
        </div>

        <div
          className="card"
          style={{
            padding: '16px',
            borderLeft: '4px solid #F57C00',
            background: 'linear-gradient(135deg, rgba(245, 124, 0, 0.1) 0%, rgba(245, 124, 0, 0.02) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#E65100', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              HIGH SEVERITY ACTIONS
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#E65100', fontFamily: 'monospace', marginTop: '2px' }}>
              6
            </div>
            <div style={{ fontSize: '11.5px', color: '#E65100', marginTop: '2px' }}>
              Ventilation, electrical, and gas telemetry controls
            </div>
          </div>
          <AlertTriangle size={36} color="#F57C00" />
        </div>

        <div
          className="card"
          style={{
            padding: '16px',
            borderLeft: '4px solid #FBC02D',
            background: 'linear-gradient(135deg, rgba(251, 192, 45, 0.1) 0%, rgba(251, 192, 45, 0.02) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#F57F17', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              MEDIUM RISK TASKS
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#F57F17', fontFamily: 'monospace', marginTop: '2px' }}>
              12
            </div>
            <div style={{ fontSize: '11.5px', color: '#F57F17', marginTop: '2px' }}>
              Dust suppression, pump interlocks, escape lighting
            </div>
          </div>
          <Clock size={36} color="#FBC02D" />
        </div>
      </div>

      {/* Grid: Multi-domain Safety Action Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '30px' }}>
        {/* Panel 1: Critical Findings Requiring Action */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={16} color="#D32F2F" />
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>
                CRITICAL & HIGH SEVERITY FINDINGS ({criticalFindings.length})
              </h3>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('07')}
              style={{ fontSize: '11px', padding: '2px 8px' }}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {criticalFindings.map(fnd => (
              <div
                key={fnd.id}
                onClick={() => {
                  setActiveFinding(fnd);
                  navigateTo('08');
                }}
                style={{
                  padding: '12px',
                  background: 'var(--bg-surface-alt)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-light)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="id-badge font-mono" style={{ background: 'rgba(211, 47, 47, 0.15)', color: '#D32F2F' }}>
                    {fnd.id}
                  </span>
                  <span className="badge badge-danger">DUE: {fnd.responseDue}</span>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                  {fnd.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {fnd.issueDescription.substring(0, 90)}...
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Overdue Corrective Actions */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#D32F2F" />
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>
                OVERDUE CORRECTIVE ACTIONS ({overdueCapa.length})
              </h3>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('14')}
              style={{ fontSize: '11px', padding: '2px 8px' }}
            >
              Escalate Queue
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {overdueCapa.map(capa => (
              <div
                key={capa.id}
                onClick={() => {
                  setActiveCapa(capa);
                  navigateTo('13');
                }}
                style={{
                  padding: '12px',
                  background: 'rgba(211, 47, 47, 0.04)',
                  borderRadius: '6px',
                  border: '1px solid #FFCDD2',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="id-badge font-mono" style={{ background: 'rgba(211, 47, 47, 0.15)', color: '#D32F2F' }}>
                    {capa.id}
                  </span>
                  <span className="badge badge-danger font-mono">3 DAYS OVERDUE</span>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                  {capa.title}
                </div>
                <div style={{ fontSize: '11.5px', color: '#C62828', marginTop: '2px' }}>
                  Owner: {capa.responsiblePerson} &bull; Dept: {capa.department}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Active CAPA In Progress */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckSquare size={16} color="#00897B" />
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>
                OPEN CAPA IN PROGRESS ({openCapa.length})
              </h3>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('12')}
              style={{ fontSize: '11px', padding: '2px 8px' }}
            >
              Manage CAPA
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {openCapa.map(capa => (
              <div
                key={capa.id}
                onClick={() => {
                  setActiveCapa(capa);
                  navigateTo('13');
                }}
                style={{
                  padding: '12px',
                  background: 'var(--bg-surface-alt)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-light)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="id-badge font-mono" style={{ background: 'rgba(0, 137, 123, 0.15)', color: '#00796B' }}>
                    {capa.id}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#00897B', fontFamily: 'monospace' }}>
                    {capa.progressPercentage}% COMPLETE
                  </span>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                  {capa.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Target: {capa.dueDate} &bull; Owner: {capa.responsiblePerson}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 4: Upcoming Independent Verification (Workspace 06 Handoff) */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="#0288D1" />
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>
                UPCOMING VERIFICATION (WS06) ({underVerification.length})
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {underVerification.map(capa => (
              <div
                key={capa.id}
                onClick={() => {
                  setActiveCapa(capa);
                  navigateTo('13');
                }}
                style={{
                  padding: '12px',
                  background: 'rgba(2, 136, 209, 0.05)',
                  borderRadius: '6px',
                  border: '1px solid #B3E5FC',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="id-badge font-mono" style={{ background: 'rgba(2, 136, 209, 0.15)', color: '#0288D1' }}>
                    {capa.id}
                  </span>
                  <span className="badge badge-info font-mono">100% READY</span>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                  {capa.title}
                </div>
                <div style={{ fontSize: '11.5px', color: '#0277BD', marginTop: '2px' }}>
                  Verifier: {capa.verifier}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
