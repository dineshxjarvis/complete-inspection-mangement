import {
  InspectorPersonnel,
  ScheduledInspectionAssignment,
  AssignmentHistoryEvent
} from '../types/assignment';

export const INITIAL_PERSONNEL: InspectorPersonnel[] = [
  {
    id: "PER-0901",
    name: "R. Sharma",
    avatar: "RS",
    designation: "First Class Mine Manager & Safety Officer",
    department: "Safety & Strata Control Cell",
    organization: "Coal India Limited (CIL)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    area: "Area 01 (Sripur-Kenda)",
    systemRole: "Field Inspector",
    currentInspectionRole: "Lead Inspector",
    competencies: ["Safety", "Ventilation", "Emergency Response", "Strata Control"],
    authorizations: ["Inspection Execution", "Ventilation Inspection", "DGMS Statutory Liaison"],
    scope: {
      holding: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      authorizedMines: ["Mine A2 (Deep Underground Seam VII)", "Mine B1 (Inclined Mine)", "Mine C4 (Opencast Pit 2)"]
    },
    availability: {
      status: "Available",
      availableSlots: ["09:00 - 17:00 IST (Shift A & B)"]
    },
    workload: {
      activeInspections: 2,
      upcomingInspections: 3,
      overdueAssignments: 0
    },
    certifications: [
      { name: "First Class Mine Manager Certificate of Competency (Coal)", certificateNo: "DGMS-FCM-8821", validUntil: "2032-12-31", status: "Valid" },
      { name: "Gas Testing Certificate (CH4 / CO / O2)", certificateNo: "DGMS-GT-4019", validUntil: "2028-06-30", status: "Valid" }
    ],
    history: [
      { inspectionId: "INS-2026-0870", date: "2026-08-29", role: "Lead Inspector", mine: "Mine A2", outcome: "In Progress (Live Telemetry)" },
      { inspectionId: "INS-2026-0412", date: "2026-05-18", role: "Lead Inspector", mine: "Mine A2", outcome: "Completed (3 Findings)" }
    ]
  },
  {
    id: "PER-0902",
    name: "K. Rao",
    avatar: "KR",
    designation: "Executive Mechanical Engineer",
    department: "Colliery Excavation & Main Fan Engineering",
    organization: "Coal India Limited (CIL)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    area: "Area 01 (Sripur-Kenda)",
    systemRole: "Mechanical Engineer",
    currentInspectionRole: "Mechanical Specialist",
    competencies: ["Mechanical", "Main Mechanical Ventilation Fans", "Haulage Systems"],
    authorizations: ["Specialist Participation", "Machinery Audit"],
    scope: {
      holding: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      authorizedMines: ["Mine A2 (Deep Underground Seam VII)", "Mine B1 (Inclined Mine)"]
    },
    availability: {
      status: "Available",
      availableSlots: ["All Day (08:00 - 18:00 IST)"]
    },
    workload: {
      activeInspections: 1,
      upcomingInspections: 2,
      overdueAssignments: 0
    },
    certifications: [
      { name: "Chartered Mechanical Engineer (Mines)", certificateNo: "IEI-MECH-9021", validUntil: "2030-04-15", status: "Valid" }
    ],
    history: [
      { inspectionId: "INS-2026-0650", date: "2026-07-12", role: "Mechanical Specialist", mine: "Mine B1", outcome: "Satisfactory" }
    ]
  },
  {
    id: "PER-0903",
    name: "K. Sen",
    avatar: "KS",
    designation: "Senior Electrical Inspector",
    department: "Electrical Safety Directorate",
    organization: "Coal India Limited (CIL)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    area: "Area 01 (Sripur-Kenda)",
    systemRole: "Electrical Supervisor",
    currentInspectionRole: "Electrical Specialist",
    competencies: ["Electrical", "Flameproof Enclosures (FLP)", "Intrinsically Safe Circuits", "Earth Leakage Protection"],
    authorizations: ["Inspection Execution", "High Voltage FLP Audit", "Specialist Participation"],
    scope: {
      holding: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      authorizedMines: ["Mine A2 (Deep Underground Seam VII)", "Mine B1 (Inclined Mine)", "Mine C4 (Opencast Pit 2)"]
    },
    availability: {
      status: "Available",
      availableSlots: ["10:00 - 16:00 IST"]
    },
    workload: {
      activeInspections: 1,
      upcomingInspections: 1,
      overdueAssignments: 0
    },
    certifications: [
      { name: "DGMS Electrical Supervisor Competency Certificate", certificateNo: "DGMS-ELEC-3312", validUntil: "2029-09-20", status: "Valid" }
    ],
    history: [
      { inspectionId: "INS-2026-0782", date: "2026-07-15", role: "Lead Inspector", mine: "Mine A2", outcome: "Satisfactory (Digitally Signed)" }
    ]
  },
  {
    id: "PER-0904",
    name: "P. Mukhopadhyay",
    avatar: "PM",
    designation: "Strata Control & Rock Mechanics Specialist",
    department: "Geo-technical & Mine Planning Division",
    organization: "Coal India Limited (CIL)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    area: "Area 01 (Sripur-Kenda)",
    systemRole: "Field Inspector",
    currentInspectionRole: "Strata Specialist",
    competencies: ["Strata Control", "Rock Mechanics", "SCAMP Verification"],
    authorizations: ["Specialist Participation", "Geo-technical Audit"],
    scope: {
      holding: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      authorizedMines: ["Mine A2 (Deep Underground Seam VII)"]
    },
    availability: {
      status: "Assigned",
      availableSlots: ["Busy in Field on INS-2026-0870 until 14:30"]
    },
    workload: {
      activeInspections: 3,
      upcomingInspections: 2,
      overdueAssignments: 0
    },
    certifications: [
      { name: "Rock Mechanics & SCAMP Certified Auditor", certificateNo: "CIL-STRATA-771", validUntil: "2028-11-10", status: "Valid" }
    ],
    history: [
      { inspectionId: "INS-2026-0870", date: "2026-08-29", role: "Specialist", mine: "Mine A2", outcome: "In Progress" }
    ]
  },
  {
    id: "PER-0905",
    name: "A. Kumar",
    avatar: "AK",
    designation: "Assistant Mine Safety Inspector",
    department: "Internal Safety Directorate",
    organization: "Coal India Limited (CIL)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    area: "Area 01 (Sripur-Kenda)",
    systemRole: "Field Inspector",
    currentInspectionRole: "Supporting Inspector",
    competencies: ["Safety", "Ventilation Sampling", "Dust Monitoring"],
    authorizations: ["Inspection Execution", "Supporting Inspector"],
    scope: {
      holding: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      authorizedMines: ["Mine A2 (Deep Underground Seam VII)", "Mine B1 (Inclined Mine)"]
    },
    availability: {
      status: "Available",
      availableSlots: ["08:30 - 16:30 IST"]
    },
    workload: {
      activeInspections: 1,
      upcomingInspections: 1,
      overdueAssignments: 0
    },
    certifications: [
      { name: "Second Class Mine Manager Certificate", certificateNo: "DGMS-SCM-1102", validUntil: "2031-01-15", status: "Valid" }
    ],
    history: []
  },
  {
    id: "PER-0906",
    name: "V. Sharma",
    avatar: "VS",
    designation: "Environmental & Dust Sampling Officer",
    department: "Mine Environment Division",
    organization: "Coal India Limited (CIL)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    area: "Area 02 (Salanpur)",
    systemRole: "Environmental Officer",
    currentInspectionRole: "Environmental Specialist",
    competencies: ["Environmental", "Dust Sampling", "Gas Chromatography"],
    authorizations: ["Specialist Participation"],
    scope: {
      holding: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 02 (Salanpur)",
      authorizedMines: ["Mine S1 (Dabur Colliery)", "Mine S2 (Bonjemehari OC)"]
    },
    availability: {
      status: "Available",
      availableSlots: ["All Day"]
    },
    workload: {
      activeInspections: 0,
      upcomingInspections: 1,
      overdueAssignments: 0
    },
    certifications: [
      { name: "Environmental Pollution Control Auditor", certificateNo: "CPCB-ENV-449", validUntil: "2027-05-30", status: "Valid" }
    ],
    conflicts: [
      { reason: "Outside Area 01 Scope (Authorized in Area 02 Salanpur)", conflictingInspectionId: "N/A", time: "Scope Mismatch" }
    ],
    history: []
  },
  {
    id: "PER-0907",
    name: "D. Roy",
    avatar: "DR",
    designation: "Underground Mining Sirdar / Safety Inspector",
    department: "Safety & Rescue Cell",
    organization: "Coal India Limited (CIL)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    area: "Area 01 (Sripur-Kenda)",
    systemRole: "Field Inspector",
    currentInspectionRole: "Supporting Inspector",
    competencies: ["Safety", "Mine Rescue", "Gas Testing"],
    authorizations: ["Inspection Execution", "Supporting Inspector"],
    scope: {
      holding: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      authorizedMines: ["Mine A2 (Deep Underground Seam VII)"]
    },
    availability: {
      status: "Unavailable",
      availableSlots: ["Underground on Active Shift"]
    },
    workload: {
      activeInspections: 2,
      upcomingInspections: 2,
      overdueAssignments: 0
    },
    certifications: [
      { name: "Overman Competency Certificate (Coal)", certificateNo: "DGMS-OVM-7712", validUntil: "2030-08-10", status: "Valid" }
    ],
    history: []
  }
];

export const INITIAL_SCHEDULED_INSPECTIONS: ScheduledInspectionAssignment[] = [
  {
    id: "INS-2026-0882",
    planId: "PLAN-2026-0088",
    recommendationId: "REC-2026-0048",
    mine: "Mine A2 (Deep Underground Seam VII)",
    area: "Area 01 (Sripur-Kenda)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    holding: "Coal India Limited (CIL)",
    inspectionType: "Ventilation & Gas Dynamics Inspection",
    track: "Safety & Occupational Health",
    authority: "Internal Governance & DGMS Statutory Safety Board",
    risk: "High",
    scheduledDate: "15 Nov 2026",
    scheduledTime: "10:30 – 14:30 IST",
    shift: "Morning Shift A",
    location: "Intake Shaft 1, Splitting Points 1-6, District 3 & 4 Face, Main Exhaust Fan Drift",
    objective: "Verify statutory quarterly mechanical ventilation network survey, measure air velocity in splits, calibrate water gauge pressure depression, and audit CH4/CO sensor readings per CMR 2017 Regulation 153.",
    status: "Unassigned",
    requiredTeam: {
      leadInspectorCount: 1,
      supportingCount: 1,
      specialistsRequired: ["Safety Specialist", "Mechanical Specialist"],
      competencyList: ["Safety", "Ventilation"]
    },
    assignedTeam: {
      leadInspector: undefined,
      supportingInspectors: [],
      specialists: []
    },
    preparation: {
      instruments: ["Digital Vane Anemometer (Calibrated)", "Smoke Tube Kit with Aspirator", "Digital Multi-Gas Detector (CH4, CO, CO2, O2)", "Inclined Manometer"],
      ppe: ["Self-Contained Self-Rescuer (SCSR 60-min IS rated)", "Cap Lamp (Intrinsically Safe Group I)", "Antistatic Boots (IS 15298)", "Mining Helmet with Chinstrap"],
      documents: ["Mine Ventilation Plan & Airway Network Diagram v4.2", "Daily Gas Book Register", "Fan Drift Water Gauge Logs (Past 30 Days)"],
      siteNotes: ["Shaft priority cage arranged with winding engineman.", "Ventilation Officer must accompany audit team."]
    },
    previousContext: {
      findingsCount: 3,
      openCapaCount: 1,
      repeatIssue: "Inadequate return airway air velocity in Split 4 (<0.3 m/s)",
      lastInspectionDate: "18 May 2026"
    },
    checklistChecksCount: 22,
    checklistSample: [
      "Measure static pressure depression at fan drift water gauge",
      "Verify air quantity entering main intake airway at shaft bottom (m3/min)",
      "Conduct 10-point traverse anemometer survey in Return Split 4",
      "Sample inflammable gas (CH4) concentration at 30cm from roof in dead ends",
      "Inspect condition of air crossing and ventilation doors at Junction J-12"
    ],
    acceptance: {
      totalRequired: 2,
      acceptedCount: 0,
      declinedCount: 0,
      statusText: "Awaiting Assignment"
    }
  },
  {
    id: "INS-2026-0885",
    planId: "PLAN-2026-0079",
    recommendationId: "REC-2026-0039",
    mine: "Mine B1 (Inclined Mine)",
    area: "Area 01 (Sripur-Kenda)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    holding: "Coal India Limited (CIL)",
    inspectionType: "Flameproof Electrical Compliance Audit",
    track: "Electrical & Machinery",
    authority: "Internal Electrical Safety Directorate",
    risk: "High",
    scheduledDate: "16 Nov 2026",
    scheduledTime: "10:00 – 14:00 IST",
    shift: "Morning Shift A",
    location: "Main Underground Substation 2 & Pumping Drives",
    objective: "Statutory FLP flange gap tolerance testing, trailing cable inspection, and 20ms earth leakage relay tripping verification.",
    status: "Partially Assigned",
    requiredTeam: {
      leadInspectorCount: 1,
      supportingCount: 0,
      specialistsRequired: ["Electrical Specialist"],
      competencyList: ["Electrical", "Flameproof Enclosures (FLP)"]
    },
    assignedTeam: {
      leadInspector: INITIAL_PERSONNEL[2], // K. Sen
      supportingInspectors: [],
      specialists: []
    },
    preparation: {
      instruments: ["Feeler Gauge Set", "5kV Megger", "Earth Loop Impedance Meter"],
      ppe: ["Arc Flash Safety Kit", "1000V Insulated Gloves", "Mining Helmet"],
      documents: ["Earth Leakage Test Register", "Substation Single Line Diagram"],
      siteNotes: ["Power shutdown of Substation Section 2 for 45 mins arranged."]
    },
    previousContext: {
      findingsCount: 1,
      openCapaCount: 0,
      repeatIssue: "Gland packing bolt torque relaxation on 45kW pump terminal box",
      lastInspectionDate: "01 Aug 2026"
    },
    checklistChecksCount: 16,
    checklistSample: [
      "Measure maximum flameproof gap on transwitch enclosure flanges (limit <= 0.50mm)",
      "Test micro-processor Earth Leakage Relay trip response time (< 20ms required)",
      "Check trailing cable rubber bushing compression seal"
    ],
    acceptance: {
      totalRequired: 2,
      acceptedCount: 1,
      declinedCount: 0,
      statusText: "1/2 Accepted"
    }
  },
  {
    id: "INS-2026-0890",
    planId: "PLAN-2026-0092",
    recommendationId: "REC-2026-0033",
    mine: "Mine C4 (Opencast Pit 2)",
    area: "Area 01 (Sripur-Kenda)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    holding: "Coal India Limited (CIL)",
    inspectionType: "Inundation & Water Hazard Survey",
    track: "Emergency Preparedness",
    authority: "DGMS / Internal Safety Directorate",
    risk: "Medium",
    scheduledDate: "17 Nov 2026",
    scheduledTime: "09:00 – 13:00 IST",
    shift: "General Day Shift",
    location: "South Sump & Highwall Barrier Boundary",
    objective: "Verify pit storm water retention capacity, bund height stability, and highwall proximity to old submerged underground workings.",
    status: "Unassigned",
    requiredTeam: {
      leadInspectorCount: 1,
      supportingCount: 1,
      specialistsRequired: ["Survey Specialist"],
      competencyList: ["Safety", "Emergency Response"]
    },
    assignedTeam: {
      leadInspector: undefined,
      supportingInspectors: [],
      specialists: []
    },
    preparation: {
      instruments: ["Laser Rangefinder", "Ultrasonic Flow Meter"],
      ppe: ["High-Vis Vest", "Waterproof Safety Boots", "Safety Helmet"],
      documents: ["Water Danger Plan", "Pumping Capacity Matrix"],
      siteNotes: ["Surveyor to provide marked boundary map."]
    },
    previousContext: {
      findingsCount: 0,
      openCapaCount: 0,
      repeatIssue: "None",
      lastInspectionDate: "14 Sep 2025"
    },
    checklistChecksCount: 14,
    checklistSample: [
      "Inspect pit perimeter bund height and storm water diversion trench",
      "Check operational readiness of 500 GPM dewatering pumps"
    ],
    acceptance: {
      totalRequired: 2,
      acceptedCount: 0,
      declinedCount: 0,
      statusText: "Awaiting Assignment"
    }
  },
  {
    id: "INS-2026-0870",
    planId: "PLAN-2026-0081",
    recommendationId: "REC-2026-0041",
    mine: "Mine A2 (Deep Underground Seam VII)",
    area: "Area 01 (Sripur-Kenda)",
    subsidiary: "Eastern Coalfields Limited (ECL)",
    holding: "Coal India Limited (CIL)",
    inspectionType: "Strata Control & Roof Support Audit",
    track: "Strata Control & Geo-technical",
    authority: "Internal Governance",
    risk: "High",
    scheduledDate: "29 Aug 2026",
    scheduledTime: "08:30 – 14:30 IST",
    shift: "Morning Shift A",
    location: "District 2 South Panel S3 & Junction J-14",
    objective: "Hydraulic roof bolt pull tension testing and telltale convergence sensor calibration.",
    status: "Assigned",
    requiredTeam: {
      leadInspectorCount: 1,
      supportingCount: 1,
      specialistsRequired: ["Strata Specialist"],
      competencyList: ["Safety", "Strata Control"]
    },
    assignedTeam: {
      leadInspector: INITIAL_PERSONNEL[0], // R. Sharma
      supportingInspectors: [INITIAL_PERSONNEL[6]], // D. Roy
      specialists: [{ person: INITIAL_PERSONNEL[3], inspectionRole: "Strata Specialist" }] // P. Mukhopadhyay
    },
    preparation: {
      instruments: ["Hydraulic Pull Tester (0-20T)", "Optical Telltale Reader"],
      ppe: ["Mining Helmet Anti-Impact", "SCSR", "Safety Footwear"],
      documents: ["Approved SCAMP Plan", "Roof Bolting Log Book"],
      siteNotes: ["Active depillaring ongoing."]
    },
    previousContext: {
      findingsCount: 2,
      openCapaCount: 1,
      repeatIssue: "Anchorage pull load failure (<8 tonnes)",
      lastInspectionDate: "04 Jul 2026"
    },
    checklistChecksCount: 18,
    checklistSample: ["Pull test 5 roof bolts to 10T", "Inspect telltale #09 displacement reading"],
    acceptance: {
      totalRequired: 3,
      acceptedCount: 3,
      declinedCount: 0,
      statusText: "All Accepted (In Field)"
    }
  }
];

export const INITIAL_ASSIGNMENT_HISTORY: AssignmentHistoryEvent[] = [
  {
    id: "EVT-8812",
    timestamp: "15 Nov 09:12",
    inspectionId: "INS-2026-0882",
    personName: "R. Sharma",
    inspectionRole: "Lead Inspector",
    action: "Assigned",
    previousPerson: "—",
    newPerson: "R. Sharma",
    reason: "STRATA eligibility recommendation selected by Inspection Manager",
    changedBy: "S. K. Mukherjee (Inspection Manager)"
  },
  {
    id: "EVT-8813",
    timestamp: "15 Nov 09:42",
    inspectionId: "INS-2026-0882",
    personName: "K. Rao",
    inspectionRole: "Mechanical Specialist",
    action: "Added",
    previousPerson: "—",
    newPerson: "K. Rao",
    reason: "Added as specialist for main ventilation fan drift audit",
    changedBy: "S. K. Mukherjee (Inspection Manager)"
  },
  {
    id: "EVT-8810",
    timestamp: "14 Nov 16:20",
    inspectionId: "INS-2026-0885",
    personName: "K. Sen",
    inspectionRole: "Lead Inspector",
    action: "Assigned",
    previousPerson: "—",
    newPerson: "K. Sen",
    reason: "Certified DGMS Electrical Inspector assigned to FLP audit",
    changedBy: "S. K. Mukherjee (Inspection Manager)"
  },
  {
    id: "EVT-8805",
    timestamp: "14 Nov 11:30",
    inspectionId: "INS-2026-0880",
    personName: "A. Kumar",
    inspectionRole: "Lead Inspector",
    action: "Reassigned",
    previousPerson: "R. Sharma",
    newPerson: "A. Kumar",
    reason: "Original inspector unavailable due to emergency DGMS enquiry",
    changedBy: "S. K. Mukherjee (Inspection Manager)"
  }
];
