"use client";

import React from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  Activity,
  History,
  AlertTriangle,
  Flame,
  FileCheck,
  CheckSquare,
  Clock,
  Paperclip,
  ShieldAlert,
  FileText,
  GitBranch
} from 'lucide-react';

export const Workspace4Sidebar: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    findings,
    capaList,
    upcomingInspections
  } = useMineResponse();

  const criticalFindingsCount = findings.filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH').length;
  const pendingResponsesCount = findings.filter(f => f.status === 'Confirmed').length;
  const overdueCapaCount = capaList.filter(c => c.status === 'Overdue').length;
  const openCapaCount = capaList.filter(c => c.status === 'In Progress' || c.status === 'Overdue').length;

  const navItems = [
    { id: '01', title: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: '02', title: 'Mine Inspections', icon: Inbox, badge: '5' },
    { id: '16', title: 'Upcoming Inspections', icon: Calendar, badge: upcomingInspections.length, badgeType: 'info' },
    { id: '07', title: 'Findings', icon: AlertTriangle, badge: findings.length },
    { id: '07_crit', title: 'Critical Findings', icon: Flame, badge: criticalFindingsCount, badgeType: 'overdue', targetScreen: '07' },
    { id: '09', title: 'Mine Responses', icon: FileCheck, badge: pendingResponsesCount, badgeType: 'warning' },
    { id: '11', title: 'Response History', icon: GitBranch, badge: 'v3' },
    { id: '12', title: 'CAPA Management', icon: CheckSquare, badge: openCapaCount },
    { id: '14', title: 'Overdue Actions', icon: Clock, badge: overdueCapaCount, badgeType: 'overdue' },
    { id: '15', title: 'Safety Action Center', icon: ShieldAlert, badge: 'Urgent', badgeType: 'overdue' },
    { id: '17', title: 'Evidence / Documents', icon: Paperclip, badge: null },
    { id: '19', title: 'Inspection History', icon: History, badge: null },
    { id: '20', title: 'Audit / Activity Trail', icon: FileText, badge: null }
  ];

  return (
    <aside className="left-sidebar ws4-sidebar">
      <div
        className="sidebar-section-title"
        style={{ color: '#80CBC4', letterSpacing: '0.9px' }}
      >
        Mine Safety & Response
      </div>
      <ul className="sidebar-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const targetScreenId = (item.targetScreen || item.id) as any;
          const isActive =
            currentScreen === item.id ||
            (item.id === '07' && (currentScreen === '08' || currentScreen === '07')) ||
            (item.id === '09' && (currentScreen === '09' || currentScreen === '10' || currentScreen === '10A')) ||
            (item.id === '12' && (currentScreen === '13' || currentScreen === '18')) ||
            (item.id === '02' && (currentScreen === '03' || currentScreen === '04' || currentScreen === '05' || currentScreen === '06'));

          return (
            <li
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigateTo(targetScreenId)}
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
            borderTopColor: 'rgba(0, 150, 136, 0.35)',
            background: 'rgba(0, 150, 136, 0.08)'
          }}
        >
          <span style={{ color: '#80CBC4', fontWeight: 700 }}>MINE SAFETY SPINE:</span><br />
          Receive &rarr; Understand &rarr; Respond &rarr; Evidence &rarr; Corrective Action &rarr; Verify
        </div>
      </div>
    </aside>
  );
};
