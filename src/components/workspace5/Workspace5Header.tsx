"use client";

import React, { useEffect } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import {
  Layers,
  Bell,
  Search,
  ArrowLeftRight,
  Shield,
  MapPin,
  Scale,
  Award,
  ChevronDown
} from 'lucide-react';

export const Workspace5Header: React.FC = () => {
  const {
    navigateTo,
    setQuickNavOpen,
    selectedMine,
    setSelectedMine,
    showToast,
    findings
  } = useRegulatoryAction();
  const { switchWorkspace } = useWorkspace();

  const criticalCount = findings.filter(f => f.severity === 'CRITICAL').length;
  const highCount = findings.filter(f => f.severity === 'HIGH').length;

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
    <header className="global-header ws5-header">
      <div className="header-left">
        <div className="brand-wrapper" onClick={() => navigateTo('01')}>
          <div
            className="brand-emblem"
            style={{
              background: 'linear-gradient(135deg, #1A237E 0%, #303F9F 100%)',
              boxShadow: '0 0 12px rgba(48, 63, 159, 0.5)',
              borderColor: 'rgba(121, 134, 203, 0.5)'
            }}
          >
            ST
          </div>
          <div className="brand-titles">
            <span className="brand-name">STRATA</span>
            <span className="brand-sub">Regulatory Action &bull; DGMS / CIL</span>
          </div>
        </div>

        <div className="header-divider" />

        {/* Workspace Badge & Multi-Workspace Quick Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            className="workspace-badge"
            style={{
              borderColor: 'rgba(63, 81, 181, 0.5)',
              background: 'rgba(63, 81, 181, 0.15)'
            }}
          >
            <div
              className="workspace-dot"
              style={{
                backgroundColor: '#7986CB',
                boxShadow: '0 0 8px #7986CB'
              }}
            />
            <span className="workspace-title" style={{ color: '#E8EAF6', fontWeight: 600 }}>
              Workspace 05: Findings & Regulatory Action
            </span>
          </div>

          {/* Mine Selector Dropdown */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              padding: '3px 8px',
              borderRadius: '4px',
              color: '#FFF',
              fontSize: '11.5px',
              fontWeight: 600
            }}
          >
            <MapPin size={12} color="#9FA8DA" />
            <span>Scope:</span>
            <select
              value={selectedMine}
              onChange={e => {
                setSelectedMine(e.target.value);
                showToast(`Switched regulatory jurisdiction scope to ${e.target.value}`, 'info');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#C5CAE9',
                fontSize: '11.5px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Mine A2" style={{ background: '#1A237E', color: '#FFF' }}>Mine A2 (Seam VII)</option>
              <option value="Mine B1" style={{ background: '#1A237E', color: '#FFF' }}>Mine B1 (Haulage Substation)</option>
              <option value="Mine C4" style={{ background: '#1A237E', color: '#FFF' }}>Mine C4 (Opencast Pit 2)</option>
              <option value="Mine D1" style={{ background: '#1A237E', color: '#FFF' }}>Mine D1 (Continuous Miner)</option>
            </select>
          </div>

          {/* Direct Multi-Workspace Switcher Buttons */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 6px',
                background: 'rgba(255,255,255,0.06)',
                color: '#CBD5E0',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
              onClick={() => switchWorkspace('ws1')}
              title="Switch to Workspace 01 (Planning)"
            >
              WS01
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 6px',
                background: 'rgba(255,255,255,0.06)',
                color: '#CBD5E0',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
              onClick={() => switchWorkspace('ws2')}
              title="Switch to Workspace 02 (Assignment)"
            >
              WS02
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 6px',
                background: 'rgba(255, 107, 0, 0.15)',
                color: '#FFE0B2',
                border: '1px solid rgba(255, 107, 0, 0.4)'
              }}
              onClick={() => switchWorkspace('ws3')}
              title="Switch to Workspace 03 (Field Execution)"
            >
              WS03
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 6px',
                background: 'rgba(0, 150, 136, 0.15)',
                color: '#80CBC4',
                border: '1px solid rgba(0, 150, 136, 0.4)'
              }}
              onClick={() => switchWorkspace('ws4')}
              title="Switch to Workspace 04 (Mine Response & Safety Management)"
            >
              WS04
            </button>
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
            placeholder="Search Finding ID, Notice, Regulation, Direction, Traceability... (Ctrl+K)"
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
            background: 'rgba(63, 81, 181, 0.25)',
            borderColor: 'rgba(121, 134, 203, 0.5)',
            color: '#E8EAF6'
          }}
          title="Jump to any screen from Screen 01 to Screen 18"
        >
          <Layers size={13} />
          <span>Screen Navigator (01—18)</span>
        </button>

        {/* Action Alerts */}
        <button
          className="header-icon-btn"
          onClick={() => {
            showToast(`Statutory Attention: ${criticalCount} Critical & ${highCount} High Severity Findings require review or direction`, 'warning');
            navigateTo('03');
          }}
          title="Statutory Alerts"
        >
          <Bell size={16} />
          <div className="notif-pulse" style={{ background: '#FF1744' }} />
        </button>

        {/* User Profile Pill - Authorized Statutory Reviewer */}
        <div
          className="user-profile-pill"
          onClick={() => {
            showToast('User: Er. P. C. Joshi | Authorized Statutory Reviewer & DGMS Liaison Officer', 'info');
          }}
          style={{
            borderColor: 'rgba(63, 81, 181, 0.4)',
            background: 'rgba(63, 81, 181, 0.12)'
          }}
        >
          <div
            className="user-avatar"
            style={{
              background: 'linear-gradient(135deg, #1A237E, #303F9F)',
              color: '#FFF',
              fontWeight: 700,
              border: '1px solid rgba(121, 134, 203, 0.5)'
            }}
          >
            PJ
          </div>
          <div className="user-info-text">
            <span className="user-name">Er. P. C. Joshi</span>
            <span className="user-role" style={{ color: '#9FA8DA' }}>Statutory Reviewer (DGMS Liaison)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
