export type VerificationScreenId =
  | '01' // Verification Dashboard
  | '02' // Verification Queue
  | '03' // Verification Assignment / Routing
  | '04' // Verification Details
  | '05' // Original Finding ↔ CAPA Traceability
  | '06' // Evidence Review
  | '07' // Measurement Verification
  | '08' // Site / Field Follow-Up
  | '09' // Verification Checklist
  | '10' // Verification Decision
  | '11' // Pass Confirmation
  | '12' // Fail Verification
  | '13' // Reopen CAPA
  | '14' // Return for Clarification
  | '15' // Reverification Queue
  | '16' // Verification History
  | '17' // Follow-Up Monitoring
  | '18' // Recurrence Detected
  | '19' // Verification Report
  | '20' // Verification Audit / Activity
  | '21';// Verification Register

export type VerificationDecisionOutcome = 'PASS' | 'RETURN' | 'FAIL' | 'PENDING';

export type VerificationStatus =
  | 'Awaiting Assignment'
  | 'Awaiting Verification'
  | 'In Verification Review'
  | 'Site Follow-Up Scheduled'
  | 'Clarification Requested'
  | 'Returned to WS06'
  | 'Failed / Reopened'
  | 'Reverification Pending'
  | 'Verified'
  | 'Closed';

export type VerificationSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface VerificationEvidenceItem {
  id: string;
  title: string;
  type: 'Document' | 'Photo' | 'Measurement' | 'Maintenance Record' | 'Repair Report' | 'Other';
  uploadedBy: string;
  uploadTimestamp: string;
  captureDate: string;
  location: string;
  relatedAction: string;
  relatedFinding: string;
  status: 'Accepted' | 'Under Review' | 'Insufficient' | 'Rejected';
  fileSize: string;
  filename: string;
  sha256Hash: string;
  isMeasurement?: boolean;
  measurementData?: {
    beforeValue: string;
    requiredThreshold: string;
    afterValue: string;
    unit: string;
    instrument: string;
    instrumentId: string;
    calibrationStatus: 'VALID' | 'EXPIRED' | 'PENDING_CALIBRATION';
    thresholdSatisfied: boolean;
  };
  photoData?: {
    timestamp: string;
    location: string;
    gpsCoordinates: string;
  };
  verifierRemarks?: string;
}

export interface VerificationItem {
  id: string; // e.g. VER-2026-0031
  capaId: string; // e.g. CAPA-2026-0048
  findingId: string; // e.g. FND-2026-00127
  inspectionId: string;
  mine: string;
  colliery: string;
  location: string;
  capaType: string;
  severity: VerificationSeverity;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  actionTitle: string;
  actionDescription: string;
  actionOwner: string;
  department: string;
  completionDate: string;
  submissionDate: string;
  verificationDueDate: string;
  status: VerificationStatus;
  decision: VerificationDecisionOutcome;
  decisionDate?: string;
  assignedVerifier?: {
    name: string;
    role: string;
    authorizationId: string;
    competency: string[];
    scope: string;
    assignedDate: string;
    separationOfDutiesChecked: boolean;
    conflictDetected: boolean;
  };
  findingSummary: {
    description: string;
    observedCondition: string;
    requiredStandard: string;
    regulatoryBasis: string;
    act: string;
    clause: string;
    inspectionDate: string;
  };
  expectedOutcome: {
    description: string;
    requiredValue: string;
    achievedValue: string;
    thresholdMet: boolean;
  };
  checklist: {
    check01ActionCompleted: boolean;
    check02EvidenceProvided: boolean;
    check03EvidenceAuthentic: boolean;
    check04DemonstratesCorrection: boolean;
    check05MeetsRequirement: boolean;
    check06AdditionalActionRequired: boolean;
    remarks: string;
  };
  evidenceList: VerificationEvidenceItem[];
  followUpRequired?: boolean;
  followUpPlan?: {
    scheduledDate: string;
    verifier: string;
    location: string;
    verificationType: 'Document Review' | 'Measurement' | 'Site Visit' | 'Interview' | 'Technical Test';
    requiredEquipment: string;
    requiredDocuments: string;
    status: 'Scheduled' | 'Completed' | 'Pending';
  };
  recurrenceInfo?: {
    isRecurrenceRisk: boolean;
    clusterCount: number;
    relatedFindings: string[];
    relatedCapas: string[];
    aiAdvisory: string;
  };
  historyCycles: {
    cycleNumber: number;
    submissionDate: string;
    verifier: string;
    decision: 'PASS' | 'FAIL' | 'RETURN';
    reason: string;
    measuredOutcome?: string;
  }[];
  verifierRemarks?: string;
  daysRemaining: number;
}

export interface VerificationAuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  event: string;
  objectType: 'Verification' | 'Decision' | 'Evidence' | 'Assignment' | 'Follow-Up' | 'Recurrence';
  objectId: string;
  previousState: string;
  newState: string;
  reason: string;
  tamperProofHash: string;
}
