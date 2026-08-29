"use client";

import React, { useEffect } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import {
  Layers,
  Bell,
  Search,
  CheckSquare,
  Shield,
  MapPin,
  Clock,
  Send,
  Sparkles
} from 'lucide-react';

export const Workspace6Header: React.FC = () => {
  const {
    navigateTo,
    setQuickNavOpen,
    selectedMine,
    setSelectedMine,
    showToast,
    capaList
  } = useCorrectiveAction();
  const { switchWorkspace } = useWorkspace();

  const overdueCount = capaList.filter(c => c.daysRemaining < 0).length;
  const dueSoonCount = capaList.filter(c => c.daysRemaining >= 0 && c.daysRemaining <= 2).length;

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
    <header className="global-header ws6-header">
      <div className="header-left">
        <div className="brand-wrapper" onClick={() => navigateTo('01')}>
          <div
            className="brand-emblem"
            style={{
              background: 'linear-gradient(135deg, #00695C 0%, #004D40 100%)',
              boxShadow: '0 0 12px rgba(0, 105, 92, 0.6)',
              borderColor: 'rgba(77, 182, 172, 0.6)'
            }}
          >
            ST
          </div>
          <div className="brand-titles">
            <span className="brand-name">STRATA</span>
            <span className="brand-sub">CAPA & Compliance Execution</span>
          </div>
        </div>

        <div className="header-divider" />

        {/* Workspace Badge & Multi-Workspace Quick Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            className="workspace-badge"
            style={{
              borderColor: 'rgba(0, 150, 136, 0.5)',
              background: 'rgba(0, 150, 136, 0.15)'
            }}
          >
            <div
              className="workspace-dot"
              style={{
                backgroundColor: '#4DB6AC',
                boxShadow: '0 0 8px #4DB6AC'
              }}
            />
            <span className="workspace-title" style={{ color: '#E0F2F1', fontWeight: 600 }}>
              Workspace 06: Corrective Action & Compliance
            </span>
          </div>

          {/* Mine Scope Dropdown */}
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
            <MapPin size={12} color="#80CBC4" />
            <span>Colliery:</span>
            <select
              value={selectedMine}
              onChange={e => {
                setSelectedMine(e.target.value);
                showToast(`Switched operational unit to ${e.target.value}`, 'info');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#E0F2F1',
                fontSize: '11.5px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Mine A2" style={{ background: '#004D40', color: '#FFF' }}>Mine A2 (Seam VII)</option>
              <option value="Mine B1" style={{ background: '#004D40', color: '#FFF' }}>Mine B1 (Haulage Substation)</option>
              <option value="Mine C4" style={{ background: '#004D40', color: '#FFF' }}>Mine C4 (Opencast Pit 2)</option>
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
              title="Workspace 01: Planning"
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
              title="Workspace 02: Assignment"
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
              title="Workspace 03: Field Execution"
            >
              WS03
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 6px',
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#80CBC4',
                border: '1px solid rgba(0, 137, 123, 0.4)'
              }}
              onClick={() => switchWorkspace('ws4')}
              title="Workspace 04: Mine Response"
            >
              WS04
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 6px',
                background: 'rgba(63, 81, 181, 0.2)',
                color: '#C5CAE9',
                border: '1px solid rgba(63, 81, 181, 0.5)'
              }}
              onClick={() => switchWorkspace('ws5')}
              title="Workspace 05: Regulatory Action"
            >
              WS05
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
            placeholder="Search CAPA ID, Task, Finding Ref, Evidence, Blocker... (Ctrl+K)"
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
            background: 'rgba(0, 105, 92, 0.3)',
            borderColor: 'rgba(77, 182, 172, 0.5)',
            color: '#E0F2F1'
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
            showToast(`Operational Status: ${overdueCount} Overdue & ${dueSoonCount} Due Soon CAPAs requiring attention`, 'warning');
            navigateTo('02');
          }}
          title="Action Deadlines"
        >
          <Bell size={16} />
          {overdueCount > 0 && <div className="notif-pulse" style={{ background: '#D32F2F' }} />}
        </button>

        {/* User Profile Pill - Action Owner */}
        <div
          className="user-profile-pill"
          onClick={() => {
            showToast('User: Er. S. K. Mahapatra | Chief Ventilation Engineer & CAPA Owner', 'info');
          }}
          style={{
            borderColor: 'rgba(0, 105, 92, 0.4)',
            background: 'rgba(0, 105, 92, 0.15)'
          }}
        >
          <div
            className="user-avatar"
            style={{
              background: 'linear-gradient(135deg, #00695C, #004D40)',
              color: '#FFF',
              fontWeight: 700,
              border: '1px solid rgba(77, 182, 172, 0.5)'
            }}
          >
            SM
          </div>
          <div className="user-info-text">
            <span className="user-name">Er. S. K. Mahapatra</span>
            <span className="user-role" style={{ color: '#80CBC4' }}>Chief Ventilation Engineer (Owner)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
