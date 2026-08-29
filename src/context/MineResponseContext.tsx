"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  MineResponseScreenId,
  MineInspectionItem,
  MineChecklistItem,
  MineObservation,
  MineEvidenceItem,
  MineFindingItem,
  MineResponseVersion,
  MineCAPAItem,
  MineDocumentUpload,
  UpcomingInspectionItem,
  MineAuditActivityItem
} from '../types/mineResponse';

// Initial pre-seeded mock dataset ensuring full continuity with Workspace 03 outputs
const INITIAL_INSPECTIONS: MineInspectionItem[] = [
  {
    id: 'INS-2026-0882',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'District 4, Deep Underground Seam VII',
    type: 'Ventilation & Environmental Governance',
    track: 'Safety',
    authority: 'Internal',
    date: '15 Nov 2026',
    timeWindow: '10:30 – 14:30 IST',
    leadInspector: {
      id: 'INS-PER-01',
      name: 'R. Sharma',
      designation: 'Lead Inspector (DGMS Certified First Class)',
      certification: 'DGMS/FCM/2014/9981'
    },
    summary: {
      totalChecklist: 22,
      passCount: 17,
      failCount: 4,
      naCount: 1,
      observationsCount: 7,
      evidenceCount: 28,
      measurementsCount: 10,
      confirmedFindingsCount: 3
    },
    findingsCount: 3,
    status: 'Completed',
    completedAt: '15 Nov 2026 15:10 IST'
  },
  {
    id: 'INS-2026-0891',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Inclined Haulage & Substation Sub-level 3',
    type: 'Electrical & Flameproof Apparatus Audit',
    track: 'Safety',
    authority: 'Internal',
    date: '18 Nov 2026',
    timeWindow: '09:00 – 13:00 IST',
    leadInspector: {
      id: 'INS-PER-03',
      name: 'K. Rao',
      designation: 'Senior Electrical Mine Inspector',
      certification: 'DGMS/EE/2016/4102'
    },
    summary: {
      totalChecklist: 18,
      passCount: 0,
      failCount: 0,
      naCount: 0,
      observationsCount: 0,
      evidenceCount: 0,
      measurementsCount: 0,
      confirmedFindingsCount: 0
    },
    findingsCount: 0,
    status: 'Scheduled'
  },
  {
    id: 'INS-2026-0880',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Opencast Pit 2 Highwall Section',
    type: 'Highwall Slope & Dump Stability',
    track: 'Statutory',
    authority: 'DGMS',
    date: '14 Nov 2026',
    timeWindow: '08:00 – 12:00 IST',
    leadInspector: {
      id: 'INS-PER-02',
      name: 'V. Raman',
      designation: 'Director of Mines Safety (DGMS)',
      certification: 'DGMS/DIR/2009/1004'
    },
    summary: {
      totalChecklist: 20,
      passCount: 19,
      failCount: 1,
      naCount: 0,
      observationsCount: 3,
      evidenceCount: 14,
      measurementsCount: 8,
      confirmedFindingsCount: 1
    },
    findingsCount: 1,
    status: 'Completed',
    completedAt: '14 Nov 2026 13:45 IST'
  },
  {
    id: 'INS-2026-0879',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Main Shaft No. 1 Winding Engine Room',
    type: 'Winding Engine & Brake Governor Test',
    track: 'Safety',
    authority: 'Internal',
    date: '12 Nov 2026',
    timeWindow: '10:00 – 14:00 IST',
    leadInspector: {
      id: 'INS-PER-01',
      name: 'R. Sharma',
      designation: 'Lead Inspector (DGMS Certified)',
      certification: 'DGMS/FCM/2014/9981'
    },
    summary: {
      totalChecklist: 15,
      passCount: 14,
      failCount: 1,
      naCount: 0,
      observationsCount: 2,
      evidenceCount: 12,
      measurementsCount: 6,
      confirmedFindingsCount: 1
    },
    findingsCount: 1,
    status: 'Completed',
    completedAt: '12 Nov 2026 14:20 IST'
  },
  {
    id: 'INS-2026-0875',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Continuous Miner Panel 4 East',
    type: 'Strata Control & Support System Audit',
    track: 'Safety',
    authority: 'Internal',
    date: '08 Nov 2026',
    timeWindow: '09:30 – 15:30 IST',
    leadInspector: {
      id: 'INS-PER-04',
      name: 'S. N. Sen',
      designation: 'Geotechnical Safety Inspector',
      certification: 'DGMS/GEO/2012/3321'
    },
    summary: {
      totalChecklist: 24,
      passCount: 24,
      failCount: 0,
      naCount: 0,
      observationsCount: 1,
      evidenceCount: 20,
      measurementsCount: 15,
      confirmedFindingsCount: 0
    },
    findingsCount: 0,
    status: 'Completed',
    completedAt: '08 Nov 2026 16:00 IST'
  }
];

const INITIAL_CHECKLIST: MineChecklistItem[] = [
  {
    id: 'CHK-01',
    requirementId: 'REQ-VENT-014',
    category: 'Ventilation & Airflow',
    requirement: 'Main Return Airway Velocity must meet statutory minimum airflow threshold (≥ 5.5 m/s) at Shaft 3 intake connection.',
    regulatoryBasis: 'Coal Mines Regulations (CMR) 2017',
    clause: 'Regulation 153(2)(b) — Minimum Airway Velocity',
    inspectorResult: 'FAIL',
    measuredValue: '4.8 m/s',
    requiredValue: '≥ 5.5 m/s',
    unit: 'm/s',
    instrument: 'Digital Vane Anemometer (Calibrated Cal-2026-88)',
    evidenceCount: { photos: 2, measurements: 1, documents: 1 },
    status: 'NON-COMPLIANT',
    observationId: 'OBS-2026-00482',
    findingId: 'FND-2026-00127'
  },
  {
    id: 'CHK-02',
    requirementId: 'REQ-METH-003',
    category: 'Ventilation & Gas Monitoring',
    requirement: 'Continuous Methane (CH4) Sensor calibration at District 4 header face must be within valid 7-day statutory calibration window.',
    regulatoryBasis: 'CMR 2017',
    clause: 'Regulation 159 — Inflammable Gas Monitoring',
    inspectorResult: 'PASS',
    measuredValue: '0.12% CH4',
    requiredValue: '< 0.75% CH4',
    unit: '% CH4',
    instrument: 'Optical Gas Detector Opt-412',
    evidenceCount: { photos: 1, measurements: 1, documents: 1 },
    status: 'COMPLIANT'
  },
  {
    id: 'CHK-03',
    requirementId: 'REQ-STRATA-022',
    category: 'Strata Control & Support',
    requirement: 'Roof bolt pre-tension torque testing across return roadway split must exceed 120 Nm across 10 sample anchors.',
    regulatoryBasis: 'DGMS Tech Circular No. 6 of 2016',
    clause: 'SCAMP Support Audit & Anchorage Verification',
    inspectorResult: 'FAIL',
    measuredValue: '95 Nm (4 of 10 under-torqued)',
    requiredValue: '≥ 120 Nm',
    unit: 'Nm',
    instrument: 'Calibrated Torque Wrench TW-90',
    evidenceCount: { photos: 3, measurements: 1, documents: 0 },
    status: 'NON-COMPLIANT',
    observationId: 'OBS-2026-00485',
    findingId: 'FND-2026-00128'
  },
  {
    id: 'CHK-04',
    requirementId: 'REQ-DUST-008',
    category: 'Dust Suppression & Water Sprays',
    requirement: 'Water spray manifold delivery pressure at conveyor transfer head must maintain ≥ 3.0 kg/cm² active discharge.',
    regulatoryBasis: 'CMR 2017',
    clause: 'Regulation 143 — Airborne Coal Dust Precautions',
    inspectorResult: 'FAIL',
    measuredValue: '1.8 kg/cm²',
    requiredValue: '≥ 3.0 kg/cm²',
    unit: 'kg/cm²',
    instrument: 'Hydrostatic Pressure Gauge PG-22',
    evidenceCount: { photos: 1, measurements: 1, documents: 0 },
    status: 'NON-COMPLIANT',
    observationId: 'OBS-2026-00488',
    findingId: 'FND-2026-00129'
  },
  {
    id: 'CHK-05',
    requirementId: 'REQ-ELEC-012',
    category: 'Electrical & Flameproof',
    requirement: 'Flameproof Gate End Box enclosure gap tolerance must be ≤ 0.50 mm across all machined joint flanges.',
    regulatoryBasis: 'Indian Electricity Rules / CMR 2017',
    clause: 'Regulation 188 — FLP Apparatus Integrity',
    inspectorResult: 'PASS',
    measuredValue: '0.25 mm',
    requiredValue: '≤ 0.50 mm',
    unit: 'mm',
    instrument: 'Feeler Gauge Set FG-04',
    evidenceCount: { photos: 1, measurements: 1, documents: 1 },
    status: 'COMPLIANT'
  },
  {
    id: 'CHK-06',
    requirementId: 'REQ-ESCAPE-001',
    category: 'Emergency Preparedness',
    requirement: 'Second outlet traveling road lighting and refuge chamber signage clear line-of-sight verification.',
    regulatoryBasis: 'CMR 2017',
    clause: 'Regulation 88 — Outlets from Mine Workings',
    inspectorResult: 'PASS',
    measuredValue: '100% illuminated',
    requiredValue: 'Clear & Unobstructed',
    evidenceCount: { photos: 2, measurements: 0, documents: 1 },
    status: 'COMPLIANT'
  },
  {
    id: 'CHK-07',
    requirementId: 'REQ-PUMP-009',
    category: 'Drainage & Pumping',
    requirement: 'Main Sump auxiliary pump stand-by automation and float switch interlock test.',
    regulatoryBasis: 'CMR 2017',
    clause: 'Regulation 176 — Inundation Precautions',
    inspectorResult: 'N/A',
    evidenceCount: { photos: 0, measurements: 0, documents: 0 },
    status: 'NOT-APPLICABLE'
  }
];

const INITIAL_OBSERVATION: MineObservation = {
  id: 'OBS-2026-00482',
  inspectionId: 'INS-2026-0882',
  checklistId: 'CHK-01',
  requirementId: 'REQ-VENT-014',
  location: 'Shaft 3 — Return Airway Intersection (Chainage 140m)',
  text: 'Airflow velocity measured across cross-sectional area of Return Airway was recorded at 4.8 m/s against the prescribed statutory requirement of ≥ 5.5 m/s. Auxiliary booster booster fan regulator louvres at Splice Junction 4 found partially obstructed with accumulation of loose stone-dust spillage.',
  measurement: {
    observed: '4.8 m/s',
    required: '≥ 5.5 m/s',
    instrument: 'Digital Vane Anemometer (Model DA-800, Serial #ANM-2024-91)',
    calibrationStatus: 'Valid',
    calibrationExpiry: '24 Jan 2027'
  },
  inspector: {
    name: 'R. Sharma',
    designation: 'Lead Inspector (First Class Certified DGMS)'
  },
  timestamp: '15 Nov 2026 — 14:30 IST',
  assessment: 'Potential Non-Compliance — Direct impact on methane dilution and return air purging capacity in Seam VII.',
  photos: ['photo_vent_anemometer.jpg', 'photo_regulator_louvres.jpg'],
  documents: ['anemometer_calibration_cert.pdf', 'ventilation_survey_sheet.pdf'],
  relatedFindingId: 'FND-2026-00127'
};

const INITIAL_EVIDENCE: MineEvidenceItem[] = [
  {
    id: 'EVD-2026-0181',
    inspectionId: 'INS-2026-0882',
    type: 'PHOTO',
    title: 'Anemometer Velocity Display Reading',
    filename: 'photo_vent_anemometer.jpg',
    capturedBy: 'R. Sharma (Lead Inspector)',
    timestamp: '15 Nov 2026 11:42:18 IST',
    location: 'Shaft 3 Return Airway Ch:140m',
    linkedChecklistId: 'CHK-01',
    linkedObservationId: 'OBS-2026-00482',
    gpsCoordinates: '24°11\'48.2"N 82°41\'15.6"E (Underground Depth: -240m)',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    fileSize: '3.4 MB',
    description: 'Direct optical capture of anemometer LCD showing 4.80 m/s average over 60 second traverse.',
    isInspectorOriginal: true
  },
  {
    id: 'EVD-2026-0182',
    inspectionId: 'INS-2026-0882',
    type: 'PHOTO',
    title: 'Auxiliary Fan Regulator Louvres Obstruction',
    filename: 'photo_regulator_louvres.jpg',
    capturedBy: 'R. Sharma (Lead Inspector)',
    timestamp: '15 Nov 2026 11:48:05 IST',
    location: 'Splice Junction 4 Return',
    linkedChecklistId: 'CHK-01',
    linkedObservationId: 'OBS-2026-00482',
    gpsCoordinates: '24°11\'47.9"N 82°41\'16.1"E (Underground Depth: -240m)',
    sha256Hash: 'a7c93e482710bb849202f5a0cfb2e667823901bce471efea274191d6c8e31290',
    fileSize: '4.1 MB',
    description: 'Visual evidence of fine coal and stone dust encrustation obstructing 25% of intake louvre aperture.',
    isInspectorOriginal: true
  },
  {
    id: 'EVD-2026-0183',
    inspectionId: 'INS-2026-0882',
    type: 'MEASUREMENT',
    title: 'Airflow Traverse Calculation Sheet',
    filename: 'ventilation_survey_sheet.pdf',
    capturedBy: 'R. Sharma (Lead Inspector)',
    timestamp: '15 Nov 2026 11:55:00 IST',
    location: 'Shaft 3 Return Airway Ch:140m',
    linkedChecklistId: 'CHK-01',
    linkedObservationId: 'OBS-2026-00482',
    gpsCoordinates: '24°11\'48.2"N 82°41\'15.6"E',
    sha256Hash: '8f434346648f6b96df89dda901c5176b10e6d0ceec3e1662e008da5f20bdd6e3',
    fileSize: '1.2 MB',
    description: 'Raw logged survey measurements across 9-grid traverse plane.',
    isInspectorOriginal: true
  },
  {
    id: 'EVD-2026-0184',
    inspectionId: 'INS-2026-0882',
    type: 'DOCUMENT',
    title: 'National Metrology Anemometer Calibration Certificate',
    filename: 'anemometer_calibration_cert.pdf',
    capturedBy: 'R. Sharma (Lead Inspector)',
    timestamp: '15 Nov 2026 10:15:22 IST',
    location: 'Surface Safety Lamp Room',
    linkedChecklistId: 'CHK-01',
    linkedObservationId: 'OBS-2026-00482',
    gpsCoordinates: '24°11\'52.0"N 82°41\'10.0"E',
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    fileSize: '890 KB',
    description: 'Valid calibration certificate #DGMS/CAL/2026/099 valid through 24 Jan 2027.',
    isInspectorOriginal: true
  }
];

const INITIAL_FINDINGS: MineFindingItem[] = [
  {
    id: 'FND-2026-00127',
    inspectionId: 'INS-2026-0882',
    title: 'Ventilation Airflow Velocity below Statutory Threshold in Shaft 3 Return',
    issueDescription: 'Main return airway velocity at Shaft 3 intersection recorded at 4.8 m/s (prescribed statutory minimum ≥ 5.5 m/s) resulting in suboptimal methane dilution and ventilation pressure deficit.',
    requirementId: 'REQ-VENT-014',
    severity: 'HIGH',
    status: 'Confirmed',
    capaStatus: 'In Progress',
    capaId: 'CAPA-2026-0048',
    responseDue: '30 Nov 2026',
    daysRemaining: 2,
    regulatoryTrace: {
      act: 'Mines Act, 1952 (Act No. 35 of 1952)',
      regulation: 'Coal Mines Regulations (CMR) 2017',
      clause: 'Regulation 153(2)(b) & Regulation 156',
      requirement: 'Adequate quantity of ventilation in belowground workings; minimum air velocity in main return airways not less than 5.5 m/s.',
      applicability: 'All Degree II & Degree III gassy underground coal seams.',
      obligation: 'Mine Manager & Chief Ventilation Officer must maintain continuous statutory compliance.',
      penalProvision: 'Section 72A & Section 73 of the Mines Act, 1952 (Cognizable violation).'
    },
    originalObservationId: 'OBS-2026-00482',
    measurementText: 'Observed: 4.8 m/s | Prescribed: ≥ 5.5 m/s | Instrument: Calibrated Vane Anemometer',
    reviewDecision: {
      confirmedBy: 'Er. P. C. Joshi (Authorized Statutory Reviewer & DGMS Liaison)',
      confirmedDate: '16 Nov 2026 — 10:45 IST',
      reviewerRemarks: 'Confirmed as statutory High Severity non-compliance. Mine management response and formal CAPA required before statutory deadline of 30 Nov 2026.'
    },
    mineResponse: {
      status: 'Pending',
      explanation: '',
      immediateAction: '',
      rootCause: '',
      correctiveAction: '',
      department: 'Ventilation Department',
      responsiblePerson: 'Er. S. K. Mahapatra (Chief Ventilation Engineer)'
    }
  },
  {
    id: 'FND-2026-00128',
    inspectionId: 'INS-2026-0882',
    title: 'Under-torqued Roof Support Anchors at District 4 Split',
    issueDescription: '4 out of 10 sampled resin-grouted roof bolts exhibited pre-tension torque below 100 Nm (statutory threshold ≥ 120 Nm).',
    requirementId: 'REQ-STRATA-022',
    severity: 'CRITICAL',
    status: 'Confirmed',
    capaStatus: 'Required',
    responseDue: '28 Nov 2026',
    daysRemaining: 1,
    regulatoryTrace: {
      act: 'Mines Act, 1952',
      regulation: 'CMR 2017',
      clause: 'Regulation 123 — Support of Working Places',
      requirement: 'Strata Control and Monitoring Plan (SCAMP) compliance and anchorage testing.',
      applicability: 'Deep Seam VII roadways subject to abutment stress.',
      obligation: 'Daily anchorage pull and torque validation by Overman.',
      penalProvision: 'Section 72 of Mines Act (Suspension of coal extraction in un-supported areas).'
    },
    originalObservationId: 'OBS-2026-00485',
    measurementText: 'Observed: 95 Nm | Prescribed: ≥ 120 Nm',
    reviewDecision: {
      confirmedBy: 'Er. P. C. Joshi',
      confirmedDate: '16 Nov 2026',
      reviewerRemarks: 'Critical strata safety violation. Immediate secondary support re-tensioning mandated.'
    }
  },
  {
    id: 'FND-2026-00129',
    inspectionId: 'INS-2026-0882',
    title: 'Deficient Water Spray Pressure at Main Conveyor Transfer Point',
    issueDescription: 'Water spray manifold discharge pressure at 1.8 kg/cm² failing to provide adequate airborne coal dust suppression.',
    requirementId: 'REQ-DUST-008',
    severity: 'MEDIUM',
    status: 'Confirmed',
    capaStatus: 'In Progress',
    capaId: 'CAPA-2026-0051',
    responseDue: '05 Dec 2026',
    daysRemaining: 7,
    regulatoryTrace: {
      act: 'Mines Act, 1952',
      regulation: 'CMR 2017',
      clause: 'Regulation 143 — Airborne Dust Suppression',
      requirement: 'Continuous water spray suppression at all coal transfer discharge points.',
      applicability: 'All mechanized belt conveyor lines.',
      obligation: 'Mechanical & Safety Engineer inspection.',
      penalProvision: 'Statutory fine and notice under Section 22.'
    },
    originalObservationId: 'OBS-2026-00488',
    measurementText: 'Observed: 1.8 kg/cm² | Prescribed: ≥ 3.0 kg/cm²',
    reviewDecision: {
      confirmedBy: 'Er. P. C. Joshi',
      confirmedDate: '16 Nov 2026',
      reviewerRemarks: 'Confirmed. Booster pump overhaul and nozzle descaling required.'
    }
  }
];

const INITIAL_CAPA_LIST: MineCAPAItem[] = [
  {
    id: 'CAPA-2026-0048',
    findingId: 'FND-2026-00127',
    findingTitle: 'Ventilation Airflow Velocity below Statutory Threshold in Shaft 3 Return',
    title: 'Overhaul and Aerodynamic Recalibration of Shaft 3 Return Ventilation System',
    actionDescription: 'Clear obstructions from regulator louvres at Splice Junction 4, increase auxiliary booster fan blade pitch from 14° to 18°, conduct comprehensive multi-point anemometer survey, and file statutory compliance certificate.',
    department: 'Ventilation Department',
    responsiblePerson: 'Er. S. K. Mahapatra',
    responsibleTitle: 'Chief Ventilation Engineer (First Class Certified)',
    priority: 'HIGH',
    dueDate: '30 Nov 2026',
    daysOverdue: 0,
    status: 'In Progress',
    progressPercentage: 60,
    verifier: 'Er. T. Bannerjee (Authorized Independent Safety Verifier, DGMS Panel)',
    requiredEvidenceChecklist: [
      { id: 'EVC-01', title: 'Regulator Louvres Cleaning & De-silting Photographic Report', completed: true, fileAttached: 'louvres_cleaning_proof.pdf' },
      { id: 'EVC-02', title: 'Fan Blade Pitch Adjustment & Motor Current Test Log', completed: true, fileAttached: 'fan_motor_test_log.pdf' },
      { id: 'EVC-03', title: 'Post-Repair Airflow Velocity Survey (Target ≥ 5.8 m/s)', completed: false },
      { id: 'EVC-04', title: 'Statutory Ventilation Log Book Entry signed by Manager', completed: false }
    ],
    subActions: [
      { id: 'SA-01', title: 'Louvre descaling and debris removal at Splice Junction 4', status: 'Completed', owner: 'R. K. Yadav (Ventilation Overman)', dueDate: '18 Nov 2026' },
      { id: 'SA-02', title: 'Auxiliary fan blade pitch angle adjustment and dynamic balancing', status: 'Completed', owner: 'M. S. Reddy (Mechanical Foreman)', dueDate: '21 Nov 2026' },
      { id: 'SA-03', title: 'Execute official 9-point airway velocity survey and anemometer log', status: 'In Progress', owner: 'Er. S. K. Mahapatra', dueDate: '26 Nov 2026' },
      { id: 'SA-04', title: 'Submit verified evidence dossier to STRATA Central Gateway for statutory sign-off', status: 'Pending', owner: 'Er. A. K. Verma (Mine Manager)', dueDate: '30 Nov 2026' }
    ],
    updates: [
      { id: 'UPD-01', timestamp: '17 Nov 2026 14:00', updatedBy: 'Er. S. K. Mahapatra', progress: 30, status: 'In Progress', comment: 'Louvre cleaning crew mobilized; completed debris removal across 40m return zone.' },
      { id: 'UPD-02', timestamp: '21 Nov 2026 16:30', updatedBy: 'M. S. Reddy', progress: 60, status: 'In Progress', comment: 'Fan blade pitch reset to 18°. Motor running stable at 112A with zero abnormal vibration.' }
    ]
  },
  {
    id: 'CAPA-2026-0045',
    findingId: 'FND-2026-00121',
    findingTitle: 'Electrical Substation Earth Pit Resistance Anomaly',
    title: 'Replacement and Moisture Chemical Treatment of Substation Earth Electrodes',
    actionDescription: 'Excavate and re-bed earth pits #3 and #4 with bentonite charcoal slurry to restore statutory earth loop impedance below 1.0 Ohm.',
    department: 'Electrical Engineering',
    responsiblePerson: 'Er. D. P. Mukherjee',
    responsibleTitle: 'Chief Electrical Engineer',
    priority: 'HIGH',
    dueDate: '25 Nov 2026',
    daysOverdue: 3,
    status: 'Overdue',
    progressPercentage: 45,
    verifier: 'Er. K. Rao (DGMS Electrical Safety Auditor)',
    requiredEvidenceChecklist: [
      { id: 'EVC-E01', title: 'Earth Resistance Megger Test Sheet', completed: false },
      { id: 'EVC-E02', title: 'Photograph of Re-treated Earth Pits', completed: true, fileAttached: 'earth_pit_photo.jpg' }
    ],
    subActions: [
      { id: 'SA-E01', title: 'Electrode chemical slurry re-bedding', status: 'Completed', owner: 'K. N. Singh', dueDate: '20 Nov 2026' },
      { id: 'SA-E02', title: 'Calibrated Earth Megger Measurement & Log', status: 'In Progress', owner: 'Er. D. P. Mukherjee', dueDate: '25 Nov 2026' }
    ],
    updates: [
      { id: 'UPD-E01', timestamp: '22 Nov 2026', updatedBy: 'Er. D. P. Mukherjee', progress: 45, status: 'In Progress', comment: 'Bentonite slurry poured; awaiting 72-hour soil settlement before final resistance verification.' }
    ]
  },
  {
    id: 'CAPA-2026-0051',
    findingId: 'FND-2026-00129',
    findingTitle: 'Deficient Water Spray Pressure at Main Conveyor Transfer Point',
    title: 'Booster Pump Overhaul and Spray Nozzle Descaling on Conveyor 3B',
    actionDescription: 'Replace worn impellers on auxiliary water booster pump WP-02 and replace 12 clogged spray nozzles with high-pressure stainless steel atomizers.',
    department: 'Mechanical Department',
    responsiblePerson: 'Er. M. S. Reddy',
    responsibleTitle: 'Senior Mechanical Engineer',
    priority: 'MEDIUM',
    dueDate: '05 Dec 2026',
    daysOverdue: 0,
    status: 'In Progress',
    progressPercentage: 20,
    verifier: 'Internal Safety Committee',
    requiredEvidenceChecklist: [
      { id: 'EVC-M01', title: 'Pressure Gauge Video Proof showing ≥ 3.2 kg/cm²', completed: false }
    ],
    subActions: [
      { id: 'SA-M01', title: 'Procure nozzle set from central stores', status: 'Completed', owner: 'M. S. Reddy', dueDate: '28 Nov 2026' }
    ],
    updates: []
  },
  {
    id: 'CAPA-2026-0039',
    findingId: 'FND-2026-00115',
    findingTitle: 'Winding Engine Brake Liners Friction Coefficient',
    title: 'Brake Liner Replacement & Deceleration Testing on Main Shaft Winder',
    actionDescription: 'Install OEM sintered metallic brake pads on South Hoist drum and execute emergency trip retardation tests.',
    department: 'Mechanical Engineering',
    responsiblePerson: 'Er. A. B. Roy',
    responsibleTitle: 'Winder In-Charge',
    priority: 'HIGH',
    dueDate: '15 Nov 2026',
    daysOverdue: 0,
    status: 'Under Verification',
    progressPercentage: 100,
    verifier: 'Er. P. C. Joshi (DGMS Authorized Verifier)',
    requiredEvidenceChecklist: [
      { id: 'EVC-W01', title: 'Decelerometer Trace Log', completed: true, fileAttached: 'decelerometer_log.pdf' },
      { id: 'EVC-W02', title: 'Brake Holding Test Video', completed: true, fileAttached: 'brake_test_video.mp4' }
    ],
    subActions: [],
    updates: []
  },
  {
    id: 'CAPA-2026-0030',
    findingId: 'FND-2026-00098',
    findingTitle: 'Second Outlet Traveling Road Illumination Deficit',
    title: 'Installation of Intrinsically Safe LED Ribbon Lighting in Traveling Way',
    actionDescription: 'Erect 400m of armored FLP LED lighting along seam escape route with backup battery stations.',
    department: 'Electrical Engineering',
    responsiblePerson: 'Er. D. P. Mukherjee',
    responsibleTitle: 'Chief Electrical Engineer',
    priority: 'MEDIUM',
    dueDate: '01 Nov 2026',
    daysOverdue: 0,
    status: 'Completed',
    progressPercentage: 100,
    verifier: 'DGMS Safety Directorate',
    requiredEvidenceChecklist: [
      { id: 'EVC-L01', title: 'Final Lux Meter Survey Report', completed: true, fileAttached: 'lux_meter_report.pdf' }
    ],
    subActions: [],
    updates: []
  }
];

const INITIAL_UPCOMING: UpcomingInspectionItem[] = [
  {
    id: 'UP-01',
    title: 'Ventilation & Methane Drainage Comprehensive Statutory Inspection',
    type: 'Ventilation Safety Audit',
    track: 'Safety',
    authority: 'Internal DGMS Audit Cell',
    scope: 'District 4, Seam VII Underground Panels 1 to 4',
    date: '15 Nov 2026',
    time: '10:30 IST',
    leadInspector: 'Er. R. Sharma (Lead Inspector)',
    teamMembers: ['R. Sharma (Lead)', 'P. Sengupta (Ventilation Tech)', 'A. Nair (Observer)'],
    status: 'Scheduled',
    prepRequirements: [
      { id: 'PR-01', item: 'Calibrated Anemometer Survey Log for preceding 30 days staged', isReady: true },
      { id: 'PR-02', item: 'Methane Continuous Telemetry Calibration records verified', isReady: true },
      { id: 'PR-03', item: 'Ventilation Stoppings & Regulator maintenance register ready', isReady: false }
    ]
  },
  {
    id: 'UP-02',
    title: 'Flameproof Apparatus & Substation Comprehensive Electrical Audit',
    type: 'Electrical Safety Inspection',
    track: 'Safety',
    authority: 'DGMS Regional Directorate',
    scope: 'Inclined Haulage, Substation Sub-level 3 & Belt Conveyor Lines',
    date: '18 Nov 2026',
    time: '09:00 IST',
    leadInspector: 'Er. K. Rao (DGMS Electrical Inspector)',
    teamMembers: ['K. Rao (Lead)', 'S. Bhattacharya (Senior Electrical Inspector)'],
    status: 'Preparation Required',
    prepRequirements: [
      { id: 'PR-04', item: 'Flameproof FLP certificates for all 18 Gate End Boxes on file', isReady: true },
      { id: 'PR-05', item: 'Earth Pit resistance logs under 1.0 Ohm updated', isReady: false },
      { id: 'PR-06', item: 'Trailing cable insulation test certificates ready', isReady: true }
    ]
  }
];

const INITIAL_RESPONSE_VERSIONS: Record<string, MineResponseVersion[]> = {
  'FND-2026-00127': [
    {
      version: 1,
      timestamp: '16 Nov 2026 10:30 IST',
      actor: 'Er. A. K. Verma',
      role: 'Mine Manager',
      action: 'Draft Created',
      explanation: 'Airflow drop occurred following sudden stone-dust spillage during conveyor feeder cleaning on shift 2.',
      immediateAction: 'Regulator aperture manually cleared by Overman; preliminary velocity restored to 5.2 m/s.',
      rootCause: 'Defective dust deflection baffle allowing material buildup near regulator louvres.',
      correctiveAction: 'Install heavy-duty deflector plate and re-adjust auxiliary fan blade pitch to 18°.',
      responsibleDepartment: 'Ventilation Department',
      responsiblePerson: 'Er. S. K. Mahapatra (Chief Ventilation Engineer)',
      targetDate: '30 Nov 2026',
      attachments: ['preliminary_incident_memo.pdf'],
      digitalSignatureHash: 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592'
    },
    {
      version: 2,
      timestamp: '16 Nov 2026 14:20 IST',
      actor: 'Er. A. K. Verma',
      role: 'Mine Manager',
      action: 'Response Submitted',
      explanation: 'Official Mine Response formally committed to complete aerodynamic overhaul and statutory re-testing before 30 Nov 2026.',
      immediateAction: 'Immediate descaling completed. Ventilation Overman instructed to conduct twice-daily velocity checks.',
      rootCause: 'Accumulation of debris combined with sub-optimal auxiliary booster fan blade pitch angle (14°).',
      correctiveAction: 'Execute 4-stage CAPA-2026-0048 including fan blade pitch calibration and independent verification.',
      responsibleDepartment: 'Ventilation Department',
      responsiblePerson: 'Er. S. K. Mahapatra (Chief Ventilation Engineer)',
      targetDate: '30 Nov 2026',
      attachments: ['preliminary_incident_memo.pdf', 'engineering_mod_drawing_v2.pdf'],
      digitalSignatureHash: '8f14e45fceea167a5a36dedd4bea2543add704d8e512b5ea06e50225bde3d303'
    },
    {
      version: 3,
      timestamp: '17 Nov 2026 09:15 IST',
      actor: 'Er. P. C. Joshi',
      role: 'DGMS Liaison & Reviewer',
      action: 'Clarification Requested',
      reason: 'Please specify the exact anemometer calibration certificate number used for the interim 5.2 m/s measurement.',
      explanation: 'Reviewer requested calibration traceability on interim instruments.',
      immediateAction: 'Verified instrument serial number.',
      rootCause: 'Administrative omission in preliminary attachment.',
      correctiveAction: 'Attached official calibration certificate #DGMS/CAL/2026/099.',
      responsibleDepartment: 'Ventilation Department',
      responsiblePerson: 'Er. S. K. Mahapatra',
      targetDate: '30 Nov 2026',
      attachments: ['preliminary_incident_memo.pdf', 'engineering_mod_drawing_v2.pdf', 'anemometer_cal_cert_099.pdf'],
      digitalSignatureHash: 'a681c62f2d486d9539bf587f71e893eb42323c21a4f0ad6a86e7a2b952f4a569'
    }
  ]
};

const INITIAL_AUDIT_LOG: MineAuditActivityItem[] = [
  {
    id: 'AUD-001',
    timestamp: '15 Nov 2026 15:10:45 IST',
    actor: 'R. Sharma',
    role: 'Lead Inspector (DGMS Certified)',
    action: 'Inspection Submitted',
    objectType: 'Inspection',
    objectId: 'INS-2026-0882',
    previousState: 'Active Execution',
    newState: 'Completed',
    reason: 'Field execution concluded across all 22 checklist items with 28 evidence captures.',
    ipAddress: '10.14.88.21 (Underground Wi-Fi Node 7)',
    tamperProofHash: '9c56cc51b374c3ba189210d5b6d4bf57790d351c96c47c02190ecf1e430635ab'
  },
  {
    id: 'AUD-002',
    timestamp: '16 Nov 2026 10:45:12 IST',
    actor: 'Er. P. C. Joshi',
    role: 'Statutory Reviewer',
    action: 'Finding Confirmed',
    objectType: 'Finding',
    objectId: 'FND-2026-00127',
    previousState: 'Under Review',
    newState: 'Confirmed',
    reason: 'Validated airflow deficit of 4.8 m/s against CMR 2017 Reg 153. Mandated mine response by 30 Nov 2026.',
    ipAddress: '10.14.12.04',
    tamperProofHash: 'b45cffe3219001bcae44921008d5b6d4bf57790d351c96c47c02190ecf1e4306'
  },
  {
    id: 'AUD-003',
    timestamp: '16 Nov 2026 14:20:00 IST',
    actor: 'Er. A. K. Verma',
    role: 'Mine Manager',
    action: 'Mine Response Submitted',
    objectType: 'Mine Response',
    objectId: 'FND-2026-00127',
    previousState: 'Draft',
    newState: 'Response Submitted',
    reason: 'Official Mine Response and CAPA commitment digitally signed and committed to statutory ledger.',
    ipAddress: '10.14.10.88',
    tamperProofHash: '8f14e45fceea167a5a36dedd4bea2543add704d8e512b5ea06e50225bde3d303'
  },
  {
    id: 'AUD-004',
    timestamp: '17 Nov 2026 11:30:20 IST',
    actor: 'Er. S. K. Mahapatra',
    role: 'Chief Ventilation Engineer',
    action: 'CAPA Action Assigned',
    objectType: 'CAPA',
    objectId: 'CAPA-2026-0048',
    previousState: 'Created',
    newState: 'In Progress',
    reason: 'Assigned Overman R. K. Yadav and Mechanical Team for fan blade calibration.',
    ipAddress: '10.14.10.92',
    tamperProofHash: '3e41b9201c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8559100'
  },
  {
    id: 'AUD-005',
    timestamp: '21 Nov 2026 16:35:00 IST',
    actor: 'Er. M. S. Reddy',
    role: 'Mechanical Foreman',
    action: 'Evidence Uploaded',
    objectType: 'Evidence',
    objectId: 'EVC-02',
    previousState: 'Pending Evidence',
    newState: 'Evidence Attached',
    reason: 'Attached Fan Blade Pitch Adjustment & Motor Current Test Log (fan_motor_test_log.pdf).',
    ipAddress: '10.14.10.104',
    tamperProofHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'
  }
];

interface MineResponseContextType {
  currentScreen: MineResponseScreenId;
  navigateTo: (screen: MineResponseScreenId, params?: Record<string, any>) => void;
  selectedMine: string;
  setSelectedMine: (mine: string) => void;
  isOnline: boolean;
  toggleOnline: () => void;
  quickNavOpen: boolean;
  setQuickNavOpen: (open: boolean) => void;
  toastMessage: { text: string; type: 'success' | 'warning' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'warning' | 'info' | 'error') => void;

  // Data
  inspections: MineInspectionItem[];
  activeInspection: MineInspectionItem;
  setActiveInspection: (insp: MineInspectionItem) => void;
  checklistItems: MineChecklistItem[];
  activeObservation: MineObservation;
  evidenceItems: MineEvidenceItem[];
  findings: MineFindingItem[];
  activeFinding: MineFindingItem;
  setActiveFinding: (fnd: MineFindingItem) => void;
  responseVersions: Record<string, MineResponseVersion[]>;
  capaList: MineCAPAItem[];
  activeCapa: MineCAPAItem;
  setActiveCapa: (capa: MineCAPAItem) => void;
  upcomingInspections: UpcomingInspectionItem[];
  auditLog: MineAuditActivityItem[];

  // Draft Response State
  draftResponse: {
    findingId: string;
    explanation: string;
    immediateAction: string;
    rootCause: string;
    correctiveAction: string;
    responsibleDepartment: string;
    responsiblePerson: string;
    targetDate: string;
    attachments: string[];
    isAccurateConfirmed: boolean;
    isOfficialConfirmed: boolean;
  };
  updateDraftResponse: (fields: Partial<MineResponseContextType['draftResponse']>) => void;
  saveResponseDraft: () => void;
  submitOfficialResponse: () => void;

  // CAPA Updates
  updateCapaProgress: (capaId: string, progress: number, status: string, comment: string, file?: string) => void;
  escalateOverdueCapa: (capaId: string, escalationLevel: string, reason: string) => void;

  // Document Upload
  uploadedDocuments: MineDocumentUpload[];
  uploadMineDocument: (doc: Omit<MineDocumentUpload, 'id' | 'uploadedAt' | 'hash'>) => void;

  // Modals / Drawers
  selectedEvidenceForDrawer: MineEvidenceItem | null;
  openEvidenceDrawer: (evd: MineEvidenceItem) => void;
  closeEvidenceDrawer: () => void;
  isCapaUpdateModalOpen: boolean;
  setIsCapaUpdateModalOpen: (open: boolean) => void;
  isEscalationModalOpen: boolean;
  setIsEscalationModalOpen: (open: boolean) => void;
}

const MineResponseContext = createContext<MineResponseContextType | undefined>(undefined);

export const MineResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<MineResponseScreenId>('01');
  const [selectedMine, setSelectedMine] = useState<string>('Mine A2');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [quickNavOpen, setQuickNavOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'warning' | 'info' | 'error' } | null>(null);

  const [inspections] = useState<MineInspectionItem[]>(INITIAL_INSPECTIONS);
  const [activeInspection, setActiveInspection] = useState<MineInspectionItem>(INITIAL_INSPECTIONS[0]);
  const [checklistItems] = useState<MineChecklistItem[]>(INITIAL_CHECKLIST);
  const [activeObservation] = useState<MineObservation>(INITIAL_OBSERVATION);
  const [evidenceItems] = useState<MineEvidenceItem[]>(INITIAL_EVIDENCE);
  const [findings, setFindings] = useState<MineFindingItem[]>(INITIAL_FINDINGS);
  const [activeFinding, setActiveFinding] = useState<MineFindingItem>(INITIAL_FINDINGS[0]);
  const [responseVersions, setResponseVersions] = useState<Record<string, MineResponseVersion[]>>(INITIAL_RESPONSE_VERSIONS);
  const [capaList, setCapaList] = useState<MineCAPAItem[]>(INITIAL_CAPA_LIST);
  const [activeCapa, setActiveCapa] = useState<MineCAPAItem>(INITIAL_CAPA_LIST[0]);
  const [upcomingInspections] = useState<UpcomingInspectionItem[]>(INITIAL_UPCOMING);
  const [auditLog, setAuditLog] = useState<MineAuditActivityItem[]>(INITIAL_AUDIT_LOG);

  // Selected Evidence for Drawer
  const [selectedEvidenceForDrawer, setSelectedEvidenceForDrawer] = useState<MineEvidenceItem | null>(null);
  const [isCapaUpdateModalOpen, setIsCapaUpdateModalOpen] = useState<boolean>(false);
  const [isEscalationModalOpen, setIsEscalationModalOpen] = useState<boolean>(false);

  // Draft Response State
  const [draftResponse, setDraftResponse] = useState({
    findingId: 'FND-2026-00127',
    explanation: 'Airflow velocity drop to 4.8 m/s was precipitated by localized stone-dust spillage and partial regulator obstruction at Splice Junction 4 following conveyor maintenance on Shift 2. Ventilation Overman was immediately dispatched to clear the obstruction.',
    immediateAction: 'Regulator aperture descaled and loose stone-dust cleared within 90 minutes of discovery. Interim single-point anemometer reading confirmed recovery to 5.2 m/s.',
    rootCause: 'Defective dust deflection baffle allowing fine accumulation near louvre vanes, coupled with conservative 14° booster fan blade pitch angle.',
    correctiveAction: 'Execute comprehensive 4-step CAPA-2026-0048: Replace deflection baffle, re-pitch auxiliary booster fan blades to 18°, conduct full 9-point airway velocity survey (target ≥ 5.8 m/s), and update statutory ventilation register.',
    responsibleDepartment: 'Ventilation Department',
    responsiblePerson: 'Er. S. K. Mahapatra (Chief Ventilation Engineer)',
    targetDate: '2026-11-30',
    attachments: ['ventilation_descaling_workorder.pdf', 'fan_blade_pitch_diagram.pdf'],
    isAccurateConfirmed: true,
    isOfficialConfirmed: true
  });

  // Uploaded Documents List
  const [uploadedDocuments, setUploadedDocuments] = useState<MineDocumentUpload[]>([
    {
      id: 'DOC-001',
      title: 'Fan Blade Pitch Adjustment & Motor Current Test Log',
      documentType: 'Maintenance Report',
      relatedFindingId: 'FND-2026-00127',
      relatedCapaId: 'CAPA-2026-0048',
      uploadedBy: 'Er. S. K. Mahapatra',
      uploadedAt: '21 Nov 2026 16:30 IST',
      fileSize: '2.4 MB',
      fileFormat: 'PDF',
      hash: 'a7c93e482710bb849202f5a0cfb2e667823901bce471efea274191d6c8e31290',
      status: 'Attached to Response'
    },
    {
      id: 'DOC-002',
      title: 'Regulator Louvres Cleaning & De-silting Photographic Report',
      documentType: 'Photographic Proof',
      relatedFindingId: 'FND-2026-00127',
      relatedCapaId: 'CAPA-2026-0048',
      uploadedBy: 'R. K. Yadav (Overman)',
      uploadedAt: '18 Nov 2026 12:15 IST',
      fileSize: '4.8 MB',
      fileFormat: 'PDF',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      status: 'Verified'
    }
  ]);

  const showToast = (text: string, type: 'success' | 'warning' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const navigateTo = (screen: MineResponseScreenId, params?: Record<string, any>) => {
    if (params?.findingId) {
      const f = findings.find(x => x.id === params.findingId);
      if (f) setActiveFinding(f);
    }
    if (params?.capaId) {
      const c = capaList.find(x => x.id === params.capaId);
      if (c) setActiveCapa(c);
    }
    if (params?.inspectionId) {
      const i = inspections.find(x => x.id === params.inspectionId);
      if (i) setActiveInspection(i);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleOnline = () => {
    setIsOnline(prev => {
      const next = !prev;
      showToast(next ? 'Online: Reconnected to DGMS / STRATA Central Gateway' : 'Offline Mode: Local Encrypted Cache Active', next ? 'success' : 'warning');
      return next;
    });
  };

  const updateDraftResponse = (fields: Partial<typeof draftResponse>) => {
    setDraftResponse(prev => ({ ...prev, ...fields }));
  };

  const saveResponseDraft = () => {
    showToast('Mine Response draft saved to encrypted local storage', 'info');
  };

  const submitOfficialResponse = () => {
    const newVersionNum = (responseVersions[activeFinding.id]?.length || 0) + 1;
    const newVersion: MineResponseVersion = {
      version: newVersionNum,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      actor: 'Er. A. K. Verma',
      role: 'Mine Manager (First Class Certified)',
      action: 'Response Submitted',
      explanation: draftResponse.explanation,
      immediateAction: draftResponse.immediateAction,
      rootCause: draftResponse.rootCause,
      correctiveAction: draftResponse.correctiveAction,
      responsibleDepartment: draftResponse.responsibleDepartment,
      responsiblePerson: draftResponse.responsiblePerson,
      targetDate: draftResponse.targetDate,
      attachments: draftResponse.attachments,
      digitalSignatureHash: 'sha256_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    };

    setResponseVersions(prev => ({
      ...prev,
      [activeFinding.id]: [...(prev[activeFinding.id] || []), newVersion]
    }));

    // Update finding status
    setFindings(prev =>
      prev.map(f =>
        f.id === activeFinding.id
          ? {
              ...f,
              status: 'Response Submitted',
              mineResponse: {
                status: 'Submitted',
                submittedAt: newVersion.timestamp,
                submittedBy: 'Er. A. K. Verma (Mine Manager)',
                explanation: draftResponse.explanation,
                immediateAction: draftResponse.immediateAction,
                rootCause: draftResponse.rootCause,
                correctiveAction: draftResponse.correctiveAction,
                department: draftResponse.responsibleDepartment,
                responsiblePerson: draftResponse.responsiblePerson,
                targetDate: draftResponse.targetDate,
                evidenceFiles: draftResponse.attachments
              }
            }
          : f
      )
    );

    // Append to audit trail
    const auditEntry: MineAuditActivityItem = {
      id: 'AUD-' + Date.now(),
      timestamp: newVersion.timestamp,
      actor: 'Er. A. K. Verma',
      role: 'Mine Manager',
      action: 'Mine Response Submitted',
      objectType: 'Mine Response',
      objectId: activeFinding.id,
      previousState: 'Draft / Pending Response',
      newState: 'Response Submitted',
      reason: 'Official Mine response formally committed with digital signature hash ' + newVersion.digitalSignatureHash.substring(0, 12) + '...',
      ipAddress: '10.14.10.88',
      tamperProofHash: newVersion.digitalSignatureHash
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast('Official Mine Response successfully submitted and added to statutory record', 'success');
    navigateTo('10A');
  };

  const updateCapaProgress = (capaId: string, progress: number, status: string, comment: string, file?: string) => {
    setCapaList(prev =>
      prev.map(c => {
        if (c.id === capaId) {
          const newUpdate = {
            id: 'UPD-' + Date.now(),
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
            updatedBy: 'Er. A. K. Verma (Mine Manager)',
            progress,
            status,
            comment,
            evidenceFile: file
          };
          return {
            ...c,
            progressPercentage: progress,
            status: status as any,
            updates: [newUpdate, ...c.updates]
          };
        }
        return c;
      })
    );

    // Append to audit trail
    const auditEntry: MineAuditActivityItem = {
      id: 'AUD-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      actor: 'Er. A. K. Verma',
      role: 'Mine Manager',
      action: 'CAPA Progress Updated',
      objectType: 'CAPA',
      objectId: capaId,
      previousState: `${activeCapa.progressPercentage}% (${activeCapa.status})`,
      newState: `${progress}% (${status})`,
      reason: comment || 'Routine statutory progress milestone update.',
      ipAddress: '10.14.10.88',
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`CAPA ${capaId} progress updated to ${progress}% (${status})`, 'success');
    setIsCapaUpdateModalOpen(false);
  };

  const escalateOverdueCapa = (capaId: string, escalationLevel: string, reason: string) => {
    const auditEntry: MineAuditActivityItem = {
      id: 'AUD-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      actor: 'Er. A. K. Verma',
      role: 'Mine Manager',
      action: `Statutory Escalation: ${escalationLevel}`,
      objectType: 'Escalation',
      objectId: capaId,
      previousState: 'Overdue (Mine Level)',
      newState: `Escalated to ${escalationLevel}`,
      reason: reason,
      ipAddress: '10.14.10.88',
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);
    showToast(`Statutory escalation dispatched for ${capaId} to ${escalationLevel}`, 'warning');
    setIsEscalationModalOpen(false);
  };

  const uploadMineDocument = (doc: Omit<MineDocumentUpload, 'id' | 'uploadedAt' | 'hash'>) => {
    const newDoc: MineDocumentUpload = {
      ...doc,
      id: 'DOC-' + (uploadedDocuments.length + 1).toString().padStart(3, '0'),
      uploadedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      hash: 'sha256_' + Math.random().toString(36).substring(2, 15)
    };
    setUploadedDocuments(prev => [newDoc, ...prev]);

    // Append to audit trail
    const auditEntry: MineAuditActivityItem = {
      id: 'AUD-' + Date.now(),
      timestamp: newDoc.uploadedAt,
      actor: doc.uploadedBy,
      role: 'Mine Management Staff',
      action: 'Document Uploaded',
      objectType: 'Evidence',
      objectId: newDoc.id,
      previousState: 'Unattached',
      newState: 'Attached & Verified',
      reason: `Uploaded ${doc.title} (${doc.documentType}) linked to ${doc.relatedFindingId || doc.relatedCapaId}.`,
      ipAddress: '10.14.10.88',
      tamperProofHash: newDoc.hash
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Document "${doc.title}" successfully uploaded and linked`, 'success');
  };

  const openEvidenceDrawer = (evd: MineEvidenceItem) => {
    setSelectedEvidenceForDrawer(evd);
  };

  const closeEvidenceDrawer = () => {
    setSelectedEvidenceForDrawer(null);
  };

  return (
    <MineResponseContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedMine,
        setSelectedMine,
        isOnline,
        toggleOnline,
        quickNavOpen,
        setQuickNavOpen,
        toastMessage,
        showToast,
        inspections,
        activeInspection,
        setActiveInspection,
        checklistItems,
        activeObservation,
        evidenceItems,
        findings,
        activeFinding,
        setActiveFinding,
        responseVersions,
        capaList,
        activeCapa,
        setActiveCapa,
        upcomingInspections,
        auditLog,
        draftResponse,
        updateDraftResponse,
        saveResponseDraft,
        submitOfficialResponse,
        updateCapaProgress,
        escalateOverdueCapa,
        uploadedDocuments,
        uploadMineDocument,
        selectedEvidenceForDrawer,
        openEvidenceDrawer,
        closeEvidenceDrawer,
        isCapaUpdateModalOpen,
        setIsCapaUpdateModalOpen,
        isEscalationModalOpen,
        setIsEscalationModalOpen
      }}
    >
      {children}
    </MineResponseContext.Provider>
  );
};

export const useMineResponse = () => {
  const context = useContext(MineResponseContext);
  if (!context) {
    throw new Error('useMineResponse must be used within a MineResponseProvider');
  }
  return context;
};
