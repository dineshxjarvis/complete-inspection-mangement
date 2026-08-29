"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  BarChart3,
  Filter,
  Search,
  Building,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export const Screen02InspectionPerformance: React.FC = () => {
  const {
    monthlyPerformance,
    mineCompletionRates,
    navigateTo,
    setOrgScope,
    showToast
  } = useOversight();

  const [selectedSubsidiary, setSelectedSubsidiary] = useState('All');
  const [selectedTrack, setSelectedTrack] = useState('All');

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
              PROGRAMME PERFORMANCE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            INSPECTION PROGRAMME PERFORMANCE & COMPLETION RATES
          </h1>
          <p className="screen-subtitle">
            Evaluate annual and monthly statutory inspection velocity, completion rates, and overdue deficit benchmarks
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '20px' }}>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #312E81' }}>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Planned</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#1E1B4B', marginTop: '2px' }}>492</div>
        </div>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #0288D1' }}>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Scheduled</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0288D1', marginTop: '2px' }}>482</div>
        </div>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #2E7D32', background: '#E8F5E9' }}>
          <div style={{ fontSize: '10.5px', color: '#1B5E20', textTransform: 'uppercase', fontWeight: 700 }}>Completed</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#2E7D32', marginTop: '2px' }}>421</div>
        </div>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #757575' }}>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Cancelled</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#424242', marginTop: '2px' }}>10</div>
        </div>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #F57C00' }}>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Rescheduled</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#E65100', marginTop: '2px' }}>22</div>
        </div>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '10.5px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>Overdue</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>29</div>
        </div>
      </div>

      {/* Monthly Inspection Performance Chart Simulation */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
          MONTHLY INSPECTION PERFORMANCE & VELOCITY (JAN — NOV 2026)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: '8px', alignItems: 'flex-end', height: '180px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
          {monthlyPerformance.map(item => (
            <div key={item.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#2E7D32', marginBottom: '2px' }}>{item.rate}%</div>
              <div style={{ width: '22px', height: `${item.completed * 3.2}px`, background: '#312E81', borderRadius: '3px 3px 0 0', position: 'relative' }}>
                <div style={{ width: '100%', height: `${item.overdue * 6}px`, background: '#D32F2F', position: 'absolute', bottom: 0, borderRadius: '0 0 3px 3px' }} />
              </div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '6px' }}>{item.month}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '12px', fontSize: '11.5px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', background: '#312E81' }} /> Planned & Completed</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', background: '#D32F2F' }} /> Overdue Deficit</span>
        </div>
      </div>

      {/* SECTION 2: INSPECTION COMPLETION RATE BY MINE */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
            COLLIERY INSPECTION COMPLETION BENCHMARKS
          </h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Click any row to drill down into Mine Governance Profile</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Subsidiary</th>
              <th>Area</th>
              <th>Mine</th>
              <th style={{ width: '110px' }}>Planned</th>
              <th style={{ width: '110px' }}>Completed</th>
              <th style={{ width: '110px' }}>Overdue</th>
              <th style={{ width: '180px' }}>Completion Rate</th>
              <th style={{ width: '100px' }}>Risk Posture</th>
            </tr>
          </thead>
          <tbody>
            {mineCompletionRates.map(row => (
              <tr
                key={row.mine}
                onClick={() => {
                  setOrgScope({ corporate: 'CIL', subsidiary: row.subsidiary, area: row.area, mine: row.mine });
                  navigateTo('14');
                }}
                style={{ cursor: 'pointer' }}
              >
                <td><strong>{row.subsidiary}</strong></td>
                <td>{row.area}</td>
                <td><strong style={{ color: '#1E1B4B' }}>{row.mine}</strong></td>
                <td>{row.planned}</td>
                <td style={{ color: '#2E7D32', fontWeight: 700 }}>{row.completed}</td>
                <td style={{ color: row.overdue > 5 ? '#D32F2F' : 'var(--text-primary)', fontWeight: 700 }}>{row.overdue}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="progress-bar-container" style={{ width: '100px' }}>
                      <div className="progress-bar-fill" style={{ width: `${row.rate}%`, background: row.rate < 80 ? '#D32F2F' : row.rate < 90 ? '#F57C00' : '#2E7D32' }} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '12px' }}>{row.rate}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${row.risk === 'CRITICAL' ? 'badge-danger font-bold' : row.risk === 'HIGH' ? 'badge-warning font-bold' : 'badge-success'}`}>
                    {row.risk}
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
