"use client";

import React from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  LayoutDashboard,
  Inbox,
  UserPlus,
  Users,
  Calendar,
  UserCheck,
  History,
  Shield,
  Layers,
  FileText,
  Clock,
  AlertTriangle
} from 'lucide-react';

export const Workspace2Sidebar: React.FC = () => {
  const { currentScreen, navigateTo, inspections } = useAssignment();

  const unassignedCount = inspections.filter(i => i.status === 'Unassigned' || i.status === 'Partially Assigned').length;
  const conflictCount = inspections.filter(i => i.status === 'Conflict').length;

  const navItems = [
    { id: '01', title: 'Assignment Dashboard', icon: LayoutDashboard, badge: null },
    { id: '02', title: 'Assignment Queue', icon: Inbox, badge: unassignedCount > 0 ? unassignedCount : null, badgeType: 'warning' },
    { id: '03', title: 'Assignment Preview', icon: FileText, badge: null },
    { id: '04', title: 'Assign Inspection Team', icon: UserPlus, badge: null },
    { id: '05', title: 'Team Assignment Detail', icon: Users, badge: null },
    { id: '07', title: 'Inspector Directory', icon: UserCheck, badge: '7' },
    { id: '08', title: 'Pre-Inspection Brief', icon: FileText, badge: null },
    { id: '09', title: 'Team Validation Engine', icon: Shield, badge: '8 Checks' },
    { id: '15', title: 'Inspector Availability', icon: Calendar, badge: null },
    { id: '16', title: 'Active Assignments', icon: Clock, badge: '4' },
    { id: '12', title: 'Assignment History', icon: History, badge: null },
    { id: '17', title: 'Audit / Activity Feed', icon: Shield, badge: null },
    { id: '18', title: 'Inspector Acceptance', icon: UserCheck, badge: 'Action', badgeType: 'warning' },
    { id: '19', title: 'Conflict State Resolver', icon: AlertTriangle, badge: conflictCount > 0 ? conflictCount : '1', badgeType: 'overdue' },
    { id: '20', title: '10 Enterprise States', icon: Layers, badge: '10' }
  ];

  return (
    <aside className="left-sidebar">
      <div className="sidebar-section-title">Assignment & Team</div>
      <ul className="sidebar-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <li
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigateTo(item.id)}
            >
              <div className="nav-item-content">
                <span className="nav-icon">
                  <Icon size={15} />
                </span>
                <span>{item.title}</span>
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
        <div className="governance-spine-indicator">
          <span>ELIGIBILITY ENGINE:</span><br />
          Competency &bull; Auth &bull; Scope &bull; Availability &bull; Workload &bull; Conflict
        </div>
      </div>
    </aside>
  );
};
