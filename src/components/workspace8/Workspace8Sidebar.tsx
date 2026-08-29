"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Activity,
  AlertTriangle,
  FileText,
  Clock,
  RotateCcw,
  TrendingUp,
  AlertOctagon,
  Building,
  Layers,
  Globe,
  Sliders,
  Award,
  CheckCircle2,
  FileCheck,
  FolderTree,
  Send,
  History,
  Lock,
  Search,
  Bell,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export const Workspace8Sidebar: React.FC = () => {
  const { currentScreen, navigateTo, kpis } = useOversight();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    oversight: true,
    findings: true,
    capa: true,
    risk: true,
    governance: true,
    regulatory: true,
    escalation: true,
    reports: true,
    audit: true
  });

  const toggleSection = (sec: string) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  return (
    <aside className="left-sidebar ws8-sidebar" style={{ width: '250px' }}>
      <div
        className="sidebar-section-title"
        style={{ color: '#FCD34D', letterSpacing: '1px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span>Apex Governance Spine</span>
        <span style={{ fontSize: '9px', background: '#D97706', color: '#FFF', padding: '1px 5px', borderRadius: '3px' }}>35 SCREENS</span>
      </div>

      <ul className="sidebar-nav-list" style={{ paddingBottom: '30px' }}>
        {/* Main Dashboard */}
        <li
          className={`sidebar-nav-item ${currentScreen === '01' ? 'active' : ''}`}
          onClick={() => navigateTo('01')}
        >
          <div className="nav-item-content">
            <span className="nav-icon"><LayoutDashboard size={14} /></span>
            <span style={{ fontSize: '12px', fontWeight: currentScreen === '01' ? 700 : 500 }}>Executive Dashboard</span>
          </div>
        </li>

        {/* 1. Inspection Oversight Section */}
        <div style={{ marginTop: '6px' }}>
          <div
            onClick={() => toggleSection('oversight')}
            style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>Inspection Oversight</span>
            {openSections.oversight ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>

          {openSections.oversight && (
            <div style={{ paddingLeft: '8px' }}>
              <li className={`sidebar-nav-item ${currentScreen === '02' ? 'active' : ''}`} onClick={() => navigateTo('02')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><BarChart3 size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Performance Metrics</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '03' ? 'active' : ''}`} onClick={() => navigateTo('03')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><ShieldCheck size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Programme Coverage</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '04' ? 'active' : ''}`} onClick={() => navigateTo('04')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Activity size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Active Inspections</span>
                </div>
                <span className="nav-count-badge info">{kpis.inProgressInspections}</span>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '05' ? 'active' : ''}`} onClick={() => navigateTo('05')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><FileText size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Inspection Dossier</span>
                </div>
              </li>
            </div>
          )}
        </div>

        {/* 2. Findings Section */}
        <div style={{ marginTop: '6px' }}>
          <div
            onClick={() => toggleSection('findings')}
            style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>Statutory Findings</span>
            {openSections.findings ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>

          {openSections.findings && (
            <div style={{ paddingLeft: '8px' }}>
              <li className={`sidebar-nav-item ${currentScreen === '06' ? 'active' : ''}`} onClick={() => navigateTo('06')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><AlertTriangle size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Critical Findings</span>
                </div>
                <span className="nav-count-badge overdue">{kpis.criticalFindings}</span>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '07' ? 'active' : ''}`} onClick={() => navigateTo('07')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><FileText size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Finding Oversight View</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '08' ? 'active' : ''}`} onClick={() => navigateTo('08')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><RotateCcw size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Repeat Findings</span>
                </div>
                <span className="nav-count-badge warning">{kpis.repeatFindingsCount}</span>
              </li>
            </div>
          )}
        </div>

        {/* 3. CAPA Section */}
        <div style={{ marginTop: '6px' }}>
          <div
            onClick={() => toggleSection('capa')}
            style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>CAPA Governance</span>
            {openSections.capa ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>

          {openSections.capa && (
            <div style={{ paddingLeft: '8px' }}>
              <li className={`sidebar-nav-item ${currentScreen === '09' ? 'active' : ''}`} onClick={() => navigateTo('09')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><BarChart3 size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>CAPA Performance</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '10' ? 'active' : ''}`} onClick={() => navigateTo('10')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Clock size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Overdue CAPA</span>
                </div>
                <span className="nav-count-badge overdue">{kpis.overdueCapas}</span>
              </li>
            </div>
          )}
        </div>

        {/* 4. Risk & Analytics */}
        <div style={{ marginTop: '6px' }}>
          <div
            onClick={() => toggleSection('risk')}
            style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>Risk & Analytics</span>
            {openSections.risk ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>

          {openSections.risk && (
            <div style={{ paddingLeft: '8px' }}>
              <li className={`sidebar-nav-item ${currentScreen === '11' ? 'active' : ''}`} onClick={() => navigateTo('11')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><TrendingUp size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Risk Matrix Overview</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '12' ? 'active' : ''}`} onClick={() => navigateTo('12')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><AlertOctagon size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Mine Risk Profile</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '18' ? 'active' : ''}`} onClick={() => navigateTo('18')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Layers size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Track Analytics</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '19' ? 'active' : ''}`} onClick={() => navigateTo('19')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Sliders size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Domain Type Analytics</span>
                </div>
              </li>
            </div>
          )}
        </div>

        {/* 5. Organization Hierarchy */}
        <div style={{ marginTop: '6px' }}>
          <div
            onClick={() => toggleSection('governance')}
            style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>Colliery Organization</span>
            {openSections.governance ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>

          {openSections.governance && (
            <div style={{ paddingLeft: '8px' }}>
              <li className={`sidebar-nav-item ${currentScreen === '13' ? 'active' : ''}`} onClick={() => navigateTo('13')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><FolderTree size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Organization Tree</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '14' ? 'active' : ''}`} onClick={() => navigateTo('14')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Building size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Mine Governance Profile</span>
                </div>
              </li>
            </div>
          )}
        </div>

        {/* 6. Regulatory Governance */}
        <div style={{ marginTop: '6px' }}>
          <div
            onClick={() => toggleSection('regulatory')}
            style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>Regulatory Oversight</span>
            {openSections.regulatory ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>

          {openSections.regulatory && (
            <div style={{ paddingLeft: '8px' }}>
              <li className={`sidebar-nav-item ${currentScreen === '15' ? 'active' : ''}`} onClick={() => navigateTo('15')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Globe size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>External DGMS Notices</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '16' ? 'active' : ''}`} onClick={() => navigateTo('16')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Lock size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>External Inspection Record</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '17' ? 'active' : ''}`} onClick={() => navigateTo('17')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Send size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Regulatory Response Status</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '27' ? 'active' : ''}`} onClick={() => navigateTo('27')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><FolderTree size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>10-Tier Traceability</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '28' ? 'active' : ''}`} onClick={() => navigateTo('28')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><ShieldCheck size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Status Matrix</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '30' ? 'active' : ''}`} onClick={() => navigateTo('30')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Globe size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Regulator Portal View</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '31' ? 'active' : ''}`} onClick={() => navigateTo('31')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><LayoutDashboard size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Regulator Dashboard</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '33' ? 'active' : ''}`} onClick={() => navigateTo('33')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Award size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Regulatory Closure Protocol</span>
                </div>
              </li>
            </div>
          )}
        </div>

        {/* 7. Escalation Centre */}
        <div style={{ marginTop: '6px' }}>
          <div
            onClick={() => toggleSection('escalation')}
            style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>Escalation Protocol</span>
            {openSections.escalation ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>

          {openSections.escalation && (
            <div style={{ paddingLeft: '8px' }}>
              <li className={`sidebar-nav-item ${currentScreen === '23' ? 'active' : ''}`} onClick={() => navigateTo('23')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><AlertOctagon size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Escalation Centre</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '24' ? 'active' : ''}`} onClick={() => navigateTo('24')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Send size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Escalation Details</span>
                </div>
              </li>
            </div>
          )}
        </div>

        {/* 8. Reports & Intelligence */}
        <div style={{ marginTop: '6px' }}>
          <div
            onClick={() => toggleSection('reports')}
            style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>Reports & Summary</span>
            {openSections.reports ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>

          {openSections.reports && (
            <div style={{ paddingLeft: '8px' }}>
              <li className={`sidebar-nav-item ${currentScreen === '20' ? 'active' : ''}`} onClick={() => navigateTo('20')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><FileCheck size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Report Centre</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '21' ? 'active' : ''}`} onClick={() => navigateTo('21')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Sliders size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Report Builder</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '22' ? 'active' : ''}`} onClick={() => navigateTo('22')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><FileText size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Generated Report</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '35' ? 'active' : ''}`} onClick={() => navigateTo('35')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Award size={13} /></span>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#FCD34D' }}>Final Oversight Summary</span>
                </div>
              </li>
            </div>
          )}
        </div>

        {/* 9. History & Audit */}
        <div style={{ marginTop: '6px' }}>
          <div
            onClick={() => toggleSection('audit')}
            style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span>Audit & Verification</span>
            {openSections.audit ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>

          {openSections.audit && (
            <div style={{ paddingLeft: '8px' }}>
              <li className={`sidebar-nav-item ${currentScreen === '25' ? 'active' : ''}`} onClick={() => navigateTo('25')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><History size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Global Audit Trail</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '26' ? 'active' : ''}`} onClick={() => navigateTo('26')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Clock size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Object History</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '29' ? 'active' : ''}`} onClick={() => navigateTo('29')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Bell size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Oversight Alerts</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '32' ? 'active' : ''}`} onClick={() => navigateTo('32')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Lock size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Regulatory Doc Viewer</span>
                </div>
              </li>
              <li className={`sidebar-nav-item ${currentScreen === '34' ? 'active' : ''}`} onClick={() => navigateTo('34')}>
                <div className="nav-item-content">
                  <span className="nav-icon"><Search size={13} /></span>
                  <span style={{ fontSize: '11.5px' }}>Universal Search</span>
                </div>
              </li>
            </div>
          )}
        </div>
      </ul>
    </aside>
  );
};
