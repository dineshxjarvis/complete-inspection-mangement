"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  AlertOctagon,
  PlayCircle,
  FileUp,
  Send,
  RotateCcw,
  CheckCircle,
  ShieldCheck,
  History,
  FileText,
  ListTodo,
  Layers,
  ShieldAlert
} from 'lucide-react';

export const Workspace6Sidebar: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    capaList
  } = useCorrectiveAction();

  const overdueCount = capaList.filter(c => c.daysRemaining < 0).length;
  const inProgressCount = capaList.filter(c => c.capaStatus === 'IN PROGRESS').length;
  const blockedCount = capaList.filter(c => c.capaStatus === 'BLOCKED').length;
  const awaitingVerifCount = capaList.filter(c => c.capaStatus === 'AWAITING VERIFICATION').length;

  const navItems = [
    { id: '01', title: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: '02', title: 'My CAPA Queue', icon: CheckSquare, badge: capaList.length },
    { id: '03', title: 'CAPA Intake', icon: ListTodo, badge: 'New' },
    { id: '04', title: 'CAPA Details', icon: Layers, badge: 'Active' },
    { id: '05', title: 'Action Plan & Tasks', icon: ListTodo, badge: '3 Tasks' },
    { id: '06', title: 'Update Progress', icon: PlayCircle, badge: '60%' },
    { id: '07', title: 'Upload Evidence', icon: FileUp, badge: '1 Missing', badgeType: 'warning' },
    { id: '08', title: 'Evidence Review', icon: FileText, badge: '2 Files' },
    { id: '09', title: 'Blocked Actions', icon: ShieldAlert, badge: blockedCount, badgeType: 'overdue' },
    { id: '10', title: 'Clarification Thread', icon: Clock, badge: null },
    { id: '11', title: 'Returned Actions', icon: RotateCcw, badge: null },
    { id: '12', title: 'Compliance Status', icon: ShieldCheck, badge: 'Gap' },
    { id: '13', title: 'Submit for Verification', icon: Send, badge: 'Gate' },
    { id: '16', title: 'CAPA Register', icon: Layers, badge: null },
    { id: '17', title: 'Completed Actions', icon: CheckCircle, badge: '1 Done' },
    { id: '18', title: 'Verification Handoff (WS07)', icon: Send, badge: 'WS07' },
    { id: '14', title: 'CAPA History', icon: History, badge: null },
    { id: '15', title: 'Audit & Activity', icon: FileText, badge: null }
  ];

  return (
    <aside className="left-sidebar ws6-sidebar">
      <div
        className="sidebar-section-title"
        style={{ color: '#80CBC4', letterSpacing: '0.9px' }}
      >
        CAPA Execution Spine
      </div>
      <ul className="sidebar-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

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
            borderTopColor: 'rgba(0, 105, 92, 0.4)',
            background: 'rgba(0, 105, 92, 0.1)'
          }}
        >
          <span style={{ color: '#80CBC4', fontWeight: 700 }}>EXECUTION PIPELINE:</span><br />
          Intake &rarr; Plan &rarr; Execute &rarr; Evidence &rarr; Verify (WS07)
        </div>
      </div>
    </aside>
  );
};
