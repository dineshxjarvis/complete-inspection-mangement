"use client";

import React, { useEffect } from 'react';
import { useVerification } from '../../context/VerificationContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import {
  Layers,
  Bell,
  Search,
  CheckSquare,
  ShieldCheck,
  MapPin,
  Clock,
  Send,
  Sparkles,
  Award
} from 'lucide-react';

export const Workspace7Header: React.FC = () => {
  const {
    navigateTo,
    setQuickNavOpen,
    selectedMine,
    setSelectedMine,
    showToast,
    verificationList
  } = useVerification();
  const { switchWorkspace } = useWorkspace();

  const pendingCount = verificationList.filter(v => v.status === 'Awaiting Verification' || v.status === 'In Verification Review').length;
  const overdueCount = verificationList.filter(v => v.daysRemaining < 0).length;

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
    <header className="global-header ws7-header">
      <div className="header-left">
        <div className="brand-wrapper" onClick={() => navigateTo('01')}>
          <div
            className="brand-emblem"
            style={{
              background: 'linear-gradient(135deg, #006064 0%, #00838F 100%)',
              boxShadow: '0 0 12px rgba(0, 131, 143, 0.6)',
              borderColor: 'rgba(77, 208, 225, 0.6)'
            }}
          >
            ST
          </div>
          <div className="brand-titles">
            <span className="brand-name">STRATA</span>
            <span className="brand-sub">Verification & Statutory Follow-Up</span>
          </div>
        </div>

        <div className="header-divider" />

        {/* Workspace Badge & Multi-Workspace Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            className="workspace-badge"
            style={{
              borderColor: 'rgba(0, 188, 212, 0.5)',
              background: 'rgba(0, 188, 212, 0.15)'
            }}
          >
            <div
              className="workspace-dot"
              style={{
                backgroundColor: '#26C6DA',
                boxShadow: '0 0 8px #26C6DA'
              }}
            />
            <span className="workspace-title" style={{ color: '#E0F7FA', fontWeight: 600 }}>
              Workspace 07: Verification & Follow-Up
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
            <MapPin size={12} color="#80DEEA" />
            <span>Colliery:</span>
            <select
              value={selectedMine}
              onChange={e => {
                setSelectedMine(e.target.value);
                showToast(`Switched verification jurisdiction to ${e.target.value}`, 'info');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#E0F7FA',
                fontSize: '11.5px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Mine A2" style={{ background: '#006064', color: '#FFF' }}>Mine A2 (Seam VII)</option>
              <option value="Mine B1" style={{ background: '#006064', color: '#FFF' }}>Mine B1 (Haulage Substation)</option>
              <option value="Mine C4" style={{ background: '#006064', color: '#FFF' }}>Mine C4 (Opencast Pit 2)</option>
            </select>
          </div>

          {/* Direct Multi-Workspace Switcher Buttons */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '10.5px', padding: '3px 6px', background: 'rgba(255,255,255,0.06)', color: '#CBD5E0', border: '1px solid rgba(255,255,255,0.15)' }}
              onClick={() => switchWorkspace('ws1')}
              title="Workspace 01: Planning"
            >
              WS01
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '10.5px', padding: '3px 6px', background: 'rgba(255,255,255,0.06)', color: '#CBD5E0', border: '1px solid rgba(255,255,255,0.15)' }}
              onClick={() => switchWorkspace('ws2')}
              title="Workspace 02: Assignment"
            >
              WS02
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '10.5px', padding: '3px 6px', background: 'rgba(255, 107, 0, 0.15)', color: '#FFE0B2', border: '1px solid rgba(255, 107, 0, 0.4)' }}
              onClick={() => switchWorkspace('ws3')}
              title="Workspace 03: Field Execution"
            >
              WS03
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '10.5px', padding: '3px 6px', background: 'rgba(0, 137, 123, 0.15)', color: '#80CBC4', border: '1px solid rgba(0, 137, 123, 0.4)' }}
              onClick={() => switchWorkspace('ws4')}
              title="Workspace 04: Mine Response"
            >
              WS04
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '10.5px', padding: '3px 6px', background: 'rgba(63, 81, 181, 0.2)', color: '#C5CAE9', border: '1px solid rgba(63, 81, 181, 0.5)' }}
              onClick={() => switchWorkspace('ws5')}
              title="Workspace 05: Regulatory Action"
            >
              WS05
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '10.5px', padding: '3px 6px', background: 'rgba(0, 105, 92, 0.2)', color: '#B2DFDB', border: '1px solid rgba(0, 105, 92, 0.5)' }}
              onClick={() => switchWorkspace('ws6')}
              title="Workspace 06: Corrective Action (CAPA)"
            >
              WS06
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
            placeholder="Search Verification ID, Finding, Measurement, Verifier... (Ctrl+K)"
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
            background: 'rgba(0, 96, 100, 0.4)',
            borderColor: 'rgba(77, 208, 225, 0.5)',
            color: '#E0F7FA'
          }}
          title="Jump to any screen from Screen 01 to Screen 21"
        >
          <Layers size={13} />
          <span>Screen Navigator (01—21)</span>
        </button>

        {/* Verification Alerts */}
        <button
          className="header-icon-btn"
          onClick={() => {
            showToast(`Verification Status: ${pendingCount} CAPAs Awaiting Audit`, 'info');
            navigateTo('02');
          }}
          title="Verification Notifications"
        >
          <Bell size={16} />
          {pendingCount > 0 && <div className="notif-pulse" style={{ background: '#00BCD4' }} />}
        </button>

        {/* User Profile Pill - Independent Verifier */}
        <div
          className="user-profile-pill"
          onClick={() => {
            showToast('User: Er. R. Sharma | DGMS Panel Senior Safety Auditor & Independent Verifier', 'info');
          }}
          style={{
            borderColor: 'rgba(0, 151, 167, 0.5)',
            background: 'rgba(0, 151, 167, 0.15)'
          }}
        >
          <div
            className="user-avatar"
            style={{
              background: 'linear-gradient(135deg, #006064, #00838F)',
              color: '#FFF',
              fontWeight: 700,
              border: '1px solid rgba(77, 208, 225, 0.5)'
            }}
          >
            RS
          </div>
          <div className="user-info-text">
            <span className="user-name">Er. R. Sharma</span>
            <span className="user-role" style={{ color: '#80DEEA' }}>DGMS Panel Senior Auditor (Independent)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
