"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  OversightScreenId,
  OrgScope,
  OversightKpis,
  InspectionPerformanceItem,
  MineCompletionRateItem,
  InspectionCoverageItem,
  ActiveInspectionItem,
  CriticalFindingItem,
  RepeatFindingPattern,
  OverdueCapaItem,
  MineRiskProfile,
  RegulatoryNoticeItem,
  TrackAnalyticsItem,
  TypeAnalyticsItem,
  OversightAuditLogItem,
  OversightAlertItem
} from '../types/oversight';

const INITIAL_KPIS: OversightKpis = {
  totalInspections: 482,
  completedInspections: 421,
  inProgressInspections: 32,
  overdueInspections: 29,
  criticalFindings: 18,
  openCapas: 41,
  overdueCapas: 12,
  pendingVerifications: 8,
  repeatFindingsCount: 7
};

const INITIAL_MONTHLY_PERF: InspectionPerformanceItem[] = [
  { month: 'Jan', planned: 40, completed: 38, overdue: 2, rate: 95 },
  { month: 'Feb', planned: 42, completed: 39, overdue: 3, rate: 93 },
  { month: 'Mar', planned: 45, completed: 42, overdue: 3, rate: 93 },
  { month: 'Apr', planned: 40, completed: 37, overdue: 3, rate: 92 },
  { month: 'May', planned: 48, completed: 44, overdue: 4, rate: 91 },
  { month: 'Jun', planned: 44, completed: 41, overdue: 3, rate: 93 },
  { month: 'Jul', planned: 46, completed: 40, overdue: 6, rate: 87 },
  { month: 'Aug', planned: 43, completed: 39, overdue: 4, rate: 90 },
  { month: 'Sep', planned: 45, completed: 41, overdue: 4, rate: 91 },
  { month: 'Oct', planned: 47, completed: 43, overdue: 4, rate: 91 },
  { month: 'Nov', planned: 42, completed: 38, overdue: 4, rate: 90 }
];

const INITIAL_MINE_COMPLETION: MineCompletionRateItem[] = [
  { subsidiary: 'ECL', area: 'Area 1', mine: 'Mine A2', rate: 94, planned: 52, completed: 49, overdue: 3, risk: 'HIGH' },
  { subsidiary: 'ECL', area: 'Area 1', mine: 'Mine A3', rate: 88, planned: 48, completed: 42, overdue: 6, risk: 'MEDIUM' },
  { subsidiary: 'ECL', area: 'Area 1', mine: 'Mine A5', rate: 72, planned: 40, completed: 29, overdue: 11, risk: 'CRITICAL' },
  { subsidiary: 'ECL', area: 'Area 2', mine: 'Mine B1', rate: 96, planned: 55, completed: 53, overdue: 2, risk: 'LOW' },
  { subsidiary: 'CCL', area: 'North Karanpura', mine: 'Mine C4', rate: 81, planned: 46, completed: 37, overdue: 9, risk: 'HIGH' }
];

const INITIAL_COVERAGE: InspectionCoverageItem[] = [
  {
    id: 'COV-01',
    requirement: 'Ventilation Survey (Regulation 153)',
    inspectionType: 'Ventilation',
    frequency: 'Quarterly',
    mine: 'Mine A2',
    expected: 12,
    completed: 10,
    overdue: 2,
    coverage: 83,
    risk: 'HIGH',
    gapDescription: '2 quarterly return airway velocity surveys overdue at Shaft 3'
  },
  {
    id: 'COV-02',
    requirement: 'Strata Control & Support Audit (Regulation 123)',
    inspectionType: 'Strata Control',
    frequency: 'Monthly',
    mine: 'Mine A2',
    expected: 24,
    completed: 24,
    overdue: 0,
    coverage: 100,
    risk: 'LOW',
    gapDescription: '100% compliant with SCAMP monthly pull tests'
  },
  {
    id: 'COV-03',
    requirement: 'Conveyor Safeguards & Fire Interlocks (Regulation 92)',
    inspectionType: 'Mechanical',
    frequency: 'Bi-Monthly',
    mine: 'Mine A5',
    expected: 18,
    completed: 13,
    overdue: 5,
    coverage: 72,
    risk: 'CRITICAL',
    gapDescription: '5 trunk belt thermal sensor checks overdue in High-wall District'
  }
];

const INITIAL_ACTIVE_INSPECTIONS: ActiveInspectionItem[] = [
  {
    id: 'INS-2026-0882',
    mine: 'Mine A2',
    area: 'Area 1',
    subsidiary: 'ECL',
    type: 'Ventilation',
    track: 'Internal Safety',
    leadInspector: 'Er. R. Sharma (Lead Safety Inspector)',
    team: ['Er. R. Sharma', 'M. K. Pandey', 'D. K. Singh'],
    progress: 68,
    findingsCount: 3,
    status: 'IN PROGRESS',
    risk: 'HIGH',
    startDate: '15 Nov 2026',
    targetEndDate: '02 Dec 2026'
  },
  {
    id: 'INS-2026-0890',
    mine: 'Mine A5',
    area: 'Area 1',
    subsidiary: 'ECL',
    type: 'Strata Control',
    track: 'DGMS Statutory',
    leadInspector: 'Er. P. C. Joshi (DGMS Deputy Director)',
    team: ['Er. P. C. Joshi', 'B. C. Roy'],
    progress: 40,
    findingsCount: 5,
    status: 'IN PROGRESS',
    risk: 'CRITICAL',
    startDate: '20 Nov 2026',
    targetEndDate: '05 Dec 2026'
  },
  {
    id: 'INS-2026-0875',
    mine: 'Mine B1',
    area: 'Area 2',
    subsidiary: 'ECL',
    type: 'Electrical Safety',
    track: 'ISO 45001',
    leadInspector: 'Er. K. L. Rao (Lead Auditor)',
    team: ['Er. K. L. Rao', 'A. Sengupta'],
    progress: 100,
    findingsCount: 1,
    status: 'AWAITING REVIEW',
    risk: 'LOW',
    startDate: '10 Nov 2026',
    targetEndDate: '28 Nov 2026'
  }
];

const INITIAL_CRITICAL_FINDINGS: CriticalFindingItem[] = [
  {
    id: 'FND-2026-00127',
    mine: 'Mine A2',
    area: 'Area 1',
    inspectionId: 'INS-2026-0882',
    type: 'Ventilation',
    severity: 'HIGH',
    ageDays: 12,
    capaId: 'CAPA-2026-0048',
    status: 'CONFIRMED',
    title: 'Return Airway Airflow Velocity Deficit in Shaft 3',
    observedCondition: 'Measured velocity 4.8 m/s against statutory threshold >= 5.5 m/s.',
    requiredStandard: 'CMR 2017 Regulation 153(2)(b) — Minimum 5.5 m/s in returns.',
    regulatoryBasis: 'Mines Act, 1952 / Coal Mines Regulations 2017'
  },
  {
    id: 'FND-2026-00128',
    mine: 'Mine A2',
    area: 'Area 1',
    inspectionId: 'INS-2026-0882',
    type: 'Strata Control',
    severity: 'CRITICAL',
    ageDays: 14,
    capaId: 'CAPA-2026-0049',
    status: 'IN PROGRESS',
    title: 'Under-Torqued Roof Bolts in District 4 Split Seam VII',
    observedCondition: 'Torque test recorded 85 Nm vs required >= 120 Nm under SCAMP.',
    requiredStandard: '100% compliance with SCAMP strata control parameters (>= 120 Nm).',
    regulatoryBasis: 'CMR 2017 Regulation 123'
  },
  {
    id: 'FND-2026-00115',
    mine: 'Mine A5',
    area: 'Area 1',
    inspectionId: 'INS-2026-0860',
    type: 'Electrical Safeguards',
    severity: 'CRITICAL',
    ageDays: 22,
    capaId: 'CAPA-2026-0039',
    status: 'OPEN',
    title: 'Flameproof Enclosure Flange Gap Exceeds 0.5mm on Main Substation Breaker',
    observedCondition: 'Feeler gauge measured 0.75mm gap on FLP box door.',
    requiredStandard: 'DGMS Standard FLP flange gap <= 0.50mm in gassy seam.',
    regulatoryBasis: 'CMR 2017 Regulation 185'
  }
];

const INITIAL_REPEAT_FINDINGS: RepeatFindingPattern[] = [
  {
    id: 'PAT-01',
    patternName: 'Ventilation Airflow Velocity Deficit in Return Airways',
    mine: 'Mine A2',
    area: 'Area 1',
    occurrences: 4,
    firstSeenYear: 2025,
    lastSeenYear: 2026,
    capaCount: 3,
    currentStatus: 'RECURRING',
    previousCapa: 'CAPA-2025-0092',
    currentCapa: 'CAPA-2026-0048',
    recommendation: 'Mandate quarterly descaling of regulator louvres and telemetry monitoring.'
  },
  {
    id: 'PAT-02',
    patternName: 'Roof Anchor Torque Degradation under Damp Strata Conditions',
    mine: 'Mine A5',
    area: 'Area 1',
    occurrences: 3,
    firstSeenYear: 2025,
    lastSeenYear: 2026,
    capaCount: 2,
    currentStatus: 'RECURRING',
    previousCapa: 'CAPA-2025-0041',
    currentCapa: 'CAPA-2026-0051',
    recommendation: 'Transition to full resin encapsulation bolts in wet header zones.'
  }
];

const INITIAL_OVERDUE_CAPAS: OverdueCapaItem[] = [
  {
    id: 'CAPA-2026-0048',
    findingId: 'FND-2026-00127',
    mine: 'Mine A2',
    actionTitle: 'Repair ventilation system and overhaul regulator louvres',
    actionOwner: 'Chief Ventilation Engineer (Er. S. K. Mahapatra)',
    department: 'Ventilation Department',
    dueDate: '30 Nov 2026',
    daysOverdue: 8,
    priority: 'HIGH',
    escalationLevel: 'Level 3: Subsidiary Authority',
    escalationDate: '05 Dec 2026',
    status: 'ESCALATED'
  },
  {
    id: 'CAPA-2026-0039',
    findingId: 'FND-2026-00115',
    mine: 'Mine A5',
    actionTitle: 'Machining and gasket replacement for 3.3kV FLP transformer box',
    actionOwner: 'Electrical Maintenance Lead (Er. V. Verma)',
    department: 'Electrical Engineering',
    dueDate: '22 Nov 2026',
    daysOverdue: 16,
    priority: 'CRITICAL',
    escalationLevel: 'Level 4: Senior Authority',
    escalationDate: '28 Nov 2026',
    status: 'OVERDUE'
  }
];

const INITIAL_MINE_RISK_PROFILE: MineRiskProfile = {
  mine: 'Mine A2',
  area: 'Area 1',
  subsidiary: 'ECL',
  overallRisk: 'HIGH',
  riskScore: 78,
  riskDrivers: {
    criticalFindings: 18,
    overdueInspections: 4,
    repeatFindings: 6,
    openCapas: 5,
    verificationFailures: 3
  },
  trendSixMonths: 'INCREASING',
  topIssues: ['1. Ventilation (Regulation 153)', '2. Electrical Safety (Regulation 185)', '3. Emergency Preparedness (Regulation 210)'],
  operationalStatus: 'Operational (Gassy Seam III & VII)'
};

const INITIAL_REGULATORY_NOTICES: RegulatoryNoticeItem[] = [
  {
    reference: 'DGMS/INS/2026/0042',
    authority: 'DGMS',
    mine: 'Mine A2',
    area: 'Area 1',
    inspectionDate: '15 Nov 2026',
    findingTitle: 'Airflow velocity below statutory threshold in return split',
    responseDueDate: '30 Nov 2026',
    responseStatus: 'Submitted',
    regulatoryStatus: 'Awaiting Regulatory Confirmation',
    capaRef: 'CAPA-2026-0048',
    isAuthorityRecordLocked: true
  },
  {
    reference: 'DGMS/INS/2026/0038',
    authority: 'DGMS',
    mine: 'Mine A5',
    area: 'Area 1',
    inspectionDate: '01 Nov 2026',
    findingTitle: 'Substation FLP flange tolerance violation',
    responseDueDate: '15 Nov 2026',
    responseStatus: 'Action Required',
    regulatoryStatus: 'Under Notice',
    capaRef: 'CAPA-2026-0039',
    isAuthorityRecordLocked: true
  }
];

const INITIAL_TRACK_ANALYTICS: TrackAnalyticsItem[] = [
  { track: 'DGMS Statutory', inspections: 24, findings: 18, critical: 5, capas: 12, closureRate: 82, repeatRate: 14 },
  { track: 'ISO 45001', inspections: 31, findings: 22, critical: 1, capas: 15, closureRate: 94, repeatRate: 5 },
  { track: 'Area Oversight', inspections: 72, findings: 46, critical: 7, capas: 29, closureRate: 88, repeatRate: 9 },
  { track: 'Workmen Inspector', inspections: 45, findings: 30, critical: 2, capas: 20, closureRate: 90, repeatRate: 8 },
  { track: 'Internal Safety', inspections: 110, findings: 84, critical: 12, capas: 62, closureRate: 85, repeatRate: 11 },
  { track: 'Environmental Audit', inspections: 28, findings: 15, critical: 0, capas: 10, closureRate: 95, repeatRate: 2 }
];

const INITIAL_TYPE_ANALYTICS: TypeAnalyticsItem[] = [
  { type: 'Ventilation', inspections: 48, findings: 36, findingRate: 75, criticalRate: 22, avgClosureTimeDays: 14, repeatFindingRate: 28 },
  { type: 'Electrical', inspections: 52, findings: 42, findingRate: 80, criticalRate: 26, avgClosureTimeDays: 18, repeatFindingRate: 19 },
  { type: 'Strata Control', inspections: 64, findings: 38, findingRate: 59, criticalRate: 31, avgClosureTimeDays: 11, repeatFindingRate: 15 },
  { type: 'Mechanical', inspections: 38, findings: 24, findingRate: 63, criticalRate: 12, avgClosureTimeDays: 9, repeatFindingRate: 8 },
  { type: 'Safety & PPE', inspections: 80, findings: 32, findingRate: 40, criticalRate: 5, avgClosureTimeDays: 6, repeatFindingRate: 4 },
  { type: 'Emergency Preparedness', inspections: 30, findings: 18, findingRate: 60, criticalRate: 15, avgClosureTimeDays: 12, repeatFindingRate: 10 }
];

const INITIAL_AUDIT_LOG: OversightAuditLogItem[] = [
  {
    id: 'AUD-OVR-01',
    timestamp: '30 Nov 2026 18:30 IST',
    actor: 'Chief Inspection Authority (Dr. A. K. Sen)',
    role: 'Apex Regulatory Director',
    objectType: 'Escalation',
    objectId: 'CAPA-2026-0048',
    action: 'Escalation Advanced to Level 3',
    previousState: 'Level 2: Area Authority',
    newState: 'Level 3: Subsidiary Authority',
    reason: 'Remediation milestone overdue by 8 days; mandated direct GM intervention.'
  },
  {
    id: 'AUD-OVR-02',
    timestamp: '30 Nov 2026 16:45 IST',
    actor: 'Er. R. Sharma',
    role: 'DGMS Panel Senior Auditor',
    objectType: 'Verification',
    objectId: 'VER-2026-0031',
    action: 'Verification Certified PASS',
    previousState: 'In Verification Review',
    newState: 'Verified & Closed',
    reason: '9-grid traverse test certified return velocity at 5.9 m/s, satisfying Reg 153(2)(b).'
  }
];

const INITIAL_ALERTS: OversightAlertItem[] = [
  {
    id: 'ALT-01',
    type: 'Critical Finding',
    title: 'Flange tolerance violation on 3.3kV Main Substation Breaker (0.75mm vs <= 0.50mm)',
    mine: 'Mine A5',
    severity: 'CRITICAL',
    currentOwner: 'Electrical Maintenance Lead',
    requiredAction: 'Immediate breaker de-energization and gasket machining',
    deadline: '24 Hours',
    targetScreen: '06',
    targetId: 'FND-2026-00115'
  },
  {
    id: 'ALT-02',
    type: 'Regulatory Response Overdue',
    title: 'DGMS Inspection Notice Response Overdue for Mine A5 FLP enclosure',
    mine: 'Mine A5',
    severity: 'CRITICAL',
    currentOwner: 'Colliery Manager (Mine A5)',
    requiredAction: 'Submit formal DGMS Form IV rectification certificate',
    deadline: 'Immediate',
    targetScreen: '15',
    targetId: 'DGMS/INS/2026/0038'
  },
  {
    id: 'ALT-03',
    type: 'CAPA Overdue',
    title: 'Ventilation louvre overhaul CAPA overdue by 8 days in Shaft 3',
    mine: 'Mine A2',
    severity: 'HIGH',
    currentOwner: 'Chief Ventilation Engineer',
    requiredAction: 'Complete fan pitch re-alignment and upload 9-grid test logs',
    deadline: '02 Dec 2026',
    targetScreen: '10',
    targetId: 'CAPA-2026-0048'
  },
  {
    id: 'ALT-04',
    type: 'Repeat Finding',
    title: '4th recurrence of airflow velocity deficit across 18 months in Shaft 3',
    mine: 'Mine A2',
    severity: 'HIGH',
    currentOwner: 'General Manager (Area 1)',
    requiredAction: 'Implement quarterly preventive descaling protocol',
    deadline: '15 Dec 2026',
    targetScreen: '08',
    targetId: 'PAT-01'
  }
];

interface OversightContextType {
  currentScreen: OversightScreenId;
  navigateTo: (screen: OversightScreenId, params?: Record<string, any>) => void;
  orgScope: OrgScope;
  setOrgScope: (scope: OrgScope) => void;
  quickNavOpen: boolean;
  setQuickNavOpen: (open: boolean) => void;
  toastMessage: { text: string; type: 'success' | 'warning' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'warning' | 'info' | 'error') => void;

  // Modals
  isEscalateModalOpen: boolean;
  setIsEscalateModalOpen: (open: boolean) => void;
  selectedEscalateItem: OverdueCapaItem | null;
  openEscalateModal: (item: OverdueCapaItem) => void;
  isRegulatoryDocModalOpen: boolean;
  setIsRegulatoryDocModalOpen: (open: boolean) => void;
  selectedRegulatoryDoc: RegulatoryNoticeItem | null;
  openRegulatoryDocModal: (doc: RegulatoryNoticeItem) => void;

  // Datasets
  kpis: OversightKpis;
  monthlyPerformance: InspectionPerformanceItem[];
  mineCompletionRates: MineCompletionRateItem[];
  coverageList: InspectionCoverageItem[];
  activeInspections: ActiveInspectionItem[];
  criticalFindings: CriticalFindingItem[];
  repeatFindings: RepeatFindingPattern[];
  overdueCapas: OverdueCapaItem[];
  mineRiskProfile: MineRiskProfile;
  regulatoryNotices: RegulatoryNoticeItem[];
  trackAnalytics: TrackAnalyticsItem[];
  typeAnalytics: TypeAnalyticsItem[];
  auditLog: OversightAuditLogItem[];
  alerts: OversightAlertItem[];

  // Action Dispatchers
  escalateCapa: (capaId: string, targetLevel: OverdueCapaItem['escalationLevel'], reason: string) => void;
  closeRegulatoryNotice: (ref: string, reason: string) => void;
}

const OversightContext = createContext<OversightContextType | undefined>(undefined);

export const OversightProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<OversightScreenId>('01');
  const [orgScope, setOrgScope] = useState<OrgScope>({
    corporate: 'Coal India Limited (CIL)',
    subsidiary: 'Eastern Coalfields Limited (ECL)',
    area: 'Area 1',
    mine: 'Mine A2'
  });

  const [quickNavOpen, setQuickNavOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'warning' | 'info' | 'error' } | null>(null);

  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState<boolean>(false);
  const [selectedEscalateItem, setSelectedEscalateItem] = useState<OverdueCapaItem | null>(null);

  const [isRegulatoryDocModalOpen, setIsRegulatoryDocModalOpen] = useState<boolean>(false);
  const [selectedRegulatoryDoc, setSelectedRegulatoryDoc] = useState<RegulatoryNoticeItem | null>(null);

  const [kpis, setKpis] = useState<OversightKpis>(INITIAL_KPIS);
  const [overdueCapas, setOverdueCapas] = useState<OverdueCapaItem[]>(INITIAL_OVERDUE_CAPAS);
  const [regulatoryNotices, setRegulatoryNotices] = useState<RegulatoryNoticeItem[]>(INITIAL_REGULATORY_NOTICES);
  const [auditLog, setAuditLog] = useState<OversightAuditLogItem[]>(INITIAL_AUDIT_LOG);

  const showToast = (text: string, type: 'success' | 'warning' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const navigateTo = (screen: OversightScreenId, params?: Record<string, any>) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEscalateModal = (item: OverdueCapaItem) => {
    setSelectedEscalateItem(item);
    setIsEscalateModalOpen(true);
  };

  const openRegulatoryDocModal = (doc: RegulatoryNoticeItem) => {
    setSelectedRegulatoryDoc(doc);
    setIsRegulatoryDocModalOpen(true);
  };

  const escalateCapa = (capaId: string, targetLevel: OverdueCapaItem['escalationLevel'], reason: string) => {
    setOverdueCapas(prev =>
      prev.map(c => {
        if (c.id === capaId) {
          return {
            ...c,
            escalationLevel: targetLevel,
            escalationDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
            status: 'ESCALATED'
          };
        }
        return c;
      })
    );

    const logEntry: OversightAuditLogItem = {
      id: 'AUD-OVR-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Chief Inspection Authority (Dr. A. K. Sen)',
      role: 'Senior Governance Authority',
      objectType: 'Escalation',
      objectId: capaId,
      action: `Escalated to ${targetLevel}`,
      previousState: 'Previous Level',
      newState: targetLevel,
      reason
    };
    setAuditLog(prev => [logEntry, ...prev]);

    showToast(`CAPA ${capaId} formally escalated to ${targetLevel}`, 'warning');
    setIsEscalateModalOpen(false);
  };

  const closeRegulatoryNotice = (ref: string, reason: string) => {
    setRegulatoryNotices(prev =>
      prev.map(n => {
        if (n.reference === ref) {
          return {
            ...n,
            responseStatus: 'Closed',
            regulatoryStatus: 'Closed'
          };
        }
        return n;
      })
    );

    const logEntry: OversightAuditLogItem = {
      id: 'AUD-OVR-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Director General of Mines Safety (DGMS Authorized Signatory)',
      role: 'Statutory Regulator',
      objectType: 'Regulation',
      objectId: ref,
      action: 'Statutory Regulatory Notice Formally Closed',
      previousState: 'Awaiting Regulatory Confirmation',
      newState: 'Closed',
      reason
    };
    setAuditLog(prev => [logEntry, ...prev]);

    showToast(`Regulatory matter ${ref} formally certified and CLOSED by DGMS.`, 'success');
  };

  return (
    <OversightContext.Provider
      value={{
        currentScreen,
        navigateTo,
        orgScope,
        setOrgScope,
        quickNavOpen,
        setQuickNavOpen,
        toastMessage,
        showToast,
        isEscalateModalOpen,
        setIsEscalateModalOpen,
        selectedEscalateItem,
        openEscalateModal,
        isRegulatoryDocModalOpen,
        setIsRegulatoryDocModalOpen,
        selectedRegulatoryDoc,
        openRegulatoryDocModal,
        kpis,
        monthlyPerformance: INITIAL_MONTHLY_PERF,
        mineCompletionRates: INITIAL_MINE_COMPLETION,
        coverageList: INITIAL_COVERAGE,
        activeInspections: INITIAL_ACTIVE_INSPECTIONS,
        criticalFindings: INITIAL_CRITICAL_FINDINGS,
        repeatFindings: INITIAL_REPEAT_FINDINGS,
        overdueCapas,
        mineRiskProfile: INITIAL_MINE_RISK_PROFILE,
        regulatoryNotices,
        trackAnalytics: INITIAL_TRACK_ANALYTICS,
        typeAnalytics: INITIAL_TYPE_ANALYTICS,
        auditLog,
        alerts: INITIAL_ALERTS,
        escalateCapa,
        closeRegulatoryNotice
      }}
    >
      {children}
    </OversightContext.Provider>
  );
};

export const useOversight = () => {
  const context = useContext(OversightContext);
  if (!context) {
    throw new Error('useOversight must be used within an OversightProvider');
  }
  return context;
};
