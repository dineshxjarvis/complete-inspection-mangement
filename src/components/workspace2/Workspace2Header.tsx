"use client";

import React, { useEffect } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { Layers, Bell, Search, ArrowLeftRight } from 'lucide-react';

export const Workspace2Header: React.FC = () => {
  const { navigateTo, setQuickNavOpen } = useAssignment();
  const { activeWorkspace, switchWorkspace } = useWorkspace();

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
          <div className="brand-emblem" style={{ background: 'linear-gradient(135deg, #7C4DFF 0%, #311B92 100%)' }}>
            ST
          </div>
          <div className="brand-titles">
            <span className="brand-name">STRATA</span>
            <span className="brand-sub">Mining Governance &bull; DGMS / CIL</span>
          </div>
        </div>

        <div className="header-divider" />

        {/* Workspace Switcher Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            className="workspace-badge"
            style={{
              borderColor: 'var(--purple-primary)',
              background: 'rgba(124, 77, 255, 0.15)'
            }}
          >
            <div className="workspace-dot" style={{ backgroundColor: '#7C4DFF' }} />
            <span className="workspace-title" style={{ color: '#EDE7F6' }}>
              Workspace 02: Inspection Assignment & Team
            </span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 8px',
                background: 'rgba(255,255,255,0.08)',
                color: '#CBD5E0',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
              onClick={() => switchWorkspace('ws1')}
              title="Switch to Workspace 01 (Governance & Planning)"
            >
              <ArrowLeftRight size={12} />
              <span>WS01</span>
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
            placeholder="Search Inspector, Competency, Scheduled Inspection ID... (Ctrl+K)"
            onFocus={() => setQuickNavOpen(true)}
            readOnly
          />
        </div>
      </div>

      <div className="header-right">
        <button
          className="quick-screen-btn"
          onClick={() => setQuickNavOpen(true)}
          title="Jump to any screen from Screen 01 to Screen 20"
        >
          <Layers size={13} />
          <span>Screen Navigator (01—20)</span>
        </button>

        <button
          className="header-icon-btn"
          onClick={() => navigateTo('02')}
          title="Unassigned Inspections Alert"
        >
          <Bell size={16} />
          <div className="notif-pulse" />
        </button>

        <div className="user-profile-pill" onClick={() => navigateTo('07', { personnelId: 'PER-0901' })}>
          <div className="user-avatar" style={{ background: '#4527A0' }}>SM</div>
          <div className="user-info-text">
            <span className="user-name">S. K. Mukherjee</span>
            <span className="user-role">Inspection Coordinator</span>
          </div>
        </div>
      </div>
    </header>
  );
};
