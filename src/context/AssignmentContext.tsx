"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  InspectorPersonnel,
  ScheduledInspectionAssignment,
  AssignmentValidationCheck,
  AssignmentHistoryEvent
} from '../types/assignment';
import {
  INITIAL_PERSONNEL,
  INITIAL_SCHEDULED_INSPECTIONS,
  INITIAL_ASSIGNMENT_HISTORY
} from '../data/assignmentData';

export interface AssignmentContextType {
  currentScreen: string;
  screenParams: Record<string, any>;
  navigateTo: (screenId: string, params?: Record<string, any>) => void;

  // Domain Data
  personnelList: InspectorPersonnel[];
  inspections: ScheduledInspectionAssignment[];
  historyEvents: AssignmentHistoryEvent[];
  activeInspectionId: string;
  setActiveInspectionId: (id: string) => void;

  // Staged Team Builder for current inspection
  stagedLead?: InspectorPersonnel;
  stagedSupporting: InspectorPersonnel[];
  stagedSpecialists: Array<{ person: InspectorPersonnel; role: string }>;

  // Team building methods
  setLeadInspector: (person: InspectorPersonnel) => void;
  addSupportingInspector: (person: InspectorPersonnel) => void;
  removeSupportingInspector: (personId: string) => void;
  addSpecialist: (person: InspectorPersonnel, role: string) => void;
  removeSpecialist: (personId: string) => void;
  clearStagedTeam: () => void;

  // Eligibility Evaluation Function
  checkEligibility: (person: InspectorPersonnel, role: string, inspection: ScheduledInspectionAssignment) => {
    isEligible: boolean;
    reason?: string;
    details: Array<{ rule: string; passed: boolean; note: string }>;
  };

  // Validation
  runValidation: (inspectionId?: string) => {
    allPassed: boolean;
    checks: AssignmentValidationCheck[];
  };

  // Workflow Actions
  confirmCurrentAssignment: () => void;
  reassignPersonnel: (inspectionId: string, oldPersonName: string, newPerson: InspectorPersonnel, role: string, reason: string) => void;
  acceptAssignmentByInspector: (inspectionId: string, personName: string) => void;
  declineAssignmentByInspector: (inspectionId: string, personName: string, reason: string) => void;

  // Quick Navigator & Modals
  quickNavOpen: boolean;
  setQuickNavOpen: (open: boolean) => void;
  activeEnterpriseState: string;
  setEnterpriseState: (stateId: string) => void;

  // Selected Profile for Screen 07
  selectedPersonnelId: string;
  setSelectedPersonnelId: (id: string) => void;
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined);

export const AssignmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<string>('01');
  const [screenParams, setScreenParams] = useState<Record<string, any>>({});
  const [activeInspectionId, setActiveInspectionId] = useState<string>('INS-2026-0882');
  const [selectedPersonnelId, setSelectedPersonnelId] = useState<string>('PER-0901');

  const [personnelList] = useState<InspectorPersonnel[]>(INITIAL_PERSONNEL);
  const [inspections, setInspections] = useState<ScheduledInspectionAssignment[]>(INITIAL_SCHEDULED_INSPECTIONS);
  const [historyEvents, setHistoryEvents] = useState<AssignmentHistoryEvent[]>(INITIAL_ASSIGNMENT_HISTORY);

  // Staged Team for active assignment (defaults to pre-populating R. Sharma & K. Rao for INS-2026-0882)
  const [stagedLead, setStagedLead] = useState<InspectorPersonnel | undefined>(INITIAL_PERSONNEL[0]);
  const [stagedSupporting, setStagedSupporting] = useState<InspectorPersonnel[]>([]);
  const [stagedSpecialists, setStagedSpecialists] = useState<Array<{ person: InspectorPersonnel; role: string }>>([
    { person: INITIAL_PERSONNEL[1], role: 'Mechanical Specialist' }
  ]);

  const [quickNavOpen, setQuickNavOpen] = useState<boolean>(false);
  const [activeEnterpriseState, setActiveEnterpriseState] = useState<string>('state-no-unassigned');

  const navigateTo = (screenId: string, params: Record<string, any> = {}) => {
    setCurrentScreen(screenId);
    setScreenParams(params);
    if (params.inspectionId) {
      setActiveInspectionId(params.inspectionId);
    }
    if (params.personnelId) {
      setSelectedPersonnelId(params.personnelId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLeadInspector = (person: InspectorPersonnel) => {
    setStagedLead(person);
  };

  const addSupportingInspector = (person: InspectorPersonnel) => {
    if (!stagedSupporting.some(p => p.id === person.id)) {
      setStagedSupporting(prev => [...prev, person]);
    }
  };

  const removeSupportingInspector = (personId: string) => {
    setStagedSupporting(prev => prev.filter(p => p.id !== personId));
  };

  const addSpecialist = (person: InspectorPersonnel, role: string) => {
    if (!stagedSpecialists.some(s => s.person.id === person.id)) {
      setStagedSpecialists(prev => [...prev, { person, role }]);
    }
  };

  const removeSpecialist = (personId: string) => {
    setStagedSpecialists(prev => prev.filter(s => s.person.id !== personId));
  };

  const clearStagedTeam = () => {
    setStagedLead(undefined);
    setStagedSupporting([]);
    setStagedSpecialists([]);
  };

  // Eligibility Evaluation Engine
  const checkEligibility = (person: InspectorPersonnel, role: string, inspection: ScheduledInspectionAssignment) => {
    const details: Array<{ rule: string; passed: boolean; note: string }> = [];

    // 1. Competency Check
    const hasRequiredCompetency = role === 'Lead Inspector'
      ? person.competencies.some(c => inspection.requiredTeam.competencyList.includes(c))
      : role.includes('Electrical')
      ? person.competencies.includes('Electrical')
      : role.includes('Mechanical')
      ? person.competencies.includes('Mechanical')
      : person.competencies.includes('Safety');

    details.push({
      rule: 'Required Competency',
      passed: hasRequiredCompetency,
      note: hasRequiredCompetency ? `Competencies matched: ${person.competencies.join(', ')}` : 'Missing required specialized competency'
    });

    // 2. Authorization Check
    const hasValidAuth = role === 'Lead Inspector'
      ? person.authorizations.includes('Inspection Execution')
      : person.authorizations.includes('Specialist Participation') || person.authorizations.includes('Inspection Execution');

    details.push({
      rule: 'Statutory Authorization',
      passed: hasValidAuth,
      note: hasValidAuth ? 'Authorization verified under CMR 2017' : 'Authorization insufficient for role'
    });

    // 3. Scope Check
    const inScope = person.scope.area === inspection.area && (person.scope.authorizedMines.includes(inspection.mine) || person.scope.authorizedMines.some(m => inspection.mine.includes(m.split('(')[0])));
    details.push({
      rule: 'Organizational Scope',
      passed: inScope,
      note: inScope ? `Scope match: ${person.scope.area}` : `Outside authorized scope (${person.scope.area})`
    });

    // 4. Availability Check
    const isAvailable = person.availability.status === 'Available';
    details.push({
      rule: 'Availability',
      passed: isAvailable,
      note: isAvailable ? 'Available during scheduled shift' : `Status: ${person.availability.status}`
    });

    // 5. Workload Check
    const workloadOk = person.workload.activeInspections < 4;
    details.push({
      rule: 'Workload Threshold',
      passed: workloadOk,
      note: `${person.workload.activeInspections} active inspections (Limit: 4)`
    });

    // 6. Conflict Rules
    const hasConflict = !!person.conflicts && person.conflicts.length > 0;
    details.push({
      rule: 'Conflict Rules',
      passed: !hasConflict,
      note: hasConflict ? `Conflict: ${person.conflicts?.[0]?.reason}` : 'No operational conflict detected'
    });

    const isEligible = details.every(d => d.passed);
    const firstFail = details.find(d => !d.passed);

    return {
      isEligible,
      reason: firstFail ? `${firstFail.rule}: ${firstFail.note}` : undefined,
      details
    };
  };

  // 8-Point Team Validation Engine
  const runValidation = (inspectionId: string = activeInspectionId) => {
    const insp = inspections.find(i => i.id === inspectionId) || inspections[0];

    const checks: AssignmentValidationCheck[] = [
      {
        id: 'chk-lead-present',
        label: 'Lead Inspector Present',
        passed: !!stagedLead,
        detail: stagedLead ? `Assigned: ${stagedLead.name} (${stagedLead.designation})` : 'Lead Inspector is mandatory but missing',
        severity: stagedLead ? 'success' : 'error',
        actionNeeded: stagedLead ? undefined : 'Select Lead Inspector'
      },
      {
        id: 'chk-comp-vent',
        label: 'Required Competency: Ventilation & Safety',
        passed: !!stagedLead && (stagedLead.competencies.includes('Ventilation') || stagedLead.competencies.includes('Safety')),
        detail: stagedLead?.competencies.includes('Ventilation') ? 'Lead Inspector holds verified ventilation certification' : 'Lead Inspector does not possess required ventilation competency',
        severity: stagedLead?.competencies.includes('Ventilation') ? 'success' : 'error'
      },
      {
        id: 'chk-auth-valid',
        label: 'Statutory Authorization Valid',
        passed: !!stagedLead && stagedLead.authorizations.includes('Inspection Execution'),
        detail: 'First Class Mine Manager authorization verified under CMR 2017',
        severity: 'success'
      },
      {
        id: 'chk-scope-valid',
        label: 'Organizational Scope Authorization',
        passed: !!stagedLead && (stagedLead.scope.area === insp.area),
        detail: `Verified within ${insp.subsidiary} / ${insp.area}`,
        severity: 'success'
      },
      {
        id: 'chk-avail',
        label: 'Personnel Availability Check',
        passed: stagedLead?.availability.status === 'Available',
        detail: 'Personnel free during 15 Nov (10:30 – 14:30 IST)',
        severity: 'success'
      },
      {
        id: 'chk-workload',
        label: 'Workload Threshold Check',
        passed: (stagedLead?.workload.activeInspections || 0) < 4,
        detail: `${stagedLead?.workload.activeInspections || 0} active inspections within max allowable threshold`,
        severity: 'success'
      },
      {
        id: 'chk-conflict',
        label: 'Conflict & Double-Booking Rules',
        passed: true,
        detail: 'No overlapping underground inspections detected',
        severity: 'success'
      },
      {
        id: 'chk-spec-req',
        label: 'Required Specialist Assigned',
        passed: stagedSpecialists.some(s => s.role.includes('Mechanical') || s.role.includes('Safety')),
        detail: stagedSpecialists.length > 0 ? `Assigned: ${stagedSpecialists.map(s => `${s.person.name} (${s.role})`).join(', ')}` : 'Required specialist not attached to team',
        severity: stagedSpecialists.length > 0 ? 'success' : 'warning',
        actionNeeded: stagedSpecialists.length > 0 ? undefined : 'Add Required Specialist'
      }
    ];

    const allPassed = checks.every(c => c.severity !== 'error');

    return {
      allPassed,
      checks
    };
  };

  const confirmCurrentAssignment = () => {
    setInspections(prev => prev.map(i => {
      if (i.id === activeInspectionId) {
        return {
          ...i,
          status: 'Assigned',
          assignedTeam: {
            leadInspector: stagedLead,
            supportingInspectors: stagedSupporting,
            specialists: stagedSpecialists.map(s => ({ person: s.person, inspectionRole: s.role }))
          },
          acceptance: {
            totalRequired: 1 + stagedSpecialists.length + stagedSupporting.length,
            acceptedCount: 0,
            declinedCount: 0,
            statusText: 'Team Notified (Awaiting Acceptance)'
          }
        };
      }
      return i;
    }));

    const newEvent: AssignmentHistoryEvent = {
      id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Today 10:45 IST',
      inspectionId: activeInspectionId,
      personName: stagedLead?.name || 'Assigned Lead',
      inspectionRole: 'Lead Inspector',
      action: 'Assigned',
      previousPerson: '—',
      newPerson: stagedLead?.name || 'Assigned Lead',
      reason: 'STRATA validated team confirmed by Authorized Inspection Manager',
      changedBy: 'S. K. Mukherjee (Inspection Manager)'
    };

    setHistoryEvents(prev => [newEvent, ...prev]);
    navigateTo('11', { inspectionId: activeInspectionId });
  };

  const reassignPersonnel = (inspectionId: string, oldPersonName: string, newPerson: InspectorPersonnel, role: string, reason: string) => {
    setInspections(prev => prev.map(i => {
      if (i.id === inspectionId) {
        return {
          ...i,
          status: 'Assigned',
          assignedTeam: {
            ...i.assignedTeam,
            leadInspector: role === 'Lead Inspector' ? newPerson : i.assignedTeam.leadInspector
          }
        };
      }
      return i;
    }));

    const newEvent: AssignmentHistoryEvent = {
      id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Today 11:00 IST',
      inspectionId,
      personName: newPerson.name,
      inspectionRole: role,
      action: 'Reassigned',
      previousPerson: oldPersonName,
      newPerson: newPerson.name,
      reason,
      changedBy: 'S. K. Mukherjee (Inspection Manager)'
    };

    setHistoryEvents(prev => [newEvent, ...prev]);
    navigateTo('14', { inspectionId, oldPersonName, newPersonName: newPerson.name, reason });
  };

  const acceptAssignmentByInspector = (inspectionId: string, personName: string) => {
    setInspections(prev => prev.map(i => {
      if (i.id === inspectionId) {
        const newAccepted = i.acceptance.acceptedCount + 1;
        return {
          ...i,
          acceptance: {
            ...i.acceptance,
            acceptedCount: newAccepted,
            statusText: `${newAccepted}/${i.acceptance.totalRequired} Accepted`
          }
        };
      }
      return i;
    }));

    const newEvent: AssignmentHistoryEvent = {
      id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Today 11:15 IST',
      inspectionId,
      personName,
      inspectionRole: 'Lead Inspector',
      action: 'Accepted',
      reason: 'Inspector acknowledged pre-inspection brief and accepted assignment',
      changedBy: personName
    };

    setHistoryEvents(prev => [newEvent, ...prev]);
  };

  const declineAssignmentByInspector = (inspectionId: string, personName: string, reason: string) => {
    setInspections(prev => prev.map(i => {
      if (i.id === inspectionId) {
        return {
          ...i,
          status: 'Reassignment Required',
          acceptance: {
            ...i.acceptance,
            declinedCount: i.acceptance.declinedCount + 1,
            statusText: 'Declined (Reassignment Required)'
          }
        };
      }
      return i;
    }));

    const newEvent: AssignmentHistoryEvent = {
      id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Today 11:18 IST',
      inspectionId,
      personName,
      inspectionRole: 'Lead Inspector',
      action: 'Declined',
      reason: `Declined: ${reason}`,
      changedBy: personName
    };

    setHistoryEvents(prev => [newEvent, ...prev]);
    navigateTo('16');
  };

  return (
    <AssignmentContext.Provider value={{
      currentScreen,
      screenParams,
      navigateTo,
      personnelList,
      inspections,
      historyEvents,
      activeInspectionId,
      setActiveInspectionId,
      stagedLead,
      stagedSupporting,
      stagedSpecialists,
      setLeadInspector,
      addSupportingInspector,
      removeSupportingInspector,
      addSpecialist,
      removeSpecialist,
      clearStagedTeam,
      checkEligibility,
      runValidation,
      confirmCurrentAssignment,
      reassignPersonnel,
      acceptAssignmentByInspector,
      declineAssignmentByInspector,
      quickNavOpen,
      setQuickNavOpen,
      activeEnterpriseState,
      setEnterpriseState: setActiveEnterpriseState,
      selectedPersonnelId,
      setSelectedPersonnelId
    }}>
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignment = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error('useAssignment must be used within an AssignmentProvider');
  }
  return context;
};
