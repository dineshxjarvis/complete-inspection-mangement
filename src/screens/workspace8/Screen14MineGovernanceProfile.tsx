"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Building,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  Award,
  ChevronLeft,
  ArrowRight,
  Activity,
  History,
  Lock
} from 'lucide-react';

export const Screen14MineGovernanceProfile: React.FC = () => {
  const { orgScope, navigateTo, showToast } = useOversight();
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    'Overview',
    'Inspections',
    'Findings',
    'CAPA',
    'Compliance',
    'Documents',
    'History'
  ];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('13')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Organization Tree</span>
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
              COLLIERY GOVERNANCE PROFILE
            </span>
            <span className="badge badge-success font-bold">OPERATIONAL</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            {orgScope.mine} &bull; SENIOR STATUTORY GOVERNANCE PROFILE
          </h1>
          <p className="screen-subtitle">
            Corporate: <strong>{orgScope.corporate}</strong> &bull; Subsidiary: <strong>{orgScope.subsidiary}</strong> &bull; Area: <strong>{orgScope.area}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('12')}>
            <span>Mine Risk Details</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigateTo('15')} style={{ background: '#1E1B4B', borderColor: '#312E81' }}>
            <span>Regulatory Oversight (Screen 15) &rarr;</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards (7 metrics) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '20px' }}>
        <div className="card stat-card" style={{ padding: '10px', borderLeft: '3px solid #1E1B4B' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Inspections</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#1E1B4B', marginTop: '2px' }}>52</div>
        </div>
        <div className="card stat-card" style={{ padding: '10px', borderLeft: '3px solid #0288D1' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Findings</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0288D1', marginTop: '2px' }}>49</div>
        </div>
        <div className="card stat-card" style={{ padding: '10px', borderLeft: '3px solid #C62828', background: '#FFEBEE' }}>
          <div style={{ fontSize: '10px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>Critical</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#C62828', marginTop: '2px' }}>18</div>
        </div>
        <div className="card stat-card" style={{ padding: '10px', borderLeft: '3px solid #F57C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '10px', color: '#E65100', textTransform: 'uppercase', fontWeight: 700 }}>Open CAPA</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#E65100', marginTop: '2px' }}>8</div>
        </div>
        <div className="card stat-card" style={{ padding: '10px', borderLeft: '3px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '10px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>Overdue</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>3</div>
        </div>
        <div className="card stat-card" style={{ padding: '10px', borderLeft: '3px solid #7B1FA2', background: '#F3E5F5' }}>
          <div style={{ fontSize: '10px', color: '#4A148C', textTransform: 'uppercase', fontWeight: 700 }}>Repeat</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#7B1FA2', marginTop: '2px' }}>6</div>
        </div>
        <div className="card stat-card" style={{ padding: '10px', borderLeft: '3px solid #EF6C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '10px', color: '#E65100', textTransform: 'uppercase', fontWeight: 700 }}>Risk Level</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#BF360C', marginTop: '4px' }}>HIGH</div>
        </div>
      </div>

      {/* 7 Tabs Bar */}
      <div className="card" style={{ padding: '8px 12px', marginBottom: '16px', display: 'flex', gap: '4px' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 14px',
              borderRadius: '4px',
              border: 'none',
              background: activeTab === tab ? '#1E1B4B' : 'transparent',
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

      {/* Tab Content Display */}
      <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
          {orgScope.mine} &bull; {activeTab.toUpperCase()} GOVERNANCE RECORDS
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', background: 'var(--bg-surface-alt)', padding: '16px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '14px' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Colliery Manager:</span>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>Er. M. K. Chhabra (First Class)</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Safety Officer:</span>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>Er. B. C. Roy</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Primary Gassy Seam:</span>
            <div style={{ fontWeight: 700, color: '#D97706', marginTop: '2px' }}>Degree III (Seam VII)</div>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Mine A2 is an operational underground colliery with 2 production shafts and 1 continuous miner section in Seam VII. Active statutory enforcement focuses on Regulation 153 return airway airflow velocities and SCAMP strata control torque adherence.
        </p>
      </div>
    </div>
  );
};
