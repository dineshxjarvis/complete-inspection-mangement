"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import { OversightScreenId } from '../../types/oversight';
import {
  Search,
  X,
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Activity,
  FileText,
  AlertTriangle,
  RotateCcw,
  Clock,
  TrendingUp,
  AlertOctagon,
  FolderTree,
  Building,
  Globe,
  Send,
  Sliders,
  FileCheck,
  Award,
  History,
  Lock
} from 'lucide-react';

interface ScreenDef {
  id: OversightScreenId;
  title: string;
  category: 'Oversight & Performance' | 'Findings & CAPA' | 'Risk & Hierarchy' | 'Regulatory & Traceability' | 'Reports & Escalation' | 'Audit & Summary';
  icon: any;
  description: string;
}

const SCREENS: ScreenDef[] = [
  { id: '01', title: 'Screen 01: Oversight Dashboard', category: 'Oversight & Performance', icon: LayoutDashboard, description: '8 Top KPI cards, Inspection status bar, Severity breakdown, Attention Required panel.' },
  { id: '02', title: 'Screen 02: Inspection Performance', category: 'Oversight & Performance', icon: BarChart3, description: 'Monthly performance chart & completion rates by Subsidiary/Area/Mine.' },
  { id: '03', title: 'Screen 03: Inspection Coverage', category: 'Oversight & Performance', icon: ShieldCheck, description: 'Statutory programme coverage & gap analysis (83% ventilation coverage).' },
  { id: '04', title: 'Screen 04: Active Inspections', category: 'Oversight & Performance', icon: Activity, description: 'Live senior operational view of in-progress audits (INS-2026-0882, 68%).' },
  { id: '05', title: 'Screen 05: Inspection Overview', category: 'Oversight & Performance', icon: FileText, description: 'INS-2026-0882 full dossier, timeline Planned -> Finalized, checklist metrics.' },
  { id: '06', title: 'Screen 06: Critical Findings', category: 'Findings & CAPA', icon: AlertTriangle, description: 'Severity distribution & prioritized critical statutory findings ledger.' },
  { id: '07', title: 'Screen 07: Finding Details — Oversight', category: 'Findings & CAPA', icon: FileText, description: 'Senior view of FND-2026-00127 with 10-tier lineage and verified posture.' },
  { id: '08', title: 'Screen 08: Repeat Findings', category: 'Findings & CAPA', icon: RotateCcw, description: 'Pattern clustering across Mine, Area, Subsidiary, Type with AI advisory.' },
  { id: '09', title: 'Screen 09: CAPA Performance', category: 'Findings & CAPA', icon: BarChart3, description: 'CAPA closure trend & colliery performance benchmarks across mines.' },
  { id: '10', title: 'Screen 10: Overdue CAPA', category: 'Findings & CAPA', icon: Clock, description: 'Overdue remediation register with multi-level escalation panel.' },
  { id: '11', title: 'Screen 11: Risk Overview', category: 'Risk & Hierarchy', icon: TrendingUp, description: '5 Risk cards & 3x4 Risk Matrix (Likelihood vs Impact).' },
  { id: '12', title: 'Screen 12: Mine Risk Details', category: 'Risk & Hierarchy', icon: AlertOctagon, description: 'Mine A2 profile, risk drivers, and 6-month risk trajectory.' },
  { id: '13', title: 'Screen 13: Organization Drill-Down', category: 'Risk & Hierarchy', icon: FolderTree, description: 'Dynamic tree (CIL -> ECL/CCL -> Area 1/2 -> Mine A2/A3/A5/B1).' },
  { id: '14', title: 'Screen 14: Mine Governance Profile', category: 'Risk & Hierarchy', icon: Building, description: '7-tab senior mine governance view for Mine A2.' },
  { id: '15', title: 'Screen 15: Regulatory Oversight', category: 'Regulatory & Traceability', icon: Globe, description: 'External DGMS notices & responses tracking (DGMS/INS/2026/0042).' },
  { id: '16', title: 'Screen 16: External Inspection Details', category: 'Regulatory & Traceability', icon: Lock, description: 'Protected authority record vs STRATA tracking.' },
  { id: '17', title: 'Screen 17: Regulatory Response Status', category: 'Regulatory & Traceability', icon: Send, description: 'Response monitoring across 9 status states.' },
  { id: '18', title: 'Screen 18: Inspection Track Analytics', category: 'Oversight & Performance', icon: BarChart3, description: 'Compare DGMS, ISO, Area, Workmen, Safety, Environment.' },
  { id: '19', title: 'Screen 19: Inspection Type Analytics', category: 'Oversight & Performance', icon: Sliders, description: 'Domain analytics: Ventilation, Electrical, Safety, Mechanical, etc.' },
  { id: '20', title: 'Screen 20: Report Centre', category: 'Reports & Escalation', icon: FileCheck, description: '8 report categories with view, configure, and export actions.' },
  { id: '21', title: 'Screen 21: Report Builder', category: 'Reports & Escalation', icon: Sliders, description: 'Configurable query builder with scope & filter controls.' },
  { id: '22', title: 'Screen 22: Generated Report', category: 'Reports & Escalation', icon: FileText, description: 'Executive report certificate with export capabilities.' },
  { id: '23', title: 'Screen 23: Escalation Centre', category: 'Reports & Escalation', icon: AlertOctagon, description: 'Unified intervention center for Critical & High severity items.' },
  { id: '24', title: 'Screen 24: Escalation Details', category: 'Reports & Escalation', icon: Send, description: 'CAPA-2026-0048 Level 1 -> Level 4 escalation workflow.' },
  { id: '25', title: 'Screen 25: Audit Trail', category: 'Audit & Summary', icon: History, description: 'Global immutable governance audit repository.' },
  { id: '26', title: 'Screen 26: Object History', category: 'Audit & Summary', icon: Clock, description: 'Full lifecycle event tree for CAPA-2026-0048.' },
  { id: '27', title: 'Screen 27: Regulatory Traceability', category: 'Regulatory & Traceability', icon: FolderTree, description: '10-tier interactive regulatory lineage chain.' },
  { id: '28', title: 'Screen 28: Regulatory Status Matrix', category: 'Regulatory & Traceability', icon: ShieldCheck, description: 'Statutory compliance matrix highlighting gaps.' },
  { id: '29', title: 'Screen 29: Senior Authority Alerts', category: 'Audit & Summary', icon: AlertTriangle, description: 'Oversight alerts with severity, owner, deadline, and action buttons.' },
  { id: '30', title: 'Screen 30: Regulatory Authority View', category: 'Regulatory & Traceability', icon: Globe, description: 'Role-based external regulator portal view.' },
  { id: '31', title: 'Screen 31: Regulatory Authority Dashboard', category: 'Regulatory & Traceability', icon: LayoutDashboard, description: 'External regulatory command dashboard.' },
  { id: '32', title: 'Screen 32: Regulatory Document Viewer', category: 'Audit & Summary', icon: Lock, description: 'Protected statutory document viewer for DGMS notices.' },
  { id: '33', title: 'Screen 33: Regulatory Closure', category: 'Regulatory & Traceability', icon: Award, description: 'Statutory distinction: STRATA CAPA Closed != Regulatory Matter Closed.' },
  { id: '34', title: 'Screen 34: Oversight Workspace Search', category: 'Audit & Summary', icon: Search, description: 'Universal deep search across all entities.' },
  { id: '35', title: 'Screen 35: Final Oversight Summary', category: 'Audit & Summary', icon: Award, description: 'Executive summary spanning all 8 STRATA workspaces.' }
];

export const Workspace8Navigator: React.FC = () => {
  const { quickNavOpen, setQuickNavOpen, navigateTo } = useOversight();
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
        backgroundColor: 'rgba(15, 10, 35, 0.8)',
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
          maxWidth: '920px',
          maxHeight: '85vh',
          backgroundColor: '#1E1B4B',
          borderColor: 'rgba(245, 158, 11, 0.5)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
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
          <Search size={18} color="#FCD34D" />
          <input
            type="text"
            placeholder="Search Workspace 08 Oversight screens (e.g. Risk, Escalation, Traceability, Report, Screen 35)..."
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
              color: '#FCD34D',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Screen Categories Grid */}
        <div style={{ overflowY: 'auto', padding: '16px 20px', flex: 1 }}>
          {categories.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#CBD5E1' }}>
              No screens found matching "{searchTerm}"
            </div>
          ) : (
            categories.map(category => (
              <div key={category} style={{ marginBottom: '18px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#FCD34D',
                    marginBottom: '8px'
                  }}
                >
                  {category}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
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
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.09)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.25)';
                            e.currentTarget.style.borderColor = '#F59E0B';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <Icon size={14} color="#FCD34D" />
                            <span style={{ color: '#FEF3C7', fontSize: '12px', fontWeight: 700 }}>
                              {screen.title}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '11px', color: '#E2E8F0', lineHeight: 1.3 }}>
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
            background: 'rgba(0,0,0,0.35)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#CBD5E1'
          }}
        >
          <span>Tip: Press <kbd style={{ background: '#312E81', padding: '1px 4px', borderRadius: '3px', color: '#FFF' }}>Ctrl+K</kbd> anywhere to open Navigator</span>
          <span style={{ color: '#FEF3C7', fontWeight: 700 }}>Workspace 08 &bull; 35 Oversight & Regulatory Screens</span>
        </div>
      </div>
    </div>
  );
};
