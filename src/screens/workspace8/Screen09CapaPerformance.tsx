"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const Screen09CapaPerformance: React.FC = () => {
  const {
    kpis,
    navigateTo,
    setOrgScope,
    showToast
  } = useOversight();

  const minePerformanceData = [
    { mine: 'Mine A2', subsidiary: 'ECL', area: 'Area 1', open: 8, overdue: 3, avgDays: 14, reopened: 2, verFailRate: 12 },
    { mine: 'Mine A3', subsidiary: 'ECL', area: 'Area 1', open: 6, overdue: 1, avgDays: 11, reopened: 1, verFailRate: 8 },
    { mine: 'Mine A5', subsidiary: 'ECL', area: 'Area 1', open: 14, overdue: 6, avgDays: 22, reopened: 5, verFailRate: 28 },
    { mine: 'Mine B1', subsidiary: 'ECL', area: 'Area 2', open: 4, overdue: 0, avgDays: 7, reopened: 0, verFailRate: 2 },
    { mine: 'Mine C4', subsidiary: 'CCL', area: 'N. Karanpura', open: 9, overdue: 2, avgDays: 16, reopened: 3, verFailRate: 15 }
  ];

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
                background: 'rgba(30, 27, 75, 0.15)',
                color: '#1E1B4B'
              }}
            >
              CAPA CLOSURE BENCHMARKS
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CORRECTIVE ACTION & COMPLIANCE PERFORMANCE
          </h1>
          <p className="screen-subtitle">
            Enterprise remediation metrics &bull; Track velocity, average closure duration, and verification failure rates across all collieries
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('10')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Overdue CAPAs Register (Screen 10)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 8 KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #1E1B4B' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total CAPA Actions</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#1E1B4B', fontFamily: 'monospace', marginTop: '2px' }}>142</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #0288D1' }}>
          <div style={{ fontSize: '11px', color: '#0369A1', textTransform: 'uppercase', fontWeight: 700 }}>Open & In Progress</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0288D1', fontFamily: 'monospace', marginTop: '2px' }}>41</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>Overdue Actions</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>12</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #7B1FA2', background: '#F3E5F5' }}>
          <div style={{ fontSize: '11px', color: '#4A148C', textTransform: 'uppercase', fontWeight: 700 }}>Awaiting Verification</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#7B1FA2', fontFamily: 'monospace', marginTop: '2px' }}>8</div>
        </div>
      </div>

      {/* Closure Trend Simulation */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
          CAPA CREATION, REMEDIATION & CLOSURE TRAJECTORY
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', textAlign: 'center' }}>
          <div style={{ background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Created Actions</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#1E1B4B', marginTop: '2px' }}>142</div>
          </div>
          <div style={{ background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Remediated Completed</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0288D1', marginTop: '2px' }}>101</div>
          </div>
          <div style={{ background: '#E8F5E9', padding: '14px', borderRadius: '6px', border: '1px solid #C8E6C9' }}>
            <div style={{ fontSize: '11px', color: '#1B5E20' }}>Verified & Closed</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#2E7D32', marginTop: '2px' }}>96</div>
          </div>
          <div style={{ background: '#FFEBEE', padding: '14px', borderRadius: '6px', border: '1px solid #FFCDD2' }}>
            <div style={{ fontSize: '11px', color: '#B71C1C' }}>Reopened (Rework)</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>11</div>
          </div>
        </div>
      </div>

      {/* Colliery Performance Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Colliery</th>
              <th>Subsidiary & Area</th>
              <th style={{ width: '110px' }}>Open CAPA</th>
              <th style={{ width: '110px' }}>Overdue</th>
              <th style={{ width: '160px' }}>Avg Closure Duration</th>
              <th style={{ width: '110px' }}>Reopened</th>
              <th style={{ width: '140px' }}>Verification Failure</th>
            </tr>
          </thead>
          <tbody>
            {minePerformanceData.map(m => (
              <tr
                key={m.mine}
                onClick={() => {
                  setOrgScope({ corporate: 'CIL', subsidiary: m.subsidiary, area: m.area, mine: m.mine });
                  navigateTo('10');
                }}
                style={{ cursor: 'pointer' }}
              >
                <td><strong style={{ color: '#1E1B4B' }}>{m.mine}</strong></td>
                <td>{m.subsidiary} &bull; {m.area}</td>
                <td><span className="badge badge-info">{m.open}</span></td>
                <td><strong style={{ color: m.overdue > 2 ? '#D32F2F' : 'var(--text-primary)' }}>{m.overdue}</strong></td>
                <td>{m.avgDays} Days</td>
                <td>{m.reopened} Actions</td>
                <td>
                  <span className={`badge ${m.verFailRate > 20 ? 'badge-danger font-bold' : m.verFailRate > 10 ? 'badge-warning font-bold' : 'badge-success'}`}>
                    {m.verFailRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
