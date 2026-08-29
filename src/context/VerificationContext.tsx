"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  VerificationScreenId,
  VerificationItem,
  VerificationEvidenceItem,
  VerificationAuditLogItem,
  VerificationDecisionOutcome,
  VerificationStatus
} from '../types/verification';

const INITIAL_VERIFICATION_ITEMS: VerificationItem[] = [
  {
    id: 'VER-2026-0031',
    capaId: 'CAPA-2026-0048',
    findingId: 'FND-2026-00127',
    inspectionId: 'INS-2026-0882',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Shaft 3 / Return Airway Intersection (Chainage 140m)',
    capaType: 'Ventilation',
    severity: 'HIGH',
    priority: 'HIGH',
    actionTitle: 'Repair ventilation system and overhaul regulator louvres',
    actionDescription: 'Execute mechanical descaling of regulator louvres, recalibrate auxiliary booster fan blade pitch angle, and perform 9-grid traverse anemometer measurement.',
    actionOwner: 'Chief Ventilation Engineer (Er. S. K. Mahapatra)',
    department: 'Ventilation Department',
    completionDate: '29 Nov 2026',
    submissionDate: '30 Nov 2026',
    verificationDueDate: '01 Dec 2026',
    status: 'Awaiting Verification',
    decision: 'PENDING',
    assignedVerifier: {
      name: 'Er. R. Sharma',
      role: 'DGMS Panel Senior Safety Auditor / Independent Verifier',
      authorizationId: 'DGMS-AUTH-2024-88',
      competency: ['Ventilation Specialist', 'Safety Audit Level 3', 'First Class Manager Certificate'],
      scope: 'Mine A2 &bull; Area 1 &bull; ECL',
      assignedDate: '30 Nov 2026 11:00 IST',
      separationOfDutiesChecked: true,
      conflictDetected: false
    },
    findingSummary: {
      description: 'Ventilation Airflow Velocity below Statutory Threshold in Shaft 3 Return',
      observedCondition: 'Measured velocity 4.8 m/s with digital anemometer at 140m chainage split.',
      requiredStandard: 'Airway cross-sectional velocity ≥ 5.5 m/s to prevent methane layering.',
      regulatoryBasis: 'Coal Mines Regulations 2017, Regulation 153(2)(b)',
      act: 'Mines Act, 1952',
      clause: 'Regulation 153(2)(b) — Minimum Air Velocity in Return Airways',
      inspectionDate: '15 Nov 2026'
    },
    expectedOutcome: {
      description: 'Airflow velocity restored to ≥ 5.5 m/s across entire 9-grid cross-section.',
      requiredValue: '≥ 5.5 m/s',
      achievedValue: '5.9 m/s',
      thresholdMet: true
    },
    checklist: {
      check01ActionCompleted: true,
      check02EvidenceProvided: true,
      check03EvidenceAuthentic: true,
      check04DemonstratesCorrection: true,
      check05MeetsRequirement: true,
      check06AdditionalActionRequired: false,
      remarks: 'All 6 statutory verification checks validated against calibrated test logs.'
    },
    evidenceList: [
      {
        id: 'EVD-VER-01',
        title: 'Ventilation Louvres Overhaul & Descaling Engineering Report',
        type: 'Repair Report',
        uploadedBy: 'Er. S. K. Mahapatra (Action Owner)',
        uploadTimestamp: '24 Nov 2026 16:30 IST',
        captureDate: '24 Nov 2026',
        location: 'Shaft 3 Louvre Chamber',
        relatedAction: 'CAPA-2026-0048',
        relatedFinding: 'FND-2026-00127',
        status: 'Accepted',
        fileSize: '2.1 MB',
        filename: 'DOC-VENT-REPAIR-REPORT.pdf',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        verifierRemarks: 'Engineering log verifies mechanical guide replacement and blade pitch reset.'
      },
      {
        id: 'EVD-VER-02',
        title: 'Photographic Proof of Cleared Airway & Realigned Shutter Louvres',
        type: 'Photo',
        uploadedBy: 'M. K. Pandey (Foreman)',
        uploadTimestamp: '25 Nov 2026 14:15 IST',
        captureDate: '25 Nov 2026',
        location: 'Shaft 3 (Ch: 140m)',
        relatedAction: 'CAPA-2026-0048',
        relatedFinding: 'FND-2026-00127',
        status: 'Accepted',
        fileSize: '4.6 MB',
        filename: 'PHOTO-LOUVRE-CLEARED.jpg',
        sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        photoData: {
          timestamp: '25 Nov 2026 14:15 IST',
          location: 'Shaft 3 (Ch: 140m)',
          gpsCoordinates: '24°11\'48.2"N 82°41\'15.6"E'
        },
        verifierRemarks: 'Visual inspection confirms clear un-obstructed cross-sectional aperture.'
      },
      {
        id: 'EVD-VER-03',
        title: 'Post-Repair 9-Grid Anemometer Traverse Measurement Sheet',
        type: 'Measurement',
        uploadedBy: 'Er. S. K. Mahapatra',
        uploadTimestamp: '26 Nov 2026 17:00 IST',
        captureDate: '26 Nov 2026',
        location: 'Shaft 3 (Ch: 140m)',
        relatedAction: 'CAPA-2026-0048',
        relatedFinding: 'FND-2026-00127',
        status: 'Accepted',
        fileSize: '3.4 MB',
        filename: 'MEASUREMENT-9GRID-ANEMOMETER.pdf',
        sha256Hash: '8f14e45fceea167a5a36dedd4bea2543add704d8a1b5c8996fb92427ae41e464',
        isMeasurement: true,
        measurementData: {
          beforeValue: '4.8 m/s',
          requiredThreshold: '≥ 5.5 m/s',
          afterValue: '5.9 m/s',
          unit: 'm/s',
          instrument: 'Digital Vane Anemometer (Model DA-800)',
          instrumentId: 'ANM-2048',
          calibrationStatus: 'VALID',
          thresholdSatisfied: true
        },
        verifierRemarks: 'Measurement confirms average velocity 5.9 m/s, satisfying statutory requirement.'
      },
      {
        id: 'EVD-VER-04',
        title: 'Fan Motor Electrical Overhaul & Current Balance Sheet',
        type: 'Maintenance Record',
        uploadedBy: 'Electrical Crew Lead (D. K. Singh)',
        uploadTimestamp: '26 Nov 2026 18:30 IST',
        captureDate: '26 Nov 2026',
        location: 'Shaft 3 Fan House',
        relatedAction: 'CAPA-2026-0048',
        relatedFinding: 'FND-2026-00127',
        status: 'Accepted',
        fileSize: '1.8 MB',
        filename: 'DOC-ELECTRICAL-MAINTENANCE.pdf',
        sha256Hash: '4a2b1c8f14e45fceea167a5a36dedd4bea2543add704d8a1b5c8996fb92427ae',
        verifierRemarks: 'Current draw balanced across all 3 phases at 48.5 A.'
      }
    ],
    followUpRequired: true,
    followUpPlan: {
      scheduledDate: '15 Jan 2027',
      verifier: 'Er. R. Sharma',
      location: 'Mine A2 — Shaft 3',
      verificationType: 'Measurement',
      requiredEquipment: 'Calibrated Anemometer (ANM-2048), Optical Scope',
      requiredDocuments: 'Monthly Ventilation Survey Register',
      status: 'Scheduled'
    },
    recurrenceInfo: {
      isRecurrenceRisk: true,
      clusterCount: 3,
      relatedFindings: ['FND-2026-00127', 'FND-2025-00881', 'FND-2025-00432'],
      relatedCapas: ['CAPA-2026-0048', 'CAPA-2025-0092'],
      aiAdvisory: 'Airflow velocity drift observed 3 times across 18 months at Shaft 3. Recommended preventive quarterly louvre descaling schedule.'
    },
    historyCycles: [
      {
        cycleNumber: 1,
        submissionDate: '26 Nov 2026',
        verifier: 'Er. R. Sharma',
        decision: 'FAIL',
        reason: 'Initial traverse recorded 5.0 m/s which remained below statutory threshold of 5.5 m/s.',
        measuredOutcome: '5.0 m/s'
      },
      {
        cycleNumber: 2,
        submissionDate: '30 Nov 2026',
        verifier: 'Er. R. Sharma',
        decision: 'PASS',
        reason: 'Secondary overhaul and fan pitch adjustment achieved certified velocity of 5.9 m/s.',
        measuredOutcome: '5.9 m/s'
      }
    ],
    daysRemaining: 1
  },
  {
    id: 'VER-2026-0032',
    capaId: 'CAPA-2026-0049',
    findingId: 'FND-2026-00128',
    inspectionId: 'INS-2026-0882',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'District 4 Split Underground Header Seam VII',
    capaType: 'Strata Control',
    severity: 'CRITICAL',
    priority: 'CRITICAL',
    actionTitle: 'Re-torque roof bolts and install supplementary cable anchors',
    actionDescription: 'Re-tension all 4 under-torqued resin bolts to ≥ 120 Nm and install 2 secondary cable bolts with hydraulic tensioner.',
    actionOwner: 'Strata Control Officer (Er. B. C. Roy)',
    department: 'Strata Control & Support Team',
    completionDate: '28 Nov 2026',
    submissionDate: '29 Nov 2026',
    verificationDueDate: '02 Dec 2026',
    status: 'In Verification Review',
    decision: 'PENDING',
    assignedVerifier: {
      name: 'Er. R. Sharma',
      role: 'DGMS Panel Senior Safety Auditor',
      authorizationId: 'DGMS-AUTH-2024-88',
      competency: ['Strata Control Specialist', 'DGMS Panel Auditor'],
      scope: 'Mine A2 &bull; Area 1',
      assignedDate: '29 Nov 2026',
      separationOfDutiesChecked: true,
      conflictDetected: false
    },
    findingSummary: {
      description: 'Under-torqued Roof Support Anchors at District 4 Split',
      observedCondition: 'Torque test recorded 85 Nm against required ≥ 120 Nm under SCAMP.',
      requiredStandard: '100% compliance with SCAMP strata control parameters (≥ 120 Nm).',
      regulatoryBasis: 'Coal Mines Regulations 2017, Regulation 123',
      act: 'Mines Act, 1952',
      clause: 'Regulation 123 — Support of Working Places',
      inspectionDate: '15 Nov 2026'
    },
    expectedOutcome: {
      description: 'All 4 anchors torqued ≥ 120 Nm; supplementary cable bolts pre-tensioned to 15 tonnes.',
      requiredValue: '≥ 120 Nm',
      achievedValue: '135 Nm',
      thresholdMet: true
    },
    checklist: {
      check01ActionCompleted: true,
      check02EvidenceProvided: true,
      check03EvidenceAuthentic: true,
      check04DemonstratesCorrection: true,
      check05MeetsRequirement: true,
      check06AdditionalActionRequired: false,
      remarks: 'Hydraulic tensioner pull-out test certificates validated.'
    },
    evidenceList: [],
    historyCycles: [],
    daysRemaining: 2
  },
  {
    id: 'VER-2026-0028',
    capaId: 'CAPA-2026-0036',
    findingId: 'FND-2026-00094',
    inspectionId: 'INS-2026-0850',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Main Belt Conveyor Line 2',
    capaType: 'Mechanical Safeguards',
    severity: 'MEDIUM',
    priority: 'MEDIUM',
    actionTitle: 'Replace ultrasonic belt rip sensors and recalibrate interlock relay',
    actionDescription: 'Full replacement of ultrasonic detector array and testing emergency trip circuit.',
    actionOwner: 'Mechanical Maintenance Lead (Er. A. Sengupta)',
    department: 'Mechanical Maintenance',
    completionDate: '15 Nov 2026',
    submissionDate: '16 Nov 2026',
    verificationDueDate: '18 Nov 2026',
    status: 'Closed',
    decision: 'PASS',
    decisionDate: '18 Nov 2026',
    assignedVerifier: {
      name: 'Er. R. Sharma',
      role: 'DGMS Panel Senior Safety Auditor',
      authorizationId: 'DGMS-AUTH-2024-88',
      competency: ['Mechanical Safety', 'Interlock Systems'],
      scope: 'Mine A2 &bull; Area 1',
      assignedDate: '16 Nov 2026',
      separationOfDutiesChecked: true,
      conflictDetected: false
    },
    findingSummary: {
      description: 'Conveyor Belt Rip Detector Sensor Degradation',
      observedCondition: 'Emergency stop trip delayed by 4.2 seconds.',
      requiredStandard: 'Automatic belt shutdown within 1.5 seconds of rip detection.',
      regulatoryBasis: 'Coal Mines Regulations 2017, Regulation 92',
      act: 'Mines Act, 1952',
      clause: 'Regulation 92 — Conveyor Safeguards',
      inspectionDate: '01 Nov 2026'
    },
    expectedOutcome: {
      description: 'Trip relay reaction time < 1.5 seconds.',
      requiredValue: '≤ 1.5s',
      achievedValue: '0.9s',
      thresholdMet: true
    },
    checklist: {
      check01ActionCompleted: true,
      check02EvidenceProvided: true,
      check03EvidenceAuthentic: true,
      check04DemonstratesCorrection: true,
      check05MeetsRequirement: true,
      check06AdditionalActionRequired: false,
      remarks: 'Trip test demonstrated immediate shutdown at 0.9s.'
    },
    evidenceList: [],
    historyCycles: [],
    daysRemaining: 0
  }
];

const INITIAL_AUDIT_LOG: VerificationAuditLogItem[] = [
  {
    id: 'AUD-VER-001',
    timestamp: '30 Nov 2026 11:30 IST',
    actor: 'Er. R. Sharma',
    role: 'DGMS Panel Senior Safety Auditor',
    event: 'Evidence Packet Opened & Inspected',
    objectType: 'Evidence',
    objectId: 'EVD-VER-03',
    previousState: 'Submitted',
    newState: 'Under Review',
    reason: 'Initiated technical review of post-repair anemometer traverse velocity data.',
    tamperProofHash: 'sha256_8f14e45fceea167a5a36dedd4bea2543add704d8'
  },
  {
    id: 'AUD-VER-002',
    timestamp: '30 Nov 2026 11:00 IST',
    actor: 'Er. P. C. Joshi',
    role: 'Statutory Reviewer',
    event: 'Independent Verifier Assigned',
    objectType: 'Assignment',
    objectId: 'VER-2026-0031',
    previousState: 'Awaiting Assignment',
    newState: 'Awaiting Verification',
    reason: 'Assigned to Er. R. Sharma following separation-of-duties conflict check.',
    tamperProofHash: 'sha256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4'
  }
];

interface VerificationContextType {
  currentScreen: VerificationScreenId;
  navigateTo: (screen: VerificationScreenId, params?: Record<string, any>) => void;
  selectedMine: string;
  setSelectedMine: (mine: string) => void;
  quickNavOpen: boolean;
  setQuickNavOpen: (open: boolean) => void;
  toastMessage: { text: string; type: 'success' | 'warning' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'warning' | 'info' | 'error') => void;

  // Verification State
  verificationList: VerificationItem[];
  activeVerification: VerificationItem;
  setActiveVerification: (item: VerificationItem) => void;

  // Verification Actions
  passVerification: (verId: string, remarks: string) => void;
  failVerification: (verId: string, failureReason: string, remarks: string, newDate: string) => void;
  returnForClarification: (verId: string, question: string, missingEvidence: string[]) => void;
  assignVerifier: (verId: string, verifierName: string) => void;
  scheduleFollowUp: (verId: string, plan: VerificationItem['followUpPlan']) => void;
  updateChecklist: (verId: string, checklist: VerificationItem['checklist']) => void;

  // Modals & Evidence Viewer
  selectedEvidenceForViewer: VerificationEvidenceItem | null;
  openEvidenceViewer: (evidence: VerificationEvidenceItem) => void;
  closeEvidenceViewer: () => void;
  isScheduleFollowUpModalOpen: boolean;
  setIsScheduleFollowUpModalOpen: (open: boolean) => void;

  // Audit Ledger
  auditLog: VerificationAuditLogItem[];
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export const VerificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<VerificationScreenId>('01');
  const [selectedMine, setSelectedMine] = useState<string>('Mine A2');
  const [quickNavOpen, setQuickNavOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'warning' | 'info' | 'error' } | null>(null);

  const [verificationList, setVerificationList] = useState<VerificationItem[]>(INITIAL_VERIFICATION_ITEMS);
  const [activeVerification, setActiveVerification] = useState<VerificationItem>(INITIAL_VERIFICATION_ITEMS[0]);
  const [selectedEvidenceForViewer, setSelectedEvidenceForViewer] = useState<VerificationEvidenceItem | null>(null);
  const [isScheduleFollowUpModalOpen, setIsScheduleFollowUpModalOpen] = useState<boolean>(false);
  const [auditLog, setAuditLog] = useState<VerificationAuditLogItem[]>(INITIAL_AUDIT_LOG);

  const showToast = (text: string, type: 'success' | 'warning' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const navigateTo = (screen: VerificationScreenId, params?: Record<string, any>) => {
    if (params?.verId) {
      const v = verificationList.find(x => x.id === params.verId);
      if (v) setActiveVerification(v);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const passVerification = (verId: string, remarks: string) => {
    setVerificationList(prev =>
      prev.map(item => {
        if (item.id === verId) {
          const updated: VerificationItem = {
            ...item,
            status: 'Verified',
            decision: 'PASS',
            decisionDate: new Date().toLocaleString('en-IN') + ' IST',
            verifierRemarks: remarks
          };
          if (activeVerification.id === verId) setActiveVerification(updated);
          return updated;
        }
        return item;
      })
    );

    const auditEntry: VerificationAuditLogItem = {
      id: 'AUD-VER-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. R. Sharma',
      role: 'DGMS Panel Senior Safety Auditor',
      event: 'Verification PASSED & Formally Closed',
      objectType: 'Decision',
      objectId: verId,
      previousState: 'Awaiting Verification',
      newState: 'Verified & Closed',
      reason: remarks || 'Independent review certified that corrective action restored statutory compliance.',
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Verification ${verId} PASSED. Finding & CAPA formally certified and closed.`, 'success');
    navigateTo('19'); // Navigate to official verification report
  };

  const failVerification = (verId: string, failureReason: string, remarks: string, newDate: string) => {
    setVerificationList(prev =>
      prev.map(item => {
        if (item.id === verId) {
          const updated: VerificationItem = {
            ...item,
            status: 'Failed / Reopened',
            decision: 'FAIL',
            decisionDate: new Date().toLocaleString('en-IN') + ' IST',
            verifierRemarks: remarks
          };
          if (activeVerification.id === verId) setActiveVerification(updated);
          return updated;
        }
        return item;
      })
    );

    const auditEntry: VerificationAuditLogItem = {
      id: 'AUD-VER-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. R. Sharma',
      role: 'DGMS Panel Senior Safety Auditor',
      event: 'Verification FAILED & CAPA Reopened',
      objectType: 'Decision',
      objectId: verId,
      previousState: 'Awaiting Verification',
      newState: 'Failed / Reopened (WS06 Rework)',
      reason: `${failureReason}: ${remarks}`,
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Verification FAILED. CAPA ${activeVerification.capaId} reopened for rework in Workspace 06.`, 'warning');
    navigateTo('13'); // Navigate to Reopen screen
  };

  const returnForClarification = (verId: string, question: string, missingEvidence: string[]) => {
    setVerificationList(prev =>
      prev.map(item => {
        if (item.id === verId) {
          const updated: VerificationItem = {
            ...item,
            status: 'Returned to WS06',
            decision: 'RETURN',
            decisionDate: new Date().toLocaleString('en-IN') + ' IST',
            verifierRemarks: `Clarification requested: ${question} (Missing: ${missingEvidence.join(', ')})`
          };
          if (activeVerification.id === verId) setActiveVerification(updated);
          return updated;
        }
        return item;
      })
    );

    const auditEntry: VerificationAuditLogItem = {
      id: 'AUD-VER-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. R. Sharma',
      role: 'DGMS Panel Senior Safety Auditor',
      event: 'Verification Returned for Clarification',
      objectType: 'Decision',
      objectId: verId,
      previousState: 'Awaiting Verification',
      newState: 'Returned to WS06',
      reason: question,
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Verification returned to Workspace 06 action owner for technical clarification.`, 'info');
    navigateTo('02');
  };

  const assignVerifier = (verId: string, verifierName: string) => {
    setVerificationList(prev =>
      prev.map(item => {
        if (item.id === verId) {
          const updated: VerificationItem = {
            ...item,
            status: 'In Verification Review',
            assignedVerifier: {
              name: verifierName,
              role: 'DGMS Panel Independent Verifier',
              authorizationId: 'DGMS-AUTH-2024-88',
              competency: ['Ventilation', 'Safety', 'CAPA Authority'],
              scope: `${item.mine} &bull; Area 1`,
              assignedDate: new Date().toLocaleString('en-IN') + ' IST',
              separationOfDutiesChecked: true,
              conflictDetected: false
            }
          };
          if (activeVerification.id === verId) setActiveVerification(updated);
          return updated;
        }
        return item;
      })
    );

    showToast(`Verifier ${verifierName} assigned to ${verId} with zero SoD conflict.`, 'success');
    navigateTo('04');
  };

  const scheduleFollowUp = (verId: string, plan: VerificationItem['followUpPlan']) => {
    setVerificationList(prev =>
      prev.map(item => {
        if (item.id === verId) {
          const updated: VerificationItem = {
            ...item,
            followUpRequired: true,
            followUpPlan: plan
          };
          if (activeVerification.id === verId) setActiveVerification(updated);
          return updated;
        }
        return item;
      })
    );

    const auditEntry: VerificationAuditLogItem = {
      id: 'AUD-VER-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. R. Sharma',
      role: 'DGMS Panel Auditor',
      event: 'Post-Verification Follow-Up Scheduled',
      objectType: 'Follow-Up',
      objectId: verId,
      previousState: '—',
      newState: 'Follow-Up Scheduled',
      reason: `Scheduled for ${plan?.scheduledDate} (${plan?.verificationType}) at ${plan?.location}.`,
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Post-verification follow-up scheduled for ${plan?.scheduledDate}.`, 'success');
    setIsScheduleFollowUpModalOpen(false);
  };

  const updateChecklist = (verId: string, checklist: VerificationItem['checklist']) => {
    setVerificationList(prev =>
      prev.map(item => {
        if (item.id === verId) {
          const updated: VerificationItem = { ...item, checklist };
          if (activeVerification.id === verId) setActiveVerification(updated);
          return updated;
        }
        return item;
      })
    );
    showToast('Verification checklist saved.', 'success');
  };

  const openEvidenceViewer = (evidence: VerificationEvidenceItem) => {
    setSelectedEvidenceForViewer(evidence);
  };

  const closeEvidenceViewer = () => {
    setSelectedEvidenceForViewer(null);
  };

  return (
    <VerificationContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedMine,
        setSelectedMine,
        quickNavOpen,
        setQuickNavOpen,
        toastMessage,
        showToast,
        verificationList,
        activeVerification,
        setActiveVerification,
        passVerification,
        failVerification,
        returnForClarification,
        assignVerifier,
        scheduleFollowUp,
        updateChecklist,
        selectedEvidenceForViewer,
        openEvidenceViewer,
        closeEvidenceViewer,
        isScheduleFollowUpModalOpen,
        setIsScheduleFollowUpModalOpen,
        auditLog
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};
