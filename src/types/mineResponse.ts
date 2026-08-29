export type MineResponseScreenId =
  | '01' // Dashboard
  | '02' // Mine Inspections
  | '03' // Mine Inspection Details
  | '04' // Inspection Checklist View
  | '05' // Observation Details
  | '06' // Inspection Evidence
  | '07' // Findings
  | '08' // Finding Details
  | '09' // Mine Response Form
  | '10' // Response Review & Submit
  | '10A'// Response Submitted Success
  | '11' // Mine Response History
  | '12' // CAPA Overview
  | '13' // CAPA Details
  | '14' // Overdue Actions
  | '15' // Safety Action Center
  | '16' // Upcoming Inspections
  | '17' // Mine Document / Evidence Submission
  | '18' // CAPA Progress Update
  | '19' // Mine Inspection History
  | '20';// Mine Audit / Activity

export type MineSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type InspectionStatusType =
  | 'Scheduled'
  | 'Active'
  | 'Submitted'
  | 'Under Review'
  | 'Completed'
  | 'External / Regulatory';

export interface RegulatoryTraceability {
  act: string;
  regulation: string;
  clause: string;
  requirement: string;
  applicability: string;
  obligation: string;
  penalProvision: string;
}

export interface MineInspectionItem {
  id: string;
  mine: string;
  colliery: string;
  location: string;
  type: string;
  track: 'Safety' | 'Statutory' | 'Production' | 'Environmental';
  authority: 'Internal' | 'DGMS' | 'CIL Headquarter' | 'Third-Party Safety Audit';
  date: string;
  timeWindow: string;
  leadInspector: {
    id: string;
    name: string;
    designation: string;
    certification: string;
  };
  summary: {
    totalChecklist: number;
    passCount: number;
    failCount: number;
    naCount: number;
    observationsCount: number;
    evidenceCount: number;
    measurementsCount: number;
    confirmedFindingsCount: number;
  };
  findingsCount: number;
  status: InspectionStatusType;
  completedAt?: string;
}

export interface MineChecklistItem {
  id: string;
  requirementId: string;
  category: string;
  requirement: string;
  regulatoryBasis: string;
  clause: string;
  inspectorResult: 'PASS' | 'FAIL' | 'N/A';
  measuredValue?: string;
  requiredValue?: string;
  unit?: string;
  instrument?: string;
  evidenceCount: {
    photos: number;
    measurements: number;
    documents: number;
  };
  status: 'COMPLIANT' | 'NON-COMPLIANT' | 'NOT-APPLICABLE';
  observationId?: string;
  findingId?: string;
}

export interface MineObservation {
  id: string;
  inspectionId: string;
  checklistId: string;
  requirementId: string;
  location: string;
  text: string;
  measurement?: {
    observed: string;
    required: string;
    instrument: string;
    calibrationStatus: 'Valid' | 'Expired' | 'Pending';
    calibrationExpiry: string;
  };
  inspector: {
    name: string;
    designation: string;
  };
  timestamp: string;
  assessment: string;
  photos: string[];
  documents: string[];
  relatedFindingId: string;
}

export interface MineEvidenceItem {
  id: string;
  inspectionId: string;
  type: 'PHOTO' | 'DOCUMENT' | 'MEASUREMENT' | 'CALIBRATION_CERT';
  title: string;
  filename: string;
  capturedBy: string;
  timestamp: string;
  location: string;
  linkedChecklistId: string;
  linkedObservationId: string;
  gpsCoordinates: string;
  sha256Hash: string;
  fileSize: string;
  description: string;
  isInspectorOriginal: boolean;
}

export interface MineFindingItem {
  id: string;
  inspectionId: string;
  title: string;
  issueDescription: string;
  requirementId: string;
  severity: MineSeverity;
  status: 'Confirmed' | 'Under Review' | 'Response Submitted' | 'Closed' | 'CAPA Created';
  capaStatus: 'Required' | 'In Progress' | 'Overdue' | 'Under Verification' | 'Not Required' | 'Closed';
  capaId?: string;
  responseDue: string;
  daysRemaining: number;
  regulatoryTrace: RegulatoryTraceability;
  originalObservationId: string;
  measurementText: string;
  reviewDecision: {
    confirmedBy: string;
    confirmedDate: string;
    reviewerRemarks: string;
  };
  mineResponse?: {
    status: 'Pending' | 'Draft' | 'Submitted' | 'Clarification Requested' | 'Resubmitted';
    submittedAt?: string;
    submittedBy?: string;
    explanation?: string;
    immediateAction?: string;
    rootCause?: string;
    correctiveAction?: string;
    department?: string;
    responsiblePerson?: string;
    targetDate?: string;
    evidenceFiles?: string[];
  };
}

export interface MineResponseVersion {
  version: number;
  timestamp: string;
  actor: string;
  role: string;
  action: 'Draft Created' | 'Response Submitted' | 'Clarification Requested' | 'Response Updated' | 'Response Resubmitted';
  reason?: string;
  explanation: string;
  immediateAction: string;
  rootCause: string;
  correctiveAction: string;
  responsibleDepartment: string;
  responsiblePerson: string;
  targetDate: string;
  attachments: string[];
  digitalSignatureHash: string;
}

export interface MineCAPAItem {
  id: string;
  findingId: string;
  findingTitle: string;
  title: string;
  actionDescription: string;
  department: string;
  responsiblePerson: string;
  responsibleTitle: string;
  priority: MineSeverity;
  dueDate: string;
  daysOverdue?: number;
  status: 'Not Started' | 'In Progress' | 'Overdue' | 'Under Verification' | 'Completed';
  progressPercentage: number;
  verifier: string;
  requiredEvidenceChecklist: {
    id: string;
    title: string;
    completed: boolean;
    fileAttached?: string;
  }[];
  subActions: {
    id: string;
    title: string;
    status: 'Not Started' | 'In Progress' | 'Completed' | 'Pending';
    owner: string;
    dueDate: string;
  }[];
  updates: {
    id: string;
    timestamp: string;
    updatedBy: string;
    progress: number;
    status: string;
    comment: string;
    evidenceFile?: string;
  }[];
}

export interface MineDocumentUpload {
  id: string;
  title: string;
  documentType: 'Maintenance Report' | 'Calibration Certificate' | 'Post-Repair Airflow Log' | 'Statutory Form II' | 'Safety Committee Minute' | 'Photographic Proof';
  relatedFindingId: string;
  relatedCapaId: string;
  uploadedBy: string;
  uploadedAt: string;
  fileSize: string;
  fileFormat: string;
  hash: string;
  status: 'Verified' | 'Attached to Response' | 'Pending Review';
}

export interface UpcomingInspectionItem {
  id: string;
  title: string;
  type: string;
  track: 'Safety' | 'Statutory' | 'Environmental';
  authority: string;
  scope: string;
  date: string;
  time: string;
  leadInspector: string;
  teamMembers: string[];
  status: 'Scheduled' | 'Confirmed' | 'Preparation Required';
  prepRequirements: {
    id: string;
    item: string;
    isReady: boolean;
  }[];
}

export interface MineAuditActivityItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  objectType: 'Inspection' | 'Finding' | 'Mine Response' | 'CAPA' | 'Evidence' | 'Escalation';
  objectId: string;
  previousState: string;
  newState: string;
  reason: string;
  ipAddress: string;
  tamperProofHash: string;
}
