// STRATA Platform TypeScript Interfaces & Domain Types

export interface CurrentUser {
  name: string;
  role: string;
  designation: string;
  department: string;
  authority: string;
  badgeId: string;
  permissions: string[];
  avatar: string;
}

export interface ActiveScope {
  holding: string;
  subsidiary: string;
  area: string;
  mine: string;
}

export interface Hierarchy {
  [holding: string]: {
    [subsidiary: string]: {
      [area: string]: string[];
    };
  };
}

export interface RegulationBasis {
  id: string;
  regulation: string;
  clause: string;
  requirement: string;
  applicability: string;
  obligation: string;
  frequency?: string;
  authority?: string;
  track?: string;
  inspectionType?: string;
}

export interface Attachment {
  name: string;
  size: string;
  type: string;
}

export interface IntakeTimeline {
  step: string;
  date: string;
  by: string;
  done: boolean;
  current: boolean;
}

export interface IntakeRequest {
  id: string;
  source: string;
  sourceType: string;
  requester: string;
  designation: string;
  contact: string;
  inspectionTrack: string;
  inspectionType: string;
  scope: {
    holding: string;
    subsidiary: string;
    area: string;
    mine: string;
    location: string;
  };
  reason: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  requestedDate: string;
  received: string;
  status: 'New' | 'Under Review' | 'Accepted' | 'Rejected' | 'Converted to Recommendation' | 'Converted to Plan';
  supportingInfo: string;
  attachments: Attachment[];
  timeline: IntakeTimeline[];
}

export interface RecommendationSignal {
  signal: string;
  detail: string;
}

export interface RecommendationSuggestedConfig {
  suggestedScope: string;
  suggestedChecklist: string;
  requiredCompetencies: string[];
  suggestedDuration: string;
  requiredInstruments: string[];
  requiredPPE: string[];
  requiredDocuments: string[];
}

export interface Recommendation {
  id: string;
  inspectionType: string;
  track: string;
  authority: string;
  mine: string;
  scope: string;
  regulatoryBasis: string;
  regulation: string;
  clause: string;
  requirement: string;
  applicability: string;
  obligation: string;
  frequency: string;
  nextDueDate: string;
  suggestedDate: string;
  dueDate: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  reasonCategory: string;
  reasonSummary: string;
  whyRecommended: RecommendationSignal[];
  previousHistory: {
    lastInspectionId: string;
    lastInspectionDate: string;
    findingsCount: number;
    criticalFindings: string;
    capaStatus: string;
  };
  suggestedConfig: RecommendationSuggestedConfig;
  status: 'Awaiting Planning' | 'Accepted' | 'Deferred' | 'Rejected';
  isHumanDecisionRequired: boolean;
  activity: Array<{ time: string; user: string; action: string }>;
}

export interface InspectionPlan {
  id: string;
  recommendationId: string;
  requestId: string;
  inspectionType: string;
  title: string;
  track: string;
  authority: string;
  organization: string;
  subsidiary: string;
  area: string;
  mine: string;
  location: string;
  planner: string;
  createdDate: string;
  status: 'Draft' | 'Planned' | 'Ready for Scheduling' | 'Scheduled' | 'Cancelled' | 'Completed';
  plannedDate: string;
  plannedDuration: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  purpose: string;
  objective: string;
  planningNotes: string;
  regulatoryBasis: RegulationBasis;
  checklist: {
    templateId: string;
    name: string;
    checksCount: number;
    measurementRequirements: string[];
    evidenceRequirements: string[];
  };
  teamRequirements: {
    leadCompetency: string;
    specialists: string[];
    supportingInspectors: string[];
    minTeamSize: number;
    assignmentStatus: string;
  };
  preparation: {
    instruments: string[];
    ppe: string[];
    documents: string[];
    siteRequirements: string[];
  };
  scheduleData: {
    scheduledDate: string;
    startTime: string;
    endTime: string;
    location: string;
    conflictDetected: boolean;
  } | null;
  activity: Array<{ time: string; user: string; action: string; reason?: string; prev?: string; next?: string }>;
  versions: Array<{ version: string; date: string; user: string; note: string }>;
}

export interface InspectionRecord {
  id: string;
  planId: string;
  recommendationId?: string;
  requestId?: string;
  title: string;
  authority: string;
  track: string;
  type: string;
  scope: string;
  scopeDetails: {
    holding: string;
    subsidiary: string;
    area: string;
    mine: string;
    districts: string;
  };
  status: 'Recommendation' | 'Planning' | 'Scheduled' | 'Assignment' | 'Execution' | 'Review' | 'Final' | 'In Progress';
  stepperStages: Array<{ name: string; status: 'completed' | 'current' | 'pending'; timestamp: string }>;
  plannedDate: string;
  inspectionDate?: string;
  schedule?: {
    date: string;
    time: string;
    shift: string;
    location: string;
    status: string;
  };
  duration: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  source: string;
  planner: string;
  team: {
    assignmentStatus?: string;
    leadInspector: string;
    specialistsRequired?: string[];
    specialists?: string[];
    supportingRequired?: string[];
    supporting?: string[];
  };
  regulatoryBasis: RegulationBasis;
  checklistPreview?: {
    template: string;
    mode: string;
    sampleChecks: Array<{ checkNo: string; item: string; mandatory: boolean }>;
  };
  monitoring?: {
    activeProgress: number;
    completedChecks: string;
    evidenceCollected: number;
    findingsLogged: number;
    lastSync?: string;
    syncStatus?: string;
    offlinePending?: number;
  };
  finalSummary?: {
    outcome: string;
    checklistStatus: string;
    measurementsCount: number;
    measurements: Array<{ param: string; recorded: string; limit: string; result: string }>;
    observationsCount: number;
    findingsCount: number;
    findings: Array<{ id: string; title: string; severity: string; status: string }>;
    capaCount: number;
    capa: Array<{ id: string; action: string; status: string; verifiedBy: string }>;
    reportVersion: string;
    versions: Array<{ version: string; date: string; user: string; note: string }>;
  };
  activity: Array<{ time: string; user: string; action: string; reason?: string }>;
}

export interface CalendarEvent {
  id: string;
  planId: string;
  mine: string;
  area: string;
  type: string;
  date: string;
  time: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  status: string;
  leadInspector: string;
  hasConflict: boolean;
  conflictDetails?: {
    reason: string;
    conflictingWith: string;
    suggestedAlternatives: Array<{ option: string; date: string; time: string; label: string }>;
  };
}

export interface OverdueInspection {
  id: string;
  mine: string;
  area: string;
  type: string;
  dueDate: string;
  daysOverdue: number;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  currentStage: string;
  owner: string;
  statutoryRef: string;
  reason: string;
}

export interface Finding {
  id: string;
  inspectionId: string;
  mine: string;
  findingType: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  inspector: string;
  reviewer: string;
  status: 'Proposed' | 'Under Review' | 'Confirmed' | 'Returned';
  capaRequired: boolean;
  description: string;
  regulationRef: string;
  actionUrl: string;
  hasReviewerPermission: boolean;
}

export interface CAPA {
  id: string;
  findingId: string;
  inspectionId: string;
  mine: string;
  department: string;
  actionOwner: string;
  actionTitle: string;
  dueDate: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Due Soon' | 'Overdue' | 'Awaiting Verification' | 'Closed';
  verifier: string;
  canManagerVerify: boolean;
}

export interface ReportStatus {
  id: string;
  inspectionId: string;
  mine: string;
  reportVersion: string;
  leadInspector: string;
  submittedDate: string;
  reviewer: string;
  status: 'Draft' | 'Submitted' | 'Awaiting Review' | 'Returned' | 'Approved' | 'Final';
  lastAction: string;
  canApprove: boolean;
}

export interface GlobalAuditRecord {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  objectType: string;
  objectId: string;
  scope: string;
  previousState: string;
  newState: string;
  reason: string;
}
