"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Building,
  Globe,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Award,
  Activity,
  BarChart3,
  AlertOctagon,
  ChevronRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

export const Screen01Dashboard: React.FC = () => {
  const { kpis, orgScope, navigateTo, alerts } = useOversight();

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
                color: '#FCD34D',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(245, 158, 11, 0.4)'
              }}
            >
              WORKSPACE 08 &bull; APEX GOVERNANCE
            </span>
            <span className="badge badge-warning font-bold" style={{ fontSize: '11px' }}>
              CHIEF INSPECTION AUTHORITY
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            INSPECTION OVERSIGHT & REGULATORY GOVERNANCE COMMAND
          </h1>
          <p className="screen-subtitle">
            Executive oversight layer &bull; Scope: <strong>{orgScope.corporate} &rarr; {orgScope.subsidiary} &rarr; {orgScope.area} &rarr; {orgScope.mine}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('13')}
          >
            <Building size={13} />
            <span>Organization Drill-Down (Screen 13)</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('23')}
            style={{ background: '#D97706', borderColor: '#B45309', color: '#FFF' }}
          >
            <AlertOctagon size={13} />
            <span>Escalation Centre (Screen 23)</span>
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS (8 Metrics) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #312E81' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Inspections</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#1E1B4B', fontFamily: 'monospace', marginTop: '2px' }}>{kpis.totalInspections}</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #2E7D32', background: '#E8F5E9' }}>
          <div style={{ fontSize: '11px', color: '#1B5E20', textTransform: 'uppercase', fontWeight: 700 }}>Completed Inspections</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#2E7D32', fontFamily: 'monospace', marginTop: '2px' }}>{kpis.completedInspections}</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #0288D1', background: '#E0F2FE' }}>
          <div style={{ fontSize: '11px', color: '#0369A1', textTransform: 'uppercase', fontWeight: 700 }}>In Progress Audits</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0288D1', fontFamily: 'monospace', marginTop: '2px' }}>{kpis.inProgressInspections}</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>Overdue Inspections</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>{kpis.overdueInspections}</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #C62828', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>Critical Findings</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#C62828', fontFamily: 'monospace', marginTop: '2px' }}>{kpis.criticalFindings}</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #F57C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '11px', color: '#E65100', textTransform: 'uppercase', fontWeight: 700 }}>Open CAPA Remediations</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#E65100', fontFamily: 'monospace', marginTop: '2px' }}>{kpis.openCapas}</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>Overdue CAPA</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>{kpis.overdueCapas}</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #7B1FA2', background: '#F3E5F5' }}>
          <div style={{ fontSize: '11px', color: '#4A148C', textTransform: 'uppercase', fontWeight: 700 }}>Pending Verification</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#7B1FA2', fontFamily: 'monospace', marginTop: '2px' }}>{kpis.pendingVerifications}</div>
        </div>
      </div>

      {/* Visual Analytics & Attention Required Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Left Visuals: Inspection Status & Finding Severity Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Main Visual: Inspection Status */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
                INSPECTION PROGRAMME STATUS DISTRIBUTION
              </h3>
              <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('02')} style={{ fontSize: '11px' }}>
                Performance Analytics &rarr;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>Completed (87%)</span>
                  <strong>421 Inspections</strong>
                </div>
                <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '87%', background: '#2E7D32' }} /></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>In Progress (7%)</span>
                  <strong>32 Inspections</strong>
                </div>
                <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '7%', background: '#0288D1' }} /></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>Overdue (6%)</span>
                  <strong style={{ color: '#D32F2F' }}>29 Inspections</strong>
                </div>
                <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '6%', background: '#D32F2F' }} /></div>
              </div>
            </div>
          </div>

          {/* Finding Severity Distribution */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
                FINDING SEVERITY & RISK CLUSTERS (387 Total Findings)
              </h3>
              <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('06')} style={{ fontSize: '11px' }}>
                View Critical &rarr;
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
              <div style={{ background: '#FFEBEE', padding: '12px', borderRadius: '6px', border: '1px solid #FFCDD2' }}>
                <div style={{ fontSize: '10.5px', color: '#B71C1C', fontWeight: 800 }}>CRITICAL</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#C62828', marginTop: '2px' }}>18</div>
              </div>
              <div style={{ background: '#FFF3E0', padding: '12px', borderRadius: '6px', border: '1px solid #FFE082' }}>
                <div style={{ fontSize: '10.5px', color: '#E65100', fontWeight: 800 }}>HIGH</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF6C00', marginTop: '2px' }}>42</div>
              </div>
              <div style={{ background: '#E0F2FE', padding: '12px', borderRadius: '6px', border: '1px solid #BAE6FD' }}>
                <div style={{ fontSize: '10.5px', color: '#0369A1', fontWeight: 800 }}>MEDIUM</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#0288D1', marginTop: '2px' }}>109</div>
              </div>
              <div style={{ background: '#F1F5F9', padding: '12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '10.5px', color: '#475569', fontWeight: 800 }}>LOW</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#334155', marginTop: '2px' }}>218</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Attention Required */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #D97706', background: '#FFFDF5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <AlertTriangle size={18} color="#D97706" />
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#B45309' }}>
                ⚠ ATTENTION REQUIRED (SENIOR INTERVENTION)
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#FFF', borderRadius: '4px', border: '1px solid #FEF3C7' }}>
                <span>Overdue Inspections:</span>
                <strong style={{ color: '#D32F2F' }}>12 Overdue</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#FFF', borderRadius: '4px', border: '1px solid #FEF3C7' }}>
                <span>Critical Severity Findings:</span>
                <strong style={{ color: '#C62828' }}>18 Critical</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#FFF', borderRadius: '4px', border: '1px solid #FEF3C7' }}>
                <span>Overdue Remediation CAPAs:</span>
                <strong style={{ color: '#E65100' }}>12 Overdue</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#FFF', borderRadius: '4px', border: '1px solid #FEF3C7' }}>
                <span>Repeat Finding Patterns:</span>
                <strong style={{ color: '#7B1FA2' }}>7 Recurring</strong>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigateTo('23')}
              style={{ width: '100%', background: '#D97706', borderColor: '#B45309', color: '#FFF', justifyContent: 'center' }}
            >
              <span>[VIEW CRITICAL ITEMS & ESCALATE] &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
