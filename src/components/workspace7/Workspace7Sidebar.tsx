"use client";

import React from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  LayoutDashboard,
  CheckSquare,
  ShieldCheck,
  Award,
  GitBranch,
  FileText,
  Activity,
  MapPin,
  ListChecks,
  CheckCircle2,
  AlertOctagon,
  RotateCcw,
  HelpCircle,
  History,
  Calendar,
  AlertTriangle,
  FileCheck,
  Layers
} from 'lucide-react';

export const Workspace7Sidebar: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    verificationList
  } = useVerification();

  const pendingCount = verificationList.filter(v => v.status === 'Awaiting Verification' || v.status === 'In Verification Review').length;
  const overdueCount = verificationList.filter(v => v.daysRemaining < 0).length;

  const navItems = [
    { id: '01', title: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: '02', title: 'Verification Queue', icon: CheckSquare, badge: pendingCount, badgeType: 'info' },
    { id: '03', title: 'Verifier Routing & SoD', icon: ShieldCheck, badge: 'SoD ✓' },
    { id: '04', title: 'Verification Dossier', icon: Layers, badge: 'Active' },
    { id: '05', title: '12-Tier Traceability', icon: GitBranch, badge: 'Chain' },
    { id: '06', title: 'Evidence Review', icon: FileText, badge: '4 Files' },
    { id: '07', title: 'Measurement Validator', icon: Activity, badge: '5.9 m/s' },
    { id: '08', title: 'Site Follow-Up Plan', icon: MapPin, badge: 'Field' },
    { id: '09', title: 'Verification Checklist', icon: ListChecks, badge: '6 Checks' },
    { id: '10', title: 'Verification Decision', icon: Award, badge: 'Verdict' },
    { id: '11', title: 'PASS & Final Closure', icon: CheckCircle2, badge: 'PASS' },
    { id: '12', title: 'FAIL Notice', icon: AlertOctagon, badge: 'FAIL' },
    { id: '13', title: 'Reopen CAPA (WS06)', icon: RotateCcw, badge: 'Rework' },
    { id: '14', title: 'Return Clarification', icon: HelpCircle, badge: null },
    { id: '15', title: 'Reverification Queue', icon: RotateCcw, badge: null },
    { id: '16', title: 'Verification History', icon: History, badge: 'Cycles' },
    { id: '17', title: 'Follow-Up Monitoring', icon: Calendar, badge: '15 Jan' },
    { id: '18', title: 'Recurrence Advisory', icon: AlertTriangle, badge: '3 Finds', badgeType: 'warning' },
    { id: '19', title: 'Verification Report', icon: FileCheck, badge: 'Sealed' },
    { id: '21', title: 'Verification Register', icon: Layers, badge: null },
    { id: '20', title: 'Audit / Activity Trail', icon: FileText, badge: null }
  ];

  return (
    <aside className="left-sidebar ws7-sidebar">
      <div
        className="sidebar-section-title"
        style={{ color: '#80DEEA', letterSpacing: '0.9px' }}
      >
        Independent Audit Spine
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
                <span style={{ fontSize: '12px' }}>{item.title}</span>
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
            borderTopColor: 'rgba(0, 151, 167, 0.4)',
            background: 'rgba(0, 151, 167, 0.1)'
          }}
        >
          <span style={{ color: '#80DEEA', fontWeight: 700 }}>VERIFICATION SPUR:</span><br />
          Review &rarr; Measure &rarr; Decide (PASS / RETURN / FAIL)
        </div>
      </div>
    </aside>
  );
};
