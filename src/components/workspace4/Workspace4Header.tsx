"use client";

import React, { useEffect } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import {
  Layers,
  Bell,
  Search,
  ArrowLeftRight,
  Wifi,
  WifiOff,
  Shield,
  MapPin,
  ChevronDown,
  UserCheck
} from 'lucide-react';

export const Workspace4Header: React.FC = () => {
  const {
    navigateTo,
    setQuickNavOpen,
    isOnline,
    toggleOnline,
    selectedMine,
    setSelectedMine,
    showToast
  } = useMineResponse();
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
              background: 'linear-gradient(135deg, #00897B 0%, #004D40 100%)',
              boxShadow: '0 0 12px rgba(0, 137, 123, 0.45)',
              borderColor: 'rgba(77, 208, 225, 0.4)'
            }}
          >
            ST
          </div>
          <div className="brand-titles">
            <span className="brand-name">STRATA</span>
            <span className="brand-sub">Mine Response &bull; DGMS / CIL</span>
          </div>
        </div>

        <div className="header-divider" />

        {/* Workspace Badge & Quick Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            className="workspace-badge"
            style={{
              borderColor: 'rgba(0, 150, 136, 0.5)',
              background: 'rgba(0, 150, 136, 0.12)'
            }}
          >
            <div
              className="workspace-dot"
              style={{
                backgroundColor: '#26A69A',
                boxShadow: '0 0 8px #26A69A'
              }}
            />
            <span className="workspace-title" style={{ color: '#E0F2F1', fontWeight: 600 }}>
              Workspace 04: Mine Response & Safety Management
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
            <MapPin size={12} color="#4DB6AC" />
            <span>Mine:</span>
            <select
              value={selectedMine}
              onChange={e => {
                setSelectedMine(e.target.value);
                showToast(`Switched active mine scope to ${e.target.value}`, 'info');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#80CBC4',
                fontSize: '11.5px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Mine A2" style={{ background: '#1A202C', color: '#FFF' }}>Mine A2 (Seam VII)</option>
              <option value="Mine B1" style={{ background: '#1A202C', color: '#FFF' }}>Mine B1 (Haulage Substation)</option>
              <option value="Mine C4" style={{ background: '#1A202C', color: '#FFF' }}>Mine C4 (Opencast Pit 2)</option>
              <option value="Mine D1" style={{ background: '#1A202C', color: '#FFF' }}>Mine D1 (Continuous Miner)</option>
            </select>
          </div>

          {/* Direct Multi-Workspace Switcher Buttons */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 7px',
                background: 'rgba(255,255,255,0.06)',
                color: '#CBD5E0',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
              onClick={() => switchWorkspace('ws1')}
              title="Switch to Workspace 01 (Governance & Planning)"
            >
              <ArrowLeftRight size={10} />
              <span>WS01</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 7px',
                background: 'rgba(255,255,255,0.06)',
                color: '#CBD5E0',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
              onClick={() => switchWorkspace('ws2')}
              title="Switch to Workspace 02 (Assignment & Team)"
            >
              <ArrowLeftRight size={10} />
              <span>WS02</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '10.5px',
                padding: '3px 7px',
                background: 'rgba(255, 107, 0, 0.15)',
                color: '#FFE0B2',
                border: '1px solid rgba(255, 107, 0, 0.4)'
              }}
              onClick={() => switchWorkspace('ws3')}
              title="Switch to Workspace 03 (Field Execution)"
            >
              <ArrowLeftRight size={10} />
              <span>WS03</span>
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
            placeholder="Search Finding ID, CAPA, Regulation, Inspection... (Ctrl+K)"
            onFocus={() => setQuickNavOpen(true)}
            readOnly
          />
        </div>
      </div>

      <div className="header-right">
        {/* Real-Time Connectivity Pill */}
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
            <span>{isOnline ? 'Online (DGMS Gateway)' : 'Offline Cache'}</span>
          </button>
        </div>

        {/* Quick Screen Navigator */}
        <button
          className="quick-screen-btn"
          onClick={() => setQuickNavOpen(true)}
          style={{
            background: 'rgba(0, 137, 123, 0.2)',
            borderColor: 'rgba(38, 166, 154, 0.4)',
            color: '#E0F2F1'
          }}
          title="Jump to any screen from Screen 01 to Screen 20"
        >
          <Layers size={13} />
          <span>Screen Navigator (01—20)</span>
        </button>

        {/* Action Alerts */}
        <button
          className="header-icon-btn"
          onClick={() => {
            showToast('Urgent Mine Notice: 1 Critical Finding & 1 Overdue CAPA require immediate management action', 'warning');
            navigateTo('15');
          }}
          title="Statutory Alerts"
        >
          <Bell size={16} />
          <div className="notif-pulse" style={{ background: '#FF3D00' }} />
        </button>

        {/* User Profile Pill - Mine Manager */}
        <div
          className="user-profile-pill"
          onClick={() => {
            showToast('User: Er. A. K. Verma | Mine Manager (First Class Certified FCM-8812)', 'info');
          }}
          style={{
            borderColor: 'rgba(0, 150, 136, 0.3)',
            background: 'rgba(0, 150, 136, 0.08)'
          }}
        >
          <div
            className="user-avatar"
            style={{
              background: 'linear-gradient(135deg, #00897B, #004D40)',
              color: '#FFF',
              fontWeight: 700,
              border: '1px solid rgba(77, 208, 225, 0.4)'
            }}
          >
            AV
          </div>
          <div className="user-info-text">
            <span className="user-name">Er. A. K. Verma</span>
            <span className="user-role" style={{ color: '#80CBC4' }}>Mine Manager (First Class)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
