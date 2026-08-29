// STRATA Workspace 02: Inspection Assignment & Team TypeScript Interfaces

export interface InspectorPersonnel {
  id: string;
  name: string;
  avatar: string;
  designation: string;
  department: string;
  organization: string;
  subsidiary: string;
  area: string;
  systemRole: string; // e.g. "Field Inspector", "Mechanical Engineer", "Ventilation Officer", "Electrical Supervisor"
  currentInspectionRole?: string; // e.g. "Lead Inspector", "Safety Specialist", "Mechanical Specialist"
  competencies: string[]; // e.g. ["Safety", "Ventilation", "Emergency Response"]
  authorizations: string[]; // e.g. ["Inspection Execution", "Ventilation Inspection", "Specialist Participation"]
  scope: {
    holding: string;
    subsidiary: string;
    area: string;
    authorizedMines: string[];
  };
  availability: {
    status: 'Available' | 'Assigned' | 'On Leave' | 'Unavailable';
    availableSlots?: string[];
    nextAvailable?: string;
  };
  workload: {
    activeInspections: number;
    upcomingInspections: number;
    overdueAssignments: number;
  };
  certifications: Array<{
    name: string;
    certificateNo: string;
    validUntil: string;
    status: 'Valid' | 'Expiring Soon' | 'Expired';
  }>;
  conflicts?: Array<{
    reason: string;
    conflictingInspectionId: string;
    time: string;
  }>;
  history: Array<{
    inspectionId: string;
    date: string;
    role: string;
    mine: string;
    outcome: string;
  }>;
}

export interface TeamRequirement {
  role: string;
  requiredCount: number;
  mandatory: boolean;
  requiredCompetencies: string[];
  requiredAuthorizations: string[];
}

export interface ScheduledInspectionAssignment {
  id: string;
  planId: string;
  recommendationId: string;
  mine: string;
  area: string;
  subsidiary: string;
  holding: string;
  inspectionType: string;
  track: string;
  authority: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  scheduledDate: string;
  scheduledTime: string;
  shift: string;
  location: string;
  objective: string;
  status: 'Unassigned' | 'Partially Assigned' | 'Team Incomplete' | 'Conflict' | 'Assigned' | 'Starting Soon' | 'Reassignment Required';
  requiredTeam: {
    leadInspectorCount: number;
    supportingCount: number;
    specialistsRequired: string[];
    competencyList: string[];
  };
  assignedTeam: {
    leadInspector?: InspectorPersonnel;
    supportingInspectors: InspectorPersonnel[];
    specialists: Array<{
      person: InspectorPersonnel;
      inspectionRole: string;
    }>;
  };
  preparation: {
    instruments: string[];
    ppe: string[];
    documents: string[];
    siteNotes: string[];
  };
  previousContext: {
    findingsCount: number;
    openCapaCount: number;
    repeatIssue: string;
    lastInspectionDate: string;
  };
  checklistChecksCount: number;
  checklistSample: string[];
  acceptance: {
    totalRequired: number;
    acceptedCount: number;
    declinedCount: number;
    statusText: string;
  };
}

export interface AssignmentValidationCheck {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
  severity: 'error' | 'warning' | 'success';
  actionNeeded?: string;
}

export interface AssignmentHistoryEvent {
  id: string;
  timestamp: string;
  inspectionId: string;
  personName: string;
  inspectionRole: string;
  action: 'Assigned' | 'Added' | 'Reassigned' | 'Removed' | 'Accepted' | 'Declined';
  previousPerson?: string;
  newPerson?: string;
  reason?: string;
  changedBy: string;
}
