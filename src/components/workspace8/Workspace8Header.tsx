"use client";

import React, { useEffect } from 'react';
import { useOversight } from '../../context/OversightContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import {
  Layers,
  Bell,
  Search,
  Building,
  ShieldAlert,
  AlertTriangle,
  Award,
  Globe,
  Sliders,
  ChevronDown
} from 'lucide-react';

export const Workspace8Header: React.FC = () => {
  const {
    navigateTo,
    setQuickNavOpen,
    orgScope,
    setOrgScope,
    showToast,
    kpis
  } = useOversight();
  const { switchWorkspace } = useWorkspace();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setQuickNavOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickNavOpen]);

  return (
    <header className="global-header ws8-header">
      <div className="header-left">
        <div className="brand-wrapper" onClick={() => navigateTo('01')}>
          <div
            className="brand-emblem"
            style={{
              background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
              boxShadow: '0 0 14px rgba(217, 119, 6, 0.5)',
              borderColor: 'rgba(245, 158, 11, 0.6)'
            }}
          >
            ST
          </div>
          <div className="brand-titles">
            <span className="brand-name" style={{ letterSpacing: '1.5px' }}>STRATA</span>
            <span className="brand-sub" style={{ color: '#FCD34D', fontWeight: 700 }}>Inspection Oversight & Regulatory</span>
          </div>
        </div>

        <div className="header-divider" />

        {/* Workspace Badge & Multi-Workspace Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            className="workspace-badge"
            style={{
              borderColor: 'rgba(245, 158, 11, 0.5)',
              background: 'rgba(245, 158, 11, 0.15)'
            }}
          >
            <div
              className="workspace-dot"
              style={{
                backgroundColor: '#F59E0B',
                boxShadow: '0 0 8px #F59E0B'
              }}
            />
            <span className="workspace-title" style={{ color: '#FEF3C7', fontWeight: 700 }}>
              Workspace 08: Apex Oversight
            </span>
          </div>

          {/* Dynamic Hierarchy Scope Selector (CIL -> Subsidiary -> Area -> Mine) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '3px 8px',
              borderRadius: '4px',
              color: '#FFF',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            <Globe size={12} color="#FCD34D" />
            <span style={{ color: '#CBD5E1' }}>Scope:</span>
            <select
              value={orgScope.mine}
              onChange={e => {
                const mine = e.target.value;
                if (mine === 'Mine A2') setOrgScope({ corporate: 'CIL', subsidiary: 'ECL', area: 'Area 1', mine: 'Mine A2' });
                else if (mine === 'Mine A3') setOrgScope({ corporate: 'CIL', subsidiary: 'ECL', area: 'Area 1', mine: 'Mine A3' });
                else if (mine === 'Mine A5') setOrgScope({ corporate: 'CIL', subsidiary: 'ECL', area: 'Area 1', mine: 'Mine A5' });
                else if (mine === 'Mine B1') setOrgScope({ corporate: 'CIL', subsidiary: 'ECL', area: 'Area 2', mine: 'Mine B1' });
                else if (mine === 'Mine C4') setOrgScope({ corporate: 'CIL', subsidiary: 'CCL', area: 'North Karanpura', mine: 'Mine C4' });
                showToast(`Recalculated executive oversight metrics for ${mine}`, 'info');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FEF3C7',
                fontSize: '11px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Mine A2" style={{ background: '#1E1B4B', color: '#FFF' }}>CIL &rarr; ECL &rarr; Area 1 &rarr; Mine A2</option>
              <option value="Mine A3" style={{ background: '#1E1B4B', color: '#FFF' }}>CIL &rarr; ECL &rarr; Area 1 &rarr; Mine A3</option>
              <option value="Mine A5" style={{ background: '#1E1B4B', color: '#FFF' }}>CIL &rarr; ECL &rarr; Area 1 &rarr; Mine A5 (High Risk)</option>
              <option value="Mine B1" style={{ background: '#1E1B4B', color: '#FFF' }}>CIL &rarr; ECL &rarr; Area 2 &rarr; Mine B1</option>
              <option value="Mine C4" style={{ background: '#1E1B4B', color: '#FFF' }}>CIL &rarr; CCL &rarr; N. Karanpura &rarr; Mine C4</option>
            </select>
          </div>

          {/* Quick Direct Workspace Switching Buttons */}
          <div style={{ display: 'flex', gap: '3px' }}>
            <button className="btn btn-secondary btn-sm" style={{ fontSize: '10px', padding: '2px 5px', color: '#CBD5E0' }} onClick={() => switchWorkspace('ws1')}>WS01</button>
            <button className="btn btn-secondary btn-sm" style={{ fontSize: '10px', padding: '2px 5px', color: '#CBD5E0' }} onClick={() => switchWorkspace('ws2')}>WS02</button>
            <button className="btn btn-secondary btn-sm" style={{ fontSize: '10px', padding: '2px 5px', color: '#FFE0B2' }} onClick={() => switchWorkspace('ws3')}>WS03</button>
            <button className="btn btn-secondary btn-sm" style={{ fontSize: '10px', padding: '2px 5px', color: '#80CBC4' }} onClick={() => switchWorkspace('ws4')}>WS04</button>
            <button className="btn btn-secondary btn-sm" style={{ fontSize: '10px', padding: '2px 5px', color: '#C5CAE9' }} onClick={() => switchWorkspace('ws5')}>WS05</button>
            <button className="btn btn-secondary btn-sm" style={{ fontSize: '10px', padding: '2px 5px', color: '#B2DFDB' }} onClick={() => switchWorkspace('ws6')}>WS06</button>
            <button className="btn btn-secondary btn-sm" style={{ fontSize: '10px', padding: '2px 5px', color: '#80DEEA' }} onClick={() => switchWorkspace('ws7')}>WS07</button>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="global-search-container">
          <span className="global-search-icon">
            <Search size={14} />
          </span>
          <input
            type="text"
            className="global-search-input"
            placeholder="Search Mines, Inspections, CAPA, Findings, Regulations... (Ctrl+K)"
            onFocus={() => setQuickNavOpen(true)}
            readOnly
          />
        </div>
      </div>

      <div className="header-right">
        {/* Quick Screen Navigator */}
        <button
          className="quick-screen-btn"
          onClick={() => setQuickNavOpen(true)}
          style={{
            background: 'rgba(217, 119, 6, 0.25)',
            borderColor: 'rgba(245, 158, 11, 0.6)',
            color: '#FEF3C7'
          }}
          title="Jump to any screen from Screen 01 to Screen 35"
        >
          <Layers size={13} />
          <span>Screen Navigator (01—35)</span>
        </button>

        {/* Oversight Alerts Button */}
        <button
          className="header-icon-btn"
          onClick={() => {
            showToast(`Oversight Alerts: ${kpis.criticalFindings} Critical Findings | ${kpis.overdueCapas} Overdue CAPAs`, 'warning');
            navigateTo('29');
          }}
          title="Senior Oversight Alerts"
        >
          <Bell size={16} />
          <div className="notif-pulse" style={{ background: '#EF4444' }} />
        </button>

        {/* User Profile Pill - Chief Inspection Authority */}
        <div
          className="user-profile-pill"
          onClick={() => {
            showToast('User: Dr. A. K. Sen | Chief Inspection Authority & Senior Regulatory Director (CIL / DGMS)', 'info');
          }}
          style={{
            borderColor: 'rgba(245, 158, 11, 0.4)',
            background: 'rgba(245, 158, 11, 0.12)'
          }}
        >
          <div
            className="user-avatar"
            style={{
              background: 'linear-gradient(135deg, #D97706, #B45309)',
              color: '#FFF',
              fontWeight: 800,
              border: '1px solid rgba(254, 243, 199, 0.6)'
            }}
          >
            AS
          </div>
          <div className="user-info-text">
            <span className="user-name">Dr. A. K. Sen</span>
            <span className="user-role" style={{ color: '#FCD34D' }}>Chief Inspection Authority</span>
          </div>
        </div>
      </div>
    </header>
  );
};
