export type RegulatoryScreenId =
  | '01' // Dashboard
  | '02' // Finding Queue
  | '03' // Critical Findings
  | '04' // Finding Details
  | '05' // Regulatory Traceability
  | '06' // Finding Classification
  | '07' // Similar / Recurring Findings
  | '08' // Regulatory Action Decision
  | '09' // Notice / Direction Details
  | '10' // Mine Response Status
  | '11' // Escalation Center
  | '12' // Finding -> CAPA Handoff
  | '13' // Finding Action Tracker
  | '14' // Finding History
  | '15' // Regulatory Action Register
  | '16' // Regulatory Documents
  | '17' // Finding Resolution / Closure Status
  | '18';// Finding / Regulatory Audit

export type FindingSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type FindingType =
  | 'Safety Non-Compliance'
  | 'Environmental Non-Compliance'
  | 'Operational Non-Compliance'
  | 'Documentation Non-Compliance'
  | 'Regulatory Violation'
  | 'Other';

export type FindingStatus =
  | 'New'
  | 'Under Review'
  | 'Confirmed'
  | 'Action Required'
  | 'Under Action'
  | 'Escalated'
  | 'Closed';

export type RegulatoryActionType =
  | 'No regulatory action'
  | 'Mine response required'
  | 'Corrective action required'
  | 'Notice required'
  | 'Direction / instruction required'
  | 'Safety Direction'
  | 'Show-cause notice required'
  | 'Escalation required';

export type NoticeType =
  | 'Response Notice'
  | 'Corrective Direction'
  | 'Safety Direction'
  | 'Regulatory Instruction'
  | 'Statutory Show-Cause Notice';

export type NoticeDeliveryStatus =
  | 'Issued'
  | 'Delivered'
  | 'Acknowledged'
  | 'Response Submitted';

export type ResponseReviewStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Clarification Required'
  | 'Accepted'
  | 'Action Required';

export type EscalationLevel =
  | 'Mine Authority'
  | 'Area Authority'
  | 'Subsidiary Safety Directorate'
  | 'Senior Authority / DGMS Liaison';

export interface RegulatoryTraceabilityNode {
  tier: 'REGULATION' | 'CLAUSE' | 'REQUIREMENT' | 'APPLICABILITY' | 'OBLIGATION' | 'INSPECTION' | 'CHECKLIST' | 'OBSERVATION' | 'FINDING' | 'REGULATORY_ACTION' | 'CAPA' | 'VERIFICATION';
  id: string;
  title: string;
  status: string;
  effectiveDate: string;
  source: string;
  version: string;
  description: string;
}

export interface RegulatoryFindingItem {
  id: string;
  title: string;
  issueDescription: string;
  mine: string;
  colliery: string;
  location: string;
  inspectionId: string;
  inspectionType: string;
  authority: 'Internal' | 'DGMS' | 'CIL Headquarter';
  track: 'Safety' | 'Statutory' | 'Environmental';
  inspectionDate: string;
  leadInspector: {
    id: string;
    name: string;
    designation: string;
  };
  findingType: FindingType;
  severity: FindingSeverity;
  status: FindingStatus;
  actionRequired: boolean;
  regulatoryActionType?: RegulatoryActionType;
  regulatoryBasisId: string;
  regulatoryBasisText: string;
  clause: string;
  act: string;
  obligation: string;
  applicability: string;
  penalProvision: string;
  originalObservation: {
    id: string;
    text: string;
    timestamp: string;
    location: string;
    measurementObserved?: string;
    measurementRequired?: string;
    measurementUnit?: string;
    instrument?: string;
    calibrationStatus?: string;
    photos: string[];
    documents: string[];
  };
  reviewDecision: {
    proposedBy: string;
    reviewedBy: string;
    decision: 'CONFIRMED' | 'REJECTED' | 'MODIFIED';
    reviewDate: string;
    remarks: string;
  };
  mineResponse?: {
    status: 'Pending' | 'Submitted' | 'Clarification Requested' | 'Accepted';
    submittedAt?: string;
    submittedBy?: string;
    explanation?: string;
    immediateAction?: string;
    correctiveAction?: string;
    department?: string;
    responsiblePerson?: string;
    targetDate?: string;
    evidenceList?: string[];
  };
  capaHandoff?: {
    capaRequired: boolean;
    capaId?: string;
    status: 'Not Created' | 'Created' | 'In Progress' | 'Under Verification' | 'Verified' | 'Closed';
    responsibleDepartment?: string;
    responsiblePerson?: string;
    dueDate?: string;
    progressPercentage?: number;
    verifier?: string;
  };
  recurrence: {
    isRecurring: boolean;
    patternType: 'New' | 'Repeat' | 'Recurring Pattern';
    similarFindingsCount: number;
    similarFindingIds: string[];
    aiInsightText: string;
    confidenceScore: number;
  };
  noticeId?: string;
  escalation?: {
    isEscalated: boolean;
    currentLevel: EscalationLevel;
    reason: string;
    escalatedOn: string;
    escalatedBy: string;
  };
  dueDate: string;
  daysRemaining: number;
}

export interface RegulatoryNoticeItem {
  id: string;
  findingId: string;
  findingTitle: string;
  mine: string;
  noticeType: NoticeType;
  recipient: string;
  issuedBy: string;
  issuedRole: string;
  issuedDate: string;
  dueDate: string;
  regulatoryRequirement: string;
  actionRequired: string;
  requiredResponse: string[];
  documentFilename: string;
  fileSize: string;
  sha256Hash: string;
  deliveryStatus: NoticeDeliveryStatus;
  deliveryEvents: {
    stage: NoticeDeliveryStatus;
    timestamp: string;
    actor: string;
  }[];
}

export interface RegulatoryDocumentItem {
  id: string;
  title: string;
  type: 'Notice' | 'Direction' | 'Inspection Report' | 'Response' | 'Order' | 'Evidence' | 'Supporting Record';
  authority: string;
  mine: string;
  findingId: string;
  version: string;
  date: string;
  status: 'Official / Sealed' | 'Delivered' | 'Active' | 'Archived';
  sha256Hash: string;
  fileSize: string;
  description: string;
  issuer: string;
}

export interface RegulatoryAuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  objectType: 'Finding' | 'Regulatory Action' | 'Notice' | 'Classification' | 'CAPA' | 'Escalation' | 'Resolution' | 'Mine Response';
  objectId: string;
  previousState: string;
  newState: string;
  reason: string;
  tamperProofHash: string;
}
