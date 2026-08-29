"use client";

import React, { useEffect } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import {
  Layers,
  Bell,
  Search,
  ArrowLeftRight,
  Wifi,
  WifiOff,
  RefreshCw,
  AlertTriangle,
  User
} from 'lucide-react';

export const Workspace3Header: React.FC = () => {
  const {
    navigateTo,
    setQuickNavOpen,
    isOnline,
    toggleOnline,
    syncStatus,
    syncNow,
    lastSyncTime,
    showToast
  } = useFieldInspection();
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
    <header className="global-header">
      <div className="header-left">
        <div className="brand-wrapper" onClick={() => navigateTo('01')}>
          <div
            className="brand-emblem"
            style={{
              background: 'linear-gradient(135deg, #FF6B00 0%, #B71C1C 100%)',
              boxShadow: '0 0 12px rgba(255, 107, 0, 0.4)'
            }}
          >
            ST
          </div>
          <div className="brand-titles">
            <span className="brand-name">STRATA</span>
            <span className="brand-sub">Mining Governance &bull; DGMS / CIL</span>
          </div>
        </div>

        <div className="header-divider" />

        {/* Workspace Badge & Quick Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            className="workspace-badge"
            style={{
              borderColor: 'rgba(255, 107, 0, 0.5)',
              background: 'rgba(255, 107, 0, 0.12)'
            }}
          >
            <div
              className="workspace-dot"
              style={{
                backgroundColor: '#FF6B00',
                boxShadow: '0 0 8px #FF6B00'
              }}
            />
            <span className="workspace-title" style={{ color: '#FFE0B2', fontWeight: 600 }}>
              Workspace 03: Field Inspection
            </span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '11px',
                padding: '4px 8px',
                background: 'rgba(255,255,255,0.06)',
                color: '#CBD5E0',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
              onClick={() => switchWorkspace('ws1')}
              title="Switch to Workspace 01 (Governance & Planning)"
            >
              <ArrowLeftRight size={11} />
              <span>WS01</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '11px',
                padding: '4px 8px',
                background: 'rgba(255,255,255,0.06)',
                color: '#CBD5E0',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
              onClick={() => switchWorkspace('ws2')}
              title="Switch to Workspace 02 (Assignment & Team)"
            >
              <ArrowLeftRight size={11} />
              <span>WS02</span>
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
            placeholder="Search Inspection ID, Regulation, Checklist Item, Evidence... (Ctrl+K)"
            onFocus={() => setQuickNavOpen(true)}
            readOnly
          />
        </div>
      </div>

      <div className="header-right">
        {/* Real-Time Connectivity & Sync Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0,0,0,0.3)',
            padding: '4px 10px',
            borderRadius: '20px',
            border: `1px solid ${isOnline ? 'rgba(76, 175, 80, 0.4)' : 'rgba(255, 152, 0, 0.5)'}`
          }}
        >
          <button
            onClick={toggleOnline}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              color: isOnline ? '#81C784' : '#FFB74D',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: 0
            }}
            title={isOnline ? 'Click to simulate Offline Mode' : 'Click to reconnect to Online Mode'}
          >
            {isOnline ? <Wifi size={13} /> : <WifiOff size={13} />}
            <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
          </button>

          <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.2)' }} />

          <button
            onClick={syncNow}
            disabled={syncStatus === 'SYNCING'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              color: '#A0AEC0',
              fontSize: '11px',
              cursor: 'pointer',
              padding: 0
            }}
            title="Synchronize field records"
          >
            <RefreshCw
              size={12}
              style={{
                animation: syncStatus === 'SYNCING' ? 'spin 1s linear infinite' : 'none'
              }}
            />
            <span>{syncStatus === 'SYNCING' ? 'Syncing...' : lastSyncTime}</span>
          </button>
        </div>

        {/* Quick Screen Navigator */}
        <button
          className="quick-screen-btn"
          onClick={() => setQuickNavOpen(true)}
          title="Jump to any screen from Screen 01 to Screen 21"
        >
          <Layers size={13} />
          <span>Screen Navigator (01—21)</span>
        </button>

        {/* Notifications */}
        <button
          className="header-icon-btn"
          onClick={() => {
            showToast('Field Alert: 1 returned inspection requires clarification at REQ-VENT-014', 'warning');
            navigateTo('18');
          }}
          title="Returned Inspection Alert"
        >
          <Bell size={16} />
          <div className="notif-pulse" style={{ background: '#FF5722' }} />
        </button>

        {/* User Profile Pill */}
        <div
          className="user-profile-pill"
          onClick={() => {
            showToast('User: R. Sharma | Lead Inspector (First Class Mine Manager DGMS)', 'info');
          }}
        >
          <div
            className="user-avatar"
            style={{
              background: 'linear-gradient(135deg, #E65100, #BF360C)',
              color: '#FFF',
              fontWeight: 700
            }}
          >
            RS
          </div>
          <div className="user-info-text">
            <span className="user-name">R. Sharma</span>
            <span className="user-role">Lead Inspector (DGMS)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
