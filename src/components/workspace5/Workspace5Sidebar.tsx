"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  LayoutDashboard,
  Inbox,
  AlertOctagon,
  Flame,
  Scale,
  GitCommit,
  FileCheck,
  Send,
  ShieldAlert,
  CheckSquare,
  History,
  FileText,
  Clock,
  Layers,
  FolderArchive,
  CheckCircle2
} from 'lucide-react';

export const Workspace5Sidebar: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    findings,
    notices
  } = useRegulatoryAction();

  const criticalCount = findings.filter(f => f.severity === 'CRITICAL').length;
  const highCount = findings.filter(f => f.severity === 'HIGH').length;
  const escalatedCount = findings.filter(f => f.status === 'Escalated').length;
  const actionRequiredCount = findings.filter(f => f.actionRequired && f.status !== 'Closed').length;

  const navItems = [
    { id: '01', title: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: '02', title: 'Finding Queue', icon: Inbox, badge: findings.length },
    { id: '03', title: 'Critical Findings', icon: Flame, badge: criticalCount + highCount, badgeType: 'overdue' },
    { id: '05', title: 'Regulatory Traceability', icon: GitCommit, badge: '10-Tier' },
    { id: '06', title: 'Classification Matrix', icon: Scale, badge: null },
    { id: '08', title: 'Regulatory Action', icon: FileCheck, badge: actionRequiredCount, badgeType: 'warning' },
    { id: '09', title: 'Notices / Directions', icon: Send, badge: notices.length, badgeType: 'info' },
    { id: '10', title: 'Mine Response Review', icon: FileText, badge: '1 Pending' },
    { id: '11', title: 'Escalation Center', icon: ShieldAlert, badge: escalatedCount, badgeType: 'overdue' },
    { id: '12', title: 'CAPA Handoff (WS06)', icon: CheckSquare, badge: 'Ready' },
    { id: '13', title: 'Action Tracker', icon: Clock, badge: null },
    { id: '15', title: 'Action Register', icon: Layers, badge: null },
    { id: '16', title: 'Regulatory Documents', icon: FolderArchive, badge: null },
    { id: '17', title: 'Resolution & Closure', icon: CheckCircle2, badge: null },
    { id: '14', title: 'Finding History', icon: History, badge: null },
    { id: '18', title: 'Audit / Activity Trail', icon: FileText, badge: null }
  ];

  return (
    <aside className="left-sidebar ws5-sidebar">
      <div
        className="sidebar-section-title"
        style={{ color: '#9FA8DA', letterSpacing: '0.9px' }}
      >
        Regulatory Governance
      </div>
      <ul className="sidebar-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentScreen === item.id ||
            (item.id === '02' && currentScreen === '04') ||
            (item.id === '08' && currentScreen === '09');

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
            borderTopColor: 'rgba(63, 81, 181, 0.4)',
            background: 'rgba(63, 81, 181, 0.1)'
          }}
        >
          <span style={{ color: '#9FA8DA', fontWeight: 700 }}>REGULATORY SPINE:</span><br />
          Finding &rarr; Traceability &rarr; Action &rarr; Notice &rarr; CAPA &rarr; Verification
        </div>
      </div>
    </aside>
  );
};
