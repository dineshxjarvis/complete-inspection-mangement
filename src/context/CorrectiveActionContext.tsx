"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  CorrectiveScreenId,
  CapaItem,
  CapaTaskItem,
  CapaEvidenceItem,
  CapaAuditLogItem,
  CapaStatus,
  CapaPriority,
  BlockerReason
} from '../types/correctiveAction';

// Pre-seeded initial dataset for Workspace 06 ensuring continuous workflow from Workspace 05
const INITIAL_CAPA_ITEMS: CapaItem[] = [
  {
    id: 'CAPA-2026-0048',
    findingId: 'FND-2026-00127',
    findingTitle: 'Ventilation Airflow Velocity below Statutory Threshold in Shaft 3 Return',
    findingSeverity: 'HIGH',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Shaft 3 — Return Airway Intersection (Chainage 140m)',
    inspectionId: 'INS-2026-0882',
    actionTitle: 'Repair ventilation system and overhaul regulator louvres',
    actionDescription: 'Execute mechanical descaling of regulator louvres, recalibrate auxiliary booster fan blade pitch angle, and perform 9-grid traverse anemometer measurement.',
    requiredCorrection: 'Restore airway cross-sectional velocity to ≥ 5.5 m/s in accordance with CMR 2017 Regulation 153(2)(b).',
    expectedOutcome: 'Continuous return airway purging and statutory methane dilution at Shaft 3 intersection.',
    department: 'Ventilation Department',
    owner: 'Er. S. K. Mahapatra (Chief Ventilation Engineer)',
    assignedBy: 'Er. P. C. Joshi (Statutory Reviewer / DGMS Liaison)',
    assignedDate: '17 Nov 2026',
    dueDate: '30 Nov 2026',
    originalDueDate: '30 Nov 2026',
    priority: 'HIGH',
    capaStatus: 'IN PROGRESS',
    findingStatus: 'CONFIRMED',
    complianceStatus: 'NOT VERIFIED',
    progressPercentage: 60,
    regulatoryRequirement: 'Coal Mines Regulations 2017, Regulation 153(2)(b) — Return Air Velocity ≥ 5.5 m/s',
    clause: 'Regulation 153(2)(b)',
    act: 'Mines Act, 1952',
    requiredEvidenceCount: 3,
    uploadedEvidenceCount: 2,
    tasks: [
      {
        id: 'TSK-01',
        title: 'Inspect ventilation fan and return airway louvres',
        description: 'Underground physical inspection of regulator louvre distortion and dust sedimentation.',
        owner: 'Er. S. K. Mahapatra',
        department: 'Ventilation',
        startDate: '18 Nov 2026',
        dueDate: '20 Nov 2026',
        status: 'COMPLETE',
        dependencies: [],
        evidenceRequired: true,
        evidenceType: 'Document',
        progressPercentage: 100
      },
      {
        id: 'TSK-02',
        title: 'Repair ventilation system & clear louvre stone dust',
        description: 'Mechanical overhaul of fan pitch linkages and high-pressure washing of regulator shutter guides.',
        owner: 'Mechanical Overhaul Crew (Lead: M. K. Pandey)',
        department: 'Ventilation',
        startDate: '21 Nov 2026',
        dueDate: '27 Nov 2026',
        status: 'IN PROGRESS',
        dependencies: ['TSK-01'],
        evidenceRequired: true,
        evidenceType: 'Photo',
        progressPercentage: 80
      },
      {
        id: 'TSK-03',
        title: 'Perform post-repair 9-grid anemometer traverse measurement',
        description: 'Independent traverse measurement using calibrated digital vane anemometer.',
        owner: 'Safety & Ventilation Survey Team',
        department: 'Safety',
        startDate: '28 Nov 2026',
        dueDate: '30 Nov 2026',
        status: 'PENDING',
        dependencies: ['TSK-02'],
        evidenceRequired: true,
        evidenceType: 'Measurement',
        progressPercentage: 0
      }
    ],
    evidenceList: [
      {
        id: 'EVD-2026-0081',
        title: 'Ventilation Louvres Overhaul & Descaling Engineering Report',
        type: 'Document',
        description: 'Comprehensive maintenance log detailing mechanical guide replacement and blade pitch reset.',
        date: '24 Nov 2026',
        location: 'Shaft 3 Louvre Chamber',
        capturedBy: 'Er. S. K. Mahapatra',
        relatedTaskId: 'TSK-01',
        status: 'ACCEPTED',
        fileSize: '2.1 MB',
        filename: 'DOC-VENT-REPAIR-REPORT.pdf',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      },
      {
        id: 'EVD-2026-0082',
        title: 'Photographic Proof of Cleared Airway & Realigned Shutter Louvres',
        type: 'Photo',
        description: 'Optical capture showing un-obstructed airway cross-section with calibrated scale bar.',
        date: '25 Nov 2026',
        location: 'Shaft 3 (Ch: 140m)',
        capturedBy: 'M. K. Pandey (Foreman)',
        relatedTaskId: 'TSK-02',
        status: 'ACCEPTED',
        fileSize: '4.6 MB',
        filename: 'PHOTO-LOUVRE-CLEARED.jpg',
        sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        photoData: {
          timestamp: '25 Nov 2026 14:15 IST',
          location: 'Shaft 3 (Ch: 140m)',
          gpsCoordinates: '24°11\'48.2"N 82°41\'15.6"E'
        }
      }
    ],
    comments: [
      {
        id: 'CMT-01',
        author: 'Er. S. K. Mahapatra',
        role: 'Chief Ventilation Engineer',
        timestamp: '22 Nov 2026 11:30 IST',
        text: 'Louvre descaling completed with 3-man crew. Preliminary velocity check indicates 5.3 m/s. Final fan pitch calibration scheduled for tomorrow.'
      }
    ],
    daysRemaining: 2
  },
  {
    id: 'CAPA-2026-0049',
    findingId: 'FND-2026-00128',
    findingTitle: 'Under-torqued Roof Support Anchors at District 4 Split',
    findingSeverity: 'CRITICAL',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'District 4 Split Underground Header Seam VII',
    inspectionId: 'INS-2026-0882',
    actionTitle: 'Re-torque roof bolts and install supplementary cable anchors',
    actionDescription: 'Re-tension all 4 under-torqued resin bolts to ≥ 120 Nm and install 2 secondary cable bolts with hydraulic tensioner.',
    requiredCorrection: 'Achieve 100% compliance with SCAMP strata control support parameters.',
    expectedOutcome: 'Strata delamination arrest and safe worker transit.',
    department: 'Strata Control & Support Team',
    owner: 'Er. B. C. Roy (Strata Control Officer)',
    assignedBy: 'Er. P. C. Joshi',
    assignedDate: '17 Nov 2026',
    dueDate: '28 Nov 2026',
    originalDueDate: '28 Nov 2026',
    priority: 'CRITICAL',
    capaStatus: 'IN PROGRESS',
    findingStatus: 'CONFIRMED',
    complianceStatus: 'NOT VERIFIED',
    progressPercentage: 40,
    regulatoryRequirement: 'Coal Mines Regulations 2017, Regulation 123 — Support of Working Places',
    clause: 'Regulation 123',
    act: 'Mines Act, 1952',
    requiredEvidenceCount: 2,
    uploadedEvidenceCount: 1,
    tasks: [],
    evidenceList: [],
    comments: [],
    daysRemaining: 1
  },
  {
    id: 'CAPA-2026-0042',
    findingId: 'FND-2026-00121',
    findingTitle: 'Electrical Substation Earth Pit Resistance Exceedance',
    findingSeverity: 'HIGH',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Inclined Haulage & Substation Sub-level 3',
    inspectionId: 'INS-2026-0870',
    actionTitle: 'Chemical re-bedding of earth pits and Megger validation',
    actionDescription: 'Inject bentonite-charcoal slurry into earth electrode pits #3 and #4 to reduce loop impedance < 1.0 Ohm.',
    requiredCorrection: 'Earth pit resistance must measure < 1.0 Ohm under certified Megger test.',
    expectedOutcome: 'Flameproof grounding integrity restored across sub-level 3 substation.',
    department: 'Electrical Engineering',
    owner: 'Er. D. N. Murthy (Chief Electrical Engineer)',
    assignedBy: 'DGMS Regional Safety Directorate',
    assignedDate: '12 Nov 2026',
    dueDate: '25 Nov 2026',
    originalDueDate: '25 Nov 2026',
    priority: 'HIGH',
    capaStatus: 'BLOCKED',
    findingStatus: 'CONFIRMED',
    complianceStatus: 'NOT VERIFIED',
    progressPercentage: 50,
    regulatoryRequirement: 'Indian Electricity Rules & CMR 2017 Reg 188 — Ground Loop Impedance',
    clause: 'Regulation 188',
    act: 'Mines Act, 1952 & Indian Electricity Act',
    requiredEvidenceCount: 2,
    uploadedEvidenceCount: 1,
    tasks: [],
    evidenceList: [],
    comments: [],
    blocker: {
      isBlocked: true,
      reason: 'Spare parts unavailable',
      details: 'Specialized low-resistivity bentonite slurry compound delayed at regional warehouse.',
      timeExtensionRequested: true,
      requestedNewDate: '02 Dec 2026',
      submittedAt: '24 Nov 2026 15:00 IST',
      approvalStatus: 'Pending Review'
    },
    daysRemaining: -3
  },
  {
    id: 'CAPA-2026-0036',
    findingId: 'FND-2026-00094',
    findingTitle: 'Conveyor Belt Rip Detector Sensor Degradation',
    findingSeverity: 'MEDIUM',
    mine: 'Mine A2',
    colliery: 'Singrauli Coalfield Division',
    location: 'Main Belt Conveyor Line 2',
    inspectionId: 'INS-2026-0850',
    actionTitle: 'Replace ultrasonic belt rip sensors and recalibrate interlock relay',
    actionDescription: 'Full replacement of ultrasonic detector array and testing emergency trip circuit.',
    requiredCorrection: 'Automatic belt shutdown within 1.5 seconds of rip detection.',
    expectedOutcome: 'Conveyor safety interlock operational.',
    department: 'Mechanical Maintenance',
    owner: 'Er. A. Sengupta (Mechanical Engineer)',
    assignedBy: 'Mine Safety Cell',
    assignedDate: '01 Nov 2026',
    dueDate: '15 Nov 2026',
    originalDueDate: '15 Nov 2026',
    priority: 'MEDIUM',
    capaStatus: 'COMPLETED',
    findingStatus: 'CONFIRMED',
    complianceStatus: 'PENDING',
    progressPercentage: 100,
    regulatoryRequirement: 'Coal Mines Regulations 2017, Regulation 92 — Conveyor Safeguards',
    clause: 'Regulation 92',
    act: 'Mines Act, 1952',
    requiredEvidenceCount: 2,
    uploadedEvidenceCount: 2,
    tasks: [],
    evidenceList: [],
    comments: [],
    daysRemaining: 0
  }
];

const INITIAL_AUDIT_LOG: CapaAuditLogItem[] = [
  {
    id: 'AUD-CAPA-001',
    timestamp: '25 Nov 2026 14:15 IST',
    actor: 'M. K. Pandey',
    role: 'Foreman',
    event: 'Evidence Uploaded',
    objectType: 'Evidence',
    objectId: 'EVD-2026-0082',
    previousState: 'Missing',
    newState: 'Uploaded & Accepted',
    reason: 'Uploaded photographic proof of realigned shutter louvres at Shaft 3.',
    tamperProofHash: 'sha256_5e884898da28047151d0e56f8dc6292773603d0d'
  },
  {
    id: 'AUD-CAPA-002',
    timestamp: '24 Nov 2026 16:30 IST',
    actor: 'Er. S. K. Mahapatra',
    role: 'Chief Ventilation Engineer',
    event: 'Progress Updated',
    objectType: 'CAPA',
    objectId: 'CAPA-2026-0048',
    previousState: '40% Progress',
    newState: '60% Progress',
    reason: 'Mechanical descaling of louvres completed; fan pitch recalibration commenced.',
    tamperProofHash: 'sha256_8f14e45fceea167a5a36dedd4bea2543add704d8'
  },
  {
    id: 'AUD-CAPA-003',
    timestamp: '18 Nov 2026 09:00 IST',
    actor: 'Er. S. K. Mahapatra',
    role: 'Chief Ventilation Engineer',
    event: 'Action Accepted',
    objectType: 'CAPA',
    objectId: 'CAPA-2026-0048',
    previousState: 'Assigned',
    newState: 'In Progress',
    reason: 'Action plan formulated and tasks assigned to maintenance crew.',
    tamperProofHash: 'sha256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4'
  }
];

interface CorrectiveActionContextType {
  currentScreen: CorrectiveScreenId;
  navigateTo: (screen: CorrectiveScreenId, params?: Record<string, any>) => void;
  selectedMine: string;
  setSelectedMine: (mine: string) => void;
  quickNavOpen: boolean;
  setQuickNavOpen: (open: boolean) => void;
  toastMessage: { text: string; type: 'success' | 'warning' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'warning' | 'info' | 'error') => void;

  // CAPA State
  capaList: CapaItem[];
  activeCapa: CapaItem;
  setActiveCapa: (capa: CapaItem) => void;

  // Actions
  updateProgress: (capaId: string, newPercentage: number, newStatus: CapaStatus, comment: string) => void;
  uploadEvidence: (capaId: string, payload: Omit<CapaEvidenceItem, 'id' | 'sha256Hash'>) => void;
  submitBlockerRequest: (capaId: string, blocker: { reason: BlockerReason; details: string; extensionRequested: boolean; newDate?: string }) => void;
  submitClarificationRequest: (capaId: string, question: string) => void;
  submitForVerification: (capaId: string, actionResultText: string) => boolean;
  addTask: (capaId: string, task: Omit<CapaTaskItem, 'id'>) => void;

  // Evidence Viewer
  selectedEvidenceForViewer: CapaEvidenceItem | null;
  openEvidenceViewer: (evidence: CapaEvidenceItem) => void;
  closeEvidenceViewer: () => void;

  // Modals
  isAddTaskModalOpen: boolean;
  setIsAddTaskModalOpen: (open: boolean) => void;

  // Audit Log
  auditLog: CapaAuditLogItem[];
}

const CorrectiveActionContext = createContext<CorrectiveActionContextType | undefined>(undefined);

export const CorrectiveActionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<CorrectiveScreenId>('01');
  const [selectedMine, setSelectedMine] = useState<string>('Mine A2');
  const [quickNavOpen, setQuickNavOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'warning' | 'info' | 'error' } | null>(null);

  const [capaList, setCapaList] = useState<CapaItem[]>(INITIAL_CAPA_ITEMS);
  const [activeCapa, setActiveCapa] = useState<CapaItem>(INITIAL_CAPA_ITEMS[0]);
  const [selectedEvidenceForViewer, setSelectedEvidenceForViewer] = useState<CapaEvidenceItem | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);
  const [auditLog, setAuditLog] = useState<CapaAuditLogItem[]>(INITIAL_AUDIT_LOG);

  const showToast = (text: string, type: 'success' | 'warning' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const navigateTo = (screen: CorrectiveScreenId, params?: Record<string, any>) => {
    if (params?.capaId) {
      const c = capaList.find(x => x.id === params.capaId);
      if (c) setActiveCapa(c);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateProgress = (capaId: string, newPercentage: number, newStatus: CapaStatus, comment: string) => {
    setCapaList(prev =>
      prev.map(c => {
        if (c.id === capaId) {
          const updated: CapaItem = {
            ...c,
            progressPercentage: newPercentage,
            capaStatus: newStatus,
            comments: comment
              ? [
                  ...c.comments,
                  {
                    id: 'CMT-' + Date.now(),
                    author: 'Er. S. K. Mahapatra',
                    role: 'Chief Ventilation Engineer',
                    timestamp: new Date().toLocaleString('en-IN') + ' IST',
                    text: comment
                  }
                ]
              : c.comments
          };
          if (activeCapa.id === capaId) setActiveCapa(updated);
          return updated;
        }
        return c;
      })
    );

    const auditEntry: CapaAuditLogItem = {
      id: 'AUD-CAPA-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. S. K. Mahapatra',
      role: 'Chief Ventilation Engineer',
      event: `Progress Updated: ${newPercentage}% (${newStatus})`,
      objectType: 'CAPA',
      objectId: capaId,
      previousState: `${activeCapa.progressPercentage}% (${activeCapa.capaStatus})`,
      newState: `${newPercentage}% (${newStatus})`,
      reason: comment || 'Routine milestone progress update logged by action owner.',
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`CAPA ${capaId} progress updated to ${newPercentage}% (${newStatus})`, 'success');
    navigateTo('04');
  };

  const uploadEvidence = (capaId: string, payload: Omit<CapaEvidenceItem, 'id' | 'sha256Hash'>) => {
    const newEvidenceId = 'EVD-2026-' + (Math.floor(Math.random() * 900) + 100);
    const newHash = 'sha256_' + Math.random().toString(36).substring(2, 15);

    const newEvidenceItem: CapaEvidenceItem = {
      ...payload,
      id: newEvidenceId,
      sha256Hash: newHash
    };

    setCapaList(prev =>
      prev.map(c => {
        if (c.id === capaId) {
          const updatedEvidenceList = [...c.evidenceList, newEvidenceItem];
          const updated: CapaItem = {
            ...c,
            evidenceList: updatedEvidenceList,
            uploadedEvidenceCount: updatedEvidenceList.length
          };
          if (activeCapa.id === capaId) setActiveCapa(updated);
          return updated;
        }
        return c;
      })
    );

    const auditEntry: CapaAuditLogItem = {
      id: 'AUD-CAPA-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. S. K. Mahapatra',
      role: 'Action Owner',
      event: `Evidence Uploaded: ${payload.title}`,
      objectType: 'Evidence',
      objectId: newEvidenceId,
      previousState: 'Missing',
      newState: 'Uploaded & Accepted',
      reason: payload.description,
      tamperProofHash: newHash
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Evidence ${payload.title} uploaded successfully with integrity hash`, 'success');
    navigateTo('08');
  };

  const submitBlockerRequest = (capaId: string, blocker: { reason: BlockerReason; details: string; extensionRequested: boolean; newDate?: string }) => {
    setCapaList(prev =>
      prev.map(c => {
        if (c.id === capaId) {
          const updated: CapaItem = {
            ...c,
            capaStatus: 'BLOCKED',
            blocker: {
              isBlocked: true,
              reason: blocker.reason,
              details: blocker.details,
              timeExtensionRequested: blocker.extensionRequested,
              requestedNewDate: blocker.newDate,
              submittedAt: new Date().toLocaleString('en-IN') + ' IST',
              approvalStatus: 'Pending Review'
            }
          };
          if (activeCapa.id === capaId) setActiveCapa(updated);
          return updated;
        }
        return c;
      })
    );

    const auditEntry: CapaAuditLogItem = {
      id: 'AUD-CAPA-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. S. K. Mahapatra',
      role: 'Action Owner',
      event: `CAPA Blocked: ${blocker.reason}`,
      objectType: 'Blocker',
      objectId: capaId,
      previousState: activeCapa.capaStatus,
      newState: 'BLOCKED',
      reason: blocker.details,
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Blocker request submitted for review. Original due date remains intact until authorized.`, 'warning');
    navigateTo('04');
  };

  const submitClarificationRequest = (capaId: string, question: string) => {
    setCapaList(prev =>
      prev.map(c => {
        if (c.id === capaId) {
          const updated: CapaItem = {
            ...c,
            clarification: {
              isRequested: true,
              question: question,
              requestedAt: new Date().toLocaleString('en-IN') + ' IST',
              targetAuthority: 'Er. P. C. Joshi (Workspace 05 Statutory Reviewer)'
            }
          };
          if (activeCapa.id === capaId) setActiveCapa(updated);
          return updated;
        }
        return c;
      })
    );

    const auditEntry: CapaAuditLogItem = {
      id: 'AUD-CAPA-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. S. K. Mahapatra',
      role: 'Action Owner',
      event: 'Clarification Requested from Authority',
      objectType: 'Clarification',
      objectId: capaId,
      previousState: 'Open / In Progress',
      newState: 'Clarification Requested',
      reason: question,
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Clarification request transmitted to Workspace 05 authority`, 'info');
    navigateTo('04');
  };

  const submitForVerification = (capaId: string, actionResultText: string): boolean => {
    const c = capaList.find(x => x.id === capaId);
    if (!c) return false;

    // Validation Gate: Check required evidence
    if (c.uploadedEvidenceCount < c.requiredEvidenceCount) {
      showToast(`Submission blocked: Missing ${c.requiredEvidenceCount - c.uploadedEvidenceCount} required evidence artifact(s)`, 'error');
      return false;
    }

    setCapaList(prev =>
      prev.map(item => {
        if (item.id === capaId) {
          const updated: CapaItem = {
            ...item,
            capaStatus: 'AWAITING VERIFICATION',
            complianceStatus: 'PENDING',
            progressPercentage: 100,
            verificationResult: {
              latestMeasurement: '5.9 m/s',
              requiredThreshold: '≥ 5.5 m/s',
              verifiedBy: 'DGMS Panel Independent Verifier',
              verificationDate: '30 Nov 2026',
              result: 'PENDING'
            }
          };
          if (activeCapa.id === capaId) setActiveCapa(updated);
          return updated;
        }
        return item;
      })
    );

    const auditEntry: CapaAuditLogItem = {
      id: 'AUD-CAPA-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. S. K. Mahapatra',
      role: 'Action Owner',
      event: 'CAPA Submitted for Verification (Workspace 07 Handoff)',
      objectType: 'Submission',
      objectId: capaId,
      previousState: 'IN PROGRESS (100%)',
      newState: 'AWAITING VERIFICATION',
      reason: actionResultText || 'Action owner confirmed completion and uploaded verified evidence pack.',
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`CAPA ${capaId} submitted for verification. Handed off to Workspace 07.`, 'success');
    navigateTo('18');
    return true;
  };

  const addTask = (capaId: string, task: Omit<CapaTaskItem, 'id'>) => {
    const newTaskId = 'TSK-0' + (activeCapa.tasks.length + 1);
    const newTaskItem: CapaTaskItem = {
      ...task,
      id: newTaskId
    };

    setCapaList(prev =>
      prev.map(c => {
        if (c.id === capaId) {
          const updatedTasks = [...c.tasks, newTaskItem];
          const updated: CapaItem = { ...c, tasks: updatedTasks };
          if (activeCapa.id === capaId) setActiveCapa(updated);
          return updated;
        }
        return c;
      })
    );

    const auditEntry: CapaAuditLogItem = {
      id: 'AUD-CAPA-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      actor: 'Er. S. K. Mahapatra',
      role: 'Action Owner',
      event: `Task Added: ${task.title}`,
      objectType: 'Task',
      objectId: newTaskId,
      previousState: '—',
      newState: task.status,
      reason: task.description,
      tamperProofHash: 'sha256_' + Math.random().toString(36).substring(2, 12)
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    showToast(`Task ${newTaskId} added to CAPA action plan`, 'success');
    setIsAddTaskModalOpen(false);
  };

  const openEvidenceViewer = (evidence: CapaEvidenceItem) => {
    setSelectedEvidenceForViewer(evidence);
  };

  const closeEvidenceViewer = () => {
    setSelectedEvidenceForViewer(null);
  };

  return (
    <CorrectiveActionContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedMine,
        setSelectedMine,
        quickNavOpen,
        setQuickNavOpen,
        toastMessage,
        showToast,
        capaList,
        activeCapa,
        setActiveCapa,
        updateProgress,
        uploadEvidence,
        submitBlockerRequest,
        submitClarificationRequest,
        submitForVerification,
        addTask,
        selectedEvidenceForViewer,
        openEvidenceViewer,
        closeEvidenceViewer,
        isAddTaskModalOpen,
        setIsAddTaskModalOpen,
        auditLog
      }}
    >
      {children}
    </CorrectiveActionContext.Provider>
  );
};

export const useCorrectiveAction = () => {
  const context = useContext(CorrectiveActionContext);
  if (!context) {
    throw new Error('useCorrectiveAction must be used within a CorrectiveActionProvider');
  }
  return context;
};
