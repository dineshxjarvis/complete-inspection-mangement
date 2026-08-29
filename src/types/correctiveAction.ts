export type CorrectiveScreenId =
  | '01' // CAPA Dashboard
  | '02' // My CAPA / Action Queue
  | '03' // CAPA Intake
  | '04' // CAPA Details
  | '05' // Action Plan
  | '06' // Update Progress
  | '07' // Evidence Upload
  | '08' // Evidence Review
  | '09' // Blocked Action
  | '10' // Request Clarification
  | '11' // Returned CAPA
  | '12' // Compliance Status
  | '13' // Submit for Verification
  | '14' // CAPA History
  | '15' // Action Audit
  | '16' // CAPA Register
  | '17' // Completed Actions
  | '18';// Verification Handoff Summary

// Multi-Domain State Models
export type FindingStatus = 'CONFIRMED' | 'OPEN' | 'RESOLVED' | 'CLOSED';

export type CapaStatus =
  | 'CREATED'
  | 'ASSIGNED'
  | 'IN PROGRESS'
  | 'BLOCKED'
  | 'COMPLETED'
  | 'AWAITING VERIFICATION'
  | 'RETURNED'
  | 'VERIFIED';

export type CapaEvidenceStatus = 'MISSING' | 'UPLOADED' | 'UNDER REVIEW' | 'ACCEPTED' | 'REJECTED';

export type ComplianceStatus = 'NOT VERIFIED' | 'PENDING' | 'VERIFIED' | 'NON-COMPLIANT' | 'COMPLIANT';

export type CapaPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type BlockerReason =
  | 'Equipment unavailable'
  | 'Spare parts unavailable'
  | 'Mine operational restriction'
  | 'Safety restriction'
  | 'Vendor dependency'
  | 'Regulatory dependency'
  | 'Weather'
  | 'Personnel unavailable'
  | 'Other';

export interface CapaTaskItem {
  id: string;
  title: string;
  description: string;
  owner: string;
  department: string;
  startDate: string;
  dueDate: string;
  status: 'PENDING' | 'IN PROGRESS' | 'COMPLETE' | 'BLOCKED';
  dependencies: string[];
  evidenceRequired: boolean;
  evidenceType?: string;
  progressPercentage: number;
}

export interface CapaEvidenceItem {
  id: string;
  title: string;
  type: 'Document' | 'Photo' | 'Measurement' | 'Other';
  description: string;
  date: string;
  location: string;
  capturedBy: string;
  relatedTaskId: string;
  status: CapaEvidenceStatus;
  fileSize: string;
  filename: string;
  sha256Hash: string;
  measurementData?: {
    value: string;
    unit: string;
    instrument: string;
    instrumentId: string;
    calibrationStatus: string;
  };
  photoData?: {
    timestamp: string;
    location: string;
    gpsCoordinates?: string;
  };
}

export interface CapaItem {
  id: string;
  findingId: string;
  findingTitle: string;
  findingSeverity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  mine: string;
  colliery: string;
  location: string;
  inspectionId: string;
  actionTitle: string;
  actionDescription: string;
  requiredCorrection: string;
  expectedOutcome: string;
  department: string;
  owner: string;
  assignedBy: string;
  assignedDate: string;
  dueDate: string;
  originalDueDate: string;
  priority: CapaPriority;
  capaStatus: CapaStatus;
  findingStatus: FindingStatus;
  complianceStatus: ComplianceStatus;
  progressPercentage: number;
  regulatoryRequirement: string;
  clause: string;
  act: string;
  tasks: CapaTaskItem[];
  evidenceList: CapaEvidenceItem[];
  requiredEvidenceCount: number;
  uploadedEvidenceCount: number;
  comments: {
    id: string;
    author: string;
    role: string;
    timestamp: string;
    text: string;
  }[];
  blocker?: {
    isBlocked: boolean;
    reason: BlockerReason;
    details: string;
    timeExtensionRequested: boolean;
    requestedNewDate?: string;
    supportingDoc?: string;
    submittedAt: string;
    approvalStatus: 'Pending Review' | 'Approved' | 'Rejected';
  };
  clarification?: {
    isRequested: boolean;
    question: string;
    requestedAt: string;
    targetAuthority: string;
    response?: string;
  };
  returnedInfo?: {
    isReturned: boolean;
    returnReason: string;
    reviewerComment: string;
    requiredCorrection: string;
    returnedDate: string;
    returnedBy: string;
    previousSubmissionDate: string;
  };
  verificationResult?: {
    latestMeasurement: string;
    requiredThreshold: string;
    verifiedBy: string;
    verificationDate: string;
    result: 'PASS' | 'FAIL' | 'PENDING';
  };
  daysRemaining: number;
}

export interface CapaAuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  event: string;
  objectType: 'CAPA' | 'Task' | 'Evidence' | 'Blocker' | 'Clarification' | 'Submission';
  objectId: string;
  previousState: string;
  newState: string;
  reason: string;
  tamperProofHash: string;
}
