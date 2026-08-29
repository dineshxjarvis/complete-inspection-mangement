export type OversightScreenId =
  | '01' // Oversight Dashboard
  | '02' // Inspection Performance
  | '03' // Inspection Coverage
  | '04' // Active Inspections
  | '05' // Inspection Overview
  | '06' // Critical Findings
  | '07' // Finding Details — Oversight View
  | '08' // Repeat Findings
  | '09' // CAPA Performance
  | '10' // Overdue CAPA
  | '11' // Risk Overview
  | '12' // Mine Risk Details
  | '13' // Organization Drill-Down
  | '14' // Mine Governance Profile
  | '15' // Regulatory Oversight
  | '16' // External Inspection Details
  | '17' // Regulatory Response Status
  | '18' // Inspection Track Analytics
  | '19' // Inspection Type Analytics
  | '20' // Report Centre
  | '21' // Report Builder
  | '22' // Generated Report
  | '23' // Escalation Centre
  | '24' // Escalation Details
  | '25' // Audit Trail
  | '26' // Object History
  | '27' // Regulatory Traceability
  | '28' // Regulatory Status Matrix
  | '29' // Senior Authority Notifications
  | '30' // Regulatory Authority View
  | '31' // Regulatory Authority Dashboard
  | '32' // Regulatory Document Viewer
  | '33' // Regulatory Closure
  | '34' // Oversight Workspace Search
  | '35';// Final Oversight Summary

export type OrgHierarchyLevel = 'CIL' | 'Subsidiary' | 'Area' | 'Mine';

export interface OrgScope {
  corporate: string; // e.g. Coal India Limited (CIL)
  subsidiary: string; // e.g. Eastern Coalfields Limited (ECL)
  area: string; // e.g. Area 1
  mine: string; // e.g. Mine A2
}

export interface OversightKpis {
  totalInspections: number;
  completedInspections: number;
  inProgressInspections: number;
  overdueInspections: number;
  criticalFindings: number;
  openCapas: number;
  overdueCapas: number;
  pendingVerifications: number;
  repeatFindingsCount: number;
}

export interface InspectionPerformanceItem {
  month: string;
  planned: number;
  completed: number;
  overdue: number;
  rate: number;
}

export interface MineCompletionRateItem {
  subsidiary: string;
  area: string;
  mine: string;
  rate: number;
  planned: number;
  completed: number;
  overdue: number;
  risk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface InspectionCoverageItem {
  id: string;
  requirement: string;
  inspectionType: string;
  frequency: string;
  mine: string;
  expected: number;
  completed: number;
  overdue: number;
  coverage: number; // percentage e.g. 83%
  risk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  gapDescription: string;
}

export interface ActiveInspectionItem {
  id: string; // INS-2026-0882
  mine: string;
  area: string;
  subsidiary: string;
  type: string;
  track: string;
  leadInspector: string;
  team: string[];
  progress: number;
  findingsCount: number;
  status: 'IN PROGRESS' | 'AWAITING REVIEW' | 'COMPLETED';
  risk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  startDate: string;
  targetEndDate: string;
}

export interface CriticalFindingItem {
  id: string; // FND-2026-00127
  mine: string;
  area: string;
  inspectionId: string;
  type: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  ageDays: number;
  capaId: string;
  status: 'OPEN' | 'IN PROGRESS' | 'CONFIRMED' | 'VERIFIED' | 'CLOSED';
  title: string;
  observedCondition: string;
  requiredStandard: string;
  regulatoryBasis: string;
}

export interface RepeatFindingPattern {
  id: string;
  patternName: string;
  mine: string;
  area: string;
  occurrences: number;
  firstSeenYear: number;
  lastSeenYear: number;
  capaCount: number;
  currentStatus: 'RECURRING' | 'MONITORED' | 'CONTROLLED';
  previousCapa: string;
  currentCapa: string;
  recommendation: string;
}

export interface OverdueCapaItem {
  id: string; // CAPA-2026-0048
  findingId: string;
  mine: string;
  actionTitle: string;
  actionOwner: string;
  department: string;
  dueDate: string;
  daysOverdue: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  escalationLevel: 'Level 1: Mine Management' | 'Level 2: Area Authority' | 'Level 3: Subsidiary Authority' | 'Level 4: Senior Authority';
  escalationDate: string;
  status: 'OVERDUE' | 'ESCALATED' | 'IN PROGRESS';
}

export interface MineRiskProfile {
  mine: string;
  area: string;
  subsidiary: string;
  overallRisk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  riskScore: number;
  riskDrivers: {
    criticalFindings: number;
    overdueInspections: number;
    repeatFindings: number;
    openCapas: number;
    verificationFailures: number;
  };
  trendSixMonths: 'INCREASING' | 'STABLE' | 'DECREASING';
  topIssues: string[];
  operationalStatus: string;
}

export interface RegulatoryNoticeItem {
  reference: string; // DGMS/INS/2026/0042
  authority: string; // DGMS
  mine: string;
  area: string;
  inspectionDate: string;
  findingTitle: string;
  responseDueDate: string;
  responseStatus: 'Response Required' | 'Response Draft' | 'Submitted' | 'Awaiting Authority' | 'Action Required' | 'Under Follow-up' | 'Resolved' | 'Regulatory Closure Pending' | 'Closed';
  regulatoryStatus: 'Awaiting Regulatory Confirmation' | 'Under Notice' | 'In Compliance' | 'Closed';
  capaRef: string;
  isAuthorityRecordLocked: boolean;
}

export interface TrackAnalyticsItem {
  track: string;
  inspections: number;
  findings: number;
  critical: number;
  capas: number;
  closureRate: number; // percentage
  repeatRate: number; // percentage
}

export interface TypeAnalyticsItem {
  type: string;
  inspections: number;
  findings: number;
  findingRate: number;
  criticalRate: number;
  avgClosureTimeDays: number;
  repeatFindingRate: number;
}

export interface OversightAuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  objectType: 'Inspection' | 'Finding' | 'CAPA' | 'Verification' | 'Regulation' | 'Escalation' | 'Report';
  objectId: string;
  action: string;
  previousState: string;
  newState: string;
  reason: string;
}

export interface OversightAlertItem {
  id: string;
  type: 'Critical Finding' | 'Regulatory Response Overdue' | 'CAPA Overdue' | 'Repeat Finding' | 'Verification Failed' | 'Inspection Gap' | 'Mine Risk Increased';
  title: string;
  mine: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  currentOwner: string;
  requiredAction: string;
  deadline: string;
  targetScreen: OversightScreenId;
  targetId: string;
}
