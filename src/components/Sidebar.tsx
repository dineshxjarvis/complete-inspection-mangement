"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import {
  LayoutDashboard,
  Inbox,
  Sparkles,
  FileText,
  Calendar,
  Clock,
  Activity,
  AlertTriangle,
  Eye,
  CheckSquare,
  FileCheck,
  Archive,
  Shield,
  Layers
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentScreen, navigateTo, data } = useStrata();

  const navItems = [
    { id: '01', title: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: '02', title: 'Inspection Intake', icon: Inbox, badge: data.intakeRequests.filter(r => r.status === 'New').length },
    { id: '04', title: 'Recommendations', icon: Sparkles, badge: data.recommendations.filter(r => r.status === 'Awaiting Planning').length, badgeType: 'warning' },
    { id: '06', title: 'Inspection Plans', icon: FileText, badge: data.inspectionPlans.length },
    { id: '09', title: 'Planning Calendar', icon: Calendar, badge: null },
    { id: '10', title: 'Scheduling', icon: Clock, badge: null },
    { id: '15', title: 'Active Inspections', icon: Activity, badge: 1 },
    { id: '12', title: 'Overdue Inspections', icon: AlertTriangle, badge: data.overdueInspections.length, badgeType: 'overdue' },
    { id: '16', title: 'Findings Monitoring', icon: Eye, badge: data.findings.length },
    { id: '17', title: 'CAPA Monitoring', icon: CheckSquare, badge: data.capaList.filter(c => c.status === 'Open' || c.status === 'Overdue').length },
    { id: '18', title: 'Report Status', icon: FileCheck, badge: null },
    { id: '19', title: 'Inspection History', icon: Archive, badge: null },
    { id: '21', title: 'Audit / Activity', icon: Shield, badge: null },
    { id: '22', title: 'Enterprise States', icon: Layers, badge: '9' }
  ];

  return (
    <aside className="left-sidebar">
      <div className="sidebar-section-title">Governance & Planning</div>
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
          <span>GOVERNANCE SPINE:</span><br />
          Authority &rarr; Track &rarr; Type &rarr; Scope &rarr; Status &rarr; Auditability
        </div>
      </div>
    </aside>
  );
};
