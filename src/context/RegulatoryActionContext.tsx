"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  RegulatoryScreenId,
  RegulatoryFindingItem,
  RegulatoryNoticeItem,
  RegulatoryDocumentItem,
  RegulatoryAuditLogItem,
  RegulatoryTraceabilityNode,
  FindingSeverity,
  FindingType,
  FindingStatus,
  RegulatoryActionType,
  EscalationLevel
} from '../types/regulatoryAction';

// Pre-seeded mock dataset ensuring continuity across all STRATA workspaces
const INITIAL_FINDINGS: RegulatoryFindingItem[] = [
  {
    id: 'FND-2026-00127',
    title: 'Ventilation Airflow Velocity below Statutory Threshold in Shaft 3 Return',
    issueDescription: 'Main return airway velocity at Shaft 3 intersection recorded at 4.8 m/s against prescribed statutory minimum threshold of ≥ 5.5 m/s, causing suboptimal methane dilution and return air purging deficit.',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Shaft 3 — Return Airway Intersection (Chainage 140m)',
    inspectionId: 'INS-2026-0882',
    inspectionType: 'Ventilation & Environmental Governance',
    authority: 'Internal',
    track: 'Safety',
    inspectionDate: '15 Nov 2026',
    leadInspector: {
      id: 'INS-PER-01',
      name: 'R. Sharma',
      designation: 'Lead Inspector (DGMS Certified First Class)'
    },
    findingType: 'Safety Non-Compliance',
    severity: 'HIGH',
    status: 'Confirmed',
    actionRequired: true,
    regulatoryActionType: 'Corrective action required',
    regulatoryBasisId: 'REQ-VENT-014',
    regulatoryBasisText: 'Main Return Airway Velocity must meet statutory minimum airflow threshold (≥ 5.5 m/s) at Shaft 3 intake connection.',
    clause: 'Regulation 153(2)(b) — Minimum Airway Velocity',
    act: 'Mines Act, 1952 (Act No. 35 of 1952)',
    obligation: 'Mine Manager & Chief Ventilation Officer must maintain continuous statutory compliance.',
    applicability: 'All Degree II & Degree III gassy underground coal seams.',
    penalProvision: 'Section 72A & Section 73 of the Mines Act, 1952 (Cognizable violation).',
    originalObservation: {
      id: 'OBS-2026-00482',
      text: 'Airflow velocity measured across cross-sectional area of Return Airway was recorded at 4.8 m/s against the prescribed statutory requirement of ≥ 5.5 m/s. Auxiliary booster fan regulator louvres at Splice Junction 4 found partially obstructed with accumulation of loose stone-dust spillage.',
      timestamp: '15 Nov 2026 — 14:30 IST',
      location: 'Shaft 3 — Return Airway Intersection (Chainage 140m)',
      measurementObserved: '4.8 m/s',
      measurementRequired: '≥ 5.5 m/s',
      measurementUnit: 'm/s',
      instrument: 'Digital Vane Anemometer (Model DA-800, Serial #ANM-2024-91)',
      calibrationStatus: 'Valid through 24 Jan 2027',
      photos: ['photo_vent_anemometer.jpg', 'photo_regulator_louvres.jpg'],
      documents: ['anemometer_calibration_cert.pdf', 'ventilation_survey_sheet.pdf']
    },
    reviewDecision: {
      proposedBy: 'R. Sharma (Lead Inspector)',
      reviewedBy: 'Er. P. C. Joshi (Authorized Statutory Reviewer & DGMS Liaison)',
      decision: 'CONFIRMED',
      reviewDate: '16 Nov 2026',
      remarks: 'Confirmed as statutory High Severity non-compliance. Mine management response and formal CAPA required before statutory deadline of 30 Nov 2026.'
    },
    mineResponse: {
      status: 'Submitted',
      submittedAt: '16 Nov 2026 14:20 IST',
      submittedBy: 'Er. A. K. Verma (Mine Manager)',
      explanation: 'Official Mine Response formally committed to complete aerodynamic overhaul and statutory re-testing before 30 Nov 2026.',
      immediateAction: 'Regulator aperture manually cleared by Overman; preliminary velocity restored to 5.2 m/s.',
      correctiveAction: 'Execute 4-stage CAPA-2026-0048 including fan blade pitch calibration and independent verification.',
      department: 'Ventilation Department',
      responsiblePerson: 'Er. S. K. Mahapatra (Chief Ventilation Engineer)',
      targetDate: '30 Nov 2026',
      evidenceList: ['preliminary_incident_memo.pdf', 'engineering_mod_drawing_v2.pdf']
    },
    capaHandoff: {
      capaRequired: true,
      capaId: 'CAPA-2026-0048',
      status: 'In Progress',
      responsibleDepartment: 'Ventilation Department',
      responsiblePerson: 'Er. S. K. Mahapatra',
      dueDate: '30 Nov 2026',
      progressPercentage: 60,
      verifier: 'Er. T. Bannerjee (Authorized Independent Safety Verifier, DGMS Panel)'
    },
    recurrence: {
      isRecurring: true,
      patternType: 'Recurring Pattern',
      similarFindingsCount: 4,
      similarFindingIds: ['FND-2025-0098', 'FND-2025-0211', 'FND-2026-00072', 'FND-2025-0144'],
      aiInsightText: 'Similar airflow deficit detected across 4 previous inspections in past 12 months. Root cause pattern indicates recurring regulator louvre dust encrustation combined with sub-optimal fan pitch.',
      confidenceScore: 92
    },
    noticeId: 'NOTICE-2026-0021',
    dueDate: '30 Nov 2026',
    daysRemaining: 2
  },
  {
    id: 'FND-2026-00128',
    title: 'Under-torqued Roof Support Anchors at District 4 Split',
    issueDescription: '4 out of 10 sampled resin-grouted roof bolts exhibited pre-tension torque below 100 Nm (statutory threshold ≥ 120 Nm).',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'District 4 Split Underground Header Seam VII',
    inspectionId: 'INS-2026-0882',
    inspectionType: 'Strata Control & Support System Audit',
    authority: 'Internal',
    track: 'Safety',
    inspectionDate: '15 Nov 2026',
    leadInspector: {
      id: 'INS-PER-04',
      name: 'S. N. Sen',
      designation: 'Geotechnical Safety Inspector'
    },
    findingType: 'Safety Non-Compliance',
    severity: 'CRITICAL',
    status: 'Confirmed',
    actionRequired: true,
    regulatoryActionType: 'Safety Direction',
    regulatoryBasisId: 'REQ-STRATA-022',
    regulatoryBasisText: 'SCAMP Support Audit & Anchorage Pre-tension Verification (≥ 120 Nm).',
    clause: 'Regulation 123 — Support of Working Places',
    act: 'Mines Act, 1952',
    obligation: 'Daily anchorage pull and torque validation by Overman.',
    applicability: 'Deep Seam VII roadways subject to abutment stress.',
    penalProvision: 'Section 72 of Mines Act (Suspension of coal extraction in un-supported areas).',
    originalObservation: {
      id: 'OBS-2026-00485',
      text: 'Sample torque testing on 10 anchor bolts indicated 4 bolts below 95 Nm.',
      timestamp: '15 Nov 2026 — 12:15 IST',
      location: 'District 4 Split (Ch: 80m)',
      measurementObserved: '95 Nm (4 of 10)',
      measurementRequired: '≥ 120 Nm',
      instrument: 'Calibrated Torque Wrench TW-90',
      calibrationStatus: 'Valid',
      photos: ['photo_torque_wrench.jpg'],
      documents: ['scamp_anchor_log.pdf']
    },
    reviewDecision: {
      proposedBy: 'S. N. Sen',
      reviewedBy: 'Er. P. C. Joshi',
      decision: 'CONFIRMED',
      reviewDate: '16 Nov 2026',
      remarks: 'Critical strata non-compliance. Immediate re-tensioning and secondary cable bolting mandated.'
    },
    recurrence: {
      isRecurring: false,
      patternType: 'New',
      similarFindingsCount: 0,
      similarFindingIds: [],
      aiInsightText: 'Isolated anchorage variance likely caused by localized roof strata bedding separation.',
      confidenceScore: 84
    },
    dueDate: '28 Nov 2026',
    daysRemaining: 1
  },
  {
    id: 'FND-2026-00121',
    title: 'Electrical Substation Earth Pit Resistance Exceedance',
    issueDescription: 'Earth loop impedance on substation ground pits #3 and #4 measured at 2.8 Ohm (statutory limit < 1.0 Ohm).',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Inclined Haulage & Substation Sub-level 3',
    inspectionId: 'INS-2026-0870',
    inspectionType: 'Electrical & Flameproof Apparatus Audit',
    authority: 'Internal',
    track: 'Safety',
    inspectionDate: '10 Nov 2026',
    leadInspector: {
      id: 'INS-PER-03',
      name: 'K. Rao',
      designation: 'Senior Electrical Mine Inspector'
    },
    findingType: 'Regulatory Violation',
    severity: 'HIGH',
    status: 'Escalated',
    actionRequired: true,
    regulatoryActionType: 'Escalation required',
    regulatoryBasisId: 'REQ-ELEC-014',
    regulatoryBasisText: 'Substation earth electrode system resistance must maintain < 1.0 Ohm under all operating conditions.',
    clause: 'Indian Electricity Rules / CMR 2017 Reg 188',
    act: 'Mines Act, 1952 & Indian Electricity Act',
    obligation: 'Monthly earth electrode Megger testing and logging.',
    applicability: 'All subterranean electrical distribution substations.',
    penalProvision: 'Statutory fine and notice under Section 22.',
    originalObservation: {
      id: 'OBS-2026-00410',
      text: 'Megger earth resistance test on pits 3 and 4 gave 2.8 Ohm.',
      timestamp: '10 Nov 2026 — 11:30 IST',
      location: 'Substation Sub-level 3',
      measurementObserved: '2.8 Ohm',
      measurementRequired: '< 1.0 Ohm',
      instrument: 'Calibrated Earth Megger EM-400',
      photos: ['photo_earth_megger.jpg'],
      documents: ['earth_resistance_sheet.pdf']
    },
    reviewDecision: {
      proposedBy: 'K. Rao',
      reviewedBy: 'Er. P. C. Joshi',
      decision: 'CONFIRMED',
      reviewDate: '11 Nov 2026',
      remarks: 'Confirmed high-risk electrical grounding violation. Remediation past due date.'
    },
    escalation: {
      isEscalated: true,
      currentLevel: 'Area Authority',
      reason: 'Remediation deadline of 25 Nov passed without verified chemical re-bedding test log.',
      escalatedOn: '26 Nov 2026',
      escalatedBy: 'Er. P. C. Joshi (Regulatory Reviewer)'
    },
    recurrence: {
      isRecurring: true,
      patternType: 'Repeat',
      similarFindingsCount: 2,
      similarFindingIds: ['FND-2025-0188', 'FND-2024-0092'],
      aiInsightText: 'Seasonal dry soil resistivity variance observed across sub-level 3.',
      confidenceScore: 89
    },
    dueDate: '25 Nov 2026',
    daysRemaining: -3
  },
  {
    id: 'FND-2026-00129',
    title: 'Deficient Water Spray Pressure at Main Conveyor Transfer Point',
    issueDescription: 'Water spray manifold discharge pressure at 1.8 kg/cm² failing to provide adequate airborne coal dust suppression.',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Main Belt Conveyor Line 3B Transfer Chute',
    inspectionId: 'INS-2026-0882',
    inspectionType: 'Dust Suppression & Airborne Particles',
    authority: 'Internal',
    track: 'Environmental',
    inspectionDate: '15 Nov 2026',
    leadInspector: {
      id: 'INS-PER-01',
      name: 'R. Sharma',
      designation: 'Lead Inspector'
    },
    findingType: 'Environmental Non-Compliance',
    severity: 'MEDIUM',
    status: 'Confirmed',
    actionRequired: true,
    regulatoryActionType: 'Corrective action required',
    regulatoryBasisId: 'REQ-DUST-008',
    regulatoryBasisText: 'Continuous water spray suppression at all coal transfer discharge points (≥ 3.0 kg/cm²).',
    clause: 'Regulation 143 — Airborne Dust Suppression',
    act: 'Mines Act, 1952 & Coal Mines Regulations 2017',
    obligation: 'Daily spray nozzle descaling and pump inspection.',
    applicability: 'All mechanized belt conveyor lines.',
    penalProvision: 'Statutory fine and notice under Section 22.',
    originalObservation: {
      id: 'OBS-2026-00488',
      text: 'Pressure gauge at transfer chute spray manifold showed 1.8 kg/cm².',
      timestamp: '15 Nov 2026 — 13:40 IST',
      location: 'Conveyor 3B Transfer Chute',
      measurementObserved: '1.8 kg/cm²',
      measurementRequired: '≥ 3.0 kg/cm²',
      instrument: 'Hydrostatic Pressure Gauge PG-22',
      photos: ['photo_spray_pressure.jpg'],
      documents: []
    },
    reviewDecision: {
      proposedBy: 'R. Sharma',
      reviewedBy: 'Er. P. C. Joshi',
      decision: 'CONFIRMED',
      reviewDate: '16 Nov 2026',
      remarks: 'Confirmed. Booster pump impeller overhaul and nozzle descaling required.'
    },
    recurrence: {
      isRecurring: false,
      patternType: 'New',
      similarFindingsCount: 0,
      similarFindingIds: [],
      aiInsightText: 'Isolated nozzle clogging following raw water header sedimentation.',
      confidenceScore: 78
    },
    dueDate: '05 Dec 2026',
    daysRemaining: 7
  }
];

const INITIAL_NOTICES: RegulatoryNoticeItem[] = [
  {
    id: 'NOTICE-2026-0021',
    findingId: 'FND-2026-00127',
    findingTitle: 'Ventilation Airflow Velocity below Statutory Threshold in Shaft 3 Return',
    mine: 'Mine A2',
    noticeType: 'Corrective Direction',
    recipient: 'Er. A. K. Verma (Authorized Mine Manager, Mine A2)',
    issuedBy: 'Er. P. C. Joshi (Director / Statutory Reviewer)',
    issuedRole: 'Authorized DGMS Review Liaison',
    issuedDate: '16 Nov 2026',
    dueDate: '30 Nov 2026',
    regulatoryRequirement: 'Coal Mines Regulations 2017, Regulation 153(2)(b) — Return Air Velocity ≥ 5.5 m/s',
    actionRequired: 'Execute complete aerodynamic overhaul of Shaft 3 return airway regulator louvres and auxiliary booster fan pitch calibration.',
    requiredResponse: ['Technical Explanation & Root Cause', 'Immediate Remedial Measures', '4-Stage CAPA Commitment', 'Calibrated Post-Repair Measurement Proof'],
    documentFilename: 'NOTICE-2026-0021_Official_Direction.pdf',
    fileSize: '1.4 MB',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    deliveryStatus: 'Response Submitted',
    deliveryEvents: [
      { stage: 'Issued', timestamp: '16 Nov 2026 11:00 IST', actor: 'Er. P. C. Joshi' },
      { stage: 'Delivered', timestamp: '16 Nov 2026 11:05 IST', actor: 'STRATA Electronic Gateway' },
      { stage: 'Acknowledged', timestamp: '16 Nov 2026 11:45 IST', actor: 'Er. A. K. Verma' },
      { stage: 'Response Submitted', timestamp: '16 Nov 2026 14:20 IST', actor: 'Er. A. K. Verma' }
    ]
  },
  {
    id: 'NOTICE-2026-0018',
    findingId: 'FND-2026-00121',
    findingTitle: 'Electrical Substation Earth Pit Resistance Exceedance',
    mine: 'Mine A2',
    noticeType: 'Statutory Show-Cause Notice',
    recipient: 'Er. A. K. Verma (Mine Manager)',
    issuedBy: 'DGMS Regional Safety Directorate',
    issuedRole: 'Regional Electrical Mine Inspector',
    issuedDate: '12 Nov 2026',
    dueDate: '25 Nov 2026',
    regulatoryRequirement: 'Indian Electricity Rules & CMR 2017 Reg 188 — Earth Loop Impedance < 1.0 Ohm',
    actionRequired: 'Chemical re-bedding of earth electrodes #3 and #4 with bentonite slurry and submission of calibrated Megger test sheet.',
    requiredResponse: ['Immediate Isolation / Rerouting Confirmation', 'Certified Test Certificate'],
    documentFilename: 'NOTICE-2026-0018_Show_Cause.pdf',
    fileSize: '1.8 MB',
    sha256Hash: 'a7c93e482710bb849202f5a0cfb2e667823901bce471efea274191d6c8e31290',
    deliveryStatus: 'Acknowledged',
    deliveryEvents: [
      { stage: 'Issued', timestamp: '12 Nov 2026 09:30 IST', actor: 'DGMS Regional Directorate' },
      { stage: 'Delivered', timestamp: '12 Nov 2026 09:35 IST', actor: 'STRATA Gateway' },
      { stage: 'Acknowledged', timestamp: '12 Nov 2026 10:15 IST', actor: 'Er. A. K. Verma' }
    ]
  }
];

const INITIAL_DOCUMENTS: RegulatoryDocumentItem[] = [
  {
    id: 'DOC-REG-001',
    title: 'Statutory Direction NOTICE-2026-0021 (Ventilation Velocity Remediation)',
    type: 'Direction',
    authority: 'DGMS Review Liaison Cell',
    mine: 'Mine A2',
    findingId: 'FND-2026-00127',
    version: '1.0 (Official)',
    date: '16 Nov 2026',
    status: 'Official / Sealed',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    fileSize: '1.4 MB',
    description: 'Formal corrective direction issued under Coal Mines Regulations 2017 Regulation 153(2)(b).',
    issuer: 'Er. P. C. Joshi (Director)'
  },
  {
    id: 'DOC-REG-002',
    title: 'Statutory Inspection Report INS-2026-0882 (Seam VII Ventilation Survey)',
    type: 'Inspection Report',
    authority: 'Internal DGMS Audit Cell',
    mine: 'Mine A2',
    findingId: 'FND-2026-00127',
    version: 'Final Sealed',
    date: '15 Nov 2026',
    status: 'Official / Sealed',
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    fileSize: '4.8 MB',
    description: 'Comprehensive field audit dossier covering 22 checklist items, 28 evidence captures, and 3 confirmed findings.',
    issuer: 'R. Sharma (Lead Inspector)'
  },
  {
    id: 'DOC-REG-003',
    title: 'Official Mine Management Response Dossier (Revision 2 Signed)',
    type: 'Response',
    authority: 'Mine A2 Management',
    mine: 'Mine A2',
    findingId: 'FND-2026-00127',
    version: '2.0',
    date: '16 Nov 2026',
    status: 'Delivered',
    sha256Hash: '8f14e45fceea167a5a36dedd4bea2543add704d8e512b5ea06e50225bde3d303',
    fileSize: '2.2 MB',
    description: 'Formal mine explanation, immediate actions taken, and committed 4-stage CAPA plan.',
    issuer: 'Er. A. K. Verma (Mine Manager)'
  }
];

const INITIAL_AUDIT_LOG: RegulatoryAuditLogItem[] = [
  {
    id: 'AUD-REG-001',
    timestamp: '16 Nov 2026 14:20 IST',
    actor: 'Er. A. K. Verma',
    role: 'Mine Manager',
    action: 'Mine Response Submitted',
    objectType: 'Mine Response',
    objectId: 'FND-2026-00127',
    previousState: 'Draft / Pending Response',
    newState: 'Response Submitted',
    reason: 'Official Mine response formally committed with digital signature hash.',
    tamperProofHash: 'sha256_8f14e45fceea167a5a36dedd4bea2543add704d8'
  },
  {
    id: 'AUD-REG-002',
    timestamp: '16 Nov 2026 11:00 IST',
    actor: 'Er. P. C. Joshi',
    role: 'Statutory Reviewer',
    action: 'Regulatory Notice Issued',
    objectType: 'Notice',
    objectId: 'NOTICE-2026-0021',
    previousState: 'Drafting',
    newState: 'Issued & Delivered',
    reason: 'Corrective direction dispatched following confirmation of High Severity finding.',
    tamperProofHash: 'sha256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4'
  },
  {
    id: 'AUD-REG-003',
    timestamp: '16 Nov 2026 10:45 IST',
    actor: 'Er. P. C. Joshi',
    role: 'Statutory Reviewer',
    action: 'Finding Confirmed',
    objectType: 'Finding',
    objectId: 'FND-2026-00127',
    previousState: 'Proposed Finding (Field)',
    newState: 'Confirmed Statutory Finding',
    reason: 'Independent review of anemometer logs and photo evidence confirmed airflow deficit.',
    tamperProofHash: 'sha256_a7c93e482710bb849202f5a0cfb2e667823901bce'
  }
];

const TRACEABILITY_CHAIN: RegulatoryTraceabilityNode[] = [
  {
    tier: 'REGULATION',
    id: 'CMR-2017',
    title: 'Coal Mines Regulations (CMR) 2017',
    status: 'ACTIVE STATUTORY CODE',
    effectiveDate: '27 Nov 2017',
    source: 'Ministry of Labour & Employment / DGMS',
    version: 'Gazette of India Extraordinary Part II Sec 3(i)',
    description: 'Primary statutory framework governing mine safety, ventilation standards, and underground workings across Indian coalfields.'
  },
  {
    tier: 'CLAUSE',
    id: 'REG-153-2-B',
    title: 'Regulation 153(2)(b) — Minimum Airway Velocity',
    status: 'ENFORCEABLE CLAUSE',
    effectiveDate: '27 Nov 2017',
    source: 'CMR 2017 Chapter XIII (Ventilation)',
    version: 'Rev 2024',
    description: 'Prescribes that velocity of air current in any main return airway or ventilation district shall not fall below 5.5 metres per second in gassy seams.'
  },
  {
    tier: 'REQUIREMENT',
    id: 'REQ-VENT-014',
    title: 'Shaft 3 Intake & Return Velocity Threshold Verification',
    status: 'STATUTORY AUDIT STANDARD',
    effectiveDate: '01 Jan 2026',
    source: 'DGMS Standard Inspection Checklist v4.2',
    version: 'v4.2',
    description: 'Mandatory anemometer traverse measurement at 140m chainage split in Shaft 3 return roadway.'
  },
  {
    tier: 'APPLICABILITY',
    id: 'MINE-A2-SEAM-VII',
    title: 'Mine A2 — Deep Underground Seam VII Working District',
    status: 'DEGREE III GASSY MINE',
    effectiveDate: 'Annual DGMS Classification 2026',
    source: 'Mine Safety Plan & Geotechnical Register',
    version: '2026-Q4',
    description: 'Seam VII contains high volatile bituminous coal with methane emission rate exceeding 10 m³ per tonne of coal extracted.'
  },
  {
    tier: 'OBLIGATION',
    id: 'OBL-MGR-VENT',
    title: 'Mine Manager & Chief Ventilation Officer Statutory Obligation',
    status: 'MANDATORY COMPLIANCE',
    effectiveDate: 'Continuous',
    source: 'Mines Act 1952 Section 17 & CMR 2017 Reg 156',
    version: 'Statutory',
    description: 'Manager must ensure uninterrupted ventilation fan operation, proper regulator positioning, and periodic airflow logging.'
  },
  {
    tier: 'INSPECTION',
    id: 'INS-2026-0882',
    title: 'Comprehensive Ventilation & Environmental Statutory Inspection',
    status: 'COMPLETED & AUDITED',
    effectiveDate: '15 Nov 2026',
    source: 'Internal DGMS Audit Cell',
    version: 'Execution Dossier',
    description: 'Lead Inspector R. Sharma conducted full underground ventilation audit with calibrated anemometer traverses.'
  },
  {
    tier: 'CHECKLIST',
    id: 'CHK-01-REQ-VENT-014',
    title: 'Checklist Item: Return Airway Velocity Audit',
    status: 'INSPECTOR FAIL (NON-COMPLIANT)',
    effectiveDate: '15 Nov 2026 11:42 IST',
    source: 'STRATA Field Execution Module',
    version: 'Field Log #14',
    description: 'Inspector tested velocity across 9-grid traverse plane and recorded 4.8 m/s against required ≥ 5.5 m/s.'
  },
  {
    tier: 'OBSERVATION',
    id: 'OBS-2026-00482',
    title: 'Field Observation: Airflow Velocity Deficit & Obstructed Louvres',
    status: 'IMMUTABLE FIELD CAPTURE',
    effectiveDate: '15 Nov 2026 14:30 IST',
    source: 'Lead Inspector R. Sharma',
    version: 'Sealed with SHA-256',
    description: 'Velocity 4.8 m/s recorded with calibrated Anemometer #ANM-2024-91. Stone dust spillage observed obstructing 25% of louvre aperture.'
  },
  {
    tier: 'FINDING',
    id: 'FND-2026-00127',
    title: 'Confirmed Finding: Statutory Ventilation Airflow Non-Compliance',
    status: 'CONFIRMED STATUTORY FINDING',
    effectiveDate: '16 Nov 2026',
    source: 'Er. P. C. Joshi (DGMS Review Liaison)',
    version: 'Confirmed Dossier',
    description: 'Confirmed High Severity non-compliance requiring formal regulatory direction, mine response, and CAPA creation.'
  },
  {
    tier: 'REGULATORY_ACTION',
    id: 'NOTICE-2026-0021',
    title: 'Regulatory Action: Corrective Direction Issued',
    status: 'RESPONSE SUBMITTED',
    effectiveDate: '16 Nov 2026',
    source: 'Statutory Reviewer Er. P. C. Joshi',
    version: 'Official Direction v1',
    description: 'Directed mine management to clear regulator obstructions, recalibrate fan blade pitch, and submit verified test log before 30 Nov 2026.'
  },
  {
    tier: 'CAPA',
    id: 'CAPA-2026-0048',
    title: 'CAPA: Shaft 3 Return Aerodynamic Overhaul & Recalibration',
    status: 'IN PROGRESS (60%)',
    effectiveDate: '17 Nov 2026',
    source: 'Ventilation Department (Er. S. K. Mahapatra)',
    version: '4-Stage CAPA Plan',
    description: '4 sub-actions committed with independent verifier assigned. Completion target: 30 Nov 2026.'
  },
  {
    tier: 'VERIFICATION',
    id: 'VERIF-PENDING',
    title: 'Independent Verification by DGMS Panel Auditor (Workspace 06)',
    status: 'PENDING CAPA COMPLETION',
    effectiveDate: 'Scheduled 30 Nov 2026',
    source: 'Er. T. Bannerjee (DGMS Panel Verifier)',
    version: 'Workspace 06 Handoff',
    description: 'Physical on-site anemometer traverse verification will be performed once mine achieves 100% progress and uploads survey sheets.'
  }
];

interface RegulatoryActionContextType {
  currentScreen: RegulatoryScreenId;
  navigateTo: (screen: RegulatoryScreenId, params?: Record<string, any>) => void;
  selectedMine: string;
  setSelectedMine: (mine: string) => void;
  quickNavOpen: boolean;
  setQuickNavOpen: (open: boolean) => void;
  toastMessage: { text: string; type: 'success' | 'warning' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'warning' | 'info' | 'error') => void;

  // Findings State
  findings: RegulatoryFindingItem[];
  activeFinding: RegulatoryFindingItem;
  setActiveFinding: (finding: RegulatoryFindingItem) => void;
  classifyFinding: (findingId: string, updates: Partial<RegulatoryFindingItem>) => void;

  // Traceability Chain
  traceabilityChain: RegulatoryTraceabilityNode[];

  // Regulatory Actions & Notices
  notices: RegulatoryNoticeItem[];
  activeNotice: RegulatoryNoticeItem;
  setActiveNotice: (notice: RegulatoryNoticeItem) => void;
  issueRegulatoryAction: (findingId: string, actionType: RegulatoryActionType, deadline: string, reason: string) => void;
  requestClarification: (findingId: string, reason: string) => void;

  // Escalations
  escalateFinding: (findingId: string, targetLevel: EscalationLevel, reason: string) => void;

  // CAPA Handoff
  createCapaHandoff: (findingId: string, payload: { department: string; person: string; dueDate: string; actions: string[] }) => void;

  // Resolution & Closure
  closeFinding: (findingId: string, resolutionNotes: string) => boolean;

  // Documents
  regulatoryDocuments: RegulatoryDocumentItem[];
  selectedDocumentForViewer: RegulatoryDocumentItem | null;
  openDocumentViewer: (doc: RegulatoryDocumentItem) => void;
  closeDocumentViewer: () => void;

  // Modals
  isEscalateModalOpen: boolean;
  setIsEscalateModalOpen: (open: boolean) => void;
  isClarificationModalOpen: boolean;
  setIsClarificationModalOpen: (open: boolean) => void;

  // Audit Log
  auditLog: RegulatoryAuditLogItem[];
}

const RegulatoryActionContext = createContext<RegulatoryActionContextType | undefined>(undefined);

export const RegulatoryActionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<RegulatoryScreenId>('01');
  const [selectedMine, setSelectedMine] = useState<string>('Mine A2');
  const [quickNavOpen, setQuickNavOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'warning' | 'info' | 'error' } | null>(null);

  const [findings, setFindings] = useState<RegulatoryFindingItem[]>(INITIAL_FINDINGS);
  const [activeFinding, setActiveFinding] = useState<RegulatoryFindingItem>(INITIAL_FINDINGS[0]);
  const [notices, setNotices] = useState<RegulatoryNoticeItem[]>(INITIAL_NOTICES);
  const [activeNotice, setActiveNotice] = useState<RegulatoryNoticeItem>(INITIAL_NOTICES[0]);
  const [regulatoryDocuments, setRegulatoryDocuments] = useState<RegulatoryDocumentItem[]>(INITIAL_DOCUMENTS);
  const [selectedDocumentForViewer, setSelectedDocumentForViewer] = useState<RegulatoryDocumentItem | null>(null);
  const [auditLog, setAuditLog] = useState<RegulatoryAuditLogItem[]>(INITIAL_AUDIT_LOG);

  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState<boolean>(false);
  const [isClarificationModalOpen, setIsClarificationModalOpen] = useState<boolean>(false);

  const showToast = (text: string, type: 'success' | 'warning' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const navigateTo = (screen: RegulatoryScreenId, params?: Record<string, any>) => {
    if (params?.findingId) {
      const f = findings.find(x => x.id === params.findingId);
      if (f) setActiveFinding(f);
    }
    if (params?.noticeId) {
      const n = notices.find(x => x.id === params.noticeId);
      if (n) setActiveNotice(n);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const classifyFinding = (findingId: string, updates: Partial<RegulatoryFindingItem>) => {
    setFindings(prev =>
      prev.map(f => {
        if (f.id === findingId) {
          const updated = { ...f, ...updates };
          if (activeFinding.id === findingId) setActiveFinding(updated);
          return updated;
        }
        return f;
      })
    );

    const auditEntry: RegulatoryAuditLogItem = {
      id: 'AUD-REG-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      actor: 'Er. P. C. Joshi',
      role: 'Authorized Regulatory Reviewer',
      action: 'Finding Re-classified',
      objectType: 'Classification',
      objectId: findingId,
      previousState: `${activeFinding.severity} / ${activeFinding.findingType}`,
      newState: `${updates.severity || activeFinding.severity} / ${updates.findingType || activeFinding.findingType}`,
      reason: 'Human authorized statutory re-classification based on risk matrix.',
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Finding ${findingId} classification updated successfully`, 'success');
  };

  const issueRegulatoryAction = (findingId: string, actionType: RegulatoryActionType, deadline: string, reason: string) => {
    const newNoticeId = 'NOTICE-2026-' + (notices.length + 22).toString().padStart(4, '0');
    const newNotice: RegulatoryNoticeItem = {
      id: newNoticeId,
      findingId: findingId,
      findingTitle: activeFinding.title,
      mine: activeFinding.mine,
      noticeType: 'Corrective Direction',
      recipient: `Er. A. K. Verma (Mine Manager, ${activeFinding.mine})`,
      issuedBy: 'Er. P. C. Joshi (Statutory Reviewer)',
      issuedRole: 'Authorized DGMS Liaison Officer',
      issuedDate: new Date().toLocaleDateString('en-IN') + ' IST',
      dueDate: deadline,
      regulatoryRequirement: activeFinding.regulatoryBasisText,
      actionRequired: reason,
      requiredResponse: ['Technical Explanation', 'Immediate Action', 'CAPA Proposal', 'Measurement Evidence'],
      documentFilename: `${newNoticeId}_Direction.pdf`,
      fileSize: '1.5 MB',
      sha256Hash: 'sha256_' + Math.random().toString(36).substring(2, 15),
      deliveryStatus: 'Delivered',
      deliveryEvents: [
        { stage: 'Issued', timestamp: new Date().toLocaleString('en-IN') + ' IST', actor: 'Er. P. C. Joshi' },
        { stage: 'Delivered', timestamp: new Date().toLocaleString('en-IN') + ' IST', actor: 'STRATA Gateway' }
      ]
    };

    setNotices(prev => [newNotice, ...prev]);
    setActiveNotice(newNotice);

    setFindings(prev =>
      prev.map(f =>
        f.id === findingId
          ? { ...f, regulatoryActionType: actionType, status: 'Under Action', noticeId: newNoticeId }
          : f
      )
    );

    const auditEntry: RegulatoryAuditLogItem = {
      id: 'AUD-REG-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. P. C. Joshi',
      role: 'Authorized Regulatory Reviewer',
      action: `Regulatory Action Issued: ${actionType}`,
      objectType: 'Regulatory Action',
      objectId: newNoticeId,
      previousState: 'Action Required',
      newState: 'Direction Issued & Delivered',
      reason: reason,
      tamperProofHash: newNotice.sha256Hash
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Formal Regulatory Notice ${newNoticeId} issued and delivered to ${activeFinding.mine}`, 'success');
    navigateTo('09', { noticeId: newNoticeId });
  };

  const requestClarification = (findingId: string, reason: string) => {
    setFindings(prev =>
      prev.map(f =>
        f.id === findingId
          ? {
              ...f,
              mineResponse: f.mineResponse ? { ...f.mineResponse, status: 'Clarification Requested' } : undefined
            }
          : f
      )
    );

    const auditEntry: RegulatoryAuditLogItem = {
      id: 'AUD-REG-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. P. C. Joshi',
      role: 'Authorized Regulatory Reviewer',
      action: 'Clarification Requested on Mine Response',
      objectType: 'Mine Response',
      objectId: findingId,
      previousState: 'Response Submitted',
      newState: 'Clarification Requested',
      reason: reason,
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Controlled clarification request transmitted to Mine Manager for ${findingId}`, 'warning');
    setIsClarificationModalOpen(false);
  };

  const escalateFinding = (findingId: string, targetLevel: EscalationLevel, reason: string) => {
    setFindings(prev =>
      prev.map(f =>
        f.id === findingId
          ? {
              ...f,
              status: 'Escalated',
              escalation: {
                isEscalated: true,
                currentLevel: targetLevel,
                reason: reason,
                escalatedOn: new Date().toLocaleDateString('en-IN') + ' IST',
                escalatedBy: 'Er. P. C. Joshi'
              }
            }
          : f
      )
    );

    const auditEntry: RegulatoryAuditLogItem = {
      id: 'AUD-REG-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. P. C. Joshi',
      role: 'Authorized Regulatory Reviewer',
      action: `Statutory Finding Escalated to ${targetLevel}`,
      objectType: 'Escalation',
      objectId: findingId,
      previousState: 'Under Action',
      newState: `Escalated: ${targetLevel}`,
      reason: reason,
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Finding ${findingId} formally escalated to ${targetLevel}`, 'warning');
    setIsEscalateModalOpen(false);
  };

  const createCapaHandoff = (findingId: string, payload: { department: string; person: string; dueDate: string; actions: string[] }) => {
    const newCapaId = 'CAPA-2026-' + (Math.floor(Math.random() * 900) + 100);

    setFindings(prev =>
      prev.map(f =>
        f.id === findingId
          ? {
              ...f,
              capaHandoff: {
                capaRequired: true,
                capaId: newCapaId,
                status: 'Created',
                responsibleDepartment: payload.department,
                responsiblePerson: payload.person,
                dueDate: payload.dueDate,
                progressPercentage: 0,
                verifier: 'DGMS Panel Independent Verifier'
              }
            }
          : f
      )
    );

    const auditEntry: RegulatoryAuditLogItem = {
      id: 'AUD-REG-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. P. C. Joshi',
      role: 'Authorized Regulatory Reviewer',
      action: `CAPA Created & Handed Off: ${newCapaId}`,
      objectType: 'CAPA',
      objectId: newCapaId,
      previousState: 'CAPA Decision Required',
      newState: 'CAPA Created (Ready for Workspace 06)',
      reason: `Created 3-stage CAPA assigned to ${payload.department} (${payload.person}).`,
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Corrective Action ${newCapaId} created and handed off to Workspace 06`, 'success');
    navigateTo('13');
  };

  const closeFinding = (findingId: string, resolutionNotes: string): boolean => {
    const f = findings.find(x => x.id === findingId);
    if (!f) return false;

    // Check Preconditions: CAPA must be verified before finding closure!
    if (f.capaHandoff?.status !== 'Verified' && f.capaHandoff?.status !== 'Closed') {
      showToast('Finding closure blocked: Independent CAPA verification in Workspace 06 is still pending', 'error');
      return false;
    }

    setFindings(prev =>
      prev.map(item =>
        item.id === findingId
          ? { ...item, status: 'Closed' }
          : item
      )
    );

    const auditEntry: RegulatoryAuditLogItem = {
      id: 'AUD-REG-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. P. C. Joshi',
      role: 'Authorized Regulatory Reviewer',
      action: 'Finding Formally Closed & Sealed',
      objectType: 'Resolution',
      objectId: findingId,
      previousState: 'Under Action',
      newState: 'Closed',
      reason: resolutionNotes || 'All regulatory preconditions and independent verifications satisfied.',
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Finding ${findingId} formally closed and sealed in statutory records`, 'success');
    return true;
  };

  const openDocumentViewer = (doc: RegulatoryDocumentItem) => {
    setSelectedDocumentForViewer(doc);
  };

  const closeDocumentViewer = () => {
    setSelectedDocumentForViewer(null);
  };

  return (
    <RegulatoryActionContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedMine,
        setSelectedMine,
        quickNavOpen,
        setQuickNavOpen,
        toastMessage,
        showToast,
        findings,
        activeFinding,
        setActiveFinding,
        classifyFinding,
        traceabilityChain: TRACEABILITY_CHAIN,
        notices,
        activeNotice,
        setActiveNotice,
        issueRegulatoryAction,
        requestClarification,
        escalateFinding,
        createCapaHandoff,
        closeFinding,
        regulatoryDocuments,
        selectedDocumentForViewer,
        openDocumentViewer,
        closeDocumentViewer,
        isEscalateModalOpen,
        setIsEscalateModalOpen,
        isClarificationModalOpen,
        setIsClarificationModalOpen,
        auditLog
      }}
    >
      {children}
    </RegulatoryActionContext.Provider>
  );
};

export const useRegulatoryAction = () => {
  const context = useContext(RegulatoryActionContext);
  if (!context) {
    throw new Error('useRegulatoryAction must be used within a RegulatoryActionProvider');
  }
  return context;
};
