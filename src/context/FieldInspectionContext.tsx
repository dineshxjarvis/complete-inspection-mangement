"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import {
  FieldScreenId,
  FieldInspectionRecord,
  ChecklistItem,
  FieldObservation,
  FieldEvidence,
  ProposedFinding,
  SyncItem,
  TeamActivityEvent,
  AuditTrailEvent,
  InspectionVersion
} from '../types/fieldInspection';
import {
  primaryInspectionRecord,
  allInspectionsList,
  primaryObservations,
  primaryEvidenceList,
  primaryProposedFindings,
  primarySyncItems,
  primaryTeamActivities,
  primaryAuditTrail,
  primaryInspectionVersions
} from '../data/fieldInspectionData';

interface ToastInfo {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface FieldInspectionContextType {
  currentScreen: FieldScreenId;
  navigateTo: (screen: FieldScreenId, params?: Record<string, any>) => void;
  activeInspection: FieldInspectionRecord;
  setActiveInspection: (insp: FieldInspectionRecord) => void;
  inspections: FieldInspectionRecord[];
  
  // Connectivity & Offline Sync
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  toggleOnline: () => void;
  syncStatus: 'ONLINE' | 'OFFLINE' | 'SYNCING' | 'SYNCED' | 'FAILED';
  lastSyncTime: string;
  syncItems: SyncItem[];
  syncNow: () => void;
  retrySyncItem: (id: string) => void;

  // Execution & Checklist
  checklistItems: ChecklistItem[];
  activeChecklistId: string;
  setActiveChecklistId: (id: string) => void;
  updateChecklistItem: (id: string, updates: Partial<ChecklistItem>) => void;
  markChecklistStatus: (id: string, status: ChecklistItem['status'], naReason?: string, unableReason?: string) => void;
  
  // Observations & Evidence
  observations: FieldObservation[];
  addObservation: (obs: Omit<FieldObservation, 'id' | 'timestamp'>) => string;
  evidenceList: FieldEvidence[];
  addEvidence: (ev: Omit<FieldEvidence, 'id' | 'timestamp' | 'syncStatus'>) => string;

  // Proposed Findings
  proposedFindings: ProposedFinding[];
  addProposedFinding: (finding: Omit<ProposedFinding, 'id' | 'createdAt'>) => string;
  updateProposedFinding: (id: string, updates: Partial<ProposedFinding>) => void;

  // Readiness & Operational Lifecycle
  readinessChecks: Array<{ id: string; label: string; checked: boolean; required: boolean }>;
  toggleReadiness: (id: string) => void;
  areRequiredReadinessComplete: () => boolean;
  startInspection: (gpsConfirmed: boolean) => void;
  
  // Pause & Resume
  pauseReason: string;
  setPauseReason: (r: string) => void;
  pauseNotes: string;
  setPauseNotes: (n: string) => void;
  pauseInspection: (reason: string, notes?: string) => void;
  resumeInspection: () => void;

  // Review, Submit & Return
  finalRemarks: string;
  setFinalRemarks: (r: string) => void;
  submitInspection: () => void;
  resubmitReturnedInspection: () => void;
  versions: InspectionVersion[];

  // Team & Collaboration
  teamActivities: TeamActivityEvent[];
  addTeamActivity: (act: Omit<TeamActivityEvent, 'id' | 'timestamp'>) => void;
  hasConcurrentConflict: boolean;
  setHasConcurrentConflict: (conflict: boolean) => void;
  resolveConflict: (choice: 'local' | 'remote') => void;

  // Audit Log
  auditTrail: AuditTrailEvent[];
  addAuditLog: (event: Omit<AuditTrailEvent, 'id' | 'timestamp' | 'timeStr'>) => void;

  // UI state
  quickNavOpen: boolean;
  setQuickNavOpen: (open: boolean) => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: ToastInfo['type']) => void;
  removeToast: (id: string) => void;
  cameraModalOpen: boolean;
  setCameraModalOpen: (open: boolean) => void;
  cameraTargetId?: string;
  setCameraTargetId: (id?: string) => void;
}

const FieldInspectionContext = createContext<FieldInspectionContextType | undefined>(undefined);

export const FieldInspectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<FieldScreenId>('01');
  const [activeInspection, setActiveInspection] = useState<FieldInspectionRecord>(primaryInspectionRecord);
  const [inspections, setInspections] = useState<FieldInspectionRecord[]>(allInspectionsList);
  
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<'ONLINE' | 'OFFLINE' | 'SYNCING' | 'SYNCED' | 'FAILED'>('ONLINE');
  const [lastSyncTime, setLastSyncTime] = useState<string>('2 min ago');
  const [syncItems, setSyncItems] = useState<SyncItem[]>(primarySyncItems);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(primaryInspectionRecord.checklistItems);
  const [activeChecklistId, setActiveChecklistId] = useState<string>('REQ-VENT-014');

  const [observations, setObservations] = useState<FieldObservation[]>(primaryObservations);
  const [evidenceList, setEvidenceList] = useState<FieldEvidence[]>(primaryEvidenceList);
  const [proposedFindings, setProposedFindings] = useState<ProposedFinding[]>(primaryProposedFindings);

  const [readinessChecks, setReadinessChecks] = useState(primaryInspectionRecord.readinessChecks);
  const [pauseReason, setPauseReason] = useState<string>('Shift ended');
  const [pauseNotes, setPauseNotes] = useState<string>('Blasting window active in Seam VII. Personnel evacuated to Fresh Air Base.');
  const [finalRemarks, setFinalRemarks] = useState<string>('Comprehensive ventilation & electrical audit executed across Seam VII. 2 high severity non-compliances identified and documented with instrument measurements.');
  const [versions, setVersions] = useState<InspectionVersion[]>(primaryInspectionVersions);

  const [teamActivities, setTeamActivities] = useState<TeamActivityEvent[]>(primaryTeamActivities);
  const [hasConcurrentConflict, setHasConcurrentConflict] = useState<boolean>(false);
  const [auditTrail, setAuditTrail] = useState<AuditTrailEvent[]>(primaryAuditTrail);

  const [quickNavOpen, setQuickNavOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [cameraModalOpen, setCameraModalOpen] = useState<boolean>(false);
  const [cameraTargetId, setCameraTargetId] = useState<string | undefined>(undefined);

  const showToast = useCallback((message: string, type: ToastInfo['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const navigateTo = useCallback((screen: FieldScreenId, params?: Record<string, any>) => {
    if (params?.checklistId) {
      setActiveChecklistId(params.checklistId);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const addAuditLog = useCallback((event: Omit<AuditTrailEvent, 'id' | 'timestamp' | 'timeStr'>) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newLog: AuditTrailEvent = {
      ...event,
      id: `AUD-${Date.now()}`,
      timestamp: now.toISOString(),
      timeStr
    };
    setAuditTrail(prev => [newLog, ...prev]);
  }, []);

  const addTeamActivity = useCallback((act: Omit<TeamActivityEvent, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newAct: TeamActivityEvent = {
      ...act,
      id: `ACT-${Date.now()}`,
      timestamp: timeStr
    };
    setTeamActivities(prev => [newAct, ...prev]);
  }, []);

  const toggleOnline = useCallback(() => {
    setIsOnline(prev => {
      const next = !prev;
      setSyncStatus(next ? 'ONLINE' : 'OFFLINE');
      showToast(next ? 'Network restored: Connected to STRATA Field Gateway' : 'Operating in Offline Mode: Local storage active', next ? 'success' : 'warning');
      return next;
    });
  }, [showToast]);

  const syncNow = useCallback(() => {
    if (!isOnline) {
      showToast('Cannot synchronize while in Offline Mode. Switch to Online first.', 'error');
      return;
    }
    setSyncStatus('SYNCING');
    showToast('Synchronizing 4 pending items with STRATA Central Server...', 'info');

    setTimeout(() => {
      setSyncItems(prev => prev.map(item => ({ ...item, status: 'Synced', errorReason: undefined })));
      setSyncStatus('SYNCED');
      setLastSyncTime('Just now');
      showToast('All field records and evidence successfully synchronized (22 Items Synced)', 'success');
      
      addAuditLog({
        actor: 'R. Sharma',
        role: 'Lead Inspector',
        action: 'Offline Sync Completed',
        details: 'Manual synchronization succeeded. 28 evidence files and 7 observations committed.',
        category: 'governance'
      });
    }, 1800);
  }, [isOnline, showToast, addAuditLog]);

  const retrySyncItem = useCallback((id: string) => {
    setSyncItems(prev => prev.map(item => item.id === id ? { ...item, status: 'Syncing', errorReason: undefined } : item));
    setTimeout(() => {
      setSyncItems(prev => prev.map(item => item.id === id ? { ...item, status: 'Synced' } : item));
      showToast('Item successfully synchronized.', 'success');
    }, 1000);
  }, [showToast]);

  const updateChecklistItem = useCallback((id: string, updates: Partial<ChecklistItem>) => {
    setChecklistItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    }));
  }, []);

  const markChecklistStatus = useCallback((id: string, status: ChecklistItem['status'], naReason?: string, unableReason?: string) => {
    setChecklistItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          naReason: naReason || item.naReason,
          unableToVerifyReason: unableReason || item.unableToVerifyReason,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST'
        };
      }
      return item;
    }));

    addAuditLog({
      actor: 'R. Sharma',
      role: 'Lead Inspector',
      action: `Checklist Item Marked ${status}`,
      details: `${id} updated to ${status}${naReason ? ` (Reason: ${naReason})` : ''}`,
      category: 'execution'
    });

    showToast(`${id} updated to ${status}`, status === 'Compliant' ? 'success' : status === 'Non-Compliant' ? 'warning' : 'info');
  }, [addAuditLog, showToast]);

  const addObservation = useCallback((obs: Omit<FieldObservation, 'id' | 'timestamp'>): string => {
    const id = `OBS-${String(observations.length + 1).padStart(3, '0')}`;
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    const newObs: FieldObservation = {
      ...obs,
      id,
      timestamp
    };
    setObservations(prev => [newObs, ...prev]);

    addAuditLog({
      actor: obs.capturedBy || 'R. Sharma',
      role: 'Lead Inspector',
      action: 'Field Observation Added',
      details: `${id}: ${obs.text.substring(0, 75)}...`,
      location: obs.location,
      category: 'evidence'
    });

    addTeamActivity({
      userName: 'R. Sharma',
      userRole: 'Lead Inspector',
      userAvatar: 'RS',
      action: 'captured field observation on',
      target: obs.linkedChecklistId || obs.classification,
      type: 'observation'
    });

    showToast(`Observation ${id} saved locally`, 'success');
    return id;
  }, [observations.length, addAuditLog, addTeamActivity, showToast]);

  const addEvidence = useCallback((ev: Omit<FieldEvidence, 'id' | 'timestamp' | 'syncStatus'>): string => {
    const id = `EVD-${String(evidenceList.length + 1).padStart(3, '0')}`;
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST';
    const newEvidence: FieldEvidence = {
      ...ev,
      id,
      timestamp,
      syncStatus: isOnline ? 'Synced' : 'Pending'
    };
    setEvidenceList(prev => [newEvidence, ...prev]);

    // Add to sync queue if offline
    if (!isOnline) {
      setSyncItems(prev => [
        {
          id: `SYNC-${Date.now()}`,
          type: 'Evidence',
          reference: `${id} (${ev.title})`,
          size: ev.fileSize || '3.2 MB',
          status: 'Pending',
          timestamp: 'Just now'
        },
        ...prev
      ]);
    }

    addAuditLog({
      actor: ev.capturedBy || 'R. Sharma',
      role: 'Lead Inspector',
      action: `${ev.type} Evidence Captured`,
      details: `${id}: ${ev.title}`,
      location: ev.gpsCoordinates,
      category: 'evidence'
    });

    showToast(`${ev.type} evidence ${id} recorded with GPS watermark`, 'success');
    return id;
  }, [evidenceList.length, isOnline, addAuditLog, showToast]);

  const addProposedFinding = useCallback((finding: Omit<ProposedFinding, 'id' | 'createdAt'>): string => {
    const id = `FND-PROP-${String(proposedFindings.length + 1).padStart(3, '0')}`;
    const createdAt = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    const newFinding: ProposedFinding = {
      ...finding,
      id,
      createdAt
    };
    setProposedFindings(prev => [newFinding, ...prev]);

    addAuditLog({
      actor: finding.createdBy || 'R. Sharma',
      role: 'Lead Inspector',
      action: 'Proposed Finding Formulated',
      details: `${id} created for ${finding.linkedChecklistId} (${finding.severity} Severity)`,
      category: 'finding'
    });

    showToast(`Proposed Finding ${id} formulated for statutory review`, 'warning');
    return id;
  }, [proposedFindings.length, addAuditLog, showToast]);

  const updateProposedFinding = useCallback((id: string, updates: Partial<ProposedFinding>) => {
    setProposedFindings(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    showToast(`Proposed Finding ${id} updated`, 'info');
  }, [showToast]);

  const toggleReadiness = useCallback((id: string) => {
    setReadinessChecks(prev => prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  }, []);

  const areRequiredReadinessComplete = useCallback(() => {
    return readinessChecks.filter(c => c.required).every(c => c.checked);
  }, [readinessChecks]);

  const startInspection = useCallback((gpsConfirmed: boolean) => {
    setActiveInspection(prev => ({
      ...prev,
      status: 'In Progress',
      startedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' 10:32 IST'
    }));

    addAuditLog({
      actor: 'R. Sharma',
      role: 'Lead Inspector',
      action: 'Inspection Officially Started',
      details: `Execution started with GPS verification (${gpsConfirmed ? 'Lock verified at Seam VII Portal' : 'Manual override'}).`,
      location: 'Mine A2 Underground Portal',
      previousState: 'Ready for Inspection',
      newState: 'In Progress',
      category: 'state'
    });

    showToast('Official field execution session initiated. Real-time logging active.', 'success');
    navigateTo('06');
  }, [addAuditLog, showToast, navigateTo]);

  const pauseInspection = useCallback((reason: string, notes?: string) => {
    setPauseReason(reason);
    if (notes) setPauseNotes(notes);

    setActiveInspection(prev => ({
      ...prev,
      status: 'Paused',
      pausedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST',
      pauseReason: reason
    }));

    addAuditLog({
      actor: 'R. Sharma',
      role: 'Lead Inspector',
      action: 'Inspection Paused',
      details: `Reason: ${reason}. Notes: ${notes || 'None'}. All 22 items cached locally.`,
      previousState: 'In Progress',
      newState: 'Paused',
      category: 'state'
    });

    showToast(`Inspection paused: ${reason}`, 'warning');
    navigateTo('11A');
  }, [addAuditLog, showToast, navigateTo]);

  const resumeInspection = useCallback(() => {
    setActiveInspection(prev => ({
      ...prev,
      status: 'In Progress',
      resumedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST'
    }));

    addAuditLog({
      actor: 'R. Sharma',
      role: 'Lead Inspector',
      action: 'Inspection Resumed',
      details: 'Field operations resumed. Resuming checklist at District 4 Seam VII.',
      previousState: 'Paused',
      newState: 'In Progress',
      category: 'state'
    });

    showToast('Inspection resumed. Operational execution active.', 'success');
    navigateTo('06');
  }, [addAuditLog, showToast, navigateTo]);

  const submitInspection = useCallback(() => {
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    
    setActiveInspection(prev => ({
      ...prev,
      status: 'Submitted',
      submittedAt: timestamp
    }));

    addAuditLog({
      actor: 'R. Sharma',
      role: 'Lead Inspector',
      action: 'Inspection Submitted to Review & Approval',
      details: `Formal submission of ${activeInspection.id}. 22 checks, ${observations.length} observations, ${evidenceList.length} evidence records committed.`,
      previousState: 'In Progress',
      newState: 'Submitted — Awaiting Review',
      category: 'governance'
    });

    showToast('Formal inspection record submitted to Review & Approval queue!', 'success');
    navigateTo('17A');
  }, [activeInspection.id, observations.length, evidenceList.length, addAuditLog, showToast, navigateTo]);

  const resubmitReturnedInspection = useCallback(() => {
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' 11:30 IST';
    
    setActiveInspection(prev => ({
      ...prev,
      status: 'Submitted',
      submittedAt: timestamp,
      returnComment: undefined,
      returnedAt: undefined
    }));

    setVersions(prev => [
      {
        version: `v${prev.length + 1}`,
        submittedBy: 'R. Sharma (Lead Inspector)',
        timestamp,
        status: 'Resubmitted',
        checksCompleted: 22,
        observationsCount: observations.length,
        evidenceCount: evidenceList.length,
        findingsCount: proposedFindings.length,
        reasonForChange: 'Resubmission with OEM laboratory calibration certificate DOC-CAL-AN-4491.pdf attached.',
        diffSummary: [
          'Added certified calibration certificate DOC-CAL-AN-4491.pdf to REQ-VENT-014',
          'Confirmed zero calibration offset on Digital Vane Anemometer SN-AN-4491',
          'Resubmitted for DGMS Reviewer clearance'
        ]
      },
      ...prev
    ]);

    addAuditLog({
      actor: 'R. Sharma',
      role: 'Lead Inspector',
      action: 'Returned Inspection Resubmitted',
      details: 'Corrected measurement evidence and calibration certificate submitted.',
      previousState: 'Returned for Clarification',
      newState: 'Submitted — Awaiting Review',
      category: 'governance'
    });

    showToast('Inspection corrections resubmitted to Reviewer!', 'success');
    navigateTo('17A');
  }, [observations.length, evidenceList.length, proposedFindings.length, addAuditLog, showToast, navigateTo]);

  const resolveConflict = useCallback((choice: 'local' | 'remote') => {
    setHasConcurrentConflict(false);
    showToast(`Conflict resolved: Preserved ${choice === 'local' ? 'Local Inspector (R. Sharma)' : 'Remote Specialist (K. Rao)'} version`, 'success');
    
    addAuditLog({
      actor: 'R. Sharma',
      role: 'Lead Inspector',
      action: 'Concurrent Conflict Resolved',
      details: `Resolution accepted: ${choice === 'local' ? 'Local branch' : 'Remote branch'} retained.`,
      category: 'governance'
    });
  }, [addAuditLog, showToast]);

  return (
    <FieldInspectionContext.Provider
      value={{
        currentScreen,
        navigateTo,
        activeInspection,
        setActiveInspection,
        inspections,
        isOnline,
        setIsOnline,
        toggleOnline,
        syncStatus,
        lastSyncTime,
        syncItems,
        syncNow,
        retrySyncItem,
        checklistItems,
        activeChecklistId,
        setActiveChecklistId,
        updateChecklistItem,
        markChecklistStatus,
        observations,
        addObservation,
        evidenceList,
        addEvidence,
        proposedFindings,
        addProposedFinding,
        updateProposedFinding,
        readinessChecks,
        toggleReadiness,
        areRequiredReadinessComplete,
        startInspection,
        pauseReason,
        setPauseReason,
        pauseNotes,
        setPauseNotes,
        pauseInspection,
        resumeInspection,
        finalRemarks,
        setFinalRemarks,
        submitInspection,
        resubmitReturnedInspection,
        versions,
        teamActivities,
        addTeamActivity,
        hasConcurrentConflict,
        setHasConcurrentConflict,
        resolveConflict,
        auditTrail,
        addAuditLog,
        quickNavOpen,
        setQuickNavOpen,
        toasts,
        showToast,
        removeToast,
        cameraModalOpen,
        setCameraModalOpen,
        cameraTargetId,
        setCameraTargetId
      }}
    >
      {children}
    </FieldInspectionContext.Provider>
  );
};

export const useFieldInspection = () => {
  const context = useContext(FieldInspectionContext);
  if (!context) {
    throw new Error('useFieldInspection must be used within a FieldInspectionProvider');
  }
  return context;
};
