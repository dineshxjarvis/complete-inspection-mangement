// STRATA Enterprise Coal-Mining Inspection Governance Platform - Master Data Repository
// Authority -> Track -> Inspection Type -> Organizational Scope -> Status -> Auditability

const STRATA_DATA = {
  // Global metadata
  meta: {
    currentUser: {
      name: "S. K. Mukherjee",
      role: "Authorized Inspection Manager",
      designation: "General Manager (Safety & Governance)",
      department: "Safety & Rescue Division",
      authority: "Internal Governance / DGMS Statutory Liaison",
      badgeId: "STRATA-GOV-9042",
      permissions: ["PLAN_CREATE", "PLAN_EDIT", "RECOMMENDATION_REVIEW", "SCHEDULE_INSPECTION", "MONITOR_ACTIVE", "VIEW_AUDIT"],
      avatar: "SM"
    },
    systemTime: "2026-08-29T10:45:00+05:30",
    activeScope: {
      holding: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      mine: "Mine A2 (Deep Underground Seam VII)"
    }
  },

  // Organizational hierarchy for scope selector
  hierarchy: {
    "Coal India Limited (CIL)": {
      "Eastern Coalfields Limited (ECL)": {
        "Area 01 (Sripur-Kenda)": ["Mine A2 (Deep Underground Seam VII)", "Mine B1 (Inclined Mine)", "Mine C4 (Opencast Pit 2)"],
        "Area 02 (Salanpur)": ["Mine S1 (Dabur Colliery)", "Mine S2 (Bonjemehari OC)"],
        "Area 03 (Kajora)": ["Mine K1 (Central Kajora)", "Mine K2 (Madhabpur UG)"]
      },
      "Bharat Coking Coal Limited (BCCL)": {
        "Katras Area": ["Mine KT-1 (Salboni Coking)", "Mine KT-2 (Gaslitand Colliery)"],
        "Kusunda Area": ["Mine KS-1 (Gondudih Khas Kusunda OC)", "Mine KS-2 (Godhur Colliery)"]
      },
      "Central Coalfields Limited (CCL)": {
        "Barka-Sayal Area": ["Mine BS-1 (Sayal D Underground)", "Mine BS-2 (Saunda D Colliery)"],
        "Argada Area": ["Mine AR-1 (Sirka Underground)"]
      },
      "South Eastern Coalfields Limited (SECL)": {
        "Korba Area": ["Mine KB-1 (Manikpur OC)", "Mine KB-2 (Surakachhar UG)"]
      }
    }
  },

  // Regulatory Basis Repository (DGMS Coal Mines Regulations 2017 & Mines Act 1952)
  regulations: [
    {
      id: "OBL-088",
      regulation: "Coal Mines Regulations (CMR) 2017",
      clause: "Regulation 153(2) & 160",
      requirement: "Statutory Quarterly Main Mechanical Ventilation & Airway Velocity Survey",
      applicability: "All Degree-II and Degree-III Gassy Underground Coal Mines",
      obligation: "Periodic statutory measurement of air quantity at bottom of downcast, intake splits, return airways and active working faces. Fan drift static pressure differential calibration.",
      frequency: "Quarterly (Every 90 Days)",
      authority: "DGMS / Internal Safety Directorate",
      track: "Safety & Occupational Health",
      inspectionType: "Ventilation & Gas Dynamics Inspection"
    },
    {
      id: "OBL-104",
      regulation: "Coal Mines Regulations (CMR) 2017",
      clause: "Regulation 123 & 124",
      requirement: "Strata Control & Support Management Plan (SCAMP) Audit",
      applicability: "Underground Bord & Pillar and Longwall Workings",
      obligation: "Verification of roof bolt resin anchoring tension testing, telltale convergence meters, and systematic support rule adherence in active depillaring districts.",
      frequency: "Bi-monthly (Every 60 Days)",
      authority: "Internal Governance",
      track: "Strata Control & Geo-technical",
      inspectionType: "Roof & Support Structural Audit"
    },
    {
      id: "OBL-062",
      regulation: "Central Electricity Authority (Measures relating to Safety and Electric Supply) Reg 2010",
      clause: "Regulation 102 & 107 (Flameproof Apparatus)",
      requirement: "Underground Flameproof (FLP) & Intrinsically Safe (IS) Electrical Audit",
      applicability: "All Gassy Underground Mines & Sub-stations",
      obligation: "Verification of FLP enclosure gap tolerances, earth leakage relays tripping within 20ms, trailing cable integrity, and insulation resistance logs.",
      frequency: "Monthly",
      authority: "Internal Electrical Safety",
      track: "Electrical & Machinery",
      inspectionType: "Flameproof Electrical Compliance Audit"
    },
    {
      id: "OBL-219",
      regulation: "Mines Act 1952 - Section 22A & CMR 2017 Reg 148",
      clause: "Regulation 148(4)",
      requirement: "Inundation Prevention & Water Danger Barrier Inspection",
      applicability: "Mines with waterlogged workings within 60 meters barrier",
      obligation: "Physical inspection of water dams, advance boring logs, borehole water discharge meters, and emergency evacuation de-watering pump availability.",
      frequency: "Pre-Monsoon Statutory (Annual/Bi-annual)",
      authority: "DGMS / Internal Governance",
      track: "Emergency Preparedness",
      inspectionType: "Inundation & Water Hazard Survey"
    }
  ],

  // SCREEN 02 / 03: Inspection Intake Requests
  intakeRequests: [
    {
      id: "REQ-2026-0098",
      source: "Mine Management",
      sourceType: "Mine Management",
      requester: "R. K. Agarwal",
      designation: "Colliery Mine Agent",
      contact: "agent.mineA2@ecl.coalindia.in | +91 94340 88219",
      inspectionTrack: "Safety & Strata Control",
      inspectionType: "Strata Control & Roof Support Urgent Inspection",
      scope: {
        holding: "Coal India Limited (CIL)",
        subsidiary: "Eastern Coalfields Limited (ECL)",
        area: "Area 01 (Sripur-Kenda)",
        mine: "Mine A2 (Deep Underground Seam VII)",
        location: "District 3 West Depillaring Section, Panels W4-W6"
      },
      reason: "Abnormal telltale roof convergence detected (14mm in 48h) following heavy blasting in adjacent panel.",
      description: "Sub-surface strata monitoring stations have signaled accelerated displacement in junction J-14. Immediate statutory technical audit requested prior to resuming coal extraction.",
      priority: "High",
      risk: "High",
      requestedDate: "2026-08-30",
      received: "2026-08-29 08:30",
      status: "New",
      supportingInfo: "Strata displacement telemetry log attached with convergence curve over past 7 days.",
      attachments: [
        { name: "telemetry_convergence_panelW4.pdf", size: "2.4 MB", type: "PDF" },
        { name: "junction_J14_extensometer_photo.jpg", size: "4.1 MB", type: "Image" }
      ],
      timeline: [
        { step: "Request Created", date: "2026-08-29 08:30", by: "R. K. Agarwal (Mine Agent)", done: true, current: false },
        { step: "Received in STRATA", date: "2026-08-29 08:31", by: "System Auto-Intake", done: true, current: true },
        { step: "Under Review", date: "Pending", by: "Inspection Manager", done: false, current: false },
        { step: "Accept / Reject Decision", date: "Pending", by: "Governance Authority", done: false, current: false },
        { step: "Recommendation Creation", date: "Pending", by: "System / Manager", done: false, current: false },
        { step: "Inspection Plan", date: "Pending", by: "Planning Cell", done: false, current: false }
      ]
    },
    {
      id: "REQ-2026-0099",
      source: "Compliance Engine",
      sourceType: "Compliance",
      requester: "STRATA Auto-Compliance Engine",
      designation: "Regulatory Tracking Daemon v4.2",
      contact: "compliance.daemon@strata.internal",
      inspectionTrack: "Ventilation & Environment",
      inspectionType: "Ventilation & Gas Dynamics Inspection",
      scope: {
        holding: "Coal India Limited (CIL)",
        subsidiary: "Eastern Coalfields Limited (ECL)",
        area: "Area 01 (Sripur-Kenda)",
        mine: "Mine B1 (Inclined Mine)",
        location: "Main Return Fan Drift & No. 2 Intake Shaft"
      },
      reason: "Periodic obligation OBL-088 due in 6 days (CMR 2017 Reg 153)",
      description: "Automated trigger for quarterly ventilation pressure and CH4/CO gas dynamic validation in accordance with DGMS circular standards.",
      priority: "High",
      risk: "Medium",
      requestedDate: "2026-09-02",
      received: "2026-08-29 06:00",
      status: "Accepted",
      supportingInfo: "Triggered from Statutory Calendar. Last surveyed 84 days ago.",
      attachments: [
        { name: "quarterly_ventilation_summary_Q2.pdf", size: "1.8 MB", type: "PDF" }
      ],
      timeline: [
        { step: "Request Created", date: "2026-08-29 06:00", by: "STRATA Engine", done: true, current: false },
        { step: "Received in STRATA", date: "2026-08-29 06:00", by: "System Auto-Intake", done: true, current: false },
        { step: "Under Review", date: "2026-08-29 07:15", by: "S. K. Mukherjee", done: true, current: false },
        { step: "Accepted", date: "2026-08-29 07:45", by: "S. K. Mukherjee", done: true, current: true },
        { step: "Recommendation Creation", date: "2026-08-29 07:45", by: "Auto-forwarded to REC Queue", done: true, current: false },
        { step: "Inspection Plan", date: "Pending", by: "Planning Cell", done: false, current: false }
      ]
    },
    {
      id: "REQ-2026-0102",
      source: "Senior Authority",
      sourceType: "Senior Authority",
      requester: "Dr. P. N. Banerjee",
      designation: "Deputy Director General of Mines Safety (DGMS)",
      contact: "ddg.eastern@dgms.gov.in | +91 326 220 5511",
      inspectionTrack: "Electrical & Machinery",
      inspectionType: "Flameproof Electrical Compliance Audit",
      scope: {
        holding: "Coal India Limited (CIL)",
        subsidiary: "Eastern Coalfields Limited (ECL)",
        area: "Area 01 (Sripur-Kenda)",
        mine: "Mine A2 (Deep Underground Seam VII)",
        location: "Underground Substation 3 & Haulage Drive Rooms"
      },
      reason: "Joint special audit on heavy earth leakage protection compliance following DGMS Tech Circular 04/2026.",
      description: "Direct mandate to inspect all 3.3kV transwitch units, gate end boxes, and continuous earth monitoring relay response time.",
      priority: "Critical",
      risk: "High",
      requestedDate: "2026-09-05",
      received: "2026-08-28 14:20",
      status: "Converted to Recommendation",
      supportingInfo: "Mandate reference DGMS/SZ/CIRC/2026-E4.",
      attachments: [{ name: "dgms_special_directive_2026.pdf", size: "3.2 MB", type: "PDF" }],
      timeline: [
        { step: "Request Created", date: "2026-08-28 14:20", by: "DGMS Direct Order", done: true, current: false },
        { step: "Received in STRATA", date: "2026-08-28 14:25", by: "Liaison Cell", done: true, current: false },
        { step: "Under Review", date: "2026-08-28 15:00", by: "S. K. Mukherjee", done: true, current: false },
        { step: "Accepted", date: "2026-08-28 15:30", by: "S. K. Mukherjee", done: true, current: false },
        { step: "Converted to Recommendation", date: "2026-08-28 15:35", by: "System", done: true, current: true },
        { step: "Inspection Plan", date: "Pending", by: "Planning Cell", done: false, current: false }
      ]
    },
    {
      id: "REQ-2026-0095",
      source: "Internal Audit",
      sourceType: "Internal",
      requester: "A. Sengupta",
      designation: "Internal Safety Auditor",
      contact: "a.sengupta@ecl.coalindia.in",
      inspectionTrack: "Emergency Preparedness",
      inspectionType: "Inundation & Water Hazard Survey",
      scope: {
        holding: "Coal India Limited (CIL)",
        subsidiary: "Eastern Coalfields Limited (ECL)",
        area: "Area 01 (Sripur-Kenda)",
        mine: "Mine C4 (Opencast Pit 2)",
        location: "South Sump & Highwall Barrier Boundary"
      },
      reason: "Pre-monsoon sump retention capacity verification and perimeter drain embankment audit.",
      description: "Evaluate storm water pump discharge manifold and highwall stability near old abandoned underground water body.",
      priority: "Medium",
      risk: "Medium",
      requestedDate: "2026-09-10",
      received: "2026-08-27 11:10",
      status: "Converted to Plan",
      supportingInfo: "Sump bathymetric survey report dated August 2026.",
      attachments: [{ name: "sump_capacity_matrix.xlsx", size: "850 KB", type: "Spreadsheet" }],
      timeline: [
        { step: "Request Created", date: "2026-08-27 11:10", by: "A. Sengupta", done: true, current: false },
        { step: "Received", date: "2026-08-27 11:12", by: "STRATA", done: true, current: false },
        { step: "Under Review", date: "2026-08-27 14:00", by: "S. K. Mukherjee", done: true, current: false },
        { step: "Accepted", date: "2026-08-27 16:30", by: "S. K. Mukherjee", done: true, current: false },
        { step: "Converted to Recommendation", date: "2026-08-27 16:35", by: "System", done: true, current: false },
        { step: "Converted to Plan", date: "2026-08-28 09:15", by: "PLAN-2026-0092", done: true, current: true }
      ]
    },
    {
      id: "REQ-2026-0091",
      source: "Mine Management",
      sourceType: "Mine Management",
      requester: "V. Sharma",
      designation: "Safety Officer",
      contact: "v.sharma@ecl.coalindia.in",
      inspectionTrack: "Ventilation & Environment",
      inspectionType: "Dust & Airborne Particulate Survey",
      scope: {
        holding: "Coal India Limited (CIL)",
        subsidiary: "Eastern Coalfields Limited (ECL)",
        area: "Area 02 (Salanpur)",
        mine: "Mine S1 (Dabur Colliery)",
        location: "Coal Handling Plant & Crusher House"
      },
      reason: "Routine dust extractor maintenance review.",
      description: "Request for informal dust sampler calibration.",
      priority: "Low",
      risk: "Low",
      requestedDate: "2026-09-18",
      received: "2026-08-26 09:40",
      status: "Rejected",
      supportingInfo: "Does not meet criteria for statutory governance track; delegated to mine level maintenance unit.",
      attachments: [],
      timeline: [
        { step: "Request Created", date: "2026-08-26 09:40", by: "V. Sharma", done: true, current: false },
        { step: "Received", date: "2026-08-26 09:45", by: "STRATA", done: true, current: false },
        { step: "Under Review", date: "2026-08-26 14:00", by: "S. K. Mukherjee", done: true, current: false },
        { step: "Rejected", date: "2026-08-26 16:10", by: "S. K. Mukherjee (Reason: Delegated to Local Colliery Mechanical Dept)", done: true, current: true }
      ]
    }
  ],

  // SCREEN 04 / 05: System-Generated Recommendations Queue
  recommendations: [
    {
      id: "REC-2026-0048",
      inspectionType: "Ventilation & Gas Dynamics Inspection",
      track: "Safety & Occupational Health",
      authority: "DGMS / CIL Statutory Safety Board",
      mine: "Mine A2 (Deep Underground Seam VII)",
      scope: "CIL / ECL / Area 01 / Mine A2 (Seam VII Working Districts)",
      regulatoryBasis: "OBL-088",
      regulation: "Coal Mines Regulations (CMR) 2017",
      clause: "Regulation 153(2) & 160",
      requirement: "Statutory Quarterly Main Mechanical Ventilation & Airway Velocity Survey",
      applicability: "All Degree-II and Degree-III Gassy Underground Coal Mines",
      obligation: "Quarterly statutory air quantity & velocity survey across all splits and return airways",
      frequency: "Quarterly (Every 90 Days)",
      nextDueDate: "15 Nov 2026",
      suggestedDate: "2026-11-15",
      dueDate: "15 Nov 2026",
      risk: "High",
      reasonCategory: "Statutory obligation + Risk Threshold",
      reasonSummary: "Periodic statutory obligation due; Previous critical ventilation finding in District 4; Recurrent CH4 buildup signal.",
      whyRecommended: [
        { signal: "Periodic Obligation Due", detail: "Statutory 90-day cycle elapsed under CMR 2017 Reg 153." },
        { signal: "Previous Critical Finding", detail: "FND-2026-00084 identified return airway air velocity below 0.3 m/s at Splitting point 4." },
        { signal: "Recurring Non-Compliance", detail: "2 previous ventilation telemetry alarms triggered in past 45 days during peak extraction." },
        { signal: "Risk Threshold Exceeded", detail: "Composite gassiness risk score calculated at 84/100 for Seam VII." }
      ],
      previousHistory: {
        lastInspectionId: "INS-2026-0412",
        lastInspectionDate: "2026-05-18",
        findingsCount: 3,
        criticalFindings: "Inadequate air velocity in Return Split 4 (0.22 m/s recorded vs minimum required 0.30 m/s)",
        capaStatus: "CAPA-2026-0089 implemented (Auxiliary fan booster installed, pending statutory re-verification)"
      },
      suggestedConfig: {
        suggestedScope: "Mine A2 - Full Underground Circuit (Intake Shaft 1, Splitting Point 1-6, District 3 & 4 Face, Main Exhaust Fan Drift)",
        suggestedChecklist: "DGMS-STD-VENT-04: Comprehensive Underground Gassy Mine Ventilation Protocol (24 Checks)",
        requiredCompetencies: ["First Class Mine Manager Certificate", "DGMS Certified Ventilation Officer", "Gas Testing Certificate (CH4 / CO / O2)"],
        suggestedDuration: "6 Hours (Full Operational Shift)",
        requiredInstruments: ["Vane Anemometer (Calibrated)", "Smoke Tube Kit", "Digital Multi-Gas Detector (CH4, CO, CO2, O2)", "Inclined Manometer / Barometer", "Velometer"],
        requiredPPE: ["Self-Contained Self-Rescuer (SCSR 60-min)", "Cap Lamp (IS Group I)", "Antistatic Boots (IS 15298)", "Mining Helmet with Chin Strap", "Ear Protection"],
        requiredDocuments: ["Mine Ventilation Plan & Airway Network Diagram v4.2", "Daily Gas Book Register", "Fan Drift Water Gauge Logs (Past 30 Days)"]
      },
      status: "Awaiting Planning",
      isHumanDecisionRequired: true,
      activity: [
        { time: "2026-08-28 02:00", user: "STRATA Statutory Rule Engine", action: "Triggered Recommendation REC-2026-0048 based on OBL-088 due date calculation" },
        { time: "2026-08-28 02:01", user: "STRATA Risk Intelligence Engine", action: "Attached Risk Profile (HIGH) with previous finding correlation FND-2026-00084" }
      ]
    },
    {
      id: "REC-2026-0051",
      inspectionType: "Strata Control & Roof Support Audit",
      track: "Strata Control & Geo-technical",
      authority: "Internal Governance",
      mine: "Mine A2 (Deep Underground Seam VII)",
      scope: "CIL / ECL / Area 01 / Mine A2 (Depillaring District 3 West)",
      regulatoryBasis: "OBL-104",
      regulation: "Coal Mines Regulations (CMR) 2017",
      clause: "Regulation 123 & 124",
      requirement: "Strata Control & Support Management Plan (SCAMP) Audit",
      applicability: "Underground Bord & Pillar Depillaring Sections",
      obligation: "Anchorage pull testing & telltale convergence validation in active depillaring panels",
      frequency: "Bi-monthly (Every 60 Days)",
      nextDueDate: "08 Sep 2026",
      suggestedDate: "2026-09-08",
      dueDate: "08 Sep 2026",
      risk: "High",
      reasonCategory: "Management Request + Telemetry Alarm",
      reasonSummary: "Converted from intake request REQ-2026-0098; Abnormal roof convergence telemetry alarm at Junction J-14.",
      whyRecommended: [
        { signal: "Intake Request Validated", detail: "Originating from Mine Agent request REQ-2026-0098." },
        { signal: "Telemetry Trigger", detail: "14mm convergence over 48h exceeded orange threshold." },
        { signal: "Depillaring Proximity", detail: "Extraction active within 20m of geological fault plane F-2." }
      ],
      previousHistory: {
        lastInspectionId: "INS-2026-0520",
        lastInspectionDate: "2026-07-04",
        findingsCount: 2,
        criticalFindings: "2 out of 10 roof bolts showed anchorage failure below 8 tonnes pull load",
        capaStatus: "CAPA-2026-0112 closed; resin capsule specification updated to fast-setting dual chemical formula."
      },
      suggestedConfig: {
        suggestedScope: "Mine A2 - Depillaring District 3, Panels W4, W5, W6 and Goaf Edge Support Lines",
        suggestedChecklist: "DGMS-STD-STRATA-02: SCAMP Compliance & Hydraulic Support Verification (18 Checks)",
        requiredCompetencies: ["DGMS First/Second Class Manager Certificate", "Strata Control Specialist / Rock Mechanics Engineer"],
        suggestedDuration: "5 Hours",
        requiredInstruments: ["Hydraulic Roof Bolt Pull Tester (0-20 Tonne)", "Digital Optical Telltale Reader", "Ultrasonic Bed Separation Tester"],
        requiredPPE: ["SCSR", "Heavy Duty Anti-Impact Mining Helmet", "Safety Footwear Steel Toe", "High-Visibility FR Overalls"],
        requiredDocuments: ["Approved SCAMP Plan signed by Director Technical", "Roof Bolting Log Book", "Geological Disturbance Cross-sections"]
      },
      status: "Awaiting Planning",
      isHumanDecisionRequired: true,
      activity: [
        { time: "2026-08-29 08:35", user: "S. K. Mukherjee", action: "Converted Intake Request REQ-2026-0098 into Recommendation REC-2026-0051" }
      ]
    },
    {
      id: "REC-2026-0039",
      inspectionType: "Flameproof Electrical Compliance Audit",
      track: "Electrical & Machinery",
      authority: "DGMS / Internal Electrical Safety",
      mine: "Mine B1 (Inclined Mine)",
      scope: "CIL / ECL / Area 01 / Mine B1 (Main Pumping Station & Hauler)",
      regulatoryBasis: "OBL-062",
      regulation: "CEA Regulations 2010 Reg 102 & CMR 2017",
      clause: "Regulation 102 & 107",
      requirement: "Underground Flameproof (FLP) & Intrinsically Safe (IS) Electrical Audit",
      applicability: "Underground Electrical Substations & Motor Drives",
      obligation: "Verification of FLP gap tolerances, earth leakage relay trip times, and trailing cables",
      frequency: "Monthly",
      nextDueDate: "02 Sep 2026",
      suggestedDate: "2026-09-02",
      dueDate: "02 Sep 2026",
      risk: "Medium",
      reasonCategory: "Periodic Statutory Obligation",
      reasonSummary: "Routine monthly electrical flameproof certification cycle.",
      whyRecommended: [
        { signal: "Monthly Statutory Cycle", detail: "Statutory FLP inspection window open." }
      ],
      previousHistory: {
        lastInspectionId: "INS-2026-0610",
        lastInspectionDate: "2026-08-01",
        findingsCount: 1,
        criticalFindings: "Gland packing bolt loose on 45kW pump motor terminal box",
        capaStatus: "Rectified on spot during previous inspection."
      },
      suggestedConfig: {
        suggestedScope: "Mine B1 - Main Pump Room & 3.3kV Substation",
        suggestedChecklist: "DGMS-STD-ELEC-01: Flameproof Apparatus & Earth Leakage Checklist (16 Checks)",
        requiredCompetencies: ["DGMS Certified Mine Electrical Supervisor", "Chartered Electrical Engineer"],
        suggestedDuration: "4 Hours",
        requiredInstruments: ["Feeler Gauge Set (0.05 - 1.0mm)", "5kV Digital Megger (Insulation Tester)", "Earth Resistance Clamp Meter", "Torque Wrench"],
        requiredPPE: ["Arc Flash Gloves (1000V rated)", "Safety Goggles", "Mining Boot with Insulated Soles"],
        requiredDocuments: ["Electrical Earth Leakage Test Register", "FLP Certificate Master Binder"]
      },
      status: "Awaiting Planning",
      isHumanDecisionRequired: true,
      activity: [
        { time: "2026-08-25 00:00", user: "STRATA Scheduler", action: "Generated from monthly schedule template" }
      ]
    },
    {
      id: "REC-2026-0033",
      inspectionType: "Inundation & Water Hazard Survey",
      track: "Emergency Preparedness",
      authority: "DGMS / Internal Safety Directorate",
      mine: "Mine C4 (Opencast Pit 2)",
      scope: "CIL / ECL / Area 01 / Mine C4 (South Boundary Sump)",
      regulatoryBasis: "OBL-219",
      regulation: "CMR 2017 Reg 148(4) & Mines Act 1952",
      clause: "Regulation 148(4)",
      requirement: "Inundation Prevention & Water Danger Barrier Inspection",
      applicability: "Opencast Pit Barrier against Submerged Underground Void",
      obligation: "Physical inspection of water dams, safety bunds, and pumping capacity",
      frequency: "Pre-Monsoon Statutory",
      nextDueDate: "12 Sep 2026",
      suggestedDate: "2026-09-12",
      dueDate: "12 Sep 2026",
      risk: "Medium",
      reasonCategory: "Monsoon Preparedness Mandate",
      reasonSummary: "Annual heavy monsoon storm runoff audit for pit perimeter drain capacity.",
      whyRecommended: [
        { signal: "Seasonal Safety Circular", detail: "DGMS Pre-monsoon directive compliance mandatory." }
      ],
      previousHistory: {
        lastInspectionId: "INS-2025-0914",
        lastInspectionDate: "2025-09-14",
        findingsCount: 0,
        criticalFindings: "None",
        capaStatus: "N/A"
      },
      suggestedConfig: {
        suggestedScope: "Mine C4 - Pit 2 Perimeter Drainage & Highwall Sump",
        suggestedChecklist: "DGMS-STD-WATER-03: Pit Inundation & Sump Pumping Verification (14 Checks)",
        requiredCompetencies: ["DGMS First Class Manager", "Mine Surveyor"],
        suggestedDuration: "4 Hours",
        requiredInstruments: ["Total Station / Laser Rangefinder", "Flow Rate Ultrasonic Meter", "Water Level Gauge"],
        requiredPPE: ["High-Vis Vest", "Safety Helmet", "Waterproof Safety Boots", "Personal Flotation Device near sump"],
        requiredDocuments: ["Water Danger Plan signed by Statutory Surveyor", "Pumping Capacity Matrix"]
      },
      status: "Accepted",
      isHumanDecisionRequired: false,
      activity: [
        { time: "2026-08-27 16:35", user: "S. K. Mukherjee", action: "Accepted and queued for Plan generation" }
      ]
    }
  ],

  // SCREEN 06 / 08: Inspection Plans Repository
  inspectionPlans: [
    {
      id: "PLAN-2026-0088",
      recommendationId: "REC-2026-0048",
      requestId: "REQ-2026-0099",
      inspectionType: "Ventilation & Gas Dynamics Inspection",
      title: "Statutory Q3 Comprehensive Underground Ventilation Audit",
      track: "Safety & Occupational Health",
      authority: "DGMS / CIL Statutory Safety Board",
      organization: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      mine: "Mine A2 (Deep Underground Seam VII)",
      location: "Intake Shaft 1, Splitting Points 1-6, District 3 & 4 Face, Main Exhaust Fan Drift",
      planner: "S. K. Mukherjee (General Manager Safety)",
      createdDate: "2026-08-29 10:14",
      status: "Planned", // Draft, Planned, Ready for Scheduling, Scheduled, Cancelled, Completed
      plannedDate: "2026-11-15",
      plannedDuration: "6 Hours",
      risk: "High",
      purpose: "Execute statutory quarterly ventilation network survey, measure air velocity distribution across active coal faces, test static pressure depression at fan drift, and audit CH4/CO real-time sensor accuracy.",
      objective: "Ensure 100% compliance with CMR 2017 Regulation 153/160, verify adequate air flow in District 4 to prevent any methane stagnation, and certify auxiliary ventilation safety in deep seams.",
      planningNotes: "Priority audit due to historical low air velocity finding in District 4. Coordination required with Colliery Ventilation Officer prior to underground descent.",
      regulatoryBasis: {
        id: "OBL-088",
        regulation: "Coal Mines Regulations (CMR) 2017",
        clause: "Regulation 153(2) & 160",
        requirement: "Statutory Quarterly Main Mechanical Ventilation & Airway Velocity Survey",
        applicability: "All Degree-II and Degree-III Gassy Underground Coal Mines",
        obligation: "Quarterly statutory air quantity & velocity survey across all splits and return airways"
      },
      checklist: {
        templateId: "DGMS-STD-VENT-04",
        name: "DGMS Standard Ventilation & Gas Dynamic Survey Protocol v3.1",
        checksCount: 22,
        measurementRequirements: ["Air velocity (m/s) at 8 airway stations", "CH4 concentration (%) by optical & catalytic detectors", "CO concentration (ppm) at sealings & return", "Relative humidity (%) & wet bulb temperature", "Fan drift water gauge static pressure (mm of WG)"],
        evidenceRequirements: ["Digital timestamped photo of anemometer station reading", "Photo of Fan drift manometer water column", "Signed excerpt of Colliery Daily Ventilation Book"]
      },
      teamRequirements: {
        leadCompetency: "First Class Mine Manager Certificate of Competency (Coal)",
        specialists: ["DGMS Certified Ventilation Officer", "Authorized Gas Testing Specialist"],
        supportingInspectors: ["Assistant Safety Officer (Underground)", "Mine Surveyor Representative"],
        minTeamSize: 3,
        assignmentStatus: "Unassigned (Awaiting Workspace 02 Hand-off)"
      },
      preparation: {
        instruments: ["Vane Anemometer (Calibrated NABL)", "Smoke Tube Kit with Aspirator", "Multi-Gas Detector (CH4, CO, CO2, O2)", "Digital Barometer / Manometer", "Velometer"],
        ppe: ["Self-Contained Self-Rescuer (SCSR 60-min IS rated)", "Cap Lamp (Group I Intrinsically Safe)", "Antistatic Boots (IS 15298)", "Mining Helmet with Chinstrap"],
        documents: ["Mine Ventilation Plan & Airway Network Diagram v4.2", "Daily Gas Book Register", "Fan Drift Water Gauge Logs (Past 30 Days)"],
        siteRequirements: ["Colliery Ventilation Officer to accompany audit team", "Shaft signaling cage priority access arranged with Winding Engineman"]
      },
      scheduleData: {
        scheduledDate: "2026-11-15",
        startTime: "09:00",
        endTime: "15:00",
        location: "Underground Seam VII & Surface Fan Complex",
        conflictDetected: false
      },
      activity: [
        { time: "2026-08-29 10:02", user: "S. K. Mukherjee", action: "Recommendation REC-2026-0048 approved for planning", reason: "Statutory quarterly requirement + risk escalation", prev: "Awaiting Planning", next: "Approved" },
        { time: "2026-08-29 10:14", user: "S. K. Mukherjee", action: "Inspection Plan PLAN-2026-0088 created", reason: "Initial draft generated with CMR 2017 Reg 153 mappings", prev: "—", next: "Draft" },
        { time: "2026-08-29 10:20", user: "S. K. Mukherjee", action: "Scope & underground locations refined", reason: "Added District 4 return airway split per recent telemetry", prev: "District 3 only", next: "District 3 & 4 Face + Fan Drift" },
        { time: "2026-08-29 10:31", user: "S. K. Mukherjee", action: "Checklist template attached", reason: "Standard protocol DGMS-STD-VENT-04 selected", prev: "None", next: "DGMS-STD-VENT-04 (22 checks)" },
        { time: "2026-08-29 10:45", user: "S. K. Mukherjee", action: "Plan finalized and marked ready for scheduling", reason: "All 6 validation gates verified", prev: "Draft", next: "Planned" }
      ],
      versions: [
        { version: "v1.0", date: "2026-08-29 10:14", user: "S. K. Mukherjee", note: "Initial plan generation from recommendation" },
        { version: "v1.1", date: "2026-08-29 10:31", user: "S. K. Mukherjee", note: "Integrated 22-point ventilation checklist & instrument calibration rules" },
        { version: "v1.2 (Active)", date: "2026-08-29 10:45", user: "S. K. Mukherjee", note: "Finalized competency criteria & safety gear requirements" }
      ]
    },
    {
      id: "PLAN-2026-0092",
      recommendationId: "REC-2026-0033",
      requestId: "REQ-2026-0095",
      inspectionType: "Inundation & Water Hazard Survey",
      title: "Pre-Monsoon Opencast Pit Sump & Highwall Safety Audit",
      track: "Emergency Preparedness",
      authority: "DGMS / Internal Safety Directorate",
      organization: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      mine: "Mine C4 (Opencast Pit 2)",
      location: "South Sump & Highwall Barrier Boundary",
      planner: "A. Sengupta (Safety Auditor)",
      createdDate: "2026-08-28 09:15",
      status: "Ready for Scheduling",
      plannedDate: "2026-09-12",
      plannedDuration: "4 Hours",
      risk: "Medium",
      purpose: "Inspect opencast pit perimeter drainage, sump pumping capacity, and highwall structural integrity against old waterlogged workings.",
      objective: "Ensure no storm water ingress risk exists during heavy monsoon cycles.",
      planningNotes: "Coordinate with Mine Surveyor for boundary check.",
      regulatoryBasis: {
        id: "OBL-219",
        regulation: "CMR 2017 Reg 148(4) & Mines Act 1952",
        clause: "Regulation 148(4)",
        requirement: "Inundation Prevention & Water Danger Barrier Inspection",
        applicability: "Opencast Pit Barrier against Submerged Underground Void",
        obligation: "Physical inspection of water dams, safety bunds, and pumping capacity"
      },
      checklist: {
        templateId: "DGMS-STD-WATER-03",
        name: "Pit Inundation & Sump Pumping Verification (14 Checks)",
        checksCount: 14,
        measurementRequirements: ["Sump storage volume (cubic meters)", "Total pump discharge head & GPM", "Perimeter bund height (meters)"],
        evidenceRequirements: ["Sump water level marker photo", "Discharge pipe outlet flow photo"]
      },
      teamRequirements: {
        leadCompetency: "DGMS First Class Manager Certificate",
        specialists: ["Statutory Mine Surveyor", "Mechanical Engineer (Pumping)"],
        supportingInspectors: ["Safety Inspector"],
        minTeamSize: 2,
        assignmentStatus: "Unassigned"
      },
      preparation: {
        instruments: ["Laser Rangefinder", "Ultrasonic Flow Meter"],
        ppe: ["High-Vis Vest", "Safety Helmet", "Waterproof Boots"],
        documents: ["Water Danger Plan", "Pumping Log Book"],
        siteRequirements: ["Surveyor to provide marked boundary map"]
      },
      scheduleData: null,
      activity: [
        { time: "2026-08-28 09:15", user: "A. Sengupta", action: "Plan created from REC-2026-0033", reason: "Pre-monsoon obligation", prev: "—", next: "Ready for Scheduling" }
      ],
      versions: [{ version: "v1.0", date: "2026-08-28 09:15", user: "A. Sengupta", note: "Baseline creation" }]
    },
    {
      id: "PLAN-2026-0079",
      recommendationId: "REC-2026-0022",
      requestId: "REQ-2026-0074",
      inspectionType: "Flameproof Electrical Compliance Audit",
      title: "Monthly Underground Substation & FLP Integrity Audit",
      track: "Electrical & Machinery",
      authority: "Internal Electrical Safety",
      organization: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      mine: "Mine B1 (Inclined Mine)",
      location: "Main Pumping Substation 2",
      planner: "S. K. Mukherjee",
      createdDate: "2026-08-24 11:30",
      status: "Scheduled",
      plannedDate: "2026-09-02",
      plannedDuration: "4 Hours",
      risk: "Medium",
      purpose: "Inspect FLP switchgear gap tolerances and earth leakage protection circuits.",
      objective: "Prevent underground ignition hazard from electrical sparking or insulation breakdown.",
      planningNotes: "Power shutdown of Section 2 sub required for 45 minutes during relay tripping test.",
      regulatoryBasis: {
        id: "OBL-062",
        regulation: "CEA Reg 2010 Reg 102 & CMR 2017",
        clause: "Regulation 102 & 107",
        requirement: "Underground Flameproof (FLP) & Intrinsically Safe (IS) Electrical Audit",
        applicability: "Underground Electrical Substations & Motor Drives",
        obligation: "Verification of FLP gap tolerances, earth leakage relay trip times"
      },
      checklist: {
        templateId: "DGMS-STD-ELEC-01",
        name: "Flameproof Apparatus & Earth Leakage Checklist (16 Checks)",
        checksCount: 16,
        measurementRequirements: ["Flameproof flange gap (mm)", "Earth loop impedance (ohms)", "Relay trip time (ms)"],
        evidenceRequirements: ["Feeler gauge gap measurement photo", "Earth test meter display photo"]
      },
      teamRequirements: {
        leadCompetency: "DGMS Mine Electrical Supervisor Certificate",
        specialists: ["Electrical Safety Specialist"],
        supportingInspectors: ["Electrician Grade 1"],
        minTeamSize: 2,
        assignmentStatus: "Assigned (Lead: K. Sen)"
      },
      preparation: {
        instruments: ["Feeler Gauges", "5kV Megger", "Earth Resistance Meter"],
        ppe: ["Arc Flash PPE", "Insulated Gloves 1000V", "Cap Lamp"],
        documents: ["Substation Schematic", "Earth Resistance Log"],
        siteRequirements: ["Local electrical foreman presence"]
      },
      scheduleData: {
        scheduledDate: "2026-09-02",
        startTime: "10:00",
        endTime: "14:00",
        location: "Mine B1 Substation 2",
        conflictDetected: false
      },
      activity: [
        { time: "2026-08-24 11:30", user: "S. K. Mukherjee", action: "Plan created", reason: "Monthly cycle", prev: "—", next: "Draft" },
        { time: "2026-08-24 14:00", user: "S. K. Mukherjee", action: "Plan scheduled for 02 Sep 2026", reason: "Approved slot", prev: "Planned", next: "Scheduled" }
      ],
      versions: [{ version: "v1.0", date: "2026-08-24 11:30", user: "S. K. Mukherjee", note: "Original" }]
    },
    {
      id: "PLAN-2026-0065",
      recommendationId: "REC-2026-0015",
      requestId: "REQ-2026-0050",
      inspectionType: "Haulage & Transport Safety Inspection",
      title: "Direct Rope Haulage & Track Interlocking Statutory Inspection",
      track: "Safety & Machinery",
      authority: "Internal Governance",
      organization: "Coal India Limited (CIL)",
      subsidiary: "Eastern Coalfields Limited (ECL)",
      area: "Area 01 (Sripur-Kenda)",
      mine: "Mine A2 (Deep Underground Seam VII)",
      location: "Main Incline Haulage Road & Tub Re-railer Point",
      planner: "S. K. Mukherjee",
      createdDate: "2026-08-15 09:00",
      status: "Completed",
      plannedDate: "2026-08-20",
      plannedDuration: "5 Hours",
      risk: "Low",
      purpose: "Inspect haulage rope diameter wear, man-riding car brakes, stop blocks, and jazz rails.",
      objective: "Ensure fail-safe tub arrestor function on 1 in 6 incline.",
      planningNotes: "Routine half-yearly inspection completed.",
      regulatoryBasis: {
        id: "OBL-045",
        regulation: "CMR 2017 Regulation 87 & 93",
        clause: "Regulation 87",
        requirement: "Haulage Roadways & Man-Riding Safety Audit",
        applicability: "Underground Incline Haulage Systems",
        obligation: "Periodic testing of emergency backstay, stop-blocks, and rope socket recapping"
      },
      checklist: {
        templateId: "DGMS-STD-HAUL-01",
        name: "Underground Haulage & Track Safety Protocol (15 Checks)",
        checksCount: 15,
        measurementRequirements: ["Rope diameter reduction (%)", "Brake holding torque"],
        evidenceRequirements: ["Rope caliper measurement photo"]
      },
      teamRequirements: { leadCompetency: "Mechanical Engineer", specialists: ["Haulage Incharge"], supportingInspectors: [], minTeamSize: 2, assignmentStatus: "Completed" },
      preparation: { instruments: ["Vernier Caliper", "Torque Tester"], ppe: ["Standard Mining PPE"], documents: ["Rope Recapping Register"], siteRequirements: ["Haulage stopped during test"] },
      scheduleData: { scheduledDate: "2026-08-20", startTime: "09:00", endTime: "14:00", location: "Mine A2 Haulage", conflictDetected: false },
      activity: [{ time: "2026-08-20 15:00", user: "R. Sharma", action: "Inspection executed and handed to review", reason: "Completed", prev: "Scheduled", next: "Completed" }],
      versions: [{ version: "v1.0", date: "2026-08-15 09:00", user: "S. K. Mukherjee", note: "Original" }]
    }
  ],

  // SCREEN 14 / Central Hub: Scheduled & Historical Inspections
  inspections: [
    {
      id: "INS-2026-0882",
      planId: "PLAN-2026-0088",
      recommendationId: "REC-2026-0048",
      requestId: "REQ-2026-0099",
      title: "Statutory Q3 Comprehensive Underground Ventilation Audit",
      authority: "Internal Governance & DGMS Statutory Safety Board",
      track: "Safety & Occupational Health",
      type: "Ventilation & Gas Dynamics Inspection",
      scope: "CIL / ECL / Area 01 / Mine A2 (Deep Underground Seam VII)",
      scopeDetails: {
        holding: "Coal India Limited (CIL)",
        subsidiary: "Eastern Coalfields Limited (ECL)",
        area: "Area 01 (Sripur-Kenda)",
        mine: "Mine A2 (Deep Underground Seam VII)",
        districts: "District 3 West, District 4 Return Split, Main Fan Drift"
      },
      status: "Scheduled", // Recommendation, Planning, Scheduled, Assignment, Execution, Review, Final
      stepperStages: [
        { name: "Recommendation", status: "completed", timestamp: "2026-08-28 02:00" },
        { name: "Planning", status: "completed", timestamp: "2026-08-29 10:45" },
        { name: "Scheduled", status: "current", timestamp: "2026-08-29 12:10" },
        { name: "Assignment", status: "pending", timestamp: "Pending Workspace 02 Hand-off" },
        { name: "Execution", status: "pending", timestamp: "Pending Workspace 03 Execution" },
        { name: "Review", status: "pending", timestamp: "Pending Workspace 04 Review" },
        { name: "Final", status: "pending", timestamp: "Pending Final Record" }
      ],
      plannedDate: "15 Nov 2026",
      schedule: {
        date: "15 Nov 2026",
        time: "09:00 – 15:00 IST",
        shift: "General Morning Shift (Shift A)",
        location: "Mine A2 Underground Seam VII & Surface Main Fan Complex",
        status: "Confirmed Slot"
      },
      duration: "6 Hours",
      risk: "High",
      source: "Statutory Obligation OBL-088 + Management Concern",
      planner: "S. K. Mukherjee (General Manager Safety)",
      team: {
        assignmentStatus: "Assignment Pending (Requires Workspace 02 Hand-off)",
        leadInspector: "Unassigned",
        specialistsRequired: ["DGMS Certified Ventilation Officer", "Gas Testing Specialist"],
        supportingRequired: ["Assistant Safety Officer (UG)"]
      },
      regulatoryBasis: {
        id: "OBL-088",
        regulation: "Coal Mines Regulations (CMR) 2017",
        clause: "Regulation 153(2) & 160",
        requirement: "Statutory Quarterly Main Mechanical Ventilation & Airway Velocity Survey",
        applicability: "All Degree-II and Degree-III Gassy Underground Coal Mines",
        obligation: "Quarterly statutory air quantity & velocity survey across all splits and return airways"
      },
      checklistPreview: {
        template: "DGMS-STD-VENT-04 (22 checks)",
        mode: "Preview Only (Execution happens in Workspace 03 Mobile/Field Tablet)",
        sampleChecks: [
          { checkNo: "1.1", item: "Measure static pressure depression at fan drift water gauge", mandatory: true },
          { checkNo: "1.2", item: "Verify air quantity entering main intake airway at shaft bottom (m3/min)", mandatory: true },
          { checkNo: "2.1", item: "Conduct 10-point traverse anemometer survey in Return Split 4", mandatory: true },
          { checkNo: "2.2", item: "Sample inflammable gas (CH4) percentage at 30cm from roof in dead ends", mandatory: true },
          { checkNo: "3.1", item: "Inspect condition of air crossing / ventilation doors at Junction J-12", mandatory: true }
        ]
      },
      monitoring: {
        activeProgress: 0,
        completedChecks: "0/22",
        evidenceCollected: 0,
        findingsLogged: 0,
        syncStatus: "Not Started"
      },
      activity: [
        { time: "2026-08-29 12:10", user: "S. K. Mukherjee", action: "Scheduled inspection for 15 Nov 2026 (09:00 - 15:00)", reason: "Slot allocated after checking mine ventilation maintenance schedule" },
        { time: "2026-08-29 10:45", user: "S. K. Mukherjee", action: "Approved Plan PLAN-2026-0088 and initiated scheduling" }
      ]
    },

    // SCREEN 15 Active field inspection (In progress)
    {
      id: "INS-2026-0870",
      planId: "PLAN-2026-0081",
      recommendationId: "REC-2026-0041",
      title: "Quarterly Strata & Hydraulic Roof Bolting Audit",
      authority: "Internal Governance",
      track: "Strata Control & Geo-technical",
      type: "Strata Control & Roof Support Audit",
      scope: "CIL / ECL / Area 01 / Mine A2 (Deep Underground Seam VII)",
      scopeDetails: {
        holding: "Coal India Limited (CIL)",
        subsidiary: "Eastern Coalfields Limited (ECL)",
        area: "Area 01 (Sripur-Kenda)",
        mine: "Mine A2 (Deep Underground Seam VII)",
        districts: "District 2 South Panel S3"
      },
      status: "In Progress",
      stepperStages: [
        { name: "Recommendation", status: "completed", timestamp: "2026-08-10" },
        { name: "Planning", status: "completed", timestamp: "2026-08-12" },
        { name: "Scheduled", status: "completed", timestamp: "2026-08-15" },
        { name: "Assignment", status: "completed", timestamp: "2026-08-22" },
        { name: "Execution", status: "current", timestamp: "Started Today 08:30 IST" },
        { name: "Review", status: "pending", timestamp: "Pending Field Submission" },
        { name: "Final", status: "pending", timestamp: "Pending" }
      ],
      plannedDate: "29 Aug 2026",
      schedule: {
        date: "29 Aug 2026",
        time: "08:30 – 14:30 IST",
        shift: "Morning Shift A",
        location: "Mine A2 District 2 South Panel S3",
        status: "Underway"
      },
      duration: "6 Hours",
      risk: "High",
      source: "SCAMP Bi-monthly Audit OBL-104",
      planner: "S. K. Mukherjee",
      team: {
        assignmentStatus: "Assigned & Active in Field",
        leadInspector: "R. Sharma (First Class Manager #9812)",
        specialistsRequired: ["Strata Control Specialist: P. Mukhopadhyay"],
        supportingRequired: ["Safety Inspector: D. Roy"]
      },
      regulatoryBasis: {
        id: "OBL-104",
        regulation: "Coal Mines Regulations (CMR) 2017",
        clause: "Regulation 123 & 124",
        requirement: "Strata Control & Support Management Plan (SCAMP) Audit",
        applicability: "Underground Bord & Pillar and Longwall Workings",
        obligation: "Verification of roof bolt resin anchoring tension testing and telltale convergence"
      },
      monitoring: {
        activeProgress: 68,
        completedChecks: "15/22",
        evidenceCollected: 18,
        findingsLogged: 3,
        lastSync: "2 min ago (Live Underground Telemetry Uplink)",
        syncStatus: "Online (Substation Wi-Fi Gateway #04)",
        offlinePending: 0
      },
      activity: [
        { time: "2026-08-29 08:30", user: "R. Sharma", action: "Commenced field inspection at District 2 South" },
        { time: "2026-08-29 09:45", user: "R. Sharma", action: "Logged Finding FND-2026-00127 (Anchorage load below 8T)" },
        { time: "2026-08-29 10:15", user: "P. Mukhopadhyay", action: "Uploaded 4 photographic evidences of telltale indicator" },
        { time: "2026-08-29 10:43", user: "System", action: "Telemetry sync heartbeat acknowledged" }
      ]
    },

    // SCREEN 19 / 20: Historical Inspection Record (Final)
    {
      id: "INS-2026-0782",
      planId: "PLAN-2026-0054",
      recommendationId: "REC-2026-0028",
      title: "Comprehensive DGMS Flameproof Electrical & Switchgear Audit",
      authority: "DGMS / Internal Electrical Safety",
      track: "Electrical & Machinery",
      type: "Flameproof Electrical Compliance Audit",
      scope: "CIL / ECL / Area 01 / Mine A2 (Deep Underground Seam VII)",
      scopeDetails: {
        holding: "Coal India Limited (CIL)",
        subsidiary: "Eastern Coalfields Limited (ECL)",
        area: "Area 01 (Sripur-Kenda)",
        mine: "Mine A2 (Deep Underground Seam VII)",
        districts: "Underground Substation 3 & Haulage Drive Rooms"
      },
      status: "Final", // Completed & Final
      stepperStages: [
        { name: "Recommendation", status: "completed", timestamp: "2026-07-02" },
        { name: "Planning", status: "completed", timestamp: "2026-07-05" },
        { name: "Scheduled", status: "completed", timestamp: "2026-07-08" },
        { name: "Assignment", status: "completed", timestamp: "2026-07-10" },
        { name: "Execution", status: "completed", timestamp: "2026-07-15" },
        { name: "Review", status: "completed", timestamp: "2026-07-20" },
        { name: "Final", status: "completed", timestamp: "2026-07-25" }
      ],
      plannedDate: "15 Jul 2026",
      inspectionDate: "15 Jul 2026 (09:00 – 14:00)",
      duration: "5 Hours",
      risk: "High",
      source: "Mandatory DGMS Directive OBL-062",
      planner: "S. K. Mukherjee",
      team: {
        leadInspector: "K. Sen (DGMS Certified Electrical Inspector)",
        specialists: ["A. Goswami (Safety Officer)"],
        supporting: ["M. Hansda (Substation Electrician)"]
      },
      regulatoryBasis: {
        id: "OBL-062",
        regulation: "CEA Regulations 2010 Reg 102 & CMR 2017",
        clause: "Regulation 102 & 107",
        requirement: "Underground Flameproof (FLP) & Intrinsically Safe (IS) Electrical Audit",
        applicability: "Underground Electrical Substations & Motor Drives",
        obligation: "Verification of FLP gap tolerances, earth leakage relay trip times"
      },
      finalSummary: {
        outcome: "Satisfactory with Rectifications Mandated",
        checklistStatus: "20/20 Completed (100%)",
        measurementsCount: 4,
        measurements: [
          { param: "Transwitch FLP Flange Gap", recorded: "0.38 mm", limit: "≤ 0.50 mm (CMR 2017)", result: "Compliant" },
          { param: "Earth Leakage Relay Trip Time", recorded: "18.4 ms", limit: "≤ 20.0 ms (CEA 2010)", result: "Compliant" },
          { param: "3.3kV Cable Insulation Resistance (Phase to Earth)", recorded: "420 Mega-ohms", limit: "≥ 50 Mega-ohms", result: "Compliant" },
          { param: "Gate End Box Earth Continuity", recorded: "0.28 ohms", limit: "≤ 0.50 ohms", result: "Compliant" }
        ],
        observationsCount: 7,
        findingsCount: 3,
        findings: [
          { id: "FND-2026-00088", title: "Missing spring washer on FLP gland bolt #4 of Gate End Box 2", severity: "Medium", status: "Rectified & Verified" },
          { id: "FND-2026-00089", title: "Rubber bush degradation on trailing cable entry of haulage motor", severity: "High", status: "Rectified & Verified" },
          { id: "FND-2026-00090", title: "Substation emergency sand bucket water ingress", severity: "Low", status: "Closed" }
        ],
        capaCount: 3,
        capa: [
          { id: "CAPA-2026-0091", action: "Replace all gland packing bolts with certified cadmium-plated hex bolts", status: "Closed", verifiedBy: "K. Sen" },
          { id: "CAPA-2026-0092", action: "Replace damaged trailing cable entry bush with FLP neoprene bushing", status: "Closed", verifiedBy: "K. Sen" },
          { id: "CAPA-2026-0093", action: "Relocate safety fire sand buckets away from roof percolation point", status: "Closed", verifiedBy: "S. K. Mukherjee" }
        ],
        reportVersion: "Final Report v1.0 (Digitally Signed by Lead Inspector K. Sen & Approved by DGMS Liaison)",
        versions: [
          { version: "v1.0", date: "2026-07-25", user: "K. Sen", note: "Final immutable record published" }
        ]
      }
    }
  ],

  // SCREEN 09: Planning Calendar Events & Conflicts Data
  calendarEvents: [
    {
      id: "INS-2026-0882",
      planId: "PLAN-2026-0088",
      mine: "Mine A2",
      area: "Area 01",
      type: "Ventilation",
      date: "2026-11-15",
      time: "09:00 - 15:00",
      risk: "High",
      status: "Scheduled",
      leadInspector: "Pending Workspace 02",
      hasConflict: false
    },
    {
      id: "INS-2026-0782-SIM",
      planId: "PLAN-2026-0054-R",
      mine: "Mine A2",
      area: "Area 01",
      type: "Electrical FLP",
      date: "2026-11-15",
      time: "10:00 - 13:00",
      risk: "High",
      status: "Conflicting Event",
      leadInspector: "K. Sen",
      hasConflict: true,
      conflictDetails: {
        reason: "Shaft Cage Transportation & Electrical Substation 3 Isolation Overlap. Mine A2 cannot execute simultaneous full ventilation survey during high-voltage shutdown.",
        conflictingWith: "INS-2026-0782",
        suggestedAlternatives: [
          { option: "Option 1", date: "2026-11-15", time: "14:00 – 17:00 IST", label: "Afternoon Shift Window (Post Electrical Test)" },
          { option: "Option 2", date: "2026-11-16", time: "10:00 – 16:00 IST", label: "Next Working Day (Full Free Shift Window)" },
          { option: "Option 3", date: "Custom Slot", time: "User Configurable", label: "Select Custom Date & Time Slot" }
        ]
      }
    },
    {
      id: "INS-2026-0870",
      planId: "PLAN-2026-0081",
      mine: "Mine A2",
      area: "Area 01",
      type: "Strata Control",
      date: "2026-08-29",
      time: "08:30 - 14:30",
      risk: "High",
      status: "In Progress",
      leadInspector: "R. Sharma",
      hasConflict: false
    },
    {
      id: "INS-2026-0810",
      planId: "PLAN-2026-0079",
      mine: "Mine B1",
      area: "Area 01",
      type: "Electrical FLP",
      date: "2026-09-02",
      time: "10:00 - 14:00",
      risk: "Medium",
      status: "Scheduled",
      leadInspector: "K. Sen",
      hasConflict: false
    },
    {
      id: "INS-2026-0830",
      planId: "PLAN-2026-0092",
      mine: "Mine C4",
      area: "Area 01",
      type: "Inundation",
      date: "2026-09-12",
      time: "09:00 - 13:00",
      risk: "Medium",
      status: "Planned",
      leadInspector: "A. Sengupta",
      hasConflict: false
    },
    {
      id: "INS-2026-0799",
      planId: "PLAN-2026-0062",
      mine: "Mine S1",
      area: "Area 02",
      type: "Dust & Gas",
      date: "2026-08-22",
      time: "09:00 - 13:00",
      risk: "High",
      status: "Overdue",
      leadInspector: "P. Mukhopadhyay",
      hasConflict: false
    }
  ],

  // SCREEN 12: Overdue Inspections Monitoring
  overdueInspections: [
    {
      id: "INS-2026-0799",
      mine: "Mine S1 (Dabur Colliery)",
      area: "Area 02 (Salanpur)",
      type: "Airborne Respirable Dust & Gas Survey",
      dueDate: "22 Aug 2026",
      daysOverdue: 7,
      risk: "High",
      currentStage: "Scheduling",
      owner: "Planning Cell Area 02",
      statutoryRef: "CMR 2017 Reg 143",
      reason: "Sampling equipment calibration delay at Regional Laboratory."
    },
    {
      id: "INS-2026-0765",
      mine: "Mine A2 (Deep UG Seam VII)",
      area: "Area 01 (Sripur-Kenda)",
      type: "Winding Engine Brake & Overwind Trip Statutory Test",
      dueDate: "24 Aug 2026",
      daysOverdue: 5,
      risk: "Critical",
      currentStage: "Assignment",
      owner: "Mechanical Engineering Safety Cell",
      statutoryRef: "CMR 2017 Reg 76",
      reason: "Lead Mechanical Inspector on emergency DGMS inquiry duty."
    },
    {
      id: "INS-2026-0740",
      mine: "Mine B1 (Inclined Mine)",
      area: "Area 01 (Sripur-Kenda)",
      type: "Underground Refuge Chamber & Lifeline Verification",
      dueDate: "26 Aug 2026",
      daysOverdue: 3,
      risk: "Medium",
      currentStage: "Planning",
      owner: "Safety Department ECL",
      statutoryRef: "DGMS Tech Circular 02/2024",
      reason: "Awaiting updated refuge chamber manufacturer specs."
    }
  ],

  // SCREEN 16: Findings Monitoring (Manager view - View vs Review permission aware)
  findings: [
    {
      id: "FND-2026-00127",
      inspectionId: "INS-2026-0870",
      mine: "Mine A2",
      findingType: "Strata Control & Support Deficiency",
      severity: "High",
      inspector: "R. Sharma (Lead)",
      reviewer: "R. Kumar (Safety Board)",
      status: "Under Review",
      capaRequired: true,
      description: "Hydraulic roof bolt #14 at Junction J-14 failed anchorage pull test at 6.8 tonnes (statutory requirement ≥ 10.0 tonnes). Chemical resin capsule setting incomplete.",
      regulationRef: "CMR 2017 Reg 123",
      actionUrl: "Workspace 05 Finding Detail",
      hasReviewerPermission: false // Manager can View, not Approve unless Reviewer
    },
    {
      id: "FND-2026-00128",
      inspectionId: "INS-2026-0870",
      mine: "Mine A2",
      findingType: "Strata Monitoring Instrument",
      severity: "Medium",
      inspector: "P. Mukhopadhyay",
      reviewer: "R. Kumar",
      status: "Proposed",
      capaRequired: true,
      description: "Dual-height telltale indicator #09 glass scale scratched and partially obscured by stone dust.",
      regulationRef: "CMR 2017 Reg 124",
      actionUrl: "Workspace 05 Finding Detail",
      hasReviewerPermission: false
    },
    {
      id: "FND-2026-00115",
      inspectionId: "INS-2026-0810",
      mine: "Mine B1",
      findingType: "Electrical Flameproof Enclosure",
      severity: "Critical",
      inspector: "K. Sen",
      reviewer: "S. K. Mukherjee",
      status: "Confirmed",
      capaRequired: true,
      description: "Earth leakage circuit breaker on 3.3kV main pump feed tripped at 28.5 ms (exceeds mandatory limit of 20 ms).",
      regulationRef: "CEA Reg 102",
      actionUrl: "Workspace 05 Finding Detail",
      hasReviewerPermission: true
    },
    {
      id: "FND-2026-00099",
      inspectionId: "INS-2026-0799",
      mine: "Mine S1",
      findingType: "Ventilation",
      severity: "High",
      inspector: "P. Mukhopadhyay",
      reviewer: "S. K. Mukherjee",
      status: "Returned",
      capaRequired: false,
      description: "Dust sampling gravimetric filter mass discrepancy; sent back to field inspector for re-calculation.",
      regulationRef: "CMR 2017 Reg 143",
      actionUrl: "Workspace 05 Finding Detail",
      hasReviewerPermission: true
    }
  ],

  // SCREEN 17: CAPA Monitoring (Manager monitors, cannot verify own CAPA)
  capaList: [
    {
      id: "CAPA-2026-00142",
      findingId: "FND-2026-00127",
      inspectionId: "INS-2026-0870",
      mine: "Mine A2",
      department: "Colliery Strata & Civil Support Division",
      actionOwner: "M. K. Verma (Colliery Strata Engineer)",
      actionTitle: "Re-anchor Junction J-14 with dual-capsule fast-setting resin and re-test pull tension to 12T",
      dueDate: "05 Sep 2026",
      priority: "High",
      status: "Open",
      verifier: "R. Sharma (Statutory Inspector)",
      canManagerVerify: false
    },
    {
      id: "CAPA-2026-00139",
      findingId: "FND-2026-00115",
      inspectionId: "INS-2026-0810",
      mine: "Mine B1",
      department: "Underground Electrical Engineering",
      actionOwner: "T. K. Roy (Colliery Electrical Engineer)",
      actionTitle: "Replace solid-state Earth Leakage Relay on 3.3kV feed with calibrated micro-processor unit (<15ms trip)",
      dueDate: "01 Sep 2026",
      priority: "Critical",
      status: "Awaiting Verification",
      verifier: "K. Sen (DGMS Certified Electrical Inspector)",
      canManagerVerify: false
    },
    {
      id: "CAPA-2026-00121",
      findingId: "FND-2026-00084",
      inspectionId: "INS-2026-0412",
      mine: "Mine A2",
      department: "Mine Ventilation Dept",
      actionOwner: "S. Banerjee (Ventilation Officer)",
      actionTitle: "Install 75kW auxiliary booster fan at Split 4 and clear return airway debris",
      dueDate: "20 Aug 2026",
      priority: "High",
      status: "Overdue",
      verifier: "S. K. Mukherjee",
      canManagerVerify: false
    },
    {
      id: "CAPA-2026-00110",
      findingId: "FND-2026-00072",
      inspectionId: "INS-2026-0390",
      mine: "Mine C4",
      department: "Heavy Earth Moving Machinery (HEMM)",
      actionOwner: "P. Das (Excavation Incharge)",
      actionTitle: "Calibrate automatic fire suppression system (AFSS) on Dumper D-14",
      dueDate: "15 Jul 2026",
      priority: "Medium",
      status: "Closed",
      verifier: "A. Sengupta",
      canManagerVerify: false
    }
  ],

  // SCREEN 18: Inspection Report Status
  reports: [
    {
      id: "REP-2026-0488",
      inspectionId: "INS-2026-0870",
      mine: "Mine A2",
      reportVersion: "v1.0 (Draft)",
      leadInspector: "R. Sharma",
      submittedDate: "29 Aug 2026 (Live Draft)",
      reviewer: "R. Kumar (Statutory Reviewer)",
      status: "Draft",
      lastAction: "Inspector drafting findings section",
      canApprove: false
    },
    {
      id: "REP-2026-0472",
      inspectionId: "INS-2026-0810",
      mine: "Mine B1",
      reportVersion: "v1.1",
      leadInspector: "K. Sen",
      submittedDate: "28 Aug 2026",
      reviewer: "Authorized Safety Committee",
      status: "Awaiting Review",
      lastAction: "Submitted for compliance signoff",
      canApprove: false
    },
    {
      id: "REP-2026-0450",
      inspectionId: "INS-2026-0799",
      mine: "Mine S1",
      reportVersion: "v1.0",
      leadInspector: "P. Mukhopadhyay",
      submittedDate: "25 Aug 2026",
      reviewer: "DGMS Liaison Cell",
      status: "Returned",
      lastAction: "Returned for dust concentration re-check",
      canApprove: false
    },
    {
      id: "REP-2026-0410",
      inspectionId: "INS-2026-0782",
      mine: "Mine A2",
      reportVersion: "Final v1.0",
      leadInspector: "K. Sen",
      submittedDate: "25 Jul 2026",
      reviewer: "S. K. Mukherjee & DGMS Eastern Zone",
      status: "Approved",
      lastAction: "Published & Digitally Signed",
      canApprove: false
    }
  ],

  // SCREEN 21: Governance Global Audit & Activity
  globalAudit: [
    {
      id: "AUD-9912",
      timestamp: "2026-08-29 12:10:14",
      user: "S. K. Mukherjee (Inspection Manager)",
      action: "Scheduled Inspection",
      objectType: "Inspection",
      objectId: "INS-2026-0882",
      scope: "CIL / ECL / Area 01 / Mine A2",
      previousState: "Planned",
      newState: "Scheduled",
      reason: "Allocated statutory window for 15 Nov 2026 with no operational conflicts."
    },
    {
      id: "AUD-9911",
      timestamp: "2026-08-29 10:45:22",
      user: "S. K. Mukherjee (Inspection Manager)",
      action: "Approved Inspection Plan",
      objectType: "Plan",
      objectId: "PLAN-2026-0088",
      scope: "CIL / ECL / Area 01 / Mine A2",
      previousState: "Draft",
      newState: "Planned",
      reason: "Completed 6-point statutory readiness checklist under CMR 2017 Reg 153."
    },
    {
      id: "AUD-9910",
      timestamp: "2026-08-29 10:02:40",
      user: "S. K. Mukherjee (Inspection Manager)",
      action: "Approved Recommendation",
      objectType: "Recommendation",
      objectId: "REC-2026-0048",
      scope: "CIL / ECL / Area 01 / Mine A2",
      previousState: "Awaiting Planning",
      newState: "Approved",
      reason: "Quarterly ventilation statutory obligation due and high risk priority confirmed."
    },
    {
      id: "AUD-9909",
      timestamp: "2026-08-29 08:35:10",
      user: "S. K. Mukherjee (Inspection Manager)",
      action: "Accepted Intake Request",
      objectType: "Request",
      objectId: "REQ-2026-0098",
      scope: "CIL / ECL / Area 01 / Mine A2",
      previousState: "New",
      newState: "Accepted",
      reason: "Elevated telltale roof convergence telemetry verified against Mine Agent alert."
    },
    {
      id: "AUD-9908",
      timestamp: "2026-08-29 08:30:00",
      user: "R. K. Agarwal (Mine Agent)",
      action: "Created Inspection Request",
      objectType: "Request",
      objectId: "REQ-2026-0098",
      scope: "CIL / ECL / Area 01 / Mine A2",
      previousState: "—",
      newState: "New",
      reason: "Urgent strata convergence in Depillaring Section W4."
    },
    {
      id: "AUD-9905",
      timestamp: "2026-08-28 15:35:00",
      user: "S. K. Mukherjee (Inspection Manager)",
      action: "Converted to Recommendation",
      objectType: "Request",
      objectId: "REQ-2026-0102",
      scope: "CIL / ECL / Area 01 / Mine A2",
      previousState: "Accepted",
      newState: "Converted to Recommendation",
      reason: "DGMS Joint Electrical Audit mandate assigned reference."
    },
    {
      id: "AUD-9901",
      timestamp: "2026-08-27 16:30:12",
      user: "S. K. Mukherjee (Inspection Manager)",
      action: "Rejected Request",
      objectType: "Request",
      objectId: "REQ-2026-0091",
      scope: "CIL / ECL / Area 02 / Mine S1",
      previousState: "Under Review",
      newState: "Rejected",
      reason: "Outside statutory governance track; delegated to local colliery workshop."
    }
  ]
};

// Expose on window for browser app
window.STRATA_DATA = STRATA_DATA;
