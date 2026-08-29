"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import { RegulatoryScreenId } from '../../types/regulatoryAction';
import {
  Search,
  X,
  LayoutDashboard,
  Inbox,
  Flame,
  FileText,
  GitCommit,
  Scale,
  GitPullRequest,
  FileCheck,
  Send,
  MessageSquare,
  ShieldAlert,
  CheckSquare,
  Clock,
  History,
  Layers,
  FolderArchive,
  CheckCircle2,
  Activity
} from 'lucide-react';

interface ScreenDef {
  id: RegulatoryScreenId;
  title: string;
  category: 'Dashboard & Queue' | 'Findings & Traceability' | 'Regulatory Action & Notices' | 'Escalation & CAPA' | 'Documents & Audit';
  icon: any;
  description: string;
}

const SCREENS: ScreenDef[] = [
  { id: '01', title: 'Screen 01: Governance Dashboard', category: 'Dashboard & Queue', icon: LayoutDashboard, description: 'Primary KPI cards, priority queue, and regulatory action breakdown.' },
  { id: '02', title: 'Screen 02: Finding Queue', category: 'Dashboard & Queue', icon: Inbox, description: 'Filterable statutory finding register with status tabs.' },
  { id: '03', title: 'Screen 03: Critical Findings', category: 'Dashboard & Queue', icon: Flame, description: 'High-risk statutory safety non-compliances requiring immediate action.' },
  { id: '04', title: 'Screen 04: Central Finding Details', category: 'Findings & Traceability', icon: FileText, description: 'Comprehensive 10-section finding record for FND-2026-00127.' },
  { id: '05', title: 'Screen 05: Regulatory Traceability', category: 'Findings & Traceability', icon: GitCommit, description: 'Interactive vertical 10-level statutory chain from Code to Verification.' },
  { id: '06', title: 'Screen 06: Finding Classification', category: 'Findings & Traceability', icon: Scale, description: 'Multi-dimensional risk scoring & human authorization rules.' },
  { id: '07', title: 'Screen 07: Similar & Recurring Findings', category: 'Findings & Traceability', icon: GitPullRequest, description: '12-month pattern analysis & AI analytics insight disclaimer.' },
  { id: '08', title: 'Screen 08: Regulatory Action Decision', category: 'Regulatory Action & Notices', icon: FileCheck, description: 'Authoritative decision form for directions and notices.' },
  { id: '09', title: 'Screen 09: Notice / Direction Details', category: 'Regulatory Action & Notices', icon: Send, description: 'NOTICE-2026-0021 official statutory direction dossier.' },
  { id: '10', title: 'Screen 10: Regulatory Response Status', category: 'Regulatory Action & Notices', icon: MessageSquare, description: 'Mine response review and controlled clarification request cycle.' },
  { id: '11', title: 'Screen 11: Escalation Center', category: 'Escalation & CAPA', icon: ShieldAlert, description: '4-tier escalation rule matrix (Mine -> Area -> Subsidiary -> DGMS).' },
  { id: '12', title: 'Screen 12: Finding -> CAPA Handoff', category: 'Escalation & CAPA', icon: CheckSquare, description: 'CAPA decision criteria and handoff to Workspace 06.' },
  { id: '13', title: 'Screen 13: Action Tracker', category: 'Escalation & CAPA', icon: Clock, description: 'Distinct 4-badge status tracking: Finding, Response, CAPA, Verification.' },
  { id: '14', title: 'Screen 14: Finding History', category: 'Documents & Audit', icon: History, description: 'Immutable chronological event timeline from proposal to verification.' },
  { id: '15', title: 'Screen 15: Regulatory Action Register', category: 'Regulatory Action & Notices', icon: Layers, description: 'Register of all active directions and formal show-cause notices.' },
  { id: '16', title: 'Screen 16: Regulatory Documents Vault', category: 'Documents & Audit', icon: FolderArchive, description: 'Official sealed regulatory documents archive with SHA-256 hashes.' },
  { id: '17', title: 'Screen 17: Resolution & Closure Preconditions', category: 'Documents & Audit', icon: CheckCircle2, description: 'Precondition validation gates enforcing CAPA verification before closure.' },
  { id: '18', title: 'Screen 18: Regulatory Audit & Activity', category: 'Documents & Audit', icon: Activity, description: 'Tamper-proof immutable chronological ledger tracking all state transitions.' }
];

export const Workspace5Navigator: React.FC = () => {
  const { quickNavOpen, setQuickNavOpen, navigateTo } = useRegulatoryAction();
  const [searchTerm, setSearchTerm] = useState('');

  if (!quickNavOpen) return null;

  const filteredScreens = SCREENS.filter(
    s =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.includes(searchTerm)
  );

  const categories = Array.from(new Set(filteredScreens.map(s => s.category)));

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 20, 45, 0.8)',
        backdropFilter: 'blur(4px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setQuickNavOpen(false)}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '85vh',
          backgroundColor: '#1A1F38',
          borderColor: 'rgba(63, 81, 181, 0.4)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Search size={18} color="#9FA8DA" />
          <input
            type="text"
            placeholder="Search Workspace 05 screens (e.g. Traceability, Classification, Notices, Escalation, Screen 08)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <button
            onClick={() => setQuickNavOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#9FA8DA',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Categories & Screen Grid */}
        <div style={{ overflowY: 'auto', padding: '16px 20px', flex: 1 }}>
          {categories.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#9FA8DA' }}>
              No screens found matching "{searchTerm}"
            </div>
          ) : (
            categories.map(category => (
              <div key={category} style={{ marginBottom: '18px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#9FA8DA',
                    marginBottom: '8px'
                  }}
                >
                  {category}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '8px'
                  }}
                >
                  {filteredScreens
                    .filter(s => s.category === category)
                    .map(screen => {
                      const Icon = screen.icon;
                      return (
                        <div
                          key={screen.id}
                          onClick={() => {
                            navigateTo(screen.id);
                            setQuickNavOpen(false);
                          }}
                          style={{
                            padding: '10px 12px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(63, 81, 181, 0.25)';
                            e.currentTarget.style.borderColor = '#7986CB';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <Icon size={14} color="#C5CAE9" />
                            <span style={{ color: '#E8EAF6', fontSize: '12px', fontWeight: 600 }}>
                              {screen.title}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '11px', color: '#9FA8DA', lineHeight: 1.3 }}>
                            {screen.description}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '10px 20px',
            background: 'rgba(0,0,0,0.3)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#7986CB'
          }}
        >
          <span>Tip: Press <kbd style={{ background: '#303F9F', padding: '1px 4px', borderRadius: '3px', color: '#FFF' }}>Ctrl+K</kbd> anywhere to open Navigator</span>
          <span style={{ color: '#C5CAE9', fontWeight: 600 }}>Workspace 05 &bull; 18 Statutory Governance Screens</span>
        </div>
      </div>
    </div>
  );
};
