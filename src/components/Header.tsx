"use client";

import React, { useEffect } from 'react';
import { useStrata } from '../context/StrataContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { Layers, Bell, Search, ArrowLeftRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { data, navigateTo, setQuickNavOpen, showToast } = useStrata();
  const { activeWorkspace, switchWorkspace } = useWorkspace();
  const user = data.meta.currentUser;

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
    <header className="global-header">
      <div className="header-left">
        <div className="brand-wrapper" onClick={() => navigateTo('01')}>
          <div className="brand-emblem">ST</div>
          <div className="brand-titles">
            <span className="brand-name">STRATA</span>
            <span className="brand-sub">Mining Governance &bull; DGMS / CIL</span>
          </div>
        </div>

        <div className="header-divider" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="workspace-badge">
            <div className="workspace-dot" />
            <span className="workspace-title">Workspace 01: Inspection Governance & Planning</span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 8px',
                background: 'rgba(124, 77, 255, 0.15)',
                color: '#EDE7F6',
                border: '1px solid var(--purple-primary)'
              }}
              onClick={() => switchWorkspace('ws2')}
              title="Switch to Workspace 02 (Inspection Assignment & Team)"
            >
              <ArrowLeftRight size={12} />
              <span>WS02</span>
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 8px',
                background: 'rgba(255, 107, 0, 0.15)',
                color: '#FFE0B2',
                border: '1px solid rgba(255, 107, 0, 0.5)'
              }}
              onClick={() => switchWorkspace('ws3')}
              title="Switch to Workspace 03 (Field Inspection Execution)"
            >
              <ArrowLeftRight size={12} />
              <span>WS03 (Field UI)</span>
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
            placeholder="Search Regulation, Inspection ID, Recommendation, Mine... (Ctrl+K)"
            onFocus={() => setQuickNavOpen(true)}
            readOnly
          />
        </div>
      </div>

      <div className="header-right">
        <button
          className="quick-screen-btn"
          onClick={() => setQuickNavOpen(true)}
          title="Jump to any screen from Screen 01 to Screen 22"
        >
          <Layers size={13} />
          <span>Screen Navigator (01—22)</span>
        </button>

        <button
          className="header-icon-btn"
          onClick={() => showToast('2 Statutory Alerts: 1 Overdue SCAMP audit • 1 Telemetry alarm at Mine A2', 'warning')}
          title="Notifications"
        >
          <Bell size={16} />
          <div className="notif-pulse" />
        </button>

        <div
          className="user-profile-pill"
          onClick={() => showToast(`User: ${user.name} | ${user.designation}`, 'info')}
        >
          <div className="user-avatar">{user.avatar}</div>
          <div className="user-info-text">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.designation}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
