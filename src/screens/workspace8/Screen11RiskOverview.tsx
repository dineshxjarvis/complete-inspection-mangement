"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  TrendingUp,
  AlertTriangle,
  AlertOctagon,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  Building
} from 'lucide-react';

export const Screen11RiskOverview: React.FC = () => {
  const {
    navigateTo,
    setOrgScope,
    showToast
  } = useOversight();

  const handleCellClick = (mine: string) => {
    setOrgScope({ corporate: 'CIL', subsidiary: 'ECL', area: 'Area 1', mine });
    navigateTo('12');
  };

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
              ENTERPRISE RISK GOVERNANCE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY RISK OVERVIEW & $3\times 4$ RISK MATRIX
          </h1>
          <p className="screen-subtitle">
            Multi-dimensional risk heat map &bull; Quantify hazard severity, inspection gaps, and recurring safety failure likelihoods
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('12')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Mine Risk Details (Screen 12)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 5 Risk Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px' }}>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #C62828', background: '#FFEBEE' }}>
          <div style={{ fontSize: '10.5px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 800 }}>Critical Risk Mines</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#C62828', marginTop: '2px' }}>1 Colliery</div>
          <div style={{ fontSize: '10.5px', color: '#B71C1C' }}>Mine A5 (Urgent)</div>
        </div>

        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #EF6C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '10.5px', color: '#E65100', textTransform: 'uppercase', fontWeight: 800 }}>High Risk Mines</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#EF6C00', marginTop: '2px' }}>2 Collieries</div>
          <div style={{ fontSize: '10.5px', color: '#E65100' }}>Mine A2, Mine C4</div>
        </div>

        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #0288D1' }}>
          <div style={{ fontSize: '10.5px', color: '#0369A1', textTransform: 'uppercase', fontWeight: 800 }}>Emerging Hazards</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0288D1', marginTop: '2px' }}>8 Clusters</div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Electrical & Strata</div>
        </div>

        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #7B1FA2', background: '#F3E5F5' }}>
          <div style={{ fontSize: '10.5px', color: '#4A148C', textTransform: 'uppercase', fontWeight: 800 }}>Recurring Risk</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#7B1FA2', marginTop: '2px' }}>7 Patterns</div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Ventilation drift</div>
        </div>

        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #475569' }}>
          <div style={{ fontSize: '10.5px', color: '#475569', textTransform: 'uppercase', fontWeight: 800 }}>Unverified Risk</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#334155', marginTop: '2px' }}>8 CAPAs</div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Pending audit</div>
        </div>
      </div>

      {/* 3x4 Risk Matrix */}
      <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '13.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
          $3\times 4$ STATUTORY RISK MATRIX (LIKELIHOOD VS CONSEQUENCE IMPACT)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
          {/* Header Row */}
          <div style={{ fontWeight: 800, fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            LIKELIHOOD \ IMPACT
          </div>
          <div style={{ background: '#F1F5F9', padding: '8px', fontWeight: 700, fontSize: '11.5px', borderRadius: '4px' }}>Low Impact</div>
          <div style={{ background: '#F1F5F9', padding: '8px', fontWeight: 700, fontSize: '11.5px', borderRadius: '4px' }}>Medium Impact</div>
          <div style={{ background: '#F1F5F9', padding: '8px', fontWeight: 700, fontSize: '11.5px', borderRadius: '4px' }}>High Impact</div>
          <div style={{ background: '#F1F5F9', padding: '8px', fontWeight: 700, fontSize: '11.5px', borderRadius: '4px' }}>Critical Impact</div>

          {/* Row 1: High Likelihood */}
          <div style={{ background: '#F1F5F9', padding: '14px 8px', fontWeight: 700, fontSize: '11.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
            High Likelihood
          </div>
          <div style={{ background: '#FFF3E0', padding: '14px', borderRadius: '4px', border: '1px solid #FFE082', cursor: 'pointer' }}>—</div>
          <div style={{ background: '#FFE0B2', padding: '14px', borderRadius: '4px', border: '1px solid #FFCC80', cursor: 'pointer' }}>—</div>
          <div onClick={() => handleCellClick('Mine A2')} style={{ background: '#FFCDD2', padding: '14px', borderRadius: '4px', border: '2px solid #EF5350', cursor: 'pointer' }}>
            <strong style={{ color: '#C62828', fontSize: '12.5px' }}>Mine A2</strong>
            <div style={{ fontSize: '10px', color: '#B71C1C' }}>Ventilation (4.8 m/s)</div>
          </div>
          <div onClick={() => handleCellClick('Mine A5')} style={{ background: '#FFCDD2', padding: '14px', borderRadius: '4px', border: '2px solid #B71C1C', cursor: 'pointer' }}>
            <strong style={{ color: '#B71C1C', fontSize: '12.5px' }}>Mine A5</strong>
            <div style={{ fontSize: '10px', color: '#B71C1C' }}>FLP Gap 0.75mm</div>
          </div>

          {/* Row 2: Medium Likelihood */}
          <div style={{ background: '#F1F5F9', padding: '14px 8px', fontWeight: 700, fontSize: '11.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
            Medium Likelihood
          </div>
          <div style={{ background: '#E8F5E9', padding: '14px', borderRadius: '4px', border: '1px solid #C8E6C9', cursor: 'pointer' }}>—</div>
          <div onClick={() => handleCellClick('Mine A3')} style={{ background: '#FFF3E0', padding: '14px', borderRadius: '4px', border: '1.5px solid #FFB74D', cursor: 'pointer' }}>
            <strong style={{ color: '#E65100', fontSize: '12px' }}>Mine A3</strong>
            <div style={{ fontSize: '10px', color: '#E65100' }}>Conveyor Sensors</div>
          </div>
          <div onClick={() => handleCellClick('Mine C4')} style={{ background: '#FFCDD2', padding: '14px', borderRadius: '4px', border: '1.5px solid #EF5350', cursor: 'pointer' }}>
            <strong style={{ color: '#C62828', fontSize: '12px' }}>Mine C4</strong>
            <div style={{ fontSize: '10px', color: '#B71C1C' }}>High-wall Bench Drift</div>
          </div>
          <div style={{ background: '#FFE0B2', padding: '14px', borderRadius: '4px', border: '1px solid #FFCC80', cursor: 'pointer' }}>—</div>

          {/* Row 3: Low Likelihood */}
          <div style={{ background: '#F1F5F9', padding: '14px 8px', fontWeight: 700, fontSize: '11.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
            Low Likelihood
          </div>
          <div onClick={() => handleCellClick('Mine B1')} style={{ background: '#E8F5E9', padding: '14px', borderRadius: '4px', border: '1.5px solid #81C784', cursor: 'pointer' }}>
            <strong style={{ color: '#1B5E20', fontSize: '12px' }}>Mine B1</strong>
            <div style={{ fontSize: '10px', color: '#2E7D32' }}>Compliant (96%)</div>
          </div>
          <div style={{ background: '#E8F5E9', padding: '14px', borderRadius: '4px', border: '1px solid #C8E6C9', cursor: 'pointer' }}>—</div>
          <div style={{ background: '#FFF3E0', padding: '14px', borderRadius: '4px', border: '1px solid #FFE082', cursor: 'pointer' }}>—</div>
          <div style={{ background: '#FFE0B2', padding: '14px', borderRadius: '4px', border: '1px solid #FFCC80', cursor: 'pointer' }}>—</div>
        </div>
      </div>
    </div>
  );
};
