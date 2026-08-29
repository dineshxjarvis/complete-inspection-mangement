export type FieldScreenId =
  | '01' // Dashboard
  | '02' // My Inspections
  | '03' // Pre-Inspection Brief
  | '04' // Readiness Check
  | '05' // Start Inspection
  | '06' // Execution Overview
  | '07' // Checklist
  | '08' // Checklist Item Detail
  | '09' // N/A / Unable to Verify
  | '10' // Observation Capture
  | '11' // Pause Inspection
  | '11A'// Paused State
  | '12' // Evidence Capture
  | '13' // Proposed Finding
  | '14' // Offline / Sync Center
  | '15' // Team Activity & Conflict
  | '16' // Field Self-Review
  | '17' // Submission Confirmation
  | '17A'// Submitted Success
  | '18' // Returned Inspection
  | '19' // Version History
  | '20' // Audit Trail
  | '21';// Completed History

export type InspectionStatus =
  | 'Scheduled'
  | 'Ready'
  | 'In Progress'
  | 'Paused'
  | 'Draft'
  | 'Submitted'
  | 'Returned'
  | 'Completed';

export type CheckStatus = 'Pending' | 'Compliant' | 'Non-Compliant' | 'N/A' | 'Unable to Verify';

export type Criticality = 'Critical' | 'Mandatory' | 'Standard';

export type EvidenceRule = 'Measurement' | 'Photo' | 'Document' | 'Measurement + Photo' | 'Photo + Document' | 'Document + Photo' | 'Optional';

export interface RegulatoryTrace {
  regulation: string;
  clause: string;
  requirement: string;
  applicability: string;
  obligation: string;
  inspectionCheck: string;
  penalProvision?: string;
}

export interface ChecklistItem {
  id: string;
  category: 'Ventilation' | 'Safety Controls' | 'Equipment & Electrical' | 'Records & Logs' | 'Emergency Preparedness';
  text: string;
  question: string;
  criticality: Criticality;
  evidenceRule: EvidenceRule;
  status: CheckStatus;
  regulatoryTrace: RegulatoryTrace;
  measurementRequired: boolean;
  photoRequired: boolean;
  documentRequired: boolean;
  measurementValue?: string;
  measurementUnit?: string;
  instrumentUsed?: string;
  observationText?: string;
  photos: string[];
  documents: string[];
  naReason?: string;
  unableToVerifyReason?: string;
  gpsCoordinates?: string;
  timestamp?: string;
  inspectorName?: string;
}

export interface PreviousFinding {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Under Rectification' | 'Closed';
  dateReported: string;
  previousEvidence: string;
  notes: string;
}

export interface PreviousCAPA {
  id: string;
  issue: string;
  correctiveAction: string;
  targetDate: string;
  responsibleOfficer: string;
  status: 'Open' | 'Overdue' | 'Verified';
}

export interface FieldObservation {
  id: string;
  inspectionId: string;
  linkedChecklistId?: string;
  text: string;
  classification: 'Safety' | 'Operational' | 'Environmental' | 'Equipment' | 'Documentation' | 'Other';
  severity: 'Informational' | 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  gpsCoordinates: string;
  timestamp: string;
  capturedBy: string;
  photos: string[];
  hasProposedFinding: boolean;
  linkedRegulation?: string;
}

export interface FieldEvidence {
  id: string;
  inspectionId: string;
  type: 'PHOTO' | 'DOCUMENT' | 'MEASUREMENT' | 'VIDEO' | 'OTHER';
  title: string;
  previewUrl?: string;
  fileSize?: string;
  value?: string;
  unit?: string;
  instrument?: string;
  linkedChecklistId?: string;
  linkedObservationId?: string;
  capturedBy: string;
  timestamp: string;
  gpsCoordinates: string;
  device: string;
  syncStatus: 'Synced' | 'Pending' | 'Failed';
}

export interface ProposedFinding {
  id: string;
  inspectionId: string;
  linkedChecklistId: string;
  linkedObservationId?: string;
  regulationClause: string;
  requirementText: string;
  observationSummary: string;
  nonComplianceDetails: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  riskCategory: 'Safety' | 'Environmental' | 'Operational' | 'Regulatory';
  hasPhoto: boolean;
  hasMeasurement: boolean;
  hasDocument: boolean;
  proposedAction: 'Immediate Action' | 'Corrective Action' | 'Further Investigation' | 'Stop Work Notice';
  responsibleArea: string;
  status: 'Draft' | 'Ready' | 'Submitted';
  createdBy: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  avatar: string;
  status: 'Active' | 'Idle' | 'Offline';
  assignedSection: string;
  lastActive: string;
  competencyCert: string;
}

export interface TeamActivityEvent {
  id: string;
  userName: string;
  userRole: string;
  userAvatar: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'completion' | 'observation' | 'evidence' | 'measurement' | 'alert';
}

export interface SyncItem {
  id: string;
  type: 'Evidence' | 'Observation' | 'Measurement' | 'Checklist State';
  reference: string;
  size: string;
  status: 'Pending' | 'Syncing' | 'Synced' | 'Failed';
  errorReason?: string;
  timestamp: string;
}

export interface InspectionVersion {
  version: string;
  submittedBy: string;
  timestamp: string;
  status: 'Submitted' | 'Returned / Corrected' | 'Resubmitted';
  checksCompleted: number;
  observationsCount: number;
  evidenceCount: number;
  findingsCount: number;
  reasonForChange?: string;
  diffSummary: string[];
}

export interface AuditTrailEvent {
  id: string;
  timestamp: string;
  timeStr: string;
  actor: string;
  role: string;
  action: string;
  details: string;
  location?: string;
  previousState?: string;
  newState?: string;
  category: 'execution' | 'evidence' | 'finding' | 'state' | 'governance';
}

export interface FieldInspectionRecord {
  id: string;
  mine: string;
  subsidiary: string;
  area: string;
  location: string;
  seam: string;
  type: string;
  track: 'Safety' | 'Statutory' | 'Production' | 'Environmental';
  date: string;
  timeWindow: string;
  role: string;
  leadInspector: string;
  status: InspectionStatus;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  authority: string;
  objective: string;
  team: TeamMember[];
  checklistItems: ChecklistItem[];
  previousFindings: PreviousFinding[];
  previousCAPAs: PreviousCAPA[];
  requiredInstruments: { name: string; serial: string; status: 'Available' | 'Calibrated' | 'Missing'; calibrationDue: string }[];
  requiredPPE: { name: string; checked: boolean; mandatory: boolean }[];
  siteSafetyNotes: string[];
  readinessChecks: { id: string; label: string; checked: boolean; required: boolean }[];
  startedAt?: string;
  pausedAt?: string;
  pauseReason?: string;
  resumedAt?: string;
  submittedAt?: string;
  returnedAt?: string;
  returnedBy?: string;
  returnComment?: string;
  returnedItems?: { checklistId: string; issue: string; requiredAction: string }[];
}
