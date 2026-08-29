"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import { VerificationScreenId } from '../../types/verification';
import {
  Search,
  X,
  LayoutDashboard,
  CheckSquare,
  ShieldCheck,
  Layers,
  GitBranch,
  FileText,
  Activity,
  MapPin,
  ListChecks,
  Award,
  CheckCircle2,
  AlertOctagon,
  RotateCcw,
  HelpCircle,
  History,
  Calendar,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

interface ScreenDef {
  id: VerificationScreenId;
  title: string;
  category: 'Dashboard & Queue' | 'Assignment & Review' | 'Measurement & Follow-Up' | 'Decisions & Actions' | 'Reports & Audit';
  icon: any;
  description: string;
}

const SCREENS: ScreenDef[] = [
  { id: '01', title: 'Screen 01: Verification Dashboard', category: 'Dashboard & Queue', icon: LayoutDashboard, description: '8 primary KPI metrics, action queue, overdue alerts, and decision breakdown.' },
  { id: '02', title: 'Screen 02: Verification Queue', category: 'Dashboard & Queue', icon: CheckSquare, description: 'Filterable queue across 7 tabs (Pending, Due Soon, Overdue, Returned, Reverification).' },
  { id: '03', title: 'Screen 03: Verifier Assignment & SoD', category: 'Assignment & Review', icon: ShieldCheck, description: 'Competency profile verification, scope match, and Separation-of-Duties conflict check.' },
  { id: '04', title: 'Screen 04: Verification Details Dossier', category: 'Assignment & Review', icon: Layers, description: '7-section working record for CAPA-2026-0048, 3-point assessment, and decision triggers.' },
  { id: '05', title: 'Screen 05: 12-Tier Traceability Spine', category: 'Assignment & Review', icon: GitBranch, description: 'Horizontal interactive chain linking Regulation to independent Verification.' },
  { id: '06', title: 'Screen 06: Evidence Review & Assessment', category: 'Assignment & Review', icon: FileText, description: 'Inspection of engineering reports, photos, and calibrated measurement before/after logs.' },
  { id: '07', title: 'Screen 07: Measurement Verification', category: 'Measurement & Follow-Up', icon: Activity, description: 'Specialized validator: 5.9 m/s vs >= 5.5 m/s statutory threshold.' },
  { id: '08', title: 'Screen 08: Site / Field Follow-Up Required', category: 'Measurement & Follow-Up', icon: MapPin, description: 'Schedule physical on-site verification inspections with required instruments.' },
  { id: '09', title: 'Screen 09: CAPA Verification Checklist', category: 'Assignment & Review', icon: ListChecks, description: '6 mandatory statutory checks before final verdict.' },
  { id: '10', title: 'Screen 10: Verification Decision', category: 'Decisions & Actions', icon: Award, description: 'Tri-state verdict: PASS, RETURN, FAIL with independent verifier declaration.' },
  { id: '11', title: 'Screen 11: Verification Pass Confirmation', category: 'Decisions & Actions', icon: CheckCircle2, description: 'Lock decision, mark finding VERIFIED, and execute formal statutory closure.' },
  { id: '12', title: 'Screen 12: Verification Failure Notice', category: 'Decisions & Actions', icon: AlertOctagon, description: 'Document failure reasons (measured below threshold, ineffective repair).' },
  { id: '13', title: 'Screen 13: Reopen CAPA (WS06 Handoff)', category: 'Decisions & Actions', icon: RotateCcw, description: 'Transmit failed action back to Workspace 06 action owner for physical rework.' },
  { id: '14', title: 'Screen 14: Return for Clarification', category: 'Decisions & Actions', icon: HelpCircle, description: 'Request missing measurement or report from action owner without failing CAPA.' },
  { id: '15', title: 'Screen 15: Reverification Queue', category: 'Dashboard & Queue', icon: RotateCcw, description: 'Filterable queue for reworked CAPAs undergoing secondary audit cycle.' },
  { id: '16', title: 'Screen 16: Verification History & Cycles', category: 'Reports & Audit', icon: History, description: 'Sequential audit of multiple verification attempts (Cycle 01 Fail -> Cycle 02 Pass).' },
  { id: '17', title: 'Screen 17: Post-Verification Follow-Up', category: 'Measurement & Follow-Up', icon: Calendar, description: 'Schedule recurring monitoring audits to guarantee long-term safety stability.' },
  { id: '18', title: 'Screen 18: Recurrence Advisory & AI', category: 'Measurement & Follow-Up', icon: AlertTriangle, description: 'Historical 3-finding cluster detection, safety analytics, and human authority guard.' },
  { id: '19', title: 'Screen 19: Official Verification Report', category: 'Reports & Audit', icon: FileCheck, description: 'Sealed statutory certificate (VER-2026-0031) with cryptographic SHA-256 seal.' },
  { id: '20', title: 'Screen 20: Verification Audit & Activity', category: 'Reports & Audit', icon: FileText, description: 'Filterable immutable activity ledger under Mines Act, 1952.' },
  { id: '21', title: 'Screen 21: Master Verification Register', category: 'Reports & Audit', icon: Layers, description: 'Division-wide register of all verifications across mines and auditor panels.' }
];

export const Workspace7Navigator: React.FC = () => {
  const { quickNavOpen, setQuickNavOpen, navigateTo } = useVerification();
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
        backgroundColor: 'rgba(5, 25, 30, 0.8)',
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
          maxWidth: '880px',
          maxHeight: '85vh',
          backgroundColor: '#002529',
          borderColor: 'rgba(0, 188, 212, 0.4)',
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
          <Search size={18} color="#80DEEA" />
          <input
            type="text"
            placeholder="Search Workspace 07 screens (e.g. Decision, Measurement, PASS, Fail, Traceability, Report, Screen 04)..."
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
              color: '#80DEEA',
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
            <div style={{ padding: '30px', textAlign: 'center', color: '#80DEEA' }}>
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
                    color: '#80DEEA',
                    marginBottom: '8px'
                  }}
                >
                  {category}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
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
                            e.currentTarget.style.background = 'rgba(0, 188, 212, 0.25)';
                            e.currentTarget.style.borderColor = '#26C6DA';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <Icon size={14} color="#80DEEA" />
                            <span style={{ color: '#E0F7FA', fontSize: '12px', fontWeight: 600 }}>
                              {screen.title}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '11px', color: '#B2EBF2', lineHeight: 1.3 }}>
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
            color: '#80DEEA'
          }}
        >
          <span>Tip: Press <kbd style={{ background: '#006064', padding: '1px 4px', borderRadius: '3px', color: '#FFF' }}>Ctrl+K</kbd> anywhere to open Navigator</span>
          <span style={{ color: '#E0F7FA', fontWeight: 600 }}>Workspace 07 &bull; 21 Verification & Follow-Up Screens</span>
        </div>
      </div>
    </div>
  );
};
