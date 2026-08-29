"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  LayoutDashboard,
  Inbox,
  FileText,
  CheckSquare,
  PlayCircle,
  PauseCircle,
  Camera,
  Eye,
  AlertOctagon,
  RefreshCw,
  Users,
  ShieldCheck,
  RotateCcw,
  GitBranch,
  History,
  Archive,
  Clock
} from 'lucide-react';

export const Workspace3Sidebar: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    syncItems,
    activeInspection,
    proposedFindings,
    checklistItems
  } = useFieldInspection();

  const pendingSyncCount = syncItems.filter(s => s.status === 'Pending' || s.status === 'Failed').length;
  const nonCompliantCount = checklistItems.filter(c => c.status === 'Non-Compliant').length;

  const navItems = [
    { id: '01', title: 'My Dashboard', icon: LayoutDashboard, badge: null },
    { id: '02', title: 'My Inspections', icon: Inbox, badge: '5' },
    { id: '03', title: 'Inspection Brief', icon: FileText, badge: 'Ready', badgeType: 'info' },
    { id: '04', title: 'Ready for Inspection', icon: CheckSquare, badge: null },
    { id: '06', title: 'Active Inspections', icon: PlayCircle, badge: 'In Progress', badgeType: 'active' },
    { id: '07', title: 'Checklist (22 Checks)', icon: CheckSquare, badge: `${checklistItems.filter(c => c.status !== 'Pending').length}/22` },
    { id: '10', title: 'Observation Capture', icon: Eye, badge: '7' },
    { id: '12', title: 'Evidence Capture', icon: Camera, badge: '28' },
    { id: '13', title: 'Proposed Findings', icon: AlertOctagon, badge: proposedFindings.length, badgeType: 'overdue' },
    { id: '11A', title: 'Paused Inspections', icon: PauseCircle, badge: activeInspection.status === 'Paused' ? '1' : null, badgeType: 'warning' },
    { id: '14', title: 'Pending Sync', icon: RefreshCw, badge: pendingSyncCount > 0 ? pendingSyncCount : null, badgeType: 'warning' },
    { id: '15', title: 'Team Activity', icon: Users, badge: '2 Active' },
    { id: '16', title: 'Field Self-Review', icon: ShieldCheck, badge: 'Pre-Submit', badgeType: 'info' },
    { id: '18', title: 'Returned', icon: RotateCcw, badge: '1 Action', badgeType: 'overdue' },
    { id: '19', title: 'Inspection History', icon: GitBranch, badge: 'v3' },
    { id: '20', title: 'Audit Trail', icon: History, badge: null },
    { id: '21', title: 'Completed Archive', icon: Archive, badge: '3' }
  ];

  return (
    <aside className="left-sidebar ws3-sidebar">
      <div className="sidebar-section-title">Field Operations</div>
      <ul className="sidebar-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || (item.id === '06' && currentScreen === '05') || (item.id === '07' && (currentScreen === '08' || currentScreen === '09'));
          return (
            <li
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigateTo(item.id as any)}
            >
              <div className="nav-item-content">
                <span className="nav-icon">
                  <Icon size={15} />
                </span>
                <span style={{ fontSize: '12.5px' }}>{item.title}</span>
              </div>
              {item.badge !== null && (
                <span className={`nav-count-badge ${item.badgeType || ''}`}>
                  {item.badge}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <div
          className="governance-spine-indicator"
          style={{
            borderTopColor: 'rgba(255, 107, 0, 0.3)',
            background: 'rgba(255, 107, 0, 0.05)'
          }}
        >
          <span style={{ color: '#FFB74D', fontWeight: 700 }}>FIELD EXECUTION SPINE:</span><br />
          Brief &rarr; Readiness &rarr; Checklist &rarr; Evidence &rarr; Observation &rarr; Finding &rarr; Review &rarr; Submit
        </div>
      </div>
    </aside>
  );
};
